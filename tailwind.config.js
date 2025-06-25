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
