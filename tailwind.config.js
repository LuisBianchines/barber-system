/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#050505',
          ink: '#0F0F10',
          charcoal: '#18181B',
          graphite: '#27272A',
          smoke: '#71717A',
          silver: '#C7C7C7',
          ivory: '#F5F2EE',
          cream: '#FFF8EF',
          copper: '#B1845C',
          gold: '#D6A36A',
          red: '#C8322E',
          blue: '#2C4F8F',
        },
      },
      boxShadow: {
        premium: '0 24px 80px rgba(0, 0, 0, 0.35)',
        gold: '0 18px 50px rgba(214, 163, 106, 0.16)',
      },
    },
  },
  plugins: [],
};
