/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#00BFA5',
          'dark': '#00796B',
        }
      },
    },
  },
  plugins: [],
}

