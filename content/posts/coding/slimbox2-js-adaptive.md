---
date: 2014-04-19
title: 'Slimbox2.js 图片灯箱自适应'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

Github： [slimbox2-lite](https://github.com/lmm214/slimbox2-lite)

很久很久以前（喂，喂喂），很早很早以前（嘿！），好吧。以前发现只有几KB的图片灯箱特效 slimbox2 就瞬间被它征服了，不过这娃一直有个硬伤：

图片多大灯箱显示出来的图片就有多大。就是说，一旦图片比较大比如1800*1200，显示器只有1280*800，那真是赤果果扑面而来啊！

虽然带着这个硬伤，还是把它作为哥发布的主题的标配！昨 @小黑黑 再一次向我反馈了这个情况，一下决心操起编辑器开试。吼，花了个把小时把 js 从头到尾读了N遍后，顺利搞定！修改部分如下：

<!--more-->

```javascript
function animateBox() {
	center.className = "";
	//Slimbox2 图片灯箱自适应 By ImMmMm.com
	//CSS 内新增 background-size":"100%"，之后增加对浏览器宽、高和图片宽、高判断。
	$(image).css({backgroundImage: "url(" + activeURL + ")", visibility: "hidden", display: "","background-size":"100%"});
	var p_w = preload.width,p_h = preload.height,w_w = win.width(),w_h = win.height();
	if (p_w >= w_w || p_h >= w_h){
		if ( w_w >= w_h ){
			$(sizer).width(w_h*0.8*p_w/p_h);
			$([sizer, prevLink, nextLink]).height(w_h*0.8);
		}else{
			$(sizer).width(w_w*0.8);
			$([sizer, prevLink, nextLink]).height(w_w*0.8*p_h/p_w);
		}			
	}else{
		$(sizer).width(preload.width);
		$([sizer, prevLink, nextLink]).height(preload.height);
	}
	//End
```

主要思路是图片宽度或高度超出浏览器时：图片宽度大于高度（横图），以浏览器高度80%作为图片高度，宽度等比缩小；竖图，反之处理。

不容易遇到个需求点而且顺利解决，话不免多了起开，哈哈～