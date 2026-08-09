import CartPageClient from '@/components/CartPageClient';

export const metadata = {
  title: 'Your bag',
  robots: { index: false },
};

export default function CartPage() {
  return <CartPageClient />;
}
