---
title: '微信公众平台开发小记'
date: 2016-10-30
tags: [折腾]
published: true
hideInList: false
isTop: false
---

微信公众平台开发，个人申请只能订阅号，虽能开启开发者模式，可这权限令人发指！借助“微信开放平台”中的第三方，通过简单的“授权管理”做到各尽其能、互不干扰。

![dyh-dsf.jpg](https://pic.edui.fun/images/2016/10/dyh-dsf.jpg)

<h3>自定义菜单</h3>

<strong>微之家</strong>：<a href="https://www.iweizhijia.com" target="_blank">https://www.iweizhijia.com</a>

![dyh-1.jpg](https://pic.edui.fun/images/2016/10/dyh-1.jpg)

其中菜单内容的“发送消息”、“跳转网页”，当然选择后者，点击菜单后直接显示内容。

<!--more-->

<h3>获取微信文章的永久链接</h3>

<strong>微之家</strong>：<a href="http://www.135editor.com" target="_blank">http://www.135editor.com</a>

![dyh-3.jpg](https://pic.edui.fun/images/2016/10/dyh-3.jpg)
公众号后台预览文章都是临时链接，而订阅号可怜巴拉每日就1次推送，曲线救助，把链接发给自己微信，打开，再分享。阅读量、点赞都在。

<h3>获取永远图片的 MediaId</h3>

继续135：

授权后--开发者模式--自动回复--图片--选择素材：

![dyh-2.jpg](https://pic.edui.fun/images/2016/10/dyh-2.jpg)

图片素材里的字符串即 MediaId ，有了它订阅号也能实现关键词回复“图片”！

注：虽然135也支持自定义菜单，可它选择文章时不能搜索，而微之家OK！