---
title: '三步创建 Gridea 友情链接页'
date: 2020-01-02
tags: [折腾]
published: true
hideInList: false
feature: https://pic.edui.fun/images/2020/01/my-friends-5.jpg
isTop: false
---

围观地址：<https://i.immmmm.com/friends/> （[官方教程](https://gridea.dev/docs/theme-custom.html#%E6%95%B0%E7%BB%84%E7%B1%BB%E5%9E%8B%E9%85%8D%E7%BD%AE))

注：以下方法基于 Gridea v0.9+ ，相关代码以内置主题 notes 为例。

<!--more-->

### 一、添加自定义主题功能代码

![友链客户端](https://pic.edui.fun/images/2020/01/my-friends-2.png)

`themes/notes/config.json`，添加以下代码：

```js
//……
//"note": "UA-xxxxxxxxx-x"
//}, 添加逗号！！！
    {
      "name": "friends",
      "label": "友链",
      "group": "友链",
      "type": "array",
      "value": [],
      "arrayItems": [
        { "label": "名称", "name": "siteName", "type": "input", "value": "" },
        { "label": "链接", "name": "siteLink", "type": "input", "value": "" },
        { "label": "Logo", "name": "siteLogo", "type": "picture-upload", "value": "" },
        { "label": "描述", "name": "description", "type": "textarea", "value": "" }
      ],
      "note": ""
    }
//  ]
//}
```

保存，重启客户端，主题--自定义主题--友链。

### 二、创建自定义页面

`themes/notes/templates/post.ejs` 复制并重命名为 `friends.ejs`，替换成如下代码：

```html
<html>
  <head>
    <%- include('./includes/head', { siteTitle: `我的朋友们 | ${themeConfig.siteName}` }) %>
  </head>
  <body>
    <div class="main">
      <div class="main-content">
        <%- include('./includes/header') %>
        <div class="post-detail">
          <article class="post">
            <h2 class="post-title">我的朋友们</h2>

            <div class="post-content-wrapper">
              <div class="post-content">
              <% if (site.customConfig.friends) { %>
                <% site.customConfig.friends.forEach(function(friend) { %>
                  <div class="friend-box">
                    <img class="friend-avatar" src="<%= friend.siteLogo %>">
                    <div class="flink-info">
                      <a href="<%= friend.siteLink %>" target="_blank"><%= friend.siteName %></a>
                      <br/>
                      <%= friend.description %>
                    </div>
                  </div>
                <% }); %>
              <% } %>
              </div>
            </div>
          </article>
        </div>

        <%- include('./includes/footer') %>
      </div>
    </div>
  </body>
</html>
```

### 三、添加样式代码

![友链效果](https://pic.edui.fun/images/2020/01/my-friends-3.png)

`themes/notes/assets/styles/main.less`，添加以下代码：

```css
.friend-box {
  float: left;
  width: calc(50% - 20px);
  margin: 15px 10px;
  img.friend-avatar{
    width: 70px;
    height: 70px;
    border-radius: 50% !important;
    float: left;
    margin:0 15px 0 0 !important;
  }
  .flink-info{
    height:70px;
    overflow: hidden;
    line-height: 24px;
  }
}
```

### 结语

1、2、3，折腾起～
