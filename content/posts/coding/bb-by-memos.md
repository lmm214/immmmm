---
title: "哔哔点啥 2.0 By Memos"
date: 2023-08-11T08:46:43+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/08/immmmm-com-bb2.png
---

在线围观：<https://immmmm.com/bb/>

「哔哔点啥」“溯源”一下，可能是少数派的 [「b 言 b 语」](https://sspai.com/post/60024) ，由于 LeanCloud 的拉胯，自己搞定了腾讯 CloudBase 和 [微信公众号 2.0 ](https://immmmm.com/bb-by-wechat-pro/) ，但 TCB 好好的羊毛不给薅了，哎。

现在，有了 Memos <https://usememos.com/> ，完美的平替，不，高替！

<!--more-->

💡 2023/08/11 更新：

- 支持 Twikoo 评论、内置 emaction 点赞插件；
- 新增 memo 中的标签可点击筛选；
- 新增进阶折腾，可开启「回忆」、「分类」、「搜索」、「设置」。

### 折腾前提

- 已部署 [Memos](https://immmmm.com/hi-memos/)
- 已部署 [Twikoo](https://twikoo.js.org/) 评论系统
- （可选，已内置）[emaction.cool](https://emaction.cool/) 类 Github 点赞插件

### 部署代码

#### HTML

```
<div id="bber"></div>
```

#### JS

```
<script type="module" src="https://immmmm.com/emaction.js?v=230811"></script>
<script src="https://fastly.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://fastly.jsdelivr.net/gh/Tokinx/ViewImage/view-image.min.js"></script>
<script src="https://fastly.jsdelivr.net/gh/Tokinx/Lately/lately.min.js"></script>
<script src="https://cdn.staticfile.org/twikoo/1.6.16/twikoo.all.min.js"></script>
<script type="text/javascript">
  var bbMemos = {
    memos : 'https://me.edui.fun/',//修改为自己部署 Memos 的网址，末尾有 / 斜杠
    limit : '',//默认每次显示 10 条
    creatorId:'' ,//早期默认为 101 用户，新安装是 1； https://demo.usememos.com/u/101
    domId: '',//默认为 bber
    twiEnv:'',//启开 twikoo 评论，默认 https://metk.edui.fun/
  }
</script>
<script src="https://immmmm.com/bb-lmm-mk.js?v=230811"></script>
```

#### CSS

样式代码已内置在 `bb-lmm-mk.js` 中。

### 进阶折腾

![immmmm-com-bb2-2](https://r2.immmmm.com/2023/08/immmmm-com-bb2-2.png)

- 回忆：返回随机一条 memo
- 搜索：需 api v1 支持
- 设置：前端设置 openid ，可对单条做简单管理（归档）

当然，也完全可以内置这些功能，但考虑到好几个小伙伴直接调取我的，所以做了入口分离，更通用些。

#### 开启：「回忆」、「搜索」、「设置」

找个地儿，插入如下 html 即可：

```
<span onclick="randomMemo()">回忆</span>
<span onclick="serchMemo()">搜索</span>
<span onclick="setOpenID()">设置</span>
```

### 进进阶折腾，开启「分类」

- 分类：调取 Memos 标签列表

由于标签列表是 **非公开** 的，如要 Fetch 到需要加上 openid，为了避免暴露，由此想到通过 Cloudflare Workers 中转一下，美滋滋。

#### 简单流程：

- 新建 Workers ，丢入完整代码，修改 `memos` 和 `openId`
- 给 Workers 绑定个域名
- 插入 html 代码，修改 `data-api`

#### html 代码

```
<span onclick="showTaglist(this)" data-api="https://api-memos.immmmm.com/">分类</span>
```

#### 完整 Workers 代码：

```
const memos = 'https://me.edui.fun/'
const openId = '96989db0-xxxxxx'

async function handleRequest(request) {
  let url = new URL(request.url)
  let typeName = url.pathname.substring(1) || ''
  let fetchUrl = memos+'api/v1/tag?openId='+openId;
  if(typeName == 'tags'){
    fetchUrl = memos+'api/v1/tag?openId='+openId
  }
  if(typeName == 'dele'){
    let cache = caches.default;
    cache.delete(request);
  }
  const requestHeaders = request.headers.get("Access-Control-Request-Headers");
  const requestMethod = request.headers.get("Access-Control-Request-Method");
  // 响应预检请求
  if (request.method == "OPTIONS") {
      return new Response('{"Access": "GET"}', {
          status: 200,
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": requestHeaders ? requestHeaders : "*",
              "Access-Control-Allow-Methods": requestMethod ? requestMethod : "*",
              "Access-Control-Expose-Headers": "*",
              "Access-Control-Max-Age": "86400",
              "Content-Type": "application/json"
          }
      });
  }
  // 处理正式请求
  const newRequest = new Request(fetchUrl, request);

  // 请求头删除来源
  newRequest.headers.set("referrer-policy", "no-referrer");
  newRequest.headers.delete("Referer");
  newRequest.headers.delete("Origin");
  // 发起请求
  const response = await fetch(newRequest, { cf: { cacheEverything: true } });

  const newResponse = new Response(response.body, response);
  // 处理响应
  newResponse.headers.delete("Access-Control-Allow-Credentials");
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("Access-Control-Allow-Headers", requestHeaders ? requestHeaders : "*");
  newResponse.headers.set("Access-Control-Allow-Methods", requestMethod ? requestMethod : "*");
  newResponse.headers.set('Access-Control-Expose-Headers', '*');
  newResponse.headers.set("Access-Control-Max-Age", "86400");
  newResponse.headers.set("Content-Type", "application/json");

  return newResponse;
}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})
```

#### Workers 功能说明

默认开启了缓存，访问下面地址可清除：

```
https://api-memos.immmmm.com/dele
```

代码里也留 `typeName` 判断，可输出更多需要 openid 的内容。