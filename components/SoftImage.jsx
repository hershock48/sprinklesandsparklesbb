'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * next/image that arrives instead of appearing.
 *
 * variant="soft"  hero and feature images: pastel placeholder, blur and a slow
 *                 settle. Use it on the few big photos, not everywhere.
 * variant="plain" grid thumbnails: a quick clean fade, nothing else.
 */
export default function SoftImage({ variant = 'plain', className = '', ...props }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  // A cached image can finish before React attaches onLoad, which would leave
  // it stuck at zero opacity. Check the real DOM node once on mount.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  const soft = variant === 'soft';

  return (
    <>
      {soft && <span aria-hidden className={`img-shell ${loaded ? 'img-hidden' : ''}`} />}
      <Image
        {...props}
        ref={ref}
        onLoad={() => setLoaded(true)}
        className={`${className} ${
          soft
            ? `img-soft ${loaded ? 'img-loaded' : ''}`
            : `transition-opacity duration-500 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`
        }`}
      />
    </>
  );
}
