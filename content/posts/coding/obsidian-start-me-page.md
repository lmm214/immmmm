---
title: "给 Obsidian 来个起始页"
date: 2021-08-21T10:30:03+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2021/08/obsidian-start-1.jpeg
---

为 [Dataview](https://github.com/blacksmithgu/obsidian-dataview) 插件献上鸡腿，利用其检索功能，让一切 OB 的使用情况「一目了然」！

<!-- more -->

{{< figure "https://pic.edui.fun/images/2021/08/obsidian-start-1.jpeg" "https://pic.edui.fun/images/2021/08/obsidian-start-2.jpeg" "起始页 By Dataview" >}}


代码块复制时删除 `dataview` 前的 `-`。

### 行代码

显示今天和去年当天日期，点击可快速跳转/创建日志。

```javascript
今日 `= "[["+date(today)+"]]"` ，去年 `= "[["+(date(today) - dur(1 years))+"]]"`
```

### 列表 list

显示文件夹 `0 收集` 文档列表，并按创建时间倒序排列。显示标签 `#doing` 文档列表。

```javascript
## 待读
-```dataview
list
from "0 收集"
sort file.ctime desc
-```

## 进行中
-```dataview
list
from #doing
sort file.ctime desc
-```
```

### 表格 table

显示 5条 最新编辑/创建的文档，并排除文件夹 `"10 归档"` 和 `"1 看板"` 按编辑/创建时间倒序排列。

```javascript
## 最近编辑
-```dataview
table WITHOUT ID file.link AS "标题",file.mtime as "时间"
from !"10 归档" and !"1 看板"
sort file.mtime desc
limit 5
-```

## 最近创建
-```dataview
table WITHOUT ID file.link AS "标题",file.ctime as "时间"
from !"10 归档" and !"1 看板"
sort file.ctime desc
limit 5
-```
```

### 高阶代码 dataviewjs

显示使用时间。代码思路：查询最早一篇文章日期，计算与当下的日期差。

```javascript
## 归档
-```dataviewjs
let ftMd = dv.pages("").file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
dv.paragraph(
	"距今已使用 "+total+" 天"
)
-```
```

统计文档、标签、任务数。代码说明，排除文件夹 `10 归档/Template` 。

```javascript
-```dataviewjs
let nofold = '!"10 归档/Template"'
let allFile = dv.pages(nofold).file
let totalMd = "共创建 "+
	allFile.length+" 篇文档"
let totalTag = allFile.etags.distinct().length+" 个标签"
let totalTask = allFile.tasks.length+" 个待办 <br><br>"
dv.paragraph(
	totalMd+"、"+totalTag+"、"+totalTask
)
-```
```

汇总全站标签和数量。

```javascript
-```dataviewjs
dv.paragraph(
  dv.pages("").file.etags.distinct()
  .sort(t => dv.pages(t).length , 'desc')
  .map(
  	t => {
		return `[${t}](${t})`+"("+dv.pages(t).length+")"
	}
  ).array().join(" ")
)
-```
```

归档每月文章数。排除文件夹 `Template` 和 `1 看板`。（更新 By @poet ）

```javascript
-```dataview
TABLE WITHOUT ID
    rows.file[0].cday.year + "年 " + rows.file[0].cday.month + "月" AS "月份",length(rows) + " 篇" AS "数量"
    where !contains(file.folder, "Template") and !contains(file.folder, "1 看板")
	GROUP BY file.cday.year + "年 " + file.cday.month + "月" AS "Group"
	SORT rows.file[0].cday DESC
-```
```

显示近2个月生日的人，从文件夹 `10 归档/People`

```javascript
## 近期生日
-```dataview
table WITHOUT ID file.link AS "姓名",birthday as "出生日期", ((date(today)-birthday).month + "天后") as 倒计, ((date(today)-birthday).year+1 + "岁") as 年龄
from "10 归档/People"
where birthday < date(today) + dur(2 months)
-```
```
