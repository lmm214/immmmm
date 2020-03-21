---
date: 2017-12-27
title: '自动识别外链并添加图标'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

效果测试：

[推特](https://twitter.com/) [微信](https://web.wechat.com/) [微博](https://weibo.com/) [脸书](https://www.facebook.com) [谷歌](https://www.google.com) [Github](https://github.com/) [豆瓣](https://movie.douban.com/) [V2EX](https://www.v2ex.com/) [知乎](https://www.zhihu.com/) [维基百科](https://zh.wikipedia.org) [简书](http://jianshu.io/) [优酷](http://youku.com/) [YouTube](https://www.youtube.com/)

功能代码来自： [@罗磊](https://github.com/foru17/Yasuko)

<!--more-->

代码是集成在 Ghost 主题里的，还做了一定的优化，我就比较粗暴，css、js 拿来之！

```css
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1451113484_260868.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1451113484_260868.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/font_1451113484_260868.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/font_1451113484_260868.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1451113484_260868.svg#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont{font-family:iconfont!important;font-size:16px;font-style:normal;display:inline-block;-moz-osx-font-smoothing:grayscale;speak:none;vertical-align:middle}
.iconfont:hover{opacity:.6;color:#363636}.iconfont.undefined{display:none!important}.iconfont-self{color:red}.iconfont-weibo{color:#e6162d}.iconfont-twitter{color:#2aa9e0}.iconfont-facebook{color:#204385}.iconfont-google{color:#176dee}.iconfont-wikipedia{color:#626262}.iconfont-weixin{color:#75d140}.iconfont-qzone{color:#186cc6}.iconfont-github{color:#333}.iconfont-douban{color:#279337}.iconfont-luolei{color:#6596c1}.iconfont-dribble{color:#f72d84}.iconfont-zhihu{color:#0767c8}.iconfont-instagram{color:#9b6954}.iconfont-v2ex{color:#1a1a1b}.icon-weibo-pure{color:#e6162d}.icon-twitter-pure{color:#2aa9e0}.icon-github-pure{color:#333}.icon-dribble-pure{color:#f72d84}.icon-weixin-pure{color:#75d140}.iconfont-jianshu{color:#e78170}.iconfont-youku{color:#06a7e1}.iconfont-youtube{color:#e52413}
.post-content .iconfont-local:before{content:'\0f00ac'}.post-content .iconfont-twitter:before{content:'\00e604'}.post-content .iconfont-wechat:before{content:'\00e606'}.post-content .iconfont-weibo:before{content:'\00e607'}.post-content .iconfont-facebook:before{content:'\00e601'}.post-content .iconfont-google:before{content:'\00e602'}.post-content .iconfont-github:before{content:'\00e60d'}.post-content .iconfont-douban:before{content:'\0e600'}.post-content .iconfont-v2ex:before{content:'\00e605'}.post-content .iconfont-zhihu:before{content:'\00e609'}.post-content .iconfont-wikipedia:before{content:'\00e608'}.post-content .iconfont-jianshu:before{content:'\00e60b'}.post-content .iconfont-youku:before{content:'\00e60c'}.post-content .iconfont-youtube:before{content:'\00e60a'}.post-content a .iconfont {line-height: 2.8rem;padding-right: .3rem;vertical-align: baseline; }
```

`post-content` 是文章部分的 class 属性，远程下载作者托管在阿里云的字体图标文件。

```javascript
    script
        $(document).ready (function() {
            function urlIconlize(url) {
                var domain,
                    _output;
                var iconFontTag = 'iconfont';
                var iconMap = {
                    'twitter': iconFontTag + '-twitter',
                    'wechat': iconFontTag + '-wechat',
                    'qzone': iconFontTag + '-qzone',
                    'weibo': iconFontTag + '-weibo',
                    'facebook': iconFontTag + '-facebook',
                    'github': iconFontTag + '-github',
                    'douban': iconFontTag + '-douban',
                    'google': iconFontTag + '-google',
                    'luolei': iconFontTag + '-luolei',
                    'dribble': iconFontTag + '-dribble',
                    'v2ex': iconFontTag + '-v2ex',
                    'zhihu': iconFontTag + '-zhihu',
                    'wikipedia': iconFontTag + '-wikipedia',
                    'jianshu': iconFontTag + '-jianshu',
                    'youku': iconFontTag + '-youku',
                    'youtube': iconFontTag + '-youtube'
                }
                for (var name in iconMap) {
                    if (typeof iconMap[name] !== 'function') {
                        var MapKey = name;
                        if (url.indexOf(MapKey) >= 0) {
                            domain = MapKey;
                            _output = iconMap[MapKey];
                        }
                    }
                }
                return _output;
            };
            function addIcons() {
                $('.post-content  a:not(:has(img))').each(function(i) {
                    var _src = $(this).attr('href');
                    var tmp = document.createElement('a');
                    tmp.href = _src;
                    _selfDomain = tmp.hostname;
                    urlIconlize(_selfDomain);
                    $(this).prepend('<i class="iconfont ' + urlIconlize(_selfDomain) + '"></i>');
                });
            }
            addIcons();
        });
```

收工！