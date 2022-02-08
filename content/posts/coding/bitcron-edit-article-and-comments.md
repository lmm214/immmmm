---
date: 2017-12-16
title: '即时编辑 Bitcron 文章和评论'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

Bitcron 后台是有个“文件管理器”的功能，完全可依此在 WEB 端管理自己的博客。偶尔想修改下文章内的错别字或删除个垃圾评论，会手动输入 [https://us.bitcron.com/](https://us.bitcron.com/) ，然后进入相应的文件里进行修改。

其实，直接访问以下链接同样可以

https://us.bitcron.com/service/files_manager?site_id=站点ID.bitcron.com#pages/文件名.md
https://us.bitcron.com/service/files_manager?site_id=站点ID.bitcron.com#_comments/pages/文件名.csv

<!--more-->

So，显示在文章里：

<figure>
    <img src="https://pic.edui.fun/images/2017/12/edit-1.png" />
    <img src="https://pic.edui.fun/images/2017/12/edit-2.png" />
</figure>

那下面就码上如何把这样的链接在文章里显示：

1、首先，访问类似 [https://immmmm.com/login](https://immmmm.com/login) 登录一下

2、`post.jade` 

加上如下代码，位置嘛，一般加在文章标题下或文章内容后

```jade
if account.is_admin
    p.admin: a(href="https://us.bitcron.com/service/files_manager?site_id="+site.id+"#"+post.path) [编辑日志]
```

编辑文章就这样搞定啦！下面是编辑评论代码

```jade
if account.is_admin
	p.comments_admin.admin: a(href="https://us.bitcron.com/service/files_manager?site_id="+site.id+"#_comments/"+post.path.split('.')[-2]+".csv") [编辑评论]
```