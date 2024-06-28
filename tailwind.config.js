/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F0C038',
        'primary-dark': '#1C1F26',
        'secondary-dark': '#2A2D36',
        'testing': '#F04444',
        'white': '#FFFFFF',
        'light-gray': '#F4F4F4',
        'medium-gray': '#A5A5A5',
        'background-dark': '#1C1F26',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #F0C038 0%, #F0A638 100%)',
        'background-dark-gradient': 'radial-gradient(circle, rgba(76,87,108,0.2) 0%, #020915 50%, rgba(76,87,108,0.2) 100%)',
      },
      fontFamily: {
        'poppins': ['Poppins-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

