const COLORS = ['#FF4E9B', '#FF8A3D', '#FFC93C', '#5FCB53', '#2DC7DE', '#8B6BFF', '#FF8FC0'];

// Fixed scatter so server and client render the same thing.
const PIECES = [
  [4, 12, -22, 0, 0], [11, 68, 38, 3, 0.8], [7, 34, 12, 1, 1.6],
  [17, 88, -48, 5, 0.4], [21, 21, 64, 2, 2.1], [26, 54, -14, 4, 1.1],
  [31, 8, 28, 6, 0.2], [35, 76, -62, 0, 1.9], [42, 40, 18, 3, 0.6],
  [47, 92, -30, 5, 1.4], [52, 16, 52, 1, 2.3], [58, 62, -8, 2, 0.9],
  [63, 30, 34, 6, 1.7], [68, 84, -54, 4, 0.3], [73, 10, 22, 0, 2.0],
  [78, 48, -38, 3, 1.2], [83, 72, 58, 5, 0.5], [88, 26, -18, 1, 1.8],
  [92, 58, 30, 2, 1.0], [96, 14, -44, 6, 2.2], [14, 46, 8, 4, 1.5],
  [39, 64, -26, 6, 0.7], [55, 86, 42, 0, 1.3], [85, 44, -12, 3, 2.4],
];

export default function Confetti({ className = '', density = 1, dots = true }) {
  const pieces = PIECES.filter((_, i) => i % Math.max(1, Math.round(1 / density)) === 0);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {pieces.map(([left, top, rot, colorIndex, delay], i) => {
        const isDot = dots && i % 4 === 3;
        return (
          <span
            key={i}
            className={`sprinkle${isDot ? ' sprinkle-dot' : ''}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              background: COLORS[colorIndex],
              animationDelay: `${delay}s`,
              '--rot': `${rot}deg`,
              transform: `rotate(${rot}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
