---
date: 2017-12-26
title: 'Bitcron 显示相对时间'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

已更新下面这货！ 

[Lately.js](https://tokinx.github.io/lately/)：基于jQuery ，仅 800 字节却强大、好用的'Timeago'插件。

逻辑：年月相同继续（否，显示“常规日期”），日相同继续（否，显示“发布于几天前”），小时相同继续（否，显示“发布于几小时前”），分相同显示“刚刚发布”（否，显示“发布于几分钟前”）

BUG也明显，不能跨月，跨了如12月31日23时59秒发的文，1月1日00时01分来看也是显示常规的。找不到时间戳的api及计算，只想到用这个笨办法。

代码如下：

<!--more-->

```jade
- var now_ym = site.now.format('%y%m').int
- var now_d = site.now.format('%d').int
- var now_H = site.now.format('%H').int
- var now_M = site.now.format('%M').int
- var post_ym = post.date.format('%y%m').int
- var post_d = post.date.format('%d').int
- var post_H = post.date.format('%H').int
- var post_M = post.date.format('%M').int

if now_ym == post_ym
	if now_d == post_d
		if now_H == post_H
			if now_M == post_M
				- var re_date = "刚刚发布"
			else
				- var re_date = "发布于 " + now_M -  post_M + " 分钟前"
		else
			- var re_date = "发布于 " + now_H -  post_H + " 小时前"
	else
		- var re_date = "发布于 " + now_d -  post_d + " 天前"
else
	- var re_date = post.date.format('%m月 %d日，%Y')
```