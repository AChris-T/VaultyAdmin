import type { Metadata } from 'next';
import LoginForm from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Log in | Vaultly Admin',
};

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-90.25">
      <LoginForm />
    </div>
  );
}
