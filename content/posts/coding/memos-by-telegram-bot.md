---
title: "Memos x Telegram Bot"
date: 2023-10-21T10:53:47+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/10/memos-home.jpg
---

官方内置了电报机器人发 Memos 的功能（[教程](https://usememos.com/docs/integration/telegram-bot)），并且还支持通过代理连接到 Telegram API，这给部署在国内的 Memos 指了条明路。

直连：Telegram Bot <-x-> Memos

中转：Telegram Bot <--> Proxy <--> Memos

<!--more-->

这里的代理采用 CloudFlare Workers 大法搞定！

### 配置流程

1.新建 [CloudFlare Workers](https://dash.cloudflare.com/)，丢入以下代码，记得绑个自己的域名

```
const tg_host = "api.telegram.org";
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
async function handleRequest(request) {
    var u = new URL(request.url);
    u.host = tg_host;
    var req = new Request(u, {method: request.method,headers: request.headers,body: request.body});
    const result = await fetch(req);
    return result;
}
```

2.电报 @botfather 新建 Bot 并获取 机器人的 Token

格式例如：`4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc`

3.Memos 后台 -- 系统 -- Telegram 机器人 Token

填入如下格式内容：`https://<自己的域名>/bot<token>`，如：

```
https://memos-bot.xxxx.com/bot4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc
```

4.电报 Bot 里输入 `start` 获取到用户 ID

5.Memos 后台--偏好设置，填入 Telegram UserID

### Bot 使用说明

- 发消息后会返回“可见性”选项，按需要再点一下才会发布。
- 发图片时的填入“图片说明”，即可实现图文发布。