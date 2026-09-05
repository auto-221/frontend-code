/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff7143',
        'primary-hover': '#ff8c5a',
        secondary: '#0277bd',
        'secondary-hover': '#0355a8',
      },
      fontFamily: {
        arsenal: ['arsenal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
