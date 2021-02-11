const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',

  entry: {
    app: ['./src/index'],
    css: ['./src/styles/index.less'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },

  plugins: [
    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css',
    }),
  ],

  target: 'web',
})
