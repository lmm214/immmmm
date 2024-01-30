---
title: "哔哔广场.app"
date: 2024-01-21T23:55:45+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/01/bbv3.png.webp
---

基于 [@归臧](https://nuoea.com/) 的 Memos 样式和功能，在 [@koobai](https://koobai.com/) 无限需求之下，连肝一周并败入域名解析之: <https://memobbs.app/>

折腾核心动力：颜值在线！

满足核心需求：Memos'er 共舞~

<!--more-->

项目主页：<https://github.com/lmm214/memobbs>

一个纯 HTML、JS、CSS 造的静态页面，实现个人 Memos 前端登录发布、编辑等管理功能，集成广场模式、随机模式。当然，也支持嵌入到自己的博客中。

### 客户端

- 移动端直接 PWA 添加到桌面即可；
- Mac 客户端  [MemoBBS_v240121.dmg](https://r2.memobbs.app/MemoBBS_v240121.dmg) 
- Win 客户端 [MemoBBS_v240121.msi](https://r2.memobbs.app/MemoBBS_v240121.msi) 

### 加入广场

直接 PR [memos.json](https://github.com/lmm214/memobbs/blob/main/memos.json) 这个文件即可。

> 麻烦使用 Artalk 评论的小伙伴们，添加一下 `https://memobbs.app/` 和 `https://immmmm.com/` 到白名单，方便大家评论互动～

### 功能列表

![meap1-1.png](https://r2.immmmm.com/2024/01/meap1-1.png.webp)

#### 登录授权

点击顶部左侧“头像位置”，输入 Memos 网址、密钥，保存后即可解锁优化后的发布框功能。

![memobbs-1.png](https://r2.immmmm.com/2024/01/memobbs-1.png.webp)

<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h16M4 15h16M10 3L8 21m8-18l-2 18"></path></svg> 「键选标签」

- 输入 `空格+井号`，再键盘方向键选择后回车，可快速填入标签

<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7m4 2h6m-3-3v6"></path><circle cx="9" cy="9" r="2"></circle><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></g></svg> 上传图片

- 外链图片、WebP 压缩上传（仅PC）、原图上传。
- 上传后，点击「缩略图」删除，PC 端还可 **拖动图片排序**

<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2m16 0h2m-7-1v2m-6-2v2"/></g></svg> 「AI 助手」

- 新建 Cloudflare Workers AI 并绑定域名后，填入设置处解锁。教程（[这里](https://immmmm.com/cloudflare-workers-ai/)）

<svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.64 3.64l-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72M14 7l3 3M5 6v4m14 4v4M10 2v2M7 8H3m18 8h-4M11 3H9"/></svg> 「Gemini Pro」

- 填入自己的密钥即可解锁：语音润色、自动标签、育儿帮手、智囊团队、智能问答。

<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3l2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8"></path></svg> 「私有模式」

- 刷选“仅自己可见”的内容，编辑时若权限改为“公开”，为以当前时间发布

<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"></path><path d="m18 2l4 4l-4 4M2 6h1.9c1.5 0 2.9.9 3.6 2.2M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"></path><path d="m18 14l4 4l-4 4"></path></g></svg> 「随机」回忆

- 常刷常新，收获意外感动

#### 浏览模式

<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m3 9l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="M9 22V12h6v10"></path></g></svg> 个人首页 <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20m17.8-2.2a7.5 7.5 0 0 0 .003-10.603M17 15a3.5 3.5 0 0 0-.025-4.975"/></svg> 广场模式 <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0m16 4v-2.38c0-2.12 1.03-3.12 1-5.62c-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0m-4-3h4M4 13h4"/></svg> 闲逛模式 <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 19a6 6 0 0 0-12 0"></path><circle cx="8" cy="9" r="4"></circle><path d="M22 19a6 6 0 0 0-6-6a4 4 0 1 0 0-8"></path></g></svg> 关注列表 <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0m-3 6v6m6-3v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/></g></svg> 友链朋友圈 <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21l-4.3-4.3"></path></g></svg> 搜索内容

### 使用 Tips

#### 豆瓣卡片

- 采用 [neodb api](https://neodb.social/discover/)，直接丢入链接即可，如：`https://movie.douban.com/subject/35725869/`

![meap-2.png](https://r2.immmmm.com/2024/01/meap-2.png.webp)

#### 影音解析

B站、优酷、腾讯视频、YOUTUBE，丢入视频链接即可，如：`https://www.bilibili.com/video/BV1dN4y117Y8/`

网易云音乐，如：`https://music.163.com/#/song?id=139893`

QQ音乐，如：`https://y.qq.com/n/ryqq/songDetail/001qioWg4HkeRY`

![memobbs-2.png](https://r2.immmmm.com/2024/01/memobbs-2.png.webp)

#### 单条 Memo 管理

未授权，默认跳转源站；授权后可对自己的 Memo 编辑、归档或删除，对别人的可：

- 收藏：直接保存到自己的 Memos，仅自己可见；
- 引用：复制内容并加上 via 信息到剪切板，手动粘贴；
- 跳转

![memobbs-5.png](https://r2.immmmm.com/2024/01/memobbs-5.png.webp)
![memobbs-4.png](https://r2.immmmm.com/2024/01/memobbs-4.png.webp)
![memobbs-3.png](https://r2.immmmm.com/2024/01/memobbs-3.png.webp)

### 主题集成

小 Tips：`https://memobbs.app/memos.css` 和 `https://memobbs.app/memos.js` 可直接复制调取，因为一直在更新；CDN 引用的 css、js 若出现不稳定情况，可下载存到自己地方。

#### 效果预览

- https://elizen.me/bb/
- https://dongjunke.cn/bbs/
- https://www.hux.ink/bb/
- https://www.xigeshudong.com/memos/
- https://lms.pub/bidao
- ……

#### HTML

```
<div id="memos"></div>
<div id="memo-list"></div>
```

#### CSS

```
<link rel="stylesheet" href="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.css">
<link rel="stylesheet" href="https://cdn.staticfile.org/animate.css/4.1.1/animate.min.css">
<link rel="stylesheet" href="https://cdn.staticfile.org/artalk/2.7.3/ArtalkLite.css">
<link rel="stylesheet" href="https://memobbs.app/grid.css">
<link rel="stylesheet" href="https://memobbs.app/memos.css">
```

#### JS

```
<script src="https://cdn.staticfile.org/twikoo/1.6.29/twikoo.min.js"></script>
<script src="https://cdn.staticfile.org/artalk/2.7.3/ArtalkLite.js"></script>
<script src="https://cdn.staticfile.org/marked/7.0.5/marked.min.js"></script>
<script src="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.js"></script>
<script>
var meting_api='https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r';
</script>
<script src="https://cdn.staticfile.org/meting/2.0.1/Meting.min.js"></script>
<script src="https://cdn.staticfile.org/lozad.js/1.16.0/lozad.min.js"></script>
<script src="https://memobbs.app/memos.js"></script>
```

#### 折腾说明

若已加入 `memos.json` ，则会自动查询当前页面的主域名，如 `https://elizen.me` 匹配上主页直接就是展示 Elizen 的 Memos 信息；否，则展示我的信息。

![elizen_me_2.jpeg](https://r2.immmmm.com/2024/01/elizen_me_2.jpeg.webp)
![elizen_me_1.jpeg](https://r2.immmmm.com/2024/01/elizen_me_1.jpeg.webp)

（图左是匹配上，图右为没匹配上的默认显示）

没匹配上，那怎么办？修改下面 `memosMyList` 第一条信息为自己的，再在 HTML 内加入下面的代码，就可以啦～

```
<script type="text/javascript">
  var memosMyList = [
    {
      "creatorName" : "林木木",
      "website" : "https://immmmm.com",
      "link" : "https://me.edui.fun",
      "creatorId" : "101",
      "avatar" : "https://cravatar.cn/avatar/ba83fa02fc4b2ba621514941307e21be?s=80",
      "twikoo" : "https://metk.edui.fun"
    },
    {
      "creatorName" : "koobai",
      "website" : "https://koobai.com",
      "link" : "https://memos.koobai.com",
      "creatorId" : "1",
      "avatar" : "https://cravatar.cn/avatar/3b3d336a7d389b7ae8531cbe177ae9b7?s=80",
      "artalk" : "https://c.koobai.com",
      "artSite" : "空白唠叨"
    },{
      "creatorName": "Elizen",
      "website" : "https://elizen.me",
      "link" : "https://memos.elizen.me",
      "creatorId" : "101",
      "twikoo" : "https://pl.elizen.me",
      "avatar": "https://cravatar.cn/avatar/f65df4d87240feb1cb247857a621a48f?s=80"
    }
  ]
</script>
```

### 致谢

- <https://github.com/usememos/memos>
- <https://github.com/tw93/Pake>
- <https://devv.ai/zh>
- <https://yesicon.app/>
- [让网页支持iOS添加到主屏幕全屏应用，webapp启动图生成](https://blog.zhheo.com/p/b737e93d.html)