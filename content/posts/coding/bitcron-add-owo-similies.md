---
date: 2017-12-17
title: '给 Bitcron 评论添加 OwO 表情'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

<figure>
    <img src="https://pic.edui.fun/images/2017/12/owo-1.png" />
    <figcaption>OwO 表情</figcaption>
</figure>

<!--more-->

1.下载：[template.zip](https://pic.edui.fun/images/2017/12/template.zip)，解压丢至主题文件夹内。


2.在 `post.jade` 文件中 `+post.comments_as_html()` 下添加以下代码：

```jade
div#OwO
	+h.load("/template/OwO/OwO.min.css","/template/OwO/OwO.min.js")
	div.OwO
script
    $(document).ready (function(){$('.new_comment').append($('.OwO'))});
	var OwO_demo = new OwO({
		logo: 'OωO表情',
		container: document.getElementsByClassName('OwO')[0],
		target: document.getElementsByClassName('textarea_box')[0],
		api: './template/OwO/OwO.json',
        width:"80%"
	});
```

是的，又用 jQuery 的 append 来了个移花接木~

3.`OwO.json` 是支持自定义添加栏目图片的，一个示例： [OwO.json](https://raw.githubusercontent.com/iTanken/FrontProjects/master/OwO/data/OwO.json)

聊胜于无，自娱自乐。 💊


注：原项目地址： [https://github.com/DIYgod/OwO](https://github.com/DIYgod/OwO)