---
title: "Hugo 「近期」短代码（基于 Memos Docker）"
date: 2023-02-03T11:07:42+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/01/guang.png
---

### 近期光影

此想法原创为 @Leonus 同学：[《基于memos的动态相册》](https://blog.leonus.cn/2023/photos.html)

仔细查阅发现调取一条带 `#相册` 标签的 Memos 内容，并正则匹配内容中的 md 格式图片，再前端解析。个人兼容拓展了一下，解析多条可外链和 Memos 内置资源库上传的图片显示。

<!--more-->

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

![leonus_2023-01-29_20-03-25](https://r2.immmmm.com/2023/01/leonus_2023-01-29_20-03-25.png)

图片外链以 `日期+空格+标题` 命名方式前端会显示。

```
#相册
![2023-01-29 ](https://cn.bing.com/th?id=OHR.SessileOaks_EN-US1487454928_768x1280.jpg)
![Bing](https://cn.bing.com/th?id=OHR.Umschreibung_EN-US4693850900_768x1280.jpg)
![2023-01-29 Bing](https://cn.bing.com/th?id=OHR.InscriptionWall_EN-US1392173431_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_1280x768.jpg)
```

#### 相册动态更新方式二

![album](https://r2.immmmm.com/2023/01/album.png)

- 格式要求：打标签 `#相册`空格`相册图片名`；
- 利用内置资源库上传单张或多张图片，即可。

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

### 近期好物

#### 效果演示

{{< goods >}}

#### 主题集成

- 把 [goods.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/goods.html) 另存为 html 修改参数之后丢入主题 `/layouts/shortcodes/` 内；
- 文章内调用短代码如下：

```
\{\{< goods >\}\}
```

#### 好物更新方式

![memos-goods](https://r2.immmmm.com/2023/06/memos-goods.png)

标签后有空格，之后各行分别为：价格、标题（可链接）、描述。