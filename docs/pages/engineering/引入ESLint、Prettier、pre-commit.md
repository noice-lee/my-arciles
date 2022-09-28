---
sidebarDepth: 2
---

## 引入ESLint

### 初始化ESLint

```shell
# 执行命令进入交互页面 需使用npm
npm init @eslint/config
```

回答完问题后会生成`eslint`配置文件

```shell
# 第一个 你使用eslint来干嘛
? How would you like to use ESLint? … 
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style

# 第二个 你的项目使用哪个模块系统
? What type of modules does your project use? … 
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

# 第三个 你的项目使用什么框架
? Which framework does your project use? … 
  React
❯ Vue.js
  None of these
  
# 第四个 你的项目是否使用TypeScript
? Does your project use TypeScript? › No / Yes

# 第五个 你的代码运行在什么环境 可多选
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node

# 第六个 你想为你的项目定义一个什么样的风格
? How would you like to define a style for your project? … 
❯ Use a popular style guide
  Answer questions about your style
  
# 第七个 你想遵循哪种样式风格
? Which style guide do you want to follow? … 
❯ Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo

# 第八个 你想用哪种格式的配置文件
? What format do you want your config file to be in? … 
❯ JavaScript
  YAML
  JSON
```

### 代码检查/修复配置

`package.json`中`scripts`添加

```json
"scripts": {
    "lint": "eslint --ext .vue,.ts,.js src/",
    "lint:fix": "eslint --ext .vue,.ts,.js src/ --fix"
}
```

### 解决路径别名报错

1. 安装 `eslint-import-resolver-alias`

```
yarn add eslint-import-resolver-alias -D
```
2. eslint配置文件中添加

```js
settings: {
    'import/resolver': {
        alias: {
            map: [['@', './src']],
                extensions: ['.js', '.vue']
        }
    }
}
```

### 处理全局变量报错

eslint配置文件中添加

```javascript
globals: {
    uni: true,
    ......
},
```

## 引入Prettier

### 安装

```shell
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

### 配置

创建`.prettierrc.js`

```js
{
    // 句末添加分号
    semi: true,
    // 缩进长度
    tabWidth: 2,
    // 对象，数组括号与文字之间加空格 { foo: bar }
    bracketSpacing: true,
    // 对象或数组末尾加逗号
    trailingComma: "es5",
    // 使用单引号
    singleQuote: true,
    // 箭头函数单一参数省略括号
    arrowParens: "avoid",
    // vue scripts标签是否缩进
    vueIndentScriptAndStyle: true,
}
```
> 若使用`prettier`的修复功能需在`scripts`中添加并运行 `"pre": "npx prettier --write .",`

### 解决和ESLint的冲突

`eslint`配置文件中

```js
extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended'	// 解决冲突 注意添加先后顺序
],
```

配置完成后，执行`eslint`检查时如遇冲突，会优先按照`Prettier`的配置

## 引入`pre-commit`

在`git commit`时会执行`eslint`检查，检查通过后才可提交

### 1. 安装

```shell
yarn add lint-staged husky -D
```

### 2. 添加`scripts`

```json
"scripts": {
    "lint": "eslint --ext .vue,.ts,.js src/",
    "lint:fix": "eslint --ext .vue,.ts,.js src/ --fix",

    // 在 npm install 之后自动执行，生成`.husky`目录。
    "prepare": "husky install"
},
```

### 3. 执行

```shell
yarn run prepare
```

### 4. 增加钩子

```shell
npx husky add .husky/pre-commit "npx lint-staged"
```

### 5. `lint-staged`配置

`package.json`中 `scripts`同级添加

```json
"lint-staged": {
    "src/**/*.{vue,ts}": "eslint --fix"
},
```
配置完成，提交一下试试吧 👀

## 统一编辑器配置

根目录下创建`.editorconfig`文件
```
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

#### 参考

- [前端Vuer，请给你的项目加上 ESLint](https://juejin.cn/post/7122233584332570637)
- [Eslint + Prettier + Husky + Commitlint+ Lint-staged 规范前端工程代码规范](https://juejin.cn/post/7038143752036155428)
- [解决 Prettier 和 ESLint 的冲突](https://zhuanlan.zhihu.com/p/486545924)
- [深入Vue3+TypeScript技术栈-coderwhy大神新课]()
