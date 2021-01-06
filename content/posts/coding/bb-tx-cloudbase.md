---
title: "哔哔 CloudBase"
date: 2020-12-27T23:58:17+0800
tags: [折腾]
feature: 
---

肝了一下午，顺利把 [哔哔](https://immmmm.com/bb/) 由 LeanCloud 迁移至腾讯 CloudBase ！页面打开、各端bb，飞起！

基本思路：[使用 HTTP 访问云函数](https://cloud.tencent.com/document/product/876/41776) 触发 [云函数](https://cloud.tencent.com/document/product/876/46798) 插入新哔哔到 [数据库](https://cloud.tencent.com/document/product/876/19362)，搞定！

### CloudBase 环境部署

参考  <https://twikoo.js.org/quick-start.html> 完成环境部署。

<!--more-->

### 旧数据转化

把 LC 上的评论导出并进行格式转化，形成如下格式，`from` 字段是我自己后来加的。

```
{"_id":"4ec5c2495fe84db1000046a47026ed51","from":"Alfred","content":"恶果之地得到各“金卡”莫名就通关+1","date":{"$date":"2020-12-27T07:38:10.844Z"}}
```

数据库 -- 新建集合，`talks` （当然可自定）导入json ，权限设为“所有用户可读，仅管理员可写“。

### html 显示代码

参考： <https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/bb.html>

修改其中的 环境id ，匹配自己的主题样式。

### 云函数代码

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
    //return event
    let apikey = event.queryStringParameters.key
    let content = ''
    if(serverkey == apikey ){
        const talksCollection = db.collection('talks')
        //提取消息内容，发送者，接受者，时间戳，消息类型，内容
        var CreateTime = Date.now(),
            Content = event.queryStringParameters.text,
            From = event.queryStringParameters.from
        if(Content == 'de'){ //内容为 de 则删除最新一条bb
            const res = await talksCollection.where({}).orderBy("date", "desc").limit(1).get()
            let deId = res.data[0]._id
            const resDe = await talksCollection.doc(deId).remove();
            if(resDe.hasOwnProperty('deleted')){
                content = '删除成功'
            }else{
                content = '删除失败'
            }
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

完成后，点击“文件 - 新建文件”，输入 package.json，回车，复制以下代码粘贴，点击“保存并安装依赖”。

```javascript
{
    "name": "bb",
    "version": "1.0.0",
    "main": "index.js",
    "dependencies": {"@cloudbase/node-sdk": "latest"}
}
```

### 开启 HTTP 访问服务

![bb-tx-1](https://lmm.elizen.me/images/2020/12/bb-tx-1.png)

环境 -- HTTP访问服务 -- 开启 -- 新建，路径与云函数名匹配。

现在可以点开看一下：

```html
https://你后台显示的.ap-shanghai.app.tcloudbase.com/bb
```

提示 `key不匹配`，阶段性成功！

### 构建 http 请求

```html
https://你后台显示的.ap-shanghai.app.tcloudbase.com/bb?key=云函数里设置的&from=自己发挥一个&text=哔哔的内容
```

http 加了3个参数， `key` `from` `text` ，浏览器一发，搞定！

### 几句后话

发图行不行，应该行！

多用户行不行，应该行！

可，文档太水，再看看再看看！