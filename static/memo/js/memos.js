var memosData = {
  dom:"#memos",
  listDom:"#memo-list",
  limit:"8",
  loadUrl:"../memo/loading.svg",
  gravatar:"https://cravatar.cn"
}
var gravatar = memosData.gravatar;
var memosDom = document.querySelector(memosData.dom);

let memoList
var memoDefaultList = [
  {
    creatorName:'林木木',
    website:'https://immmmm.com',
    link:'https://me.edui.fun',
    creatorId:'101',
    avatar:gravatar+'/avatar/ba83fa02fc4b2ba621514941307e21be.jpeg?s=400',
    twikoo:'https://metk.edui.fun'
  },{
    creatorName:'归臧',
    website:'https://nuoea.com/',
    link:'https://memos.nuoea.com',
    creatorId:'101',
    avatar:gravatar+'/avatar/020d365ea2596ef6d516143bb0552704.jpeg?s=400',
    twikoo:'https://twikoo.nuoea.com'
  },{
    creatorName:'koobai',
    website:'https://koobai.com',
    link:'https://memos.koobai.com',
    creatorId:'1',
    avatar:gravatar+'/avatar/3b3d336a7d389b7ae8531cbe177ae9b7.jpeg?s=400',
    artalk:'https://c.koobai.com',
    artSite:'空白唠叨'
  }
];

var userNow = `
<div class="user-now card-item flex-fill p-3 mb-3 row">
  <div class="item-avatar mr-3"><img class="call-memos-editor user-now-avatar" src="../memo/loading.svg"/></div>
  <span class="user-now-name"></span>
  <div class="row-fill">
    <span class="search-memos button d-md-flex ml-3"><i class="iconfont iconsearch"></i></span>
    <span class="back-memos button d-md-flex ml-3"><i class="iconfont iconswitchuser"></i></span>
  </div>
</div>`
memosDom.insertAdjacentHTML('beforebegin', userNow);
//<span class="theme-toggle header-toggle button d-md-flex ml-3"><i class="iconfont icondaytime-mode"></i></span>

var memosEditorCont = `
<div class="memos-editor animate__animated animate__fadeIn col-12 d-none">
  <div class="memos-editor-body mb-3 p-3">
    <div class="memos-editor-inner animate__animated animate__fadeIn d-none">
      <div class="memos-editor-content">
        <textarea class="memos-editor-textarea text-sm" rows="1" placeholder="任何想法..."></textarea>
      </div>
      <div class="memos-image-list d-flex flex-fill line-xl flex-wrap"></div>
      <div class="memos-editor-tools pt-3">
        <div class="d-flex flex-wrap">
          <div class="button outline action-btn biao-qing-btn mr-3"><i class="iconfont iconsmile"></i></div>
          <div class="button outline action-btn tag-btn mr-3"><i class="iconfont iconnumber"></i></div>
          <div class="button outline action-btn todo-btn mr-3"><i class="iconfont iconunorderedlist"></i></div>
          <div class="button outline action-btn codeone-btn mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><path fill="currentColor" d="M4.825 12.025L8.7 15.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T2.426 12q0-.2.063-.375T2.7 11.3l4.6-4.6q.3-.3.713-.3t.712.3q.3.3.3.713t-.3.712zm14.35-.05L15.3 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.3.3-.7.288t-.7-.313q-.3-.3-.3-.712t.3-.713z"/></svg></div>
          <div class="button outline action-btn code-btn mr-3"><i class="iconfont iconcode"></i></div>
          <div class="button outline action-btn mr-3 link-btn"><i class="iconfont iconlink"></i></div>
          <div class="button outline action-btn mr-3 linkpic-btn"><i class="iconfont iconimage"></i></div>
          <div class="button outline action-btn image-btn mr-3" onclick="this.lastElementChild.click()">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 48 48"><g fill="none"><path fill="currentColor" d="M44 24a2 2 0 1 0-4 0zM24 8a2 2 0 1 0 0-4zm15 32H9v4h30zM8 39V9H4v30zm32-15v15h4V24zM9 8h15V4H9zm0 32a1 1 0 0 1-1-1H4a5 5 0 0 0 5 5zm30 4a5 5 0 0 0 5-5h-4a1 1 0 0 1-1 1zM8 9a1 1 0 0 1 1-1V4a5 5 0 0 0-5 5z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m6 35l10.693-9.802a2 2 0 0 1 2.653-.044L32 36m-4-5l4.773-4.773a2 2 0 0 1 2.615-.186L42 31m-5-13V6m-5 5l5-5l5 5"/></g></svg>
            <input class="memos-upload-image-input d-none" type="file" accept="image/*">
          </div>
        </div>
        <div class="d-flex flex-fill">
          <div class="memos-tag-list d-none mt-2 animate__animated animate__fadeIn"></div>
        </div>
      </div>
      <div class="memos-editor-footer border-t mt-2 pt-2 ">
        <div class="d-flex">
          <div class="editor-selector select outline">
            <select class="select-memos-value pl-2 pr-4 py-2"><option value="PUBLIC">所有人可见</option><option value="PROTECTED">仅登录可见</option><option value="PRIVATE">仅自己可见</option></select>
          </div>
          <div class="button outline random-btn mx-2 p-2"><i class="iconfont iconretweet"></i></div>
          <div class="button outline switchUser-btn d-none d-md-flex mr-2 p-2"><i class="iconfont iconswitchuser"></i></div>
        </div>
        <div class="editor-submit d-flex flex-fill justify-content-end">
          <div class="edit-memos d-none">
            <button class="outline cancel-edit-btn mr-3 px-3 py-2" title="取消">取消</button>
            <button class="primary edit-memos-btn px-3 py-2" title="保存">保存</button>
          </div>
          <button class="primary submit-memos-btn px-3 py-2" title="记下">记下</button>
        </div>
      </div>
    </div>
    <div class="memos-editor-option animate__animated animate__fadeIn d-none">
      <div class="row flex-fill mr-3 p-2">
        <input name="memos-path-url" class="memos-path-input input-text col-6" type="text" value="" placeholder="Memo 网址（最后无斜杠）">
        <input name="memos-token-url" class="memos-token-input input-text col-6" type="text" value="" placeholder="Access Tokens">
      </div>
      <button class="primary submit-openapi-btn px-3 py-2">保存</button>
    </div>
  </div>
  <div class="memos-random d-none"></div>
</div>`;
memosDom.insertAdjacentHTML('afterbegin',memosEditorCont);

var headerDom = document.querySelector(".header-title");
//var editIcon = `<button class="load-memos-editor outline p-1" title=""><i class="iconfont iconedit-square"></i></button>`;
//headerDom.insertAdjacentHTML('afterend', editIcon);
var memosEditorInner = document.querySelector(".memos-editor-inner"); 
var memosEditorOption = document.querySelector(".memos-editor-option");
var memosRadomCont = document.querySelector(".memos-random");
var taglistBtn = document.querySelector(".tag-btn");
var todoBtn = document.querySelector(".todo-btn");
var codeoneBtn = document.querySelector(".codeone-btn");
var codeBtn = document.querySelector(".code-btn");
var linkBtn = document.querySelector(".link-btn");
var linkPicBtn = document.querySelector(".linkpic-btn");
var randomBtn = document.querySelector(".random-btn");
var switchUserBtn = document.querySelector(".switchUser-btn");
var loadEditorBtn = document.querySelector(".call-memos-editor");
var searchBtn = document.querySelector(".search-memos");
var submitApiBtn = document.querySelector(".submit-openapi-btn");
var submitMemoBtn = document.querySelector(".submit-memos-btn");
var memosVisibilitySelect = document.querySelector(".select-memos-value");
var pathInput = document.querySelector(".memos-path-input");
var tokenInput = document.querySelector(".memos-token-input");
var uploadImageInput = document.querySelector(".memos-upload-image-input");
var memosTextarea = document.querySelector(".memos-editor-textarea");
var memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
var memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
var getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
var editMemoDom = document.querySelector(".edit-memos");
var editMemoBtn = document.querySelector(".edit-memos-btn");
var cancelEditBtn = document.querySelector(".cancel-edit-btn");
var biaoqingBtn = document.querySelector(".biao-qing-btn");
var usernowDom = document.querySelector(".user-now");

var memoDom = document.querySelector(memosData.listDom);
var skeleton = `<div class="el-loading"><div class="el-skeleton mb-3"></div><div class="el-skeleton mb-3"></div><div class="el-skeleton width-50 mb-3"></div><div class="el-skeleton mb-3"></div><div class="el-skeleton mb-3"></div><div class="el-skeleton width-50 mb-3"></div></div>`;

var load = `<div class="load col-12"><button class="load-btn button-load d-none flex-fill mb-3 p-3">加载更多</button></div>`;
memoDom.insertAdjacentHTML('afterend', load);
var loadBtn = document.querySelector("button.button-load");

var limit = memosData.limit,page = 1,nums = 0,dataNum = 0,memosContType = 0, memosAccess = 0;
var memoData = [],memosStr = [],memoCreatorMap = {},twikooCount = {},artalkCount = {};

var memosAccessPath = memosData.path;

document.addEventListener("DOMContentLoaded", () => {
  //切换主题
	var getTheme = window.localStorage && window.localStorage.getItem("theme");
	var isDark = getTheme === "dark";
	var isLight = getTheme === "light";
	if (getTheme !== null) {
		document.body.classList.toggle("dark-theme",isDark);
	//	headerIcon.classList.toggle("iconnight-mode",isDark);
	//	headerIcon.classList.toggle("icondaytime-mode",isLight);
	}
	Array.prototype.forEach.call(document.querySelectorAll('.theme-toggle'), function(el){
    el.addEventListener('click', function() {
			document.body.classList.toggle("dark-theme"); 
	//		headerIcon.className = headerIcon.classList.contains("iconnight-mode") ? "iconfont icondaytime-mode" : "iconfont iconnight-mode"
			window.localStorage && window.localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
		});
	});
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    memoList = await getMemoListData(); // 获取自定义列表
  } catch (error) {
    memoList = memoDefaultList
    console.error('load memoDefaultList');
  }
  try {
    emojis = await getEmojisData(); // 获取表情数据
  } catch (error) {
    console.error('Failed to fetch emojis data:', error);
  }
  memoFollow();
  getEditIcon();
});

function memoFollow() {
  //getMemos();
  getUserMemos(memoList[0].link,memoList[0].creatorId,memoList[0].creatorName,memoList[0].avatar,"")
  
  loadBtn.addEventListener("click", function () {
    loadBtn.textContent = '加载中';
    if(page < dataNum) {
      page++;
    }
    updateData(memoData)
  });

  var titleDom = document.querySelector('.back-memos');
  titleDom.addEventListener("click", function () {
    var backIcon = document.querySelector('.back-memos i');
    backIcon.className = backIcon.classList.contains("iconswitchuser") ? "iconfont iconsync" : "iconfont iconswitchuser"
    if(memosContType == 1) {
      getMemos();
      let usernowName = document.querySelector(".user-now-name");
      let usernowAvatar = document.querySelector(".user-now-avatar");
      usernowName.innerHTML = ""
      usernowAvatar.src = "../memo/loading.svg"
    }else{
      getUserMemos(memoList[0].link,memoList[0].creatorId,memoList[0].creatorName,memoList[0].avatar,"")
    }
  });

  async function getMemoCount(m) {
    let twikooData = m.filter(item => item.twikoo);
    if (twikooData.length !== 0) {
      let twikooRes = {};
      for (const { creatorName, twikoo, link, id } of twikooData) {
        if (!twikooRes[creatorName]) {
          twikooRes[creatorName] = {
            creatorName,
            envId: twikoo,
            urls: []
          };
        }
        twikooRes[creatorName].urls.push(`${link}/m/${id}`);
      }
      let twikooList = Object.values(twikooRes);
      let twikooPromise = await Promise.all(
        twikooList.map(async (item) => {
          try {
            let res = await twikoo.getCommentsCount({
              envId: item.envId,
              urls: item.urls,
              includeReply: false
            });
            return res;
          } catch (err) {
            console.error(err);
            return [];
          }
        })
      );
      twikooCount = twikooPromise.flatMap(r => r);
    }
    let artalkData = m.filter(item => item.artalk);
    if (artalkData.length !== 0) {
      let artalkRes = {};
      for (const { creatorName, artalk, artSite, link, id } of artalkData) {
        if (!artalkRes[creatorName]) {
          artalkRes[creatorName] = {
            creatorName,
            envId: artalk,
            site_name: artSite,
            link,
            urls: []
          };
        }
        artalkRes[creatorName].urls.push(`/m/${id}`);
      }
      let artalkList = Object.values(artalkRes);
      let artalkPromise = await Promise.all(
        artalkList.map(async (item) => {
          try {
            let formData = new FormData();
            formData.append('type', 'page_comment');
            formData.append('page_keys', item.urls.join(','));
            formData.append('site_name', item.site_name);
            let response = await fetch(`${item.envId}/api/stat`, {
              method: 'POST',
              body: formData
            });
            if (!response.ok) {
              throw new Error(`Request failed for ${item.envId}/api/stat`);
            }
            let results = await response.json();
            let countList = item.urls.map(url => {
              let count = results.data[url] || 0;
              return { url: item.link + url, count };
            });
            return countList;
          } catch (err) {
            return []; 
          }
        })
      )
      artalkCount = artalkPromise.flatMap(r => r);
    }
    for (const item of m) {
      let count = 0;
      let url = `${item.link}/m/${item.id}`;
      if (item.twikoo) {
        let memoCount = twikooCount.find((o) => o.url === url);
        if (memoCount) {
          count = memoCount.count;
        }
      } else if (item.artalk) {
        let memoCount = artalkCount.find((o) => o.url === url);
        if (memoCount) {
          count = memoCount.count;
        }
      }
      item.count = count;
    }
    return m;
  }
  this.getMemoCount = getMemoCount;


  function updateData(res) {
    res.sort((i,o)=>{
      return( o.createdTs - i.createdTs)
    })
    pagination(res)
    dataNum = Math.ceil(res.length/limit);
    nums = dataNum - 1;
    if (page > nums) {
      loadBtn.classList.add('d-none');
      return
    };
  }
  this.updateData = updateData;

  function pagination(data) {
    memosStr = [];
    var last = page * limit - 1;
    last = last >= data.length ? (data.length - 1) : last;
    for (var i = (page * limit - limit); i <= last; i++) { 
      memosStr.push(data[i])
    };
    updateHtml(memosStr);

    //console.log(usernowDom.offsetTop)
    setTimeout(function() {
      window.scrollTo({
        top: usernowDom.offsetTop - 20,
        behavior: "smooth"
      });
    }, 600);
  }
  
  // 插入 html 
  async function updateHtml(data) {
    let result = '',itemOption = '',itemContent = '';
    let TAG_REG = /#([^#\s!.,;:?"'()]+)(?= )/g, 
      IMG_REG = /\!\[(.*?)\]\((.*?)\)/g,
      LINK_REG = /(?<!!)\[(.*?)\]\((.*?)\)/g,
      LINE_REG = /\n/g,
      BLOCKQUDTE_REG = /\>.*$/g,
      CODE_REG = /\```.*$/g,
      DEODB_LINK_REG = /(https:\/\/(www|movie|book)\.douban\.com\/(game|subject)\/[0-9]+\/).*?/g,
      BILIBILI_REG = /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g,
      NETEASE_MUSIC_REG = /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g,
      QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g,
      QQVIDEO_REG = /<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g,
      YOUKU_REG = /<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g,
      YOUTUBE_REG = /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;
      marked.setOptions({
        breaks: true,
        smartypants: false,
        langPrefix: 'language-'
      });
    for (var i = 0; i < data.length; i++) {
      let memo = data[i];
      let memoString = JSON.stringify(memo).replace(/"/g, '&quot;');
      let avatar = memo.avatar;
      let count = memo.count || "";
      let website = memo.website;
      let creatorName = memo.creatorName;
      let createdTs = memo.createdTs;
      let memosId = createdTs+memo.id;
      let twikooEnv = memo.twikoo;
      let artalkEnv = memo.artalk;
      let artSite = memo.artSite;
      let memosLink = memo.link + "/m/" + memo.id;
      let memosRes = memo.content
        .replace(TAG_REG, "")
        .replace(IMG_REG, "")
        .replace(DEODB_LINK_REG, "")
        .replace(LINK_REG, `<a class='primary' href='$2' target='_blank'>$1</a>`)
        memosRes = marked.parse(memosRes)
        .replace(BILIBILI_REG, `<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>`)
        .replace(NETEASE_MUSIC_REG, `<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>`)
        .replace(QQMUSIC_REG, `<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>`)
        .replace(QQVIDEO_REG, `<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>`)
        .replace(YOUKU_REG, `<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>`)
        .replace(YOUTUBE_REG, `<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>`)

      let transData = memo.content.replace(TAG_REG, "").replace(IMG_REG, "").replace(LINK_REG, "$1").replace(LINE_REG, " ").replace(BLOCKQUDTE_REG, "").replace(CODE_REG, "");
      if(transData.length>140){transData = transData.substring(0,140) + '...'};
      let memosForm = {creatorName:creatorName,content:transData,url:memosLink};
      let memosFormString = JSON.stringify(memosForm).replace(/"/g, '&quot;');

      //解析 content 内 md 格式图片
      let loadUrl = memosData.loadUrl;
      let imgArr = memo.content.match(IMG_REG);
      let imgStr = String(imgArr).replace(/[,]/g, '');
      if (imgArr) {
          let memosImg = imgStr.replace(IMG_REG, `<div class="memo-resource width-100"><img class="lozad" src="${loadUrl}" data-src="$2"></div>`)
          memosRes += `<div class="resource-wrapper"><div class="images-wrapper my-2">${memosImg}</div></div>`
      }
      // NeoDB
      let neodbArr = memo.content.match(DEODB_LINK_REG);
      let neodbDom = '';
      if(neodbArr){
        for(let k=0;k < neodbArr.length;k++){
          neodbDom += await fetchNeoDB(neodbArr[k])
        }
      }
      //标签
      let tagArr = memo.content.match(TAG_REG);
      let memosTag = '';
      if (tagArr) {
        memosTag = tagArr.map(t=>{
          return `<div class="item-tag d-flex align-items-center text-xs line-lg mr-2 px-2" onclick="getTagNow('${memo.link}','${memo.creatorId}','${memo.creatorName}','${memo.avatar}',this)">${String(t).replace(/[#]/, '')}</div>`;
        }).join('');
      }else{
        memosTag = `<div class="item-tag d-flex align-items-center text-xs line-lg mr-2 px-2 no-cursor">动态</div>`;
      }
      
      //解析内置资源文件
      if (memo.resourceList && memo.resourceList.length > 0) {
        let resourceList = memo.resourceList;
        let imgUrl = '',resUrl = '',resImgLength = 0;
        for (let j = 0; j < resourceList.length; j++) {
          let restype = resourceList[j].type.slice(0, 5);
          let resexlink = resourceList[j].externalLink;
          let imgLink = '', fileId = '';
            if (resexlink) {
                imgLink = resexlink
            } else {
                fileId = resourceList[j].publicId || resourceList[j].filename
                imgLink = `${memo.link}/o/r/${resourceList[j].id}/${fileId}`;
            }
          if (restype == 'image') {
            imgUrl += `<div class="memo-resource w-100"><img class="lozad" src="${loadUrl}" data-src="${imgLink}"/></div>`;
            resImgLength = resImgLength + 1
          }
          if (restype !== 'image') {
            resUrl += `<a target="_blank" rel="noreferrer" href="${imgLink}">${resourceList[j].filename}</a>`;
          }
        }
        if (imgUrl) {
          memosRes += `<div class="resource-wrapper"><div class="images-wrapper my-2">${imgUrl}</div></div>`
        }
        if (resUrl) {
          memosRes += `<p class="datasource">${resUrl}</p>`
        }
      }
      if (memosContType === 0) {
        itemOption = `<div class="item-option"><div class="d-flex dropdown"><i class="text-md iconfont iconellipsis"></i><div class="dropdown-wrapper d-none"><a class="btn" onclick="getUserMemos('${memo.link}', '${memo.creatorId}','${memo.creatorName}','${memo.avatar}')">只看他</a>`;
        if (memosOpenId) {
          itemOption += `<a class="btn" data-form="${memosFormString}" onclick="transPond(this)">转发</a>`;
        } else {
          itemOption += `<a class="btn" href="${memosLink}">查看</a>`;
        }
        itemOption += `</div></div></div>`;
      } else if (memosAccess === 1) {
        itemOption = `<div class="item-option"><div class="d-flex dropdown"><i class="text-md iconfont iconellipsis"></i><div class="dropdown-wrapper d-none"><a class="btn edit-btn" data-form="${memoString}" onclick="editMemo(this)">编辑</a><a class="btn" onclick="archiveMemo('${memo.id}')">归档</a><a class="btn" onclick="deleteMemo('${memo.id}')">删除</a></div></div></div>`;
      }
      itemContent = `<div class="item-content"><div class="item-inner">${memosRes}</div><div class="item-footer d-flex mt-2"><div class="d-flex">${memosTag}</div>`;
      if (twikooEnv) {
        itemContent += `<div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a data-id="${memo.id}" data-time="${createdTs}" data-env="${twikooEnv}" data-path="${memosLink}" onclick="loadTwikoo(this)" rel="noopener noreferrer"><i class="iconfont iconmessage"></i></a><span class="ml-1">${count}</span></div></div></div><div id="${memosId}" class="item-comment mt-3 d-none"></div>`;
      } else if (artalkEnv) {
        itemContent += `<div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a data-id="${memo.id}" data-time="${createdTs}" data-env="${artalkEnv}" data-path="${artSite}" onclick="loadArtalk(this)" rel="noopener noreferrer"><i class="iconfont iconmessage"></i></a><span class="ml-1">${count}</span></div></div></div><div id="${memosId}" class="item-comment mt-3 d-none"></div>`;
      } else {
        itemContent += `<div class="d-flex flex-fill justify-content-end"></div></div>`;
      }
      itemContent += `</div></div></div>`
      result += `<div class="memo-${memosId} d-flex animate__animated mb-3"><div class="card-item flex-fill p-3"><div class="item-header d-flex mb-3"><div class="d-flex flex-fill"><div  onclick="getUserMemos('${memo.link}', '${memo.creatorId}','${memo.creatorName}','${memo.avatar}')" class="item-avatar mr-3" style="background-image:url(${avatar})"></div><div class="item-sub d-flex flex-column p-1"><div class="item-creator"><a href="${website}" target="_blank">${creatorName}</a></div><div class="item-mate mt-2 text-xs">${new Date(createdTs * 1000).toLocaleString()}</div></div></div>${itemOption}</div>${neodbDom+itemContent}</div></div>`;
    } // end for

    memoDom.insertAdjacentHTML('beforeend', result);
    loadBtn.textContent = "加载更多";
    function animation() {
      var animate = document.getElementsByClassName("animate__animated");
      Array.prototype.slice.call(animate,0).forEach(function(i,index){
        const top = i.getBoundingClientRect().top; // 目标元素dom距离顶部的高度
        if (top <= window.innerHeight) { // 当top小于等于文档显示区域的高时，就进入可视区域了
          i.classList.contains('animate__fadeIn"') ? '' : i.classList.add("animate__fadeIn")
        }
      })
    }
    animation();
    
    window.addEventListener('scroll', animation);
    //图片灯箱
    window.ViewImage && ViewImage.init('.images-wrapper img')
    //相对时间
    window.Lately && Lately.init({
      target: '.item-mate'
    });
    //延迟加载
    let observer = lozad('.lozad');
    observer.observe();
    //下拉菜单
    let dropdowns = document.querySelectorAll(".dropdown");
    Array.from(dropdowns).forEach(function(dropdown) {
      let lis = Array.from(dropdown.children).slice(1);
      dropdown.addEventListener("mouseenter", function() {
        lis.forEach(function(item) {
          item.classList.remove("d-none");
        });
      });
      dropdown.addEventListener("mouseleave", function() {
        lis.forEach(function(item) {
          item.classList.add("d-none");
        });
      });
    });
  }
};


function withTimeout(millis, promise) {
  let timeout = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Timed out after ${millis} ms.`), millis)
  );
  return Promise.race([promise, timeout]);
};

async function getMemos(search) {
  memoData = [], memoCreatorMap = {}, page = 1, nums = 0, dataNum = 0, memosContType = 0, memosAccess = 0;
  memoDom.innerHTML = skeleton;
  loadBtn.classList.add("d-none");
  let results;
  if(search && search != "" && search != null ){
    results = await Promise.allSettled(memoList.map(u => 
      withTimeout(2000, fetch(`${u.link}/api/v1/memo?creatorId=${u.creatorId}&content=${search}&rowStatus=NORMAL&limit=${limit}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(res.statusText); 
          }
          return response.json();
        })
    )));
  }else{
    results = await Promise.allSettled(memoList.map(u => 
      withTimeout(2000, fetch(`${u.link}/api/v1/memo?creatorId=${u.creatorId}&rowStatus=NORMAL&limit=${limit}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(res.statusText); 
          }
          return response.json();
        })
    )));
  }
  results = results.filter(i => i.status === 'fulfilled');
  memoData = results.flatMap(result => result.value);
  memoList.forEach(item => {
    memoCreatorMap[item.creatorName] = item;
  });
  memoData = memoData.map(item => {
    let data = memoCreatorMap[item.creatorName];
    return {...item, ...data};
  });
  //memoData = await getMemoCount(memoData);
  memoDom.innerHTML = "";
  loadBtn.classList.remove("d-none");
  this.updateData(memoData);
}
//搜索 Memo
searchBtn.addEventListener("click", function () {
  let tagnowHas = document.querySelector(".memos-tagnow") || ''
  if(tagnowHas) tagnowHas.remove();
  let serchText = prompt('搜点啥？','');
  let usernowName = document.querySelector(".user-now-name").innerHTML;
  if(serchText !== ""){
    let serchDom = `
      <div class="memos-tagnow row p-2 mb-2"">
        <div class="memos-tagnow-title mr-3">当前搜索:</div>
        <div class="memos-tagnow-name card-item pr-2 pl-2" onclick="reloadUser()">${serchText}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-auto ml-1 opacity-40"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></div>
      </div>`
    memosDom.insertAdjacentHTML('beforebegin', serchDom);
    if(usernowName == ""){
      getMemos(serchText)
    }else{
      let userNameIndex = memoList.findIndex(item => (item.creatorName == usernowName));
      let userNowData = memoList[userNameIndex]
      getUserMemos(userNowData.link,userNowData.creatorId,userNowData.creatorName,userNowData.avatar,"",serchText)
    }
  }
});

//重载 reloadUser()
function reloadUser(){
  let tagnowHas = document.querySelector(".memos-tagnow") || ''
  if(tagnowHas) tagnowHas.remove();
  let usernowName = document.querySelector(".user-now-name").innerHTML;
  if(usernowName == ""){
    getMemos()
  }else{
    let userNameIndex = memoList.findIndex(item => (item.creatorName == usernowName));
    let userNowData = memoList[userNameIndex]
    getUserMemos(userNowData.link,userNowData.creatorId,userNowData.creatorName,userNowData.avatar,"","")
  }
}

// 获取指定用户列表
async function getUserMemos(u,i,n,a,t,s) {
    var backIcon = document.querySelector('.back-memos i');
    backIcon.className = "iconfont iconswitchuser";
    memoDom.innerHTML = skeleton;
    loadBtn.classList.add('d-none');
    memoData = [],memoCreatorMap = {}, page = 1,nums = 0,dataNum = 0,memosContType = 1;
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    if (u == memosPath) {
      memosAccess = 1;
    };
    let userMemoUrl;
    if(t){
      userMemoUrl = `${u}/api/v1/memo?creatorId=${i}&tag=${t}&rowStatus=NORMAL&limit=50`;
    }else if(s){
      userMemoUrl = `${u}/api/v1/memo?creatorId=${i}&content=${s}&rowStatus=NORMAL&limit=${limit}`;
    }else{
      userMemoUrl = `${u}/api/v1/memo?creatorId=${i}&rowStatus=NORMAL&limit=50`;
    }
    try {
      let response = await fetch(userMemoUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let data = await response.json();
      memoData = data.flatMap(result => result);
      memoList.forEach(item => {
        memoCreatorMap[item.creatorName] = item;
      });
      memoData = memoData.map(item => {
        let data = memoCreatorMap[item.creatorName];
        return {...item, ...data};
      });
      memoData = await this.getMemoCount(memoData);
      memoDom.innerHTML = "";
      loadBtn.classList.remove('d-none');
      let usernowName = document.querySelector(".user-now-name");
      let usernowAvatar = document.querySelector(".user-now-avatar");
      usernowName.innerHTML = n;
      usernowAvatar.src = a;
      this.updateData(memoData);
      //titleDom.innerText = "返回";
    } catch (error) {
      console.error(error);
    }
}
// Fetch NeoDB
async function fetchNeoDB(url){
  let urlNow = "https://api-neodb.immmmm.com/?url="+url
  let response = await fetch(urlNow);
  let dbFetch = await response.json();
  let neodbDom = `<div class="db-card">
    <div class="db-card-subject">
        <div class="db-card-post"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${dbFetch.cover_image_url}"></div>
        <div class="db-card-content">
            <div class="db-card-title"><a href="${url}" class="cute" target="_blank" rel="noreferrer">${dbFetch.title}</a></div>
            <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:${dbFetch.rating*10}%"></span></span><span class="rating_nums">${dbFetch.rating}</span></div>
            <div class="db-card-abstract">${dbFetch.brief}</div>
        </div>
        <div class="db-card-cate">${dbFetch.category}</div>
    </div>
  </div>`
  return neodbDom
}
//获取指定 Tag
function getTagNow(u,i,n,a,e){
  let tagnowHas = document.querySelector(".memos-tagnow") || ''
  if(tagnowHas) tagnowHas.remove();
  let tagName = e.innerHTML
  let tagnowDom = `
  <div class="memos-tagnow row p-2 mb-2"">
    <div class="memos-tagnow-title mr-3">标签筛选:</div>
    <div class="memos-tagnow-name card-item pr-2 pl-2" onclick="reloadUser()">${tagName}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-auto ml-1 opacity-40"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></div>
  </div>`
  memosDom.insertAdjacentHTML('beforebegin', tagnowDom);
  getUserMemos(u,i,n,a,tagName);
}

// 加载Twikoo评论
function loadTwikoo(i) {
  let twikooEnv = i.getAttribute("data-env")
  let twikooPath = i.getAttribute("data-path")
  let twikooId = i.getAttribute("data-id")
  let twikooTime = i.getAttribute("data-time")
  let twikooDom = document.getElementById(`${Number(twikooTime)+Number(twikooId)}`);
  let twikooCon = "<div id='twikoo'></div>"
  if (twikooDom.classList.contains('d-none')) {
    document.querySelectorAll('.item-comment').forEach((item) => {item.classList.add('d-none');})
    if(document.getElementById("twikoo")){
      document.getElementById("twikoo").remove()
    }
    twikooDom.insertAdjacentHTML('beforeend', twikooCon);
    twikooDom.classList.remove('d-none');
    twikoo.init({
      envId: twikooEnv,
      el: '#twikoo', 
      path: twikooPath 
    });
    let memoDomArtalk = document.querySelector(`.memo-${Number(twikooTime)+Number(twikooId)}`)
    window.scrollTo({
      top: memoDomArtalk.offsetTop,
      behavior: "smooth"
    });
  }else{
    twikooDom.classList.add('d-none');
    document.getElementById("twikoo").remove()
  }
}

// 加载Artalk评论
function loadArtalk(e) {
  let artalkEnv = e.getAttribute("data-env")
  let artalkPath= e.getAttribute("data-path")
  let artalkId = e.getAttribute("data-id")
  let artalkTime = e.getAttribute("data-time")
  let artalkDom = document.getElementById(`${Number(artalkTime) + Number(artalkId)}`);
  let artalkCon = "<div id='artalk'></div>"
  if (artalkDom.classList.contains('d-none')) {
    document.querySelectorAll('.item-comment').forEach((item) => {item.classList.add('d-none');})
    if(document.getElementById("artalk")){
      document.getElementById("artalk").remove()
    }
    artalkDom.insertAdjacentHTML('beforeend', artalkCon);
    artalkDom.classList.remove('d-none');
    ArtalkLite.init({
      el: '#artalk',
      pageKey: '/m/' + artalkId,
      pageTitle: '',
      site: artalkPath,
      server: artalkEnv,
      emoticons: false
    });
    let memoDomArtalk = document.querySelector(`.memo-${Number(artalkTime) + Number(artalkId)}`)
    window.scrollTo({
      top: memoDomArtalk.offsetTop - 20,
      behavior: "smooth"
    });
  }else{
    artalkDom.classList.add('d-none');
    document.getElementById("artalk").remove()
  }
}

//转发
function transPond(item){
  let a = JSON.parse(item.getAttribute("data-form"));
  getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display"),
  memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  if(getEditor == "show"){
    let transRes = `[@${a.creatorName}](${a.url}) \n\n> ${a.creatorName}: ${a.content}`;
    memosTextarea.value = transRes;
    memosTextarea.style.height = memosTextarea.scrollHeight + 'px';
    document.body.scrollIntoView({behavior: 'smooth'})
  }else{
    document.body.scrollIntoView({behavior: 'smooth'})
  }
}

//修改
function editMemo(memo) {
  let e = JSON.parse(memo.getAttribute("data-form"));
  let memoContent = e.content,memoId = e.id,memoRelationList = e.relationList,memoResourceList = e.resourceList,memoVisibility = e.visibility;
  getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display"),
  memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  if(memosOpenId && getEditor == "show"){
    memosTextarea.value = memoContent;
    memosTextarea.style.height = memosTextarea.scrollHeight + 'px';
    submitMemoBtn.classList.add("d-none");
    editMemoDom.classList.remove("d-none");
    document.body.scrollIntoView({behavior: 'smooth'});
  }
  editMemoBtn.addEventListener("click", function () {
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token"),
    memoContent = memosTextarea.value,
    memoResourceList = window.localStorage && JSON.parse(window.localStorage.getItem("memos-resource-list")) ? window.localStorage && JSON.parse(window.localStorage.getItem("memos-resource-list")) : e.resourceList,
    memoVisibility = memosVisibilitySelect.value;
    let TAG_REG = /(?<=#)([^#\s!.,;:?"'()]+)(?= )/g;
    let memosTag = memoContent.match(TAG_REG);
    let hasContent = memoContent.length !== 0;
    if (hasContent) {
      let memoUrl = `${memosPath}/api/v1/memo/${memoId}`;
      let memoBody = {content:memoContent,id:memoId,relationList:memoRelationList,resourceList:memoResourceList,visibility:memoVisibility}
      fetch(memoUrl, {
        method: 'PATCH',
        body: JSON.stringify(memoBody),
        headers: {
          'Authorization': `Bearer ${memosOpenId}`,
          'Content-Type': 'application/json'
        }
      }).then(function(res) {
        if (res.ok) {
          if (memosTag !== null) {
            let memoTagUrl = `${memosPath}/api/v1/tag`;
            (async () => {
              for await (let i of memosTag) {
                let response = await fetch(memoTagUrl, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${memosOpenId}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: i
                  })
                });
              }
            })();
          }
          cocoMessage.success(
          '保存成功',
          ()=>{
            submitMemoBtn.classList.remove("d-none");
            editMemoDom.classList.add("d-none");
            location.reload();
          })
        }
      })
    }
  })
}

cancelEditBtn.addEventListener("click", function () {
  if (!editMemoDom.classList.contains("d-none")) {
    memosTextarea.value = '';
    memosTextarea.style.height = 'inherit';
    editMemoDom.classList.add("d-none");
    submitMemoBtn.classList.remove("d-none");
  }
})

function setMemoTag(e){
  let memoTag = '';
  const inputValue = memosTextarea.value;
  const lastWord = inputValue.charAt(inputValue.length - 1);
  if (lastWord == '#') {
    memoTag = e.textContent.replace("#","") + " ";
  }else{
    memoTag = e.textContent + " ";
  }
  memosTextarea.value += memoTag;
  memosTextarea.focus()
  document.querySelector(".memos-tag-list").classList.add("d-none");
}
//归档
function archiveMemo(memoId) {
  memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  if(memosOpenId && memoId){
    let memoUrl = `${memosPath}/api/v1/memo/${memoId}`;
    let memoBody = {id:memoId,rowStatus:"ARCHIVED"};
    fetch(memoUrl, {
      method: 'PATCH',
      body: JSON.stringify(memoBody),
      headers: {
        'Authorization': `Bearer ${memosOpenId}`,
        'Content-Type': 'application/json'
      }
    }).then(function(res) {
      if (res.ok) {
        cocoMessage.success(
        '归档成功',
        ()=>{
          location.reload();
        })
      }
    })
  }
}

//删除
function deleteMemo(memoId) {
  memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  if(memosOpenId && memoId){
    let memoUrl = `${memosPath}/api/v1/memo/${memoId}`;
    fetch(memoUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${memosOpenId}`,
        'Content-Type': 'application/json'
      }
    }).then(function(res) {
      if (res.ok) {
        cocoMessage.success(
        '删除成功',
        ()=>{
          location.reload();
        })
      }
    }).catch(err => {
      cocoMessage.error('出错了，再检查一下吧')
    })
  }
}

function getEditIcon() {
  let memosContent = '',memosVisibility = '',memosResource = [],memosRelation=[];
  let memosCount = window.localStorage && window.localStorage.getItem("memos-response-count");
  let memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
  let memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  let getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
  let isHide = getEditor === "hide";

  window.localStorage && window.localStorage.setItem("memos-resource-list",  JSON.stringify(memosResource));
  window.localStorage && window.localStorage.setItem("memos-relation-list",  JSON.stringify(memosRelation));

  let memosTagList = document.querySelector(".memos-tag-list")
  let selectedTagIndex = -1;
  memosTextarea.addEventListener('input', (e) => {
    memosTextarea.style.height = 'inherit';
    memosTextarea.style.height = e.target.scrollHeight + 'px';
    const inputValue = memosTextarea.value;
    const lastWord = inputValue.slice(-2);
    if (lastWord == ' #') {
      memosTagList.classList.remove('d-none');
    } else {
      memosTagList.classList.add('d-none');
    }
  });

  memosTextarea.addEventListener('keydown', event => {
    const keyCode = event.keyCode;
    if (memosTagList.classList.contains("d-none") === false) {
      const matchingTags = Array.from(memosTagList.querySelectorAll('.memos-tag')).map(tag => tag.textContent);
      if (keyCode === 38 || keyCode === 40 || keyCode === 37 || keyCode === 39) { // 添加左右方向键的处理
        event.preventDefault();
        if (keyCode === 37 || keyCode === 39) { // 处理左右方向键
          const direction = keyCode === 37 ? -1 : 1;
          selectedTagIndex = (selectedTagIndex + direction + matchingTags.length) % matchingTags.length;
        } else { // 处理上下方向键
          selectedTagIndex = (selectedTagIndex + (keyCode === 38 ? -1 : 1) + matchingTags.length) % matchingTags.length;
        }
        Array.from(memosTagList.querySelectorAll('.memos-tag')).forEach((option, index) => option.classList.toggle('selected', index  === selectedTagIndex));
      } else if (keyCode === 13 && selectedTagIndex !== -1) {
        event.preventDefault();
        let tagName = matchingTags[selectedTagIndex].replace(/[#]/,'') + " "
        insertValue(tagName);
        let bracketIndex = memosTextarea.value.indexOf(tagName);
        if (bracketIndex !== -1) {
          memosTextarea.selectionStart = bracketIndex + tagName.length;
          memosTextarea.selectionEnd = bracketIndex + tagName.length;
        }
        memosTagList.querySelector('.memos-tag').classList.remove('selected');
        memosTagList.classList.add('d-none');
        selectedTagIndex = -1;
      }
    }
  });

  if (getEditor !== null) {
		document.querySelector(".memos-editor").classList.toggle("d-none",isHide);
    getEditor == "show" ? hasMemosOpenId() : '';
	};

  loadEditorBtn.addEventListener("click", function () {
    getEditor != "show" ? hasMemosOpenId() : '';
    document.querySelector(".memos-editor").classList.toggle("d-none"); 
    window.localStorage && window.localStorage.setItem("memos-editor-display", document.querySelector(".memos-editor").classList.contains("d-none") ? "hide" : "show");
    getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
  });

  taglistBtn.addEventListener("click", function () {
    document.querySelector(".memos-tag-list").classList.toggle("d-none");
  });

  todoBtn.addEventListener("click", function () {
    let memoTodo = '- [] \n';
    insertValue(memoTodo);
    let bracketIndex = memosTextarea.value.indexOf("[]");
    if (bracketIndex !== -1) {
      memosTextarea.selectionStart = bracketIndex + 1;
      memosTextarea.selectionEnd = bracketIndex + 1;
    }
  });

  codeoneBtn.addEventListener("click", function () {
    let memoCode = ' `` ';
    insertValue(memoCode);
    let bracketIndex = memosTextarea.value.indexOf(" `` ");
    if (bracketIndex !== -1) {
      memosTextarea.selectionStart = bracketIndex + 2;
      memosTextarea.selectionEnd = bracketIndex + 2;
    }
  });

  codeBtn.addEventListener("click", function () {
    let memoCode = '```\n\n```';
    insertValue(memoCode);
    let bracketIndex = memosTextarea.value.indexOf("\n\n");
    if (bracketIndex !== -1) {
      memosTextarea.selectionStart = bracketIndex + 1;
      memosTextarea.selectionEnd = bracketIndex + 1;
    }
  });

  linkBtn.addEventListener("click", function () {
    let memoLink = ' []() ';
    insertValue(memoLink);
    let bracketIndex = memosTextarea.value.indexOf("[]()");
    if (bracketIndex !== -1) {
      memosTextarea.selectionStart = bracketIndex + 3;
      memosTextarea.selectionEnd = bracketIndex + 3;
    }
  });

  linkPicBtn.addEventListener("click", function () {
    let memoLink = ' ![]() ';
    insertValue(memoLink);
    let bracketIndex = memosTextarea.value.indexOf("![]()");
    if (bracketIndex !== -1) {
      memosTextarea.selectionStart = bracketIndex + 4;
      memosTextarea.selectionEnd = bracketIndex + 4;
    }
  });

  function insertValue(t) {
    let textLength = t.length;
    //console.log(textLength)
    memosTextarea.value += t;
    memosTextarea.style.height = memosTextarea.scrollHeight + 'px';
    // 更新光标位置
    memosTextarea.selectionStart = textLength;
    memosTextarea.selectionEnd = textLength;
    memosTextarea.focus()
  }

  randomBtn.addEventListener("click", async function () {
    memosCount = window.localStorage && window.localStorage.getItem("memos-response-count");
    try {
      let randomNum = random(0,memosCount);
      let randomUrl = `${memosPath}/api/v1/memo/all?&limit=1&offset=${randomNum}`;
      let res = await fetch(randomUrl);
      if (res.ok) {
        let resdata = await res.json();
        updateAvatarUrl(resdata);
      } else {
        cocoMessage.error('出错了，再检查一下吧!');
      }
    } catch (err) {
      cocoMessage.error('网络错误');
    }
  });

  uploadImageInput.addEventListener('change', () => {
    let filesData = uploadImageInput.files[0];
    if (uploadImageInput.files.length !== 0){
      uploadImage(filesData);
    }
  });

  async function uploadImage(data) {
    let imageData = new FormData();
    let blobUrl = `${memosPath}/api/v1/resource/blob`;
    imageData.append('file', data, data.name)
    let resp = await fetch(blobUrl, {
      method: "POST",
      body: imageData,
      headers: {
        'Authorization': `Bearer ${memosOpenId}`
      }
    })
    let res = await resp.json();
    if(res.id){
      let imageList = "";
      imageList += `<div data-id="${res.id}" class="memos-tag d-flex text-xs mt-2 mr-2" onclick="deleteImage(this)"><div class="d-flex px-2 justify-content-center">${res.filename}</div></div>`;
      document.querySelector(".memos-image-list").insertAdjacentHTML('afterbegin', imageList);
      cocoMessage.success(
      '上传成功',
      ()=>{
        memosResource.push(res.id);
        window.localStorage && window.localStorage.setItem("memos-resource-list",  JSON.stringify(memosResource));
      })
    }
  };

  switchUserBtn.addEventListener("click", function () {
    memosEditorOption.classList.remove("d-none");
    memosEditorInner.classList.add("d-none");
    memosRadomCont.innerHTML = '';
    tokenInput.value = '';
    pathInput.value = '';
  });

  submitApiBtn.addEventListener("click", function () {
    if(tokenInput.value == null || tokenInput.value == ''){
      cocoMessage.info('请输入Token');
    }else if(pathInput.value == null || pathInput.value == ''){
      cocoMessage.info('请输入Path');
    }else{
      getMemosData(pathInput.value,tokenInput.value);
    }
  });

  submitMemoBtn.addEventListener("click", function () {
    memosContent = memosTextarea.value;
    memosVisibility = memosVisibilitySelect.value;
    memosResource = window.localStorage && JSON.parse(window.localStorage.getItem("memos-resource-list"));
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    let TAG_REG = /(?<=#)([^#\s!.,;:?"'()]+)(?= )/g;
    let memosTag = memosContent.match(TAG_REG);
    let  hasContent = memosContent.length !== 0;
    if (memosOpenId && hasContent) {
      let memoUrl = `${memosPath}/api/v1/memo`;
      let memoBody = {content:memosContent,relationList:memosRelation,resourceIdList:memosResource,visibility:memosVisibility}
      fetch(memoUrl, {
        method: 'POST',
        body: JSON.stringify(memoBody),
        headers: {
          'Authorization': `Bearer ${memosOpenId}`,
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        if (res.status == 200) {
          if (memosTag !== null) {
            let memoTagUrl = `${memosPath}/api/v1/tag`;
            (async () => {
              for await (const i of memosTag) {
                const response = await fetch(memoTagUrl, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${memosOpenId}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: i
                  })
                });
              }
            })();
          }
          cocoMessage.success(
            '发送成功',
            () => {
              location.reload();
            })
        }
      });
      
    }else if(!hasContent){
      cocoMessage.info('内容不能为空');
    }else{
      cocoMessage.info(
        '请设置 Access Tokens',
        () => {
          memosEditorInner.classList.add("d-none");
          memosEditorOption.classList.remove("d-none");
        }
      );
    }
  });

  function hasMemosOpenId() {
    if (!memosOpenId) {
      memosEditorOption.classList.remove("d-none"); 
      cocoMessage.info('请设置 Access Tokens');
    }else{
      const tagUrl = `${memosPath}/api/v1/tag`;
      const response = fetch(tagUrl,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${memosOpenId}`,
          'Content-Type': 'application/json'
        } 
      }).then(response => response.json()).then(resdata => {
        return resdata
      }).then(response => {
        let taglist = "";
        response.map((t)=>{
          taglist += `<div class="memos-tag d-flex text-xs mt-2 mr-2 px-2" onclick="setMemoTag(this)">#${t}</div>`;
        })
        document.querySelector(".memos-tag-list").innerHTML = taglist;
        //cocoMessage.success('准备就绪');
        memosEditorInner.classList.remove("d-none");
        memosEditorOption.classList.add("d-none");
        memosRadomCont.innerHTML = '';
        memosRadomCont.classList.remove("d-none");
      }).catch(err => {
        memosEditorOption.classList.remove("d-none");
        cocoMessage.error('Access Tokens 有误，请重新输入!');
      });
    }
  }

  function random(a,b) {
    let choices = b - a + 1;
    return Math.floor(Math.random() * choices + a);
  }

  async function getMemosData(p,t) {
    try {
      let response = await fetch(`${p}/api/v1/memo`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${t}`,
          'Content-Type': 'application/json'
        } 
      });
      if (response.ok) {
        let resdata = await response.json();
        if (resdata) {
          memosCount = resdata.length;
          window.localStorage && window.localStorage.setItem("memos-access-path", p);
          window.localStorage && window.localStorage.setItem("memos-access-token", t);
          window.localStorage && window.localStorage.setItem("memos-response-count", memosCount);
          cocoMessage.success('保存成功', () => {
            memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
            memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
            location.reload();
            hasMemosOpenId();
          });
        }
      } else {
        cocoMessage.error('出错了，再检查一下吧!');
      }
    } catch (error) {
      cocoMessage.error('出错了，再检查一下吧!');
    }
  }

  async function updateAvatarUrl(e) {
    try {
      let response = await fetch(`${memosPath}/api/v1/user/me`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${memosOpenId}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        let resdata = await response.json();
        e.forEach(item => {
          item.avatarUrl = resdata.avatarUrl;
        });
        updateRadom(e);
      } else {
        cocoMessage.error('出错了，再检查一下吧!');
      }
    } catch (error) {
      cocoMessage.error('出错了，再检查一下吧!');
    }
  }

  function updateRadom(data) {
    let result = '',itemOption = '';
    let TAG_REG = /#((?!^\d+$)[^\s#,.!()/\d]+)/g, 
      IMG_REG = /\!\[(.*?)\]\((.*?)\)/g,
      LINK_REG = /\[(.*?)\]\((.*?)\)/g, 
      BILIBILI_REG = /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g,
      NETEASE_MUSIC_REG = /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g,
      QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
      marked.setOptions({
        breaks: !0,
        smartypants: !0,
        langPrefix: 'language-'
      });

    for (let i = 0; i < data.length; i++) {
      let memo = data[i];
      let memoString = JSON.stringify(memo).replace(/"/g, '&quot;');
      let avatar = memo.avatarUrl;
      let creatorName = memo.creatorName;
      let createdTs = memo.createdTs;
      let memosId = memo.id;
      let memosLink = `${memosPath}/m/${memosId}`;
      let memosRes = memo.content
        .replace(TAG_REG, "")
        .replace(IMG_REG, "")
        .replace(LINK_REG, `<a class="primary" href="$2" target="_blank">$1</a>`)
        memosRes = marked.parse(memosRes)
        .replace(BILIBILI_REG, `<div class="video-wrapper"><iframe src="//player.bilibili.com/player.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>`)
        .replace(NETEASE_MUSIC_REG, `<meting-js auto="https://music.163.com/#/song?id=$1"></meting-js>`)
        .replace(QQMUSIC_REG, `<meting-js auto="https://y.qq.com/n/yqq/song$1.html"></meting-js>`)
      
      //解析 content 内 md 格式图片
      let loadUrl = memosData.loadUrl;
      let imgArr = memo.content.match(IMG_REG);
      let imgStr = String(imgArr).replace(/[,]/g, '');
      if (imgArr) {
        let memosImg = imgStr.replace(IMG_REG, `<div class="memo-resource width-100"><img class="lozad" src="${loadUrl}" data-src="$2"></div>`);
        memosRes += `<div class="resource-wrapper"><div class="images-wrapper my-2">${memosImg}</div></div>`;        
      }
      
      let tagArr = memo.content.match(TAG_REG);
      let memosTag = '';
      if (tagArr) {
        memosTag = tagArr.map(t=>{
          return `<div class="item-tag d-flex align-items-center text-xs line-lg mr-2 px-2" onclick="getTagNow('${memosPath}','${memo.creatorId}','${creatorName}','${avatar}',this)">${String(t).replace(/[#]/, '')}</div>`;
        }).join('');
      }else{
        memosTag = `<div class="item-tag d-flex align-items-center text-xs line-lg mr-2 px-2">动态</div>`;
      }
      
      //解析内置资源文件
      if (memo.resourceList && memo.resourceList.length > 0) {
        let resourceList = memo.resourceList;
        let imgUrl = '',resUrl = '',resImgLength = 0;
        for (let j = 0; j < resourceList.length; j++) {
          let restype = resourceList[j].type.slice(0, 5);
          let resexlink = resourceList[j].externalLink;
          let imgLink = '', fileId = '';
          if (resexlink) {
            imgLink = resexlink
          } else {
            fileId = resourceList[j].publicId || resourceList[j].filename
            imgLink = `${memo.link}/o/r/${resourceList[j].id}/${fileId}`;
          }
          if (restype == 'image') {
            imgUrl += `<div class="memo-resource w-100"><img class="lozad" src="${loadUrl}" data-src="${imgLink}"/></div>`;
            resImgLength = resImgLength + 1
          }
          if (restype !== 'image') {
            resUrl += `<a target="_blank" rel="noreferrer" href="${imgLink}">${resourceList[j].filename}</a>`;
          }
        }
        if (imgUrl) {
          memosRes += `<div class="resource-wrapper"><div class="images-wrapper my-2">${imgUrl}</div></div>`
        }
        if (resUrl) {
          memosRes += `<p class="datasource">${resUrl}</p>`
        }
      }
      itemOption = `<div class="item-option"><div class="d-flex dropdown"><i class="text-md iconfont iconellipsis"></i><div class="dropdown-wrapper d-none"><a class="btn edit-btn" data-form="${memoString}" onclick="editMemo(this)">编辑</a><a class="btn" onclick="archiveMemo('${memosId}')">归档</a><a class="btn" onclick="deleteMemo('${memosId}')">删除</a></div></div></div>`;
      result += `<div class="d-flex animate__animated animate__fadeIn mb-3"><div class="card-item flex-fill p-3"><div class="item-header d-flex mb-3"><div class="item-avatar mr-3" style="background-image:url(${avatar})"></div><div class="item-sub d-flex flex-column"><div class="item-creator"><a href="${memosPath}" target="_blank">${creatorName}</a></div><div class="item-mate mt-2 text-xs">${new Date(createdTs * 1000).toLocaleString()}</div></div>${itemOption}</div><div class="item-content"><div class="item-inner">${memosRes}</div><div class="item-footer d-flex mt-2"><div class="d-flex">${memosTag}</div><div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a href="${memosLink}" target="_blank"><i class="iconfont iconlink-ex"></i></a></div></div></div></div></div></div>`;
    };
    memosRadomCont.innerHTML = result;

    //图片灯箱
    window.ViewImage && ViewImage.init('.images-wrapper img')
    //相对时间
    window.Lately && Lately.init({
      target: '.item-mate'
    });
    //延迟加载
    let observer = lozad('.lozad');
    observer.observe();
    //下拉菜单
    let dropdowns = document.querySelectorAll(".dropdown");
    Array.from(dropdowns).forEach(function(dropdown) {
      let lis = Array.from(dropdown.children).slice(1);
      dropdown.addEventListener("mouseenter", function() {
        lis.forEach(function(item) {
          item.classList.remove("d-none");
        });
      });
      dropdown.addEventListener("mouseleave", function() {
        lis.forEach(function(item) {
          item.classList.add("d-none");
        });
      });
    });
  }
}

function deleteImage(e){
  if(e){
    let memoId = e.getAttribute("data-id")
    let memosResource = window.localStorage && JSON.parse(window.localStorage.getItem("memos-resource-list"));
    let memosResourceList = memosResource.filter(function(item){ return item != memoId});
    window.localStorage && window.localStorage.setItem("memos-resource-list",  JSON.stringify(memosResourceList));
    e.remove()
  } 
}

// 获取自定义 memos.json 订阅列表
async function getMemoListData() {
  const response = await fetch('../memo.json');
  const data = await response.json();
  return data.myMemoList
}

// 获取 owo.json 文件中的数据
let emojiSelectorVisible = false;
let emojiSelector;
let emojis = []; // 缓存表情数据
async function getEmojisData() {
  const response = await fetch('../memo/js/owo.json');
  const data = await response.json();
  return data.Emoji.container;
}
// 表情选择器点击事件处理
biaoqingBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  emojiSelectorVisible = !emojiSelectorVisible;
  if (emojiSelectorVisible) {
    displayEmojiSelector();
  } else {
    emojiSelector?.remove();
  }
});
// 显示表情选择器
function displayEmojiSelector() {
  if (!emojiSelector) {
    emojiSelector = document.createElement('div');
    emojiSelector.classList.add('emoji-selector');
    emojiSelector.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('emoji-item')) {
        insertEmoji(target.innerHTML);
      }
    });
  }
  emojiSelector.innerHTML = '';
  emojis.forEach(emoji => {
    const emojiItem = document.createElement('div');
    emojiItem.classList.add('emoji-item');
    emojiItem.innerHTML = emoji.icon;
    emojiItem.title = emoji.text;
    emojiSelector.appendChild(emojiItem);
  });
  const memosEditorTools = document.querySelector(".memos-editor-tools");
  if (memosEditorTools) {
    memosEditorTools.insertAdjacentElement('afterend', emojiSelector);
  }
}
// 表情光标位置
function insertEmoji(emojiText) {
  const selectionStart = memosTextarea.selectionStart;
  const newValue = `${memosTextarea.value.substring(0, selectionStart)}${emojiText}${memosTextarea.value.substring(memosTextarea.selectionEnd)}`;
  memosTextarea.value = newValue;
  memosTextarea.dispatchEvent(new Event('input'));
  const newCursorPosition = selectionStart + emojiText.length;
  memosTextarea.setSelectionRange(newCursorPosition, newCursorPosition);
  memosTextarea.focus();
}