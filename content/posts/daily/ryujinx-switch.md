---
title: "Ryujinx 模拟器上手记录"
date: 2024-11-10T13:38:32+0800
tags: [日常]
feature: https://r2.immmmm.com/2024/11/SCR-20241110-mlfw1.png.webp
---

十一假期看到消息 Ryujinx 删库，那会儿《智慧的再现》也刚发布，说是 M1 芯片就能流畅运行，咱着 M2 那不起飞，立刻尝个尾鲜。

当然，支持正版，卡带已入。

<!--more-->

{{< figure "https://r2m.immmmm.com/memos/2024/10/SCR-20241007-nkhd.jpeg.webp" "智慧的再现">}}

实测效果，能玩，微微卡，偶尔崩溃（使用渲染缓存后大大改善）。

### 模拟器、Key、固件下载

Ryujinx 模拟器 <https://ryujinx.cn.uptodown.com/mac/download>

Ryujinx Prod Keys <https://prodkeys.net/ryujinx-prod-keys-v2/>

Ryujinx Firmware Switch 固件 <https://prodkeys.net/ryujinx-firmware-v2/>

### 几点配置

详细教程见 [《MacOS 使用 Ryujinx 模拟器 + 手柄🎮 游玩 NS 游戏》](https://github.com/hhstore/blog/issues/398)。

### 解锁全 amiibo

链接：<https://pan.baidu.com/s/12ldEUYwPMm1rVa8XUUJBjw?pwd=6666>

文件很小2M秒下，放入模拟器中 `portable\system\amiibo`

### 渲染缓存包

电报频道 @ryujinxmac，下载放入对应文件夹，第一次加载游戏会读取超大缓存，游戏中就流畅很多很多。