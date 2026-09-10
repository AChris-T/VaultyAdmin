import Link from 'next/link';
import StatusScreen from '@/components/shared/status-screen';
import { IconSearch } from '@/components/ui/icons';

export default function NotFound() {
  return (
    <StatusScreen
      icon={<IconSearch className="h-7 w-7" />}
      title="Page not found"
      description="Our team is currently working on it. The page you're looking for doesn't exist or may have moved."
      action={
        <Link
          href="/"
          className="rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Back to home
        </Link>
      }
    />
  );
}
