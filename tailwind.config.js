/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // light, bakery-counter base
        frosting: '#FFFCF7',
        vanilla: '#FFF6EA',
        batter: '#FFEDD6',
        shell: '#FFFFFF',
        ink: '#2E2340',
        muted: '#7C6C8C',
        line: '#F0E3D6',

        // the sprinkle jar
        pink: '#FF4E9B',
        bubble: '#FF8FC0',
        tangerine: '#FF8A3D',
        lemon: '#FFC93C',
        lime: '#5FCB53',
        aqua: '#2DC7DE',
        grape: '#8B6BFF',
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
