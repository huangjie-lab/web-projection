// react脚手架中webpack配置

const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
module.exports = override(
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  })
);