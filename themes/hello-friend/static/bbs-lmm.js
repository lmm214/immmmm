/*
Last Modified time : 20230721 by https://immmmm.com
*/
if (typeof Lately === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://fastly.jsdelivr.net/gh/Tokinx/Lately/lately.min.js';
  script.onload = () => {
    Lately.init({ target: '.bbs-date' });
  };
  document.head.appendChild(script);
} else {
  Lately.init({ target: '.bbs-date' });
}
//
const urls = [
  {home:"https://immmmm.com/",host:"https://me.edui.fun/",apiV1:'v1/',creatorId:"101",comment:'1',twiEnv:'https://metk.edui.fun/',imgsrc:"https://cravatar.cn/avatar/ba83fa02fc4b2ba621514941307e21be"},
  {home:"https://nuoea.com/",host:"https://memos.nuoea.com/",apiV1:'v1/',creatorId:"101",comment:'1',twiEnv:'https://twikoo.nuoea.com/',imgsrc:"https://cravatar.cn/avatar/020d365ea2596ef6d516143bb0552704"},
  {home:"https://chenyyds.com/",host:"https://me.chenplus.com/",apiV1:'',creatorId:"101",comment:'1',twiEnv:'https://twikoo.chenyyds.com/',imgsrc:"https://chenyyds.com/avatar.png"},
  {home:"https://seersu.me/",host:"https://bb.seersu.top/",apiV1:'',creatorId:"101",comment:'1',twiEnv:'https://twikoo.seersu.me/',imgsrc:"https://cravatar.cn/avatar/84b712148a63b44dd97ede997bc3efa5"},
  {home:"https://www.xzgljiang.com/",host:"https://memos.xzgljiang.com/",apiV1:'',creatorId:"1",comment:'1',twiEnv:'https://twikoo.une.xzgljiang.com/',imgsrc:"https://cravatar.cn/avatar/a892fd3321ab65a1c5d9c7a54a04c881"},
  {home:"https://cooolr.cn/",host:"https://m.cooolr.cn/",apiV1:'',creatorId:"1",comment:'1',twiEnv:'https://tk.cooolr.cn/',imgsrc:"https://cravatar.cn/avatar/7422f8bebdb99f6594e029f603ccb926"},
  {home:"https://www.boyhu.cn/",host:"https://qzone.boyhu.cn/",apiV1:'',creatorId:"101",comment:'1',twiEnv:'https://tk.boyhu.cn/',imgsrc:"https://cravatar.cn/avatar/55be217893c75baf8571837197de4a3e"},
  {home:"https://kouseki.cn/",host:"https://memos.kouseki.cn/",apiV1:'',creatorId:"1",comment:'1',twiEnv:'https://api-twi.kouseki.cn/',imgsrc:"https://cravatar.cn/avatar/23978e8e57e20163e8cb67bbf9dbe907"},
  {home:"https://lms.im/",host:"https://b.lms.im/",apiV1:'v1/',creatorId:"1",comment:'1',twiEnv:'https://b.lms.im/tk/',imgsrc:"https://cravatar.cn/avatar/d9cc49ea0301640d7a19b6a1e77012dd"},
  {home:"https://edinik.com/",host:"https://memos.edinik.com/",apiV1:'v1/',creatorId:"1",comment:'1',twiEnv:'https://tk.edinik.com/',imgsrc:"https://cravatar.cn/avatar/e1cdf4f763e3c7e01271a44b990c712f"},
  {home:"https://memos.qiangtu.com/",host:"https://memos.qiangtu.com/",apiV1:'v1/',creatorId:"1",comment:'1',twiEnv:'https://twikoo.qiangtu.com/',imgsrc:"https://memos2504.oss-cn-hangzhou.aliyuncs.com/memos2504/assets/2023/06/06/1686021093_favicon.ico/1ef33f96-5296-4d5e-940c-04c88775d008.ico"},
  {home:"https://life97.top/",host:"https://memos.life97.top/",apiV1:'',creatorId:"101",comment:'1',twiEnv:'https://say.life97.top/',imgsrc:"https://cravatar.cn/avatar/d41d8cd98f00b204e9800998ecf8427e"},
  {home:"https://www.wangdu.site/",host:"https://bw.wangdu.site:4730/",apiV1:'v1/',creatorId:"101",comment:'1',twiEnv:'https://wwsay.wangdu.site/',imgsrc:"https://cravatar.cn/avatar/3f86f3f1aa105924d030b7d3040a0037"},
  {home:"https://memos.ee/",host:"https://t.memos.ee/",apiV1:'v1/',creatorId:"1",comment:'1',twiEnv:'https://twikoo.memos.ee',imgsrc:"https://cravatar.cn/avatar/f2e928a6f8548a1088d336e541ae1b9d"},
  {home:"https://eallion.com/",host:"https://memos.eallion.com/",apiV1:'v1/',creatorId:"101",comment:'1',artEnv:'https://api.eallion.com/artalk/',artSite:'memos',imgsrc:"https://cravatar.cn/avatar/171e4c30959e8c077a6c58b958624b31"},
  {home:"https://www.skyue.com/",host:"https://memos.skyue.com/",apiV1:'',creatorId:"1",comment:'1',artEnv: 'https://artalk.skyue.com',artSite: '拾月微博',imgsrc:"https://cravatar.cn/avatar/c3fb4bb4d5101284ddd672fb722cdd7d"},
  {home:"https://xrat.net/",host:"https://memos.xrat.net/",apiV1:'',creatorId:"2",comment:'1',artEnv:'https://vlabs.synology.me:96',artSite:'memos.xrat.net',imgsrc:"https://cravatar.cn/avatar/0ab677e14d21d941f64d98192d6168e7"},
  {home:"https://www.isolitude.cn/",host:"https://me.isolitude.cn/",apiV1:'v1/',creatorId:"1",comment:'1',artEnv: 'https://artalk.isolitude.cn/',artSite: '自说自话王国',imgsrc:"https://cravatar.cn/avatar/924916294598a950bb80d78012dc3aac"},
  {home:"https://laozhang.org/",host:"https://memos.laozhang.org/",apiV1:'v1/',creatorId:"1",comment:'1',artEnv: 'https://artalk.laozhang.org/',artSite: 'memos',imgsrc:"https://cravatar.cn/avatar/679666f7bd1af3e55f0e51dd70ed161c"},
  {home:"https://koobai.com/",host:"https://memos.koobai.com/",apiV1:'v1/',creatorId:"1",comment:'1',artEnv:'https://c.koobai.com',artSite:'空白唠叨',imgsrc:"https://cravatar.cn/avatar/3b3d336a7d389b7ae8531cbe177ae9b7"},
  {home:"https://veryjack.com/",host:"https://say.veryjack.com/",apiV1:'',creatorId:"1",comment:'1',artEnv: 'https://artalk.veryjack.com',artSite: 'Jack\'s Space',imgsrc:"https://cravatar.cn/avatar/7a41a0e8e1df8e964fa1268193b03508"},
  {home:"https://linsnow.cn/",host:"https://bb.linsnow.cn/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/9f5d9e5efe3bea0139b12a0fe27100fe"},
  {home:"https://elizen.me/",host:"https://bb.elizen.me/",apiV1:'',creatorId:"101",comment:'',imgsrc:"https://cravatar.cn/avatar/f65df4d87240feb1cb247857a621a48f"},
  {home:"https://www.cyuanx.icu/",host:"https://mome.cyuanx.icu/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://www.cyuanx.icu/wp-content/uploads/2023/03/cropped-07b4b32029661fd9ce1200ac9b937f1.jpg"},
  {home:"https://xsinger.me/",host:"https://isay.live/",apiV1:'',creatorId:"101",comment:'',imgsrc:"https://cravatar.cn/avatar/f0e33f4d097fe2e9fd74b9b129e7a655"},
  {home:"https://noionion.top/",host:"https://memos.noionion.cn/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/d240a727ea154be465796ef2644aac16"},
  {home:"https://1900.live/",host:"https://memos.1900.live/",apiV1:'v1/',creatorId:"101",comment:'',imgsrc:"https://cravatar.cn/avatar/cc38267b10cc25dfc62209f8ca34589e"},
  {home:"https://usj.cc/",host:"https://memos.usj.cc/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/1cce0a22c2c7648eab76ec876c6a54d9"},
  {home:"https://www.wananaiko.com/",host:"https://memo.wananaiko.com/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=7AFd0gic7wVsNg2ToQrQU2w&s=140&t=1583250600"},
  {home:"https://dusays.com/",host:"https://s.dusays.com/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/28b57baa4e8f13fe4292ccb2de267e30"},
  {home:"https://dusays.com/",host:"https://s.dusays.com/",apiV1:'v1/',creatorId:"9",comment:'',imgsrc:"https://cravatar.cn/avatar/c1b204bab687a23c8b6d7c8de11c7c59"},
  {home:"https://vlieo.com/",host:"https://memos.vlieo.com/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/d36125dcbca7fde4200fd76f6aa1fbe9"},
  {home:"https://www.4op.top/",host:"https://flomo.010316.xyz/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/81f9378195d84e8ff73aad9ded2b9808"},
  {home:"https://wiki-power.com/",host:"https://memos.wiki-power.com/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/44218020ee434de43516c19f05c71593"},
  {home:"https://blog.leonus.cn/",host:"https://m.leonus.cn/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=cZKBhtxe2iaxjSfbVYiaFgoQ&kti=Y9x6QwAAAAI&s=140&t=1672836908"},
  {home:"https://eirms.com/",host:"https://memo.eirms.com/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=6bLfAytyUI7daRuxat0XxA&kti=ZDt5CwAAAAA&s=140&t=1646284093"},
  {home:"https://cmsblog.cn/",host:"https://memos.cmsblog.cn/",apiV1:'',creatorId:"101",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=fcgI8ibPhO3zz3IvgL4bl7Q&kti=ZDuqEgAAAAI&s=140&t=1556624886"},
  {home:"https://forevers.love/",host:"https://www.forevers.love/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=ibHiaOLTgWctyNtR2EdVOvHA&kti=ZDvk_QAAAAE&s=140&t=1673516322"},
  {home:"https://blog.roccoshi.top/",host:"https://memos.roccoshi.top/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://youpai.roccoshi.top/img/avatar.jpg"},
  {home:"https://dongjunke.cn/",host:"https://memos.dongjunke.cn/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/42542189ddb33064599dc88a5149bea7"},
  {home:"https://pipuwong.com/",host:"https://memos.pipuwong.com/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=5F8TcjFWpLMzia5ibn26vs5A&kti=ZFVJhgAAAAA&s=140&t=1679212034"},
  {home:"https://ysicing.cloud/",host:"https://note.ysicing.cloud/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/5ca16ee587d1e4befd805cf710361f26"},
  {home:"https://www.kingname.info/",host:"https://memos.kingname.info/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/2463f1bd85aea23703f320e67d33f349"},
  {home:"https://mybelife.com/",host:"https://mybelife.com/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/7067b66529765b71181c62e59ac6969b"},
  {home:"https://idh.ink/",host:"https://idh.ink/",apiV1:'v1/',creatorId:"1",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=NAuictuJAIjdPiaHlY6xbDWA&kti=ZHUWoAAAAAA&s=140&t=1683481629"},
  {home:"https://leonfong.me/",host:"https://memo.leonfong.me/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/b147bfa4888f1233882ba5b39ef3bffc"},
]

//  {home:"https://l22.org/",host:"https://note.l22.org/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/4b0d33a08ac73dc07a5293f14232ca53"},
//  {home:"https://yunlogs.com/",host:"https://note.zdm.im/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/d41d8cd98f00b204e9800998ecf8427e"},
//  {home:"https://emmm.space/",host:"https://memos.emmm.space/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://thirdqq.qlogo.cn/g?b=sdk&k=LxEGgNG5gRmKSbHibgaEFUw&kti=ZEy2AAAAAAE&s=140&t=1655774580"},
//  {home:"https://darmau.design/",host:"https://memo.darmau.design/",apiV1:'',creatorId:"1",comment:'',imgsrc:"https://cravatar.cn/avatar/729357a0d48d17802332d52479d2399f"}


var bbDom = document.querySelector('#bbs');
var load = '<div id="load" onclick="nextFetch()" ><button class="load-btn button-load">加载更多</button></div>'
var loading = '<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
var bbsDatas = [],bbsData = {},nextDatas = [],nextData = {},limit = 2
var page = 1,offset = 0,nextLength = 0,nextDom='',bbUrlNow = '',imgsrcNow = '',hostNow = '',creIdNow = '',commentNow = '',twiEnvNow='',artEnvNow='',artSiteNow=''

bbDom.innerHTML = loading
allUrls()
function allUrls(){
  //console.log(urls)
  var myHtml = ''
  for(var i=0;i < urls.length;i++){
    myHtml += '<div class="bbs-urls bbs-url" onclick="urlsNow(this)" data-hostid="'+urls[i].host+"u/"+urls[i].creatorId+'" data-host="'+urls[i].host+'" data-apiV1="'+urls[i].apiV1+'" data-creatorId="'+urls[i].creatorId+'" data-imgsrc="'+urls[i].imgsrc+'" data-comment="'+urls[i].comment+'" data-home="'+urls[i].home+'" data-twienv="'+urls[i].twiEnv+'" data-artenv="'+urls[i].artEnv+'" data-artsite="'+urls[i].artSite+'" data-index="'+i+'"><img src="'+urls[i].imgsrc+'" alt=""></div>'
  }
  myHtml += '<div class="bbs-urls urls-button" onclick="urlsNow(this)" data-type="random"><svg t="1665928089691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2562" width="32" height="32"><path d="M913.2 672l98.8 57.1c5.3 3.1 5.3 10.8 0 13.9l-43.4 25L710.4 924c-2.7 1.5-6-0.4-6-3.5V772c0-2.2-1.8-4-4-4H544c-70.4 0-134.4-28.8-180.8-75.2-11.1-11.1-21.2-23.2-30.1-36.1-6.4-9.2-20-9.1-26.4 0.1C260.5 723.9 183.1 768 96 768h-48c-26.5 0-48-21.5-48-48s21.5-48 48-48h48c42.5 0 82.6-16.7 112.9-47.1 30.4-30.4 47.1-70.5 47.1-112.9s-16.7-82.6-47.1-112.9C178.6 368.7 138.4 352 96 352h-48c-26.5 0-48-21.5-48-48s21.5-48 48-48h48c70.4 0 134.4 28.8 180.8 75.2 11.1 11.1 21.2 23.2 30.1 36.1 6.4 9.2 20 9.1 26.4-0.1 46.3-67 123.6-111.1 210.8-111.1H700.4c2.2 0 4-1.8 4-4V103.4c0-3.1 3.3-5 6-3.5l258.2 156 43.4 25.1c5.3 3.1 5.3 10.8 0 13.9L913.2 352 710.4 476c-2.7 1.5-6-0.4-6-3.5V356c0-2.2-1.8-4-4-4H544c-42.5 0-82.6 16.7-112.9 47.1-30.4 30.4-47.1 70.5-47.1 112.9 0 42.5 16.7 82.6 47.1 112.9C461.4 655.3 501.5 672 544 672H700.4c2.2 0 4-1.8 4-4V551.4c0-3.1 3.3-5 6-3.5L913.2 672z" p-id="2563" fill="#f5f5f5"></path></svg></div>'
  myHtml += '<div class="bbs-urls urls-button"><a href="https://immmmm.com/bbs-by-memos/"><svg t="1665929410343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6308" width="32" height="32"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="6309" fill="#f5f5f5"></path></svg></a></div>'
  myHtml = '<div id="bbs-urls">'+myHtml+'</div>'
  bbDom.insertAdjacentHTML('beforebegin', myHtml);
}

function nextFetch(){
  document.querySelector("button.button-load").textContent= '加载中……';
  updateHTMl(nextDatas)
  if(nextLength < 10){
    document.querySelector("button.button-load").remove()
    return
  }
  getNextList()
};

function urlsNow(e){
  var domUrls = document.querySelectorAll('#bbs-urls .bbs-urls')
  if(e.classList.contains('url-now')){
    domUrls[e.getAttribute("data-index")].classList.remove("url-now")
    fetchBBser()
  }else{
    domUrls.forEach(function(value,index){ domUrls[index].classList.remove("url-now")})
    var btn = document.querySelector('button.button-load')
    if(btn){btn.remove()}
    page = 1,offset = 0
    bbDom.innerHTML = loading
    var type = e.getAttribute("data-type")
    if(type == 'random'){
      var num = Math.round(Math.random() * (urls.length-1))
      hostNow = urls[num].host
      creIdNow = urls[num].creatorId
      imgsrcNow = urls[num].imgsrc
      commentNow = urls[num].comment
      twiEnvNow = urls[num].twiEnv
      artEnvNow = urls[num].artEnv
      artSiteNow = urls[num].artSite
      homeNow = urls[num].home
      apiV1Now = urls[num].apiV1
      domUrls[num].classList.add("url-now")
    }else{
      domUrls[e.getAttribute("data-index")].classList.add("url-now")
      hostNow = e.getAttribute("data-host")
      creIdNow = e.getAttribute("data-creatorId")
      imgsrcNow = e.getAttribute("data-imgsrc")
      commentNow = e.getAttribute("data-comment")
      twiEnvNow = e.getAttribute("data-twienv")
      artEnvNow = e.getAttribute("data-artenv")
      artSiteNow = e.getAttribute("data-artsite")
      homeNow = e.getAttribute("data-home")
      apiV1Now = e.getAttribute("data-apiV1")
    }
    bbUrlNow = hostNow+"api/"+apiV1Now+"memo?creatorId="+creIdNow+"&rowStatus=NORMAL&limit=10"
    fetch(bbUrlNow).then(res => res.json()).then( resdata =>{
      var arrData = resdata || ''
      if(resdata.data){
        arrData = resdata.data
      }
      bbDom.innerHTML = ''
      bbsDatas.length = 0
      for(var j=0;j < arrData.length;j++){
            var resValue = arrData[j]
            bbsData = {
              memoId: resValue.id,
              updatedTs: resValue.updatedTs,
              creatorId:resValue.creatorId,
              creator: resValue.creatorName || resValue.creator.nickname || resValue.creator.name,
              imgsrc: imgsrcNow,
              content: resValue.content,
              resourceList: resValue.resourceList,
              url:hostNow,
              twiEnv:twiEnvNow,
              artEnv:artEnvNow,
              artSite:artSiteNow,
              home:homeNow,
              comment: commentNow
            }
            bbsDatas.push(bbsData)
      }
      updateHTMl(bbsDatas)
      bbDom.insertAdjacentHTML('afterend', load);
      var nowLength = bbsData.length
      if(nowLength < 10){ //返回数据条数小于 limit 则直接移除“加载更多”按钮，中断预加载
        document.querySelector("button.button-load").remove()
        return
      }
      page++
      offset = 10*(page-1)
      getNextList()
    });
  }
}
// 获取评论数量
function insertTwikoo(e) {
  var twienv = e.getAttribute("data-twienv")
  var twipath = e.getAttribute("data-path")
  var memoId = e.getAttribute("data-id")
  twikoo.getCommentsCount({
    envId: twienv, // 环境 ID
    urls: [twipath],
    includeReply: true
  }).then(function (res) {
    var tkcountID = '#tkcount-'+memoId//tkcount-1635
    var tkcountDom = document.querySelectorAll(tkcountID)
    if(tkcountDom){
      tkcountDom.forEach(e => e.remove());
    }
    e.insertAdjacentHTML('beforeend', '<span class="tkcount" id="tkcount-'+memoId+'">'+res[0].count+'</span>');
  }).catch(function (err) {
    console.error(err);
  });
}
//预加载下一页数据
function getNextList(){
  var bbUrl = bbUrlNow+"&offset="+offset;
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    var arrData = resdata || ''
    if(resdata.data){
      arrData = resdata.data
    }
    nextDom = arrData
    nextLength = nextDom.length
    page++
    offset = 10*(page-1)
    if(nextLength < 1){
      document.querySelector("button.button-load").remove()
      return
    }
    nextDatas.length = 0
    for(var j=0;j < nextDom.length;j++){
      var resValue = nextDom[j]
      nextData = {
        updatedTs: resValue.updatedTs,
        creatorId:resValue.creatorId,
        creator: resValue.creatorName || resValue.creator.nickname || resValue.creator.name,
        imgsrc: imgsrcNow,
        content: resValue.content,
        resourceList: resValue.resourceList,
        url:hostNow,
        twiEnv:twiEnvNow,
        artEnv:artEnvNow,
        artSite:artSiteNow,
        comment:commentNow,
        memoId: resValue.id,
        home:homeNow,
      }
      nextDatas.push(nextData)
    }
  })
}
const withTimeout = (millis, promise) => {
  const timeout = new Promise((resolve, reject) =>
      setTimeout( () => reject(`Timed out after ms.`),millis));
  return Promise.race([
      promise,
      timeout
  ]);
};
const fetchBBser = async () => {
  const results = await Promise.allSettled(urls.map(
    //限时
    url => withTimeout(2000,
      fetch(url.host+"api/"+url.apiV1+"memo?creatorId="+url.creatorId+"&rowStatus=NORMAL&limit="+limit).then(response => response.json()).then(resdata => {
        var qsLive = ".bbs-urls.bbs-url[data-hostid='"+url.host+"u/"+url.creatorId+"']"
        document.querySelector(qsLive).classList.add("liveon");
        var arrData = resdata || ''
        if(resdata.data){
          arrData = resdata.data
        }
        return arrData
      })
    )
    //url => fetch(url.host+"api/memo?creatorId="+url.creatorId+"&rowStatus=NORMAL&limit="+limit).then(response => response.json()).then(resdata => resdata.data)
  )).then(results=> {
    //console.log(results)
    bbDom.innerHTML = ''
    for(var i=0;i < results.length;i++){
      var status = results[i].status
      if(status == "fulfilled"){
        var resultsRes = results[i].value
        for(var j=0;j < resultsRes.length;j++){
          var resValue = resultsRes[j]
          var dateNow = new Date()
          var dateDiff = dateNow.getTime() - (resValue.updatedTs * 1000);
          var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
          if(dayDiff < 10 ){//显示10天内更新的 Memos
            bbsData = {
              memoId: resValue.id,
              updatedTs: resValue.updatedTs,
              creatorId:resValue.creatorId,
              creator: resValue.creatorName || resValue.creator.nickname || resValue.creator.name,
              imgsrc: urls[i].imgsrc,
              content: resValue.content,
              resourceList: resValue.resourceList,
              home:urls[i].home,
              url:urls[i].host,
              comment:urls[i].comment,
              twiEnv:urls[i].twiEnv || '',
              artEnv:urls[i].artEnv || '',
              artSite:urls[i].artSite || ''
            }
            bbsDatas.push(bbsData)
          }
        }
      }
    }
    bbsDatas.sort(compare("updatedTs"));
    updateHTMl(bbsDatas)
  })
}
fetchBBser()

function compare(p){
  return function(m,n){
      var a = m[p];
      var b = n[p];
      return b - a;
  }
}

function uniqueFunc(arr){
  const res = new Map();
  return arr.filter((item) => !res.has(item.creator) && res.set(item.creator, 1));
}


function updateHTMl(data){
  var result="",resultAll="";
  const TAG_REG = /#([^\s#]+)/;
  const IMG_REG = /\!\[(.*?)\]\((.*?)\)/g;
  BILIBILI_REG = /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g;
  NETEASE_MUSIC_REG = /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g;
  QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
  QQVIDEO_REG = /<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
  YOUKU_REG = /<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;
  YOUTUBE_REG = /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;

  marked.setOptions({
    breaks: true,
    smartypants: false,
    langPrefix: 'language-'
  });
  // Marked Renderer Open links in New Tab
  const renderer = new marked.Renderer();
  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
      const localLink = href.startsWith(`${location.protocol}//${location.hostname}`);
      const html = linkRenderer.call(renderer, href, title, text);
      return localLink ? html : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `);
  };
  marked.use({ renderer });
  
  for(var i=0;i < data.length;i++){
      var memos = data[i].url
      var memoId = data[i].memoId
      var memoUrl = memos + "m/" + memoId
      var comment = data[i].comment
      var twiEnv = data[i].twiEnv
      var artEnv = data[i].artEnv
      var artSite = data[i].artSite
      var bbContREG = data[i].content
        .replace(TAG_REG, "<span class='tag-span'>#$1</span> ")
        .replace(IMG_REG, '')
        //.replace(LINK_REG, "<a href='$2' target='_blank'><span> $1 </span></a>")
        
      bbContREG = marked.parse(bbContREG)
        .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>")
        .replace(NETEASE_MUSIC_REG, "<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>")
        .replace(QQMUSIC_REG, "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>")
        .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
        .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
        .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")

      //解析 content 内 md 格式图片
      var IMG_ARR = data[i].content.match(IMG_REG) || '',IMG_ARR_Grid='';
      if(IMG_ARR){
        var IMG_ARR_Length = IMG_ARR.length,IMG_ARR_Url = '';
        if(IMG_ARR_Length !== 1){var IMG_ARR_Grid = " grid grid-"+IMG_ARR_Length}
        IMG_ARR.forEach(item => {
            let imgSrc = item.replace(/!\[.*?\]\((.*?)\)/g,'$1')
            IMG_ARR_Url += '<figure class="gallery-thumbnail"><img class="img thumbnail-image" loading="lazy" decoding="async" src="'+imgSrc+'"/></figure>'
        });
        bbContREG += '<div class="resimg'+IMG_ARR_Grid+'">'+IMG_ARR_Url+'</div>';
      }

      //标签
      var tagArr = data[i].content.match(TAG_REG);
      var bbContTag = '';
      if (tagArr) {
          bbContTag = String(tagArr[0]).replace(/[#]/g, '');
      } else {
          bbContTag = '动态';
      };

      //解析内置资源文件
      if(data[i].resourceList && data[i].resourceList.length > 0){
        var resourceList = data[i].resourceList;
        var imgUrl='',resUrl='',resImgLength = 0;
        for(var j=0;j < resourceList.length;j++){
          var restype = resourceList[j].type.slice(0,5);
          var resexlink = resourceList[j].externalLink
          var resLink = '',fileId=''
          if(resexlink){
            resLink = resexlink
          }else{
            fileId = resourceList[j].publicId || resourceList[j].filename
            resLink = memos+'o/r/'+resourceList[j].id+'/'+fileId
          }
          if(restype == 'image'){
            imgUrl += '<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="'+resLink+'"/></figure>'
            resImgLength = resImgLength + 1 
          }
          if(restype !== 'image'){
            resUrl += '<a target="_blank" rel="noreferrer" href="'+resLink+'">'+resourceList[j].filename+'</a>'
          }
        }
        if(imgUrl){
          var resImgGrid = ""
          if(resImgLength !== 1){var resImgGrid = " grid grid-"+resImgLength}
          bbContREG += '<div class="resimg'+resImgGrid+'">'+imgUrl+'</div>'
        }
        if(resUrl){
          bbContREG += '<div class="resour">'+resUrl+'</div>'
        }
      }
      var EnvNow = ''
      if(twiEnv && twiEnv != "undefined"){
        EnvNow = twiEnv.replace(/https\:\/\/.*\.(.*)\..*/,'$1')
      }
      if(artEnv && artEnv != "undefined"){
        EnvNow = artEnv.replace(/https\:\/\/.*\.(.*)\..*/,'$1')
      }
      result += '<li class="'+EnvNow+'memo-'+memoId+'"><div class="bbs-avatar"><a href="'+data[i].home+'" target="_blank" rel="noopener noreferrer"><img src="'+data[i].imgsrc+'" alt=""></a><a href="'+memoUrl+'" target="_blank" rel="noopener noreferrer" class="bbs-creator">'+data[i].creator+'</a><span class="bbs-dot">·</span><span class="bbs-date">'+new Date(data[i].updatedTs * 1000).toLocaleString()+'</span>'

      var comSVG = '<span class="bbs-coment-svg"><svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="24"><path d="M816 808H672c-4.8 0-8 1.6-11.2 4.8l-80 80c-36.8 36.8-97.6 36.8-136 0l-80-80c-3.2-3.2-6.4-4.8-11.2-4.8h-144c-70.4 0-128-57.6-128-128V232c0-70.4 57.6-128 128-128h608c70.4 0 128 57.6 128 128v448C944 750.4 886.4 808 816 808zm0-64c35.2 0 64-28.8 64-64V232c0-35.2-28.8-64-64-64H208c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h144c20.8 0 41.6 8 56 24l80 80c12.8 12.8 32 12.8 44.8 0l80-80c14.4-14.4 35.2-24 56-24H816zM320 408c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48zm192 0c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48zm192 0c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48z" /></svg></span>'

      var outSVG = '<span class="bbs-coment-svg"><svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M864 640a32 32 0 0 1 64 0v224.096A63.936 63.936 0 0 1 864.096 928H159.904A63.936 63.936 0 0 1 96 864.096V159.904C96 124.608 124.64 96 159.904 96H384a32 32 0 0 1 0 64H192.064A31.904 31.904 0 0 0 160 192.064v639.872A31.904 31.904 0 0 0 192.064 864h639.872A31.904 31.904 0 0 0 864 831.936V640zm-485.184 52.48a31.84 31.84 0 0 1-45.12-.128 31.808 31.808 0 0 1-.128-45.12L815.04 166.048l-176.128.736a31.392 31.392 0 0 1-31.584-31.744 32.32 32.32 0 0 1 31.84-32l255.232-1.056a31.36 31.36 0 0 1 31.584 31.584L924.928 388.8a32.32 32.32 0 0 1-32 31.84 31.392 31.392 0 0 1-31.712-31.584l.736-179.392L378.816 692.48z"/></svg></span>'

      if(comment == '1'){
        if(twiEnv && twiEnv != 'undefined'){
          result += '<a data-id="'+memoId+'" data-twienv="'+twiEnv+'" data-path="'+memoUrl+'" onclick="loadTwikoo(this)" onmouseenter="insertTwikoo(this)" href="javascript:void(0)" rel="noopener noreferrer">'+comSVG+'</a></div><div class="bbs-content"><div class="bbs-text">'+bbContREG+'</div><div class="item-comment twikoo-'+memoId+' d-none"><div id="'+EnvNow+'twikoo-'+memoId+'"></div></div></div></li>'
        }else if(artEnv && artEnv != 'undefined'){
          result += '<a data-id="'+memoId+'" data-artenv="'+artEnv+'" data-artsite="'+artSite+'" data-path="'+memoUrl+'" onclick="loadArtalk(this)" href="javascript:void(0)" rel="noopener noreferrer">'+comSVG+'</a></div><div class="bbs-content"><div class="bbs-text">'+bbContREG+'</div><div class="item-comment '+EnvNow+'artalk-'+memoId+' d-none"></div></div></li>'
        }else{
          result += '<a href="'+memoUrl+'" target="_blank" rel="noopener noreferrer">'+outSVG+'</a></div><div class="bbs-content"><div class="bbs-text">'+bbContREG+'</div></div></li>'
        }
      }else{
        result += '</div><div class="bbs-content"><div class="bbs-text">'+bbContREG+'</div></div></li>'
      }

  }// end for
  
  var bbBefore = "<section class='bbs-timeline'><ul class='list'>"
  var bbAfter = "</ul></section>"
  resultAll = bbBefore + result + bbAfter
  bbDom.insertAdjacentHTML('beforeend', resultAll);
  var btn = document.querySelector('button.button-load')
  if(btn){
    btn.textContent= '加载更多';
  }
  //渲染豆瓣
  fetchDB()
  //图片灯箱
  window.ViewImage && ViewImage.init('.bbs-content img')
  //相对时间
  window.Lately && Lately.init({ target: '.bbs-date' });
}
//前端加载 Twikoo 评论
function loadTwikoo(e) {
  var memoEnv = e.getAttribute("data-twienv")
  var EnvNow = memoEnv.replace(/https\:\/\/.*\.(.*)\..*/,'$1')
  var memoPath = e.getAttribute("data-path")
  var memoId = e.getAttribute("data-id")
  var twikooDom = document.querySelector('.twikoo-'+memoId);
  if (twikooDom.classList.contains('d-none')) {
    document.querySelectorAll('.item-comment').forEach((item) => {item.classList.add('d-none');})
    if(!document.getElementById("twikoo")){
      twikooDom.classList.remove('d-none');
      var domClass = document.getElementsByClassName(EnvNow+'memo-'+memoId)
      window.scrollTo({
        top: domClass[0].offsetTop - 30,
        behavior: "smooth"
      });
      twikoo.init({
        envId: memoEnv,
        el: '#'+EnvNow+'twikoo-' + memoId,
        path: memoPath
      });
      setTimeout(function(){
        document.getElementById("twikoo").id= EnvNow+'twikoo-' + memoId;
      }, 600)
    }
  }else{
    twikooDom.classList.add('d-none');
  }
}
//前端加载 Artalk 评论
function loadArtalk(e) {
  var memoEnv = e.getAttribute("data-artenv")
  var EnvNow = memoEnv.replace(/https\:\/\/.*\.(.*)\..*/,'$1')
  var memoSite= e.getAttribute("data-artsite")
  var memoId = e.getAttribute("data-id")
  var ArtalkDom = document.querySelector('.'+EnvNow+'artalk-'+memoId);
  var ArtalkDom_ID = document.querySelector('#'+EnvNow+'artalk-'+memoId);
  if(!ArtalkDom_ID){
    ArtalkDom.insertAdjacentHTML('afterbegin', '<div id="'+EnvNow+'artalk-'+ memoId +'"></div>');
  }
  if (ArtalkDom.classList.contains('d-none')) {
    document.querySelectorAll('.item-comment').forEach((item) => {item.classList.add('d-none');})
    if(!document.getElementById("artalk")){
      ArtalkDom.classList.remove('d-none');
      var domClass = document.getElementsByClassName(EnvNow+'memo-'+memoId)
      window.scrollTo({
        top: domClass[0].offsetTop - 30,
        behavior: "smooth"
      });
      Artalk.init({
        el: '#'+EnvNow+'artalk-' + memoId,
        pageKey: '/m/' + memoId,
        pageTitle: '',
        site: memoSite,
        server: memoEnv
      });
    }
  }else{
    ArtalkDom.classList.add('d-none');
    ArtalkDom_ID.remove();
  }
}
//文章内显示豆瓣条目 https://immmmm.com/post-show-douban-item/
function fetchDB(){
  var dbAPI = "https://douban-api.edui.fun/";
  var dbA = document.querySelectorAll(".bbs-timeline a[href*='douban.com/subject/']:not([rel='noreferrer'])") || '';
  if(dbA){
    for(var i=0;i < dbA.length;i++){
      _this = dbA[i]
      var dbHref = _this.href
      var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
      var db_type = dbHref.replace(db_reg, "$1");
      var db_id = dbHref.replace(db_reg, "$2").toString();
        if (db_type == 'movie') {
          var this_item = 'movie' + db_id;
          var url = dbAPI + "movies/" + db_id ;
          if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
            fetch(url).then(res => res.json()).then( data =>{
              let fetch_item = 'movies' + data.sid;
              let fetch_href = "https://movie.douban.com/subject/"+data.sid+"/"
              localStorage.setItem(fetch_item, JSON.stringify(data));
              movieShow(fetch_href, fetch_item)
            });
          } else {
            movieShow(dbHref, this_item)
          }
        }else if (db_type == 'book') {
          var this_item = 'book' + db_id;
          var url = dbAPI + "v2/book/id/" + db_id;
          if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
            fetch(url).then(res => res.json()).then( data =>{
              let fetch_item = 'book' + data.id;
              let fetch_href = "https://book.douban.com/subject/"+data.id+"/"
              localStorage.setItem(fetch_item, JSON.stringify(data));
              bookShow(fetch_href, fetch_item)
            });
          } else {
            bookShow(dbHref, this_item)
          }
        }
    }// for end
  }
}
function movieShow(fetch_href, fetch_item){
  var storage = localStorage.getItem(fetch_item);
  var data = JSON.parse(storage);
  var db_star = Math.ceil(data.rating);
  var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>《" + data.name + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.director + " / 类型：" + data.genre + " / " + data.year + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.img + "></div>"
  var db_div = document.createElement("div");
  var qs_href = ".bbs-timeline a[href='"+ fetch_href +"']"
  var qs_dom = document.querySelector(qs_href)
  qs_dom.parentNode.replaceChild(db_div, qs_dom);
  db_div.innerHTML = db_html
}
function bookShow(fetch_href, fetch_item) {
  var storage = localStorage.getItem(fetch_item);
  var data = JSON.parse(storage);
  var db_star = Math.ceil(data.rating.average);
  var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.images.medium + "></div>"
  var db_div = document.createElement("div");
  var qs_href = ".bbs-timeline a[href='"+ fetch_href +"']"
  var qs_dom = document.querySelector(qs_href)
  qs_dom.parentNode.replaceChild(db_div, qs_dom);
  db_div.innerHTML = db_html
}