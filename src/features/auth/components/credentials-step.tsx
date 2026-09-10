'use client';

import { useState, type FormEvent } from 'react';
import TextField from '@/components/ui/form/text-field';
import PasswordField from '@/components/ui/form/password-field';
import Button from '@/components/ui/button';
import { loginSchema } from '../schemas/login.schema';
import { useLoginMutation } from '../queries/use-login-mutation';
import type { LoginChallenge } from '../types/auth';

export default function CredentialsStep({
  onChallenge,
}: {
  onChallenge: (challenge: LoginChallenge) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loginMutation = useLoginMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errors[String(issue.path[0])] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    loginMutation.mutate(result.data, { onSuccess: onChallenge });
  };

  // The server's own field-level errors (RFC 7807 `errors[]`), keyed the
  // same way the client-side zod errors above are, so either can fill the
  // same `error` prop on each field.
  const serverFieldErrors: Record<string, string> = {};
  for (const issue of loginMutation.error?.errors ?? []) {
    serverFieldErrors[issue.path] = issue.message;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Email address"
        type="email"
        name="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email ?? serverFieldErrors.email}
        autoComplete="email"
        required
      />
      <PasswordField
        label="Password"
        name="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password ?? serverFieldErrors.password}
        autoComplete="current-password"
        required
      />

      <div className="flex items-center justify-end">
        <a href="#" className="text-xs font-medium text-brand hover:underline">
          Forgot password?
        </a>
      </div>

      <Button type="submit" loading={loginMutation.isPending}>
        {loginMutation.isPending ? 'Continuing…' : 'Continue'}
      </Button>
    </form>
  );
}
