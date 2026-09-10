import StatusScreen from './status-screen';
import { IconRocket } from '@/components/ui/icons';

export default function ComingSoon({
  title = 'Coming soon',
  description = "We're working on this page — check back soon.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <StatusScreen
      icon={<IconRocket className="h-7 w-7" />}
      title={title}
      description={description}
      className="min-h-[60vh]"
    />
  );
}
