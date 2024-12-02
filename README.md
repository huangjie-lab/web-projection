### 前段工程化

#### 配置scss以及模块化
1. npm install node-sass sass-loader --save-dev
**yarn add node-sass sass-loader --dev**
（如果你的项目是通过 create-react-app 脚手架创建的，那么你需要使用
customize-cra和react-app-rewired 来扩展配置。）
2. npm install customize-cra react-app-rewired --save-dev
3. 创建config.overrides.js文件配置
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
4. 使用index.module.scss模块化
**（出现index.module.scss模块找不到需要配置）**
配置globals.d.ts文件
declare module '*.scss'

#### 配置别名@
1. webpack配置文件新增配置
addWebpackAlias({
  // 指定@符指向src目录
  '@': path.resolve(__dirname, 'src'),
})
2. tsconfig文件新增@配置
"paths": {
  "@/*":["./src/*"]
}

#### eslint
#### prettier
#### stylelint
#### commitlint
#### husky