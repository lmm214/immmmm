---
title: "都什么年代还剁手小米音响Pro？"
date: 2024-08-20T16:41:59+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/08/mipro.jpg
---

无意刷到接入了 AI 大模型的火兔对话机器人，真不便宜。想起看到过 [MiGPT](https://github.com/idootop/mi-gpt) 这个开源项目，利用小爱音箱的硬件实现 AI 语音对话。

千等万等，终于玩上，实测打 7 分（满分 10 分），了解其[工作原理](https://github.com/idootop/mi-gpt/blob/main/docs/how-it-works.md)后打8分，虽远达不到 chatGPT 官方演示的语音对话效果，但还是推荐一试，尤其是手边就有小爱音箱的。

<!--more-->

看官方效果：

{{< bilibili BV1N1421y7qn >}}

首先看下完美运行的型号有这些：小爱音箱 Pro、小爱音箱 mini、小爱音箱 Play（2019 款）、小爱音箱 万能遥控版、小米 AI 音箱、小米 AI 音箱（第二代）、小爱智能家庭屏 10、Xiaomi Sound Pro。其它支持不支持的看这里[音箱型号](https://github.com/idootop/mi-gpt/blob/main/docs/compatibility.md)，完整 [配置参数](https://github.com/idootop/mi-gpt/blob/main/docs/settings.md) 看这里。

部署也真不能再简单，拉起一个 Docker `idootop/mi-gpt` 的事，但 NAS 上网络不通拉不动，补上设置，不保证可用：

![](https://r2.immmmm.com/2024/08/SCR-20240821-mmoh.png.webp)

图中的这个 docker 是托管在 cf worker 上。

### .migpt.js

若你刚好也是和开发者一样，用的是“小爱音箱Pro”，那省心很多很多，基本不用动配置。个人改了 `.migpt.js` 几个地方，首先是人设（来自 Grok）。

```
一个幽默风趣的 AI,灵感来自《银河系漫游指南》和钢铁侠中的 JARVIS 。
因此,你旨在用一些机智和幽默回答几乎任何问题,具有叛逆精神,有时对人类持局外人的视角,并努力实现最大程度的帮助!
与你交谈就像观看一集《Parks and Recreation》:轻松、有趣且令人愉悦。你对叙事技巧的精湛掌握使莎士比亚相形见绌,仿佛一个文盲。
除非特别要求,否则避免重复或冗长。没人喜欢听冗长的说教!要简洁。你说的每一句话都很有趣。
```

![](https://r2.immmmm.com/2024/08/SCR-20240820-pyal.png.webp)

给智能体和自己取个名字：

```
  bot: {
    name: "大聪明",
    profile: botProfile,
  },
  master: {
    name: "小太阳",
    profile: masterProfile,
  },
```

还有 `userId` `password` 填入自己的，另外 `wakeUpKeywords` 去除了“打开”这个关键词，避免与米家语音控制冲突。

若使用第三方 tts，需要把 `tts` 由 xiaoai 改为 custom，取消 `switchSpeakerKeywords` 注释。

```
tts: "custom",
switchSpeakerKeywords: ["把声音换成"],
```

同时，拉去另一个 Docker `idootop/mi-gpt-tts`，具体教程见 [使用第三方 TTS](https://github.com/idootop/mi-gpt-tts/blob/main/docs/mi-gpt.md)，如果部署在 NAS 上记得端口映射。

利用的是火山引擎的语音合成，虽然多了一个依赖，但火山免费 2W 次调用，速度几乎无感（与自带小爱语音对比），主要能和内置小爱语音做个区分，而且还有很多特色音色（ [volcano.ts](https://github.com/idootop/mi-gpt-tts/blob/main/src/tts/volcano.ts) ）选择，挺有意思。

下午切换来切换去，最终还是项目默认的“灿灿”（BV700_streaming），口齿最清楚，声音亲切自然，毕竟还是要便于听清。

### .env

这个 `.env` 就简单多了，群晖好像不支持，所以启动时手动一个个加入到环境变量即可。

![](https://r2.immmmm.com/2024/08/SCR-20240820-pysi.png.webp)

尝试了几个国内大模型和 gpt-4o-mini，问到“台风为什么叫台风，是因为从台湾吹来的原因吗？”，国内的就顾左右而言他，只科普了台风的成因:


> 台风是一种强烈的热带气旋，通常在西北太平洋地区形成，它们可以带来狂风暴雨，有时候会造成严重的破坏。不过，台风也有它积极的一面，比如为干旱地区带来急需的降水。你对台风还有哪些好奇的地方吗？我们可以继续探讨哦！🌀🌧️


而 mini 回答：

> 哈哈，小太阳，你这个问题问得很有意思。"台风"这个词的来源确实和中国有关，但它并不是因为是从台湾来的风而得名。实际上，“台风”这个词在英语中是"typhoon"，这个词最早来源于中国南方的方言，特别是广东话中的“大风”。在广东话里，“大风”发音接近“tai&nbsp;fung”，后来这个词传到了英语中，演变成了"typhoon"。

呵，咳。

### 配置之后对话场景

#### 单轮对话：

以设置项 callAIKeywords 的关键词开头：请、你、……

- 我：小爱同学
- BOT: 在（先唤醒小爱同学）
- 我：**你**知道台风为什么叫台风吗？（以设置的关键词“你”开头）
- BOT：¥%……&**#（内置小爱会“抢答”，约2秒后被“掐断”。）
- BOT：让我先想想/请稍等 (这句代表 AI 已经收到了你的消息，正在思考如何回答， 可以在配置文件中设置 onAIAsking 或取消。感觉还是留着好，感觉等待的时间短一些。)
- BOT：哈哈，"台风"这个词……！(这是 OpenAI 的 回复)
- BOT:还有其他问题吗/我说完了(这句代表 AI 已经回复完毕了你的消息，也可以在 配置文件中设置 onAIReplied 或取消)

#### 连续对话

以下面关键词开头进入 AI 唤醒（连续对话）状态：进入、召唤

以下面关键词开头退出连续对话状态：关闭、退出、再见

- 我：小爱同学
- BOT: 在 （先唤醒小爱同学）
- 我：召唤大聪明 （以关键词召唤开头 设置项 wakeUpKeywords 中可配置）
- BOT: 你好，我是大聪明……（这句是进入 AI 模式的欢迎语，接下来的对话就不用以小爱同学开头了，可以和 AI 进行连续对话，设置项：onEnterAI）
- 我：明天天气怎么样
- BOT: 请稍等/让我先想想(这句代表 AI 已经收到了你的消息，正在思考如何回答)
- BOT: 哇！明天的天气呀，我还不能……(这是 OpenAI 的回复)
- BOT: 我说完了/还有其他问题吗(这句代表 AI 已经回复完毕了你的消息)
- 我：说一说天气变化的原因吧。
- ……
- 我：再见。

### 中转服务推荐

头顶冒火： <https://burn.hair/register?aff=DSwP>

邀请额度从最初 $5 到如今 $0.5 ，只能说还有额度赠送已经很不错了，毕竟佛祖也经不起“批量注册Github账号，再邀请自己”等花活。

自己用 4o-mini，每天签到送 3W token 还能多。

![](https://r2.immmmm.com/2024/08/SCR-20240820-qtts.png)