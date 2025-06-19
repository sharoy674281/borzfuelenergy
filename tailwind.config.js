/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        brand: {
          light: '#3b82f6',  // blue-500
          DEFAULT: '#2563eb', // blue-600
          dark: '#1d4ed8',   // blue-700
        },
        accent: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb',  // blue-600
        }
      },
      textColor: {
        DEFAULT: '#ffffff', // White text by default
        'dark': '#ffffff',  // Explicitly white in dark mode
      },
    },
  },
  plugins: [],
}
