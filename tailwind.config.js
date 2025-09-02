/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8A0C',
        'primary-dark': '#CF822F',
        'bg-primary': '#1D1D1D',
        'bg-secondary': '#282828',
        'bg-accent': '#3E3E3E',
        'text-secondary': '#B0B0B0',
        'text-muted': '#7D7D7D',
        'border-color': 'rgba(152, 152, 152, 0.32)',
        'success-bg': '#082608',
        'success-border': 'rgba(46, 167, 48, 0.32)',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'inset-custom': '0 0 4px -2px rgba(0, 0, 0, 0.25) inset',
      }
    },
  },
  plugins: ["@tailwindcss/typography", "daisyui"],
  daisyui: {
    themes: [
      {
        bestfit: {
          "primary": "#FF8A0C",
          "primary-content": "#000000",
          "secondary": "#CF822F",
          "accent": "#282828",
          "neutral": "#1D1D1D",
          "base-100": "#1D1D1D",
          "base-200": "#282828",
          "base-300": "#3E3E3E",
          "base-content": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}
