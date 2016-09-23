const path = require('path');

const root = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist'),
};
const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  devServer: IS_DEV ? {
    historyApiFallback: true,
    noInfo: false,
    port: 3000,
  } : {},
  devtool: 'eval',
  entry: root.src,
  output: {
    path: root.dest,
    publicPath: 'dist',
    filename: 'main.js',
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
  },
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts',
        include: root.src,
      },
      {
        test: /\.html$/,
        loader: 'raw',
        include: root.src,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        include: path.join(root.src, 'styles'),
      },
      {
        test: /\.css$/,
        loaders: ['raw', 'postcss'],
        include: path.src,
        exclude: path.join(root.src, 'styles'),
      },
    ],
  },
  postcss() {
    return [
      require('postcss-cssnext'),
    ];
  },
};
