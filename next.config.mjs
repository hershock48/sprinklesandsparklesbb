/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprinklessparklesbb.com',
        pathname: '/cdn/shop/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },

  /*
    THE HOST SPLIT, per glaze/proposal.md. The pitch host serves the proposal at
    its root and the full demo under /demo; Brittany's own domain, when it moves
    here, serves the site at its root with no proposal anywhere.

    These MUST be beforeFiles: a plain rewrites() array is afterFiles, which only
    runs after Next has failed to find a page, and app/page.js already answers /,
    so the root rewrite would silently never fire.

    Host scoping rather than basePath, because basePath is global to a build and
    would bury the real site under /demo the day sprinklessparklesbb.com points
    here.

    Nav.jsx resolves its home link from the same hostname, so the wordmark inside
    the demo goes to /demo and not back out to the sales letter. Keep the two in
    sync.

    DELETE this whole block, and public/pitch/, once Brittany signs or passes.
  */
  async rewrites() {
    const onPitchHost = [{ type: 'host', value: 'sprinkles.glazedweb.com' }];
    return {
      beforeFiles: [
        { source: '/', destination: '/pitch/sprinkles/index.html', has: onPitchHost },
        { source: '/demo', destination: '/', has: onPitchHost },
        { source: '/demo/:path*', destination: '/:path*', has: onPitchHost },
      ],
    };
  },

  // NOINDEX WHILE THIS IS A SPEC BUILD. The demo is a full copy of a live store
  // and must never compete with sprinklessparklesbb.com for its own name. This
  // covers the pitch host and every .vercel.app host, which proposal.md requires.
  // Remove this and the robots block in app/layout.js together, on the day the
  // site becomes hers and moves to her domain.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
