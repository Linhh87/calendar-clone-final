/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".public/index.html"],
  safelist:[
    {pattern: /text-(red|blue|indigo|gray|green|purple)-400/},
    {pattern: /bg-(red|blue|indigo|gray|green|purple)-(200|500)/},
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ["Open Sans"]
      }, 
      gridTemplateColumns: {
        "1/5": "1fr 5fr"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
