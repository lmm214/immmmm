/*
Last Modified time : 20221010 23:32 by https://immmmm.com
*/

var bbDom = document.querySelector('#bbs');
bbDom.innerHTML = '<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
const urls = [
  {host:"https://me.edui.fun/",creatorId:"101",md5:"ba83fa02fc4b2ba621514941307e21be"},
  {host:"https://me.edui.fun/",creatorId:"102",md5:"8faeaa1b58a25c03be347b5a7fb5b42a"},
  {host:"https://bb.elizen.me/",creatorId:"101",md5:"f65df4d87240feb1cb247857a621a48f"},
  {host:"https://qzone.boyhu.cn/",creatorId:"101",md5:"55be217893c75baf8571837197de4a3e"},
  {host:"https://me.chenplus.com/",creatorId:"101",md5:"d1ed9c15ba6d0cb18464118c6288a8ff"},
  {host:"https://memos.life97.top/",creatorId:"101",md5:"d41d8cd98f00b204e9800998ecf8427e"},
  {host:"https://memos.1900.live/",creatorId:"101",md5:"cc38267b10cc25dfc62209f8ca34589e"},
]
allUrls()
function allUrls(){
  var myHtml = ''
  for(var i=0;i < urls.length;i++){
    myHtml += '<div class="bbs-urls" onclick="urlsNow(this)" data-host="'+urls[i].host+'" data-creatorId="'+urls[i].creatorId+'"><img src="https://cravatar.cn/avatar/'+urls[i].md5+'" alt=""></div>'
  }
  myHtml = '<div id="bbs-urls">'+myHtml+'</div>'
  bbDom.insertAdjacentHTML('beforebegin', myHtml);
}
function urlsNow(e){
  bbDom.innerHTML = '<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
  var host = e.getAttribute("data-host")
  var creId = e.getAttribute("data-creatorId")
  var bbUrl = host+"api/memo?creatorId="+creId+"&rowStatus=NORMAL&limit=10"
  console.log(bbUrl)
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    //console.log(resdata)
    bbDom.innerHTML = ''
    bbsDatas.length = 0
        for(var j=0;j < resdata.data.length;j++){
          var resValue = resdata.data[j]
          var mailMd5 = md5(resValue.creator.email)
          bbsData = {
            updatedTs: resValue.updatedTs,
            creatorId:resValue.creatorId,
            creator: resValue.creator.name,
            mailmd5: mailMd5,
            content: resValue.content,
            resourceList: resValue.resourceList,
            url:host
          }
          bbsDatas.push(bbsData)
    }
    updateHTMl(bbsDatas)
  });
}

let bbsDatas = [],bbsData = {},limit = 5
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
   // url => withTimeout(2000,fetch(url+"api/memo/all?rowStatus=NORMAL&limit=1").then(response => response.json()).then(resdata => resdata.data))
   url => fetch(url.host+"api/memo?creatorId="+url.creatorId+"&rowStatus=NORMAL&limit="+limit).then(response => response.json()).then(resdata => resdata.data)
  )).then(results=> {
    //console.log(results)
    bbDom.innerHTML = ''
    for(var i=0;i < results.length;i++){
      var status = results[i].status
      if(status == "fulfilled"){
        var resultsRes = results[i].value
        for(var j=0;j < resultsRes.length;j++){
          var resValue = resultsRes[j]
          var mailMd5 = md5(resValue.creator.email)
          bbsData = {
            updatedTs: resValue.updatedTs,
            creatorId:resValue.creatorId,
            creator: resValue.creator.name,
            mailmd5: mailMd5,
            content: resValue.content,
            resourceList: resValue.resourceList,
            url:urls[i].host
          }
          bbsDatas.push(bbsData)
        }
      }
    }
    bbsDatas.sort(compare("updatedTs"));
    //console.log(bbsDatas)
    updateHTMl(bbsDatas)
  })
}
fetchBBser()

function compare(p){ //这是比较函数
  return function(m,n){
      var a = m[p];
      var b = n[p];
      return b - a; //升序
  }
}
function uniqueFunc(arr){
  const res = new Map();
  return arr.filter((item) => !res.has(item.creator) && res.set(item.creator, 1));
}

// 插入 html 
function updateHTMl(data){
  var result="",resultAll="";
  const CODE_BLOCK_REG = /<p>```<\/p>(\S*?)\s([\s\S]*?)<p>```<\/p>(\n?)/g;
  const TODO_LIST_REG = /- \[ \] ([\S ]+)(\n?)/g;
  const DONE_LIST_REG = /- \[x\] ([\S ]+)(\n?)/g;
  const ORDERED_LIST_REG = /(\d+)\. ([\S ]+)(\n?)/g;
  const UNORDERED_LIST_REG = /[*-] ([\S ]+)(\n?)/g;
  const PARAGRAPH_REG = /^([\S ]*)(\n?)/mg;
  const TAG_REG = /#([^\s#]+?) /g;
  const IMAGE_OLD_REG = /!\[.*?\]\(\/([a-z]\/[a-z]\/.+?)\)/g;
  const IMAGE_REG = /!\[.*?\]\((.+?)\)/g;
  const LINK_REG = /\[(.*?)\]\((.+?)\)/g;
  const LINK_BILIBILI_REG = /\[(.*?)\]\((.+?)\)/g;
  const MARK_REG = /@\[([\S ]+?)\]\((\S+?)\)/g;
  const BOLD_REG = /\*\*([\S ]+)\*\*/g;
  const EMPHASIS_REG = /\*([\S ]+)\*/g;
  const PLAIN_LINK_REG = /((ht|f)tps?:\/\/[\w\-]+\.[\w\-]+[\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#]) /g;
  const INLINE_CODE_REG = /`([\S ]+?)`/g;
  const PLAIN_TEXT_REG = /([\S ]+)/g;

  const QUOTE_REG = /> ([\S ]+)/mg;
  const MARK_IMG_REG = /^(.*)(\n\!\[)/;

  for(var i=0;i < data.length;i++){
      //console.log(data[i].content)
      var memos = data[i].url
      var bbContREG = data[i].content
        .replace(/([\u4e00-\u9fa5])([A-Za-z0-9?.,;[\]]+)/g, "$1 $2")
        .replace(/([A-Za-z0-9?.,;[\]]+)([\u4e00-\u9fa5])/g, "$1 $2")
        .replace(TODO_LIST_REG, "<p><span class='todo-block todo' data-value='TODO'></span>$1</p>$2")
        .replace(DONE_LIST_REG, "<p><span class='todo-block done' data-value='DONE'>✓</span>$1</p>$2")
        .replace(ORDERED_LIST_REG, "<span class='ol-block'>$1.</span>$2 $3")
        .replace(UNORDERED_LIST_REG, "<span class='ul-block'>•</span>$1 $2")
        .replace(QUOTE_REG, "<blockquote>$1</blockquote>")
        .replace(PARAGRAPH_REG, "<p>$1</p>$2")
        .replace(MARK_IMG_REG, "<p>$1</p>$2")
        .replace(CODE_BLOCK_REG, "<pre lang='$1'>\n$2</pre>$3")
        .replace(IMAGE_OLD_REG, "<img class='img old square' src='"+memos+"$1' />")
        .replace(IMAGE_REG, "<img class='img square' src='$1' />")
        .replace(MARK_REG, "<span class='memo-link-text' data-value='$2'>$1</span>")
        .replace(BOLD_REG, "<strong>$1</strong>")
        .replace(EMPHASIS_REG, "<em>$1</em>")
        .replace(LINK_REG, "<a class='link' target='_blank' rel='noreferrer' href='$2'>$1</a>")
        .replace(INLINE_CODE_REG, "<code>$1</code>")
        .replace(PLAIN_LINK_REG, "<a class='link' target='_blank' rel='noreferrer' href='$1'>$1</a> ")
        .replace(TAG_REG, "<span class='tag-span'>#$1</span> ")
        .replace(PLAIN_TEXT_REG, "$1")
      //console.log(bbContREG)
      //解析内置资源文件
      if(data[i].resourceList && data[i].resourceList.length > 0){
        var resourceList = data[i].resourceList;
        var imgUrl='',resUrl='',resImgLength = 0;
        for(var j=0;j < resourceList.length;j++){
          var restype = resourceList[j].type.slice(0,5);
          if(restype == 'image'){
            imgUrl += '<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="'+memos+'o/r/'+resourceList[j].id+'/'+resourceList[j].filename+'"/></figure>'
            resImgLength = resImgLength + 1 
          }
          if(restype !== 'image' && restype !== 'video'){
            resUrl += '<a target="_blank" rel="noreferrer" href="'+memos+'o/r/'+resourceList[j].id+'/'+resourceList[j].filename+'">'+resourceList[j].filename+'</a>'
          }
        }
        if(imgUrl){
          var resImgGrid = ""
          if(resImgLength !== 1){var resImgGrid = "grid grid-"+resImgLength}
          bbContREG += '<div class="resimg '+resImgGrid+'">'+imgUrl+'</div></div>'
        }
        if(resUrl){
          bbContREG += '<div class="resour">'+resUrl+'</div>'
        }
      }
      result += '<li class=""><div class="bbs-avatar"><img src="https://cravatar.cn/avatar/'+data[i].mailmd5+'" alt=""><a href="'+data[i].url+'" target="_blank" rel="noopener noreferrer" class="bbs-creator">'+data[i].creator+'</a><span class="bbs-dot">·</span><span class="bbs-date">'+new Date(data[i].updatedTs * 1000).toLocaleString()+'</span></div><div class="bbs-content"><div class="bbs-text">'+bbContREG+'</div></div></li>'
  }// end for
  var bbBefore = "<section class='bbs-timeline'><ul class='list'>"
  var bbAfter = "</ul></section>"
  resultAll = bbBefore + result + bbAfter
  bbDom.insertAdjacentHTML('beforeend', resultAll);
  //图片灯箱
  window.ViewImage && ViewImage.init('.bbs-content img')
  //相对时间
  window.Lately && Lately.init({ target: '.bbs-date' });
}