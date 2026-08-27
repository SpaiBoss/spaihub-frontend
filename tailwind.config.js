/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Remapped to graphite ink (call sites keep `navy-*` class names)
        navy: {
          DEFAULT: '#0E141B',
          dark: '#0A0F14',
          light: '#161D27',
        },
        brand: {
          DEFAULT: '#0F766E',
          light: '#148F86',
          dark: '#0B5F59',
        },
        signal: {
          DEFAULT: '#1F7A4C',
          muted: '#E8F5EE',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.5rem',
        '2xl': '0.5rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(14 20 27 / 0.04)',
        'card-hover': '0 4px 12px -2px rgb(14 20 27 / 0.08)',
        elevated: '0 12px 32px -8px rgb(14 20 27 / 0.14)',
        sidebar: '1px 0 0 0 rgb(255 255 255 / 0.06)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(180deg, #0E141B 0%, #161D27 100%)',
        'auth-panel': 'linear-gradient(180deg, #0E141B 0%, #161D27 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, #0E141B 0%, #0E141B 100%)',
        'portal-gradient': 'linear-gradient(180deg, #F3F4F6 0%, #EEF0F3 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.28s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
