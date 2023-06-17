---
title: "前端调用 Umami API 数据"
date: 2023-06-11T12:15:43+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/06/umami-im.png
---

[Umami](https://umami.is/) 一个高颜值可自部署的统计应用。

看着服务器负载常年低于10%，有一点点需求的应用，特别是能 Docker 部署的，全都安排上！看着基本的统计数据都有。不错不错！但，能直接 API 前端调用统计数据不？可以的，接口见官网： <https://umami.is/docs/api>

<!--more-->

2023-06-11 更新：采用 @归臧 [《使用 Umami Api 显示统计数据》](https://nuoea.com/use-umami-api/) 获取 Token 。

### 获取 Token

Hoppscotch： <https://hoppscotch.io/>

![umami-im-1](https://r2.immmmm.com/2023/06/umami-im-1.jpg)

如图，成功后记录下 `token` 

### 获取 websiteId

```
https://u.edui.fun/websites/c27bd84b-02a3-4c3f-a168-0d7fadec9c74/immmmm
```

如上链接中的 `c27bd84b-02a3-4c3f-a168-0d7fadec9c74` 就是 `websiteId`。

### 前端调用全站数据

```html
<div class="tongji">总访问量 <span id="pvStatic">0</span> 次 | 总访客数 <span id="uvStatic">0</span> 人</div>
```

```JavaScript
document.addEventListener('DOMContentLoaded', () => {
    umiTongji();
});
function umiTongji(){
  var umiToken = "o7......w="  //获取到的 token
  var umiId = "c27bd84b-02a3-4c3f-a168-0d7fadec9c74" //获取到的 websiteId
  var umiTime = Date.parse(new Date());
  var umiUrl = "https://u.edui.fun/api/websites/"+umiId+"/stats?start_at=1672848000000&end_at="+umiTime;
  fetch(umiUrl,{
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': 'Bearer ' + umiToken,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json()).then(resdata => {
    document.querySelector('#pvStatic').innerHTML = resdata.pageviews.value
    document.querySelector('#uvStatic').innerHTML = resdata.uniques.value
  });
}
```

搞定！

### 更多：当前在线数……

```
GET /api/websites/{websiteId}/active  //获取网站上的活跃用户数。
GET /api/websites/{websiteId}/events  //获取给定时间范围内的事件。
GET /api/websites/{websiteId}/pageviews  //获取给定时间范围内的页面浏览量。
GET /api/websites/{websiteId}/metrics  //获取给定时间范围内的指标。
GET /api/websites/{websiteId}/stats  //获取汇总的网站统计信息。
```

### 更多教程

官方 API ：<https://umami.is/docs/website-stats>

Umami API 使用方法：<https://www.zywvvd.com/notes/tools/umami/umami-api/umami-api/>