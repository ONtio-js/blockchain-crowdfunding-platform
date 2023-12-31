/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        epilogue:['epilogue','sans-serif']
      },
      boxShadow:{
        secondary: '10px 10px 20px rgba(2,2,2,0.25)'
      },
      backgroundColor:{
        dirtyWhite:'#C1BFBE',
        pureWhite: '#FFFFFF',
        blackbg: '#13131a',
        richBlack: "#1c1c24",
        richGreen: '#2c2f32',
        lightBlack: '#3a3a43',
        bgGreen:"#1dc071"
      },
      textColor:{
        white:'#FFFFFF',
        grayText: '#818183',
      }
    },
  },
  plugins: [],
}

