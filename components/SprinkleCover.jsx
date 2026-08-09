'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#FF4E9B', '#FF8A3D', '#FFC93C', '#5FCB53', '#2DC7DE', '#8B6BFF', '#FF8FC0'];

/*
 * Two layers, because one cannot do this job.
 *
 * Individual sprinkle elements cannot actually cover anything. A 350px circle is
 * about 96,000 square pixels and a 14x5 sprinkle is about 70, so genuinely
 * burying the photo would take well over a thousand DOM nodes. So the covering
 * is a tiled SVG texture: one element, real opacity, no node count.
 *
 * But a texture that merely dissolves reads as a fade, not as sprinkles coming
 * off. So a second layer of forty real sprinkles tumbles away on top of it.
 * Those are what the eye actually follows, and they sell the texture's retreat
 * as the same event.
 */

// One tile of the covering texture, repeated. Hand-placed rather than random so
// server and client render identically and the seams do not line up into rows.
const TILE = [
  [6, 9, 24], [30, 5, -38], [52, 14, 62], [74, 7, -12], [90, 18, 40],
  [14, 26, -54], [38, 22, 16], [62, 31, -28], [84, 27, 70], [4, 38, -8],
  [26, 44, 34], [48, 36, -66], [70, 47, 20], [92, 41, -44], [10, 55, 58],
  [34, 61, -22], [56, 52, 44], [78, 63, -60], [96, 58, 12], [18, 72, -36],
  [42, 79, 66], [64, 70, -16], [86, 77, 28], [2, 88, -50], [28, 93, 18],
  [50, 85, -70], [72, 91, 38], [94, 84, -24], [20, 12, 48], [58, 4, -32],
];

function tileDataUri() {
  const w = 120;
  const pieces = TILE.map(([x, y, rot], i) => {
    const c = COLORS[i % COLORS.length];
    // Every fourth one is a round nonpareil rather than a dash.
    if (i % 4 === 3) {
      return `<circle cx="${(x / 100) * w}" cy="${(y / 100) * w}" r="3.1" fill="${c}"/>`;
    }
    const px = (x / 100) * w;
    const py = (y / 100) * w;
    return `<rect x="${px - 7}" y="${py - 2.5}" width="14" height="5" rx="2.5" fill="${c}" transform="rotate(${rot} ${px} ${py})"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w}" viewBox="0 0 ${w} ${w}">${pieces}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Two passes of the same tile at different sizes, the second nudged off the
// grid. One layer at any density reads as wallpaper because the eye finds the
// repeat; two coprime-ish scales overlaid do not line up often enough to spot.
// Together they put roughly 450 sprinkles over a 350px circle, which is dense
// enough to read as buried while still letting the cupcake show through
// faintly, so there is visibly something under there to uncover.
const TEXTURE = tileDataUri();

// The loose sprinkles that fall away. [left%, top%, rotation]
const LOOSE = [
  [22, 8, -28], [58, 5, 40], [80, 14, -12], [12, 22, 56], [44, 18, -48],
  [68, 26, 20], [90, 32, -62], [6, 36, 34], [32, 42, -18], [54, 34, 68],
  [76, 46, -40], [18, 52, 12], [40, 58, -56], [62, 50, 44], [86, 60, -26],
  [10, 66, 60], [34, 74, -34], [56, 68, 16], [78, 78, -52], [94, 72, 38],
  [24, 84, -20], [48, 90, 64], [70, 86, -44], [88, 94, 24], [16, 94, -60],
  [38, 12, 50], [64, 14, -30], [28, 62, 28], [50, 76, -66], [72, 34, 46],
  [4, 48, -14], [92, 50, 58], [20, 36, -42], [46, 46, 22], [66, 60, -58],
  [84, 22, 36], [14, 80, -24], [42, 28, 52], [60, 92, -36], [30, 54, 18],
];

export default function SprinkleCover({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: clear it immediately and never touch it again. Leaving
    // somebody's hero image permanently buried because they turned motion off
    // would be the worst possible reading of that setting.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--r', '1');
      return;
    }

    // Only now does the covering exist. Before this line --r is 1 and the layer
    // is fully masked out, so a visitor without JavaScript, or one who arrives
    // before hydration, sees the photo rather than a circle of confetti.
    el.classList.add('sc-armed');

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      // Half a screen of scrolling clears it completely. Reversible on the way
      // back up, which costs nothing and is a small reward for scrolling.
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.5)));
      // One write per frame on the parent. Every piece derives its own
      // transform from this in CSS, so 40 sprinkles and the texture all move
      // off a single property set rather than 41 style writes.
      el.style.setProperty('--r', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={`sc-root ${className}`}>
      <div
        className="sc-texture"
        style={{ backgroundImage: `${TEXTURE}, ${TEXTURE}` }}
      />
      {LOOSE.map(([left, top, rot], i) => (
        <span
          key={i}
          className={`sc-piece${i % 4 === 3 ? ' sc-dot' : ''}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            background: COLORS[i % COLORS.length],
            '--rot': `${rot}deg`,
            // Lower pieces leave first, so the pile reads as draining rather
            // than as everything sliding at once. Head start scales with how
            // far down the circle the piece sits.
            '--head': (top / 100).toFixed(3),
            // Each piece falls clear of the circle plus a margin, so nothing
            // is left hanging at the bottom edge when the reveal completes.
            '--fall': `${140 - top + 30}%`,
            '--sway': `${(i % 2 ? 1 : -1) * (6 + (i % 4) * 5)}px`,
            '--spin': `${(rot >= 0 ? 1 : -1) * (90 + (i % 5) * 45)}deg`,
          }}
        />
      ))}
    </div>
  );
}
