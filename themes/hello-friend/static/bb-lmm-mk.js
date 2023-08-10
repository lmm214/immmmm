/*
Last Modified time : 20230809 11:00 by https://immmmm.com
*/
let bbMemo = {
  memos: 'https://demo.usememos.com/',
  limit: '10',
  creatorId: '101',
  domId: '#bber',
  twiEnv:'https://metk.edui.fun/',
}
if(typeof(bbMemos) !=="undefined"){
  for(let key in bbMemos) {
    if(bbMemos[key]){
      bbMemo[key] = bbMemos[key];
    }
  }
}

function loadCssCode(code){
  let style = document.createElement('style');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  style.appendChild(document.createTextNode(code));
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
}
const allCSS = "#bber{margin-top:2em;width:auto !important;min-height:100vh;}.bb-timeline pre{color:#aaa;}.bb-timeline ul{margin:0;padding:0;}.bb-timeline ul li{list-style-type:none;margin-bottom:3rem;}.bb-timeline ul li .datacont ul li{margin-bottom:0;}.bb-timeline ul li .bb-div{padding:.6rem 1rem .6rem;border:1px solid #666;font-size:16px;}.bb-load button{font-size:.8rem;font-style:italic;background:none;border-radius:0;border:1px solid #666;padding:10px 30px;width:100%;letter-spacing:0.8rem;}.bb-timeline ul li .bb-info{font-size:14px;position:relative;margin-top:0.5rem;}.bb-timeline ul li .datatime{font-size:15px;}.bb-timeline ul li .datacont{margin-top:0.5rem;max-height:50vh;overflow-y:scroll;overflow-x:hidden;}.bb-timeline ul li .datacount{cursor: pointer;position:absolute;right:0;bottom: 0;}.bb-timeline ul li .datacount svg{margin: 2px 5px;}.bb-timeline ul li .datacont img[src*='emotion']{display:inline-block;width:auto;}.bb-timeline ul li p{margin:0;letter-spacing:1px;color:#3b3d42;line-height:28px;min-height:18px;margin:0;}.bb-timeline pre p{display:inline-block;}.bb-timeline pre p:empty{display:none;}.dark .bb-timeline ul li .bb-div p,.dark .bb-timeline .bb-load button{color:#fafafa;}.dark .bb-timeline ul li .bb-div p svg{fill:#fafafa;}.datacont p{magin:0;}.datacont blockquote{font-family: KaiTi,STKaiti,STFangsong !important;margin:0 0 0 1rem;padding:.25rem 2rem;position: relative;border-left:0 none;}.datacont blockquote::before{line-height: 2rem;content: '“';font-family: Georgia, serif;font-size: 28px;font-weight: bold;position: absolute;left: 10px;top:5px;}.tag-span{color:#42b983;cursor:pointer;}#tag-list{font-size:1.8rem;}.datasource a{color:#fafafa;background:#3b3d42;padding:2px 8px;margin:0 6px 0 0;border-radius:5px;font-size:.9rem;font-weight:400;}.datacont .img{cursor:pointer;border-radius:4px;}.datacont .img.square{height:180px;width:180px;object-fit:cover;}.resimg.grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto;gap:4px;width:calc(100%* 2 / 3);box-sizing:border-box;margin:4px 0 0;}.resimg.grid-2{grid-template-columns:repeat(2,1fr);width:80%;}.resimg.grid-4{grid-template-columns:repeat(2,1fr);width:calc(80% * 2 / 3);}.resimg.grid figure.gallery-thumbnail{position:relative;width:100%;height:0;padding-top:100%;cursor:zoom-in;}.resimg figure{text-align:left;max-height:50%;}.resimg figure img{max-height:50vh;}.resimg.grid figure,figcaption{margin:0 !important;}.resimg.grid figure.gallery-thumbnail > img.thumbnail-image{position:absolute;left:0;top:0;display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%;}#bb-footer{margin:5rem auto 1rem;text-align:center;}#bb-footer p{margin:0 0 0.6rem;}.bb-allnums{letter-spacing:2px;}.bb-allpub{text-decoration:none;font-style:italic;}.bb-timeline ul li::before{content:none;}.post-preview{max-width:680px;height:210px;margin:1em auto;position:relative;display:flex;background:#fff;border-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,.25),0 0 1px rgba(0,0,0,.25);}.post-preview--meta{width:75%;padding:25px;overflow:hidden;}.post-preview--middle {line-height:28px;}.post-preview--title {font-size:18px;margin:0!important;}.post-preview--title a{text-decoration:none;}.post-preview--date{font-size:14px;color:#999;}.post-preview--excerpt{font-size:14px;line-height:1.825;}.post-preview--excerpt p{display: inline;margin: 0;}.post-preview--image {object-fit:cover;height:auto;width:25%;float:right;border-top-right-radius: 2px!important;border-bottom-right-radius:2px!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important;}@media (max-width:550px) {.post-preview {width:95%;height:120px;}.post-preview--meta{padding:15px;}.post-preview--image{height:120px!important;}.post-preview--excerpt{display:none;}.post-preview--middle {line-height:19px;}}.rating{display:block;line-height:15px;}.rating-star{display:inline-block;width:75px;height:15px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAClCAYAAAAUAAAYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5xJREFUeNrs3T9rFEEcxvG7qEQIglaCICKkin9AUEtBKxU7wS61VlYivgWj70TtNFj5BqzE7qxEWwsxKIoYn4UtluFmbm8nczvzm+/BjxyuDwNzu3uXD0+46f7LC5PA45Hm+WTYw1x2LRDc0jzTXB+wqMlsaLPutz8fDFjYZHYauAz3NBvt83XNnyUWNpn1nVm3OsHmsb3EomazzZnVXKMPNcc0xzUnNKc0Rzv/77fms+Z7O3vt9b1eU7bZrNN68l5zcolX4ofmsuZXTdnmMvyi2dR86Bmcac62P6vKrnVubpc0bxYE32nOab45N8YqsvPeDfcD4SOav4HjprPuu+H5BTt9LXDMfNbdLPfT678Fx6vKupt1o/O8+R3pkOaJ5/iktqx7z/qp+aq5q/nY+fczmheaK03Gs7D5rLtZdzSvA6/Ebc2u55j57HQB0TzW7AzkjiKzny6+2hlKNE8juMNcFqKBaIZndRlCNBBNgmx7ZkE0fbLtZkE0EA1EM17WuQwhGogGooFoss6296y52cNO+J6HLJoPaFdbsvA9zGerIxrPh85eWYgGooFoDiQbuAxp0UA0EVmdWbRo+ma1WbRoIBqIZtzsnHdDWjQQDUQD0WSbde5ZS2UhmtqJJtSEiVkXooFoIJre2VATJmZdiKZ2ogk1YSb8oVMvDeUPnSAaiCaPJkzMuhANRAPRQDQpsqEmTMy6EI11oolpwkA0EA1EcyDZmCYMRAPR+LMxTZjqiCamCQPRQDQQzehNGIgGooFoIJpVZ2OaMBBN7USTqgkD0UA0EE3vbKomDERTO9GkasKYJJpUTRiIBqKBaEZvwkA0EA1EA9GkyKZqwkA01olmrCYMRAPRQDR9LkO+0QmiKbAJUyTRjNWEgWggGohm9CYMRAPRQDQQzZDsWE0YiMYC0eTYhIFoIJrKiCbHJgxEY4FocmzCZEs0OTZhIBqIpjKiybEJA9FANBANROPL5tiEgWhKIJoSmzAQDURjjGhKbMJANCUQTYlNmNGIpsQmDEQD0RgjmhKbMBANRAPR1Es0JTZhIJpciMZaEwaigWgKJBprTRiIJheisdaESUo01powEA1EUyDRWGvCQDQQDURjm2isNWEgmlURzWw2q4pZIBqIJkOiCVyGJpkFolkV0ejMMvel28mIRptl7ku3IRqIpjCimfNuaJpZIBqIBqIpm2ice5Z5ZonJupvVkMRu4JW4qXnrOWY++1+AAQBw9BJSCTeN9wAAAABJRU5ErkJggg==);overflow:hidden;}.allstar10{background-position:0px 0px;}.allstar9{background-position:0px -15px;}.allstar8{background-position:0px -30px;}.allstar7{background-position:0px -45px;}.allstar6{background-position:0px -60px;}.allstar5{background-position:0px -75px;}.allstar4{background-position:0px -90px;}.allstar3{background-position:0px -105px;}.allstar2{background-position:0px -120px;}.allstar1{background-position:0px -135px;}.allstar0{background-position:0px -150px;}.rating-average{color:#777;display:inline-block;font-size:13px;margin-left:10px;}.dark .post-preview{background: #3b3d42;}.video-wrapper{position:relative;padding-bottom:55%;width:100%;height:0}.video-wrapper iframe{position:absolute;height:100%;width:100%;}.d-none {display: none !important;}.item-twikoo{margin:2rem 0 0 0;}.video-wrapper video{max-height: 30vh;}#tag-list{z-index: 99999;margin:0;position:fixed;bottom:1rem;right:6rem;}#tag-list .tag-span{position:relative;display:block;background:rgba(238,238,238,0.88);line-height:12px;border-radius:4px;padding: 0 10px;}#tag-list .tag-span:before{font-size:1rem;content:'x';position:absolute;top:-1rem;right:5px;width:5px;height:5px;}.bb-tool{display:flex;justify-content:space-between;align-items:center;}.reaction,.archive-btn{display:inline-flex;}.archive-btn{opacity:0.3;}"
loadCssCode(allCSS);

let limit = bbMemo.limit
let memos = bbMemo.memos
let memosOpenId
let mePage = 1,offset = 0,nextLength = 0,nextDom='',apiV1 = '';
let bbDom = document.querySelector(bbMemo.domId);
let load = '<div class="bb-load"><button class="load-btn button-load">加载中……</button></div>'
if(bbDom){
  fetchStatus()
}
async function fetchStatus() {
  let statusUrl = memos+"api/v1/status";
  let response = await fetch(statusUrl);
  if (response.ok) {
    apiV1 = 'v1/'
  }
  let memoOne = getQueryVariable("memo") || ''
  if(memoOne){
    getMemoOne(memoOne)
  }else{
    newApiV1(apiV1)
  }
}
function getMemoOne(memoOne){
  let OneDom = `<iframe style="width:100%;height:100vh;" src="${memoOne}" frameBorder="0"></iframe>`
  let ContDom = document.querySelector('.content') || document.querySelector(bbMemo.domId);
  ContDom.innerHTML = OneDom
}
function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
function newApiV1(apiV1){
  getFirstList(apiV1) //首次加载数据
  meNums(apiV1) //加载总数
  let btn = document.querySelector("button.button-load");
  btn.addEventListener("click", function () {
    btn.textContent= '加载中……';
    updateTiwkoo(nextDom)
    //updateHTMl(nextDom)
    if(nextLength < limit){ //返回数据条数小于限制条数，隐藏
      document.querySelector("button.button-load").remove()
      return
    }
    getNextList(apiV1)
  });
}
function getFirstList(apiV1){
  bbDom.insertAdjacentHTML('afterend', load);
  let tagHtml = `<p id="tag-list"></p>`
  bbDom.insertAdjacentHTML('beforebegin', tagHtml);
  let bbUrl = memos+"api/"+apiV1+"memo?creatorId="+bbMemo.creatorId+"&rowStatus=NORMAL&limit="+limit;
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    let arrData = resdata || ''
    if(resdata.data){
      arrData = resdata.data
    }
    updateTiwkoo(arrData)
    let nowLength = arrData.length
    if(nowLength < limit){ //返回数据条数小于 limit 则直接移除“加载更多”按钮，中断预加载
      document.querySelector("button.button-load").remove()
      return
    }
    mePage++
    offset = limit*(mePage-1)
    getNextList(apiV1)
  });
}
// 获取评论数量
function updateTiwkoo(data) {
  let twiID = data.map((item) => memos + "m/" + item.id);
  twikoo.getCommentsCount({
    envId: bbMemo.twiEnv,
    urls: twiID,
    includeReply: true
  }).then(function (res) {
    updateCount(res)
  }).catch(function (err) {
    console.error(err);
  });
  function updateCount(res) {
    let twiCount = res.map((item) => {
      return Object.assign({},{'count':item.count})
    });

    let bbTwikoo = data.map((item,index) => {
      return {...item, ...twiCount[index]};
    });
    updateHTMl(bbTwikoo)
  }
}
//预加载下一页数据
function getNextList(apiV1){
  let bbUrl = memos+"api/"+apiV1+"memo?creatorId="+bbMemo.creatorId+"&rowStatus=NORMAL&limit="+limit+"&offset="+offset;
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    let arrData = resdata || ''
    if(resdata.data){
      arrData = resdata.data
    }
    nextDom = arrData
    nextLength = nextDom.length
    mePage++
    offset = limit*(mePage-1)
    if(nextLength < 1){ //返回数据条数为 0 ，隐藏
      document.querySelector("button.button-load").remove()
      return
    }
  })
}
//加载总 Memos 数
function meNums(apiV1){
  let bbLoad = document.querySelector('.bb-load')
  let bbUrl = memos+"api/"+apiV1+"memo/stats?creatorId="+bbMemo.creatorId
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    let arrData = resdata || ''
    if(resdata.data){
      arrData = resdata.data
    }
    if(arrData){
      let allnums = `<div id="bb-footer"><p class="bb-allnums">共 ${arrData.length} 条 </p><p class="bb-allpub"><a href="https://immmmm.com/bbs/" target="_blank">Memos Public</a></p></div>`
      bbLoad.insertAdjacentHTML('afterend', allnums);
    }
  })
}
// 插入 html 
function updateHTMl(data){
  //console.log(data)
  let result="",resultAll="";
  const TAG_REG = /#([^#\s!.,;:?"'()]+)(?= )/g ///#([^/\s#]+?) /g
  , IMG_REG = /\!\[(.*?)\]\((.*?)\)/g
  , LINK_REG = /\[(.*?)\]\((.*?)\)/g
  , BILIBILI_REG = /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g
  , NETEASE_MUSIC_REG = /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g
  , QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g
  , QQVIDEO_REG = /<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g
  , YOUKU_REG = /<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g
  , YOUTUBE_REG = /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;
  marked.setOptions({
    breaks: false,
    smartypants: false,
    langPrefix: 'language-',
    headerIds: false,
    mangle: false
  });
  
  for(let i=0;i < data.length;i++){
      let bbID = data[i].id
      let bbContREG = data[i].content
        .replace(TAG_REG, "")
        .replace(IMG_REG, "")
        .replace(LINK_REG, '<a class="primary" href="$2" target="_blank">$1</a>')

      //标签
      let tagArr = data[i].content.match(TAG_REG);
      let bbContTag = '';
      if (tagArr) {
          bbContTag = tagArr.map(t=>{
            return `<span class='tag-span' onclick='getTagNow(this)'>${t}</span> `;
          }).join('');
      }
      bbContREG =  bbContTag + bbContREG
            
      bbContREG = marked.parse(bbContREG)
        .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>")
        .replace(NETEASE_MUSIC_REG, "<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>")
        .replace(QQMUSIC_REG, "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>")
        .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
        .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
        .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")

      //解析 content 内 md 格式图片
      let IMG_ARR = data[i].content.match(IMG_REG) || '',IMG_ARR_Grid='';
      if(IMG_ARR){
        let IMG_ARR_Length = IMG_ARR.length,IMG_ARR_Url = '';
        if(IMG_ARR_Length !== 1){let IMG_ARR_Grid = " grid grid-"+IMG_ARR_Length}
        IMG_ARR.forEach(item => {
            let imgSrc = item.replace(/!\[.*?\]\((.*?)\)/g,'$1')
            IMG_ARR_Url += `<figure class="gallery-thumbnail"><img class="img thumbnail-image" loading="lazy" decoding="async" src="${imgSrc}"/></figure>`
        });
        bbContREG += `<div class="resimg${IMG_ARR_Grid}">${IMG_ARR_Url}</div>`
      }

      //解析内置资源文件
      if(data[i].resourceList && data[i].resourceList.length > 0){
        let resourceList = data[i].resourceList;
        let imgUrl='',resUrl='',resImgLength = 0;
        for(let j=0;j < resourceList.length;j++){
          let restype = resourceList[j].type.slice(0,5)
          let resexlink = resourceList[j].externalLink
          let resLink = '',fileId=''
          if(resexlink){
            resLink = resexlink
          }else{
            fileId = resourceList[j].publicId || resourceList[j].filename
            resLink = memos+'o/r/'+resourceList[j].id+'/'+fileId
          }
          if(restype == 'image'){
            imgUrl += `<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="${resLink}"/></figure>`
            resImgLength = resImgLength + 1 
          }else if(restype == 'video'){
            imgUrl += `<div class="video-wrapper"><video controls><source src="${memos+'o/r/'+resourceList[j].id}" type="video/mp4"></video></div>`
          }else{
            resUrl += `<a target="_blank" rel="noreferrer" href="${resLink}">${resourceList[j].filename}</a>`
          }
        }
        if(imgUrl){
          let resImgGrid = ""
          if(resImgLength !== 1){resImgGrid = "grid grid-"+resImgLength}
          bbContREG += `<div class="resimg ${resImgGrid}">${imgUrl}</div>`
        }
        if(resUrl){
          bbContREG += `<p class="datasource">${resUrl}</p>`
        }
      }
      let memosIdNow = memos.replace(/https\:\/\/(.*\.)?(.*)\..*/,'id-$2-')
      let emojiReaction = `<emoji-reaction theme="system" class="reaction" endpoint="https://api-emaction.immmmm.com" reacttargetid="${memosIdNow+'memo-'+bbID}" style="line-height:normal;display:inline-flex;"></emoji-reaction>`
      let datacountDOM = `<div class="datacount" data-twienv="${bbMemo.twiEnv}" data-id="${bbID}" onclick="loadTwikoo(this)"> ${data[i].count} 条评论 </div>`
      
      let moreAdmin = ''
      let memosOpenIdNow = window.localStorage && window.localStorage.getItem("memos-access-token")
      if(memosOpenIdNow){
        moreAdmin = `<span class="archive-btn" onclick="archiveMemo(this)" data-id="${bbID}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-img"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></span>`
      }

      result +=  `<li class="memo-${bbID}">
        <div class="bb-div">
          <div class="bb-tool">${emojiReaction}${moreAdmin}</div>
          <div class="datacont">
            ${bbContREG}
          </div>
          <div class="bb-info">
            <div class="datatime">${new Date(data[i].createdTs * 1000).toLocaleString()}</div>
            ${datacountDOM}
          </div>
          <div class="item-twikoo twikoo-${bbID} d-none">
            <div id="twikoo-${bbID}"></div>
          </div>
        </div>
      </li>`
  }// end for
  let bbBefore = "<section class='bb-timeline'><ul class='bb-list-ul'>"
  let bbAfter = "</ul></section>"
  resultAll = bbBefore + result + bbAfter
  bbDom.insertAdjacentHTML('beforeend', resultAll);
  if(document.querySelector('button.button-load')) document.querySelector('button.button-load').textContent = '加载更多';
  //渲染豆瓣
  fetchDB()
  //图片灯箱
  window.ViewImage && ViewImage.init('.datacont img')
  //相对时间
  window.Lately && Lately.init({ target: '.datatime' });
}

//获取指定 Tag 评论
function getTagNow(e){
  //console.log(e.innerHTML)
  let tagName = e.innerHTML.replace('#','')
  let domClass = document.getElementById("bber")
  window.scrollTo({
    top: domClass.offsetTop - 30,
    behavior: "smooth"
  });
  let tagHtmlNow = `<span class='tag-span' onclick='javascript:location.reload();'>${e.innerHTML}</span>`
  document.querySelector('#tag-list').innerHTML = tagHtmlNow
  let bbUrl = memos+"api/"+apiV1+"memo?creatorId="+bbMemo.creatorId+"&tag="+tagName+"&limit=20";
  fetchMemoDOM(bbUrl)
}

//随机一条 Memos 需手动添加 html 如：<span onclick="randomMemo()">回忆</span>
function randomMemo(){
  let randomUrl1 = memos+"api/"+apiV1+"memo/stats?creatorId="+bbMemo.creatorId;
  fetch(randomUrl1).then(res => res.json()).then( resdata =>{
    let arrData = resdata || ''
    if(resdata.data){
      arrData = resdata.data
    }
    let randomNum = Math.floor(Math.random() * (arrData.length)) + 1;
    let randomUrl2 = memos+"api/"+apiV1+"memo?creatorId="+bbMemo.creatorId+"&rowStatus=NORMAL&limit=1&offset="+randomNum
    fetchMemoDOM(randomUrl2)
  })
}

//搜索 Memo ，基于 v1 api，需手动添加 html 如：<span onclick="serchMemo()">搜索</span>
function serchMemo(){
  let serchText = prompt('搜点啥？','');
  let tagHtmlNow = `<span class='tag-span' onclick='javascript:location.reload();'>${serchText}</span>`
  document.querySelector('#tag-list').innerHTML = tagHtmlNow
  let bbUrl = memos+"api/"+apiV1+"memo?creatorId="+bbMemo.creatorId+"&content="+serchText+"&limit=20";
  fetchMemoDOM(bbUrl)
}

function fetchMemoDOM(bbUrl){
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    let arrData = resdata || ''
    if(resdata.data){
      arrData = resdata.data
    }
    document.querySelector(bbMemo.domId).innerHTML = ""
    if(document.querySelector("button.button-load")) document.querySelector("button.button-load").remove()
    updateTiwkoo(arrData)
  })
}

//设置 openid Memos OpenId
function setOpenID(){
  let memosOpenIdNow = window.localStorage && window.localStorage.getItem("memos-access-token")
  let memosOpenIdSet = prompt('请输入 Memos OpenId ',memosOpenIdNow);
  if(memosOpenIdSet !== null ) window.localStorage && window.localStorage.setItem("memos-access-token", memosOpenIdSet);
}

//点击时间，归档 Memo
function archiveMemo(e) {
  let memoId = e.getAttribute("data-id")
  let memosOpenIdNow = window.localStorage && window.localStorage.getItem("memos-access-token");
  if(memosOpenIdNow && memosOpenIdNow !== 'undefined' && memoId){
    let isOk = confirm("确认归档？");
    if(isOk){
      let memoUrl = memos+"api/"+apiV1+"memo/"+memoId+"?openId="+memosOpenIdNow
      let memoBody = {id:memoId,rowStatus:"ARCHIVED"};
      fetch(memoUrl, {
        method: 'PATCH',
        body: JSON.stringify(memoBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(res) {
        if (res.ok) {
            location.reload();
        }
      })
    }
  }else{
    setOpenID()
  }
}

//前端加载 Twikoo 评论
function loadTwikoo(e) {
  let memoEnv = e.getAttribute("data-twienv")
  let memoId = e.getAttribute("data-id")
  let twikooDom = document.querySelector('.twikoo-'+memoId);
  if (twikooDom.classList.contains('d-none')) {
    document.querySelectorAll('.item-twikoo').forEach((item) => {item.classList.add('d-none');})
    if(!document.getElementById("twikoo")){
      twikooDom.classList.remove('d-none');
      let domClass = document.getElementsByClassName('memo-'+memoId)
      window.scrollTo({
        top: domClass[0].offsetTop - 30,
        behavior: "smooth"
      });
      twikoo.init({
        envId: memoEnv,
        el: '#twikoo-' + memoId,
        path: bbMemo.memos+'m/'+ memoId,
      });
      setTimeout(function(){
        document.getElementById("twikoo").id='twikoo-' + memoId;
      }, 600);
      let memoOne = location.pathname+'?memo='+bbMemos.memos+'m/'+memoId
      history.pushState({memoOne: memoOne, title: document.title}, document.title, memoOne)
    }
  }else{
    twikooDom.classList.add('d-none');
  }
}
//前端加载 Artalk 评论
function loadArtalk(e) {
  let memoEnv = e.getAttribute("data-artenv")
  let memoSite= e.getAttribute("data-artsite")
  let memoId = e.getAttribute("data-id")
  let ArtalkDom = document.querySelector('.artalk-'+memoId);
  let ArtalkDom_ID = document.querySelector('#artalk-'+memoId);
  if(!ArtalkDom_ID){
    ArtalkDom.insertAdjacentHTML('afterbegin', '<div id="artalk-'+ memoId +'"></div>');
  }
  if (ArtalkDom.classList.contains('d-none')) {
    document.querySelectorAll('.item-artalk').forEach((item) => {item.classList.add('d-none');})
    if(!document.getElementById("artalk")){
      ArtalkDom.classList.remove('d-none');
      let domClass = document.getElementsByClassName('memo-'+memoId)
      window.scrollTo({
        top: domClass[0].offsetTop - 30,
        behavior: "smooth"
      });
      Artalk.init({
        el: '#artalk-' + memoId,
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
  let dbAPI = "https://douban-api.edui.fun/";
  let dbA = document.querySelectorAll(".bb-timeline a[href*='douban.com/subject/']:not([rel='noreferrer'])") || '';
  if(dbA){
    for(let i=0;i < dbA.length;i++){
      _this = dbA[i]
      let dbHref = _this.href
      let db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
      let db_type = dbHref.replace(db_reg, "$1");
      let db_id = dbHref.replace(db_reg, "$2").toString();
        if (db_type == 'movie') {
          let this_item = 'movie' + db_id;
          let url = dbAPI + "movies/" + db_id ;
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
          let this_item = 'book' + db_id;
          let url = dbAPI + "v2/book/id/" + db_id;
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
  let storage = localStorage.getItem(fetch_item);
  let data = JSON.parse(storage);
  let db_star = Math.ceil(data.rating);
  let db_html = `<div class="post-preview"><div class="post-preview--meta"><div class="post-preview--middle"><h4 class="post-preview--title"><a target="_blank" rel="noreferrer" href="${fetch_href}">《${data.name}》</a></h4><div class="rating"><div class="rating-star allstar${db_star}"></div><div class="rating-average">${data.rating}</div></div><time class="post-preview--date">导演：${data.director} / 类型：${data.genre} / ${data.year}</time><section style="max-height:75px;overflow:hidden;" class="post-preview--excerpt">${data.intro.replace(/\s*/g, "")}</section></div></div><img referrer-policy="no-referrer" loading="lazy" class="post-preview--image" src="https://dou.img.lithub.cc/movie/${data.sid}.jpg"></div>`
  let db_div = document.createElement("div");
  let qs_href = ".bb-timeline a[href='"+ fetch_href +"']"
  let qs_dom = document.querySelector(qs_href)
  qs_dom.parentNode.replaceChild(db_div, qs_dom);
  db_div.innerHTML = db_html
}
function bookShow(fetch_href, fetch_item) {
  let storage = localStorage.getItem(fetch_item);
  let data = JSON.parse(storage);
  let db_star = Math.ceil(data.rating.average);
  let db_html = `<div class="post-preview"><div class="post-preview--meta"><div class="post-preview--middle"><h4 class="post-preview--title"><a target="_blank" rel="noreferrer" href="${fetch_href}">《${data.title}》</a></h4><div class="rating"><div class="rating-star allstar${db_star}"></div><div class="rating-average">${data.rating.average}</div></div><time class="post-preview--date">作者：${data.author} </time><section style="max-height:75px;overflow:hidden;" class="post-preview--excerpt">${data.summary.replace(/\s*/g, "")}</section></div></div><img referrer-policy="no-referrer" loading="lazy" class="post-preview--image" src="https://dou.img.lithub.cc/book/${data.id}.jpg"></div>`
  let db_div = document.createElement("div");
  let qs_href = ".bb-timeline a[href='"+ fetch_href +"']"
  let qs_dom = document.querySelector(qs_href)
  qs_dom.parentNode.replaceChild(db_div, qs_dom);
  db_div.innerHTML = db_html
}