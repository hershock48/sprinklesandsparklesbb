# Sprinkles & Sparkles BB

Spec build for Brittany Bennett's holographic dessert business in Marshall,
Michigan. Next 16, React 19, Tailwind 3, Stripe hosted Checkout. Her live store
is a Shopify Dawn theme at sprinklessparklesbb.com; this is the site we would put
in its place, plus the proposal that argues for it.

Read `glaze/clients/sprinkles.md` in the `glazedweb` repo before touching copy or
design. Decisions on file: storefront built in, no Shopify link-out, light and
multicolored after the first concept came back too dark, and leave the domain
spelling alone.

## Status, September 2026

- Demo complete and deployed. Vercel project `sprinklesandsparklesbb`, team
  glazedweb. Production is the `main` branch.
- Proposal built per `glaze/proposal.md` and served at the root of
  **sprinkles.glazedweb.com**, with the demo under `/demo`. The domain is already
  attached to the Vercel project.
- Price in the proposal: **$500 build, $50 a month.** Kevin's number, 2026-09-03,
  an old friend-price pitch that predates the menu, same bracket as Chism.
- The letter closes on **Launch**, which opens glazedweb.com/build/sprinkles;
  the agreement is glazedweb.com/agreement/sprinkles. Both read from the
  `sprinkles` row in `glazedweb/lib/customOrders.js`, per `glaze/launch-page.md`.
  Numbers and scope live there, not here.
- Not yet shown to Brittany.

## Run it

```bash
npm ci
npm run dev
```

Production build and a local check of the host split:

```bash
npm run build
npm run start -- -p 4490
curl -s -H "Host: sprinkles.glazedweb.com" http://127.0.0.1:4490/ | head -c 300
```

The first command should return the proposal's HTML. Without the Host header the
same URL returns the site.

## The host split

`next.config.mjs` carries three host-scoped rewrites in `beforeFiles`:

| Request on sprinkles.glazedweb.com | Serves |
|---|---|
| `/` | `public/pitch/sprinkles/index.html`, the proposal |
| `/demo` | the site's homepage |
| `/demo/anything` | `/anything` |

They must stay in `beforeFiles`. A plain `rewrites()` array runs after Next has
matched `app/page.js` to `/`, so the root rewrite would never fire. Host scoping
rather than `basePath` because `basePath` is global and would bury the real site
under `/demo` the day her domain points here.

Links inside the demo are root-relative, so the `/demo` prefix drops off after
the first click. Nothing 404s. The one link that would break is the wordmark,
which points at `/` and would land on the proposal; `components/Nav.jsx` resolves
it to `/demo` from the hostname.

Every path on every host sends `X-Robots-Tag: noindex, nofollow`, and
`app/layout.js` sets `robots: { index: false }`. The demo is a full copy of a live
store and must not compete with it. **Remove both together on the day the site
becomes hers.**

**Delete `public/pitch/`, the rewrites, and the hostname check in Nav.jsx once
Brittany signs or passes.**

## The two link cards

| File | Whose | Used by |
|---|---|---|
| `public/og.jpg` | Hers, entirely | the demo, via `openGraph.images` in `app/layout.js` |
| `public/pitch/sprinkles/og.jpg` | Glazed's argument in her colors | the proposal |

Both are 1200x630, rendered from HTML with Playwright rather than drawn, and
checked against the center 630px crop that iOS shows. The proposal's `og:image`
is hardcoded to `https://sprinkles.glazedweb.com/...`, which is correct for the
pitch host and nowhere else.

`public/pitch/sprinkles/icon.png` and `apple-touch-icon.png` are Glazed's mark,
copied from the louies pitch. The demo declares its own icon (`app/icon.svg`), so
neither document falls back to the origin root and neither can win the other's
tab.

## Where the facts live

- `lib/data.js`: site name, email, socials, nav, retailers, hero and about images.
- `lib/catalog.js`: every product, price (in cents), and which digital file it
  unlocks. `homeProducts` picks the five the homepage leads with.
- `.env.example`: every secret and file URL the build wants, authoritatively.

Prices were checked against her live store's `/products.json` on 2026-09-03.
The sheets went from $13.99 to $15.50 and the Mystery Dumpling label (Aug 2026)
was added then.

## Before launch, in order

- [ ] **PLACEHOLDER prices.** `SUGAR_PRICE`, `SHIPPING` and `FREE_SHIPPING_AT`
      in `lib/catalog.js` are stand-ins. Confirm with Brittany, or remove the
      sugar shelf entirely if her retailer agreements keep direct sales off the
      table. The proposal says they are placeholders; the site must not go live
      with them.
- [ ] Re-check every price in `lib/catalog.js` against her Shopify.
- [ ] `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Vercel, from **her**
      Stripe account. Webhook endpoint `/api/stripe/webhook`, event
      `checkout.session.completed`.
- [ ] The five download URLs (`DL_*`). Until set, the confirmation page and the
      buyer email say "emailed to you shortly" instead of showing a broken button.
- [ ] `RESEND_API_KEY`, `ORDER_FROM`, `ORDER_TO`, then one real test order and
      one real list signup, confirmed arriving in a real inbox.
- [ ] `NEXT_PUBLIC_SITE_URL` to her domain, and `metadataBase` in `app/layout.js`
      to match.
- [ ] Remove the noindex, both halves (header in `next.config.mjs`, `robots` in
      `app/layout.js`).
- [ ] Delete the pitch: `public/pitch/`, the rewrites block, the Nav hostname
      check. Then point sprinklessparklesbb.com at Vercel.
- [ ] Her logo file. The wordmark is typeset; there is no logo art in the repo.
- [ ] Tell her about the studio credit in the footer.

## Traps

- Hero and product images are served from her Shopify CDN. If she closes the
  Shopify store, every image on this site 404s. Copy them into `public/` before
  that day.
- `.btn-candy` and `.btn-outline` are plain CSS after `@tailwind utilities`, so a
  Tailwind `hidden` on them does nothing; use `!hidden`. Nav.jsx has the note.
- The download route trusts Stripe as the record: it redirects only for a paid
  session whose cart metadata contains the slug. There is no database.
