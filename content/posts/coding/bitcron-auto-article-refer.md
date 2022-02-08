---
date: 2017-12-18
title: 'Bitcron 文章内链自动优化显示'
tags: [折腾]
feature: https://pic.edui.fun/images/2017/12/refer-1.png
---

当我们在文章内引用了一个站内的链接，一般只是超级链接，其实，也可以为这个超级链接提供更好的表现方式。
这是看起来很简单，但确实一个超赞的想法，来自于 Jimmy。效果如下(中间部分，hello 为标题):

![refer 处理页面内的链接](https://pic.edui.fun/images/2017/12/refer-1.png)

<!--more-->

官方相关页面：
[https://pi.bitcron.com/post/code_demo/refer](https://pi.bitcron.com/post/code_demo/refer)
[https://api.bitcron.com/read/syntax/syntax_block#toc_9](https://api.bitcron.com/read/syntax/syntax_block#toc_9) (此页面 orignal_html 少个 i，吭！！！)

进入正题，实际效果如下：

[brotherhood-of-blades-ii](brotherhood-of-blades-ii)

1、先找个文章里 **单独一行** 插入内链，如

```markdown
[brotherhood-of-blades-ii](brotherhood-of-blades-ii)
```
上面的 url 其实就是 md 文档里设置的 `url` 内容。

2、`post.jade` 里添加以下代码：

```jade
mixin sub_post_handler(url, original_html, new_line=True)
    if not new_line
        {{original_html}}
    else
        sub_post = d.get_doc(url=url)
        if not sub_post
            {{original_html}}
        else: .post-preview.clearfix
            preview_meta_class = "with_bg post-preview--meta" if sub_post.cover else 'without_bg post-preview--meta'
            div(class=preview_meta_class)
                .post-preview--middle
                    h4.post-preview--title
                        a(href=sub_post.url)= sub_post.title
                    section.post-preview--excerpt
                        span= sub_post.content.limit(words=40, keep_images=False).plain
                    time.post-preview--date= sub_post.date('%Y.%m.%d') + " | " + "%s评" %(sub_post.comments_count or 0) + " | " + "%s度" %(sub_post.visits or 0)
            if sub_post.cover
                bg_url = sub_post.cover.resize(350, 350, fixed=True)
                .post-preview--image(style="background-image:url({{bg_url}})")

article(class=meta): +refer(sub_post_handler)
```

3、`style.scss` 相关代码：

```scss
.post-preview {
	max-width:780px;
	margin:2em auto;
	position: relative;
	display: flex;
	background: #fff;
	border-radius: 4px;
	box-shadow:0 1px 2px rgba(0,0,0,.25),0 0 1px rgba(0,0,0,.25);
	.post-preview--meta {
		width: 100%;padding: 25px;
		.post-preview--middle {line-height: 28px;}
		.post-preview--title {
			font-size: 16px;
			margin: 0;
			a {text-decoration: none;}
		}
		.post-preview--date {font-size: 14px;color: #999;}
		&.with_bg{width: 75%;}
	}
	.post-preview--excerpt {
		font-size: 14px;
		line-height: 1.825;
		p{margin-bottom: 0;}
	}
	.post-preview--image {
		width: 25%;
		float: right;
		background-size: cover;
		background-position: center center;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
	}
}
@media (max-width: 550px) {
	.post-preview .post-preview--meta .post-preview--excerpt {display: none;}
	.post-preview .post-preview--meta.with_bg {width: 60%;}
	.post-preview .post-preview--image {width: 40%;}
}
```