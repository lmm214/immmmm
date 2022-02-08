---
date: 2018-01-07
title: '添加文章点赞功能'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

[zan-by-leancloud-cn](zan-by-leancloud-cn)

**以下内容已弃用**

JS & SCSS 压缩包下载，一般丢至主题 `template` 内,然后在 `post.jade` 加载即可：

```jade
+h.load("/fb_static/lib/jquery.js","/template/include/zan.scss","/template/include/zan.js")
```

<!--more-->

### 修改要点

`zan.js` 第 25 行，文章样式 `.post-content` 需自行匹配

```javascript
$(".post-content").append("<div id='zan' class='clearfix'><div class='heart' onclick=\"goodplus('"+url+"')\"><p id='zan_text'></p></div></div>");
```

昨天看到一则消息说 [https://coding.net](https://coding.net/register?key=e2bafba4-2617-4969-bee8-ea6303b34155) 支持 **动态 Pages** 托管啦，其实也就是给你个免费的 PHP 空间和 MYSQL 数据库。官方仓库 WordPress 和 Typecho 一键 Fork 。

### 自建要点

立马想到前几天一直想折腾的“文章点赞功能”可以基于此来实现，原理思路比较明确： AJAX <--> PHP <--> MYSQL

如果要自建那就走以下过程，建好数据库 `good`，两个值 `id` 和 `value`，前者是网址，后者是点赞数。

![coding-3.png](https://pic.edui.fun/images/2018/01/coding-3.png)

不过在实现过程中，被 Coding 的 php pdo 虐得不要不要的！下图的 PHP 文件就是 动态Pages ，与 AJAX 配合即可读取和操作数据库的点赞数。

![coding-2.png](https://pic.edui.fun/images/2018/01/coding-php.png)

###  参考文章

- [php PDO tutorial with jQuery AJAX](https://programmerblog.net/php-pdo-ajax-tutorial-example/)
- [JavaScript+PHP+MySQL实现图片暗箱点赞功能](http://www.winotmk.com/2017/06/1278)

**欢迎折腾 & 猛击爱心！**