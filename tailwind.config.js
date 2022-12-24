/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'rubik':['Rubik 80s Fade'],
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}