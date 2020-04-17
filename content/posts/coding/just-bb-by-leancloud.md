---
title: "废话胶囊，值得拥有"
date: 2020-04-17T18:24:01+0800
tags: [折腾]
---

刷 [@Elizen](https://elizen.me/) 的知识星球，得知还有人折腾了这货 [无点赞评论版微博b言b语](https://sspai.com/post/60024)，原来是基于 LeanCloud 来实现的，无比亲切。

这不，折腾折腾已整合到主题中（[这里](https://immmmm.com/bb/)）。另外，又学了几招。

前端用 `AppID`、`AppKey` 来展示，并把 `class` 的 create 、delete 、update 三项权限设置为「指定用户」，后端用 `MasterKey` 来更新，避免数据被更改。

<!--more-->

### 页面改动

原作者提供了 [index.html](https://github.com/daibor/nonsense.fun) 开箱即用，自己改成了 Hugo 版本 源码见 [bb.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/bb.html)，几处改动：

```html
<p v-show="count == 0">别急，加载呢……</p>
……
{{htmlUnescape "{{count}}" }}
……
{{htmlUnescape "{{item.attributes.time}}"}}
```

加了 loading 时的文字提示，源码输出 `{{}}`，避免 Hugo 语法冲突。

### 更新途径

原作者提供了 [iOS 快捷指令](https://www.icloud.com/shortcuts/3cfcbc36a6a24e0a8721bfeef8dfc6cf) 和 win下的 [Quicker 模板](https://getquicker.net/sharedaction?code=eeb80278-5f53-4b0d-d333-08d7e0dd26a9)。这里增加一个 VSCode 的 [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 插件更新方法。

新建一个 `.http` 或 `.rest` 为后缀的文件：

```
POST https://你的AppID前6位.api.lncldglobal.com/1.1/classes/content
X-LC-Id: 你的AppID
X-LC-Key: 你的MasterKey,master
Content-Type: application/json

{
    "content":"更新测试"
}
```

写好 `content` 内容后【右键--Send Request】或快捷键 【Cmd+Alt+R】发布。

为了能第一时间找到这个文件，安利 VSCode 的 [favorites](https://marketplace.visualstudio.com/items?itemName=howardzuo.vscode-favorites) 插件，一件收藏，随点随开。

### 一句后话

这功能让我回想起多年前WP的「一句话公告/状态」、「说说」页面，流逝的时光，不变的需求！周末愉快！