/* eslint-disable */

const { merge } = require('webpack-merge');
const commonConfig = require('./');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './src/game.ts' // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server
    port: 8080,
    static: ['./src', './public'],
  },
  output: {
    publicPath: '/'
  },
});