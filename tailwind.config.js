const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  safelist: [
    'primary',
    'skyA',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logo': "url('pages/custom-enquiry/logo.svg')",
      },
      colors: {
        'primary': '#004441',
        'skyA': 'rgb(2, 132, 199)',
        'crema' : '#FFF3E5',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        martel: ['Martel', 'sans-serif'],
        marcellus: ['Marcellus', 'sans-serif'],
      },
      screens: {        
        'midget' : {'min': '280px', 'max': '480px'},
        'mini' : {'min': '376px', 'max': '639px'},
        ...defaultTheme.screens,
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        fadeInBack: {
          "0%": { opacity: '0' },
          "100%": { opacity: '1' }
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        fadeInBack: "fadeInBack 500ms ease-in-out"
      }
    },
    
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
