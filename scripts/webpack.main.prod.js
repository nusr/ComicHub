const merge = require('webpack-merge');
const baseConfig = require('./webpack.main.dev');
module.exports = merge.smart(baseConfig, {
  mode: 'production',
});
