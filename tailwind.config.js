// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hospital: {
          pink: '#ff7eb9',
          pinklight: '#fff0f6',
          skyblue: '#4ea8de',
          skybluelight: '#eef8ff',
          darkteal: '#0c2431',
          tealmedium: '#1c4966',
          chrome: '#d1d5db',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
