const { Template } = require('webpack');

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
        templateGray: {
          50: '#f9fafb', // ours is #f9fafb ooooo another samsies
          100: '#f4f5f7', // ours is #f3f4f6
          200: '#e5e7eb', // ours is #e5e7eb ooooh nice samsies
          300: '#d5d6d7', // ours is #d1d5db
          400: '#9e9e9e', // ours is #9ca3af
          500: '#707275', // ours is #6b7280
          600: '#4c4f52', // ours is #4b5563
          700: '#24262d', // ours is #374151
          800: '#1a1c23', // ours is #1f2937
          900: '#121317', // ours is #111827
        },
        templatePurple: {
          300: '#cabffd', // ours is #d8b4fe
          400: '#ac94fa', // ours is #c084fc
          500: '#9061f9', // ours is #a855f7
          600: '#7e3af2', // ours is #9333ea
        },
        templateRed: {
          100: '#fde8e8', // ours is #fee2e2
          500: '#f05252', // ours is #ef4444
          600: '#e02424', // ours is #dc2626
          700: '#c81e1e', // ours is #b91c1c
        },
        templateGreen: {
          100: '#def7ec', // ours is #ecfccb
          500: '#0e9f6e', // ours is #84cc16
          700: '#046c4e', // ours is #4d7c0f
        },
        templateYellow: {
          100: '#fdf6b2', // ours is #fef9c3
          300: '#faca15', // ours is #fde047
          800: '#723b13', // ours is #854d0e
        },
        templateSlate: { // this one im not sure about since slate doesnt show up in their css im using their cool-gray
          700: '#364152', // ours is #334155
        },
        templateOrange: {
          100: '#feecdc', // ours is #ffedd5
          700: '#b43403', // ours is #c2410c
        },
        templateBlue: {
          100: '#e1effe', // ours is #dbeafe
          700: '#1a56db', // ours is #1d4ed8
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
