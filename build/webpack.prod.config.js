const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const cleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const common = require('./webpack.base.confg')
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|en/),
    new cleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
      chunkFilename: '[id].[hash].css'
    }),
  ]
})
