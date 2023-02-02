---
title: "Hugo 「近期」短代码"
date: 2023-02-02T13:07:42+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2023/01/hugo-re-1.png!webp
---

## 基于 doumark-action

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

## 基于 Memos Docker

### 增 Memos 短代码调用

#### 效果演示

{{< memos >}}

#### 主题集成

- 把 [memos.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/memos.html) 另存为 html 修改第 5 行 `bbUrl` 网址和参数：

```
var bbUrl = "https://me.edui.fun/api/memo?creatorId=101&rowStatus=NORMAL&limit=5"
```

- 之后丢入主题 `/layouts/shortcodes/` 内；
- 调用代码如下：

```
\{\{< memos >\}\}
```

### 增 Memos 动态相册

此想法原创为 @Leonus 同学：[《基于memos的动态相册》](https://blog.leonus.cn/2023/photos.html)

仔细查阅发现调取是带 `#相册` 标签的 Memos 内容，并正则匹配内容中的 md 格式图片，再前端解析。个人换了一个实现思路，先看效果。

#### 效果演示

{{< album >}}

#### 主题集成

- 把 [album.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/album.html) 另存为 html 修改第 5、6 行 `memoUrl` 网址和 `galleryUrl` 内的参数：

```
var memoUrl = "https://me.edui.fun/"
var galleryUrl = memoUrl+"api/memo?creatorId=101&limit=5&tag=相册"
```

- 之后丢入主题 `/layouts/shortcodes/` 内；
- 调用代码如下：

```
\{\{< album >\}\}
```

#### 相册动态更新

![album](https://pic.edui.fun/images/2023/01/album.png)

- 格式要求：打标签 `#相册`空格`相册图片名`；
- 利用内置资源库上传单张或多张图片，即可。