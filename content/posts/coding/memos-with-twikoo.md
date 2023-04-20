---
title: "Memos x Twikoo"
date: 2023-04-20T23:38:20+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/04/memos-twikoo.png
---

欢迎在线围观：<https://me.edui.fun/m/1531>

受 [@Damon](https://hanyu.cool/) 启发，给 Memos 增加了 Twikoo 评论。不过与之不同的是集成到自己的「自定义脚本」里。

<!--more-->

### 自定义脚本

```
//添加 twikoo 评论  v2023.04.20
var twikooENV = 'https://tk.edui.fun/'
function addTwikooJS() { 
    var memosTwikoo = document.createElement("script");
    memosTwikoo.src = `https://cdn.staticfile.org/twikoo/1.6.8/twikoo.all.min.js`;
    var tws = document.getElementsByTagName("script")[0];
    tws.parentNode.insertBefore(memosTwikoo, tws);
};
function startTwikoo() {
	start = setInterval(function(){
		var twikooDom = document.getElementById('twikoo') || '';
		var memoTw = document.querySelector('.memo-container') || '';
		if(window.location.href.replace(/^.*\/(m)\/.*$/,'$1') == "m" && !twikooDom){
			addTwikooJS()
			if(memoTw){
				clearInterval(start)
				memoTw.insertAdjacentHTML('afterend', '<div id="mtcomment"></div>');
				setTimeout(function() {
					twikoo.init({
					    envId: twikooENV,
					    el: '#mtcomment',
					    path: location.href,
					    onCommentLoaded: function () {
					      //console.log('评论加载完成');
					      startTwikoo()
					    }
					})
				}, 1000)
			}
		}
		//console.log(window.location.href);
	}, 1000)
}
startTwikoo();
```

### 自定义样式

```
#twikoo{padding: 1rem;background-color: rgb(63,63,70);margin: 1rem 0;border-radius: .5rem;color: #fff !important;}
```

真是新奇的体验～