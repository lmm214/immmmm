---
title: "Hugo 「近期」短代码（基于 Doumark Actions）"
date: 2023-02-02T13:07:42+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/01/hugo-re-1.png
---


观影和阅读记录页面，无论用什么博客程序，总会想办法找 API 造轮子来实现。目前使用的是 [Douban sync for GitHub Actions](https://github.com/lizheming/doumark-action) 方法，它会自动把“豆瓣观影/阅读/音乐记录同步”存为本地文件，安逸！

既然本地已经有一份自己的观影和阅读数据文件 `data/douban/movie.csv` 和  `data/douban/book.csv` ，除了做成两个页面，这些数据还能怎么用呢？

<!--more-->

近期一直盯着 `getJSON` 函数和 Hugo 短代码做文章，那，继续折腾呗！

### 功能介绍

与完整记录页面的区别是，做成了短代码形式，同时限制了数量，方便文章中调用，比如在「关于」页面中展示。

### 主题集成

- 部署 [豆瓣书影音同步 GitHub Action](https://imnerd.org/doumark.html)；
- 把 [books.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/books.html) 和 [movies.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/movies.html) 另存为 html 之后丢入主题 `/layouts/shortcodes/` 内；
- 调用代码如下，默认是 4条数据。当然，也可手动指定，在短代码里加上数字（注意：直接数字，无引号）：

```
\{\{< movies >\}\}
\{\{< books >\}\}
\{\{< movies 8>\}\}
\{\{< books 8>\}\}
```

### 效果演示

#### 默认 4 条

{{< movies >}}

#### 指定 8 条

{{< books 8>}}