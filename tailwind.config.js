/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        farsi: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        'green-neon': '#1eff05',
        'red-neon': '#ff0534',
        'pink-neon': '#f82d97',
        'magenta-neon': '#c501e2',
        'blue-neon': '#01c4e7',
        'yellow-neon': '#ffff2a',
        black: '#181715',
        beige: '#f6ebe6',
      },
    },
  },
  plugins: [],
}
