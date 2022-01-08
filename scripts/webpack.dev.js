const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common');

const target = 'http://localhost:8989';
const webpackDev = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: '../public',
    port: '6688',
    proxy: {
      '/pro': {
        target: `${target}`,
        pathRewrite: { '^/pro': '' },
      },
    },
    // open: true,
    hot: true,
    client: {
      progress: true,
    },
    historyApiFallback: {
      rewrites: [{ from: /.*/g, to: '/index.html' }],
    },
  },
};

module.exports = merge(webpackCommon, webpackDev);
