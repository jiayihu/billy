/**
 * Map of :root css variables passed to Webpack cssnext configuration.
 * Currently cssnext does not support global variables nor CSS @import.
 * @see {https://github.com/mxstbr/react-boilerplate/issues/282}
 */

const customProperties = {
  'dark-primary': '#0288D1',
  'primary': '#03A9F4',
  'light-primary': '#B3E5FC',
  'accent': '#FF5252',
  'primary-text': '#212121',
  'secondary-text': '#757575',
  'divider': '#BDBDBD',
  'success': '#8BC34A',
  'danger': '#FF5252',
};

const customMediaQueries = {
  '--phone': '(min-width: 544px)',
  '--tablet': '(min-width: 768px)',
  '--desktop': '(min-width: 992px)',
  '--large-desktop': '(min-width: 1200px)',
};

module.exports = {
  customProperties,
  customMediaQueries,
};
