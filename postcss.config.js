const cssnext = require('postcss-cssnext');
const cssVariables = require('./src/variables');
const injectCssVariables = require('postcss-inject-css-variables');

module.exports = function() {
  return [
    injectCssVariables(cssVariables.customProperties),
    cssnext({
      features: {
        customProperties: {
          preserve: false,
          variables: cssVariables.customProperties,
        },
        customMedia: {
          extensions: cssVariables.customMediaQueries,
        },
      },
    }),
  ];
}
