import plugin from 'tailwindcss/plugin';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.resolve(__dirname, '../ui/src/**/*.{ts,tsx}'),
    path.resolve(__dirname, '../../apps/extension/src/**/*.{ts,tsx}'),
    path.resolve(__dirname, '../../apps/main-landing/src/**/*.{ts,tsx}'),
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      neutral: {
        100: '#F6F7F8',
        200: '#EBECEE',
        300: '#DBDDE2',
        400: '#AAAFB9',
        500: '#8F94A2',
        600: '#717484',
        700: '#5F616E',
        800: '#4E505A',
        900: '#323339',
      },
      neutralGreen: {
        500: '#656D69',
        700: '#323D37',
        900: '#000A05',
      },
      mint: {
        100: '#FAFFF5',
        200: '#E7FED8',
        300: '#B8FB9B',
        400: '#5FEB3C',
        500: '#2AD012',
        600: '#05AB13',
        700: '#176410',
        800: '#175413',
        900: '#052F04',
      },
      midnightGreen: {
        100: '#EBFEF3',
        200: '#CFFCE1',
        300: '#A3F7C8',
        400: '#2CDB8A',
        500: '#08C172',
        600: '#007E4D',
        700: '#02633F',
        800: '#035136',
        900: '#002D1E',
      },
      lime: {
        100: '#FBFFE6',
        200: '#F5FEC9',
        300: '#E9FD99',
        400: '#C8F041',
        500: '#A4D50D',
        600: '#60810A',
        700: '#4C660E',
        800: '#405611',
        900: '#213003',
      },
      red: {
        100: '#FEF2F2',
        200: '#FEE3E2',
        300: '#FFCBC9',
        400: '#F97470',
        500: '#F03E38',
        600: '#BB1F1A',
        700: '#9A1E1A',
        800: '#801F1C',
        900: '#460B09',
      },
      indigo: {
        200: '#E9E7FE',
        500: '#4C3DF2',
      },
    },
    extend: {
      boxShadow: {
        input: '0px 0px 0px 4px #F2F2F224',
        input2: '0px 0px 0px 4px #FFFFFF24',
      },
      blur: {
        md: '10px',
      },
      zIndex: {
        1: '1',
      },
      fontFamily: {
        sans: ['var(--font-aeonikpro)'],
      },
      spacing: {
        4.5: '18px',
      },
      fontSize: {
        button1: ['1rem', { lineHeight: '1.25em' }],
      },
      colors: {
        onsurface: {
          primary: '#000A05',
        },
        // LEGACY COLORS
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
