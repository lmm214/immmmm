---
date: 2017-07-25
title: '识别外链并新窗口打开'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

注：已对类似 toc 里的链接进行排除。

markdown 语法链接不支持设置 `target='_blank'` ，如果要就直接写 html 的链接代码。个人来说，非常反习惯！

既然 Bitcron 加载了 jQuery ，那就重操旧业来个自动识别内外链！代码如下：

```jade
	script
		$(document).ready (function() {
			var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
			var location_href = window.location.href.replace(parse_url,'$3')
			$('.post-content a:not(:has(img)),.author-name a').hover(function() {
				var this_href = $(this).attr('href');
				var replace_href = this_href.replace(parse_url,'$3');
                if ( this_href != replace_href && location_href != replace_href)
					$(this).attr('target','_blank'); 
			});
		});
```

一般放 `post.jade`里，直接放 `base.jade` 也行。其中 `.post-content` 和 `.author-name` 有可能需要匹配自己的主题模板。

短短代码测试了个把小时，主要耗在“a标签里无img”和“本地和点击的href的正则”，哎，果真代码欺负老新人！

<!--more-->

### 测试

[外链（新窗口打开）](https://pic.edui.fun/wx.jpg) [内链（直接打开）](https://immmmm.com/new-tab-external-link)
```markdown
[外链](https://pic.edui.fun/wx.jpg)
[内链](https://immmmm.com/new-tab-external-link)
```

<a href="https://pic.edui.fun/wx.jpg"><img src="https://pic.edui.fun/wx.jpg"></a>
图片有链接不识别（直接打开）
```html
<a href="https://pic.edui.fun/wx.jpg"><img src="https://pic.edui.fun/wx.jpg"></a>
```

### 更新

2017/7/26：更新正则代码 [来源](http://harttle.com/2016/02/23/javascript-regular-expressions.html)，`$0~$7` 依次获取以下内容：
```html
url:    http://harttle.com:80/tags.html?simple=true#HTML
scheme: http
slash:  //
host:   harttle.com
port:   80
path:   tags.html
query:  single=true
hash:   HTML
```
2017/7/29: 把 `click` 改为 `hover`，消除点击跳转时地址栏显示问题。

2017/8/8：新增对类似 toc 导航 #开头的链接处理，即 `this_href != replace_href`