export default function ProgressDots({
  count,
  index,
  paused,
  duration,
  onSelect,
}: {
  count: number;
  index: number;
  paused: boolean;
  duration: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className="h-1 max-w-10 flex-1 overflow-hidden rounded-full bg-white/20"
        >
          {i === index && (
            <span
              key={`${index}-${paused}`}
              className="block h-full origin-left rounded-full bg-white"
              style={{
                animation: paused
                  ? 'none'
                  : `carousel-progress ${duration}ms linear forwards`,
                transform: paused ? 'scaleX(1)' : undefined,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
