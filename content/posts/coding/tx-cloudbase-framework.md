---
title: "腾讯 CloudBase ，开启一键部署"
date: 2021-01-09T22:26:22+0800
tags: [折腾]
feature: 
---

>一键部署按钮可以让公开的 Git 项目一键部署到云开发 CloudBase 上，大大简化用户部署的门槛，方便用户快速使用和体验应用。一键部署功能支持 Github，Gitlab，Coding，Gitee 等 Git 仓库地址。

利用 [CloudBase Framework](https://docs.cloudbase.net/framework/plugins/) 把应用配置写在一个 `cloudbaserc.json` 文件中，把这个配置和相关文件上传仓库，然后生成 [一键部署按钮](https://docs.cloudbase.net/framework/deploy-button.html#bu-shu-an-niu-shi-ru-he-gong-zuo-de) 。

比如 BBer 的 Git仓库目录：

```html
├── bber
│   ├── index.js
│   └── package.json
└── cloudbaserc.json
```

它的一键部署链接，其实就下面这句：

```html
https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/lmm214/bber&branch=main
```

<!--more-->

打开链接 Tcb 会根据 `cloudbaserc.json` 内的配置自动构建云函数、数据库、云存储等等内容。以 BBer 为例，能不能一键部署成功，还得~~看脸~~看配置文件：

```json
{
  "version": "2.0",  //一开始随后改成 1.0 悲催一整夜！
  "envId": "{{envId}}",  //2.0才能用这个动态变量 {{envId}}
  "functionRootPath": ".",  //根目录就一个点
  "functions": [
    {
      "name": "bber",
      "timeout": 30,
      "runtime": "Nodejs10.15",
      "memorySize": 128,
      "handler": "index.main"
    }
  ],
  "framework": {
    "name": "bber",
    "plugins": {
      "function": {  //部署云函数文件 index.js 和 package.json
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": ".",
          "functions": [{ //云函数名儿
              "name": "bber",
              "timeout": 30,
              "envVariables": {},
              "runtime": "Nodejs10.15",
              "memory": 128
          }],
          "servicePaths": { //开启http访问链接
            "bber": "/bber"
          }
        }
      },
      "client": {  //创建数据库集合
        "use": "@cloudbase/framework-plugin-database",
        "inputs": {
          "collections": [
            {
              "collectionName": "talks",  //集合名儿
              "aclTag": "ADMINWRITE"  //权限为所有人可读仅管理员可写
            }
          ]
        }
      }
    }
  }
}
```

更多其它插件看官方文档：[云开发 CloudBase 插件](https://docs.cloudbase.net/framework/plugins/)

好了，简简单单一个配置文件一个链接，把 BBer 应用需要的手动云函数、手动数据库、手动HTTP访问链接，一键部署！