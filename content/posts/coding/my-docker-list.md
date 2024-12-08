---
title: "正在使用的 Docker 清单"
date: 2024-12-08T17:16:41+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/12/docker-list.png.webp
---

9 月底TX轻量云搞活动 ¥159x2 新开了 2C4G 机子，比起大几千的续费，便宜太多太多。

试了试整站镜像备份还原，但被告知新机器的硬盘（70GB）比原来的（80GB）小，不行。

<!--more-->

搁置两月，趁着阴天降温宅家，花了一下午，迁移完毕。🎉

### [Flare](https://github.com/soulteary/docker-flare)

超级轻量、快速、美观的个人导航页面，还支持前端编辑。

![](https://r2.immmmm.com/2024/12/flare-editor-beta.png.webp)
![](https://r2.immmmm.com/2024/12/flare-ui.png.webp)

### [友链朋友圈](https://github.com/Rock-Candy-Tea/hexo-circle-of-friends)

古早博客功能，个人的首页调用和友圈都是基于此。

刚发现后继有人，已经有了轻量版本。

### [WeWe RSS](https://github.com/cooderl/wewe-rss)

更优雅的微信公众号订阅方式。部署之后登录自己的微信读书账号，个人已稳定运行大半年。

![](https://r2.immmmm.com/2024/12/wewerss.png.webp)

### [Memos](https://github.com/usememos/memos)

挺好的随记工具，但不兼容更新频繁，停留在 v0.18.2 安逸。博客首页调用、哔哔广场都基于此。

{{< link "memobbs-app" >}}

### [Twikoo](https://github.com/twikoojs/twikoo)

一个简洁、安全、免费的静态网站评论系统。配置和评论数据迁移起来真方便。

### [stilleshan/frps](https://github.com/stilleshan/frps)

网穿透服务，原版怎么都不行，用这个分分钟搞定。

{{< link "install-frp-record" >}}

### [Umami](https://umami.is/)

一个高颜值可自部署的统计应用，还支持前端调用数据。

{{< link "hi-umami-api" >}}

### [musicn-container](https://github.com/wy580477/musicn-container)

可播放及下载音乐的命令行工具 musicn 的容器版本，支持 amd64/arm64 架构。偶尔用来下载个 MP3。

### [n8n](https://github.com/n8n-io/n8n)

免费自部署低代码平台，比如用来接入 [Memos AI 助理](https://n8n.akashio.com/b121c42b66fe4963925baa70de007dd6)，追踪微信公众号更新并生成 AI 日报等。

{{< link "hi-n8n" >}}

### [Talebook](https://github.com/talebook/talebook)

以下几个 Docker 都部署在 NAS 里。

基于 Calibre 简单的个人图书管理系统，各方面都比 calibre-web 好用。而且 Talebook 可以直接读取 Calibre 数据库，日常通过本地连接 NAS 管理书籍，结合 frpc 穿透绑上域名，供好友自取，还内置了 opds 功能，手机用 KyBooks3 APP 顺利实现 APP 内检索下载阅读。

![](https://r2.immmmm.com/2024/12/ds-docker-5.jpg.jpeg.webp)

### vaultwarden

Bitwarden 自部署镜像。

### [Ghost](https://ghost.org/)

用作家庭内部图片博客，基本上是整理照片时，随手丢上去更新一下。回头翻翻，把美好瞬间记录也是件美好的事。

停留在 5.8.3 版本，因为这是 sqlite3 的最高版本，再高需要另外部署 MySQL 8。

### [DailyCheckIn](https://github.com/Sitoi/dailycheckin)

基于「Docker」/「青龙面板」/「群晖」/「本地」的每日签到脚本。