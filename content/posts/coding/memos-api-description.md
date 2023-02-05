---
title: "Memos API 非官方不完全说明"
date: 2023-02-04T22:51:55+0800
tags: [折腾]
---

官方源码见：<https://github.com/usememos/memos/tree/main/server>

### Memos 条数

路径：`api/memo/amount`

#### 总条数

```
https://me.edui.fun/api/memo/amount
```

结果：

{{< getdata "https://me.edui.fun/api/memo/amount" >}}

#### 指定用户

参数：`userId` 或 `openId`

早期个人的ID为 `101` ，现在新创建默认为 `1`

```
https://me.edui.fun/api/memo/amount?userId=102
```

结果：

{{< getdata "https://me.edui.fun/api/memo/amount?userId=102" >}}

<!--more-->

或使用个人的 `openId` 替代 `userId`  也可以。

```
https://demo.usememos.com/api/memo/amount?openId=33AA158E1AC4E3FDACD8BFCEBE6421C9
```

结果：

{{< getdata "https://demo.usememos.com/api/memo/amount?openId=33AA158E1AC4E3FDACD8BFCEBE6421C9" >}}

> 有了总条数，前端可以自行做分页加载处理。

### 标签列表

路径：`api/tag`

```
https://demo.usememos.com/api/tag
```

结果：

{{< getdata "https://demo.usememos.com/api/tag" >}}

### 时间戳列表

路径：`api/memo/stats`

#### 指定用户（必选）

参数：`creatorId`

```
https://me.edui.fun/api/memo/stats?creatorId=101
```

结果：

{{< getdata "https://me.edui.fun/api/memo/stats?creatorId=101" >}}

> 做个格子图？

### 内置资源列表

路径：`api/resource`

```
https://me.edui.fun/api/resource
```

结果：

{{< getdata "https://me.edui.fun/api/resource" >}}

#### 资源链接格式

网址+`o/r/`+`resourceId/`+`filename`，如：

```
https://me.edui.fun/o/r/167/iShot_2023-01-22_16.22.45.png
```

> 做个资源外链清单？

### RSS 输出接口

路径：`/u/:id/rss.xml`

### Memos 列表

路径： `/memo` 或 `/memo/all`

#### 总列表

```
https://demo.usememos.com/api/memo
https://demo.usememos.com/api/memo/all
```

结果：

{{< getdata "https://demo.usememos.com/api/memo" >}}
{{< getdata "https://demo.usememos.com/api/memo/all" >}}


#### 指定标签

参数：`tag`

```
https://me.edui.fun/api/memo?tag=相册
https://me.edui.fun/api/memo/all?tag=相册
```

结果：

{{< getdata "https://me.edui.fun/api/memo?tag=相册" >}}
{{< getdata "https://me.edui.fun/api/memo/all?tag=相册" >}}

#### 指定条数

参数：`limit`

```
https://me.edui.fun/api/memo?tag=相册&limit=1
https://me.edui.fun/api/memo/all?tag=相册&limit=1
```

结果：

{{< getdata "https://me.edui.fun/api/memo?tag=相册&limit=1" >}}

#### 指定偏移

参数：`offset`

```
https://me.edui.fun/api/memo?tag=相册&limit=1&offset=2
https://me.edui.fun/api/memo/all?tag=相册&limit=1&offset=2
```

结果：

{{< getdata "https://me.edui.fun/api/memo?tag=相册&limit=1&offset=2" >}}

> 利用 `limit=1` 、 `offset` 和总条数之间随机数，可实现调取随机一条 Memos 。

#### 指定用户

参数：`creatorId`

```
https://me.edui.fun/api/memo?tag=相册&limit=1&offset=2&creatorId=101
```

结果：

{{< getdata "https://me.edui.fun/api/memo?tag=相册&limit=1&offset=2&creatorId=101" >}}

> 路径 `all` 下参数 `creatorId` 无效。

#### 调取部分 Memos

参数：`rowStatus`

```
https://me.edui.fun/api/memo?creatorId=101&rowStatus=NORMAL
```

加上 `rowStatus=NORMAL` 不用调取在归档里的 Memos 。


#### 调取不公开 Memos

```
https://me.edui.fun/api/memo?openId=xxxxxx
https://me.edui.fun/api/memo?openId=xxxxxx&rowStatus=NORMAL&tag=%E6%97%A5%E5%AD%90
```
