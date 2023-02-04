---
title: 'Hugo 主题常用的代码片段'
date: '2020-04-01T09:46:00+08:00'
tags: [折腾]
---

### 全站 Site
网址：`.Site.BaseURL`

标题：`.Site.Title`，示例：

```html
<a href="{{ $.Site.BaseURL }}">{{ $.Site.Title }}</a>
```

副标题：`.Site.Params.description`

关键词：`.Site.Params.keywords`

头部菜单：
```html
{{ range $.Site.Menus.main }}
	<li><a href="{{ .URL }}">{{ .Name }}</a></li>
{{ end }}
 ```
<!--more-->

`config.toml`配置示例：
```
baseURL  =  "https://immmmm.com"
title  =  "木木木木木"
[params]
	description = "不问明天，悠然浪费"
	keywords = "博客、主题、折腾、生活"
[menu]
	[[menu.main]]
		name="首页"
		url="/"
		weight="1"
	[[menu.main]]
		name="关于"
		url="/about"
		weight="2"
```

全站标签列表及文章数量：
```html
{{- range $name, $taxonomy := .Site.Taxonomies.tags -}}
	<a href="/tags/{{ $name | urlize }}">#{{ $name }}<small>({{ .Count }})</small></a>
{{- end -}}
```

全站标签数：
```
{{ len .Site.Taxonomies.tags.ByCount }}
```

全站文章数：
```html
共 {{ len (where .Site.RegularPages "Section" "posts") }} 篇日志
```

全站最近更改时间：
```
{{ time.Format "2006-01-02 03:04:05" .Site.LastChange }}
```

### 文章列表 List

文章摘要：`.Summary` 文章列表会显示 `<!--more-->` 前的内容或自动截断。

```
{{ .Summary | plainify }}
```

`config.toml`配置阶段字符，默认 70 个：
```html
summaryLength = 140
```

截断判断：`.Truncated` 如果有 more 标签，则 true，显示“阅读全文”字样。

指定 `content/posts` 为文章内容，且自动截断：
```html
{{  $paginator := .Paginate (where .Site.RegularPages "Type" "posts") }}
{{ range $paginator.Pages }}
<article class="post">
  <h1 class="post-title"><a href="{{ .Permalink }}">{{ .Title }}</a></h1>
  <time class="post-date">{{ .Date.Format "2006-01-02T15:04:05" }}</time>
  <div class="post-content">
 	 {{ .Summary }}
   </div>
  {{ if .Truncated }}
  <div class="read-more">
    <a href="{{ .Permalink }}">阅读全文…</a>
  </div>
  {{ end }}
</article>
{{- end }}
```

神奇的日期格式化：`"2006-01-02 15:04:05"` 表示显示年月日时分秒

文章列表分页：
```html
<div class="pagination">
  {{ if .Paginator.HasPrev }}
    <a href="{{ .Paginator.Prev.URL }}">上一页</a>
  {{ end }}
  {{ if .Paginator.HasNext }}
    <a href="{{ .Paginator.Next.URL }}">下一页</a>
  {{ end }}
</div>
```

### 文章 Single
标题、链接、时间，同上。

全文内容：`.Content`

文字数：`.WordCount`，配合`config.toml`中文统计更准确：
```
hasCJKLanguage = true
```


阅读时间：`.ReadingTime`，示例：
```html
约{{ .ReadingTime }}分钟读完
```

分类 `.Params.categories`
标签 `.Params.tags`，示例：
```html
{{ if .Params.tags }}
	<span class="post-tags">
	{{ range .Params.tags }}
		#<a href="{{ (urlize (printf "tags/%s" . )) | absURL }}/">{{ . }}</a>&nbsp;
	{{ end }}
	</span>
{{ end }}
```

上、下文章链接标题，示例：
```html
<div class="pagination">
	{{ if .NextInSection }}
		<a href="{{ .NextInSection.Permalink }}">{{ .NextInSection.Title }}</a>
	{{ end }}
	{{ if .PrevInSection }}
		<a href="{{ .PrevInSection.Permalink }}">{{ .PrevInSection.Title }}</a>
	{{ end }}
</div>
```

### 其他片段

当前年份，示例：`{{ now.Year }}`

页面类型：`{{ .Section }}`

首页判断：
```
{{ if .IsHome }}
	……
{{ end }}
```

```
{{ if not .IsHome }}……{{ end }}
```

定义变量：
```
{{ $address := "123 Main St." }}
{{ $address }}
```

定义模块，如 layouts/_default/baseof.html
```
{{ block "main" . }}
{{ end }}
```

layouts/_default/list.html 
```
{{ define "main" }}
  ……
{{ end }}
```

### 短代码 Shortcodes

LoveIt 主题内置数十种短代码：<https://hugoloveit.com/zh-cn/theme-documentation-shortcodes/>

### 未完

待更…… 🤷‍♂️

