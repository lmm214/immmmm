---
title: "自制 iOS 小组件，随机显示一条 Memos"
date: 2024-11-25T22:42:06+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/11/Scriptable-2.jpg.webp
---

借助古早 Scriptable 玩了玩自制 iOS 小组件，实现随机显示一条 Memos。

<!--more-->

### 简要步骤

iPhone 上下载 [Scriptable](https://apps.apple.com/cn/app/scriptable/id1405459188) App（需 iOS14+）.

打开App，点击右上角 + 号，复制代码，修改个人信息，保存。

长按桌面，添加组件，选择 Scriptable，然后点击组件配置，选择刚刚保存的脚本即可.

### 注意事项

注意：基于 Memos v0.18 api v1 借口.

自行测试如下链接是否有数据返回，再使用。

```
https://me.edui.fun/api/v1/memo/stats?creatorId=101
https://me.edui.fun/api/v1/memo?creatorId=101&limit=1&offset=3
```

### 代码如下

修改前两行的个人信息。

```javascript
var memosUrl = "https://me.edui.fun/api/v1/memo"
var memosUserID = "101"

const memosData = await getData()
const widget = await createWidget()
widget.setPadding(10, 10, 10, 10)

//const gradient = new LinearGradient();
//gradient.locations = [0, 1];
//gradient.colors = [new Color("#121212", 0.7), new Color("#212A37", 0.8)];
//widget.backgroundGradient = gradient;

const img = await new Request('https://bing.ee123.net/img/?&size=800x480').loadImage();
widget.backgroundImage = await shadowImage(img)

Script.setWidget(widget)
Script.complete()

async function createWidget() {
  let w = new ListWidget()

  let memoTime = new Date(memosData[0].createdTs * 1000 - 5 ).toLocaleString()
  let time = w.addText(memoTime)
  time.textColor = new Color("#ffffff")
  time.textOpacity = 0.7
  time.font = Font.lightSystemFont(14);

  w.addSpacer();

  let TAG_REG = /#([^#\s!.,;:?"'()]+)(?= )/g, 
    IMG_REG = /\!\[(.*?)\]\((.*?)\)/g,
    LINK_REG = /(?<!!)\[(.*?)\]\((.*?)\)/g,
    LINE_REG = /\n/g;

  let addContent = memosData[0].content
    .replace(TAG_REG, "")
    .replace(IMG_REG, "");

  if(addContent.length > 140){
    addContent = addContent.slice(0,140)+"..."
  }

  let heading = w.addText(addContent);
  heading.font = Font.lightSystemFont(16)
  heading.textColor = new Color("#ffffff")
  heading.leftAlignText()
  heading.textOpacity = 0.88
  heading.minimumScaleFactor = 0.5

  w.addSpacer();

  const footerStack = w.addStack();
  footerStack.bottomAlignContent();

  const profileStack = footerStack.addStack();
  profileStack.topAlignContent();

  profileStack.addSpacer(10);

  const nameStack = profileStack.addStack();
  nameStack.layoutVertically();

  let tagArr = memosData[0].content.match(TAG_REG);
  let memosTag = '';
  if (tagArr) {
      memosTag = tagArr.map(t=>{
        return `${String(t)}`;
      }).join('');
  }else{
      memosTag = `#动态`;
  }

  const memostag = nameStack.addText(memosTag);
  memostag.textColor = new Color("#ffffff")
  memostag.textOpacity = 0.7
  memostag.font = Font.lightSystemFont(14);
  memostag.lineLimit = 1

  footerStack.addSpacer();


  return w
}

async function getData(source) {
  var memosData
  let memosLength = `${memosUrl}/stats?creatorId=${memosUserID}`
  let memosDataLength = await new Request(memosLength).loadJSON()
  let randomNum = Math.floor(Math.random() * (memosDataLength.length - 1 ) )
  let memosapi = `${memosUrl}?creatorId=${memosUserID}&limit=1&offset=${randomNum}`
  try {
      memosData = await new Request(memosapi).loadJSON()
  } catch (error) {
      console.error(error);
  }
  return memosData
}


async function shadowImage (img) {
  let ctx = new DrawContext()
  ctx.size = img.size
  ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
  ctx.setFillColor(new Color('#000000', 0.4))
  ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
  return await ctx.getImage()
}
```