---
title: "Hugo 创建「好物」页面"
date: 2023-05-27T10:36:47+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/05/goods-page.png
---

最早是在 [@koobai](https://koobai.com/hardware/) 看到「好物」页面，前几天又看到 [@wananaiko](https://www.wananaiko.com/goods/) 也已折腾，这得紧跟步伐。（其实是宏手柄到了，挂机刷素材中~）

<!--more-->

### 实现思路

利用 `getJSON` 函数统一维护页面数据，后期更新修改在 `data/goods.json` 中，不再需要动页面模板。

当然，如 @wananaiko 通过短代码实现也是OK的，不过短代码更适合单条数据在不同文章内调用，不然模板内置的 CSS 会重复插入。

### 具体代码

涉及 3 个文件：

[themes/hello-friend/layouts/_default/goods.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/goods.html) ：创建页面模板

[content/goods.md](https://github.com/lmm214/immmmm/blob/master/content/goods.md) ：新建 Hugo 页面

[data/goods.json](https://github.com/lmm214/immmmm/blob/master/data/goods.json)：数据文件