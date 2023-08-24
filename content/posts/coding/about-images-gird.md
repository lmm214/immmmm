---
title: "Hugo 多图排版这样来"
date: 2023-08-24T16:43:50+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/08/TinySnap-2023-08-24-17.08.16.webp
---

之前采用的是 [waterfall.js](https://github.com/raphamorim/waterfall.js) 和 [imgStatus.js](https://github.com/raphamorim/imgStatus) 方案，明显的一个弊端是得所有图片完全加载之后才会显示为瀑布流布局。

现已改用 `column-count` 和 `p:has(> img:nth-child）` 的纯 CSS 方案，代码少得不得了！

缺点呢，图片是从上往下、从左往右顺序排列，会导致各列高度明显不一致。试用之后，可以接受！

<!--more-->

### 效果如下

#### 两张

![](https://cn.bing.com/th?id=OHR.SessileOaks_EN-US1487454928_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.InscriptionWall_EN-US1392173431_1280x768.jpg)

#### 三张

![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.RumeliHisari_EN-US4800002879_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.BisonWindCave_EN-US4537340482_1280x768.jpg)

#### 四张

![](https://cn.bing.com/th?id=OHR.Umschreibung_EN-US4693850900_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.HummockIce_EN-US4606231645_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.Breckenridge_EN-US4460042968_768x1280.jpg)

#### 更多图片横竖随机

同样会出现各列高度不一致的情况，但可以接受。

![](https://cn.bing.com/th?id=OHR.Breckenridge_EN-US4460042968_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.BisonWindCave_EN-US4537340482_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.Umschreibung_EN-US4693850900_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.SessileOaks_EN-US1487454928_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.RumeliHisari_EN-US4800002879_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.InscriptionWall_EN-US1392173431_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.HummockIce_EN-US4606231645_768x1280.jpg)

#### 突破文章宽度，全屏展示图片

结合 Hugo 短代码实现（已人工调顺序，所以整齐了）。

{{< fullscreen >}}
![](https://cn.bing.com/th?id=OHR.Breckenridge_EN-US4460042968_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.BisonWindCave_EN-US4537340482_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.SessileOaks_EN-US1487454928_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.Umschreibung_EN-US4693850900_768x1280.jpg)
![](https://cn.bing.com/th?id=OHR.RumeliHisari_EN-US4800002879_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.InscriptionWall_EN-US1392173431_1280x768.jpg)
![](https://cn.bing.com/th?id=OHR.HummockIce_EN-US4606231645_768x1280.jpg)
{{< /fullscreen >}}

### 折腾三步曲

#### 编辑器内如下格式插入图片即可

图片之间 **可以换行但不空行** ，这样 CSS 会匹配到 p 元素内有几个 img 标签，就显示几列一行。

提醒，图片少的时候一般都是横的和横的一行，竖的管竖的。当然，如果多了，也可以不管不顾，随便排。

![TinySnap-2023-08-24-17.08.16](https://r2.immmmm.com/2023/08/TinySnap-2023-08-24-17.08.16.webp)

#### 相关 CSS 丢入主题

其中 `.post-content` 需匹配自己主题。

```css
.post-content p:has(> img:nth-child(2)){column-count:2;column-gap:8px;margin:6px 0;}
.post-content p:has(> img:nth-child(3)){column-count:3;}
.post-content p:has(> img:nth-child(4)){column-count:4;}
.post-content p:has(> img:nth-child(5)){column-count:5;}
.post-content p:has(> img:nth-child(6)){column-count:4;}
.post-content p:has(> img:nth-child(2)) img{display:inherit;}
.post-content p:has(> img:nth-child(6)) img{margin-bottom:8px;}
```

#### 进阶全屏图片短代码模版和 CSS 

可跳过。因为仅适合单栏主题。

其中的 `490px` 是这样计算出来的，主题的文章宽度为 `960px`，所以：`960/2 + 10`。

短代码模板：[shortcodes/fullscreen.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/fullscreen.html)

相关 CSS：

```css
.fullscreen{margin-left:calc(490px - 50vw);width:calc(100vw - 20px);column-count:4;column-gap:6px;}
.fullscreen img{display:inherit;margin-bottom:8px;}
@media (max-width: 980px){
	.fullscreen{margin-left: 0;width:auto;column-count:3;}
}
```

文章内容调用格式如图：

![TinySnap-2023-08-24-17.33.04](https://r2.immmmm.com/2023/08/TinySnap-2023-08-24-17.33.04.webp)