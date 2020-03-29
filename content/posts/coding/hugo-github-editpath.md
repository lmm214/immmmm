---
title: '前端编辑 Hugo 文章'
date: '2020-03-29T23:15:00+08:00'
tags: [折腾]
---

目前发文是直接在 Github 前端进行，Hugo 的构建交给 [Github Actions](https://immmmm.com/hugo-github-actions/) 实现自动化部署。因此，产生个需求，文章里改个错别字什么的，能不能一键直达 GIthub 编辑页面？

```html
# 当面页面链接
https://immmmm.com/hugo-themes/
# Github 编辑页面链接
https://github.com/lmm214/immmmm/edit/master/content/posts/coding/hugo-themes.md
```

<!--more-->

想想是可行的，无非是根据当前文章的链接构建编辑页面的链接。直接放代码：

```html
<a href="https://github.com/lmm214/immmmm/edit/master/content/{{ replace .File.Path "\\" "/" }}" target="_blank">编辑文章</a>
```

为了页面美观，偷偷加到了某个地方。 ✌️