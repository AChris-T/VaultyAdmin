'use client';

import { useState, type FormEvent } from 'react';
import OtpField from '@/components/ui/form/otp-field';
import Button from '@/components/ui/button';
import { verifyLoginSchema } from '../schemas/verify-login.schema';
import { useVerifyLoginMutation } from '../queries/use-verify-login-mutation';
import type { LoginChallenge } from '../types/auth';

export default function OtpStep({
  challenge,
  onBack,
}: {
  challenge: LoginChallenge;
  onBack: () => void;
}) {
  const [otp, setOtp] = useState('');
  const [fieldError, setFieldError] = useState<string>();

  const verifyMutation = useVerifyLoginMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = verifyLoginSchema.safeParse({
      challengeToken: challenge.challengeToken,
      otp,
    });
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message);
      return;
    }

    setFieldError(undefined);
    verifyMutation.mutate(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-center">
      <div className="flex justify-center">
        <OtpField value={otp} onChange={setOtp} error={fieldError} />
      </div>

      <Button type="submit" loading={verifyMutation.isPending}>
        {verifyMutation.isPending ? 'Verifying…' : 'Verify code'}
      </Button>

      <button
        type="button"
        onClick={onBack}
        className="text-xs font-medium text-black/50 hover:text-black"
      >
        Use a different email
      </button>
    </form>
  );
}
