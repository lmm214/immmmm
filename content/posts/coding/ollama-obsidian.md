---
title: "Obsidian Ollama，本地跑起来～"
date: 2023-12-16T22:50:08+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/12/obsidian-ollama.png
---

几天前看到 [@歸藏](https://twitter.com/op7418/status/1734492326599467291) 分享“如何用 Ollama 在 Mac 本地跑 LLM，并且用在 Obsidian 上处理自己的笔记和内容”。教程步骤简洁清晰，无任何报错顺利上手 💪

<!--more-->

- Ollama 官网下载安装包 <https://ollama.ai>
- 打开终端输入 `ollama run mistral`，等待下载完成即可对话（更多模型见[项目仓库](https://github.com/jmorganca/ollama)）
- Obsidian 搜索安装 Ollama 插件（或 [项目仓库](https://github.com/hinterdupfinger/obsidian-ollama)）

但，第三步 Obsidian Ollama 插件不给力！

遂，自己动手，丰衣足食：

「Obsidian Ollama 折腾版」：<https://github.com/lmm214/obsidian-ollama>

### 折腾内容

- 把原项目里的 PR 手动合在了一起（可设定默认模型、过程 steam 输出）
- 加了命令的中文提示
- 修改默认模型为 `mistral`
- 修改默认端口，解决跨域问题

### 使用步骤

- 手动安装 [Obsidian Ollama 折腾版](https://github.com/lmm214/obsidian-ollama/releases)插件
- 终端输入启动命令

`OLLAMA_ORIGINS=*,app://obsidian.md* OLLAMA_HOST=127.0.0.1:11435 ollama serve`

- Obsidian 笔记中快捷键 `command + P`

{{< figure "https://r2.immmmm.com/2023/12/obsidian-ollama-2.png" "command + P">}}

### 折腾体验

模型大小是 4.1GB，运行时内存占用也差不多6G，Mac mini M2 16G 下，解释一个概念、翻译一句话等待 10+ 秒，总结千字文等待约 1～2 分钟。

搭配另一个插件一起使用也不错 [BMO Chatbot for Obsidian](https://github.com/longy2k/obsidian-bmo-chatbot?tab=readme-ov-file) ，它可以在侧边栏中对当前文档进行对话。