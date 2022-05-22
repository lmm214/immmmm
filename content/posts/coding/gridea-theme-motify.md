---
title: 'Gridea Theme Motify'
date: 2020-03-13
tags: [折腾]
---

自用 N 年主题转制 Gridea 完成！

![Motify 20.03.13](https://pic.edui.fun/images/2020/03/motify-1.png)

仓库下载：<https://github.com/lmm214/gridea-theme-motify>

<!--more-->

<figure>
    <img src='https://pic.edui.fun/images/2020/03/motify-11.png' alt='' width="50%"/><img src='https://pic.edui.fun/images/2020/03/Motify.png' alt='' width="50%"/>
  <figcaption>Motify</figcaption>
</figure>

### 使用指南

- 特殊 chat 日志样式，建议先客户端添加一个【标签】，把 slug 设置为 `chat`，或自行修改模板内的判断；
- `Motify/assets/media/images/` 只放了4张图片 `reading.png`、`chat.png`、`coding.png`、`daily.png` 作为【归档页】的默认图标，需自行匹配或更换；
- 内置 `books.ejs`、`moives.ejs`、`friends.ejs` 模板，客户端主题自定义添加内容后，访问链接为 `https://你的域名/friends/` ;
- 远程到 Github 才支持 jsDelivr 加速；
- 日志图片瀑布流使用  `<photos></photos>` 包裹，且不换行才有效；
- 支持[《文章内显示豆瓣条目》](https://immmmm.com/post-show-douban-item/);

### 提速小记

![pageseed.png](https://pic.edui.fun/images/2020/03/pageseed.png)

- 给 img 加上 `loading='lazy'` 开启 chrome 延迟图片加载；
- 图片启用 webp 格式，又拍云加图片后缀 `!/format/webp` ，七牛云加 `` ；
- 字符图标文件托管到七牛云；
- @font-face 内加入 `font-display:swap`；
- 页脚添加 <https://instant.page/> ;

```js
<script src="//fastly.jsdelivr.net/npm/instant.page@3.0.0/instantpage.min.js" type="module"></script>
```

- 首页、日志页分别添加预加载 prefetch；

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

### 欢迎打赏

<figure class="center">
    <img src="https://pic.edui.fun/wx.jpg" alt="微信打赏" />
    <figcaption class="center">微信打赏</figcaption>
</figure>
