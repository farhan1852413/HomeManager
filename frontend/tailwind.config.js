/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.gradient-text': {
          'background-image': 'linear-gradient(to right, #6765F2, #A855F7, #EC4899)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    },
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-glow': {
          'text-shadow': '0 0 1px #fff, 0 0 2px #ff00ff, 0 0 3px #ff00ff',
        },
      })
    }
  ],
}