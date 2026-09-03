import './globals.css';
import { Fredoka, Nunito } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartProvider';

const display = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://sprinklesandsparklesbb.vercel.app'),
  title: {
    default: 'Sprinkles & Sparkles BB | Holographic desserts, tutorials and sanding sugars',
    template: '%s | Sprinkles & Sparkles BB',
  },
  description:
    'Brittany Bennett has spent 15 years making desserts catch the light. Holographic tutorials, Sparkling Sanding Sugars, dessert sheets and in person workshops.',
  openGraph: {
    title: 'Sprinkles & Sparkles BB',
    description:
      'Holographic dessert tutorials, Sparkling Sanding Sugars and workshops from Brittany Bennett.',
    type: 'website',
    // The demo card. Hers entirely, per glaze/link-cards.md: the proposal has
    // its own card at public/pitch/sprinkles/og.jpg. Rendered from
    // og-cards/demo.html in the scratch tooling, 1200x630, under 1MB.
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Sprinkles & Sparkles BB' }],
  },
  // Spec build: keep it out of the index until it lives on her domain. The
  // matching X-Robots-Tag header is in next.config.mjs; remove both together.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal,.img-soft{opacity:1!important;transform:none!important;filter:none!important}.img-shell{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <CartProvider>
          <Nav />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: '#FFFCF7',
};
