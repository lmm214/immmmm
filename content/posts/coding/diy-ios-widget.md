---
title: "自制 iOS 小组件，随机显示一条 Memos"
date: 2024-11-25T22:42:06+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/11/Scriptable-2.jpg.webp
---

借助古早 Scriptable 玩了玩自制 iOS 小组件，实现随机显示一条 Memos。

<!--more-->

### 更多预览

![](https://r2.immmmm.com/2024/11/Picsew_20241127210242.jpg.webp)
![](https://r2.immmmm.com/2024/11/Picsew_20241127210258.jpg.webp)
![](https://r2.immmmm.com/2024/11/Picsew_20241127210232.jpg.webp)

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
//v2024.11.27晚 点击主体文字，跳转到 Memos 单条网页

let memosUrl = "https://me.edui.fun"
let memosUserID = "101"

// 刷新间隔时间，默认 60 分钟
const refreshInterval = 60
const widget = await createWidget()
let nextRefresh = Date.now() + 1000 * 60 * parseInt(refreshInterval)
widget.refreshAfterDate = new Date(nextRefresh)

Script.setWidget(widget)
Script.complete()

async function createWidget() {
  let widget = new ListWidget()
  const memosData = await getData()
  let memoOne = memosData[0];
  const wrap = widget.addStack()
  wrap.spacing = 5
  wrap.topAlignContent()

  if (memoOne.resourceList && memoOne.resourceList.length > 0 && 
config.widgetFamily != 'small') {
    wrap.layoutHorizontally()
    widget.setPadding(10, 10, 10, 10)

    const gradient = new LinearGradient();
    gradient.locations = [0, 1];
    gradient.colors = [new Color("#121212", 0.7), new Color("#212A37", 0.8)];
    widget.backgroundGradient = gradient;

    const column0 = wrap.addStack()
    column0.layoutVertically()

      let resourceList = memoOne.resourceList;
      let imgUrl = '',imgLink = '', fileId = '';
      let restype = resourceList[0].type.slice(0, 5);
      let resexlink = resourceList[0].externalLink;
      if (resexlink) {
        imgLink = resexlink
      } else {
        fileId = resourceList[0].id;
        if(resourceList[0].uid !== undefined){
          fileId = resourceList[0].uid
        }else if(resourceList[0].name !== undefined){
          fileId = resourceList[0].name+"?thumbnail=1"
        }
        imgLink = `${memosUrl}o/r/${fileId}`;
      }
      if (restype == 'image') {
          imgUrl = imgLink;
      }
      if (imgUrl) {
        let ImgStack = column0.addStack()
        const memoIMG = await new Request(imgUrl).loadImage();
        let imgCover = ImgStack.addImage(memoIMG)
        imgCover.leftAlignImage()
        imgCover.containerRelativeShape = true
        imgCover.applyFittingContentMode()
      }
  }else{
    wrap.setPadding(5, 0, 5, 0)

    const img = await new Request('https://api.dujin.org/bing/1366.php').loadImage();
    widget.backgroundImage = await shadowImage(img)
    
  }

  const column1 = wrap.addStack()
  column1.layoutVertically()

  let TimeStack = column1.addStack()
  TimeStack.topAlignContent()

  let memoTime = new Date(memosData[0].createdTs * 1000 - 5 ).toLocaleString()
  memoTime = memoTime.replace(/.{3}$/, '')
  let time = TimeStack.addText(memoTime)

  time.textColor = new Color("#ffffff")
  time.textOpacity = 0.7
  time.font = Font.lightSystemFont(14);
  time.font = Font.italicSystemFont(14);

  column1.addSpacer()

  let TAG_REG = /#([^#\s!.,;:?"'()]+)(?= )/g, 
    IMG_REG = /\!\[(.*?)\]\((.*?)\)/g,
    LINK_REG = /(?<!!)\[(.*?)\]\((.*?)\)/g,
    MD_LINK_REG = /\[([^\]]+)\]\(([^)]+)\)/g,
    LINE_REG = /\n/g;

  let openUrl = memosUrl+'/m/'+(memosData[0].uid || memosData[0].name || memosData[0].id)
  let addContent = memosData[0].content
    .replace(TAG_REG, "")
    .replace(IMG_REG, "")
    .replace(MD_LINK_REG, "$1");

  if(addContent.length > 100){
    addContent = addContent.slice(0,100)+"..."
  }

  let ContentStack = column1.addStack()
  ContentStack.centerAlignContent()
  ContentStack.url = openUrl

  let content = ContentStack.addText(addContent);
  content.font = Font.lightSystemFont(18)
  content.textColor = new Color("#ffffff")
  content.leftAlignText()
  //content.textOpacity = 0.88
  content.minimumScaleFactor = 0.8

  column1.addSpacer()

  let TagsStack = column1.addStack()
  TagsStack.bottomAlignContent()

  let tagArr = memosData[0].content.match(TAG_REG);
  let memosTag = '';
  if (tagArr) {
      memosTag = tagArr.map(t=>{
        return `${String(t)}`;
      }).join('');
  }else{
      memosTag = `#动态`;
  }

  let memostag = TagsStack.addText(memosTag)
  memostag.textColor = new Color("#ffffff")
  memostag.textOpacity = 0.7
  memostag.font = Font.lightSystemFont(14);
  memostag.lineLimit = 1

  return widget
}

async function getData(source) {
  var memosData
  let memosLength = `${memosUrl}/api/v1/memo/stats?creatorId=${memosUserID}`
  let memosDataLength = await new Request(memosLength).loadJSON()
  let randomNum = Math.floor(Math.random() * (memosDataLength.length - 1 ) )
  let memosapi = `${memosUrl}/api/v1/memo?creatorId=${memosUserID}&limit=1&offset=${randomNum}`
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
  ctx.setFillColor(new Color('#212A37', 0.8))
  ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
  return await ctx.getImage()
}

```