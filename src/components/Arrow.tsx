export function Arrow({ direction = 'up' }: { direction?: 'up' | 'left' | 'right' }) {
  const paths = {
    up: 'M5 19 19 5M5 5h14v14',
    left: 'M19 12H5m7-7-7 7 7 7',
    right: 'M5 12h14m-7-7 7 7-7 7',
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
