/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0710',
        panel: '#140f1d',
        panel2: '#1c1527',
        line: '#2e2440',
        cream: '#fdf7f2',
        sugar: '#f7ecf6',
        muted: '#b3a6c9',
        pink: '#ff9ad5',
        lav: '#b9a3ff',
        cyan: '#7fe6f0',
        mint: '#9df7c8',
        gold: '#ffd98e',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
};
