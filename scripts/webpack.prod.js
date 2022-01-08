const { merge } = require('webpack-merge');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpackCommon = require('./webpack.common');

const webpackPro = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash].js',
    clean: true,
    publicPath: 'auto',
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = merge(webpackCommon, webpackPro);
