/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0066FF',
          green: '#00D084',
          dark: '#003D99',
          light: '#E6F0FF',
          accent: '#00B872',
        }
      },
    },
  },
  plugins: [],
}
