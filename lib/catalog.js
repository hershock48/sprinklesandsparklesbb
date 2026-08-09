const CDN = 'https://sprinklessparklesbb.com/cdn/shop/files';

/* ------------------------------------------------------------------
   PRICES TO CONFIRM WITH BRITTANY

   SUGAR_PRICE       what one jar sells for direct from her site
   SHEETS_PRICE      confirmed from the current shop, $13.99
   SHIPPING          flat rate charged on any order with a physical item
   FREE_SHIPPING_AT  order subtotal where shipping goes free, 0 disables it

   Everything is in cents so Stripe gets exact integers.
------------------------------------------------------------------ */
export const SUGAR_PRICE = 950; // PLACEHOLDER
export const SHIPPING = 650; // PLACEHOLDER
export const FREE_SHIPPING_AT = 5000; // PLACEHOLDER, set 0 to turn off

export const CURRENCY = 'usd';

export const money = (cents) =>
  (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

/* ------------------------------------------------------------------
   Digital products. `file` is the key looked up in DOWNLOADS below.
------------------------------------------------------------------ */
const digital = [
  {
    slug: 'holographic-cake-pop-tutorial',
    name: 'Holographic Cake Pop Tutorial',
    kind: 'digital',
    price: 1800,
    category: 'Tutorials',
    badge: 'Most loved',
    tagline: 'For makers who already make cake pops',
    blurb:
      'The full method for the mirror-finish cake pops, start to finish. Video plus a PDF of the tips that took years to work out.',
    body: [
      'This is the whole method, not the highlights. You get the video walkthrough plus a PDF of the notes that took years of trial and error to pin down.',
      'It assumes you already know your way around a cake pop. What it teaches is the part nobody explains: getting a clean, unbroken mirror finish that holds up out of the fridge.',
    ],
    includes: [
      'Full length video walkthrough',
      'Printable PDF with temperatures, timings and fixes',
      'Yours forever, watch it as many times as you like',
    ],
    image: `${CDN}/Holo_Cake_Pop.jpg?v=1743979310&width=1200`,
    alt: 'Holographic chocolate cake pop',
    file: 'cake-pop-tutorial',
    featured: true,
  },
  {
    slug: 'holographic-chocolate-bar-mold-tutorial',
    name: 'Holographic Chocolate Bar Mold Tutorial',
    kind: 'digital',
    price: 1200,
    category: 'Tutorials',
    tagline: 'Tutorial only, molds sold by our retailers',
    blurb: 'How to pull a clean holographic finish off a chocolate bar mold every time.',
    body: [
      'Bar molds are less forgiving than pops. The chocolate has to release clean or the whole rainbow goes with it.',
      'This walks through the temper, the timing and the release so you get a finished bar that looks like the photos.',
    ],
    includes: ['Video walkthrough', 'Quick reference PDF', 'Yours forever'],
    image: `${CDN}/Holo_Bar.jpg?v=1739669458&width=1200`,
    alt: 'Holographic chocolate bar',
    file: 'chocolate-bar-tutorial',
  },
  {
    slug: 'lightroom-preset',
    name: 'Lightroom Preset',
    kind: 'digital',
    price: 800,
    category: 'For creators',
    tagline: 'For creators',
    blurb: 'The edit behind the photos. One tap and your desserts look like the feed.',
    body: [
      'The same preset used on the Sprinkles & Sparkles photos. It lifts the holographic colors without blowing out the whites on your desserts.',
      'Works in Lightroom on desktop and mobile.',
    ],
    includes: ['One .xmp preset file', 'Install notes for desktop and mobile'],
    image: `${CDN}/IMG-6099.png?v=1776030750&width=1200`,
    alt: 'Edited dessert photography',
    file: 'lightroom-preset',
  },
  {
    slug: 'dessert-maker-social-media-guide',
    name: 'Dessert Maker Social Media Guide',
    kind: 'digital',
    price: 500,
    category: 'For creators',
    tagline: 'For creators',
    blurb: 'What to post, when to post it, and how to make a dessert account grow.',
    body: [
      'A short, practical guide written from running a dessert account that actually grew. No engagement theory, just what to make and when to put it up.',
    ],
    includes: ['PDF guide', 'Posting framework you can reuse every week'],
    image: `${CDN}/DessertMakerIG.png?v=1754875655&width=1200`,
    alt: 'Dessert maker social media guide',
    file: 'social-media-guide',
  },
];

/* ------------------------------------------------------------------
   Physical products
------------------------------------------------------------------ */
export const SUGAR_SHADES = [
  { name: 'Crushed Diamonds', image: `${CDN}/Crushed_Diamonds.jpg?v=1784904871&width=1200` },
  { name: 'Pastel Magic', image: `${CDN}/Sparkling_Sanding_Sugar_Pastel_Magic.jpg?v=1769834148&width=1200` },
  { name: 'Sparkling on 5th', image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_on_5th.jpg?v=1769834206&width=1200` },
  { name: 'Pink Cotton Candy', image: `${CDN}/Sparkling_Sanding_Sugar_Pink_Cotton_Candy.jpg?v=1769834254&width=1200` },
  { name: 'Sparkling Lavender', image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_Lavender.jpg?v=1769834455&width=1200` },
  { name: 'Mermaid', image: `${CDN}/Sparkling_Sanding_Sugar_Mermaid.jpg?v=1769834685&width=1200` },
  { name: 'Sunshine Sparkle', image: `${CDN}/63FF4293-6882-4C3B-AA7E-00E1A6CB4A1E.jpg?v=1776788649&width=1200` },
  { name: 'Sparkling Hollow', image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_Hollow_2.jpg?v=1769834348&width=1200` },
  { name: 'Magnetic', image: `${CDN}/Magnetic_Sparkling_Sanding_Sugar.jpg?v=1778552640&width=1200` },
  { name: 'Sparkling Christmas Tree', image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_Christmas_Tree.jpg?v=1769834399&width=1200` },
];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const sugarProducts = SUGAR_SHADES.map((shade) => ({
  slug: `sanding-sugar-${slugify(shade.name)}`,
  name: `${shade.name} Sparkling Sanding Sugar`,
  shortName: shade.name,
  kind: 'physical',
  price: SUGAR_PRICE,
  category: 'Sanding Sugars',
  tagline: 'Made by Brittany',
  blurb: `${shade.name} catches light its own way. Sprinkle it on before the icing sets.`,
  body: [
    'Sparkling Sanding Sugar is made in small batches by Brittany. The crystals are cut to throw light rather than sit flat, which is why it reads as sparkle instead of glitter.',
    'Use it on cookies, cake pops, rims and anything with a wet surface to grab it.',
  ],
  includes: ['One jar', 'Made in Michigan'],
  image: shade.image,
  alt: `${shade.name} Sparkling Sanding Sugar`,
}));

const sheets = {
  slug: 'holographic-dessert-sheets',
  name: 'Holographic Dessert Sheets',
  kind: 'physical',
  price: 1399,
  category: 'Supplies',
  tagline: 'Ships from us',
  blurb: 'The sheets themselves. This is what puts the rainbow on the chocolate.',
  body: [
    'Diffraction sheets, cut for dessert work. Chocolate sets against the textured side and lifts off holographic.',
    'This is the piece people hunt for after they watch the tutorial.',
  ],
  includes: ['Pack of dessert sheets', 'Reusable if you keep them clean'],
  image: `${CDN}/Sprinkles_Sparkles_Diffraction_Grating_Sheet_1.jpg?v=1742686455&width=1200`,
  alt: 'Holographic diffraction dessert sheets',
};

export const catalog = [...digital, sheets, ...sugarProducts];

export const sugars = sugarProducts;

// the five products the homepage leads with
export const homeProducts = [
  'holographic-cake-pop-tutorial',
  'holographic-chocolate-bar-mold-tutorial',
  'holographic-dessert-sheets',
  'lightroom-preset',
  'dessert-maker-social-media-guide',
].map((slug) => catalog.find((p) => p.slug === slug));

export const bySlug = (slug) => catalog.find((p) => p.slug === slug);

export const CATEGORIES = ['Tutorials', 'Sanding Sugars', 'Supplies', 'For creators'];

/* ------------------------------------------------------------------
   Where each digital file actually lives. Set these as environment
   variables once the real files are uploaded. Anything missing simply
   shows as "emailed shortly" on the confirmation page.
------------------------------------------------------------------ */
export const DOWNLOADS = {
  'cake-pop-tutorial': process.env.DL_CAKE_POP_TUTORIAL || '',
  'chocolate-bar-tutorial': process.env.DL_CHOCOLATE_BAR_TUTORIAL || '',
  'lightroom-preset': process.env.DL_LIGHTROOM_PRESET || '',
  'social-media-guide': process.env.DL_SOCIAL_MEDIA_GUIDE || '',
};

export const hasPhysical = (items) =>
  items.some((i) => bySlug(i.slug)?.kind === 'physical');

export function subtotal(items) {
  return items.reduce((sum, i) => {
    const p = bySlug(i.slug);
    return p ? sum + p.price * i.qty : sum;
  }, 0);
}

export function shippingFor(items) {
  if (!hasPhysical(items)) return 0;
  if (FREE_SHIPPING_AT && subtotal(items) >= FREE_SHIPPING_AT) return 0;
  return SHIPPING;
}
