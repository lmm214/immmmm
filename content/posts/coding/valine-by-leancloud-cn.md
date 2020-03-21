---
date: 2019-07-13
title: '基于 LeanCloud 的评论系统：Valine'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

Valine 官网： <https://valine.js.org/>
Valine Admin 云引擎： <https://deserts.io/valine-admin-document/>

安装过程略过不表，目前还存在一个问题，通过使用：

```
//unpkg.com/valine@1.3.6/dist/Valine.min.js
``` 

指定 `1.3.6` 版本解决，官方最新的 1.3.9 报错，官网自用的 1.3.10 没问题，但还没更新至 CDN。另外这个 Valine Admin 云引擎方便，顾名思义，安装完毕后可通过 LeanCloud 的二级域名管理评论，相当于给 Valine 增加了个评论管理后台。

另外，昨天绑定域名方式由原来的 CNAME 换成官方推荐的 DNS 模式，这才感受到后台是勾选了 HK 节点！之前卡到自己都不想打开自己的博客！