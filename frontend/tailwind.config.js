/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
     
      colors: {
        'green-primary': '#047857', 
        'green-dark': '#065f46',    
        'green-light': '#a7f3d0',  
        'green-focus': '#10b981',   
      }
    },
  },
  plugins: [],
}