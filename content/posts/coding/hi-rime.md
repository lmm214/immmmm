---
title: "Hi，Rime"
date: 2023-04-30T08:43:20+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/04/rime.png
---

Long long ago，看到过这几个字符 「Rime」，但看到配置后就摊手说再见。

上周陆续从「[哔哔广场](https://immmmm.com/bbs/)」和博客订阅的 [Feed Bot](https://t.me/lmm214)  中再次看到，并没有第一时间折腾，直到看到这篇：[《Mark24Code/rime-auto-deploy》](https://github.com/Mark24Code/rime-auto-deploy) 

> 一个自用的脚本，帮助无痛快速安装、部署 Rime 输入法（中州韵、小狼毫，鼠须管）以及部署配置。

一试，one by one，顺畅~（不顺畅，大概率网络问题。）

<!--more-->

### 更多教程

Windows 系统推荐 @eallion 写的这篇 [Windows 安装 Rime 小狼毫五笔拼音输入法](https://eallion.com/weasel/) 。

iPhone  `仓输入法` ： [imfuxiao/Hamster](https://github.com/imfuxiao/Hamster) （[如何导入"雾淞拼音输入方案"](https://github.com/imfuxiao/Hamster/wiki/%E5%A6%82%E4%BD%95%E5%AF%BC%E5%85%A5%22%E9%9B%BE%E6%B7%9E%E6%8B%BC%E9%9F%B3%E8%BE%93%E5%85%A5%E6%96%B9%E6%A1%88%22)）

多端安装教程：[从 macOS 到 iPhone 全面拥抱 RIME 输入法 - Geek](https://x.geekbb.ml/RIME) 

雾凇拼音仓库： [iDvel/rime-ice: Rime 配置：雾凇拼音 | 长期维护的简体词库](https://github.com/iDvel/rime-ice) 

配置详解：[鼠须管输入法配置详解 - 三十年河東](https://ssnhd.com/2022/01/06/rime/)

### 实用技巧

`v 开头`，symbols 字符，可自定义。具体见 [symbols_v.yaml](https://github.com/iDvel/rime-ice/blob/main/symbols_v.yaml)。

![image.png](https://r2.immmmm.com/2023/05/20230502155915.png)

`u 开头`，两分拼字，弥补不知道拼音时的尴尬。😅

![iShot_2023-05-02_16.01.47.png](https://r2.immmmm.com/2023/05/iShot_2023-05-02_16.01.47.png)

`rq` `sj` `xq` `dt` `ts`，时间日期快捷输入。

```
date: rq       # 日期： 2022-11-29
time: sj       # 时间： 18:13
week: xq       # 星期： 星期二
datetime: dt   # ISO 8601： 2022-11-29T18:13:11+08:00
timestamp: ts  # 时间戳： 1669716794
```

### 个人配置

其实，最初安装 Rime 原动力来自于「微信输入法」的蓝皮肤 🤭

#### 启用微信蓝皮肤

`squirrel.custom.yaml` 文件内第 24、25行 `color_scheme: wechat_light`

#### 横竖排修改

同文件内，修改皮肤下的 `candidate_list_layout` 为 `stacked`，而不是 `style` 下的。

#### 自定义短语

修改 `custom_phrase.txt` 内容，可以清空换成自己的。

注意，短语和缩写之间是 Tab，不是空格。

```
林木木	lmm
https://immmmm.com	im
<!--more-->	mr
```

#### 去除双拼方案

`default.yaml` 只保留：

```
schema_list:
  - schema: rime_ice
```

根目录下 double 开头的文件也可以删去，去除之后 iPhone 加载输入法好似快了一点点。

#### 模糊音修改

`rime_ice.schema.yaml` 文件修改中。

### 图片备查

#### Rime 配置详解经典图

![rime-4.png](https://r2.immmmm.com/2023/05/rime-4.png)


#### 皮肤配色效果图

![rime-3.png](https://r2.immmmm.com/2023/05/rime-3.png)

#### 皮肤、文字横竖排效果预览

![rime-2.png](https://r2.immmmm.com/2023/05/rime-2.png)