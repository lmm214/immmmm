---
title: "「哔哔点啥」微信公众号"
date: 2020-05-10T20:22:49+0800
tags: [折腾]
---

已更新，见[《「哔哔点啥」微信公众号 2.0》](https://immmmm.com/bb-by-wechat-pro/)

看到 [@熊野](https://bearye.cn/archives/488) 说可以用「微信公众号」发哔哔，还基于腾讯云函数，也能部署到 Leancloud ，立马 ~~勾搭~~ 加上微信好友。熊大神连夜折腾匹配一夜一天，远程手把手指导部署，整个过程：失败，等，失败，等等，失败，等等等等……成啦！太、太神奇！

{{< figure "https://pic.edui.fun/images/2020/05/bbds.png" "「哔哔点啥」微信公众号" >}}

### 食用步骤

1.按照原作者 [@daibor](https://sspai.com/post/60024) 的教程在 Leancloud 建好应用，进入设置--应用 Keys，留存 `AppID`、`MasterKey`、`Request 域名`；

<!--more-->

2.扫码关注「哔哔点啥」公众号（更名申请中），按照提示构建以下命令绑定：

```
//bindCurrentUser:你的AppID,你的MasterKey,https://你的Request 域名
```

3.Done！

### 风险预警

对于以上的id和key，微信公众号消息会有记录，腾讯云数据库也会储存，所以使用前请各位小伙伴斟酌。另外，后端使用的是免费配额，且用且珍惜。


最后，再次感谢 [@熊野](https://bearye.cn/) 大神！