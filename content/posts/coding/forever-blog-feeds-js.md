---
title: "调取「十年之约」专题展示 Feeds"
date: 2023-06-15T20:26:39+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/06/forever-blog-feed.png
---

「十年之约」有个 [Feeds](https://www.foreverblog.cn/feeds.html) 聚合页面。

在想，既然可以把「友链朋友圈」展示在首页，那「十年之约」为何不可呢？寻思许久，原来若干年前到站长博客咨询过是否有文章的 API 接口。

<!--more-->

结果是，不但得到回复有，而且接口包含信息还不少。这下就简单咯！

JavaScript 、Fetch 一顿操作猛如虎，折腾如下：

```
<div id="foreverblog"></div>
<script type="text/javascript" src="https://immmmm.com/foreverfeeds.js"></script>
```

自己调取即可，欢迎尝鲜~

2023-06-17：首页已换回友链朋友圈feeds，看着熟悉的头像更亲切。