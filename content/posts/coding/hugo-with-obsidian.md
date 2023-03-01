---
title: "Hugo With Obsidian"
date: 2023-02-27T22:59:11+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/02/TinySnap-2023-02-27-23.41.05.png
---



本博客发文流程：vscode 中编写完 git push 到 Github 仓库，Cloudflare Pages 监测到变动即自动构建。

- Github 托管博客源码 [lmm214/immmmm (github.com)](https://github.com/lmm214/immmmm)
- Cloudflare Pages 构建 Hugo [《Hi , Cloudflare Pages》](https://immmmm.com/hi-cloudflare/)
- 本地使用 vscode 及 gpm 插件进行多仓库管理和本地调试 [《VS Code 初体验》](https://immmmm.com/use-visual-studio-code/)

试用了一周 Cloudflare R2 储存感觉良好，而原 uPic 和 vscode 中的 PicGo 插件一直连不上 R2，但在 Obsidian 安装插件之后体会到丝滑般的感受！

<!--more-->

继儿尝试 ob 是否可以直接 git push，看到这篇文章：[《Hugo 博客写作最佳实践》](https://blog.zhangyingwei.com/posts/2022m4d11h19m42s28/)

一试，完美！

### PicGo R2 配置

![iShot_2023-02-27_23.48.16.png](https://r2.immmmm.com/2023/02/iShot_2023-02-27_23.48.16.png)

使用 picgo-plugin-s3 插件，其中自定义节点 `https://xxxx.r2.cloudflarestorage.com` 无斜杠无桶名，自定义域名也是无斜杠。

另外 R2 里得允许公开访问。

### Ob 插件

- [Obsidian Git](https://github.com/denolehov/obsidian-git) 直接用 ob 打开 vscode 拉取到本地的仓库，记得在 `.gitignore` 中添加 `.obsidian` 避免把 ob 配置文件上传到仓库。
- [Obsidian Image Auto Upload Plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin/blob/master/readme-zh.md) 配合 PicGo Server 拖入、粘贴、快捷键随心插图
- [Templater Obsidian Plugin](https://github.com/SilentVoid13/Templater) 预设新建日志模板。

Templater 插件中打开 Enable Folder Templates，实现指定文件夹内创建的文件调用对应模板。

![iShot_2023-02-28_23.14.36.png](https://r2.immmmm.com/2023/02/iShot_2023-02-28_23.14.36.png)


```
---
title: "<% tp.file.cursor() %>"
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZZ") %>
tags: [折腾]
feature:
---
```


### 发布提交

![image.png](https://r2.immmmm.com/2023/02/20230227235558.png)

搞定！
