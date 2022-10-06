---
title: "哔哔点啥 By Memos"
date: 2022-10-05T22:46:43+0800
tags: [折腾]
feature: https://cdn.edui.fun/images/2022/10/bb-by-memos.jpg
---

在线围观：<https://immmmm.com/bb/>

「哔哔点啥」“溯源”一下，可能是少数派的 [「b言b语」](https://sspai.com/post/60024) ，由于 LeanCloud 的拉胯，自己搞定了腾讯 CloudBase 和 [微信公众号2.0 ](https://immmmm.com/bb-by-wechat-pro/) ，但 TCB 好好的羊毛不给薅了，哎。

之后，自己用 Twikoo 评论系统魔改了一下样式，搞了一个 [「你言我语 By Twikoo」](https://immmmm.com/talk/) ，单页用用还行。但，没有 API 调用不方便，随手发碎碎念也不香。

<!--more-->

现在，有了这货 Memos <https://usememos.com/> ，终于舒坦！

- 首页头部 API 调用 json 轮播；
- iOS 快捷发碎碎念；
- 单页分页显示；

### 单页部署代码

```html
<div id="bber"></div>
<script type="text/javascript">
  var bbMemos = {
    memos : 'https://me.edui.fun/',//修改为自己的 apiurl，末尾有 / 斜杠
    limit : '',//默认每次显示 10条 
    creatorId:'' ,//默认为 101用户 https://demo.usememos.com/u/101
    domId: '',//默认为 <div id="bber"></div>
  }
</script>
<script src="https://fastly.jsdelivr.net/gh/lmm214/immmmm/themes/hello-friend/static/bb-lmm-20221006.js"></script>
<script src="https://fastly.jsdelivr.net/gh/Tokinx/ViewImage/view-image.min.js"></script>
<script src="https://fastly.jsdelivr.net/gh/Tokinx/Lately/lately.min.js"></script>
```

样式代码供参考：

```css
#bber{margin-top:1em;}
.timeline ul {margin:0;}
.timeline ul li {background:#3b3d42;list-style-type:none;position:relative;width:3px;margin-left:1em;padding:0.8em 0 2em;}
.timeline ul li::after {transform: rotate(45deg);content:'';background-color: #3b3d42;display: block;position: absolute;top: 10px;left: -5px;width: 0.8em;height: 0.8em;outline:15px solid #fff;}
.timeline ul li div {position:relative;top:-13px;left:1em;width:670px;padding:0px 16px 0px;}
.timeline ul li p.datatime{color: #fafafa;font-size: 0.75em;font-style: italic;background-color: #3b3d42;display: inline-block;padding:0.25em 1em 0.2em 1em;}
.timeline ul li p.datacont{white-space: pre-wrap;margin:0.65em 0 0.3em;}
.timeline ul li p.datacont img{display:block;max-height:340px !important;}
.timeline ul li p.datacont img[src*="emotion"]{display:inline-block;width:auto;}
.timeline ul li p.datafrom{color: #aaa;font-size: 0.75em !important;font-style: italic;}
.timeline ul li p{margin:0;font-size:16px;letter-spacing:1px;color: #3b3d42;}
.timeline ul li p.datacont .img{cursor: pointer;border:1px solid #3b3d42;max-width:20rem;margin:6px 0 6px 0;}
button{border-radius:0;}
.dark-theme .timeline ul li div p{color:#fafafa;}
.dark-theme .timeline ul li div p svg{fill:#fafafa;}
.dark-theme .timeline ul li p.datafrom{color: #aaa;}
.dark-theme .timeline ul li{background:#3b3d42;}
.dark-theme .timeline ul li::after{outline: 15px solid #2f2f2f;}
@media (max-width:860px) {
  .timeline ul li{margin-left:0;}
  .timeline ul li div{width:calc(100vw - 75px);left:30px;}
}
```