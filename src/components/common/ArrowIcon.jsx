export default function ArrowIcon({ className = "stroke-current", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none"
      className={`rotate-45 shrink-0 ${className}`}>
      <path d="M1 13L13 1M13 1H4M13 1V10" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
