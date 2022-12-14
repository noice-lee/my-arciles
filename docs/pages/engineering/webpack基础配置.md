---
sidebarDepth: 2
---

# webpack基础配置

> 仅做为学习webpack基础记录（视频学习），基于webpack5

## webpack常见概念

- 入口

设置入口文件，可多个，来构建其内部的依赖图进行文件打包

- 输出

可设置打包后生成的目录、文件名

-   `loader`

`webpack`本身只能解析`js`和`json`文件，其他文件需要安装并引入`loader`来进行打包

-   `plugin`

插件，`loader`只负责转换，插件则可执行更广的任务

-   `mode`

模式选择，不同环境下有对应的默认配置，分为`development`、`production`或`none`

-   依赖图

`webpack`根据引用关系生成对应的依赖图来对文件进行分析、打包

## 部分简介

### `loader`—— 打包文件

#### js （babel）

将js打包成主流浏览器识别的ES5代码

1.  安装

    ```shell
    yarn add babel-loader @babel/core @babel/preset-env webpack -D
    ```

2.  配置

    ```js
    // 层级较多，可单独提取出.babelrc配置文件 本文篇幅有限，不做提取
    module.exports = {
        module: {
            rules: [
                {
                    test: /.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env']
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
    ```

3.  ~~兼容ie~~

其实是课程上没有讲兼容ie，有打算做兼容，打算用`babel-polyfill`，自己试着配置了好一会，没有成功，先不做

#### css、sass

通过`sass-loader`将`sass-loader`编译成`sass-loader`，再通过`css-loader`解析`css`，最后通过`style-loader`将样式添加到页面上

1.  安装

``` shell
yarn add style-loader css-loader sass-loader node-sass -D
```

2.  配置

``` js
module.exports = {
  //...
    rules: [
        {
            test: /.css$/,
            // 需注意先后书写顺序，解析时从后往前使用对应loader
            use: ['style-loader', 'css-loader'],
        },
        {
            // less可去官网查看对应配置
            test: /.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        },
    ]
};
```

#### img

1.  安装

```shell
yarn add url-loader -D
```

2.  配置

```js
{
    test: /.(webp|png|jpe?g)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                // [name]是原名称
                // [hash]是随机hash值 :6是指hash长度
                // [ext]是后缀名
                name: '[name]_[hash:6].[ext]',
                // 指定目录
                outputPath: 'img'
            }
        }
    ],
},
```

3.  webpack5新特性——资源模块

```
{
    test: /.(webp|png|jpg)$/,
    // 来源https://webpack.docschina.org/guides/asset-modules/
    type: "asset",
    generator: {
        filename: "img/[name]_[hash:6][ext]"
    },
    parser: {
        dataUrlCondition: {
            maxSize: 60 * 1024
        }
    }
},
```

### `Plugin`—— 实现其他功能

#### `CleanWebpackPlugin`—— 生成文件之前清空目录

1.  安装

```shell
yarn add clean-webpack-plugin -D
```

2.  配置

```js
// webpack.config.js中 部分核心代码
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  //...
    plugins: [
        new CleanWebpackPlugin(),
    ]
};
```

3.  webpack5新特性

```js
// 5.20.0+ 见 https://webpack.docschina.org/configuration/output#outputclean
module.exports = {
  //...
    output: {
        clean: true,
    }
};
```

#### `HtmlWebpackPlugin`—— 生成html文件

> 详情见[官网](https://webpack.docschina.org/plugins/html-webpack-plugin/#root)

1.  安装

```shell
yarn add html-webpack-plugin -D
```

2.  配置

```js
// webpack.config.js中 部分核心代码
const HtmlWebpackPlugin = require("html-webpack-plugin");
plugins: [
    new HtmlWebpackPlugin({
          template: "./public/index.html",
    })
]
```

#### `CopyWebpackPlugin`—— 复制文件

> 详情见[官网](https://webpack.docschina.org/plugins/copy-webpack-plugin/)

1.  安装

```shell
yarn add copy-webpack-plugin -D
```

2.  配置

```js
plugins: [
    new CopyPlugin({
        patterns: [
            // 将根目录下的public 复制到output的目录下
            { from: "public", to: "./" },
        ],
    }),
],
```

### 其他常用功能
#### `import()`代码分割/懒加载

实现的效果有两个，一是代码分散，不让主js文件过大，二是可以什么时候执行什么时候加载，优化首屏访问速度。在引入对应文件时，使用`import(/* webpackChunkName: '打包后的文件名' */'路径')`，返回的是`Promise`对象，如：

```js
// 被懒加载的文件 lazy.js
export function sum (n1, n2) {
	return n1 + n2;
}

// 其他文件中，懒加载lazy.js时
import(/* webpackChunkName: 'my-name' */ './lazy.js').then(result = {
	const count = result.sum(10, 20);
})
```

#### `devtool`—— 开发调试

生成map文件，可直接在浏览器调试工具中找到打包前的代码的位置，便于调试

```js
module.exports = {
    //...
    devtool: 'source-map',
}
```

#### `alias`—— 给目录起别名

```js
const path = require('path');
module.exports = {
    //...
    resolve: {
      alias: {
          '@': path.resolve(__dirname, './src'),
      },
    },
};
```

#### `devServer`—— 本地服务

```shell
yarn add webpack-dev-server -D
```

```js
module.exports = {
    //...
    devServer: {
        // 主机
        host: "0.0.0.0",
        // 端口
        port: 7777,
        // 是否开启热更新
        hot: true,
        // 用浏览器打开
        open: true,
        // 请求代理 见 https://webpack.docschina.org/configuration/dev-server/#devserverproxy
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000/',
                pathRewrite: { '^/api': '' },
            },
        },
    },
};
```

#### 根据环境分离配置

实现思路：可利用`webpack-merge`来进行配置分离，将共用的配置写在一个配置文件中，将生产/开发环境的配置各写在一个文件中，在`package.json`中的`scrpit`来定义不同环境运行时执行不同的配置文件，如：

```json
"scripts": {
    "build": "webpack --config ./config/webpack.prod.config.js",
    "serve": "webpack serve --config ./config/webpack.dev.config.js"
}
```

##### 参考来源

-   [webpack中文官网](https://webpack.docschina.org/)
-   coderwhy课程`深入Vue3+TypeScript技术栈`

> 心向苍穹，足履实地
