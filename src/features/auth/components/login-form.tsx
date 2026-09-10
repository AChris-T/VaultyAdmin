'use client';

import { useState } from 'react';
import CredentialsStep from './credentials-step';
import OtpStep from './otp-step';
import type { LoginChallenge } from '../types/auth';

export default function LoginForm() {
  const [challenge, setChallenge] = useState<LoginChallenge | null>(null);

  return (
    <div>
      <div className="mb-8 flex flex-col items-center text-center">
        <h3 className="mb-4 font-gellix text-4xl font-bold">
          {challenge ? 'Check your email' : 'Log in to Vaultly'}
        </h3>
        <h3 className="font-sans text-sm font-medium text-[#4F4F4F]">
          {challenge
            ? `We sent a 6-digit code to ${challenge.otpSentTo}`
            : 'Welcome back! Enter your details to access your account.'}
        </h3>
      </div>

      {challenge ? (
        <OtpStep challenge={challenge} onBack={() => setChallenge(null)} />
      ) : (
        <CredentialsStep onChallenge={setChallenge} />
      )}
    </div>
  );
}
