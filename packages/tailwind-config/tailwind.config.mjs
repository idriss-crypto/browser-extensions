import plugin from 'tailwindcss/plugin';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.resolve(__dirname, '../ui/src/**/*.{ts,tsx}'),
    path.resolve(__dirname, '../../apps/extension/src/**/*.{ts,tsx}'),
    path.resolve(__dirname, '../../apps/landing-page/src/**/*.{ts,tsx}'),
  ],
  theme: {
    extend: {
      spacing: {
        4.5: '18px',
      },
      colors: {
        brand: {
          primary: '#5FEB3C',
          secondary: '#2AD012',
          tertiary: '#05AB13',
        },
        onsurface: {
          primary: '#000A05',
        },
        // legacy colors
        polymarket: {
          gray: '#1D2B39',
        },
        farcaster: {
          primary: {
            400: '#8A63D2',
            500: '#7554B3',
          },
        },
        idriss: {
          primary: {
            500: '#11dd74',
            400: '#11cc74',
          },
        },
        twitter: {
          primary: '#1D9BF0',
        },
        tally: {
          purple: {
            100: '#EBE5FF',
            500: '#725BFF',
          },
          gray: {
            500: '#667085',
            600: '#475467',
            700: '#344054',
            900: '#101828',
          },
          teal: {
            50: '#D9FFFB',
            600: '#00BFAF',
          },
          red: {
            500: '#F44061',
            100: '#FFE6E7',
          },
          border: {
            primary: '#EAECF0',
            gray: { 700: '#2D3748' },
          },
          text: {
            primary: '#1D2939',
          },
        },
      },
    },
  },
  plugins: [
    '@tailwindcss/forms',
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.fill-rule-non-zero': {
          'fill-rule': 'nonzero',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
