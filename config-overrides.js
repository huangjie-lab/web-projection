// react脚手架中webpack配置
const {
  override,
  addWebpackAlias,
  addWebpackModuleRule,
  overrideDevServer,
  addWebpackResolve,
  addWebpackPlugin
} = require('customize-cra');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

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
    (config) => {
      console.log(config);
      config.output.filename = 'static/bundle/[name].[contenthash:8].js';
      config.output.chunkFilename = 'static/js/[name].[contenthash:5].chunk.js';
      config.output.clean = true;
      config.mode = 'development';
      config.devtool = 'inline-source-map';
      config.optimization = {
        ...config.optimization,
        // 将node_modules中内容单独抽离成一个文件
        splitChunks: {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      };
      // 超出文件大小给提示或者报错 'false' | 'warning' | 'error'
      config.performance = {
        hints: 'warning'
      };
      console.log(config);
      return config;
    },
    addWebpackModuleRule(
      // react脚手架默认支持scss 不支持less
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
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
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]'
        }
      }
    ),
    addWebpackAlias({
      // 指定@符指向src目录
      '@': path.resolve(__dirname, 'src')
    }),
    addWebpackPlugin(
      new WebpackBar()
      // new ProgressBarWebpackPlugin()
    ),
    //addWebpackResolve(resolve)导入文件的时候可以不用添加文件的后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    })
  ),
  devServer: overrideDevServer(devServerConfig())
};
