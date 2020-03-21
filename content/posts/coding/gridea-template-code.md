---
title: 'Gridea 主题常用代码片段'
date: 2019-12-16
tags: [折腾]
published: true
hideInList: false
feature: 
isTop: false
---
### 全站 Site

首页：`themeConfig.domain`
站点名：`themeConfig.siteName`
站点描述：`themeConfig.siteDescription`
全站文章数：`site.posts.length`
全站标签数：`site.tags.length`

<!--more-->

```js
共 <%= site.posts.length %> 篇日志
```

### 菜单

```js
<% menus.forEach(function(menu) { %>
    <a href="<%= menu.link %>"><%= menu.name %></a>
<% }); %>
```

### 网页标题优化 siteTitle

```js
<%- include('./includes/head', { siteTitle: themeConfig.siteName }) %>
<%- include('./includes/head', { siteTitle: `${post.title} | ${themeConfig.siteName}` }) %>
<%- include('./includes/head', { siteTitle: `${tag.name} | ${themeConfig.siteName}` }) %>
<%- include('./includes/head', { siteTitle: `文章归档 | ${themeConfig.siteName}` }) %>
<%- include('./includes/head', { siteTitle: `标签列表 | ${themeConfig.siteName}` }) %>
```

### 文章 Post

标题：`post.title`
链接：`post.link`

文章标题：
```js
<a href="<%= post.link %>"><%= post.title %></a>
```

文章SEO

```html
<meta name="description" content="<%- post.description %>" />
<meta name="keywords" content="<%- post.tags.map(tag => tag.name).join(',') %>" />
```

发布时间：`post.dateFormat`
显示相对时间：

```js
<%= site.utils.moment(post.date).locale('zh-cn').fromNow() %>
```

标签名：`post.tags`
文章阅读时间：`stats.text` //3 min read
文章字数：`stats.words` //3000

显示全部标签名，多个用顿号分开：
```js
<% post.tags.forEach(function(tag, index) { %>
    <a href="<%= tag.link %>">
        <%= tag.name %>
        <% if (index !== post.tags.length - 1) { %>
            、
        <% } %>
    </a>
<% }); %>
```

显示单个标签名：
```js
<% if (post.tags[0]) { %>
    <a href="<%= post.tags[0].link %>"><%= post.tags[0].name %></a>
<% }; %>
```

封面图：`post.feature`
```js
<% if (themeConfig.showFeatureImage && post.feature) { %>
    <img src="<%= post.feature %>">
<% } %>
```

文章摘要：`post.abstract` 显示文章 `<!--more-->` 前的内容
文章全文：`post.content`

```js
<% if (post.abstract) { %>
    <%- post.abstract %>
    <a href="<%= post.link %>">阅读全文</a>
<% }else{ %>
    <%- post.content %>
    <a href="<%= post.link %>#comments">发表评论</a>
<% } %>
```
结合以上两者，如果有设置more标签，则显示部分和“阅读全文”链接，若无则全文显示并显示“发表评论”链接。

### 导航 Pagination

上下篇日志：
```js
<% if (post.prevPost) { %>
    <a href="<%= post.prevPost.link %>"><%= post.prevPost.title %></a>
<% } %>
<% if (post.nextPost) { %>
    <a href="<%= post.nextPost.link %>"><%= post.nextPost.title %></a>
<% } %>
```

文章列表：
```js
<% if (pagination.prev) { %>
    <a href="<%= pagination.prev %>">上一页</a>
<% } %>
<% if (pagination.next) { %>
    <a href="<%= pagination.next %>">下一页</a>
<% } %>
```

### 提速优化

添加 <https://instant.page/> 代码：

```js
<script src="//instant.page/3.0.0" type="module" defer integrity="sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"></script>
```

首页、日志页 `<head></head>` 内分别添加 prefetch 预加载：

`index.ejs`
```js
<% if (pagination.prev) { %>
    <link rel="prefetch" href="<%= pagination.prev %>">
<% } %>
<% if (pagination.next) { %>
    <link rel="prefetch" href="<%= pagination.next %>">
<% } %>
```

`post.ejs`
```js
<% if (post.prevPost) { %>
    <link rel="prefetch" href="<%= post.prevPost.link %>">
<% } %>
<% if (post.nextPost) { %>
    <link rel="prefetch" href="<%= post.nextPost.link %>">
<% } %>
```

### 实用 jQuery 代码

```js
//新窗口打开外链
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var location_href = window.location.href.replace(parse_url,'$3');
$('.post-excerpt a:not(:has(img)),.post-content a:not(:has(img)),.author-name a').hover(function() {
    var this_href = $(this).attr('href');
    var replace_href = this_href.replace(parse_url,'$3');
    if ( this_href != replace_href && location_href != replace_href){$(this).attr('target','_blank');}
});
```





