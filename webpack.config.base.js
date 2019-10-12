/**
 * Base webpack config used across other specific configs
 */
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanCSSPlugin = require('less-plugin-clean-css')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const path = require('path')

const fs = require('fs')
const dotenv = require('dotenv')

if (fs.existsSync('.env')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env'))
  for (var k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
const ROOT_FOLDER = __dirname
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src')
const DIST_FOLDER = path.join(ROOT_FOLDER, 'dist')

const mainContentPolicy = {
  production: "script-src 'self'",
  development: "script-src 'self' 'unsafe-eval'",
}

const filesToCopy = [
  {
    from: path.join(SRC_FOLDER, 'assets', 'favicon'),
    to: path.join(DIST_FOLDER),
    ignore: [],
  },
  {
    from: path.join(SRC_FOLDER, 'assets', 'images'),
    to: path.join(DIST_FOLDER, 'images'),
    ignore: ['index.js'],
  },
]

let plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env.BUILD_PLATFORM': JSON.stringify(process.env.BUILD_PLATFORM),
  }),
  new FixStyleOnlyEntriesPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(SRC_FOLDER, 'index.html'),
    chunks: ['manifest', 'vendors', 'ui-framework', 'app', 'css'],
    templateParameters: {
      contentPolicy: mainContentPolicy[process.env.NODE_ENV],
      publicPath: '/',
    }
  }),

  new CopyWebpackPlugin(filesToCopy),

  new WorkboxPlugin.InjectManifest({
    swSrc: './src/sw.js',
    swDest: 'service-worker.js',
    // In dev, prevents SW from intercepting hot-updates so cache nothing.
    // In prod, removes default exclude of workbox that prevents Webpack manifest to be cached.
    exclude: IS_DEVELOPMENT ? [/.*/] : [],
  }),

  new WebpackPwaManifest({
    name: 'Bard',
    short_name: 'Bard',
    description: 'Mobx react framework',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
    orientation: 'any',
    ios: true,
    icons: [
      {
        src: path.join(SRC_FOLDER, 'assets', 'images', 'logo-1024.png'),
        destination: 'icons',
        ios: true,
        sizes: [36, 48, 72, 96, 128, 192, 256, 384, 512] // multiple sizes
      },
    ]
  }),
]

if (process.env.ANALYZE_BUNDLE) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: [
          /bard-router/,
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.less$/,
        use: [
          IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              plugins: IS_DEVELOPMENT ? [] : [new CleanCSSPlugin({advanced: true})]
            }
          }
        ]
      },
      {
        test: /.*images.+\.(svg|jpg|png)$/,
        loader: 'url-loader',
      },
      {
        test: /.*svg-sprite.+\.svg$/,
        loader: 'svg-sprite-loader',
        // options: {extract: true}
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        'ui-framework': {
          test: /ui-framework/,
          name: 'ui-framework',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins,
}
