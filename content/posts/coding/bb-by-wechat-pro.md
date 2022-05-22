---
title: "「哔哔点啥」微信公众号 2.0"
date: 2021-01-06T20:22:49+0800
tags: [折腾]
toc: true
---

{{< figure "https://pic.edui.fun/images/2020/05/bbds.png" "「哔哔点啥」微信公众号 2.0" >}}

原是发到 LeanCloud 平台，现 2.0 是发到 **「腾讯 CloudBase」** 。目前已支持用户名绑定、解绑、发文字、**发图片**、追加、合并、删除、替换文字，还有显示**哔哔列表**、**哔哔搜索**！

> `/l` - 显示最近哔哔
> 
> `/s 关键词` - 搜索相关哔哔
> 
> `/a 文字` - 追加文字到第1条
> 
> `/a数字 文字` - 追加文字到第几条，如 /a2 文字
> 
> `/c` - 合并前2条
> 
> `/c数字` - 合并前几条，如 /c3
> 
> `/d` - 删除第1条
> 
> `/d数字` - 删除第几条，如 /d2
> 
> `/e 文字`- 编辑替换第1条
> 
> `/e数字 文字` - 编辑替换第几条，如 /e2 文字
> 
> `/f数字` - 批量删除前几条，如 /f2
> 
> `/nobber` - 解除绑定
> 
> `/bber KEY,HTTP访问地址` - 添加绑定

对，绑定只需要2个信息，一个自定义的 `KEY` 和 `云函数的http访问地址`

<!--more-->

### 日常使用截图

> 使用 /a 命令给图片追加个文字，真香！

{{< figure "https://pic.edui.fun/images/2020/12/bber-1.PNG" "https://pic.edui.fun/images/2020/12/bber-2.PNG" "「哔哔点啥」操作截图-1">}}

{{< figure "https://pic.edui.fun/images/2020/12/bber-3.jpg" "https://pic.edui.fun/images/2020/12/bber-4.jpg" "「哔哔点啥」操作截图-2">}}

### 一键部署及绑定

1.点击以下按钮将 BBer 一键部署到云开发

<a rel="link" href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&amp;appUrl=https%3A%2F%2Fgithub.com%2Flmm214%2Fbber&amp;branch=main"><img class="avatar" loading="lazy" src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg" alt=""></a>

2.进入[环境-登录授权](https://console.cloud.tencent.com/tcb/env/login)，启用“匿名登录”

3.进入[环境-安全配置](https://console.cloud.tencent.com/tcb/env/safety)，将博客网址添加到“WEB安全域名”

4.进入[环境-HTTP访问服务](https://console.cloud.tencent.com/tcb/env/access)，复制链接备用。

![bber-11](https://pic.edui.fun/images/2020/12/bber-11.png)

5.进入[云函数](https://console.cloud.tencent.com/tcb/scf/index)，修改自定义apikey `bber` 并保存备用。

![bber-10](https://pic.edui.fun/images/2020/12/bber-10.png)

6.扫码进入公众号，输入命名绑定：

```
/bber bber,https://你的云函数HTTP访问地址/bber
```

>注明：一键部署虽然方便，但是仅支持按量计费环境，当然大多数（日访问量10000-）是够用的。如果您希望，当免费资源用尽时，不产生费用请使用手动部署。

------

### 前端部署

```html
<div id="bber"></div>
<script src="https://imgcache.qq.com/qcloud/cloudbase-js-sdk/1.4.0/cloudbase.full.js"></script>
<script src="https://fastly.jsdelivr.net/gh/buddys/qq-wechat-emotion-parser@master/dist/qq-wechat-emotion-parser.min.js"></script>
<script>
  const app = tcb.init({
      env: 'bb-123xx', //这里是你的环境id
      //region: "ap-guangzhou"
  })
</script>
<script type="text/javascript" src="https://fastly.jsdelivr.net/gh/lmm214/bber@0.0.5/bber.js"></script>
```

```html
<style>
  .timeline ul {margin:0;}
  .timeline ul li {background:#3b3d42;list-style-type:none;position:relative;width:3px;margin-left:2em;padding:0.8em 0 2em;}
  .timeline ul li::after {transform: rotate(45deg);content:'';background-color: #3b3d42;display: block;position: absolute;top: 10px;left: -5px;width: 0.8em;height: 0.8em;outline: 15px solid #fff;}
  .timeline ul li div {position:relative;top:-13px;left:3em;width:670px;padding:0px 16px 0px;}
  .timeline ul li p.datatime{color: #fafafa;font-size: 0.75em;font-style: italic;background-color: #3b3d42;display: inline-block;padding:0.25em 1em 0.2em 1em;}
  .timeline ul li p.datacont{margin:0.65em 0 0.3em;}
  .timeline ul li p.datacont img{display:block;width:100%;}
  .timeline ul li p.datacont img[src*="emotion"]{display:inline-block;width:auto;}
  .timeline ul li p.datafrom{color: #aaa;font-size: 0.75em !important;font-style: italic;}
  .timeline ul li p{margin:0;font-size:16px;letter-spacing:1px;color: #3b3d42;}
  button{border-radius:0;}
  .dark-theme .timeline ul li div p{color:#fafafa;}
  .dark-theme .timeline ul li div p svg{fill:#fafafa;}
  .dark-theme .timeline ul li p.datafrom{color: #aaa;}
  .dark-theme .timeline ul li{background:#3b3d42;}
  .dark-theme .timeline ul li::after{outline: 15px solid #292a2d;}
  @media (max-width:860px) {
    .timeline ul li{margin-left:0;}
    .timeline ul li div{width:calc(100vw - 75px);left:30px;}
  }
</style>
```

具体页面参考 [bb.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/bb.html)

------

### 手动部署：创建应用

1.[注册云开发CloudBase](https://curl.qcloud.com/KnnJtUom)

2.进入[云开发控制台](https://console.cloud.tencent.com/tcb/)，新建环境，请按需配置环境

>提示：环境名称自由填写，推荐选择计费方式包年包月，套餐版本基础班 1，超出免费额度不会收费，如果提示选择“应用模板”，请选择“空模板”

>推荐创建上海环境。如选择广州环境，需要在 twikoo.init() 时额外指定环境 region: "ap-guangzhou"

3.进入[环境-登录授权](https://console.cloud.tencent.com/tcb/env/login)，启用“匿名登录”

4.进入[环境-安全配置](https://console.cloud.tencent.com/tcb/env/safety)，将网站域名添加到“WEB安全域名”

5.进入[数据库](https://console.cloud.tencent.com/tcb/db/)，新建数据库集合，命名 `talks`，权限设置为 “所有用户可读，仅管理员可写”。

![talks](https://pic.edui.fun/images/2020/12/talks.jpg)

### 手动部署：云函数部署

1.接着 [新建云函数](https://console.cloud.tencent.com/tcb/scf/index) 

函数名称 `bber` （可自定义），进入 `函数代码` 编辑，复制 [index.js](https://github.com/lmm214/bber/blob/main/bber/index.js) 代码丢入 `index.js`，然后确定。

2.点击“文件 - 新建文件”，复制 [package.json](https://github.com/lmm214/bber/blob/main/bber/package.json) 代码丢入 `package.json`，点击 `保存并安装依赖`。

3.进入[环境-HTTP访问服务](https://console.cloud.tencent.com/tcb/env/access)，新建，路径与云函数名匹配。

![bb-tx-1](https://pic.edui.fun/images/2020/12/bb-tx-1.png)

现在点开看一下，提示 `key不匹配`，成功！

```html
https://你后台显示的.ap-shanghai.app.tcloudbase.com/bber
```

！！！**注意：第一时间修改云函数中 `bber` 这个预设的「自定义apikey」**！！！

### 扫码绑定

{{< figure "https://pic.edui.fun/images/2020/05/bbds.png" "「哔哔点啥」微信公众号 2.0" >}}

```
/bber bber,https://你的云函数HTTP访问地址/bber
```

**其实公众号仅用作了转发文字内容**，具体功能都是各自的云函数，好处是，直接浏览器访问以下链接、第三方能发起POST工具、iOS的快捷方式等都能调用！

```html
https://你后台显示的.ap-shanghai.app.tcloudbase.com/bber?key=云函数里设置的&from=自己发挥一个&text=哔哔的内容
```

### 旧数据转化

把 LC 上的评论导出并进行格式转化，形成如下格式，`from` 字段是我自己后来加的。

```
{"_id":"4ec5c2495fe84db1000046a47026ed51","from":"微信公众号","content":"恶果之地得到各“金卡”莫名就通关+1","date":{"$date":"2020-12-27T07:38:10.844Z"}}
```

### 附赠1: Alfred Workflow

[浮哔人生.alfredworkflow](https://github.com/lmm214/diybug/raw/main/%E6%B5%AE%E5%93%94%E4%BA%BA%E7%94%9F2.0.alfredworkflow)

![fbrs.png](https://pic.edui.fun/images/2020/12/fbrs.png)

输入好对应的 HTTP访问地址、KEY ，输入 `b /d` 就能删除最新一条哔哔

### 附赠2: BBer-weixin

点击以下按钮将 BBer-weixin 微信公众号后端，一键部署到云开发

<a rel="link" href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&amp;appUrl=https%3A%2F%2Fgithub.com%2Flmm214%2Fbber-weixin&amp;branch=main"><img class="avatar" loading="lazy" src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg" alt=""></a>

对接的微信公众号简要流程：

1.点击 [bber-weixin](https://console.cloud.tencent.com/tcb/scf/index) 云函数，右上角**【编辑】**，开启**【固定IP】**，留存**公网固定IP**。
<photos>![bbwx-1](https://pic.edui.fun/images/2020/12/bbwx-1.png)![bbwx-3](https://pic.edui.fun/images/2020/12/bbwx-3.png)![bbwx-2](https://pic.edui.fun/images/2020/12/bbwx-2.png)</photos>

2.进入[环境-HTTP访问服务](https://console.cloud.tencent.com/tcb/env/access)，获取`触发路径链接`并留存，如以下格式：

```html
https://bb-f5c0f-222222.ap-shanghai.app.tcloudbase.com/bber-weixin
```

3.打开 [微信公众平台](https://mp.weixin.qq.com/)，进入开发-基本配置，获取`AppID`和`AppSecret`留存，修改`IP白名单`为上一步的公网固定IP。继续服务器配置：

![bbwx-4](https://pic.edui.fun/images/2020/12/bbwx-4.png)

一个`URL`，即第2步留存的触发链接；

一个`Token`，预设为 `weixin`

**!!!先不点，不点，不点，不点提交！！！**

4.回 [bber-weixin](https://console.cloud.tencent.com/tcb/scf/index) 云函数，填入`微信公众号appid`、`微信公众号appsecret` 保存。

```javascript
const token = 'weixin' // 微信公众号的服务器验证用的令牌 token
//填入自己的微信公众号appid和appsecret
var wxappid = '微信公众号appid',
    wxappsecret = '微信公众号appsecret',
```

5.回 [微信公众平台](https://mp.weixin.qq.com/)，提交，验证成功！

6.回 [bber-weixin](https://console.cloud.tencent.com/tcb/scf/index) 云函数，注释第44行代码，保存。

```javascript
    if(tmpStr == signature){
        //请求来源鉴权
        //成功后注释下行代码
        //return event.queryStringParameters.echostr //成功后注释本行代码
        //成功后注释上行代码
```

7.手动配置或更新代码： <https://github.com/lmm214/bber-weixin/tree/main/bber-weixin>


