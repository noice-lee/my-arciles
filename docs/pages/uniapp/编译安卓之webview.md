---
sidebarDepth: 2
---

# `web-view`

> `<web-view>` 组件默认铺满全屏并且层级高于前端组件。App端想调节大小或在其上覆盖内容需使用plus规范——uniapp官方

uniapp编译App时的webview跟iframe或小程序的webview有很多不同，比如webview的宽高设置、可缩放，最近正在做uniapp编译安卓的项目正好碰到，特此记录。**该文章操作适用于安卓！**

## 设置宽高

``` js
// #ifdef APP-PLUS
// 获取webview对象
const currentWebview = this.$scope.$getAppWebview();
const wv = currentWebview.children()[0];

wv.setStyle({
    width: '200px',// 宽
    height:'600px',// 高
    scalable: true,// 可缩放
    top: top,// 距页面顶部距离
})
// #endif
```
## 其他操作

### 方法
-   `addEventListener`: 添加事件监听器
-   `back`: 后退到上次加载的页面
-   `close`: 关闭Webview窗口
-   `evalJS`: 在Webview窗口中执行JS脚本
-   `getSafeAreaInsets`: 获取页面的安全区域
-   `getTitle`: 获取Webview窗口加载HTML页面的标题
-   `hide`: 隐藏Webview窗口
-   `listenResourceLoading`: 监听页面开始加载资源
-   `setStyle`: 设置Webview窗口的样式
-   `setVisible`: 设置Webview窗口是否可见
-   `stop`: 停止加载HTML页面内容

### 事件

-   `onclose`: Webview窗口关闭事件
-   `onerror`: Webview窗口错误事件
-   `onloaded`: Webview窗口页面加载完成事件
-   `onloading`: Webview窗口页面开始加载事件

更多内容详解见参考文档：[HTML5产业联盟-WebviewObject](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject)
