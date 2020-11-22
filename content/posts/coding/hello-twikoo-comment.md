---
title: "启用 Twikoo 评论系统"
date: 2020-11-21T21:36:33+0800
tags: [折腾]
---

感谢 [@iMaeGoo](https://www.imaegoo.com/) 大神用爱发电，顺利启用 Twikoo 评论系统，并完美迁移 Valine 评论数据。

下午在 [@大大的小蜗牛 ](https://eallion.com/) 博客看到评论系统右下角竟然不是 Valine 哦，赫然显示这 Twikoo，啥？！

原来是基于腾讯云开发的评论系统，换！

<!--more-->

一顿操作，主要时间花在了匹配主题的暗黑样式。效果对比：

{{< figure "https://lmm.elizen.me/images/2020/11/Twikoo-1.png" "https://lmm.elizen.me/images/2020/11/Twikoo-2.png" "Twikoo">}}

### 相关教程：

- Twikoo 中文文档：<https://twikoo.js.org/>
- Valine 到 Twikoo 迁移脚本：<https://github.com/imaegoo/twikoo-import-tools>

### 修复微信通知

以下内容基于 0.2.0 版本。

进入云函数 `twikoo -- index.js`，搜索 `title: emailSubject,`，修改成 `text: emailSubject,`。

### 优化新评论邮件通知

`if (config.SC_SENDKEY) return`，开启了微信通知，则停用“新评论邮件通知”。

`if (config.BLOGGER_EMAIL == comment.mail) return`，博主回复别人，只发邮件给别人，不发“新评论邮件通知”给自己。

相关位置如下：

```javascript
// 博主通知
async function noticeMaster (comment) {
  if (!transporter) if (!await initMailer()) return
  //若设置了微信通知，则不发邮件
  if (config.SC_SENDKEY) return
  //评论邮箱与博主邮箱相同，则不发邮件
  if (config.BLOGGER_EMAIL == comment.mail) return
  const SITE_NAME = config.SITE_NAME
```

### 优化评论回复邮件通知

`if (config.BLOGGER_EMAIL == parentComment.mail) return`，别人回复博主，不发邮件，只接受“新评论邮件通知”。

相关位置如下：

```javascript
// 邮件回复通知
async function noticeReply (currentComment) {
  if (!currentComment.pid) return
  if (!transporter) if (!await initMailer()) return
  let parentComment = await db
    .collection('comment')
    .where({ _id: currentComment.pid })
    .get()
  parentComment = parentComment.data[0]
  //别人回复博主，不发邮件，只接受“新评论邮件通知”
  if (config.BLOGGER_EMAIL == parentComment.mail) return
  const PARENT_NICK = parentComment.nick
```

### 邮件通知达成效果

一句话：博主不会收到自己的评论通知，无论是新评论通知，还是回复自己评论的新邮件通知和回复邮件通知。

