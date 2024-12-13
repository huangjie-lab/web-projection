// react脚手架中webpack配置

const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path');
module.exports = override(
  // react脚手架默认支持scss 不支持less
  // addWebpackModuleRule({
  //   test: /\.scss$/,
  //   use: [
  //     'style-loader',
  //     'css-loader',
  //     'sass-loader'
  //   ]
  // }),
  addWebpackModuleRule({
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
  }),
  addWebpackAlias({
    // 指定@符指向src目录
    '@': path.resolve(__dirname, 'src')
  })
);
