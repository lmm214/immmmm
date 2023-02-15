---
title: "自制「单向历」网页版"
date: 2022-01-09T21:38:56+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/01/dxl.png
---

在线体验：<https://edui123.com/rili/>

Github 上找到一个 PHP 版的 [calendar_api](https://github.com/zzzhxxx/calendar_api)，调用非常方便。可为了一个 API 开个 PHP 也是够过分，其实也就为了解决两个问题：

1. 自动更新日期
2. 绕过 Referer 验证

<!--more-->
顺利访问以下图片地址：

> https://img.owspace.com/Public/uploads/Download/2022/0109.jpg

寻思，直接 JavaScript 不香吗？

完整代码直接右键查看页面源码即可，说明两点：更新日期 js 大法，Referer 头部加一句搞定。

```javascript
window.onload=function(){getDate()}
function getDate(){
  var d=new Date(),y=d.getFullYear(),m=d.getMonth()+1,n=d.getDate();
  m=m>9?m:"0"+m;n=n>9?n:"0"+n;
  var img= "<img  src='https://img.owspace.com/Public/uploads/Download/"+y+"/"+m+n+".jpg'>"
  document.getElementById("rili").innerHTML=img
}
```

```html
<meta name="referrer" content="same-origin">
```

当然，API 的好处是方便调用，不用又是加 html 又是加 js 的，直接图片 src 调用地址即可：

```html
<img  src="https://www.aigeek.top/api/rili.php">
<img  src="https://immmmm.com/api/rili.php">
```