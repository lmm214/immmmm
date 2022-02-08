---
title: 'RSSHub 部署笔记'
date: 2020-03-21
tags: [折腾]
---
>🍰 万物皆可 RSS。

内容来源：<https://docs.rsshub.app/install/#an-zhuang-2>

```
$ docker pull diygod/rsshub
$ docker run -d --name rsshub -p 1200:1200 diygod/rsshub
```

用宝塔面板的话，放行 1200 端口。浏览器打开 http://IP:1200/ ，看到成功页面。✅

<!--more-->

### 绑定域名

![rsshub](https://pic.edui.fun/images/2020/03/rsshub.png)

每次 IP 总不方便，子域名绑起，后台添加网址，加一个「理代向反」即可。

### 使用指北

![rsshub-1](https://pic.edui.fun/images/2020/03/rsshub-1.jpg)

配合 chrome 扩展更方便：[RSSHub Radar](https://chrome.google.com/webstore/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa) ，自定义域名，随时查询规则！

再配合 [《电报 Flowerss Bot》](https://immmmm.com/telegram-flowerss-bot/)，开启私属 rss 聚合机器人！
