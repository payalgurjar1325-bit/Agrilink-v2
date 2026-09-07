/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        soil: {
          50: '#F7F6F2',
          100: '#EFEDE5',
          900: '#2B2A24',
        },
        field: {
          50: '#F1F6EE',
          100: '#E2EEDB',
          200: '#C7DFBA',
          300: '#A3CB8F',
          400: '#7CB566',
          500: '#5A9A45',
          600: '#437A32',
          700: '#345F27',
          800: '#2A4C21',
          900: '#1F3819',
        },
        wheat: {
          400: '#E0A93E',
          500: '#C68F2A',
        },
        clay: {
          500: '#B5502F',
        },
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(31, 56, 25, 0.08)',
      },
    },
  },
  plugins: [],
};
