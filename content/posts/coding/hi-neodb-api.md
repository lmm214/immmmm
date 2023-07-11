---
title: "Hi, NeoDB"
date: 2023-07-11T19:18:47+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/07/neodb-2.png
---

[neodb.social](https://neodb.social/) 是一个致力于为联邦宇宙居民提供一个自由开放互联的书籍、电影、音乐和游戏收藏评论空间。NeoDB的源代码来自NiceDB，NiceDB由里瓣社区众筹开发。

可以理解为开源版本的某瓣，具体使用参考官方教程（[这里](https://about.neodb.social/doc/howto/)），数据迁移教程（[这里](https://about.neodb.social/doc/doufen/)）。

个人主页：[lmm214@mastodon.social](https://neodb.social/users/lmm214@mastodon.social/)

<!--more-->

最早听闻 NeoDB 来自 [@eallion](https://eallion.com/)，那时某瓣标记记录还可以通过第三方 Docker API 和 GitHub Actions 获取调用。几天前，小伙伴发现图挂了一片一片一大片，哎，换轮子！

### Hugo NeoDB 单挑短代码

源码见 [shortcodes/neodb.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/neodb.html)，支持书、电影、剧集、游戏、博客。

{{< neodb "https://neodb.social/book/5SJvkuHNGL4XhBddW2J4EJ" >}}

{{< neodb "https://neodb.social/movie/1bgVODaWCBKlCQ1AuGlLzC" >}}

{{< neodb "https://neodb.social/tv/season/5es8Us1HHOhVz3UlLmTspr" >}}

{{< neodb "https://neodb.social/game/5pvs201VxbkldH4LOEtDVt" >}}

{{< neodb "https://neodb.social/podcast/5tlY7lSI0WfXcoHstz7u4S" >}}

如下调用(去除反斜杠)：

```
\{\{< neodb "https://neodb.social/book/5SJvkuHNGL4XhBddW2J4EJ" >\}\}
\{\{< neodb "https://neodb.social/movie/1bgVODaWCBKlCQ1AuGlLzC" >\}\}
\{\{< neodb "https://neodb.social/tv/season/5es8Us1HHOhVz3UlLmTspr" >\}\}
\{\{< neodb "https://neodb.social/game/5pvs201VxbkldH4LOEtDVt" >\}\}
\{\{< neodb "https://neodb.social/podcast/5tlY7lSI0WfXcoHstz7u4S" >\}\}
```

或者修改之前的 Douban 短代码，源码见 [shortcodes/douban.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/douban.html)。

{{< douban "https://book.douban.com/subject/36328704/" >}}

```
\{\{< douban "https://book.douban.com/subject/36328704/" >\}\}
```

### 首页「近期观影」和「近期阅读」

整体思路，通过 Cloudflare Workers 发起 Fetch 请求，这样可以避免 `Access Token` 暴露。

所以，如下三步走。

#### 1. 获取 Access Token

访问：<https://neodb.social/developer/> ，点击 `Test Access Token` `Generate` 复制，留存。

#### 2. 新建 Cloudflare Workers

`worker.js` 代码如下（记得修改密钥和绑定子域名）：

```
const myBearer = '91…………………………………………wi'  //你的密钥

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
 
async function handleRequest(request) {
  const url = new URL(request.url)
  const category = url.pathname.substring(1)
  console.log(category)
  let dbApiUrl = 'https://neodb.social/api/me/shelf/complete?category=' + category + '&page=1'
  return fetch(dbApiUrl ,{
    method:'get',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + myBearer
    }
  });
}
```

#### 3. Hugo getJSON 调取

源码见 [_default/index.html.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/index.html.html)

核心代码如下：

```
{{$movieitems := getJSON "https://db.immmmm.com/movie" }}
{{range $value := $movieitems.data}}
    {{ $item := $value.item }}
    {{ $item.title }}
    ……
{{end}}
```

`https://db.immmmm.com/movie` 获取到的数据其实是

`https://neodb.social/api/me/shelf/complete?category=movie&page=1`

### 后记

免费的就是贵啊，能用就用着先。