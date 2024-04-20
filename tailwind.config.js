/** @type {import('tailwindcss').Config} */
/* eslint-env node */

const colors = require('./src/theme/colors');
const breakpoints = require('./src/theme/breakpoints');
const _ = require('lodash');

const myexColors = Object.keys(colors).reduce((colorsObj, key) => {
  colorsObj[_.kebabCase(key)] = colors[key];
  return colorsObj;
}, {});

module.exports = {
  important: '#root',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Toggle dark-mode based on class
  darkMode: ['class'],
  theme: {
    screens: {
      xxl: { max: breakpoints.xxl + 'px' },
      // => @media (max-width: 1536px) { ... }

      xl: { max: breakpoints.xl + 'px' },
      // => @media (max-width: 1200px) { ... }

      lg: { max: breakpoints.lg + 'px' },
      // => @media (max-width: 992px) { ... }

      md: { max: breakpoints.md + 'px' },
      // => @media (max-width: 768px) { ... }

      sm: { max: breakpoints.sm + 'px' },
      // => @media (max-width: 640px) { ... }

      xs: { max: breakpoints.xs + 'px' },
      // => @media (max-width: 640px) { ... }
    },
    backgroundSize: {
      'size-50': '50%',
    },
    extend: {
      colors: {
        ...myexColors,
      },
      spacing: {
        1: '0.4rem',
        2: '0.8rem',
        3: '1.2rem',
        4: '1.6rem',
        5: '2rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4rem',
        11: '4.4rem',
        12: '4.8rem',
        14: '5.6rem',
        16: '6.4rem',
        20: '8rem',
        24: '9.6rem',
        28: '11.2rem',
        32: '12.8rem',
        36: '14.4rem',
        40: '16rem',
        44: '17.6rem',
        48: '19.2rem',
        52: '20.8rem',
        56: '22.4rem',
        60: '24rem',
        64: '25.6rem',
        72: '28.8rem',
        80: '32rem',
        96: '38.4rem',
      },
      fontSize: {
        xs: '1.2rem',
        sm: '1.4rem',
        base: '1.6rem',
        lg: '1.8rem',
        xl: '2.0rem',
        '2xl': '2.4rem',
        '3xl': '3.2rem',
        '4xl': '4rem',
        h1: '4rem',
        h2: '3.2rem',
        h3: '2.8rem',
        h4: '2.4rem',
        h5: '2.0rem',
        h6: '1.6rem',
      },
      borderWidth: {
        6: '6px',
      },
      typography: {
        DEFAULT: {
          // this is for prose class
          css: {
            fontSize: '1.6rem',
            maxWidth: '120rem',
            h2: {
              margin: '1.5rem 0 1rem',
              fontWeight: 400,
            },
            p: {
              margin: '1rem 0',
            },
            a: {
              textDecoration: 'none',
              wordBreak: 'break-all',
            },
            'li p': {
              margin: '0',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              padding: '1rem',
              fontStyle: 'normal',
              borderLeft: `0.6rem solid ${colors.infoMain}`,
              backgroundColor: colors.infoExtraLight,
              opacity: 0.8,
              p: {
                margin: '1rem 0',
              },
              'p:first-child': {
                marginTop: '0',
              },
              'p:last-child': {
                marginBottom: '0',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
