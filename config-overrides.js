const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['@stores']: path.resolve(__dirname, './src/stores'),
    ['@sdk']: path.resolve(__dirname, './src/sdk'),
    ['@mapper']: path.resolve(__dirname, './src/mapper'),
    ['@models']: path.resolve(__dirname, './src/models'),
    ['@pages']: path.resolve(__dirname, './src/pages'),
  }),
);
