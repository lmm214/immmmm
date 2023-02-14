---
title: "Hugo 豆瓣短代码"
date: 2023-01-23T21:52:44+0800
tags: [折腾]
---

{{< douban "https://book.douban.com/subject/35496106/">}}

{{< douban "https://movie.douban.com/subject/35267208/">}}

效果如上 ⬆️

<!--more-->

### 豆瓣书影音同步 GitHub Action

教程：<https://imnerd.org/doumark.html>

### Hugo 主题集成

把 [douban.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/douban.html) 另存为 html 之后丢入主题 `/layouts/shortcodes/` 内。

文章内如下插入即可（需去掉反斜杠）：

```
\{\{< douban "https://book.douban.com/subject/35496106/">\}\}
\{\{< douban "https://movie.douban.com/subject/35267208/">\}\}
```

相关 css 见这里 [theme.css](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/static/theme-20230214.css) ，搜索 `db-card`。

### 说明

2023-02-14 更新：之前分享的 API 镜像已挂，爬不起来的那种。目前采用本地解析豆瓣 csv 数据。