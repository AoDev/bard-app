/**
 * Base webpack config used across other specific configs
 */
const webpack = require('webpack')
const packageJson = require('./package.json')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanCSSPlugin = require('less-plugin-clean-css')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const brandConfig = require('./brand.config')
const path = require('path')

const fs = require('fs')
const dotenv = require('dotenv')

if (fs.existsSync('.env')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env'))
  for (const k in envConfig) {
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
    globOptions: {
      ignore: [],
    },
  },
  {
    from: path.join(SRC_FOLDER, 'assets', 'images'),
    to: path.join(DIST_FOLDER, 'images'),
    globOptions: {
      gitignore: true,
      ignore: ['**/index.js'],
    },
  },
]

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env.BUILD_PLATFORM': JSON.stringify(process.env.BUILD_PLATFORM),
    'process.env.APP_VERSION': JSON.stringify(packageJson.version),
  }),
  new RemoveEmptyScriptsPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(SRC_FOLDER, 'index.html'),
    chunks: ['manifest', 'vendors', 'ui-framework', 'app', 'css'],
    templateParameters: {
      contentPolicy: mainContentPolicy[process.env.NODE_ENV],
      publicPath: '/',
      ...brandConfig,
    },
  }),

  new CopyWebpackPlugin({patterns: filesToCopy}),

  new WebpackPwaManifest({
    name: brandConfig.appName,
    short_name: brandConfig.appShortName,
    description: brandConfig.shortDescription,
    background_color: brandConfig.backgroundColor,
    crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
    orientation: 'any',
    theme_color: brandConfig.themeColor,
    ios: true,
    icons: [
      {
        src: path.join(SRC_FOLDER, 'assets', 'images', 'logo-1024-ios.png'),
        destination: 'icons',
        sizes: [36, 48, 72, 96, 128, 192, 256, 384, 512],
        ios: true,
      },
      {
        src: path.join(SRC_FOLDER, 'assets', 'images', 'logo-1024.png'),
        destination: 'icons',
        sizes: [36, 48, 72, 96, 128, 192, 256, 384, 512],
      },
    ],
  }),

  new WorkboxPlugin.InjectManifest({
    swSrc: './src/service-worker.js',
    swDest: 'service-worker.js',
    // In dev, prevents SW from intercepting hot-updates so cache nothing except the index.html.
    // In prod, explicitely include everything because workbox prevents Webpack manifest to be cached by default.
    include: IS_DEVELOPMENT ? [/html/] : [/.*/],
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
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.less$/,
        use: [
          IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                plugins: IS_DEVELOPMENT ? [] : [new CleanCSSPlugin({advanced: true})],
              },
            },
          },
        ],
      },
      {
        test: /.*images.+\.(svg|jpg|png)$/,
        loader: 'url-loader',
      },
      {
        test: /.*svg-sprite.+\.svg$/,
        loader: 'svg-sprite-loader',
        // options: {extract: true}
      },
    ],
  },

  optimization: {
    moduleIds: 'named',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        'ui-framework': {
          test: /ui-framework/,
          name: 'ui-framework',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  plugins,
}
