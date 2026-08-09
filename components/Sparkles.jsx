const STAR =
  'M12 0c1.1 8 2.9 10.9 12 12-9.1 1.1-10.9 4-12 12-1.1-8-2.9-10.9-12-12 9.1-1.1 10.9-4 12-12z';

const DEFAULT_STARS = [
  { top: '4%', left: '-3%', size: 26, color: '#FFC93C', delay: 0 },
  { top: '18%', right: '-4%', size: 18, color: '#2DC7DE', delay: 0.7 },
  { bottom: '10%', left: '2%', size: 20, color: '#FF4E9B', delay: 1.3 },
  { bottom: '-3%', right: '12%', size: 28, color: '#8B6BFF', delay: 0.4 },
  { top: '46%', right: '-6%', size: 14, color: '#5FCB53', delay: 1.9 },
];

/**
 * Decorative twinkling stars. They stay invisible until an ancestor
 * <Reveal> scrolls into view and picks up the .is-in class.
 */
export default function Sparkles({ stars = DEFAULT_STARS, className = '' }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {stars.map((s, i) => (
        <svg
          key={i}
          className="spark"
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            animationDelay: `${s.delay}s`,
          }}
        >
          <path d={STAR} fill={s.color} />
        </svg>
      ))}
    </div>
  );
}
