const flowbite=require('flowbite-react/tailwind')
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,js,tsx,ts,html}',
    'index.html',
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    flowbite.content()

  ],
  theme: {
    container:{
      center:true,
      screens: {
        'sm': '600px',
        'md': '740px',
        'lg': '980px',  
        'xl': '1200px',
      }},
    extend: {},
  },
  plugins: [ require('flowbite/plugin') ],
}

