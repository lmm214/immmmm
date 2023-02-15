---
title: "书签导航应用：Flare "
date: 2022-02-26T16:11:24+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/02/flame.png
---

>Flame 是服务器的自托管起始页。使用内置编辑器轻松管理您的应用程序和书签。 —— [Flame](https://github.com/pawelmalak/flame)

在线预览：<https://edui.fun/>

<!--more-->

推荐 [@soulteary](https://soulteary.com/) 做的中文化优化版本 [Flare](https://soulteary.com/2022/02/23/building-a-personal-bookmark-navigation-app-from-scratch-flare.html)，Docker 一键部署，内存占用小到忽略不计，重点是可以直接前端编辑。比  [Edui123.com](https://edui123.com/) 采用的 [Hugo Theme Webstack](https://immmmm.com/hugo-theme-webstack/) 更灵活些。

采用 `docker-compose.yml` 部署更是一键三连，镜像启用更新部署丝滑！

```
# docker-compose.yml
version: '3.6'
services:
  flare:
    image: soulteary/flare:latest
    restart: always
    command: flare --nologin=0
    environment:
      - FLARE_USER=flare
      - FLARE_PASS=flare123456
    ports:
      - 5005:5005
    volumes:
      - /www/wwwroot/edui.fun/app:/app
```

```
docker-compose pull
docker-compose down
docker-compose up -d
```