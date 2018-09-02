/**
 * Created by HCW on 2017/11/3.
 */
module.exports = {
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },

  plugins: ['html'],

  // overrides
  rules: {
    // ...
    'no-console': 'off'
  }
}
