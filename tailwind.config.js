const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
      flowbite.content(),
  ],
 

  theme: {
    extend: {
      colors: {
        'custom-pinkblue': '#bd55ff', // linear gradient
        'custom-blue': '#5573ff', // linear gradient
        'custom-lightpink': '#c86fff',  // icons color chatbot color
        'custom-orange': '#ff9f67',  //buttons
        'custom-darkBlue':'#4255a4',  //big heading text color h1 h2 
        'custom-pinkDownGr':'#ef6cff',  //down gradient pink
        'custom-blueTopGr' : '#5d70ff', //top gradient  blue
      },
    },
  },
  plugins:  [
    require('flowbite/plugin'),
    flowbite.plugin(),
],
});