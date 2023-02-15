---
title: "Hi，My Friends（Public Beta）"
date: 2022-02-11T15:12:46+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/02/myf-12.png
---

>你是否经常烦恼于友链过多但没有时间浏览？那么友链朋友圈将解决这一痛点。你可以随时获取友链网站的更新内容，并了解友链的活跃情况 。 —— [「友链朋友圈」](https://hexo-circle-of-friends-doc.vercel.app/)

在线预览：<https://immmmm.com/friends/>

### 快速部署

#### 挂载前端代码

博客新建一个页面，放入以下代码：

```html
<!-- 挂载友链朋友圈的容器 -->
<div id="cf-container">与主机通讯中……</div>
<!-- 加样式和功能代码 -->
<link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-beta.css">
<!-- 匹配自己的友链或加载后端数据
<script type="text/javascript">
  var fdataUser = {
    jsonurl: 'https://cdn.edui.fun/lmm.json',  //【推荐】json 匹配模式
    //apiurl: 'https://hexo-circle-of-friends-lmm214.vercel.app/',  //自部署api
  }
</script>
-->
<script type="text/javascript" src="https://fastly.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-beta.js"></script>
```

这样就搞定啦，默认看到的是 750+ feeds 的公共库（数据来自 [saveweb](https://github.com/saveweb/rss-list)）。

<!--more-->

#### 匹配自己的友链

当然，我们也想拥有一个纯自己友联的文章更新情况。来，取消注释，推荐采用第一种 `jsonurl` 方式。

```html
<script type="text/javascript">
  var fdataUser = {
    jsonurl: 'https://cdn.edui.fun/lmm.json',  //【推荐】json 匹配模式
    //apiurl: 'https://hexo-circle-of-friends-lmm214.vercel.app/',  //自部署api
    //initnumber: 20,  //首次加载文章数
    //stepnumber: 10,  //更多加载文章数
    //article_sort: 'created', //文章排序 updated or created
    //error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c'
  }
</script>
```

其实 `lmm.json` 就是个 link 的数组，原理是把这数组与公共库进行匹配，返回对应的文章列表。

这也是 [「Rock-Candy-Tea」](https://github.com/Rock-Candy-Tea) 持之以恒，努力抛弃后端的成果！

### [可选]后端配置

见最新文档：<https://hexo-circle-of-friends-doc.vercel.app/>

### 项目历程

> 致敬，用爱发电er

| 名称     | 主页                       | 说明                                                         |
| -------- | -------------------------- | ------------------------------------------------------------ |
| 冰老师   | https://zfe.space/         | 友链朋友圈理念奠基人，初代前后端方案编写者，冰老师YYDS！     |
| Akilar   | https://akilar.top/        | 为历代友链朋友圈提供前端方案，npm插件方案编写者              |
| heo      | https://blog.zhheo.com/    | 友链朋友圈前端方案、视觉设计，UI 方案多样化                  |
| 贰猹     | https://noionion.top/      | 历代友链朋友圈后端维护者，3.0方案编写者，多主题友链抓取适配，朋友圈售后中流砥柱，公共库方案、api编写者 |
| RaXianch | https://blog.raxianch.moe/ | 友链朋友圈后端维护，多主题友链抓取适配                       |
| yyyz     | https://www.yyyzyyyz.cn/   | 4.0方案编写者，多主题友链抓取适配，服务器部署方案编写者，友链朋友圈现维护者 |
| 林木木   | https://immmmm.com/        | 新版友链朋友圈前端方案编写者                                 |
| Fox      | https://foolishfox.cn/     | 提供sql api与sql存储本地化方案                               |

个人编写的 [fcircle-beta.js](https://fastly.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-beta.js) 源自 [fetch.js](https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fetch.js) 和 [fcircle.js](https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fcircle.js)，从最初的简单合并实现了“第一次打开即能显示相应内容”，之后一天天的 commit 几乎是逼着强力后端 [@贰猹](https://noionion.top/) 做了一个全新的 API，实现了很多全新的交互。

### 前端交互说明

#### 点击「订阅」，随机显示博客卡片

![cf-beta-5](https://r2.immmmm.com/2022/02/cf-beta-5.gif)

#### 点击「活跃」，切换公共库和个人库

![cf-beta-6](https://r2.immmmm.com/2022/02/cf-beta-6.gif)

#### 点击头像，随机此博客卡片

![cf-beta-7](https://r2.immmmm.com/2022/02/cf-beta-7.gif)

#### 点击「日志」，清空本地缓存数据。

更新后端后使用。

###  CSS 样式命名说明

[fcircle-beta.css](https://fastly.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/fcircle-beta.css) 统一命名格式，以 `cf-` 做标识。