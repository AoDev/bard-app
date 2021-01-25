module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          'ui-framework': './src/ui-framework',
          'app-images': './src/assets/images',
          'app-lib': './src/lib',
          'app-services': './src/application/services',
          'shared-components': './src/application/shared-components',
        },
      },
    ],
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: false,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: 'defaults',
        },
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    production: {},
    development: {
      plugins: ['react-refresh/babel'],
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true,
            },
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
}
