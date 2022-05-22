---
title: "Hi，Obsidian"
date: 2021-08-05T21:34:39+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2021/07/obsidian-1.png
---

近一周频繁看到 [Obsidian](https://obsidian.md/) 的安利，原来是出了 iOS 端，而且功能几乎全支持。看了一圈教程和官方文档，嘿，不简单！

<!--more-->

### 主题美化套餐

- [Primary](https://github.com/ceciliamay/obsidianmd-theme-primary)：自用主题。
- [Minimal Theme](https://github.com/kepano/obsidian-minimal)：主题。
- [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings)：配套设置面板，可自定义字体等。
- [Hide](https://github.com/kepano/obsidian-hider)：自定义隐藏界面UI。
- [File Explorer Count](https://github.com/ozntel/file-explorer-note-count)：目录的文件夹增加文件数量的显示。
- [Sliding Panes](https://github.com/deathau/sliding-panes-obsidian)：支持横向堆叠多个窗口。
- [Ozan's Image in Editor](https://github.com/ozntel/oz-image-in-editor-obsidian)：在编辑器视图下直接查看图像、iframe 和 PDF 文件。
- [Supercharged Links](https://github.com/mdelobelle/obsidian_supercharged_links)：美化内部链接外观。

```javascript
//Ozan's Image in Editor 语法
![[ myimage.png | #x-small ]]  //#small     #x-small       #xx-small
![100x100](image.png)  //Width x Height
![300](image.png)  //Width
```

### 文件式管理套餐：

实现给文件夹创建同名文件，或反之。（文件式管理之陋习啊）

- [Folder Note](https://github.com/xpgo/obsidian-folder-note-plugin) 按住 Ctrl 键点击文件夹，创建 md 文件。
- [Note Folder Autorename](https://github.com/pjeby/note-folder-autorename)，为 md文件 创建同名文件夹。

调配1：Folder Note 插件配置中需关闭 Auto Rename ！！！

```
Note File Method: "Folder Name Inside"
Auto Rename: OFF
```

调配2：给 Note Folder Autorename 的命令 `Make this note a folder note` 加个快捷键。

{{< figure "https://pic.edui.fun/images/2021/08/obsidian-7.png" "https://pic.edui.fun/images/2021/08/obsidian-8.png" "文件式管理">}}

调配3：设置--文件与链接--新附近的默认位置，`当前文件夹下的子文件夹中`。效果是复制图片，直接粘贴会把图片存到当前子文件夹中。

### 大纲优化套餐

![obsidian-outliner-demo-gif](https://fastly.jsdelivr.net/gh/vslinko/obsidian-outliner/demo.gif)

- [Outliner](https://github.com/vslinko/obsidian-outliner)：实现了大纲的快速缩进等各种效果。
- [Zoom](https://github.com/vslinko/obsidian-zoom)：可进入节点编辑。

### 更多强化插件

- [Editor Syntax Highlight](https://github.com/deathau/cm-editor-syntax-highlight-obsidian)：代码块的语法高亮显示。
- [Recent Files](https://github.com/tgrosinger/recent-files-obsidian)：增加最近文件查看。
- [Kanban](https://github.com/mgmeyers/obsidian-kanban)：看板插件。
- [Calendar](https://github.com/liamcain/obsidian-calendar-plugin)：算是必备插件，让内置的日志功能飞起。
- [Word Splitting for Simplified Chinese in Edit Mode](https://github.com/aidenlx/cm-chs-patch)：中文分词支持，编辑模式下双击。
- [Remember cursor position](https://github.com/derwish-pro/obsidian-remember-cursor-position)：记住光标位置

- [Templater](https://github.com/SilentVoid13/Templater)：加强内置页面模板，有点高级。
- [Media extended](https://github.com/aidenlx/media-extended)：视频预览，支持设锚点。
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)：编辑模式下编写检索代码，预览模式下查看数据汇总。
- [Text expand](https://github.com/mrjackphil/obsidian-text-expand)：编写检索代码，查询后把结果插入当前页面。
- [Tag Wrangler Plugin](https://github.com/pjeby/tag-wrangler)：标签栏上重命名全库内的所有同名标签都会被自动更改。

{{< figure "https://fastly.jsdelivr.net/gh/Reocin/obsidian-markdown-formatting-assistant-plugin/assets/Suggestion_Window.png" "https://fastly.jsdelivr.net/gh/Reocin/obsidian-markdown-formatting-assistant-plugin/assets/Suggestion_Window_Improved.png" "Markdown Formatting Assistant">}}

- [Markdown Formatting Assistant](https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin)：增加一个面板显示各种格式、符号，点击使用，或者 `\` 反斜杠检索。

{{< figure "https://pic2.zhimg.com/v2-9ef4fdce431f841fa52201e771b4cf95_b.jpg" "Obsidian Commits">}}
- [Obsidian Commits](https://github.com/Darakah/obsidian-commits)：生成热点图和汇总数据,查看自己的笔记的标注更新情况、笔记的撰写情况。

### 剪藏扩展

- [MarkDownload for Chrome](https://chrome.google.com/webstore/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi)：将整个网页以 Markdown 的形式保存。

### 相关参考

- [OBSIDIAN 的使用体验](https://pepcn.com/gtd/obsidian-de-shi-yong-ti-yan)：通俗易懂，值得细看。
- [Obsidian 相关文章索引](https://www.zhihu.com/column/c_1302994040707948544)：来自Z乎话题。
- [Obsidian 插件之 Dataview](https://zhuanlan.zhihu.com/p/373623264)：更多高级代码解读。
- [Obsidian 使用教學](https://medium.com/pm%E7%9A%84%E7%94%9F%E7%94%A2%E5%8A%9B%E5%B7%A5%E5%85%B7%E7%AE%B1/obsidian-%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8-%E6%8F%92%E4%BB%B6%E7%AF%87-01-%E5%A6%82%E4%BD%95%E5%9C%A8-obsidian-%E4%B8%AD%E5%BF%AB%E9%80%9F%E6%8B%86%E5%88%86%E7%AD%86%E8%A8%98-33ac54fbe4c7)：来自 Medium 全系列教程。

### 坑娃套餐

> 随时记录各类培训，并自动更新汇总。

{{< figure "https://pic.edui.fun/images/2021/08/obsidian-4.jpeg" "https://pic.edui.fun/images/2021/08/obsidian-5.jpeg" "https://pic.edui.fun/images/2021/08/obsidian-6.jpeg" "「快捷指令」一键坑娃">}}

两步走：先装好 [Advanced Obsidian URI](https://github.com/Vinzent03/obsidian-advanced-uri/) 插件，再在 iOS 添加上图中的快捷指令。

```javascript
obsidian://advanced-uri?vault=&daily=true&mode=append&data=%23%E4%B9%A6%E6%B3%95
```

注：以上 URL 实现一键追加 `#书法` 到当日如 `2021-08-06.md` 中（）。其中 URL中的 `%23%E4%B9%A6%E6%B3%95` == `#书法` ，因为 `data` 需要 URL 编码（Encode），更多参数详见插件页。

### 随查进度

![obsidian-2](https://pic.edui.fun/images/2021/08/obsidian-2.png)

坑了几次啦，还剩几次啦？打开 `坑娃.md` **预览模式**，一目了然！咋实现的呢？

也是两步走：先装好 [Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview) 插件，再来个页面如 `坑娃.md` 添加两段代码，一是统计次数，二是索引表格。

```javascript
//```dataviewjs
let total = 20  //课时数
let day = '2021-07-11'  //统计起始日期
let tag = "#书法"  //统计的标签
let folder = "9 日志"  //限定次文件夹下的标签
let shufu = dv.pages(tag)
	.where(
		t => t.file.name >= day
	)
	.where(
		t => t.file.folder.includes(folder)
	)
	.array().length
let res = "已学 "+shufu+" 次，还剩 "+(total-shufu)+" 次"
let resDay = "(于 "+ day +" 续费，共 "+total+"课时)"
dv.header(1,tag)
dv.header(2,res)
dv.paragraph(resDay)
//```
```

```javascript
//```dataview  
TABLE WITHOUT ID file.link AS "#书法",shufa AS ""  FROM #书法 AND "9 日志"
WHERE file.day >= date(2021-07-11)
sort file.name desc
//```
```