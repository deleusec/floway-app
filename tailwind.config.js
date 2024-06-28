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
          DEFAULT: '#2B0AFF',
          'dark': '#1E0BFF',
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

