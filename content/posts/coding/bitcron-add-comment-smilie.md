---
date: 2018-01-14
title: '换个法儿添加评论表情'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

<figure>
    <img src="https://pic.edui.fun/images/2018/01/smilie-1.png" alt=""/>
    <figcaption>效果如上</figcaption>
</figure>

实现思路也比较简单，丢图片->丢HTML->丢JS，然后加载！

<!--more-->

下载压缩包： [add_smilie__20180114.zip](https://pic.edui.fun/images/2018/01/add_smilie__20180114.zip) ，直接解压丢入即可。然后，`post.jade` 加载

```jade
+post.comments_as_html()

include smilies.jade
+h.load("/template/include/smilies.js") 
```

附赠给评论添加楼层标识：

```css
.comments{counter-reset:comment-floor}
.comments>.comment{position:relative}
.comments>.comment:before{content:"#" counter(comment-floor,decimal);counter-increment:comment-floor;font-size:32px;position:absolute;top:15px;right:20px;color:rgba(0,0,0,.08);font-style:italic;font-weight:700}
```