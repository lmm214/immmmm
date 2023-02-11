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

相关 css 见这里 [theme-20230123.css](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/static/theme-20230123.css) ，搜索 `post-preview`。

### 说明

{{< link "post-show-douban-item">}}

之前一直采用的是前端 JavaScript 匹配豆瓣链接，再通过 API 获取数据插入 Dom。

现在使用 Hugo 的 `getJSON` 函数，后端直接输出 HTML。不再会向 JavaScript 一样，总得等一下、闪一下。