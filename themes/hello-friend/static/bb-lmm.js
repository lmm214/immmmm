/*
Last Modified time : 20221120 21:32 by https://immmmm.com
*/
var bbMemo = {
    memos: 'https://demo.usememos.com/',
    limit: '10',
    creatorId: '101',
    domId: '#bber',
}
if(typeof(bbMemos) !=="undefined"){
    for(var key in bbMemos) {
      if(bbMemos[key]){
        bbMemo[key] = bbMemos[key];
      }
    }
}
function loadCssCode(code){
  var style = document.createElement('style');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  //for Chrome Firefox Opera Safari
  style.appendChild(document.createTextNode(code));
  //for IE
  //style.styleSheet.cssText = code;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
}
var allCSS = "#bber{margin-top:2em;width:auto !important;}.bb-timeline pre{color:#aaa;}.bb-timeline ul{margin:0;padding:0;}.bb-timeline ul li{list-style-type:none;margin-bottom:3rem;}.bb-timeline ul li .bb-div{padding:.6rem 1rem;border:1px solid #666;}.bb-load button{font-size:.8rem;font-style:italic;background:none;border-radius:0;border:1px solid #666;padding:10px 30px;width:100%;letter-spacing:0.8rem;}.bb-timeline ul li .datatime{display:flex;width:16px;line-height:18px;font-size:14px;text-align:center;border-right:1px solid rgba(0,0,0,0.35);padding:0 22px 8px 0;float:left;margin-right:1rem;overflow:hidden;max-height:80px;}.bb-timeline ul li .datacont{margin:0 0 0 2.6rem;min-height:88px;}.bb-timeline ul li .datacont img[src*='emotion']{display:inline-block;width:auto;}.bb-timeline ul li .datafrom{color:#aaa;font-size:0.75em !important;font-style:italic;}.bb-timeline ul li p{margin:0;font-size:16px;letter-spacing:1px;color:#3b3d42;line-height:28px;min-height:18px;margin:0;}.bb-timeline pre p{display:inline-block;}.bb-timeline pre p:empty{display:none;}.dark-theme .bb-timeline ul li .datatime{border-color:#666;}.dark-theme .bb-timeline ul li .bb-div p,.dark-theme .bb-timeline .bb-load button{color:#fafafa;}.dark-theme .bb-timeline ul li .bb-div p svg{fill:#fafafa;}.dark-theme .bb-timeline ul li .datafrom{color:#aaa;}.datacont p{min-height:24px;}.datacont blockquote{font-family: KaiTi,STKaiti,STFangsong;margin:0 0 0 1rem;padding:.25rem 2rem;position: relative;border-left:0 none;}.datacont blockquote::before{line-height: 2rem;content: '“';font-family: Georgia, serif;font-size: 28px;font-weight: bold;position: absolute;left: 10px;top:5px;}.datacont .tag-span{color:#42b983;}.datasource a{color:#fafafa;background:#3b3d42;padding:2px 8px;margin:0 6px 0 0;border-radius:5px;font-size:.9rem;font-weight:400;}.datacont .img{cursor:pointer;border-radius:4px;}.datacont .img.square{height:180px;width:180px;object-fit:cover;}.resimg.grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto;gap:4px;width:calc(100%* 2 / 3);box-sizing:border-box;margin:4px 0 0;}.resimg.grid-2{grid-template-columns:repeat(2,1fr);width:80%;}.resimg.grid-4{grid-template-columns:repeat(2,1fr);width:calc(80% * 2 / 3);}.resimg.grid figure.gallery-thumbnail{position:relative;width:100%;height:0;padding-top:100%;cursor:zoom-in;}.resimg figure{text-align:left;max-height:50%;}.resimg figure img{max-height:50vh;}.resimg.grid figure,figcaption{margin:0 !important;}.resimg.grid figure.gallery-thumbnail > img.thumbnail-image{position:absolute;left:0;top:0;display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%;}#bb-footer{letter-spacing:8px;margin:5rem auto 1rem;text-align:center;}.bb-timeline ul li::before{content:none;}"
loadCssCode(allCSS);

var limit = bbMemo.limit
var memos = bbMemo.memos
var page = 1,offset = 0,nextLength = 0,nextDom='';
var bbDom = document.querySelector(bbMemo.domId);
var load = '<div class="bb-load"><button class="load-btn button-load">加载中……</button></div>'
if(bbDom){
  getFirstList() //首次加载数据
  meNums() //加载总数
  var btn = document.querySelector("button.button-load");
  btn.addEventListener("click", function () {
    btn.textContent= '加载中……';
    updateHTMl(nextDom)
    if(nextLength < limit){ //返回数据条数小于限制条数，隐藏
      document.querySelector("button.button-load").remove()
      return
    }
    getNextList()
  });
}
function getFirstList(){
  bbDom.insertAdjacentHTML('afterend', load);
  var bbUrl = memos+"api/memo?creatorId="+bbMemo.creatorId+"&rowStatus=NORMAL&limit="+limit;
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    updateHTMl(resdata.data)
    var nowLength = resdata.data.length
    if(nowLength < limit){ //返回数据条数小于 limit 则直接移除“加载更多”按钮，中断预加载
      document.querySelector("button.button-load").remove()
      return
    }
    page++
    offset = limit*(page-1)
    getNextList()
  });
}
//预加载下一页数据
function getNextList(){
  var bbUrl = memos+"api/memo?creatorId="+bbMemo.creatorId+"&rowStatus=NORMAL&limit="+limit+"&offset="+offset;
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    nextDom = resdata.data
    nextLength = nextDom.length
    page++
    offset = limit*(page-1)
    if(nextLength < 1){ //返回数据条数为 0 ，隐藏
      document.querySelector("button.button-load").remove()
      return
    }
  })
}
//加载总 Memos 数
function meNums(){
  var bbLoad = document.querySelector('.bb-load')
  var bbUrl = memos+"api/memo/stats?creatorId="+bbMemo.creatorId
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    if(resdata.data){
      var allnums = '<div id="bb-footer"><p class="bb-allnums">共 '+resdata.data.length+' 条</p><p class="bb-allpub"><a href="https://immmmm.com/bbs/" target="_blank">Memos Public</a></p></div>'
      bbLoad.insertAdjacentHTML('afterend', allnums);
    }
  })
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
  const MARK_REG = /@\[([\S ]+?)\]\((\S+?)\)/g;
  const BOLD_REG = /\*\*([\S ]+)\*\*/g;
  const EMPHASIS_REG = /\*([\S ]+)\*/g;
  const PLAIN_LINK_REG = /((ht|f)tps?:\/\/[\w\-]+\.[\w\-]+[\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#]) /g;
  const INLINE_CODE_REG = /`([\S ]+?)`/g;
  const PLAIN_TEXT_REG = /([\S ]+)/g;

  const QUOTE_REG = /^>\s+(.+)(\n?)/mg;
  const MARK_IMG_REG = /^(.*)(\n\!\[)/;

  for(var i=0;i < data.length;i++){
      //console.log(data[i].content)
      var bbContREG = data[i].content
        .replace(/([\u4e00-\u9fa5])([A-Za-z0-9?.,;[\]]+)/g, "$1 $2")
        .replace(/([A-Za-z0-9?.,;[\]]+)([\u4e00-\u9fa5])/g, "$1 $2")
        .replace(CODE_BLOCK_REG, "<pre lang='$1'>\n$2</pre>$3")
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
          if(restype !== 'image'){
            resUrl += '<a target="_blank" rel="noreferrer" href="'+memos+'o/r/'+resourceList[j].id+'/'+resourceList[j].filename+'">'+resourceList[j].filename+'</a>'
          }
        }
        if(imgUrl){
          var resImgGrid = ""
          if(resImgLength !== 1){var resImgGrid = "grid grid-"+resImgLength}
          bbContREG += '<div class="resimg '+resImgGrid+'">'+imgUrl+'</div></div>'
        }
        if(resUrl){
          bbContREG += '<p class="datasource">'+resUrl+'</p>'
        }
      }
      result += "<li class='bb-list-li'><div class='bb-div'><div class='datatime'>"+new Date(data[i].createdTs * 1000).toLocaleString()+"</div><div class='datacont'>"+bbContREG+"</div></div></li>"
  }// end for
  var bbBefore = "<section class='bb-timeline'><ul class='bb-list-ul'>"
  var bbAfter = "</ul></section>"
  resultAll = bbBefore + result + bbAfter
  bbDom.insertAdjacentHTML('beforeend', resultAll);
  document.querySelector('button.button-load').textContent= '加载更多';
  //图片灯箱
  window.ViewImage && ViewImage.init('.datacont img')
  //相对时间
  window.Lately && Lately.init({ target: '.datatime' });
}