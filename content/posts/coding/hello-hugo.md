---
title: 'Hello Hugo'
date: 2020-03-21
tags: [折腾]
toc: true
---

哈喽，🐯🐶！（开机声～）

![hugo-2](https://pic.edui.fun/images/2020/03/hugo-2.png)

主站顺利切换到 [Hugo](https://gohugo.io/) ，直接在 Github Web 端码字，或者本地码好拖进去，自动更新，自动部署，舒心！

就待它的 Github APP 端支持编辑代码咯！

<!--more-->

### 迁移采坑记

#### 文章摘要失效

原来文章 `more` 标签像中间有空格就无效 `<!--  more  -->` 批量替换成  `<!--more-->` 解决。

#### 文章列表排序错乱

原来是文章信息的 `date` 格式不统一导致无法识别，统一修改为年月日 `date: 2020-03-21` 解决。

#### 文章内 html 标签为空

被替换为 `<!-- raw HTML omitted -->` ，原来 Hugo 0.60 以上默认禁用了，手动在 `config.toml` 添加以下代码。

```
[markup]
[markup.goldmark]
[markup.goldmark.renderer]
  unsafe = true
```

### 瞎折腾导引

强烈推荐一波流，文章 TOC 目录、面包屑导航、URL 无缝迁移、内置搜索等 ➡️ [博客迁移——Hugo使用整体概览](https://www.rectcircle.cn/posts/blog-migration/) 

瞎改后的主题源码见 [「这里」](https://github.com/lmm214/immmmm/tree/master/themes/hello-friend)

#### 更改默认 RSS 地址

原默认 rss 地址是 `index.xml`：什么鬼！下载 [list.atom.xml](https://github.com/kaushalmodi/hugo-atom-feed/blob/master/layouts/_default/list.atom.xml) 丢入自己主题的 `layouts/_default`, 并在 `config.toml` 添加以下代码。

```
rssLimit = 5 # 控制输出数量，不然默认是全站
[outputs]
  home = ["Atom", "HTML"] # <domain>/atom.xml
[outputFormats.Atom]
  mediatype = "application/rss"
  baseName = "atom"
```

#### 增加文章 TOC

新建 [layouts/partials/toc.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/partials/toc.html) ，修改 [layouts/_default/single.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/single.html) 添加引用代码：

```html
    {{ if .Params.toc }}
      <div class="tocify">目录：{{- partial "toc.html" . -}}</div>
    {{ end }}
```

在文章 md 头部信息中添加 `toc: true` 启用。相关 CSS 和 jQuery 代码如下：

```css
/* tocify */
.tocify {width: 20%; max-height: 90%; overflow: auto; margin-left: 2%; position: absolute; right:2%; border-radius: 6px;}
.tocify ul, .tocify li {list-style: none; margin: 0; padding: 0; border: none; line-height: 30px; }
.tocify li a {display: inline-block; text-indent:10px; font-size: 14px; text-decoration: none; }
.tocify ul ul li a:before {content: "- "}
@media only screen and (max-width:683px) {
	.tocify {display: none;}
}
```

```js
//文章 toc 跟随
var nav = $(".tocify");
nav.removeClass("hide");
var navTop = $(".post-content").offset().top;
var w = $(window).width()/2 + 400;
nav.css("left", w);
nav.css("top", navTop);
$(window).scroll(function() {
    var scrolls = $(this).scrollTop();
    if (scrolls > navTop) {
      nav.css({"top":0,"position":"fixed"});
    } else {
      nav.css({"top":navTop,"position":"absolute"});
    };
});
```

#### 添加豆瓣页面

新建模板 [layouts/_default/books.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/books.html) 、[layouts/_default/movies.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/movies.html) 页面模板，自行修改 `secret`。

新建文章 [content/books.md](https://github.com/lmm214/immmmm/blob/master/content/books.md)、[content/movies.md](https://github.com/lmm214/immmmm/blob/master/content/movies.md) ，当访问 `域名/books/` 时 Hugo 会匹配 `books.html` 进行渲染。

#### 实现内置搜索

敲黑板，记得写个文章md， [content/search.md](https://github.com/lmm214/immmmm/blob/master/content/search.md) 丢入 `content` 中用来渲染空目录。

搜索利用的是 `fuse.js` 实现前端搜索全站文章 json 数据。

`config.toml` 添加合并：

```html
[outputs]
  home = ["Atom", "HTML", "JSON"] #加上 JSON 支持
```

新建 [layouts/index.json](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/index.json) ,新建搜索模板 [layouts/_default/search.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/search.html) ，新建搜索 JS [static/search.js](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/static/search.js) ,添加搜索 CSS：

```css
/* searchBoxInput */
.menu .search-box-icon {margin-top: 11px; }
.searchPage{min-height:300px}
.search-box {position: relative; margin-bottom: 20px; } #searchBoxInput {padding: 0.5rem 2rem 0.5rem 1rem; width: 16rem; background:#eaeaea; border-radius: 1rem; outline: 0; font-size: 1rem; color: inherit; border: 0px; box-sizing: border-box; }
.dark-theme .search-box #searchBoxInput {background: #3b3d42; }
#searchBoxButton {display: inline; background: none; margin: 0rem; border:0 none; border-radius: 0; padding: 0.4rem 0.6rem 0.4rem; }
.search-box-icon {color: inherit; fill: currentColor; width: 1.1rem; height: 1.1rem; }
```

#### 匹配 Valine 暗黑样式

使用 `Valine.Pure.min.js` 不带默认样式的，并添加暗黑代码（完整版 [style.css](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/static/style.css)）：

```css
.dark-theme .v .vwrap{border:1px solid #4a4b50;}
.dark-theme .v .vwrap input{background:#dcdcdc;}
.dark-theme .v .veditor{color:#fff;}
.dark-theme .v .vbtn{color:#dcdcdc;background:#4a4b50;}
```

### 感叹和感谢

不懂英文，太难了！ 懂点英文，但也看不懂官方文档，😭

- 中文系列教程翻译： <https://www.rectcircle.cn/series/hugo/>
- Hugo 中文帮助文档：<https://hugo.aiaide.com/>
- 官方 Hugo Templates： <https://gohugo.io/templates/>