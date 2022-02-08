---
title: "添加 Google Fonts 思源宋体"
date: '2020-03-30T12:24:00+08:00'
tags: [折腾]
feature: https://pic.edui.fun/images/2020/03/google-fonts-1.png
---

谷婶大法好，在线字体都支持中文咯！ 👍

访问 [Google Fonts](https://fonts.google.com/?subset=chinese-simplified)，点选需要的字体，简单设置能获得样式链接。~~虽听闻字体服务器国内也有节点，但还是启用 loli 的 CDN，感谢！~~ 

<!--more-->

结合异步加载代码如下：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Serif+SC&display=swap" media="print" onload="this.media='all'">
```

```css
font-family: 'Noto Serif SC', serif;
```

个人只设置了 `.post-content` 部分为思源宋体，不然页面打开那几秒，难受！东施效颦，扑面而来！

### 来源

- [简单实现 Google Fonts 的异步加载](https://io-oi.me/tech/loading-google-fonts-async/)
- [Google Fonts 已支持思源宋体！](https://io-oi.me/tech/noto-serif-sc-added-on-google-fonts/)
