---
title: "Adguard Home，拦的啥？"
date: 2021-08-24T00:00:06+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2021/08/adguardhome.png
---

看到 @张洪Heo 发的 [《AdGuardHome本地搭建教程》](https://blog.zhheo.com/p/8e295a09.html)，一试上手，值得拥有！其实其他平台安装也非常简单，具体见[官网](https://adguard.com/zh_cn/adguard-home/overview.html)。

说说本文的重点，看图，发问：

> 拦的啥？

<!--more-->

### `self.events.data.microsoft.com`

排第一的是，微，软？

好吧，使用 Edgo 浏览器的关系。

![adhome-1](https://pic.edui.fun/images/2021/08/adhome-1.jpg)

Edgo 设置-安全性-Microsoft Defender Smartscreen 关闭！

好像，成了一个，但依然还有，那就拦着吧，不就多几行日志嘛！

### `config.pinyin.sogou.com`

要说第1的那位还能理解，毕竟用着人家的产品。可，这gou？

好吧，是多少年前安装过，虽然没调用它，但它的 service 永在！各种删文件禁服务，依旧。

最后，还是下了它的安装包，打开安装包，点击卸载……注销生效。哎。

### 原来如此

再看大图，拦截率 `37.25%`，平均响应 `71ms`，算是豪华数据！

但，其实，电脑端干不过一个浏览器里的插件。因为，ADHome 是基于 DNS 解析。什么意思，它只是把一些广告网址解析到了死胡同，所以，就算加了上万条的过滤数据，对于浏览器中的同网址加载的广告毫无能力。

惊喜，对手机 APP 开屏或内容页广告拦截效果明显！使用也简单，给 Wi-Fi 手动一个部署了 ADHome 的 IP 即可享受。佩服这个脑回路，纯本地、无污染、毫秒级别 DNS 解析，香！

另外，当做网络监测工具，瞅瞅一天到晚的，揭开网络中“十大劳模”的真面目！