'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('done');
        setMessage(data.message || 'You are on the list.');
        e.target.reset();
      } else {
        setStatus('error');
        setMessage(data.error || 'That did not go through. Try again?');
      }
    } catch {
      setStatus('error');
      setMessage('That did not go through. Try again?');
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto mt-8 max-w-md rounded-full border-2 border-lime bg-white px-6 py-4">
        <p className="font-display font-semibold text-ink">{message}</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-full border-2 border-line bg-white px-6 py-3 text-ink placeholder:text-muted/60 focus:border-aqua focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-candy whitespace-nowrap disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending' : 'Send it'}
        </button>
      </form>
      {status === 'error' && <p className="mt-3 text-sm font-bold text-pink">{message}</p>}
    </>
  );
}
