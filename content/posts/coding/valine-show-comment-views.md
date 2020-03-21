---
date: 2020-01-27
title: 'Valine 文章列表显示评论数和阅读数'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

回头一看 Valine 已使用半年，除早前国内版 Leancloud 出现**被**宕机，整体还算稳。

闲着寻思到 Valine 能否在首页文章列表中显示对应的「评论数」和「阅读数」，查阅了文档（只有阅读数代码）和issue，好家伙,竟然 [v1.1.8-beta2](https://github.com/xCss/Valine/releases/tag/v1.1.8-beta2) 已实现！

<!--more-->

### 评论数

```html
<span class="valine-comment-count" data-xid="pathname"></span>
```

自动查找网页中class值为 `valine-comment-count` 的元素并自动填充查询结果，如果文章完整网址是 `http://immmmm.com/valine-show-comment-views` ，pathname则是 `/valine-show-comment-views`。

### 阅读数

直接套用手册：<https://valine.js.org/visitor.html>

### 结语

效果预览：<https://i.immmmm.com/>

但发现如果首页刷新过快，会被 Leancloud 阻止……

PS：刚官宣学校推迟上学了，咳！




