import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Example content paths...
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        red: { ...colors.red, DEFAULT: colors.red[600] },
        blue: { ...colors.sky, DEFAULT: colors.sky[600] },
        green: { ...colors.emerald, DEFAULT: colors.emerald[600] },
        yellow: { ...colors.amber, DEFAULT: colors.amber[600] },
        purple: { ...colors.violet, DEFAULT: colors.violet[600] }
      },
      animation: {
        destroy: 'destroy 0.5s ease-in-out forwards',
        'bullet-move': 'bullet-move 0.5s ease-out forwards',
        'bullet-bounce': 'bullet-bounce 0.3s ease-out infinite',
        'bullet-preview': 'bullet-preview 1s ease-out infinite'
      },
      keyframes: {
        destroy: {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.2) rotate(180deg)',
            opacity: '0.8'
          },
          '100%': {
            transform: 'scale(0) rotate(360deg)',
            opacity: '0'
          }
        },
        'bullet-move': {
          '0%': {
            transform: 'scale(1)',
            filter: 'brightness(1)'
          },
          '50%': {
            transform: 'scale(1.1)',
            filter: 'brightness(1.2)'
          },
          '100%': {
            transform: 'scale(1)',
            filter: 'brightness(1)'
          }
        },
        'bullet-bounce': {
          '0%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.05)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        },
        'bullet-preview': {
          '0%': {
            opacity: '0.3',
            scale: '1'
          },
          '50%': {
            opacity: '0.5',
            scale: '1.05'
          },
          '100%': {
            opacity: '0.3',
            scale: '1'
          }
        }
      },
      boxShadow: {
        neon: '0 0 4px #fff,\
        inset 0 0 4px #fff,\
        0 0 8px #c6e2ff,\
        inset 0 0 8px #c6e2ff,\
        0 0 16px #c6e2ff,\
        inset 0 0 16px #c6e2ff',
        red: '0 0 4px #fff,\
        inset 0 0 4px #fff,\
        0 0 8px #dc2626,\
        inset 0 0 8px #dc2626,\
        0 0 16px #dc2626,\
        inset 0 0 16px #dc2626',
        blue: '0 0 4px #fff,\
        inset 0 0 4px #fff,\
        0 0 8px #0284c7,\
        inset 0 0 8px #0284c7,\
        0 0 16px #0284c7,\
        inset 0 0 16px #0284c7',
        green:
          '0 0 4px #fff,\
        inset 0 0 4px #fff,\
        0 0 8px #059669,\
        inset 0 0 8px #059669,\
        0 0 16px #059669,\
        inset 0 0 16px #059669',
        yellow:
          '0 0 4px #fff,\
        inset 0 0 4px #fff,\
        0 0 8px #d97706,\
        inset 0 0 8px #d97706,\
        0 0 16px #d97706,\
        inset 0 0 16px #d97706',
        purple:
          '0 0 4px #fff,\
        inset 0 0 4px #fff,\
        0 0 8px #7c3aed,\
        inset 0 0 8px #7c3aed,\
        0 0 16px #7c3aed,\
        inset 0 0 16px #7c3aed'
      }
    },
    dropShadow: {
      red: ['0 0 4px #fff', '0 0 8px #dc2626', '0 0 16px #dc2626'],
      blue: ['0 0 4px #fff', '0 0 8px #0284c7', '0 0 16px #0284c7'],
      green: ['0 0 4px #fff', '0 0 8px #059669', '0 0 16px #059669'],
      yellow: ['0 0 4px #fff', '0 0 8px #d97706', '0 0 16px #d97706'],
      purple: ['0 0 4px #fff', '0 0 8px #7c3aed', '0 0 16px #7c3aed'],
      ['red-sm']: ['0 0 2px #fff', '0 0 4px #dc2626', '0 0 8px #dc2626'],
      ['blue-sm']: ['0 0 2px #fff', '0 0 4px #0284c7', '0 0 8px #0284c7'],
      ['green-sm']: ['0 0 2px #fff', '0 0 4px #059669', '0 0 8px #059669'],
      ['yellow-sm']: ['0 0 2px #fff', '0 0 4px #d97706', '0 0 8px #d97706'],
      ['purple-sm']: ['0 0 2px #fff', '0 0 4px #7c3aed', '0 0 8px #7c3aed']
    }
  },
  plugins: []
}
