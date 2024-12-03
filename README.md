### 前段工程化

#### 配置scss以及模块化

1. npm install node-sass sass-loader --save-dev
   **yarn add node-sass sass-loader --dev**
   （如果你的项目是通过 create-react-app 脚手架创建的，那么你需要使用
   customize-cra和react-app-rewired 来扩展配置。）
2. 为了配置webpack不用弹出配置文件，可以新建config.overrides.js补充配置
   npm install customize-cra react-app-rewired --save-dev
   使用react-app-rewired需要在package.json中修改react-scripts为react-app-rewired
3. 创建config.overrides.js文件配置

```js
   const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
   module.exports = override(
     addWebpackModuleRule({
       test: /\.scss$/,
       use: [
         'style-loader',
         'css-loader',
         'sass-loader'
       ]
     }),
   );
```

4. 使用index.module.scss模块化
   **（出现index.module.scss模块找不到需要配置）**
   配置globals.d.ts文件

```ts
   declare module '\*.scss'
```

#### 配置别名@

1. webpack配置文件新增配置

```js
   addWebpackAlias({
     // 指定@符指向src目录
     '@': path.resolve(\_\_dirname, 'src'),
   })
```

2. tsconfig文件新增@配置

```json
   "paths": {
     "@/*":["./src/*"]
   }
```

#### eslint

1. npm install eslint -D
2. npx eslint --init 生成配置文件可改为.eslintrc.js, 默认会装部分eslint相关依赖
3. 配置.eslintrc.js, rules字段可自定义
4. 配置脚本

```json
   "scripts": {
     "lint": "eslint --fix \"./src/**/*.{js,jsx,ts,tsx}\""
   }
```

5. 执行npm run lint 测试效果
6. 设置忽略文件 .eslintignore

#### prettier

1. npm install prettier -D
2. vscode安装 Prettier - Code formatter插件
3. 配置.prettierrc.js文件
4. 配置脚本

```json
   "scripts": {
     "format": "prettier --write \"src/**/*.+(js|ts|jsx|tsx)\""
   }
```

5. 执行npm run format 测试效果
6. 设置 .prettierignore 忽略文件

7. 为了解决eslint和prettier的冲突，可以安装
   npm install eslint-config-prettier eslint-plugin-prettier -D
8. 最后在根目录下新建.vscode/setting.json文件配置

```js
   {
     // 保存的时候自动格式化
     "editor.formatOnSave": true,
     // 默认格式化工具选择prettier
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
```

#### stylelint

#### husky和commitlint代码提交规范

1. npm install husky -D并初始化husky:npx husky-init
2. 只检查通过git add添加到暂存区的文件
   npm install lint-staged -D
3. 配置脚本命令

```json
   {
      "lint-staged": {
         "**/*.{js,jsx,ts,tsx}": "npm run lint",
         "**/*.{js,jsx,tsx,ts,less,md,json}": [
            "prettier --write",
            "eslint --fix"
         ]
      },
   }
```

4. 修改.husky/pre-commit文件，使提交时能执行lint-staged钩子

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm exec lint-staged
```

5. 配置 commit-msg
   commitlint 检查提交消息是否符合常规提交格式，用于在每次提交时生成符合规范的commit消息
   5.1 安装commit-msg
       npm install @commitlint/config-conventional @commitlint/cli --save-dev
   5.2 添加 commitlint.config.js 配置文件

```js
       module.exports = {
         extends: ["@commitlint/config-conventional"],
         rules: {
           // type 类型定义
            "type-enum": [
               2,
               "always",
               [
                  "feat", // 新功能 feature
                  "fix", // 修复 bug
                  "docs", // 文档注释
                  "style", // 代码格式(不影响代码运行的变动)
                  "refactor", // 重构(既不增加新功能，也不是修复bug)
                  "perf", // 性能优化
                  "test", // 增加测试
                  "chore", // 构建过程或辅助工具的变动
                  "revert", // 回退
                  "build", // 打包
               ],
            ],
            // subject 大小写不做校验
            // 自动部署的BUILD ROBOT的commit信息大写，以作区别
            "subject-case": [0],
         },
      };
```

   5.3 执行以下命令添加commitlint钩子
       npx husky add .husky/commit-msg "npm run commitlint"
   5.4 在packages.json 配置
```js
       "scripts": {
         "commitlint": "commitlint --config commitlint.config.js -e -V"
       }
```


#### redux redux-saga react-redux @reduxjs/toolkit

1. saga用来处理异步请求
2. 使用@reduxjs/toolkit来管理不同模块的数据
3. reducer中导出的action在saga中如果要被takelatest监听到，则不能在reducer中执行更新state的操作