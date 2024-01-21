---
title: "哔哔点啥 3.0 By Memos"
date: 2024-01-15T23:30:45+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/01/bbv3.png.webp
---

鼓起劲头肝了一个周末，终于切换到 [@归臧](https://nuoea.com/) 的 Memos 样式和功能 [（点我围观）](https://memobbs.app/) 。

折腾的核心动力是其：颜值在线！

其次，功能齐全，集个人与广场模式，内置发布框，登录后编辑、归档、删除，前台一条龙～

<!--more-->

### 欢迎加入

直接 PR [memos.json](https://github.com/lmm214/memobbs/blob/main/memos.json) 这个文件即可～

### 功能列表

- 点击右上角 `信号塔` 切换为广场模式，默认展示 `memos.json` 第一个；
- 点击右上角 `车车` 随机显示一个个人页面；
- 点击右上角 `放大镜·，个人页面搜索个人内容，广场模式全搜索；
- 点击不同朋友，顶部头像、昵称同步切换；
- 点击标签，可筛选查看；
- 支持豆瓣影音解析，采用 neodb api ；
- 支持点击顶部左侧头像位置，显示 Memos 发布框；
- 支持点选 emoji ，新增多个实用快捷输入按钮；
- 支持对自己的 memo 编辑、归档、删除，包括随机显示的；
- 支持 twikoo、artalk 评论数调取，仅个人页面；
- 更多内容客观细品，小弟修 Bug 中。

### 折腾说明

### 主题集成

#### HTML

```
<div id="memos"></div>
<div id="memo-list"></div>
```

#### CSS

```
<link rel="stylesheet" href="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.css">
<link rel="stylesheet" href="https://cdn.staticfile.org/animate.css/4.1.1/animate.min.css">
<link rel="stylesheet" href="https://cdn.staticfile.org/artalk/2.7.3/ArtalkLite.css">
<link rel="stylesheet" href="https://memobbs.app/grid.css">
<link rel="stylesheet" href="https://memobbs.app/memos.css">
```

#### JS

```
<script type="text/javascript">
  var memosJson = {
    url : "https://memobbs.app/memos.json"
  }
  var memosMyList = [
    {
      "creatorName" : "林木木",
      "website" : "https://immmmm.com",
      "link" : "https://me.edui.fun",
      "creatorId" : "101",
      "avatar" : "https://cravatar.cn/avatar/ba83fa02fc4b2ba621514941307e21be?s=80",
      "twikoo" : "https://metk.edui.fun"
    },
    {
      "creatorName" : "koobai",
      "website" : "https://koobai.com",
      "link" : "https://memos.koobai.com",
      "creatorId" : "1",
      "avatar" : "https://cravatar.cn/avatar/3b3d336a7d389b7ae8531cbe177ae9b7?s=80",
      "artalk" : "https://c.koobai.com",
      "artSite" : "空白唠叨"
    },{
      "creatorName": "Elizen",
      "website" : "https://elizen.me",
      "link" : "https://memos.elizen.me",
      "creatorId" : "101",
      "twikoo" : "https://pl.elizen.me",
      "avatar": "https://cravatar.cn/avatar/f65df4d87240feb1cb247857a621a48f?s=80"
    }
  ]
</script>
```

```
<script src="https://cdn.staticfile.org/twikoo/1.6.29/twikoo.min.js"></script>
<script src="https://cdn.staticfile.org/artalk/2.7.3/ArtalkLite.js"></script>
<script src="https://cdn.staticfile.org/marked/7.0.5/marked.min.js"></script>
<script src="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.js"></script>
<script src="https://cdn.staticfile.org/meting/2.0.1/Meting.min.js"></script>
<script src="https://cdn.staticfile.org/lozad.js/1.16.0/lozad.min.js"></script>
<script src="https://memobbs.app/memos.js"></script>
```

### 关注列表加载逻辑

#### 荐：二合一

⭐️⭐️⭐️⭐️⭐️ 这样自己就不用维护基本库啦，省心省力，而且会自动合并去重。

#### 其一，HTML 页面内添加内容

见上方 JS 代码部分，修改 `memosMyList` 第一条信息为自己的，就可以啦～

#### 其二，memos.json 文件管理

可远程或本地加载，是二选一 `if...else` 的关系。

- 个人维护列表：`https://memobbs.app/memos.json`
- 本地路径 `/memos.json`

下载 [memos.json](https://memobbs.app/memos.json)，编辑第一条为自己的信息（先搜索一下，有的话前移到第一条），然后丢入 （注：Hugo 是把这个 json 文件丢入到 `static/memos/` 内。）