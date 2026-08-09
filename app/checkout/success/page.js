import Link from 'next/link';
import Stripe from 'stripe';
import Confetti from '@/components/Confetti';
import Reveal from '@/components/Reveal';
import Sparkles from '@/components/Sparkles';
import ClearCart from '@/components/ClearCart';
import { bySlug, money, DOWNLOADS } from '@/lib/catalog';
import { site } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Thank you',
  robots: { index: false },
};

async function loadOrder(sessionId) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !sessionId) return null;
  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return null;
    return session;
  } catch {
    return null;
  }
}

function parseCart(session) {
  return (session?.metadata?.cart || '')
    .split(',')
    .filter(Boolean)
    .map((entry) => {
      const [slug, qty] = entry.split(':');
      return { product: bySlug(slug), qty: parseInt(qty, 10) || 1 };
    })
    .filter((i) => i.product);
}

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;
  const session = await loadOrder(sessionId);
  const items = parseCart(session);
  const digital = items.filter((i) => i.product.kind === 'digital');
  const physical = items.filter((i) => i.product.kind === 'physical');
  const email = session?.customer_details?.email;

  return (
    <main className="pt-24">
      <ClearCart />
      <section className="relative overflow-hidden bg-vanilla py-20">
        <Confetti />
        <div className="relative mx-auto max-w-2xl px-5 text-center">
          <Reveal className="relative">
            <Sparkles
              stars={[
                { top: '-6%', left: '10%', size: 26, color: '#FF4E9B', delay: 0.2 },
                { top: '2%', right: '8%', size: 22, color: '#FFC93C', delay: 0.9 },
                { bottom: '-8%', left: '38%', size: 20, color: '#2DC7DE', delay: 1.6 },
              ]}
            />
            <p className="eyebrow mb-4 text-pink">Order confirmed</p>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight text-ink">
              Thank you. <span className="holo-text">Go make something shiny.</span>
            </h1>
            {email && (
              <p className="mt-5 text-lg text-muted">
                A receipt is on its way to <strong className="text-ink">{email}</strong>.
              </p>
            )}
            {!session && (
              <p className="mt-5 text-lg text-muted">
                We could not look up that order. If you were charged, email{' '}
                <a href={`mailto:${site.email}`} className="font-bold text-pink">
                  {site.email}
                </a>{' '}
                and it will get sorted out.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <div className="stripe h-3 w-full" aria-hidden />

      {session && (
        <section className="bg-frosting py-16">
          <div className="mx-auto max-w-2xl px-5">
            {digital.length > 0 && (
              <Reveal className="mb-8">
                <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-ink">
                  Your downloads
                </h2>
                <ul className="space-y-3">
                  {digital.map(({ product }) => {
                    const ready = Boolean(DOWNLOADS[product.file]);
                    return (
                      <li
                        key={product.slug}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-line bg-white px-5 py-4"
                      >
                        <span className="font-display font-semibold text-ink">
                          {product.name}
                        </span>
                        {ready ? (
                          <a
                            href={`/api/download/${product.slug}?session_id=${sessionId}`}
                            className="btn-candy !px-5 !py-2 text-sm"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="text-sm font-bold text-muted">
                            Emailed to you shortly
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-sm text-muted">
                  Save these files somewhere safe. The links also go out by email so you
                  can come back to them.
                </p>
              </Reveal>
            )}

            {physical.length > 0 && (
              <Reveal>
                <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-ink">
                  Shipping to you
                </h2>
                <ul className="space-y-2">
                  {physical.map(({ product, qty }) => (
                    <li
                      key={product.slug}
                      className="flex items-center justify-between rounded-2xl border-2 border-line bg-white px-5 py-4"
                    >
                      <span className="font-display font-semibold text-ink">
                        {product.name} <span className="text-muted">&times;{qty}</span>
                      </span>
                      <span className="font-bold text-pink">
                        {money(product.price * qty)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-muted">
                  Packed and mailed from Michigan, usually within a couple of days.
                </p>
              </Reveal>
            )}

            <Reveal className="mt-10 text-center">
              <Link href="/shop" className="btn-outline">
                Keep shopping
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
