module.exports = {
  'plugins': [
    [
      'module-resolver',
      {
        'alias': {
          'ui-framework': './src/ui-framework',
          'app-images': './src/assets/images',
          'app-lib': './src/lib',
          'app-services': './src/application/services',
          'shared-components': './src/application/shared-components'
        }
      }
    ],
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        'loose': true
      }
    ]
  ],
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'browsers': '> 5%',
        },
        'modules': false
      }
    ],
    '@babel/preset-react'
  ],
  'env': {
    'production': {},
    'development': {
      'plugins': [
        'react-hot-loader/babel'
      ]
    },
    'test': {
      'presets': [
        [
          '@babel/preset-env',
          {
            'targets': {
              'node': true
            },
            'modules': 'commonjs'
          }
        ]
      ]
    }
  }
}
