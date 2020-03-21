---
date: 2017-08-09
title: 'Bitcron 关闭某篇文章评论'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

捂脸，遁之……

文章直接添加下句即可:
```markdown
comment: no
```

<!--more-->

以下内容删除线删除线删除线

----
metadata 字段拓展期待挖掘

>调用 post.metadata.xxx 即可， 比如 post.metadata.title; 如果不在系统默认处理的字段外，比如 my_field，也是类同， post.metadata.my_field 即可。

So~

### 关闭文章评论

`post.jade` 内代码设置如下：

```jade
    if post.metadata.comments != "close"
        +post.comments_as_html()
```

则文档 metadata 中添加下句，实现关闭评论：

```markdown
comments: close
```