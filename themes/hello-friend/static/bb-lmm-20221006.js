/*
Last Modified time : 20221006 11:20 by https://immmmm.com
*/

var bbMemo = {
    memos: 'https://demo.usememos.com/',
    limit: '10',
    creatorId: '101',
}
if(typeof(bbMemos) !=="undefined"){
    for(var key in bbMemos) {
      if(bbMemos[key]){
        bbMemo[key] = bbMemos[key];
      }
    }
}
var memos = bbMemo.memos
var limit = bbMemo.limit
var creatorId = bbMemo.creatorId
//以下内容无须修改
var count=0,page = 1,begin = limit*(page-1);
var bbUrl = memos+"api/memo?creatorId="+creatorId+"&rowStatus=NORMAL";
var bbDom = document.querySelector('#bber');
var load = '<div class="load"><button class="load-btn button-load">加载中……</button></div>'
bbDom.insertAdjacentHTML('afterend', load);
//发起一次 fetch，缓存为本地 localStorage，进行分页调用。
fetch(bbUrl).then(res => res.json()).then( resdata =>{
  count = resdata.data.length
  localStorage.setItem('bber_memos', JSON.stringify(resdata.data));
  var bbBefore = '<p class="count">共 <span class="count-data">'+count+'</span> 条</p>'
  bbDom.insertAdjacentHTML('beforebegin', bbBefore);
  getList()
});
function getList(){
  var dataAll = JSON.parse(localStorage.getItem('bber_memos'))
  var dataNow = dataAll.slice(begin,begin+limit)
  if((page-1)*limit >= count){return}
  var result="",resultAll="";
  const CODE_BLOCK_REG = /```(\S*?)\s([\s\S]*?)```(\n?)/g;
  const TODO_LIST_REG = /- \[ \] ([\S ]+)(\n?)/g;
  const DONE_LIST_REG = /- \[x\] ([\S ]+)(\n?)/g;
  const ORDERED_LIST_REG = /(\d+)\. ([\S ]+)(\n?)/g;
  const UNORDERED_LIST_REG = /[*-] ([\S ]+)(\n?)/g;
  const PARAGRAPH_REG = /([\S ]*)(\n?)/g;
  const TAG_REG = /#([^\s#]+?) /g;
  const IMAGE_REG = /!\[.*?\]\((.+?)\)/g;
  const LINK_REG = /\[(.*?)\]\((.+?)\)/g;
  const MARK_REG = /@\[([\S ]+?)\]\((\S+?)\)/g;
  const BOLD_REG = /\*\*([\S ]+)\*\*/g;
  const EMPHASIS_REG = /\*([\S ]+)\*/g;
  const PLAIN_LINK_REG = /(https?:\/\/[ ]+)/g;
  const INLINE_CODE_REG = /`([\S ]+?)`/g;
  const PLAIN_TEXT_REG = /([\S ]+)/g
  for(var i=0;i < dataNow.length;i++){
      var bbTime = '<p class="datatime">'+new Date(dataNow[i].createdTs * 1000).toLocaleString()+'</p>'
      var bbContREG = dataNow[i].content
        .replace(CODE_BLOCK_REG, "<pre lang='$1'>\n$2</pre>$3")
        .replace(TODO_LIST_REG, "<p><span class='todo-block todo' data-value='TODO'></span>$1</p>$2")
        .replace(DONE_LIST_REG, "<p><span class='todo-block done' data-value='DONE'>✓</span>$1</p>$2")
        .replace(ORDERED_LIST_REG, "<p><span class='ol-block'>$1.</span>$2</p>$3")
        .replace(UNORDERED_LIST_REG, "<p><span class='ul-block'>•</span>$1</p>$2")
        .replace(IMAGE_REG, "<img class='img' src='$1' />")
        .replace(MARK_REG, "<span class='memo-link-text' data-value='$2'>$1</span>")
        .replace(BOLD_REG, "<strong>$1</strong>")
        .replace(EMPHASIS_REG, "<em>$1</em>")
        .replace(LINK_REG, "<a class='link' target='_blank' rel='noreferrer' href='$2'>$1</a>")
        .replace(INLINE_CODE_REG, "<code>$1</code>")
        .replace(PLAIN_LINK_REG, "<a class='link' target='_blank' rel='noreferrer' href='$1'>$1</a>")
        .replace(TAG_REG, "<span class='tag-span'>#$1</span> ")
        .replace(PLAIN_TEXT_REG, "$1")
      //解析内置资源上传的图片
      if(dataNow[i].resourceList.length > 0){
        var imgList = dataNow[i].resourceList,imgUrl="";
        for(var i=0;i < imgList.length;i++){
            imgUrl += '<img class="img" src="'+memos+'o/r/'+imgList[i].id+'/'+imgList[i].filename+'"/>'
        }
        bbContREG += imgUrl
      }
      var bbCont = '<p class="datacont">'+bbContREG+'</p>'
      result += '<li class="item"><div>'+bbTime+bbCont+'</div></li>'
  }// end for
  var bbBefore = '<section class="timeline"><ul><div class="list">'
  var bbAfter = '</div></ul></section>'
  resultAll = bbBefore + result + bbAfter
  bbDom.insertAdjacentHTML('beforeend', resultAll);
  document.querySelector('button.button-load').textContent= '加载更多';
  if(page*limit >= count){
    document.querySelector("button.button-load").remove()
    return
  }
  page++
  begin = limit*(page-1)
  //图片灯箱
  window.ViewImage && ViewImage.init('.datacont img')
  //相对时间
  window.Lately && Lately.init({ target: '.datatime' });
}
var btn = document.querySelector("button.button-load");
btn.addEventListener("click", function () {
  btn.textContent= '加载中……';
  getList()
});