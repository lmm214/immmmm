---
title: "Hi，Obsidian"
date: 2021-08-05T21:34:39+0800
tags: [折腾]
feature: https://lmm.elizen.me/images/2021/07/obsidian-1.png
---

近一周频繁看到 [Obsidian](https://obsidian.md/) 的安利，原来是出了 iOS 端，而且功能几乎全支持。看了一圈教程和官方文档，嘿，不简单！

<!--more-->
### 坑娃需求

折腾一天，完美实现日常「坑娃」 需求：随时记录娃的培训，并能自动汇总。

日常使用流程：手机/电脑端创建 「日志」 ，在 `2021-08-05.md` 里加个 `#书法` 完事！学了几次啦，还剩几次啦？打开 `坑娃.md` 预览模式，一目了然！

![obsidian-2](https://lmm.elizen.me/images/2021/08/obsidian-2.png)

### 核心代码

`坑娃.md` 的代码是啥呢？是基于 [Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview) 插件的两段代码，前者统计次数，后者索引表格。

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

### 更多折腾

什么界面美化、参数配置、第三方插件调配，待续待续！

### 相关参考

[OBSIDIAN 的使用体验](https://pepcn.com/gtd/obsidian-de-shi-yong-ti-yan)：通俗易懂，值得细看。
[Obsidian 插件之 Dataview](https://zhuanlan.zhihu.com/p/373623264)：很多 DataviewJS 高级代码段。