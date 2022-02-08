---
date: 2019-07-29
title: '“学笔画”折腾小记'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

点击体验→ <https://xuebihua.cn>

![xuebihua_qr](https://pic.edui.fun/images/2019/07/xuebihua_qr.png)

刷着阮一峰的 weekly 看到了 [Hanzi Writer](https://chanind.github.io/hanzi-writer/cn/) [^hanzi-writer] 这个项目，发现笔顺的动画比较自然，还能在 svg 上手写练习，最重要的是看看 demo 好像上手比较简单，实际也如此。

功能代码非常好使，基本折腾在界面和陌生的代码上，比如想让 svg 自适应，搜索测试一晚发现还是以下代码好使：

<!--more-->

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

考虑到教室大屏上不方便输入文字，直接内置一年级语文的400个生字，点击即可展示。发现，会 jQuery 还真省事！

折腾完准备上线使用的是 Coding Page 服务，这货已经被腾讯云拿下，索性直接败个 cn 域名绑定之。

[^hanzi-writer]: HanziWriter是javascript免费开源库，根据汉字书写时按照笔画顺序的特征，可以播放正确笔画顺序的描边动画和练习测试。支持简体字和繁体字。

源码： <https://github.com/lmm214/xuebihua/>