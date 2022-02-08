---
date: 2017-12-23
title: 'Bitcron 实现个性友情链接页'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

![我的朋友们](https://pic.edui.fun/images/2017/12/links-1.png)

具体效果见：[https://immmmm.com/friends](https://immmmm.com/friends)

<!--more-->

其实，下篇文章码的就是教程。

[bitcron-article-run-code](bitcron-article-run-code)

那，现在这篇又什么情况呢？哈，是基于 `mixin` 又精简了代码。

```jade
\`\`\`code 反斜杠补丁
mixin friends(href,mail,name)
  a.friends(href=href,target="_blank")
    img(src="/service/gravatar/"+(mail).md5)
    span.name= name

+friends('http://immmmm.com','fivemu@gmail.com','林木木')
\`\`\`
```

只需按照 `+friends('网址','邮箱','昵称')` 这种格式添加即可，省去了N多html代码！

当然样式什么的还是得有~

```css
.hentry .post-content,blockquote{max-width:90% !important;margin:0 auto;}
.friends{display:inline-block;margin:0 18px 18px 0;min-height:32px;background-color:#f7f7f7;border:1px solid #dcdcdc;border-radius:4px;vertical-align:top;overflow:hidden;}
.friends img{width:36px;height:36px;vertical-align:middle;}
.friends .name{display:inline-block;padding:0 11px;font-size:14px;}   
```