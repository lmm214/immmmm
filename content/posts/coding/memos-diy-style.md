---
title: "Memos 自定义样式代码片段"
date: 2022-11-13T17:03:00+0800
tags: [折腾]
feature: https://cdn.edui.fun/images/2022/11/TinySnap-2022-11-13-17.06.28.png
---

Memos v0.7.2 支持了自定义 css 代码片段，折腾几句分享如下：

<!--more-->

```css
/*隐藏每条可见状态标签*/
.user-banner-container>.username-container>.tag,.memo-wrapper>.memo-top-wrapper>.status-text-container>.status-text.public,.page-header .title-text{display:none;}
/*隐藏昵称后面的 mod 字符*/
.page-header .title-text{display:none;}
/*隐藏 大于10行的标签 By eallion*/
.tags-wrapper>.tags-container .tag-item-container:nth-child(1n+11) {display: none !important;}
/*隐藏发布权限设置*/
.memo-editor-container>.editor-header-container>.visibility-selector{display:none;}

/*统一标签、链接颜色为绿色*/
.memo-content-wrapper>.memo-content-text .tag-span,.memo-content-wrapper>.memo-content-text .link{color:rgb(22,163,74)}

/*修改 blockquote 为单引号*/
.memo-content-wrapper>.memo-content-text blockquote{font-family:KaiTi,STKaiti,STFangsong;margin:0 0 0 1rem;padding:.25rem 2rem;position:relative;border-left:0 none;}
.memo-content-wrapper>.memo-content-text blockquote::before{line-height:2rem;content:"“";font-family:Georgia,serif;font-size:28px;font-weight:bold;position:absolute;left:10px;top:5px;}

/*开启暗黑模式*/
@media (prefers-color-scheme: dark) {
    body{filter: invert(90%) hue-rotate(180deg);}
    img,.icon,.mr-1,video,div[class*="language-"] {filter: invert(110%) hue-rotate(180deg);opacity: .8;}
    .memo-editor-container>.common-tools-wrapper>.btns-container>.confirm-btn{color:#000;}
}
```