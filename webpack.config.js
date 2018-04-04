require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const postCSSPlugins = require('./postcss.config');

const root = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist'),
};
const IS_DEV = process.env.NODE_ENV !== 'production';

const APIKeys = {
  GEONAMES: JSON.stringify(process.env.geonames),
  FIREBASE_APIKEY: JSON.stringify(process.env.FIREBASE_APIKEY),
  FIREBASE_AUTHDOMAIN: JSON.stringify(process.env.FIREBASE_AUTHDOMAIN),
  FIREBASE_DATABASEURL: JSON.stringify(process.env.FIREBASE_DATABASEURL),
  FIREBASE_STORAGE: JSON.stringify(process.env.FIREBASE_STORAGE),
};
const devPlugins = [
  new webpack.DefinePlugin({
    'process.env': Object.assign(
      {},
      {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
      APIKeys
    ),
  }),
  new webpack.ContextReplacementPlugin(
    /\@angular(\\|\/)core(\\|\/)esm5/,
    path.join(__dirname, root.src)
  ),
];
const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': Object.assign(
      {},
      {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
      APIKeys
    ),
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
  }),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    root.src
  ),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = {
  devServer: IS_DEV
    ? {
        historyApiFallback: true,
        noInfo: false,
        port: 3000,
      }
    : {},
  devtool: 'eval',
  entry: path.join(root.src, 'index.ts'),
  output: {
    path: root.dest,
    publicPath: 'dist',
    filename: 'main.js',
  },
  resolve: {
    alias: {
      '@services': path.join(root.src, 'services'),
      '@test': path.join(root.src, 'test'),
      '@utils': path.join(root.src, 'utils'),
    },
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'angular2-template-loader'],
        include: root.src,
      },
      {
        test: /\.html$/,
        use: ['raw-loader'],
        include: root.src,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: postCSSPlugins },
          },
        ],
        include: [path.join(root.src, 'styles'), /node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          'raw-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: postCSSPlugins },
          },
        ],
        include: path.src,
        exclude: [path.join(root.src, 'styles'), /node_modules/],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name]_[hash:5].[ext]?[hash:5]',
            },
          },
        ],
      },
    ],
  },
  plugins: IS_DEV ? devPlugins : prodPlugins,
};
