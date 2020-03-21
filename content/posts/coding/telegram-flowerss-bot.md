---
date: 2019-12-02
title: '电报 Flowerss Bot 搭建笔记'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

看中一点：支持 Telegram 应用内 instant view ！

点开即用：<https://t.me/rssflowbot>

项目主页：<https://github.com/indes/flowerss-bot>

<!--more-->

### 搭建

`bot token`获取，电报 @Botfather，点 start，输入 /newbot，命名后获得 API Token。


`telegraph token`获取，返回的 JSON 中 access_token 字段值即为 Telegraph Token。

```
curl https://api.telegra.ph/createAccount?short_name=flowerss&author_name=flowerss&author_url=https://github.com/indes/flowerss-bot
```

然后构建命令，docker 一键部署：

```
docker run -d -v ~/data/flowerss:/var/flowerss indes/flowerss-bot -b <bot token> -t <telegraph token>
```

然后？然后，就成功啦！

### 绝配

RSSHub： <https://docs.rsshub.app/>