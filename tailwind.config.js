/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/client/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        discord: {
          100: '#dcddde', // the text color
          900: '#36393f', // the midnight background
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
