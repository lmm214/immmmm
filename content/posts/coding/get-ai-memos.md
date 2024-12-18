---
title: "Memos & n8n ，秒接入 AI"
date: 2024-12-18T21:30:36+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/12/SCR-20241218-ssej.png.webp
---

Memos 0.18 还是哪个版本开始就支持 webhook ，一直不知道有啥用。自从折腾了 n8n，发现能连通，而且也自用有段时间。

自动化流程思路是：接收 Memos Webhook，判断是新建事件，判断首行是否有 `触发词`，进入对应流程修改当前条笔记。

<!--more-->

### 演示之一

`a修改` 接内容，触发✌️

![](https://r2.immmmm.com/2024/12/SCR-20241218-suku.png.webp)
![](https://r2.immmmm.com/2024/12/SCR-20241218-supf.png.webp)

### 使用简要说明

安装 n8n 之后，下载 [Memos_v0_22_3__share.json](https://n8n.akashio.com/b121c42b66fe4963925baa70de007dd6)，其它版本需自行微调。

### 修改授权信息

![](https://r2.immmmm.com/2024/12/SCR-20241218-swwj.png.webp)

### 复制 Webhook 节点链接

粘贴到 Memos 设置 `偏好设置` 内。

![](https://r2.immmmm.com/2024/12/SCR-20241218-tdak.png.webp)

![](https://r2.immmmm.com/2024/12/SCR-20241218-teap.png.webp)

### 根据需要可修改触发词

基于正则匹配。

![](https://r2.immmmm.com/2024/12/SCR-20241218-swol.png.webp)

## 后记

拓展性极强，当日常使用次数极少，不太习惯……

其它更多的拓展一个思路，对于有 webhook 或 api 接口，都能非常方便接入 n8n 做联动 💪