---
title: "哔哔点啥 3.0 By Memos"
date: 2024-01-15T23:30:45+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/01/bbv3.png.webp
---

鼓起劲头肝了一个周末，终于切换到 [@归臧](https://nuoea.com/) 的 Memos 样式和功能 [（点我围观）](https://immmmm.com/bb/) 。

折腾的核心动力是其：颜值在线！

其次，功能齐全，发布、编辑、规定、删除，前台一条龙～

<!--more-->

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

#### memos.json

下载 [memos.json](https://immmmm.com/memos/memos.json)，编辑第一条为自己的信息（先搜索一下，有的话前移到第一条），然后丢入本地路径 `../memos/memos.json` （注：Hugo 是把这个 json 文件丢入到 `static/memos/` 内。）

第一条为个人主页，之后的作为广场模式的加载列表：

```
{
    "myMemoList": [
        {
            "creatorName": "林木木",
            "website": "https://immmmm.com",
            "link": "https://me.edui.fun",
            "creatorId": "101",
            "avatar": "https://cravatar.cn/avatar/ba83fa02fc4b2ba621514941307e21be.jpeg?s=400",
            "twikoo": "https://metk.edui.fun"
        },
        {
            "creatorName": "归臧",
            "website": "https://nuoea.com/",
```

用这个 json 文件用来管理维护订阅列表，这样就不需要修改 js 文件。

#### 【可选】指定 memos.json 的 url

当然也支持指定 json 的加载 url，方便丢云上～

```
<script type="text/javascript">
  var memosJson = {
    url : "https://immmmm.com/memos/memos.json"
  }
</script>
```

#### HTML

```
<div id="memos"></div>
<div id="memo-list"></div>
```

#### CSS

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/artalk/2.7.3/ArtalkLite.css" rel="stylesheet">
<link rel="stylesheet" href="https://immmmm.com/memos/grid.css">
<link rel="stylesheet" href="https://immmmm.com/memos/memos.css">
```

#### JS

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/twikoo/1.6.29/twikoo.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/artalk/2.7.3/ArtalkLite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/7.0.5/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/meting/2.0.1/Meting.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js"></script>
<script src="https://immmmm.com/memos/memos.js"></script>
```

