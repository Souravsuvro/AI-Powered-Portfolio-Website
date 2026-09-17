/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'mobile': '480px',
      'tablet': '768px',
      'desktop': '1024px',
      'large-desktop': '1440px',
    },
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0F1C',
          50: '#141B2D',
          100: '#1F2937',
          200: '#374151',
          300: '#4B5563',
          400: '#6B7280',
          500: '#9CA3AF',
          600: '#D1D5DB',
          700: '#E5E7EB',
          800: '#F3F4F6',
          900: '#F9FAFB',
        },
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        success: { DEFAULT: '#10B981', dark: '#059669' },
        warning: { DEFAULT: '#F59E0B', dark: '#D97706' },
        error: { DEFAULT: '#EF4444', dark: '#DC2626' },
      },
      backgroundColor: {
        dark: {
          card: '#0F172A',
          hover: '#1E293B',
          active: '#0F172A',
          input: '#1E293B',
        }
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'dark-start': '#0A0F1C',
        'dark-mid': '#131B2E',
        'dark-end': '#1C2744',
      }),
      boxShadow: {
        'dark-glow': '0 0 15px rgba(59, 130, 246, 0.1)',
        'dark-glow-lg': '0 0 30px rgba(59, 130, 246, 0.15)',
      },
      fontSize: {
        'mobile-sm': '0.75rem',
        'mobile-base': '0.875rem',
        'mobile-lg': '1rem',
        'desktop-sm': '0.875rem',
        'desktop-base': '1rem',
        'desktop-lg': '1.25rem',
      },
      spacing: {
        'mobile-gutter': '1rem',
        'desktop-gutter': '2rem',
      },
      keyframes: {
        'route-progress': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'route-progress': 'route-progress 0.5s ease-in-out',
        progress: 'progress 1s ease-out'
      },
      typography: (theme) => ({
        light: {
          css: {
            color: theme('colors.gray.800'),
            a: { color: theme('colors.primary.600'), '&:hover': { color: theme('colors.primary.700') } },
            h1: { color: theme('colors.gray.900') },
            h2: { color: theme('colors.gray.900') },
            h3: { color: theme('colors.gray.800') },
            strong: { color: theme('colors.gray.900') },
          },
        },
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: { color: theme('colors.primary.600'), '&:hover': { color: theme('colors.primary.700') } },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: { color: theme('colors.primary.400'), '&:hover': { color: theme('colors.primary.300') } },
            h1: { color: theme('colors.gray.100') },
            h2: { color: theme('colors.gray.100') },
            h3: { color: theme('colors.gray.100') },
            h4: { color: theme('colors.gray.100') },
            code: { color: theme('colors.gray.100') },
            blockquote: { color: theme('colors.gray.100') },
            strong: { color: theme('colors.gray.100') },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    forms,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.glassmorphism': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          '.dark &': {
            'background': 'rgba(15, 23, 42, 0.8)',
            'border-color': 'rgba(59, 130, 246, 0.1)',
          }
        },
        '.dark-card': {
          'background': '#0F172A',
          'border': '1px solid rgba(59, 130, 246, 0.1)',
          'box-shadow': '0 0 15px rgba(59, 130, 246, 0.1)',
        },
      })
    }),
  ],
  variants: {
    extend: {
      typography: ['dark']
    }
  }
};
