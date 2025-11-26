/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: Ensure this path includes your Portfolio.jsx file for scanning
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00ff41',
        'terminal-yellow': '#ffd700',
        'terminal-dim': '#008f11',
      },
      fontFamily: {
        mono: ['"Courier New"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
