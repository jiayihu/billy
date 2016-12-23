const path = require('path');
const env = require('./env.json');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const cssVariables = require('./src/variables');

const root = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist'),
};
const IS_DEV = process.env.NODE_ENV !== 'production';

const devPlugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      GEONAMES: JSON.stringify(env.geonames),
    },
  }),
];
const prodPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      GEONAMES: JSON.stringify(env.geonames),
    },
  }),
];

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
        loaders: ['ts', 'angular2-template'],
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
        include: [path.join(root.src, 'styles'), /node_modules/],
      },
      {
        test: /\.css$/,
        loaders: ['raw', 'postcss'],
        include: path.src,
        exclude: [path.join(root.src, 'styles'), /node_modules/],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: 'file-loader',
        query: {
          name: '/images/[name]_[hash:5].[ext]?[hash:5]',
        },
      },
    ],
  },
  plugins: IS_DEV ? devPlugins : prodPlugins,
  postcss() {
    return [
      cssnext({
        features: {
          customProperties: {
            variables: cssVariables.customProperties,
          },
          customMedia: {
            extensions: cssVariables.customMediaQueries,
          },
        },
      }),
    ];
  },
};
