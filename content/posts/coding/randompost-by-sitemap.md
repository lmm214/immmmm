---
title: "利用 SiteMap 随机访问站内页面"
date: 2022-08-10T12:02:31+0800
tags: [折腾]
---

看到 [@HEO](https://blog.zhheo.com/p/c116857c.html) 和 [@Leonus](https://blog.leonus.cn/2022/randomPost.html) 都发了一篇关于此主题的。试了后，采用了后者实现的方法，直接简易。点点 menu 的 🎲 图标即可体验。

具体实现思路是，直接前端解析 [sitemap.xml](https://immmmm.com/sitemap.xml) ，随机获取一个 `url loc` 链接，同时增加了判断，若不小心取到以下链接（首页、标签页、分类页等，采用 `.split('/')[3]` 取主域名 / 后的字符为判断依据），则再循环取一个。

```html
<loc>https://immmmm.com/</loc>
<loc>https://immmmm.com/tags/</loc>
```

<!--more-->

相关 JavaScript 代码：

```JavaScript
function randomPost() {
    fetch('/sitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        let locationHref,locSplit;
        do {
            locationHref = ls[Math.floor(Math.random() * ls.length)].innerHTML
            locSplit = locationHref.split('/')[3] || ''
        } while (locSplit == '' || locSplit == 'tags');
        //若所有文章都如 https://…….com/posts/2022/07/…… 格式，主域名后字符是 posts，则循环条件改为：
        //while (locSplit !== 'posts');
        location.href = locationHref
    })
}
```

当然，若所有文章都如 `https://…….com/posts/2022/07/……` 格式，主域名后字符是 `posts`，则循环条件改为：`while (locSplit !== 'posts');`

再找个地方丢 html 代码：

```html
<a href="javascript:;" onclick="randomPost()" title="随机访问一篇文章">随机</a>
```