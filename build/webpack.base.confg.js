const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 注入 .env 环境变量
const isProd = process.env.NODE_ENV === 'production';
let envConfig;
try {
  envConfig = dotEnv.parse(fs.readFileSync('../.env'));
} catch (error) {
  envConfig = {};
}

const defineEnv = {
  NODE_ENV: process.env.NODE_ENV,
  ...envConfig,
};
module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
  },
  entry: path.resolve(__dirname, '../src') + '/index.tsx',
  output: {
    // use absolute path
    // publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: process.env.NODE_ENV === 'production' ? 'bundle.[chunkhash:8].js' : 'bundle.main.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          'ts-loader',
        ],
        include: [path.join(__dirname, '../src')],
      },
      {
        test: /\.(jpe?g|png|svg|gif|ogg|mp3|ttf|otf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
        exclude: path.resolve(__dirname, '../src/assets/icon'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name][hash].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] :percent (:elapsed seconds)',
    }),
    new webpack.DefinePlugin({
      'process.env': defineEnv,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src') + '/index.html',
    }),
  ].concat(process.env.ANALYZE ? new BundleAnalyzerPlugin() : []),
};
