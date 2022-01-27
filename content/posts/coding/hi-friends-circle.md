---
title: "Hi，My Friends"
date: 2022-01-27T10:12:46+0800
tags: [折腾]
feature: https://lmm.elizen.me/images/2022/01/myf-1.png
---

喜大普奔：<https://immmmm.com/friends/>

后端部署见：[友链朋友圈食用说明书](https://noionion.top/47095.html) 

也可直接用我部署的 API ，先部署前端，自己做了一些改动，样式给予 [@Heo](https://blog.zhheo.com/)，功能代码主要是把原来的 [fetch.js](https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fetch.js) 和 [fcircle.js](https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fcircle.js) 做了合并，优化了部分逻辑，搞定了 **“第一次访问要刷新下页面才能看到……”** 。

<!--more-->

### 前端部署代码

```html
<!-- 挂载友链朋友圈的容器 -->
<div id="fcircleContainer">与主机通讯中……</div>
<!-- 加样式和功能代码 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-lmm.css">
<script type="text/javascript">
  var fdata = {
    apiurl: 'https://friendcircle-api-fx7ykk2ye-lmm214.vercel.app/api',
    initnumber: 20, //【可选】页面初始化展示文章数量
    stepnumber: 10,//【可选】每次加载增加的篇数
    error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c' //【可选】头像加载失败时默认显示的头像
  }
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-lmm.js"></script>
```

〉 致敬，用爱发电er