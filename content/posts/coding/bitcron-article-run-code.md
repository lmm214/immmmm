---
date: 2017-12-18
title: 'Bitcron 文章内运行代码实例一则'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

Bitcron 文章里是可以直接运行代码的，只要把代码高亮类型设置成 `code` 即可。

什么用呢？可以当定制页面（Pages）用！文章定制功能So Easy！

比如，我的友情链接页。按照常规需要新建个 `links.jade` ，然后再把需要插入的 css 和 js 写入模板调用。

<!--more-->
现在效果如下图：

![我的朋友们](https://pic.edui.fun/images/2017/12/links-1.png)

直接在 `md` 文章里敲进代码：

```jade
\`\`\`code
a.friends(href="https://immmm.com",target="_blank")
    img(src="/service/gravatar/"+('fivemu@gmail.com').md5)
    span.name= '林小沐'

style
    .hentry .post-content,blockquote{max-width:90% !important;margin:0 auto;}
    .friends{display:inline-block;margin:0 18px 18px 0;min-height:32px;background-color:#f7f7f7;border:1px solid #dcdcdc;border-radius:4px;vertical-align:top;overflow:hidden;}
    .friends img{width:36px;height:36px;vertical-align:middle;}
    .friends .name{display:inline-block;padding:0 11px;font-size:14px;}   
\`\`\`反斜杠补丁
```

```code
style
    .hentry .post-content,blockquote{max-width:90% !important;margin:0 auto;}
    .friends{display:inline-block;margin:0 18px 18px 0;min-height:32px;background-color:#f7f7f7;border:1px solid #dcdcdc;border-radius:4px;vertical-align:top;overflow:hidden;}
    .friends img{width:36px;height:36px;vertical-align:middle;}
    .friends .name{display:inline-block;padding:0 11px;font-size:14px;} 
```