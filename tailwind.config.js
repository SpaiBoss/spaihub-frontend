/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A3C5E',
          dark: '#111827',
          light: '#2a5280',
        },
        brand: {
          DEFAULT: '#5463FF',
          light: '#6b77ff',
          dark: '#3d4fd9',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f4f7fb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 8px 24px -6px rgb(26 60 94 / 0.12), 0 2px 8px -2px rgb(0 0 0 / 0.04)',
        elevated: '0 20px 50px -12px rgb(26 60 94 / 0.18)',
        sidebar: '4px 0 24px -4px rgb(17 24 39 / 0.15)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1A3C5E 0%, #111827 55%, #5463FF 100%)',
        'auth-panel':
          'linear-gradient(160deg, #0f172a 0%, #111827 32%, #1A3C5E 68%, #243b5c 100%), radial-gradient(at 15% 15%, rgba(84, 99, 255, 0.22) 0, transparent 45%), radial-gradient(at 85% 85%, rgba(26, 60, 94, 0.35) 0, transparent 50%)',
        'sidebar-gradient': 'linear-gradient(180deg, #111827 0%, #1A3C5E 100%)',
        'portal-gradient': 'linear-gradient(180deg, #f4f7fb 0%, #e8eef6 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
