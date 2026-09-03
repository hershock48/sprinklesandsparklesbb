/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Tailwind's smallest default breakpoint is sm at 640px, which is no use
      // when the thing that breaks is a 320px phone against a 390px one. 380 is
      // the width above which the header has room for the wordmark at full size.
      screens: {
        xs: '380px',
      },
      colors: {
        // light, bakery-counter base
        frosting: '#FFFCF7',
        vanilla: '#FFF6EA',
        batter: '#FFEDD6',
        shell: '#FFFFFF',
        ink: '#2E2340',
        muted: '#6E5E7E', // was #7C6C8C (4.47:1 on vanilla, three hundredths short), then #7A6A8A, which still failed at 320 where the hero eyebrow sits over the pink glow. 5.3:1 on vanilla leaves headroom for tinted grounds. Token, not element.
        line: '#F0E3D6',

        // the sprinkle jar
        pink: '#D41F6A', // was #FF4E9B. Text and buttons live on this token; 2.88:1 on vanilla failed axe 100+ times. #D41F6A is 4.67 as text on vanilla and 5.00 under white. Confetti and gradients keep the bright literal.
        bubble: '#FF8FC0',
        tangerine: '#FF8A3D',
        lemon: '#FFC93C',
        lime: '#5FCB53',
        aqua: '#2DC7DE',
        grape: '#755AD7', // was #8B6BFF, 3.63 as text. Used as text and borders only; the bright violet stays in ACCENTS.
      },
      fontFamily: {
        display: ['var(--font-display)', 'Trebuchet MS', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1180px',
      },
      boxShadow: {
        candy: '0 18px 40px -22px rgba(46, 35, 64, 0.35)',
        pop: '0 26px 60px -28px rgba(255, 78, 155, 0.55)',
      },
      borderRadius: {
        blob: '32px',
      },
    },
  },
  plugins: [],
};
