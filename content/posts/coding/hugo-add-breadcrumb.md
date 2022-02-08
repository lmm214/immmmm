---
title: 'Hugo 添加面包屑导航'
date: '2020-03-31T21:59:00+08:00'
tags: [折腾]
---

{{<figure "https://pic.edui.fun/images/2020/03/breadcrumb-1.png" "https://pic.edui.fun/images/2020/03/breadcrumb-2.png" "黑+白，疗效好" >}}

「不问明天，悠然浪费」，多少年前看到的一句话，一直作为博客的 Slogan ，如同“谶语”般的存在！ 😷

说回正题，折腾流程如下：

<!--more-->

### 主题代码 Themes

```
Hugo/themes
└── hello-friend
    ├── layouts
    │   ├── partials
    │   │   └── breadcrumb.html  # 功能代码
    │   ├── _default
    │   │   └── single.html # 文章页调用
    │   ├── archives
    │   │   └── list.html # 归档页调用
    │   ├── posts
    │   │   └── list.html # 文章页调用
    │   └── tags
    │       └── list.html # 标签页调用
    └── static
        └── style.css # 添加样式代码
```

`breadcrumb.html` 代码如下（来自官网，具体含义我也不懂）：
```html
<div  class="breadcrumb">
  {{ template "breadcrumbnav" (dict "p1" . "p2" .) }}
</div>
{{ define "breadcrumbnav" }}
{{ if .p1.Parent }}
  {{ template "breadcrumbnav" (dict "p1" .p1.Parent "p2" .p2 )  }}
{{ else if not .p1.IsHome }}
  {{ template "breadcrumbnav" (dict "p1" .p1.Site.Home "p2" .p2 )  }}
{{ end }}
<li{{ if eq .p1 .p2 }} class="active"{{ end }}>
  <a href="{{ .p1.Permalink }}">{{ .p1.Title }}</a>
</li>
{{ end }}
```

`single.html` 和各 `list.html` 插入调用代码，当然只插 single 也OK啦：
```html
{{ partial "breadcrumb.html" . }}
```

`style.css` 样式代码（来自 [@rectcircle](https://www.rectcircle.cn/posts/blog-migration/#%e5%ae%9e%e7%8e%b0%e7%b3%bb%e5%88%97%e6%96%87%e7%ab%a0)）：
```css
/* breadcrumb */
.breadcrumb {background: #fafafa;padding:4px 15px; margin-bottom:40px; list-style:none;border-radius: 5px; }
.breadcrumb>li{display:inline-block;opacity:.7;}
.breadcrumb>li+li:before {padding:0 5px; color: #ccc; content: ">"; }
.breadcrumb li a{text-decoration:none;}
.dark-theme .breadcrumb {background: #252627;}
```

### 内容标题 Content

以上功能和样式折腾完毕之后，显示的是这样的：

```
木木木木木 > posts > coding > Hugo 添加面包屑导航
```

所以，需要配合 `_index.md ` 食用！

```
---
title: "首页"
---
```

个人是指定 posts 为内容文件夹，并且建了 4个子文件夹，相当于分了 4 类文章。

```
Hugo/content
├── _index.md # title: "首页"
├── archives
│   └── _index.md # title: "归档"
└── tags
│   └── _index.md # title: "标签"
├── posts
      ├── _index.md # title: "文章"
      ├── chat
      │   └── _index.md # title: "词穷"
      ├── coding
      │   └── _index.md # title: "折腾"
      ├── daily
      │   └── _index.md # title: "日常"
      └── reading
        └── _index.md # title: "育人"
``` 

累到忘我！如，酒到微醺，甚是美好！ 🌀


