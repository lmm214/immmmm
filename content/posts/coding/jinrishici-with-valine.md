---
title: '今日诗词 & Valine'
date: 2020-01-30
tags: [折腾]
published: true
hideInList: false
feature: 
isTop: false
---

[今日诗词](https://www.jinrishici.com/)：一个可以随机返回一句古诗词名句的接口，宅到用来做 Valine 的 placeholder 显示内容……

![今日诗词 and Valine](https://pic.edui.fun/images/2020/01/jinrishici.png)

<!--more-->

```js
<script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
<script type="text/javascript">
jinrishici.load(function(result) {
	var jrsc_plac =  result.data.content + "\n「" + result.data.origin.title + "」" + result.data.origin.dynasty + " · " + result.data.origin.author
	document.getElementById("veditor").setAttribute("placeholder",jrsc_plac);
});
</script>
```
