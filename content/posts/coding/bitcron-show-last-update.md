---
date: 2017-12-24
title: 'Bitcron 显示最后更新时间'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

>需求点：很多教程文章会多次修改，显示文章最后的修改时间，就显得非常有必要。效果图如下：

<figure>
    <img src="https://pic.edui.fun/images/2017/12/last-1.png" alt="" />
    <figcaption>显示最后更新时间</figcaption>
</figure>

利用了 `sys_date` 这属性，格式化为 `%Y%j`，其中 `%j` 表示一年中的第几天，所以 **判断发布与修改不是同一日** ，则显示。相关代码如下：

<!--more-->

```jade
if post.category.title == "coding"
	- var last_date = post.sys_date.format('%Y%j')
	- var post_date = post.date.format('%Y%j')
	if last_date != post_date
		p.last-update= "最后更新于：" + post.sys_date.format('%Y/%m/%d %H:%M:%S')
```

官方介绍： [https://api.bitcron.com/read/basefile](https://api.bitcron.com/read/basefile)

BUG 求助，如果我 11:59 分发布的，12:01分编辑更新了，照这个判断也是会显示的，那如果判断固定时间间隔呢？