---
title: "定时任务唤醒体验版实例失败"
date: 2020-05-12T22:12:52+0800
tags: [折腾]
feature: 
---

用了 [Valine](https://valine.js.org/) 十有八九也都部署了 [Valine Admin](https://github.com/DesertsP/Valine-Admin)，主要为了邮件通知。但最近 LeanCloud 应用日志一直报错：

```
self_wake !! {"error":"因流控原因，通过定时任务唤醒体验版实例失败，建议升级至标准版云引擎实例避免休眠 https://url.leanapp.cn/dwAEksv"}
```

![auto-deploy-1](https://lmm.elizen.me/images/2020/05/auto-deploy-1.png)

得手动进后台重启才行……

<!--more-->

经 @Dyxang 指导，使用 Github Action 来实现应用实例的定时自动部署及唤醒。

### 操作123

![auto-deploy-2](https://lmm.elizen.me/images/2020/05/auto-deploy-2.png)

1.生成 LeanCloud 应用的 `Deploy token`，暂存；

2.新建 Github 仓库，Settings - Secrets 添加一个名为 `DEPLOY_TOKEN` 的 secret，值为上一步的 `Deploy token`，继续点 `Actions -- New wordflow -- Set up a workflow yourself` ，添加如下代码，多个同时部署可参考：[leancloud-auto-deploy](https://github.com/lmm214/leancloud-auto-deploy/blob/master/.github/workflows/auto-deploy.yml):

```yml
# 定时重新部署，国际时间0点，即早上8点。
on:
  push:
  schedule:
    - cron: '0 0 * * *' 

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master

    ### 自定部署
    - name: Deploy to LeanEngine
      uses: enflo/curl-action@master
      with:
        curl: -X POST https://console.leancloud.app/1.1/engine/groups/web/production/version?gitTag=master&token=${{ secrets.DEPLOY_TOKEN }}

```

3.睡一觉，等待明早8点！