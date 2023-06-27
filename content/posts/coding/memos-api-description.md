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

#### 指定用户

参数：`userId` 或 `openId`

早期个人的ID为 `101` ，现在新创建默认为 `1`

```
https://me.edui.fun/api/memo/amount?userId=102
```

<!--more-->

> 有了总条数，前端可以自行做分页加载处理。

### 时间戳列表

路径：`api/memo/stats`

#### 指定用户（必选）

参数：`creatorId`

```
https://me.edui.fun/api/memo/stats?creatorId=101
```

> 做个格子图？

### RSS 输出接口

路径：`/u/:id/rss.xml`

### Memos 列表

路径： `/memo` 或 `/memo/all`

前者需要指定参数 `creatorId`

#### 总列表

```
https://demo.usememos.com/api/memo?creatorId=101
https://demo.usememos.com/api/memo/all
```

#### 指定标签

参数：`tag`

```
https://me.edui.fun/api/memo?creatorId=101&tag=相册
https://me.edui.fun/api/memo/all?tag=相册
```

#### 指定条数

参数：`limit`

```
https://me.edui.fun/api/memo?creatorId=101&tag=相册&limit=1
https://me.edui.fun/api/memo/all?tag=相册&limit=1
```

#### 指定偏移

参数：`offset`

```
https://me.edui.fun/api/memo?creatorId=101&tag=相册&limit=1&offset=2
https://me.edui.fun/api/memo/all?tag=相册&limit=1&offset=2
```

> 利用 `limit=1` 、 `offset` 和总条数之间随机数，可实现调取随机一条 Memos 。

#### 调取部分 Memos

参数：`rowStatus`

```
https://me.edui.fun/api/memo?creatorId=101&rowStatus=NORMAL
```

加上 `rowStatus=NORMAL` 不用调取在归档里的 Memos 。


### Open API

参数：`openId`

```
https://demo.usememos.com/api/memo?openId=4D878AD599A6CCACD52C56753A36C4C7
```

> 此参数拥有最高权限，get、post 都可以。get 到的内容包括仅自己可见的内容。

#### 个人 Memos 总数

```
https://demo.usememos.com/api/memo/amount?openId=4D878AD599A6CCACD52C56753A36C4C7
```

### 个人标签列表

路径：`api/tag`

```
https://demo.usememos.com/api/tag?openId=4D878AD599A6CCACD52C56753A36C4C7
```

### 内置资源列表

路径：`api/resource`

```
https://demo.usememos.com/api/resource?openId=4D878AD599A6CCACD52C56753A36C4C7
```

#### 资源链接格式

网址+`o/r/`+`resourceId/`+`filename`，如：

```
https://me.edui.fun/o/r/167/iShot_2023-01-22_16.22.45.png
```

> 做个资源外链清单？

#### 发 Memos

```
POST https://demo.usememos.com/api/memo?openId=4D878AD599A6CCACD52C56753A36C4C7
Content-type: application/json
{
  "content": "Hello #memos from https://demo.usememos.com",
  "visibility": "PUBLIC",
  "resourceIdList" : []
}
```

参数：`content`

参数：`visibility`
- 值 `PUBLIC`（公开） `PRIVATE`（仅自己） `PROTECTED`（登录可见）

参数：`resourceIdList`
- 值是数组，上传图片之后的 resourceId。

