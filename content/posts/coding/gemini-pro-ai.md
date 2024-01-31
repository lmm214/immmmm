---
title: "利用 Gemini Pro 为文章添加摘要"
date: 2024-01-30T21:27:48+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/01/gemini-pro-3.jpg
---

>利用 Gemini Pro 为文章添加摘要，具体步骤如下： 1. 获取 Gemini Pro 的 API 密钥。 2. 部署 Netlify API 代理以解决部分地区不可用问题。 3. 部署 Gemini OpenAI 代理，并将接口格式改为 OpenAI 格式……

<!--more-->

### 获取 Gemini Pro 的 API 密钥

略

### Netlify 部署 API proxy

解决部分地区不可用问题。项目地址：<https://github.com/antergone/palm-netlify-proxy>

部署之后复制链接，如：`https://lucky-beignet-12345.netlify.app`

### 部署 Gemini OpenAI Proxy

改为 OpenAI 接口格式，项目地址：<https://github.com/zuisong/gemini-openai-proxy>

打开 [main_cloudflare-workers.mjs](https://github.com/zuisong/gemini-openai-proxy/blob/main/dist/main_cloudflare-workers.mjs) 并复制代码到 Cloudflare Workers 中。（当然，也可以其他平台。但，只有 CF 方便手动修改）

修改以下 3 处地方：

- [可选] 自用设置，第 24 行，添加上自己的主域名，：`origin: "https://immmmm.com",`
- 第 1419 行，改为 Netlify 网址：`var BASE_URL = "https://lucky-beignet-12345.netlify.app"`
- 第 2106 行，写上 Gemini Pro 的 Key：`const apiKey = "YourGeminiProKey";`

### 添加前端代码

[gemini.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/partials/gemini.html)

### 结束

然后，就可以愉快得玩耍啦～