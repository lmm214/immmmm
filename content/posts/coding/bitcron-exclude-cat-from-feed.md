---
date: 2018-08-03
title: 'Bitcron 在 Feed 里排除某个分类'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

无视了文档的 `status: false` ，直接在 feed 中更新，大 BUG 啊！

官方文档 [feed.jade](https://api.bitcron.com/read/builtin-codes-files#toc_0) 中是获取最近 10 篇文章：

```jade
feed_posts = posts.recent_10
```

要想排除某个分类，其实也就是 **某个文件夹**，只要在这里改动。经过超出预习的测试，暂且改为：

<!--more-->

```jade
d.get_data(type='post+folder',status='public',excludes=['chat','photos','images','pages','_','template','configs'],limit=10,sort='desc')
```

其实文档里 `get_data` 有个 `path` 参数：

> path	默认为`/`(相当于站点根目录), 限定查询数据的路径，比如 `path='docs/'` , 则表示仅查询docs/这个目录下的数据。

可是我的各个分类文件夹直接在根目录，而这个 path 参数只能限定 **1个** 路劲，想多个这样写 `path=['coding','reading']` 是无效的，逆行却爆出 bug 一堆……

完整代码如下，另存为 `feed.jade` 丢入主题 `template` 文件夹即可：

```jade
doctype xml
+set_content_type('application/xml')
feed(xmlns="http://www.w3.org/2005/Atom")
    title= site.title
    link(href="https://{{ request.host }}/")
    link(ref="self", href="https://{{ request.host }}/feed")
    id= site._id
    feed_posts = d.get_data(type='post+folder', excludes=['chat','photos','images','pages','_','template','configs'],limit=10,sort='desc')
    if feed_posts
        updated= feed_posts[0]['date'].strftime('%Y-%m-%dT%H:%M:%SZ')
    for post in feed_posts
        entry
            post_url = 'https://' + request.host + post.url.escaped
            title= post.title.escaped
            link(href=post_url, rel="alternate")
            updated= post.date.strftime('%Y-%m-%dT%H:%M:%SZ')
            id= post.url_path.escaped
            author
                name= site.configs.admin_name
            summary(type="html")= post.content.escaped
```