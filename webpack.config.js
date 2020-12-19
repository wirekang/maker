/* eslint-disable */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  devtool:'eval-source-map',
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'doc'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias:{
      '~': path.resolve(__dirname,'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify:
        mode === 'production' ? {
          collapseWhitespace: true,
          removeComments: true,
        } : false,
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
  ],
};
