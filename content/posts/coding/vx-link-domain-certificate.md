---
title: "VnetLink 泛域名证书服务"
date: 2024-01-09T19:57:18+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/01/vnetlink-ssl.png.webp
---

虽然宝塔面板内置网站的证书申请和自动续签，但开启反代端口后是更新不了的，得手动关闭、手动续签，苦恼许久。

看到 [微林 vx.link](https://www.vx.link/) 开放了泛域名证书服务，而且也有分享自动更新脚本，爱了！

<!--more-->


### 申请证书

微林申请通过之后，复制 [KnowledgeBase/vxlink/vxssl.md](https://github.com/tmplink/KnowledgeBase/blob/main/vxlink/vxssl.md) 这里的脚本内容。

注：证书类型是 `ECC` `Google Trust Services` 家的

### 宝塔添加定时脚本

宝塔后台--计划任务，添加脚本，注意修改自己 `证书链接` 和 `储存位置`。

![vnetlink-ssl-4.png](https://r2.immmmm.com/2024/01/vnetlink-ssl-4.png.webp)

### 修改网站 SSL 配置

修改 `ssl_certificate` 和 `ssl_certificate_key` 位置为对应的 `证书储存位置`

![vnetlink-ssl-3.png](https://r2.immmmm.com/2024/01/vnetlink-ssl-3.png.webp)

保存，收工！