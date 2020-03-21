---
date: 2019-08-01
title: 'Canvas 手写输入法'
tags: [折腾]
published: true
hideInList: false
isTop: false
---


[xuebihua-cn](xuebihua-cn)

在整合完“写笔画”网站后，考虑到大屏上输入文字不太方便，搜索一圈发现以下代码：[web版手写输入法](https://my.oschina.net/u/3112095/blog/3038734) ，利用了 QQ输入法的手写 [handwritingapi.js](http://s.pc.qq.com/webime/hw/js/handwritingapi.js) 接口，不过文中添加的仅是鼠标事件，移动端的触摸事件不支持。

折腾到凌晨实在搞不定，求助了 @牧风 后依然卡壳，之后发现QQ输入法的鼠标定位值和 Canvas 直接触摸定位值不同，依样画葫芦造函数，神奇般的成了！

源码粗糙，可用就好： <https://xuebihua.cn/qqshuru.js>