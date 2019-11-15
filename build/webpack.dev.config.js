const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PORT = 3000;
const _HOST = 'localhost';
const HOST = `http://${_HOST}`;
const URL = `${HOST}:${PORT}`;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map', // for best build performance when use HMR
  devServer: {
    quiet: true,
    hot: true,
    // enable HMR on the server
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    // match the output path
    port: PORT,
    host: _HOST,
    publicPath: URL,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        changeOrigin: true,
        pathRewrite: { '^/v1': '' },
        target: 'http://localhost:1200',
      },
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
