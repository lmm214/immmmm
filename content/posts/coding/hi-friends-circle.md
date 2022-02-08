---
title: "Hi，My Friends Beta"
date: 2022-02-02T10:12:46+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2022/01/myf-1.png
---

喜大普奔：<https://immmmm.com/friends/>

> 致敬，用爱发电er

### 前端部署代码

找个页面丢进去，就能看到默认的 API 解析的文章列表。

```html
<!-- 挂载友链朋友圈的容器 -->
<div id="fcircleContainer">与主机通讯中……</div>
<!-- 加样式和功能代码 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-beta.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-beta.js"></script>
```

<!--more-->

默认用用到此为止，已足以。

如需尝鲜独立部署，先查看 [友链朋友圈食用说明书](https://noionion.top/47095.html)  ，其中 Beta 后端部署有以下3处不同。

#### fork仓库地址为

<https://github.com/2X-ercha/CircleOfFriends-Simple>

![cf-beta-1](https://pic.edui.fun/images/2022/02/cf-beta-1.png)

#### Vercel 直接导入新fork的仓库

![cf-beta-2](https://pic.edui.fun/images/2022/02/cf-beta-2.png)

#### Vercel 部署前的根目录选择为 API

![cf-beta-3](https://pic.edui.fun/images/2022/02/cf-beta-3.png)

### 心路历程

`fcircle-beta.js`  源自 [fetch.js](https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fetch.js) 和 [fcircle.js](https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fcircle.js)，从最初的简单合并实现了“第一次打开即能显示相应内容”，之后一天天的 commit 几乎是逼着强力后端 [@贰猹](https://noionion.top/) 做了一个全新的 API，实现了很多全新的交互。

#### 点击「订阅」，随机显示博客卡片

![cf-beta-5](https://pic.edui.fun/images/2022/02/cf-beta-5.gif)

#### 点击「活跃」，切换公共库和个人库

![cf-beta-6](https://pic.edui.fun/images/2022/02/cf-beta-6.gif)

目前内置的公共库 feeds 列表是这个

<https://github.com/2X-ercha/CircleOfFriends-Simple/blob/master/hexo_circle_of_friends/config/link.yml>

内置的个人库 feeds 是这个

<https://github.com/lmm214/CircleOfFriends-Simple/blob/master/hexo_circle_of_friends/config/link.yml>

如需更改，除了自己部署外，需在 html 内加上一下代码：

```html
<script type="text/javascript">
  var fdataUser = {
    apiurl: 'https://circle-of-friends-simple-lmm214.vercel.app/'
  }
</script>
```

#### 点击文章列表的头像，随机此博客卡片

![cf-beta-7](https://pic.edui.fun/images/2022/02/cf-beta-7.gif)
