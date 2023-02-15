---
title: "获取图片主色脚本：Rgbaster.js"
date: 2022-03-06T11:10:11+0800
tags: [折腾]
---

{{< figure "https://r2.immmmm.com/2022/03/rgbaster-rili.png" "https://r2.immmmm.com/2022/03/rgbaster-rili2.png" "单向历" >}}

之前做了一个 [单向历](https://edui123.com/rili/) 的单页面，通过 js 请求 api 加载当天的图片。有点小矛盾，当天图片大部分是白色，个别是黑色，那背景色怎么设置都会违和。

真是只有想不到没有做不到，而且很多还是别人已经做过的！

<!--more-->
Github 项目主页：<https://github.com/briangonzalez/rgbaster.js>

详细使用参考： <https://www.zhangxinxu.com/wordpress/2014/08/image-dominant-color-get-rgbaster-js/>

自己加了一个 rgba 的透明度。

```html
https://edui123.com/rili/rgbaster.min.js
```