import './globals.css';
import { site } from '@/lib/data';

export const metadata = {
  title: 'Sprinkles & Sparkles BB | Holographic desserts, tutorials and sanding sugars',
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const viewport = {
  themeColor: '#0a0710',
};
