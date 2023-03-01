---
title: "哔哔点啥 By Memos"
date: 2022-10-05T22:46:43+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/10/immmmm-com-bb.webp
---

在线围观：<https://immmmm.com/bb/>

「哔哔点啥」“溯源”一下，可能是少数派的 [「b 言 b 语」](https://sspai.com/post/60024) ，由于 LeanCloud 的拉胯，自己搞定了腾讯 CloudBase 和 [微信公众号 2.0 ](https://immmmm.com/bb-by-wechat-pro/) ，但 TCB 好好的羊毛不给薅了，哎。

之后，自己用 Twikoo 评论系统魔改了一下样式，搞了一个 [「你言我语 By Twikoo」](https://immmmm.com/talk/) ，单页用用还行。但，没有 API 调用不方便，随手发碎碎念也不香。

<!--more-->

现在，有了这货 Memos <https://usememos.com/> ，完美的平替，不，高替！

- 首页头部 API 调用 json 轮播；
- iOS 快捷发碎碎念；
- 单页分页显示；

### 单页部署代码

已做 js 文件调用处理，找个页面丢入以下 html + js + css 即可。当然，得先部署个 [Memos](https://immmmm.com/hi-memos/)，或者，找个好朋友开个 id 也可以。

```html
<div id="bber"></div>
<script src="https://fastly.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://fastly.jsdelivr.net/gh/Tokinx/ViewImage/view-image.min.js"></script>
<script src="https://fastly.jsdelivr.net/gh/Tokinx/Lately/lately.min.js"></script>
<script type="text/javascript">
  var bbMemos = {
    memos : 'https://me.edui.fun/',//修改为自己部署 Memos 的网址，末尾有 / 斜杠
    limit : '',//默认每次显示 10条
    creatorId:'' ,//早期默认为 101 用户，新安装是 1； https://demo.usememos.com/u/101
    domId: '',//默认为 <div id="bber"></div>
  }
</script>
<script src="https://immmmm.com/bb-lmm-mk.js"></script>
```

样式代码已内置在 `bb-lmm-mk.js` 中。

### 更多围观地址

{{< figure "https://r2.immmmm.com/2022/10/elizen-me-bb.jpg.webp" "<a target='_blank' href='https://elizen.me/bb/'>elizen</a>">}}

{{< figure "https://r2.immmmm.com/2022/10/chenyyds-com-bb.webp" "<a target='_blank' href='https://chenyyds.com/bb'>老陳网志</a>">}}

{{< figure "https://r2.immmmm.com/2022/10/life97-top-dynamics.png.webp" "<a target='_blank' href='https://life97.top/Dynamics.html'>life97</a>">}}

1900： <https://1900.live/memos/>

### 图片预览

{{< figure "https://r2.immmmm.com/2022/10/iShot_2022-10-07_20.41.41.png" "https://r2.immmmm.com/2022/10/iShot_2022-10-07_20.42.12.png" "内置图片上传排版">}}
