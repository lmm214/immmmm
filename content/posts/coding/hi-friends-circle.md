---
title: "Hi，My Friends"
date: 2022-01-27T10:12:46+0800
tags: [折腾]
feature: https://lmm.elizen.me/images/2022/01/myf-1.png
---

喜大普奔：<https://immmmm.com/friends/>

后端部署见：[友链朋友圈食用说明书](https://noionion.top/47095.html) 

也可先部署我改过的前端（用我搭好的API），样式基于 [@Heo](https://blog.zhheo.com/)，功能代码把原来的 [fetch.js](https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fetch.js) 和 [fcircle.js](https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fcircle.js) 做了合并，优化了部分逻辑，搞定了 **“第一次访问要刷新下页面才能看到……”** 。

<!--more-->

### 前端部署代码

```html
<!-- 挂载友链朋友圈的容器 -->
<div id="fcircleContainer">与主机通讯中……</div>
<!-- 加样式和功能代码 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-lmm.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-lmm.js"></script>
```

找个页面丢进去，就能看到默认的 API 解析的文章列表。如果部署了自己的后端，再加入以下代码：

```html
<script type="text/javascript">
  var fdataUser = {
    apiurl: 'https://friendcircle-api-fx7ykk2ye-lmm214.vercel.app/api'
  }
</script>
```

哈，又干掉一个配置项！

> 致敬，用爱发电er
