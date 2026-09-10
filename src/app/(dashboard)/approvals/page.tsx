import type { Metadata } from 'next';
import ComingSoon from '@/components/shared/coming-soon';

export const metadata: Metadata = {
  title: 'Users | Vaultly Admin',
};

export default function UsersPage() {
  return (
    <ComingSoon
      title="Users, coming soon"
      description="We're still building this out. Check back soon."
    />
  );
}
