module.exports = {
  extends: ['@gunnarx2/eslint-react'],
  rules: {
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: ['pre', 'span']
      }
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__THEME__', '__SET_THEME__']
      }
    ]
  },
  settings: {
    'import/core-modules': ['@reach/router']
  },
  globals: {
    __PATH_PREFIX__: true
  }
};
