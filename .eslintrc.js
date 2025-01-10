module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true // 解决 'module' is not defined报错。
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-var': 2,
    'no-empty': 0,
    'react/no-unknown-property': [1, { ignore: ['styleName', 'nodeintegration'] }],
    'react/require-default-props': 0,
    'require-atomic-updates': 0,
    'react/no-deprecated': 0, // 不开启废弃方法检查，例如componentWillReceiveProps
    'react/no-children-prop': 0,
    '@typescript-eslint/no-empty-interface': 0, // 不开启空interface类型检查
    'react/sort-comp': 0, // 不开启组件内方法顺序检查
    'react/no-array-index-key': 0, // 允许index作为key值
    '@typescript-eslint/no-this-alias': 0, // 允许赋值this给变量
    'react-hooks/exhaustive-deps': 0, // useEffect不检查第二个参数的依赖
    '@typescript-eslint/camelcase': 0,
    'react/jsx-closing-tag-location': 0,
    'react/prop-types': 0,
    'react/no-multi-comp': 0,
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    '@typescript-eslint/naming-convention': 0,
    'import/no-default-export': 0,
    '@typescript-eslint/no-var-requires': 0, // 解决Require statement not part of import statement
    'react/react-in-jsx-scope': 0, // 解决'React' must be in scope when using JSX （配置路由时写组件 eg: element:<Home/>）
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-require-imports': 0
  }
};
