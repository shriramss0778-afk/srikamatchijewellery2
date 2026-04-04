/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'dark-gold': '#B8962E',
        'deep-brown': '#2B1B12',
        'soft-black': '#121212',
        'rich-black': '#0A0A0A',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        tamil: ['"Noto Serif Tamil"', 'serif'],
      },
      boxShadow: {
        gold: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
        'gold-sm': '0 0 10px rgba(212, 175, 55, 0.3)',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
