---
date: 2018-01-30
title: '基于 LeanCloud 实现文章点赞'
tags: [折腾]
published: true
hideInList: false
isTop: false
---


<p class="md_block" style="text-align:center;"><img class="md_compiled" src="https://pic.edui.fun/images/2018/01/zan.gif" alt="zan.gif"></p>

### LeanCloud

1、[注册 LeanCloud](http://leancloud.cn/login.html?refuser=lmm214#/signup) ，创建应用，创建 Class（相当数据库），权限改为“无限制”。

![zan-1.png](https://pic.edui.fun/images/2018/01/zan-1.png)

<!--more-->

2、获取应用 ID 和 Key

![zan-2.png](https://pic.edui.fun/images/2018/01/zan-2.png)

3、设置安全域名

![zan-3.png](https://pic.edui.fun/images/2018/01/zan-3.png)

### Bitcron

1、下载压缩包（有3文件：zan.scss zan.js zan.png），丢 `template` 内：[include_180130.zip](https://pic.edui.fun/images/2018/01/include_180130.zip)


2、`post.jade` 里找个地插入：

```jade
+h.load("//cdn1.lncld.net/static/js/3.5.0/av-min.js","/template/include/zan.scss","/template/include/zan.js")
```

3、修改 `zan.js` 里的 appId 和 appKey；修改第 25 行，文章样式 `.post-content` 需自行匹配：

```javascript
$(".post-content").append("<div id='zan' class='clearfix'><div class='heart' onclick=\"goodplus('"+url+"')\"><p id='zan_text'></p></div></div>");
```

### 结语

首先，感谢 @Willin Wang 推荐 LeanCloud 平台，之前的 Coding.net 的动态页面太卡，严重影响页面打开速度！

看了一下午 LeanCloud 的开发文档，点赞真是屈才这货啦，还有牛人基于这货开发了静态博客 的评论系统 [Valine](https://github.com/xcss/Valine) !

