---
title: "Obsidian 一键剪藏 [WEB/iOS]"
date: 2021-08-13T13:32:50+0800
tags: [折腾]
---

### 效果

- Web 浏览到某篇文字时，点击 `书签` 即可存入 Obsidian 中（ 适用 iOS 的 Safari ）。
- iOS 需要粘贴内容、添加标签、语音闪记时，点击 `快捷指令` 即可存入 Obsidian 当日的日志中。

### Obsidian URI

[obsidian-web-clipper.js](https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3#file-obsidian-web-clipper-js) 基于自带的 [Obsidian URI](https://publish.obsidian.md/help-zh/%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95/%E4%BD%BF%E7%94%A8+obsidian+URI) 实现一键抓取保存，简单来说：复制js代码，修改 `库名称` `储存位置` 和 `默认标签`，再通过 [Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/) 转换并存为浏览器书签。

详细教程可参考 @scomper 的 [OBSIDIAN 网页采集脚本](https://pepcn.com/gtd/obsidian-wang-ye-cai-ji-jiao-ben) 。

<!--more-->

但，自带的 URI 仅支持 `new` `open` 和 `search` 三种模式。以上代码使用的是 `new`，所以，如果一不小心手抖了几下，就会存几个同样的 md 文件。

### Advanced Obsidian URI

上第三方插件 [Advanced Obsidian URI](https://github.com/Vinzent03/obsidian-advanced-uri)，利用它的 `overwrite` 模式解决（支持移动端），修改 [obsidian-web-clipper.js](https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3#file-obsidian-web-clipper-js) 最底下 `document.location.href` 那段。

```javascript
    /* 基于 Advanced Obsidian URI 插件*/
    document.location.href = "obsidian://advanced-uri?"
    + "filepath=" + encodeURIComponent(folder + fileName)
    + "&data=" + encodeURIComponent(fileContent)
    + vaultName + "&mode=overwrite" ;
```

### iOS 端

`全文收录 = 没有收录`，其实，大部分的记录都是碎片化的，这也是，移动端的优势。

{{< figure "https://pic.edui.fun/images/2021/08/obtd-1.jpeg" "https://pic.edui.fun/images/2021/08/obtd-2.jpeg" "https://pic.edui.fun/images/2021/08/obtd-3.jpeg" "iOS 快捷指令" >}}

iOS 快捷指令（个人修改版）：[Obsidian 日志](https://www.icloud.com/shortcuts/32e561fa74864666b79d820ad1567687)

都是 `append` 追加到当日的 md 文件，这样的好处是无需预设更通用。

（源代码参考：[obsidian一键摘录到今天日记](https://sharecuts.cn/shortcut/10357)、[obsidian语音闪录](https://sharecuts.cn/shortcut/10372)。另同作者作品：[obsidian摘录到任意笔记](https://sharecuts.cn/shortcut/10366)。）

### 后话


>Knowledge management 的关键是 knowledge，而不是 management。那些上周用印象笔记、这周用 Notion 、下周换成 Obsidian 、再下周换成 DEVONthink 的人，首要的问题不是 management不专精，而是大概率脑子里没啥 knowledge 。

呵，你真对！但，我乐意！
