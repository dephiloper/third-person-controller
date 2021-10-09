const { resolve } = require('path');
const merge = require('webpack-merge');

const commonConfig = require('.');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './src/game.ts',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
