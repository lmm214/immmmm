---
title: "Cloudflared 两步打通内外服务"
date: 2022-07-21T09:49:22+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/07/cfd-1.jpeg
---

群晖套件中心发现第三方 [矿神](https://imnks.com/1780.html) 更新了个应用 [「Cloudflared」](https://github.com/cloudflare/cloudflared) （基于 Cloudflare Tunnel ），一试，这，方便得太过分！

如题图，可以直接把域名解析到本地内网IP **+端口**，之前为了去端口可下了大血本（云服务器、备案、解决各端口冲突等），而 CF 这一下就直接实现零成本！

<!--more-->

### 两步

- 域名托管给 CF
- 开启 Tunnel

因自己域名和站点本就在 CF 上，直接第二步“开启 Tunnel”并把一个 token 填入群晖应用中，搞定！

具体详细教程见：https://imnks.com/5984.html

### 无语

小程序被强制“暂停服务”……