import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode : 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'gray': {
          25: '#e8e6e3',
          50: '#E0DDCF',
          100: '#777a7a'
        },
      },
      spacing: {
        '50': '200px',
        '75': '300px',
      },
      height: {
        'inherit': 'inherit',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
