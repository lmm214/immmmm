---
date: 2017-07-26
title: '决战24点（HTML5）开发小记'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

点击体验：<https://pk24go.cn>

本就开发了一个玩儿24点游戏的微信公众号“决战24点”（pk24go），可以回复综合算式进行解答。说实话，还是挺不方面的。前段时间看到 [4数网](http://4shu.net/) 在线 HTML5 玩法，立马着手改造！

### 改造点

1、界面UI：以方格为基本图形，4个数字在4个角落，4个运算符号在中间，完成数、撤销返回、提示等按钮在空白小方格中。
2、功能减法：去除时间限制模式、积分、结束按钮。
3、功能加法：新增【题库选择】可选择数字范围1~10或1~13，新增【待解模式】针对性强化玩家提示过的题组。

<!--more-->

### 功能优化（踩坑）：

1、去除移动端点击事件出现的灰色背景框添加CSS属性样式 

`body{-webkit-tap-highlight-color:rgba(0,0,0,0)}`

2、加速 click 点击延迟历史遗留问题，移动浏览器大约 300 毫秒的等待时间。为什么这么设计呢？ 因为它想看看你是不是要进行双击（double tap）操作。

解决方法 [FastClick.js](https://github.com/ftlabs/fastclick/)

3、canvas 宽度自适应

解决方法 [FixCanvasSizeOnDevice](https://github.com/zhangjikai/CodeSamples/blob/master/html/html5/FixCanvasSizeOnDevice.html)

小坑：meta 中  `initial-scale=1` 改为 `initial-scale=1.0` 
中坑：canvas 画出来的文字线条严重发虚！

解决方法 [HiDPI Canvas Polyfill](https://github.com/jondavidjohn/hidpi-canvas-polyfill)

4、利用 LocalStorage 的“黑科技”

[Basket.js](https://github.com/addyosmani/basket.js)  把近 70KB 的1362道题目和解法缓存到浏览器中

### 源码

<https://coding.net/u/lmm214/p/pk24go/git>

<https://github.com/lmm214/pk24go>