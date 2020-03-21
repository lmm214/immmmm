---
title: 'Bitcron 主题常用的代码片段'
date: 2017-07-23
tags: [折腾]
published: true
hideInList: false
isTop: false
---

### 全站 Site

标题：`site.title`，示例：
```jade
a(href="/")= site.title
```

副标题：`site.sub_title`，示例：
```jade
if site.sub_title
	h2.site-description= site.sub_title]
```

关键词：`site.keywords`
描述：`site.description`

站点头像：`site.avatar`
背景：`site.background_image`，示例：
```jade
header#header(style="background-image:url({{site.background_image}})")
```

当下年份：`site.now.year`

<!--more-->

### 文章 post

标题：`post.title`
发表时间：`post.date`
分类：`a(href=post.category.url)= post.category.title`


文章标签：
```jade
if post.tags
	for tag in post.tags
		a(href="/tag/{{tag}}")= tag
```

文章摘要：`+post.content.opening` 显示文章 `<!--more-->` 前的内容
全文内容：`post.content`
结合以上两者，首页 index 完美输出内容：
```jade
if post.content.opening
    .post-content= post.content.opening
    a(href=post.url).more-link= '阅读全文 »'
else
    .post-content= post.content
    a(href=post.url+'#comments').more-link= '发表评论 »'
```
以上判断：如果有设置more标签，则显示部分和“阅读全文”链接，若无则全文显示并显示“发表评论”链接。limit函数遇到图片、表格代码，截取出的内容显示一塌糊涂。。。


上一篇文章链接：`a(href=posts.previous_one.url)= posts.previous_one.title`
下一篇文章链接：`a(href=posts.next_one.url)= posts.next_one.title`


### 计数统计

阅读次数：`post.visits or 0`
主评论数：`post.comments.length`
总评论数：`post.comments_count`，包括回复的评论

文章数：`d.get_data(return_count=true,with_page=false)`
分类数：`d.get_data(type='folder', level=[1,2], return_count=true,min_posts_count=1)`
标签数：`site.tags.length`

单篇文章字数： `span= '%s字' %post.text_words`
全站总字数： `span= '总共写了%s字' %site.text_words`
字数格式化：`span= '{0:,}'.format(site.text_words) + '字'`

### H & HTML

头部属性：`+h.headers`  等效于 h.mobile_metas + h.seo()
载入资源：`+h.load("")` 中间可用逗号连接
载入默认md样式：`+h.load('markdown')`

载入云字体：
```jade
+font("wxihei")
	a(href='/')= site.title
```
返回头部：`+h.back_to_top(label="△")`

载入搜索功能：`+posts.search_in_html(base_url="/result")` ，需与 result.jade 相配合。以下自定义 placeholder
`+posts.search_in_html(placeholder='搜索')`

导航代码：`+site.just_nav`
社交代码：`+site.just_socials`
文章分页导航：`+h.paginator()`

文章缩略图：
```jade
if post.cover
	a.post_cover(href=post.url)
		img(src=post.cover.resize(200, 200, fixed=True))
```

TAB 切换功能：
```jade
+tab(['归档', '分类'], active=1)
		#tab
		#tab
```

网站所有标签链接:
```jade
if site.tags: .tags
	.name
		h2= '标签'
			span= '(%s)'%site.tags.length
	ul.list: for tag_name, tag_count in site.tags: li
    	a(href='/tag/{{tag_name}}')= tag_name
    	span= '(%s)'%tag_count
```

网站所有分类链接:
```jade
if posts.categories: .categories
				.name
					h2= '分类'
						span= '(%s)'%(d.get_data(types='folder', return_count=true, level=1, min_posts_count=1, render=true))
				ul.list: for category in posts.categories: li
					a(href=category.url)= category.title
					span= '(%s)'%category.posts_count
```

### request.path 相关说明

假设 `http://www.example.com/page.html?x=y` 被访问，则 `request` 有以下几个属性:
```table
变量名|值
path|/page.html
base_url|http://www.example.com/page.html
url|http://www.example.com/page.html?x=y
url_root|http://www.example.com/
request.url_without_host|/page.html?x=y
```

分页导航
```jade
if paginator.has_previous or paginator.has_next:nav
    if paginator.has_previous
        a(href=paginator.previous_page_url) 上一页
    for page in range(1, paginator.total_pages+1)
        if page == paginator.page
            span= page
        else 
            a(href="/page/{{page}}")= page
    if paginator.has_next
        a(href=paginator.next_page_url) 下一页
```
生成效果（当前页为第二页）
```html
<nav>
    <a href="/page/1">上一页</a>
    <a href="/page/1">1</a>
    <span>2</span>
    <a href="/page/3">3</a>
    <a href="/page/3">下一页</a>
</nav>
```

### 浏览器判断
仅在 Safari 系列浏览器中生效的样式
```jade
+browser('safari')
    style(type="text/css")
        .homepage_body{ margin-left: 13px; }
```


### 感谢

<https://sxlf.org/post/bitcron-template-code.html>

<https://blog.shuiba.co/bitcron-count-code>