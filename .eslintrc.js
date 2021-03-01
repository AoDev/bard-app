module.exports = {
  parser: 'babel-eslint',

  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true,
  },

  extends: ['eslint-config-standard', 'plugin:react/recommended', 'plugin:prettier/recommended'],

  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },

  plugins: ['standard', 'react', 'import'],

  settings: {
    react: {
      version: '16.0',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  rules: {
    'react/prop-types': 1,
    'react/no-unescaped-entities': 0,
  },
}
