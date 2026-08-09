const CDN = 'https://sprinklessparklesbb.com/cdn/shop/files';

export const site = {
  name: 'Sprinkles & Sparkles BB',
  shortName: 'Sprinkles & Sparkles',
  tagline: 'Holographic desserts, taught by the person who made them a thing.',
  email: 'sprinklesandsparklesbb@gmail.com',
  shopBase: 'https://sprinklessparklesbb.com',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/sprinklesandsparklesbb/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@sprinklesandsparklesbb' },
    { label: 'YouTube', href: 'https://www.youtube.com/@sprinklesandsparklesbb' },
    { label: 'Pinterest', href: 'https://www.pinterest.com/sprinklesandsparklesbb/' },
    { label: 'Facebook', href: 'https://www.facebook.com/sprinkles.and.sparkles.b/' },
  ],
};

export const nav = [
  { label: 'Shop', href: '/shop' },
  { label: 'Tutorials', href: '/shop?category=Tutorials' },
  { label: 'Sanding Sugars', href: '/shop?category=Sanding%20Sugars' },
  { label: 'Workshops', href: '/#workshops' },
  { label: 'About', href: '/#about' },
];

export const heroImage = `${CDN}/IMG_5793.jpg?v=1739666173&width=2400`;
export const aboutImage = `${CDN}/SprinklesandSparkles36.jpg?v=1745287915&width=1500`;
export const sugarHeroImage = `${CDN}/Sparkling_Sanding_Sugar.jpg?v=1769822265&width=2400`;

export const products = [
  {
    title: 'Holographic Cake Pop Tutorial',
    price: '$18',
    blurb:
      'The full method for the mirror-finish cake pops, start to finish. Video plus a PDF of the tips that took years to work out.',
    note: 'For makers who already make cake pops',
    image: `${CDN}/Holo_Cake_Pop.jpg?v=1743979310&width=900`,
    alt: 'Holographic chocolate cake pop',
    href: 'https://sprinklessparklesbb.com/products/holographic-cake-pop-tutorial',
    featured: true,
  },
  {
    title: 'Holographic Chocolate Bar Mold Tutorial',
    price: '$12',
    blurb: 'How to pull a clean holographic finish off a chocolate bar mold every time.',
    note: 'Tutorial only, mold sold by our retailers',
    image: `${CDN}/Holo_Bar.jpg?v=1739669458&width=900`,
    alt: 'Holographic chocolate bar',
    href: 'https://sprinklessparklesbb.com/products/holographic-chocolate-bar-mold-tutorial',
  },
  {
    title: 'Holographic Dessert Sheets',
    price: '$13.99',
    blurb: 'The sheets themselves. This is what puts the rainbow on the chocolate.',
    note: 'Ships from us',
    image: `${CDN}/Sprinkles_Sparkles_Diffraction_Grating_Sheet_1.jpg?v=1742686455&width=900`,
    alt: 'Holographic diffraction dessert sheets',
    href: 'https://sprinklessparklesbb.com/products/sprinkles-sparkles-bb-diffraction-grating-sheets',
  },
  {
    title: 'Lightroom Preset',
    price: '$8',
    blurb: 'The edit behind the photos. One tap and your desserts look like the feed.',
    note: 'For creators',
    image: `${CDN}/IMG-6099.png?v=1776030750&width=900`,
    alt: 'Edited dessert photography',
    href: 'https://sprinklessparklesbb.com/collections/all',
  },
  {
    title: 'Dessert Maker Social Media Guide',
    price: '$5',
    blurb: 'What to post, when to post it, and how to make a dessert account grow.',
    note: 'For creators',
    image: `${CDN}/DessertMakerIG.png?v=1754875655&width=900`,
    alt: 'Dessert maker social media guide',
    href: 'https://sprinklessparklesbb.com/products/dessert-maker-social-media-guide-instagram',
  },
];

export const sugars = [
  {
    name: 'Crushed Diamonds',
    image: `${CDN}/Crushed_Diamonds.jpg?v=1784904871&width=900`,
  },
  {
    name: 'Pastel Magic',
    image: `${CDN}/Sparkling_Sanding_Sugar_Pastel_Magic.jpg?v=1769834148&width=900`,
  },
  {
    name: 'Sparkling on 5th',
    image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_on_5th.jpg?v=1769834206&width=900`,
  },
  {
    name: 'Pink Cotton Candy',
    image: `${CDN}/Sparkling_Sanding_Sugar_Pink_Cotton_Candy.jpg?v=1769834254&width=900`,
  },
  {
    name: 'Sparkling Lavender',
    image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_Lavender.jpg?v=1769834455&width=900`,
  },
  {
    name: 'Mermaid',
    image: `${CDN}/Sparkling_Sanding_Sugar_Mermaid.jpg?v=1769834685&width=900`,
  },
  {
    name: 'Sunshine Sparkle',
    image: `${CDN}/63FF4293-6882-4C3B-AA7E-00E1A6CB4A1E.jpg?v=1776788649&width=900`,
  },
  {
    name: 'Sparkling Hollow',
    image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_Hollow_2.jpg?v=1769834348&width=900`,
  },
  {
    name: 'Magnetic',
    image: `${CDN}/Magnetic_Sparkling_Sanding_Sugar.jpg?v=1778552640&width=900`,
  },
  {
    name: 'Sparkling Christmas Tree',
    image: `${CDN}/Sparkling_Sanding_Sugar_Sparkling_Christmas_Tree.jpg?v=1769834399&width=900`,
  },
];

export const retailers = [
  {
    name: 'NY Cake',
    note: 'Sanding sugars',
    href: 'https://nycake.com/products/sanding-sugar-copy?variant=46716195111150',
  },
  {
    name: 'Cakepopbox',
    note: 'In store and online, Santa Clarita CA',
    href: 'https://www.shopcakepopbox.com/category/sprinkles-toppers',
  },
  {
    name: 'A Custom Cookie',
    note: 'Sugars and wafer paper cup wraps',
    href: 'https://acustomcookie.com/collections/sprinkles-sparkles-collection-by-brittany-bennett',
  },
  {
    name: 'Berry Couture Sprinkle Shop',
    note: 'Silicone molds',
    href: 'https://www.berrycouturesprinkleshop.com/',
  },
  {
    name: 'Daisy Makes',
    note: 'Sugars, pairs with their poppers',
    href: 'https://daisymakes.com/',
  },
  {
    name: 'Miss Cookie Packaging',
    note: 'Sanding sugars online',
    href: 'https://misscookiepackaging.com/product-category/sprinkles/',
  },
];
