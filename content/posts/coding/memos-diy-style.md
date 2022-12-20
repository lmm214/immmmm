---
title: "Memos 自定义样式代码片段"
date: 2022-11-13T17:03:00+0800
tags: [折腾]
feature: https://cdn.edui.fun/images/2022/11/TinySnap-2022-11-13-17.06.28.png
---

Memos v0.7.2 支持了自定义 css 代码片段，折腾几句分享如下：

<!--more-->

2022-12-20 更新 Memos v8.0 样式代码。

```css
body{font-family:"LXGW WenKai";}
.memo-list-container .status-text.public,.username-container .tag{display:none;}
.memo-content-text .tag-span,.memo-content-text .link{color:rgb(22,163,74) !important}
.memo-content-wrapper .memo-content-text blockquote{font-family:KaiTi,STKaiti,STFangsong;margin:0 0 0 1rem;padding:.25rem 2rem;position:relative;border-left:0 none;}
.memo-content-wrapper .memo-content-text blockquote::before{line-height:2rem;content:"“";font-family:Georgia,serif;font-size:28px;font-weight:bold;position:absolute;left:-10px;top:5px;}
```