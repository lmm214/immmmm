---
title: "微信小程序评论开发踩坑记"
date: 2020-12-19T23:48:16+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2020/12/exzz.jpg
---

容我吐会儿！！！🤮

冲动是魔鬼，就因看了 [10 分钟教你实现一个朋友圈小程序](https://www.ifanr.com/minapp/916787) ，SoGa！换下臃肿的 [NewWxComment](https://github.com/yicm/NewWxComment) ，直接原生知晓云纯收工评论开码！

刚干完了：评论、相对时间、评论分页、下拉加载、排序切换、点赞、回复、前端删除、订阅消息！除了提交新评论会重新拉取数据，其他前后端分别处理。最舒心的是评论回复的消息通知！

### 相对时间

时间戳转 Date 及格式化，吐在不支持 `new Date()` ，在 wxml 内调用 wxs 搞定！

<!--more-->

### 评论分页、下拉加载、排序切换

为了前端直接渲染脑子搞s，吐在不支持 push ，利用各种数组拼组 setData 搞定！

### 点赞

感谢 [微信小程序列表点赞功能](https://blog.csdn.net/qq_41049816/article/details/84792206) 省了不少力，但依然吐在不支持 push，还没实现“已点赞”标示，只能在点击时判断！

### 回复

依然吐在不支持 push！！！利用 for 、map 强插搞定！

### 前端删除

最省心的功能，判断是否创建者或管理者，显示「删除」按钮。这方面知晓云服务到位！

### 订阅消息

url 中文转码导致 page 无法正常跳转，keyword 特定参数及限制导致测试了一下午，加上 `decodeuricomponent()` 顺利回血！