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
  },
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
