import ComingSoon from '@/components/shared/coming-soon';

export default function Home() {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="font-gellix text-2xl font-bold text-foreground">
          Operations overview
        </h1>
        <h1 className="font-sans text-[13px] text-muted-foreground">
          Thursday, 3 September · wallet ledger asserted against Anchor 2
          minutes ago
        </h1>
      </div>
      <div>
        <ComingSoon />
      </div>
    </div>
  );
}
