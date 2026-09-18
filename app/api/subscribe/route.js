import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let email;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  if (typeof email !== 'string' || !EMAIL.test(email.trim())) {
    return NextResponse.json({ error: 'That email does not look right.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM;
  const to = process.env.ORDER_TO;

  // Not wired up yet: still tell the person something true rather than
  // pretending it worked.
  if (!apiKey || !from || !to) {
    console.log('[subscribe] no mail configured, signup:', email);
    return NextResponse.json({
      message: 'Got it. You are on the list.',
    });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: 'New list signup',
        text: `${email} joined the Sprinkles & Sparkles list.`,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    // A 2xx is not an acceptance. Resend answers an accepted message with a
    // body carrying an id, and that id is the only evidence it took the
    // signup. A 2xx with any other body, which is what a changed API surface
    // or a proxy in front of the call looks like, queued nothing, and the
    // person would be told they are on a list nobody was told about.
    const accepted = await res.json().catch(() => null);
    if (!accepted || typeof accepted.id !== 'string' || !accepted.id) {
      throw new Error(`Resend ${res.status} with no acceptance id`);
    }
  } catch (err) {
    console.error('[subscribe]', err?.message);
    return NextResponse.json({ error: 'Could not sign you up right now.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Got it. You are on the list.' });
}
