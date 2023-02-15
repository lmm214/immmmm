---
title: "前端调用 Umami API 数据"
date: 2022-09-26T18:55:43+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/09/umami-1.jpg
---

[Umani](https://umami.is/) 一个高颜值可自部署的统计应用。

看着服务器负载常年低于10%，有一点点需求的应用，特别是能 Docker 部署的，全都安排上！

<!--more-->

![umami-2](https://r2.immmmm.com/2022/09/umami-2.jpg)

看着基本的统计数据都有。不错不错！但，能直接 API 前端调用统计数据不？可以的，接口见官网： <https://umami.is/docs/api>

! 注明：以下代码两个问题搞不定、搞不懂……依然报跨域！Token 会过期……

### 文章阅读量

轻松平替 twikoo ～

1. 进 umami 后台获取「共享链接」，如 <https://u.edui.fun/share/rMnNVR9W/immmmm>

![umami-3](https://r2.immmmm.com/2022/09/umami-3.jpg)

2. 浏览器隐身模式下访问，开启开发者工具，刷新页面，网络里获取到公开的访客 `token`，如：`eyJhb。。。。。x4`

![umami-4](https://r2.immmmm.com/2022/09/umami-4.jpg)

3. 部署服务器上开启允许跨域，我的是宝塔 nginx，加入 `x-umami-share-token`。

```
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'x-umami-share-token,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
    if ($request_method = 'OPTIONS') {
        return 204;
    }
```

4. 前端调用代码：

```html
<span id="umami_visitors">0</span> 阅读
```

```JavaScript
let uUrl = "https://u.edui.fun" //你自己部署的网址
let uShare = "ey。。。。。go"  //刚获取的访客 token
let uApi = uUrl+"/api/website/1/metrics?type=url&start_at=1664121600000&end_at=1664294399999"
fetch(uApi,{
  headers: {'x-umami-share-token': uShare}
}).then(response => response.json() ).then(data => {
  var queryDate = data.filter(function(fp){
    return fp.x === window.location.pathname;
  })
  if(queryDate){
    document.querySelector('#umami_visitors').innerHTML = queryDate[0].y;
  }
})
```

搞定！

### 更多：全站访问数、当前在线数……

同理，找显示啥，直接 api 搞定！