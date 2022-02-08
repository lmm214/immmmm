---
title: "利用「快捷指令」创建“透明”小组件"
date: 2020-10-06T16:27:30+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2020/10/transparent-widget.JPEG-webp
---

全“透明”占坑图！

### 快捷指令：用来切图

一个快捷指令搞定：「透明小组件」[(这里)](https://www.icloud.com/shortcuts/59062aac9ee241f0b14c9190b9ed09f5)

其实小组件就3个size，2x2、2x4、4x4，也就是小有6个不同位置、中有3个、大有2个，相对应做了下面3个快捷指令，运行后生成对应位置的背景图片，如小的就把背景图切成6张小图，分别是：上左、上右、中左、中右、下左、下右。

特别感谢 [@小悟空哥](https://sharecuts.cn/shortcut/8370) 和 [@mzeryck](https://github.com/mzeryck/Transparent-Scriptable-Widget) 分享的「快捷指令」和「Scriptable」代码。

<!--more-->

### 使用步骤：

准备：截个只有背景的图（编辑桌面滑到最右）；运行「快捷指令」切图。

添加小组件：

- 使用 **「Days Matter」** 创建小组件；
- 使用 **「Scriptable」** 创建小组件；

### Scriptable 代码分享

<https://github.com/lmm214/Scriptables>

![touming](https://pic.edui.fun/images/2020/10/touming.jpg)

`TouMing.js` 第一次运行会要求选择背景图片，多个位置可通过 **复制、重命名** 再选择。

`TouMingWttrInLine` 内置了 Wttr.In 天气数据。

`TouMingWeiBo` 基于 [@evilbutcher](https://github.com/evilbutcher/Scriptables) 修改。

### 一句啰嗦

刚发生所有小组件**字体**发虚，点击无法进入对应 APP，重启解决。