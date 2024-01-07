---
title: "修正静态博客订阅链接"
date: 2024-01-06T12:20:56+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/01/feed-fixed-3.png
---

Wordpress 默认 RSS 为 `/feed`，单各博客程序并不统一，Hexo 是 `/atom.xml`，Hugo 是 `/index.xml`。

话说自从换了 Hugo 后这问题一直存在，无意间看到 `Cloudflare -- 规则 -- 转换规则` 就不就一个添加的事儿呀。

<!--more-->

### 前提

域名得在 CF 上。

### 全站 feed 

![feed-fixed-1](https://r2.immmmm.com/2024/01/feed-fixed-1.png)

### 分类 feed

![feed-fixed-2](https://r2.immmmm.com/2024/01/feed-fixed-2.png)
