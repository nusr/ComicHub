const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const common = require('./webpack.base.confg')
module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: []
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new cleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
      chunkFilename: '[id].[hash].css'
    }),
  ]
})
