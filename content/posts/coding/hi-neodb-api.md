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

### Hugo NeoDB 单条短代码

支持书、电影、剧集、游戏、播客，也支持豆瓣页面链接，源码见 [shortcodes/neodb.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/neodb.html)，

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

豆瓣页面链接调用：

{{< neodb "https://book.douban.com/subject/36328704/" >}}

```
\{\{< neodb "https://book.douban.com/subject/36328704/" >\}\}
```

### 首页「近期观影」和「近期阅读」

整体思路，通过 Cloudflare Workers 发起 Fetch 请求，这样可以避免 `Access Token` 暴露。

所以，如下三步走。

#### 1. 获取 Access Token

参考 @eallion [《NeoDB 获取 Access Token》](https://eallion.com/neodb_token/)。

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

#### 相关代码备份

```
/* db-card -------- start*/
.db-card{margin:2rem 3rem;background:#fafafa;border-radius: 4px;box-shadow: 0 1px 2px rgb(0 0 0 / 25%), 0 0 1px rgb(0 0 0 / 25%)}
.db-card-subject{display: flex;align-items:flex-start;line-height:1.6;padding:12px;position:relative;}
.dark .db-card{background:#252627;}
.db-card-content {flex:1 1 auto;}
.db-card-post {width: 96px;margin-right: 15px;display: flex;flex: 0 0 auto;}
.db-card-title {margin-bottom: 5px;font-size: 18px;}
.db-card-title a{text-decoration: none!important}
.db-card-abstract,.db-card-comment{font-size:14px;overflow: hidden;max-height:3rem;}
.db-card-cate{position: absolute;top:0;right:0;background:#f99b01;padding:1px 8px;font-size:small;font-style:italic;border-radius:0 8px 0 8px;text-transform:capitalize;}
.db-card-post img{width: 96px!important;height: 96px!important;border-radius: 4px;-o-object-fit: cover;object-fit: cover;}
.rating{margin: 0 0 5px;font-size:13px;line-height: 1;display: flex;align-items: center;}
.rating .allstardark{position:relative;color: #f99b01;height: 16px;width: 80px;background-size: auto 100%;margin-right: 8px;background-repeat: repeat;background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik05MDguMSAzNTMuMWwtMjUzLjktMzYuOUw1NDAuNyA4Ni4xYy0zLjEtNi4zLTguMi0xMS40LTE0LjUtMTQuNS0xNS44LTcuOC0zNS0xLjMtNDIuOSAxNC41TDM2OS44IDMxNi4ybC0yNTMuOSAzNi45Yy03IDEtMTMuNCA0LjMtMTguMyA5LjMtMTIuMyAxMi43LTEyLjEgMzIuOS42IDQ1LjNsMTgzLjcgMTc5LjEtNDMuNCAyNTIuOWMtMS4yIDYuOS0uMSAxNC4xIDMuMiAyMC4zIDguMiAxNS42IDI3LjYgMjEuNyA0My4yIDEzLjRMNTEyIDc1NGwyMjcuMSAxMTkuNGM2LjIgMy4zIDEzLjQgNC40IDIwLjMgMy4yIDE3LjQtMyAyOS4xLTE5LjUgMjYuMS0zNi45bC00My40LTI1Mi45IDE4My43LTE3OS4xYzUtNC45IDguMy0xMS4zIDkuMy0xOC4zIDIuNy0xNy41LTkuNS0zMy43LTI3LTM2LjN6TTY2NC44IDU2MS42bDM2LjEgMjEwLjNMNTEyIDY3Mi43IDMyMy4xIDc3MmwzNi4xLTIxMC4zLTE1Mi44LTE0OUw0MTcuNiAzODIgNTEyIDE5MC43IDYwNi40IDM4MmwyMTEuMiAzMC43LTE1Mi44IDE0OC45eiIgZmlsbD0iI2Y5OWIwMSIvPjwvc3ZnPg==);
}
.rating .allstarlight{position: absolute;left: 0;color: #f99b01;height:16px;overflow: hidden;background-size: auto 100%;background-repeat: repeat;background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik05MDguMSAzNTMuMWwtMjUzLjktMzYuOUw1NDAuNyA4Ni4xYy0zLjEtNi4zLTguMi0xMS40LTE0LjUtMTQuNS0xNS44LTcuOC0zNS0xLjMtNDIuOSAxNC41TDM2OS44IDMxNi4ybC0yNTMuOSAzNi45Yy03IDEtMTMuNCA0LjMtMTguMyA5LjMtMTIuMyAxMi43LTEyLjEgMzIuOS42IDQ1LjNsMTgzLjcgMTc5LjEtNDMuNCAyNTIuOWMtMS4yIDYuOS0uMSAxNC4xIDMuMiAyMC4zIDguMiAxNS42IDI3LjYgMjEuNyA0My4yIDEzLjRMNTEyIDc1NGwyMjcuMSAxMTkuNGM2LjIgMy4zIDEzLjQgNC40IDIwLjMgMy4yIDE3LjQtMyAyOS4xLTE5LjUgMjYuMS0zNi45bC00My40LTI1Mi45IDE4My43LTE3OS4xYzUtNC45IDguMy0xMS4zIDkuMy0xOC4zIDIuNy0xNy41LTkuNS0zMy43LTI3LTM2LjN6IiBmaWxsPSIjZjk5YjAxIi8+PC9zdmc+);}
@media (max-width:550px) {
	.db-card{margin:0.8rem 1rem;}
	.db-card-comment{display: none;}
}
/* db-card -------- end */
```

```
{{$movieitems := getJSON "https://db.immmmm.com/movie" }}
<div class="douban border-top sc-ksluID gFnzgG">
  <h3><a href="/movies/">近期观影</a></h3>
    <div class="items sc-dIsUp fIuTG">
        {{range $value := first 5 $movieitems.data}}
          {{ $item := $value.item }}
          {{ $itemRating := 0 }}{{ with $item.rating }}{{ $itemRating = . }}{{ end }}
          <div class="dfdORB">
            <div class="sc-hKFxyN HPRth"><div class="lazyload-wrapper"><img class="avatar" src="{{ $item.cover_image_url }}" referrer-policy="no-referrer" loading="lazy" alt=""  title="{{ $item.title }}" width="150" height="220"></div></div>
            <div class="sc-fujyAs eysHZq">
                <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:{{ mul 10 $itemRating }}%"></span></span><span class="rating_nums">{{ $itemRating }}</span></div>
            </div>
            <div class="sc-iCoGMd kMthTr"><a rel="noreferrer" href="https://neodb.social{{ $item.url }}" target="_blank">{{ $item.title }}</a></div>
          </div>
        {{end}}
    </div>
</div>

{{$bookitems := getJSON "https://db.immmmm.com/book" }}
<div class="douban border-bottom sc-ksluID gFnzgG">
  <h3><a href="/books/">近期阅读</a></h3>
    <div class="items sc-dIsUp fIuTG">
        {{range $value := first 5 $bookitems.data}}
          {{ $item := $value.item }}
          {{ $itemRating := 0 }}{{ with $item.rating }}{{ $itemRating = . }}{{ end }}
          <div class="dfdORB">
            <div class="sc-hKFxyN HPRth"><div class="lazyload-wrapper"><img class="avatar" src="{{ $item.cover_image_url }}" referrer-policy="no-referrer" loading="lazy" alt=""  title="{{ $item.title }}" width="150" height="220"></div></div>
            <div class="sc-fujyAs eysHZq">
                <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:{{ mul 10 $itemRating }}%"></span></span><span class="rating_nums">{{ $itemRating }}</span></div>
            </div>
            <div class="sc-iCoGMd kMthTr"><a rel="noreferrer" href="https://neodb.social{{ $item.url }}" target="_blank">{{ $item.title }}</a></div>
          </div>
        {{end}}
    </div>
</div>
```

### 后记

免费的就是贵啊，能用就用着先。