---
date: 2017-12-20
title: 'Bitcron 一站搞定多主题预览'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

起源： [网站上适用不同自定义主题](https://pi.bitcron.com/post/wen-da/2017-12/2017-12-11-13-32-39#main)

>假设 /template/a/index.jade
>访问 http://yourdomain.com/?template_prefix=a, 会强制模板匹配的时候，访问前缀为 a 的目录路径。

什么意思？就是说我们可以把多个主题放到 template 的子文件夹里，比如 `a`子文件夹，然后在链接后加上参数 `?template_prefix=a` 就能用这个模板来渲染呈现主题啦！

所以，可以这样做:

```html
/template/a/
/template/b/
/template/c/
/template/d/
/template/e/
/template/f/
```

来半打子主题，然后用 js 加上参数就好啦~（ 注：template 目录下的总文件要低于 200）

<!--more-->

当然，思路是正确的，实现的时候还是会出现问题，经两个晚上，收了 @八口 三个大红包，终于实现需求！

### 取消隐藏日志前缀

dashboard-常规-隐藏日志前缀URL里设置成“否”

### 文章链接加参数

```javascript
var prefix = window.location.href.replace(/^.*prefix=(.*)$/,'$1') //获取到这个子文件夹名
$(document).ready (function() {
	$("body").on("click", '.site_nav a,a.prefix', function(){  //使用 on 绑定 click 点击事件，能实现滚动加载的也有效
		var this_href = $(this).attr('href').replace(/^(.*)\?template_prefix.*$/,'$1') //获取到原始最初链接
		var prefix_href = this_href +'?template_prefix='+prefix;  //加上参数
		$(this).attr('href',prefix_href);   //设置 href
  	});
});
```

### 搜索提交加参数

```javascript
var prefix = window.location.href.replace(/^.*prefix=(.*)$/,'$1') //获取到这个子文件夹名
$(document).ready (function() {
	var search_posts_dom = $('#search_posts_keywords');
	var search_posts = function(){
		var keywords = search_posts_dom.val();
		var url_to_jump = location.protocol + '//' + location.host + '/posts' + '?s=' + keywords + '&template_prefix='+prefix;  // /posts 看主题，尾巴 '&template_prefix='+prefix
		location.href = url_to_jump;
		return false
	};
	search_posts_dom.keyup(function(event) {
		if (event.which === 13) {search_posts()}
		return false;
	});
	$('.search_in_html_button').click(search_posts);
});
```