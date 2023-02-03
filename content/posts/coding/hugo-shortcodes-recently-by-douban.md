---
title: "Hugo 「近期」短代码（基于 Doumark Actions）"
date: 2023-02-02T13:07:42+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2023/01/hugo-re-1.png!webp
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

## 基于 Memos Docker

### 近期 Memos

#### 效果演示

{{< memos >}}

#### 主题集成

- 把 [memos.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/memos.html) 另存为 html 修改第 5 行 `bbUrl` 网址和参数：

```
var bbUrl = "https://me.edui.fun/api/memo?creatorId=101&rowStatus=NORMAL&limit=5"
```

- 之后丢入主题 `/layouts/shortcodes/` 内；
- 调用短代码如下：

```
\{\{< memos >\}\}
```

### 近期光影

此想法原创为 @Leonus 同学：[《基于memos的动态相册》](https://blog.leonus.cn/2023/photos.html)

仔细查阅发现调取是带 `#相册` 标签的 Memos 内容，并正则匹配内容中的 md 格式图片，再前端解析。个人兼容了一下使用 Memos 内置资源库上传的图片显示。

#### 效果演示

{{< album >}}

#### 主题集成

- 把 [album.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/album.html) 另存为 html 修改第 5、6、7 行 `limit` `memoUrl` 网址和 `creatorId` 参数：

```
let limit = 8
var memoUrl = "https://me.edui.fun/"
var creatorId = 101
```

- 之后丢入主题 `/layouts/shortcodes/` 内；
- 调用短代码如下：

```
\{\{< album >\}\}
```

#### 相册动态更新方式一

![leonus_2023-01-29_20-03-25](https://pic.edui.fun/images/2023/01/leonus_2023-01-29_20-03-25.png!webp)

图片外链以 `日期+空格+标题` 命名方式前端会显示。

```
#相册 
![2023-01-29 ](https://cn.bing.com/th?id=OHR.SessileOaks_EN-US1487454928_768x1280.jpg)
![Bing](https://cn.bing.com/th?id=OHR.Umschreibung_EN-US4693850900_768x1280.jpg)
![2023-01-29 Bing](https://cn.bing.com/th?id=OHR.InscriptionWall_EN-US1392173431_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_1280x768.jpg)
```

#### 相册动态更新方式二

![album](https://pic.edui.fun/images/2023/01/album.png)

- 格式要求：打标签 `#相册`空格`相册图片名`；
- 利用内置资源库上传单张或多张图片，即可。