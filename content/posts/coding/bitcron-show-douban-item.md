---
date: 2018-01-01
title: 'Bitcron 文章内插入豆瓣条目'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

### 调取代码：

![show-douban](https://pic.edui.fun/images/2019/06/douban_id.jpg)

下载解压丢至 `template` 文件夹： [template_20190618.zip](https://pic.edui.fun/images/2019/06/template_20190618.zip)

`id` 是电影或书籍页面 https://movie.douban.com/subject/26862829/ 后面的数字 `26862829`  。

`type` 是 `movie` 或 `book`。
<!--more-->

### 效果如下：

```code
+h.show('douban',id='26862829',type='movie')
+h.show('douban',id='26790004',type='book')
```

### 源码直出

附上自适应样式代码：

```css
/* post-preview --------*/
.post-preview{
	max-width:780px;margin:1em auto;position:relative;display:flex;background:#fff;border-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,.25),0 0 1px rgba(0,0,0,.25);
	.post-preview--meta{
		width:75%;padding:25px;
		.post-preview--middle {line-height:28px;}
		.post-preview--title {
			font-size:18px;margin:0;
			a{text-decoration:none;}
		}
		.post-preview--date{font-size:14px;color:#999;}
	}
	.post-preview--excerpt{
		font-size:14px;line-height:1.825;
		p{margin-bottom:0;}
	}
	.post-preview--image {width:25%;float:right;background-size:cover;background-position:center center;border-top-right-radius: 2px;border-bottom-right-radius:2px;}
}
@media (max-width:550px) {
    .post-preview {
    	width:95%;
		.post-preview--image {width:40%;}
		.post-preview--meta {
			width: 60%;
			.post-preview--excerpt{display:none;}
		}
    }
}
```