---
title: "Memos 广场（电报频道版）"
date: 2023-04-15T13:22:53+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/04/memos-bbs.png

---

频道链接： <https://t.me/memos_bbs>

发现自己有事没事就会刷一下 [「哔哔广场」](https://immmmm.com/bbs/) ，最近很多好玩儿的、好看的都是从这儿得知。也许是上了年纪，虽喜欢折腾，但也喜欢开箱即用、一键部署即可的。

也喜欢看到大家分享的日常，一张照片、一句吐槽、一个感悟等等，都非常亲切。

<!--more-->

一看博客访问数据，这 `/bbs` 已占榜首！

![bbs-views.png](https://r2.immmmm.com/2023/04/bbs-views.png)

但在自己使用时，刷新页面后总会瞬间疑惑？上次看到哪儿啦，是没更新还是自己看漏了……急需有个 timeline 固定流，而非前端实时 fetch 再排序展示。

第一时间想到电报机器人，果然有轮子：[RSS-to-Telegram-Bot](https://github.com/Rongronggg9/RSS-to-Telegram-Bot/blob/dev/README.zh.md)

### 已订阅

```
https://me.edui.fun/u/101/rss.xml
https://memos.eallion.com/u/101/rss.xml
https://isay.live/u/101/rss.xml
https://memos.noionion.cn/u/1/rss.xml
https://qzone.boyhu.cn/u/101/rss.xml
https://me.chenplus.com/u/101/rss.xml
https://memos.life97.top/u/101/rss.xml
https://memos.1900.live/u/101/rss.xml
https://memo.wananaiko.com/u/1/rss.xml
https://memos.skyue.com/u/1/rss.xml
https://s.dusays.com/u/1/rss.xml
https://api.mm.xlap.top/u/1/rss.xml
https://flomo.010316.xyz/u/1/rss.xml
https://memos.wiki-power.com/u/1/rss.xml
https://b.lms.im/u/1/rss.xml
https://memos.xrat.net/u/2/rss.xml
https://mome.cyuanx.icu/u/1/rss.xml
https://m.leonus.cn/u/1/rss.xml
https://say.veryjack.com/u/1/rss.xml
https://bb.elizen.me/u/101/rss.xml
https://bb.seersu.top/u/101/rss.xml
https://memos.koobai.com/u/1/rss.xml
https://memos.vlieo.com/u/1/rss.xml
```

### 报错

更新到 v0.12.2 即可解决。

```
https://memos.nuoea.com/u/101/rss.xml
```

### 招募

有意向的小伙伴，欢迎丢 rss 链接～

建议 Memos 进后台：设置 —— 系统 —— 服务名称，修改为自己昵称或站点名。