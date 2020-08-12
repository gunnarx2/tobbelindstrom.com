module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'airbnb', 'prettier', 'prettier/react'],
  plugins: ['@typescript-eslint', 'babel', 'cypress', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    'consistent-return': 0,
    'no-unused-expressions': 0,
    'babel/no-unused-expressions': 2,
    'import/no-cycle': 0,
    'no-console': 0,
    'func-names': 0,
    'prefer-destructuring': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 1,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'jsx-a11y/no-noninteractive-tabindex': [
      2,
      {
        tags: ['pre']
      }
    ],
    'no-underscore-dangle': [
      2,
      {
        allow: ['__THEME__', '__SET_THEME__']
      }
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always'
      }
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['/']
      }
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true
      }
    ],
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        tsx: 'never',
        ts: 'never'
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    'cypress/globals': true
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        paths: 'src'
      }
    },
    'import/core-modules': ['@reach/router'],
    react: {
      version: 'detect'
    }
  },
  globals: {
    __PATH_PREFIX__: true
  }
};
