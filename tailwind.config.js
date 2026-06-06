/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy / near-black base
        pitch: {
          950: '#05070d',
          900: '#080b14',
          850: '#0b1020',
          800: '#0f1628',
          700: '#152038',
        },
        // Neon "pitch lights" green
        neon: {
          DEFAULT: '#3ef58b',
          400: '#5cff9f',
          500: '#3ef58b',
          600: '#1fd96f',
          glow: '#0bffae',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(62,245,139,0.25), 0 0 24px -4px rgba(62,245,139,0.45)',
        glass: '0 8px 40px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(1200px 600px at 50% -10%, rgba(62,245,139,0.16), transparent 60%)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(62,245,139,0.35)' },
          '50%': { boxShadow: '0 0 28px 4px rgba(62,245,139,0.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'floaty-slow': 'floaty 9s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
