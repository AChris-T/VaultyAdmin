import type { Metadata } from 'next';
import ComingSoon from '@/components/shared/coming-soon';

export const metadata: Metadata = {
  title: 'Settings | Vaultly Admin',
};

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings, coming soon"
      description="We're still building this out. Check back soon."
    />
  );
}
