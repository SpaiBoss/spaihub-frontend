/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
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
          muted: '#F0F2F5',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Syne', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
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
        'portal-gradient': 'linear-gradient(180deg, #F0F2F5 0%, #E8EBEE 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease-out both',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'hero-in': 'heroIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-soft': 'pulseSoft 3.2s ease-in-out infinite',
        'drift': 'drift 28s linear infinite',
        'signal-ring': 'signalRing 4.5s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroIn: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-48px, -24px, 0)' },
        },
        signalRing: {
          '0%': { opacity: '0.55', transform: 'scale(0.72)' },
          '70%': { opacity: '0' },
          '100%': { opacity: '0', transform: 'scale(1.35)' },
        },
      },
    },
  },
  plugins: [],
};
