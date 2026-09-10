const STROKE_PATH =
  'M0,72 C22,64 34,78 52,58 C72,36 88,52 108,42 C130,30 144,48 164,26 C186,10 202,22 222,10 C242,0 262,10 280,4';

export default function AreaChart() {
  return (
    <svg
      viewBox="0 0 280 96"
      fill="none"
      className="h-20 w-full overflow-visible"
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.28" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 48, 76].map((y) => (
        <line
          key={y}
          x1="0"
          x2="280"
          y1={y}
          y2={y}
          stroke="white"
          strokeOpacity="0.08"
          strokeDasharray="3 4"
        />
      ))}
      <path d={`${STROKE_PATH} L280,96 L0,96 Z`} fill="url(#areaFill)" />
      <path
        d={STROKE_PATH}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="280" cy="4" r="4" fill="white" />
      <circle cx="280" cy="4" r="7" fill="white" fillOpacity="0.25" />
    </svg>
  );
}
