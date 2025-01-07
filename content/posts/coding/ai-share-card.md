---
title: "浏览器插件推荐：AI Share Card 生成网页分享卡片"
date: 2025-01-06T23:17:22+0800
tags: [折腾]
feature: https://r2.edui123.com/2025/01/Picsew_20250106231239.JPEG.webp
---

一款 AI 网页分享卡片生成小工具，利用 AI 将网页内容一键转换为精美的分享卡片。

真是万物皆可卡片，看到支持自定义模板，所以又折腾了一晚。

但，好像也没啥大用…… 那就，玩呗～

<!--more-->

### 上效果对比图（左为默认样式）

![](https://r2.edui123.com/2025/01/Picsew_20250107195720.JPEG.webp)

### 自定义模版代码分享

两个 import 分别是来源 SVG 图标，自定义字体。

```
<style>
@import url(https://r2.immmmm.com/via.css);
@import url(https://static.zeoseven.com/zsft/7/main/result.css);
.card{font-family:"Zhuque Fangsong (technical preview)"}

.powered-by{visibility:hidden}
.powered-by span{visibility:visible}
#cardContainer,.card{width:380px!important}
.card-wrapper{border-radius:12px;box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)}
.card{font-weight:400;box-sizing:border-box;padding:28px;background:#fff;border-radius:20px}
.header{color:#a6a6a6;height:24px;overflow:hidden}
.product{font-style:italic}
.product,h1.title{letter-spacing:.02em}
h1.title{font-size:20px;font-weight:700;color:#2b2b2b;margin:4px 0 12px;line-height:1.5}
.summary{background:#f8f9fc;padding:16px;border-radius:12px;margin-bottom:12px;font-size:15px;color:#2b2b2b;line-height:1.8;letter-spacing:.03em;box-shadow:inset 0 2px 4px 0 rgba(0,0,0,.06)}
.points{margin-bottom:10px}
.point{display:flex;align-items:flex-start;margin-top:12px;font-size:15px;color:#2b2b2b;padding:2px 0}
.point:before{content:"";width:4px;height:4px;background:#287cf6;border-radius:50%;margin-top:10px;margin-right:6px;flex-shrink:0}
.point:nth-last-child(-n+2){margin-right:100px}
.qr-section{position:relative}
#qrcode{width:76px;height:76px;border-radius:8px;padding:6px;background:#f8f9fc;border:1px solid #f5f5f5;position:absolute;bottom:0;right:0}
#qrcode img{width:100%;height:100%;object-fit:contain}
</style>

<div class="card">
  <div id="card-img"></div>
  <div class="header">
    <span class="date">{{DATE}} </span> · <span class="product">{{QR_SUBTITLE}} </span>
  </div>
  <h1 class="title">{{TITLE}} <span data-via="{{PLATFORM}}"></span></h1>
  <div class="summary">
    {{SUMMARY}}
  </div>
  <div class="points">
    {{#each POINTS}}
    <div class="point">{{this}}</div>
    {{/each}}
  </div>
  <div class="qr-section">
    <div id="qrcode"></div>
  </div>
</div> 
```

### 相关站点记录

#### 官方介绍

- 主页 <https://zkv549gmz8.feishu.cn/wiki/LPQEwSvUfiXgxckspzncGjOdnqe>
- Chrome扩展 <https://chromewebstore.google.com/detail/bfaolbpkelfmiijhdlcbflbpfpebepon>

#### 来源 SVG 图标如下压缩：

- 获取图标 SVG 代码 <https://www.iconfont.cn/>
- 粘贴压缩并复制 <https://jakearchibald.github.io/svgomg/>
- Encode 代码 <https://meyerweb.com/eric/tools/dencoder/>