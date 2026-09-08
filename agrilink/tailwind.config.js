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
          50: 'rgb(var(--field-50) / <alpha-value>)',
          100: 'rgb(var(--field-100) / <alpha-value>)',
          200: 'rgb(var(--field-200) / <alpha-value>)',
          300: 'rgb(var(--field-300) / <alpha-value>)',
          400: 'rgb(var(--field-400) / <alpha-value>)',
          500: 'rgb(var(--field-500) / <alpha-value>)',
          600: 'rgb(var(--field-600) / <alpha-value>)',
          700: 'rgb(var(--field-700) / <alpha-value>)',
          800: 'rgb(var(--field-800) / <alpha-value>)',
          900: 'rgb(var(--field-900) / <alpha-value>)',
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
