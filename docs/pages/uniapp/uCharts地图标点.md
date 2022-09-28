# uCharts

> `uCharts`是一款基于`canvas API`开发的适用于所有前端应用的图表库，开发者编写一套代码，可运行到 Web、iOS、Android（基于 uni-app / taro ）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝/京东/360）、快应用等更多支持 canvas API 的平台。

本文介绍`uCharts`地图实现标点，以组件的方式实现，任何问题欢迎沟通交流。

## 效果图
**图一是直接给经纬度标点，图二是显示当前省份下对应的数量**

![2022-06-24_172204.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d328c07db3814a3b9e6326e80e165d24~tplv-k3u1fbpfcp-watermark.image?)

## 通过经纬度标点

### 1. 组件传入数据

``` html
<qiun-data-charts 
    type="map"
    :opts="opts"
    :chartData="chartData"
    :reload="reload"
/>
        
opts = {
     ……
    // 通过添加一个任意一个不和已有属性重名的属性, 将经纬度及其他可能用到的数据传入
    location: [
        {
            coordinate: ['经纬度坐标'],
            count: '',
        }
    ]
}
```

### 2. 找对应ucharts的源码

- 打开文件 `/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js`

- `drawMapDataPoints` 函数即绘制地图的函数

### 3. 开始绘制

``` js
// 利用ucharts封装好的方法进行坐标转换
function drawMapDataPoints(series, opts, config, context) {
    // 源码中部分代码
    var data = series;
    var bounds = getBoundingBox(data);
    var xScale = opts.width / Math.abs(bounds.xMax - bounds.xMin);
    var yScale = opts.height / Math.abs(bounds.yMax - bounds.yMin);
    var scale = xScale < yScale ? xScale : yScale;
    var xoffset = opts.width / 2 - Math.abs(bounds.xMax - bounds.xMin) / 2 * scale;
    var yoffset = opts.height / 2 - Math.abs(bounds.yMax - bounds.yMin) / 2 * scale;
    
    // 获取经纬度及其他数据的数组
    const location = opts.location
    location.forEach(item => {
        // 经纬度转墨卡托坐标
        const mercator =  lonlat2mercator('经度', '纬度')
        // 转换为当前经纬对应canvas画布上的坐标
        const point = coordinateToPoint(mercator[1], mercator[0], bounds, scale, xoffset, yoffset);
        // 绘制白点
        context.beginPath();
        context.arc(point.x, point.y, 1, 0, Math.PI * 2, false)
        context.strokeStyle = 'transparent'
        context.fillStyle = 'white'
        context.fill()
        context.closePath();
        context.stroke();
        // 绘制标记icon
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.arc(point.x, point.y - fontSize * 2, fontSize * 1, 45 * Math.PI/180, 135 * Math.PI/180, true);
        context.lineTo(point.x, point.y);
        context.fillStyle = '#B9AF57';
        context.fill();
        context.closePath();
    })
}
```

## 省份对应的数量标点

### 1. 组件传入数据

``` html
<qiun-data-charts 
    type="map"
    :opts="opts"
/>
​
// 需注意: 省份名称需处理为地图上显示的字样
opts.data = {
    '内蒙古': 1,
    '山西': 1,
};
```

### 2. 找对应ucharts的源码

源码大致位置同上，再往下看找到如下代码

``` js
if (opts.dataLabel == true) {
    // 循环绘制省份名称
    for (var i = 0; i < data.length; i++) {
        var centerPoint = data[i].properties.centroid;
        if (centerPoint) {
            // 准备在此处修改代码
        }
    }
}
```

### 3. 开始绘制

``` js
// 记录该省的数量
const count = opts.data[data[i].properties.name]
​
// 绘制省份名称
point = coordinateToPoint(centerPoint[1], centerPoint[0], bounds, scale, xoffset, yoffset);
context.beginPath();
context.textAlign = 'left';
context.setFontSize(fontSize)
context.setFillStyle(data[i].textColor || opts.fontColor)
// 记录省份名称x轴位置
const x = point.x - measureText(text, fontSize, context) / 2
// 如果该省份有数量，就将x位置偏移一点
context.fillText(text, !count ? x : (x + fontSize / 4), point.y + fontSize / 2);
context.closePath();
context.stroke();
// 省份绘制完成
​
// 如果有数量 开始绘制
if (count) {
    context.beginPath();
    // 定义省份名称前面的圆点的中心 后续绘制以此为原点进行计算
    const centerx = point.x - measureText(text, fontSize, context) / 2
    const centery = point.y + fontSize / 2
    // 绘制icon背景
    context.moveTo(centerx, centery);
    context.arc(centerx, centery - fontSize * 2, fontSize * 1, 45 * Math.PI/180, 135 * Math.PI/180, true);
    context.lineTo(centerx, centery);
    context.fillStyle = '#B9AF57';
    context.fill();
    context.closePath();
​
    // 绘制icon上的数量
    context.beginPath();
    context.textAlign = 'center';
    context.setFontSize(fontSize)
    context.setFillStyle(data[i].textColor || opts.fontColor)
    context.fillStyle = '#FFFFFF'
    // 因为icon大小是固定的，数量太大样式会有问题，如果太多的话显示 99+
    context.fillText(count < 100 ? count : '99+', centerx, centery - fontSize * 1.5)
    
    // 绘制白色圆点
    context.arc(centerx, centery, 1, 0, Math.PI * 2, false)
    context.strokeStyle = 'transparent'
    context.fillStyle = 'white'
    context.fill()
    context.closePath();
    context.stroke();
}
```
#### 随心记

> 一开始用`uCharts`是在写一个`uniapp`编译微信小程序的项目时，用`eCharts`实现不出来对应效果，就去网上找另外插件，看到了这个，刚开始的时候这个插件还是免费的，就将这个插件用到项目里面了。过了一段时间又有一个`uniapp`项目用到了图表，就又想到了这个，但是一看文档发现这个开始收费了，看了下`uniapp`插件市场下的评论，都是在表达对这插件的不满。不过想来收费应该可以带来的是后续的维护，还是开了一个会员；当时还是看到活动期间开通会员次月可全部返还才开的，不过进了会员群之后听讨论才注意到是有些条件的，还是大意了。用了几次之后有技术问题就在会员群里进行提问，群主还是很上心地进行答疑，告知了些修改源码的思路；通过这几次的修改，了解到了一些平时没用到的技术和思想还是很开心的，现在想来会员开的还是值的。

[ucharts官网](https://www.ucharts.cn/v2/#/)
