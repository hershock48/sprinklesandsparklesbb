const COLORS = ['#FF4E9B', '#FF8A3D', '#FFC93C', '#5FCB53', '#2DC7DE', '#8B6BFF', '#FF8FC0'];

// Fixed scatter so server and client render the same thing.
// [left%, top%, rotation, colour index, phase 0-2.4]
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

// Seven durations rather than eight, deliberately. There are 24 pieces, so an
// eight-long list would repeat every third piece and line up with the colour
// cycle; seven does not divide 24, so the pattern never settles into a rhythm
// you can see.
const DURATIONS = [9.5, 13, 11, 16, 10.5, 14.5, 12];

export default function Confetti({ className = '', density = 1, dots = true }) {
  const pieces = PIECES.filter((_, i) => i % Math.max(1, Math.round(1 / density)) === 0);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {pieces.map(([left, top, rot, colorIndex, phase], i) => {
        const isDot = dots && i % 4 === 3;
        const dur = DURATIONS[i % DURATIONS.length];
        return (
          <span
            key={i}
            className={`sprinkle${isDot ? ' sprinkle-dot' : ''}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              background: COLORS[colorIndex],
              '--rot': `${rot}deg`,
              '--dur': `${dur}s`,
              // Negative, and scaled to this piece's own duration, so on load
              // every sprinkle is already partway through its cycle instead of
              // all of them starting from a standstill together. The stored
              // phase runs 0 to 2.4, so dividing by 2.4 spreads them across the
              // full cycle rather than across the first couple of seconds.
              '--delay': `-${((phase / 2.4) * dur).toFixed(2)}s`,
              // Alternating sideways drift at three magnitudes. Pure vertical
              // travel reads as hovering; a little sideways makes it float.
              '--dx': `${(i % 2 ? 1 : -1) * (5 + (i % 3) * 3)}px`,
              '--dy': `-${16 + (i % 4) * 4}px`,
              // Turn further in whichever direction the piece already leans, so
              // the rotation looks like the sprinkle's own tilt continuing
              // rather than an arbitrary spin. Invisible on the round dots,
              // which is fine: they get the drift and nothing else.
              '--dr': `${(rot >= 0 ? 1 : -1) * (18 + (i % 3) * 8)}deg`,
              transform: `rotate(${rot}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
