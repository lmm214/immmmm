---
title: "「哔哔点啥」微信公众号 2.0"
date: 2021-01-06T20:22:49+0800
tags: [折腾]
---

{{< figure "https://lmm.elizen.me/images/2020/05/bbds.png" "「哔哔点啥」微信公众号 2.0" >}}

原是发到 LeanCloud 平台，现 2.0 是发到 **「腾讯 CloudBase」** 。目前已支持用户名绑定、解绑、发文字、**发图片**、**批量删除**。

- /list - 查询最新9条
- /bb数字 - 删除第几条，如 /bb2
- /unbb - 撤销最新一条
- /unbb 数字 - 撤销最新几条，如 /unbb 2
- /nobody - 解除绑定
- /newbber KEY,HTTP访问地址 - 添加绑定

对，绑定只需要2个信息，一个自定义的 `KEY` 和 `云函数的http访问地址`

<!--more-->

### 腾讯 CloudBase 部署，获取环境ID

1.[注册云开发CloudBase](https://curl.qcloud.com/KnnJtUom)

2.进入[云开发控制台](https://console.cloud.tencent.com/tcb/)，新建环境，请按需配置环境

>提示：环境名称自由填写，推荐选择计费方式包年包月，套餐版本基础班 1，超出免费额度不会收费，如果提示选择“应用模板”，请选择“空模板”

3.进入[环境-登录授权](https://console.cloud.tencent.com/tcb/env/login)，启用“匿名登录”

4.进入[环境-安全配置](https://console.cloud.tencent.com/tcb/env/safety)，将网站域名添加到“WEB安全域名”

5.复制 `环境Id` 备用

### 新建数据库

![talks](https://lmm.elizen.me/images/2020/12/talks.jpg)

新建数据库集合，命名 `talks`，权限设置为 “所有用户可读，仅管理员可写”。

### 云函数部署

接着 [新建云函数](https://console.cloud.tencent.com/tcb/scf/index) ，函数名称 `bb` （可自定义），进入 `函数代码` 编辑节目，把以下代码丢入 `index.js`，然后确定。

```javascript
'use strict';
const serverkey = 'xxxx' //自定义api key
//引入模块
const tcb = require("@cloudbase/node-sdk");
//云开发初始化
const app = tcb.init({
  env: "bb-bbbb" //填入自己的环境ID
});
//数据库初始化
const db = app.database()

exports.main = async (event, context) => {
    let apikey = event.queryStringParameters.key
    let content = ''
    if(serverkey == apikey ){
        const talksCollection = db.collection('talks')
        //提取消息内容，发送者，接受者，时间戳，消息类型，内容
        var CreateTime = Date.now(),
            Content = event.queryStringParameters.text,
            From = event.queryStringParameters.from
        if(Content == '/list'){ //查询
            var resData = ''
            const res = await talksCollection.where({}).orderBy("date", "desc").limit(9).get().then((res) => {
                for(var i=1;i<=res.data.length;i++){
                    console.log(res.data[i-1]);
                    resData += '/bb'+i+' '+res.data[i-1].content+'\n'
                }
            });
            content = resData
        }else if(/^\/bb([1-9])$/.test(Content)){ //删除第几条
            let result = Content.match(/^\/bb([1-9])$/)
            let skipBb = result[1]-1
            const res = await talksCollection.where({}).orderBy("date", "desc").skip(skipBb).limit(1).get()
            let deId = res.data[0]._id
            //console.log('deId'+deId)4
            const resDe = await talksCollection.doc(deId).remove();
            content = '已删除第'+result[1]+ '条'
        }else if(Content == '/unbb' || Content.substr(0,5) == '/unbb'){ //删除哔哔
            let unNumb = 1
            if(/^\/unbb[, ]([1-9]\d*)$/.test(Content)){
                let result = Content.match(/^\/unbb[, ]([1-9]\d*)$/)
                unNumb = result[1]
            }
            for(var i=1;i<=unNumb;i++){
                    const res = await talksCollection.where({}).orderBy("date", "desc").limit(1).get()
                    let deId = res.data[0]._id
                    const resDe = await talksCollection.doc(deId).remove();
            }
            content = '已删除 '+unNumb+' 条'
        }else{
            var result = await talksCollection.add({content: Content, date: new Date(CreateTime), from: From})
            if(result.hasOwnProperty('id')){
                content = '发表成功'
            }else{
                content = '发表失败'
            }
        }
    }else{
        content = "key不匹配"
    }
    return {
        content
    };
}
```

完成后，点击“文件 - 新建文件”，输入 package.json，回车，复制以下代码粘贴，点击 `保存并安装依赖`。

```javascript
{
    "name": "bb",
    "version": "1.0.0",
    "main": "index.js",
    "dependencies": {"@cloudbase/node-sdk": "latest"}
}
```

### 开启 HTTP 访问服务,获取HTTP访问地址

![bb-tx-1](https://lmm.elizen.me/images/2020/12/bb-tx-1.png)

环境 -- HTTP访问服务 -- 开启 -- 新建，路径与云函数名匹配。

现在可以点开看一下：

```html
https://你后台显示的.ap-shanghai.app.tcloudbase.com/bb
```

提示 `key不匹配`，成功！留存此链接！！！

### 扫码，绑定

{{< figure "https://lmm.elizen.me/images/2020/05/bbds.png" "「哔哔点啥」微信公众号 2.0" >}}

```
/newbber YourKey,YourHTTP访问地址
```

飞起～

### 附赠 Alfred Workflow

其实公众号仅用作了转发文字内容，具体功能都是各自地方，好处是，访问以下格式链接也能用。

```html
https://你后台显示的.ap-shanghai.app.tcloudbase.com/bb?key=云函数里设置的&from=自己发挥一个&text=哔哔的内容
```

比如用 Alfred 的这个 [浮哔人生.alfredworkflow](https://github.com/lmm214/diybug/raw/main/%E6%B5%AE%E5%93%94%E4%BA%BA%E7%94%9F2.0.alfredworkflow)

![fbrs.png](https://lmm.elizen.me/images/2020/12/fbrs.png)

输入好对应的 HTTP访问地址、KEY ，输入 `b /unbb` 就能删除最新一条哔哔

![unbb](https://lmm.elizen.me/images/2020/12/unbb.jpg)