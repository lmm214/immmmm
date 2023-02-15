---
title: "启用「霞鹜文楷」在线字体"
date: 2023-01-07T14:35:18+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/01/wenkai-1.png
---

项目地址：<https://github.com/chawyehsu/lxgw-wenkai-webfont>

<!--more-->

直接调用 CDN。

```
<link rel="stylesheet" href="https://npm.elemecdn.com/lxgw-wenkai-screen-webfont/style.css" media="print" onload="this.media='all'">
```

或 @一蓑烟雨 分享的 staticfile CDN 

```
<link rel="stylesheet" href="https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.6.0/lxgwwenkaiscreen.css" media="print" onload="this.media='all'">
```

```
body {
  /* Screen version */
  font-family: "LXGW WenKai Screen", sans-serif;
}
```

舒服 😌