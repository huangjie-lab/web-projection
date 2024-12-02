### 前段工程化

#### 配置scss以及模块化
1.npm install node-sass sass-loader --save-dev
**yarn add node-sass sass-loader --dev**
（如果你的项目是通过 create-react-app 脚手架创建的，那么你需要使用 customize-cra 来扩展配置。）
2.npm install customize-cra --save-dev
3.创建config.overrides.ts文件配置
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
4.使用index.module.scss模块化
**（出现index.module.scss模块找不到需要配置）**
配置globals.d.ts文件
declare module '*.scss'

#### eslint
#### prettier
#### stylelint
#### commitlint
#### husky