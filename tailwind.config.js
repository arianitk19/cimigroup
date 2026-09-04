/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js', './offline.html'],
  theme: {
    extend: {
      colors: {
        bg: '#0E171E',
        surface: '#182028',
        accent: '#E66C21',
        heading: '#F2F5F8'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};
