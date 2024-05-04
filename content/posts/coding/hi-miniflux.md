---
title: "Hi，Miniflux"
date: 2024-05-03T20:23:37+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/05/SCR-20240504-llhq.jpeg.webp
---

[Miniflux](https://github.com/miniflux/v2) 是一款极简 RSS 订阅阅读器。

Docker 部署内存占用 30MB 左右，相比 FreshRSS 占用 150MB 左右，轻量许多。

具体部署先略过，主要推荐两个相关项目。

<!--more-->

### 推荐一： Miniflux-Theme-Reeder

项目地址：https://github.com/rootknight/Miniflux-Theme-Reeder

基于官方内置 `自定义 CSS` 功能的仿 Reeder 界面主题，一键复制 [style.min.css](https://github.com/rootknight/Miniflux-Theme-Reeder/blob/main/style.mini.css) 代码，粘贴到 `设置-自定义 CSS` 保存即可。

支持**移动端**的 PWA 模式，自适应系统暗色/亮色模式，适合移动端看得多的同学。


![](https://r2.immmmm.com/2024/05/SCR-20240504-ljbm.jpeg.webp)
![](https://r2.immmmm.com/2024/05/SCR-20240504-ljfi.jpeg.webp)
![](https://r2.immmmm.com/2024/05/SCR-20240504-ljho.png.webp)

### 推荐二： ReactFlux

项目地址：https://github.com/electh/ReactFlux

第三方 Web 前端，提供更为友好的阅读体验，虽然也有移动端适配，但更适合桌面端大屏幕浏览。

缺点是需要另外地方部署前端，不过可以直接使用部署在 Cloudflare Pages 上的演示站或者自行部署。

![](https://r2.immmmm.com/2024/05/SCR-20240504-llhq.jpeg.webp)

![](https://r2.immmmm.com/2024/05/SCR-20240504-llly.jpeg.webp)

### 部署代码备份： Miniflux

个人部署采用 `docker-compose.yml` 拉起服务。

```
version: '3.4'
services:
  miniflux:
    image: miniflux/miniflux:latest
    container_name: miniflux
    restart: always
    ports:
      - "8068:8080"
    depends_on:
      - db
    environment:
      - DEBUG=0
      - LOG_DATE_TIME=1
      # 60 mins
      - POLLING_FREQUENCY=60
      - LISTEN_ADDR=0.0.0.0:8080
      # 访问网址
      - BASE_URL=https://miniflux.xxxx.com/
      - CLEANUP_FREQUENCY_HOURS=876000
      - CLEANUP_ARCHIVE_READ_DAYS=36500
      - CLEANUP_REMOVE_SESSIONS_DAYS=36500
      - RUN_MIGRATIONS=1
      - CREATE_ADMIN=1
      # 管理员账号密码
      - ADMIN_USERNAME=admin
      - ADMIN_PASSWORD=admin123
      - PROXY_IMAGES=all
      - DATABASE_URL=postgres://miniflux:secret@db/miniflux?sslmode=disable

  db:
    image: postgres:12.1-alpine
    restart: always
    expose:
      - 5432
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=miniflux
      - POSTGRES_PASSWORD=secret

volumes:
  miniflux-db:
```

后续更新版本，进入 yml 文件目录，终端逐行输入以下代码：

```
docker-compose pull
docker-compose down
docker-compose up -d
```
