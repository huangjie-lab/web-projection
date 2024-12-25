// react脚手架中webpack配置
const {
  override,
  addWebpackAlias,
  addWebpackModuleRule,
  overrideDevServer
} = require('customize-cra');
const path = require('path');

// 配置代理服务器
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' } // 要配上这个
      }
    }
  };
};
module.exports = {
  webpack: override(
    // react脚手架默认支持scss 不支持less
    addWebpackModuleRule({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          // 配置后样式模块化index.module.scss可以改为index.scss
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[local]--[hash:base64:5]'
            }
          }
        },
        'sass-loader'
      ]
    }),
    addWebpackModuleRule({
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          // 配置后样式模块化index.module.scss可以改为index.scss
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[local]--[hash:base64:5]'
            }
          }
        },
        'less-loader'
      ]
    }),
    addWebpackAlias({
      // 指定@符指向src目录
      '@': path.resolve(__dirname, 'src')
    })
  ),
  devServer: overrideDevServer(devServerConfig())
};
