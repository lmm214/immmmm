---
date: 2017-12-24
title: 'Bitcron 美化评论回复通知'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

之前用 WordPress 的时候，评论的邮件通知也算是个折腾点，PHP的回复样式和内容随便自己写，相比较而言 Bitcron 源码未公布，Jade 都改名 Pug，折腾测试全凭感觉。所幸，没白折腾，效果如下：

<figure>
    <img src="https://pic.edui.fun/images/2017/12/mail-1.png" alt="" style="width:30%"/>              <img src="https://pic.edui.fun/images/2017/12/mail-0.png" alt="" style="width:30%"/>
    <figcaption>样式对比</figcaption>
</figure>

官方介绍：[https://api.bitcron.com/read/others#toc_6](https://api.bitcron.com/read/others#toc_6)

<!--more-->

>如果需要修改邮件模板，对应修改、创建的模板地址为 `_mails/comment.html`

Copy 了 @大发 的回复邮件样式，代码如下：

2017/12/25 已更新评论头像。

记得修改以下部分代码

```html
<div style="padding:40px 5% 46px;color:#333332;width:380px;margin:10px auto;font-size:16px;line-height:1.6">
    <div class="" style="width:50px;margin:0 auto 20px;">
        <img class="" style="display:block;width:50px" src="图片地址/logo.png">
    </div>

    <p style="margin:0 0 20px;font-size:17px;line-height:1.4;text-align:center;color:#333332">你好。</p>
  
    <p style="font-size:16px;"><span style="color:#3eae5f">{{comment.author}}</span> 回复了您在文章 <strong style="font-weight:bold">《{{parent.title}}》</strong> 中的评论</p>

    <hr style="width:50px;border:0;border-bottom:1px solid #e5e5e5;margin:20px auto;">

    <div style="font-size:16px;color:#333332;overflow:hidden">
        <div><a style="text-decoration:none;display:block;width:50px;float:left;margin:5px 10px 0 5px;line-height:0" href="{{link}}#comments" target="_blank"><img alt="" src="https://你的网址.com/{{comment.avatar}}"  width="50" height="50"></a>
            {{comment.content}}
        </div>
        <div style="padding:0;margin-top:8px;">
            <a style="color:#ffffff;text-decoration:none;display:inline-block;min-height:28px;line-height:28px;padding:0 13px;outline:0;background:#3eae5f;font-size:13px;text-align:center;font-weight:400;border:0;border-radius:999em" href="{{link}}#comments" target="_blank">点击查看</a>
        </div>
    </div>
    
    <hr style="width:50px;border:0;border-bottom:1px solid #e5e5e5;margin:20px auto;">
    <div style="font-size:12px;text-align:center;color:#b3b3b1;">
        By <a style="color:#b3b3b1;text-decoration:none;" href="https://immmmm.com" target="_blank">ImMmMm.com</a>
    </div>
</div>
```

注：最后一行的链接自行改动。