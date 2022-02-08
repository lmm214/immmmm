---
title: 'VS Code 初体验'
date: '2020-04-04T20:50:00+08:00'
tags: [折腾]
feature: https://pic.edui.fun/images/2020/04/vscode-4.png
---

Visual Studio Code 久仰大名，但一直误认为是个臃肿大部头，毕竟是微软出品。 🙇

一试，直接拉取仓库开启 Git 同步，成了，满足本地码字同步而不用碰终端，不用碰终端，碰终端！

二试，使用 gpm 插件更能多仓库管理，也成了，好感爆棚。没遇到什么权限问题，应该是之前终端里配置过的关系。

再试，GitHub 网页上更改，VS 里拉取变更，丝滑，这下舒心到随心咯！

<!--more-->

### 下载： 

<https://code.visualstudio.com/>

### 插件：

- Chinese ：界面汉化
- Monokai Pro & GitHub Plus Theme：暗黑/明亮主题
- Material Icon Theme ：文件图标
- gpm ：多仓库管理
- Settings Sync :配置同步
- PicGo：图床
- Markdown All in One：快捷 md 格式化
- Auto Rename Tag：成对修改标签
- favorites：钉住文件或文件夹
- ……

### gpm 多仓库配置

![vscode-2](https://pic.edui.fun/images/2020/04/vscode-2.png)

填入远程仓库链接拉取到本地。

![vscode-3](https://pic.edui.fun/images/2020/04/vscode-3.png)

**按快捷键 `⌘ + enter`，一键推送到远程仓库。**

### 常用快捷键

|        快捷键        |       操作       |
| :------------------: | :--------------: |
|   `control + tab`    |     标签切换     |
|   `option + shift`   |      列选择      |
|       `⌘ + D`        | 选中多个相同字符 |
| `control + 鼠标点击` |     多行编辑     |

### Markdown All in One 快捷键

|        快捷键        |      操作       |
| :------------------: | :-------------: |
|       `⌘ + B`        |    **粗体**     |
|       `⌘ + I`        |     *斜体*      |
|      `Alt + S`       |    ~删除线~     |
| `option + Shift + ]` |  标题(uplevel)  |
| `option + Shift + [` | 标题(downlevel) |
| `option + Shift + F` | 文档自动格式化  |

### PicGo 快捷键

|      快捷键      |         操作         |
| :--------------: | :------------------: |
| `⌘ + option + U` |   从剪贴板上传图像   |
| `⌘ + option + E` | 从资源管理器上传图像 |
| `⌘ + option + O` |   从输入框上传图像   |

### 启用 Markdown 代码片段

![vscode-1](https://pic.edui.fun/images/2020/04/vscode-1.png)

`settings.json` 中添加 ：
```json
"[markdown]": {
    "editor.quickSuggestions": true
},
```

左下角--用户代码片段，添加：
```json
"new post": {
    "prefix": "post",
    "body": [
        "---",
        "title: \"${1:在此处添加标题}\"",
        "date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} +0800",
        "tags: [${2|折腾,日常,育人,日常|}]" 
        "---",
        "$0"
    ],
    "description": "新文章"
},
"more post": {
	"prefix": "mr",
	"body": [
		"<!--more-->"
	],
    "description": "more标签"
}
```

输入 `post` 按 Tab 快捷插入文章信息，再按 Tab 可选择标签，在 Tab 开始码字；

输入 `mr` ，快捷插入 `<!--more-->` 标签。

### 致谢

- [像写代码一样写作](https://www.codingyang.com/2020/03/codeEditer.html)
- [在 Visual Studio Code 中添加自定义的代码片段](https://blog.walterlv.com/post/add-custom-code-snippet-for-vscode.html)
- [Visual Studio Code 中文文档](https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/md/%E7%BC%96%E8%BE%91%E5%99%A8/%E5%9F%BA%E7%A1%80.html)
- [使用 VScode 插件 vs-picgo 传图到七牛云上](https://tophat.top/posts/51a82223.html)