module.exports = {
  hooks: {
    'pre-push':
      'npm-run-all prettier:report eslint:report stylelint:report markdownlint:report typescript:report'
  }
};
