'use client';

import { useEffect } from 'react';
import StatusScreen from '@/components/shared/status-screen';
import RetryButton from '@/components/shared/retry-button';
import { IconTool } from '@/components/ui/icons';
import '@/styles/globals.css';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-black">
        <StatusScreen
          icon={<IconTool className="h-7 w-7" />}
          title="Something went wrong"
          description="Our team is currently working on it — something went wrong on our end. Please try again."
          action={<RetryButton onClick={retry} />}
        />
      </body>
    </html>
  );
}
