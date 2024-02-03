const { appColors } = require('@fulhaus/react.utils.colors');

//appColors embedded in tailwind
// primary: '#000D03'
// 'primary-pressed': '#002909'
// 'primary-hover': '#4478A2'
// black: '#000000'
// white: '#ffffff'
// 'alert-error': '#D24600'
// 'alert-success': '#13B710'
// 'positive-green': '#1C834B'
// 'link-blue': '#0050B5'
// 'selected-blue': '#80AAD7'
// secondary: '#5E5E5E'
// light: '#EAEAE8',
// cream: '#F7EFE7',
// sand: '#DEC1A1'
// disabled: '#C2C2C2'
// red: '#F16020'
// pink: '#F2DEDF'
// minimum: '#595959'
// canvas: '#F6EFE8'

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...appColors,
      },
      
    },
  },
  plugins: [],
};
