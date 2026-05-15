import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          25: '#e8e6e3',
          50: '#E0DDCF',
          75: '#c7c0c6ff',
          100: '#8a8a8a',
          125: '#777a7a',
          150: '#686868',
          175: '#4d5356',
        },
      },
      spacing: {
        50: '200px',
        75: '300px',
        125: '500px',
      },
      height: {
        inherit: 'inherit',
        'exclude-navigation': 'calc(100vh - 40px)',
      },
      maxHeight: {
        'exclude-navigation': 'calc(100vh - 40px)',
      },
      weight: {
        about: 'calc(100vh - 300px)',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/typography'),
  ],
};

export default config;
