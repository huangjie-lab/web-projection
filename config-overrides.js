// react脚手架中webpack配置

const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path')
module.exports = override(
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }),
  addWebpackAlias({
    // 指定@符指向src目录
    '@': path.resolve(__dirname, 'src'),
  })
);