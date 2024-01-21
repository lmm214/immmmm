/**
 * memos.js 24.1.21
 * https://immmmm.com/
 */
var memosData = {
  dom:"#memos",
  listDom:"#memo-list",
  limit:"8",
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
    avatar:gravatar+'/avatar/ba83fa02fc4b2ba621514941307e21be?s=80',
    twikoo:'https://metk.edui.fun'
  },{
    creatorName:'归臧',
    website:'https://nuoea.com',
    link:'https://memos.nuoea.com',
    creatorId:'101',
    avatar:gravatar+'/avatar/020d365ea2596ef6d516143bb0552704?s=80',
    twikoo:'https://twikoo.nuoea.com'
  },{
    creatorName:'koobai',
    website:'https://koobai.com',
    link:'https://memos.koobai.com',
    creatorId:'1',
    avatar:gravatar+'/avatar/3b3d336a7d389b7ae8531cbe177ae9b7?s=80',
    artalk:'https://c.koobai.com',
    artSite:'空白唠叨'
  }
];

var userNow = `
<div class="user-now card-item flex-fill mb-3 row">
  <div class="call-memos-editor item-avatar p-3 "><img class="user-now-avatar" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/ style="pointer-events: none;"></div>
  <span class="user-now-name"></span>
  <div class="row-fill">
    <input class="search-memos-input border-b input-text py-2 animate__animated animate__fadeIn animate__fadeInRight d-none" type="text" placeholder="想搜点啥？" id="">
    <span class="search-memos-btn button d-md-flex p-2 mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21l-4.3-4.3"/></g></svg>
    </span>
    <span class="userlist-memos button d-md-flex p-2 mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 19a6 6 0 0 0-12 0"/><circle cx="8" cy="9" r="4"/><path d="M22 19a6 6 0 0 0-6-6a4 4 0 1 0 0-8"/></g></svg>
    </span>
    <span class="randomuser-memos button d-md-flex p-2 mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16m-8-8v8m-4 8l-2 3m12 0l-2-3m0-4"/></g></svg>
    </span>
    <span class="gobbs-memos button d-md-flex p-2 mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9m2.9 2.8a6.14 6.14 0 0 0-.8 7.5"/><circle cx="12" cy="9" r="2"/><path d="M16.2 4.8c2 2 2.26 5.11.8 7.47M19.1 1.9a9.96 9.96 0 0 1 0 14.1m-9.6 2h5M8 22l4-11l4 11"/></g></svg>
    </span> 
    <span class="gohome-memos button d-md-flex p-2 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m3 9l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></g></svg>
    </span>
  </div>
</div>`
memosDom.insertAdjacentHTML('beforebegin', userNow);

var memosEditorCont = `
<div class="memos-editor animate__animated animate__fadeIn col-12 d-none">
  <div class="memos-editor-body mb-3 p-3">
    <div class="memos-editor-inner animate__animated animate__fadeIn d-none">
      <div class="memos-editor-content">
        <textarea class="memos-editor-textarea text-sm" rows="1" placeholder="任何想法..."></textarea>
      </div>
      <div class="memos-image-list d-flex flex-fill line-xl flex-wrap"></div>
      <div class="memos-editor-tools pt-1">
        <div class="d-flex flex-wrap">
          <div class="button outline action-btn biao-qing-btn mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2s4-2 4-2M9 9h.01M15 9h.01"/></g></svg>
          </div>
          <div class="button outline action-btn tag-btn mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h16M4 15h16M10 3L8 21m8-18l-2 18"/></svg>
          </div>
          <div class="button outline action-btn codeone-btn mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 7l-5 5l5 5m8 0l5-5l-5-5"/></svg>
          </div>
          <div class="button outline action-btn code-btn mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16"/></svg>
          </div>
          <div class="button outline action-btn mr-2 link-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17H7A5 5 0 0 1 7 7h2m6 0h2a5 5 0 1 1 0 10h-2m-7-5h8"/></svg>
          </div>
          <div class="button outline action-btn mr-2 linkpic-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></g></svg>
          </div>
          <div class="button outline action-btn image-btn mr-2" onclick="this.lastElementChild.click()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.35rem" height="1.35rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7m4 2h6m-3-3v6"/><circle cx="9" cy="9" r="2"/><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></g></svg>
            <input class="memos-upload-image-input d-none" type="file" accept="image/*">
          </div>
        </div>
        <div class="d-flex flex-fill">
          <div class="memos-tag-list d-none mt-2 animate__animated animate__fadeIn"></div>
        </div>
      </div>
      <div class="memos-editor-footer border-t mt-2 pt-2 flex-wrap">
        <div class="d-flex">
          <div class="button outline switchUser-btn d-none d-md-flex mr-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width=".9rem" height=".9rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 7h-9m3 10H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></g></svg>
          </div>
          <div class="button outline private-btn mr-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width=".9rem" height=".9rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3l2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8"/></svg>
          </div>
          <div class="button outline random-btn mr-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width=".9rem" height=".9rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2l4 4l-4 4M2 6h1.9c1.5 0 2.9.9 3.6 2.2M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14l4 4l-4 4"/></g></svg>
          </div>
        </div>
        <div class="editor-submit d-flex flex-fill justify-content-end">
          <div class="editor-selector select outline mr-5">
            <select class="select-memos-value pl-2 pr-4 py-2">
              <option value="PUBLIC">公开</option>
              <option value="PRIVATE">私有</option>
            </select>
          </div>
          <div class="edit-memos d-none">
            <button class="outline cancel-edit-btn mr-3 px-3 py-2" title="取消">取消</button>
            <button class="primary edit-memos-btn px-5 py-2" title="保存">保存</button>
          </div>
          <button class="primary submit-memos-btn px-5 py-2" title="记下">记下</button>
        </div>
      </div>
    </div>
    <div class="memos-editor-option animate__animated animate__fadeIn d-none">
      <div class="row flex-fill mr-3 p-2">
        <input name="memos-path-url" class="memos-path-input border-b input-text col-6 py-2" type="text" value="" placeholder="Memo 网址">
        <input name="memos-token-url" class="memos-token-input border-b input-text col-6 py-2" type="text" value="" placeholder="Access Tokens">
        <input name="artalk-url" class="memos-artalk-input border-b input-text col-6 py-2" type="text" value="" placeholder="[可选]Artalk 评论网址">
        <input name="artalk-site-name" class="memos-artalksite-input border-b input-text col-6 py-2" type="text" value="" placeholder="[可选] Artalk 站点名称">
        <input name="twikoo-path-url" class="memos-twikoo-input border-b input-text col-6 py-2" type="text" value="" placeholder="[可选]Twikoo 评论网址">
      </div>
      <button class="primary submit-openapi-btn px-5 py-2">保存</button>
    </div>
  </div>
  <div class="memos-random d-none"></div>
</div>`;
memosDom.insertAdjacentHTML('afterbegin',memosEditorCont);

var memosEditorInner = document.querySelector(".memos-editor-inner"); 
var memosEditorOption = document.querySelector(".memos-editor-option");
var memosRadomCont = document.querySelector(".memos-random");
var taglistBtn = document.querySelector(".tag-btn");
var codeoneBtn = document.querySelector(".codeone-btn");
var codeBtn = document.querySelector(".code-btn");
var linkBtn = document.querySelector(".link-btn");
var linkPicBtn = document.querySelector(".linkpic-btn");
var randomBtn = document.querySelector(".random-btn");
var privateBtn = document.querySelector(".private-btn");
var switchUserBtn = document.querySelector(".switchUser-btn");
var loadEditorBtn = document.querySelector(".call-memos-editor");
var searchBtn = document.querySelector(".search-memos-btn");
var searchInput = document.querySelector(".search-memos-input");
var userlistBtn = document.querySelector(".userlist-memos");
var randomUserBtn = document.querySelector(".randomuser-memos");
var submitApiBtn = document.querySelector(".submit-openapi-btn");
var submitMemoBtn = document.querySelector(".submit-memos-btn");
var memosVisibilitySelect = document.querySelector(".select-memos-value");
var pathInput = document.querySelector(".memos-path-input");
var tokenInput = document.querySelector(".memos-token-input");
var artalkInput = document.querySelector(".memos-artalk-input");
var artalkSiteInput = document.querySelector(".memos-artalksite-input");
var twikooInput = document.querySelector(".memos-twikoo-input");
var uploadImageInput = document.querySelector(".memos-upload-image-input");
var memosTextarea = document.querySelector(".memos-editor-textarea");
var getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
var getMode = window.localStorage && window.localStorage.getItem("memos-mode");
var memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
var memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
var memosMeID = window.localStorage && window.localStorage.getItem("memos-me-id");
var memosMeNickname = window.localStorage && window.localStorage.getItem("memos-me-nickname");
var memosMeAvatarUrl = window.localStorage && window.localStorage.getItem("memos-me-avatarurl");
var memosMeArtalk = window.localStorage && window.localStorage.getItem("memos-artalk-input");
var memosMeArtalkSite = window.localStorage && window.localStorage.getItem("memos-artalksite-input");
var memosMeTwikoo = window.localStorage && window.localStorage.getItem("memos-twikoo-input");

var editMemoDom = document.querySelector(".edit-memos");
var editMemoBtn = document.querySelector(".edit-memos-btn");
var cancelEditBtn = document.querySelector(".cancel-edit-btn");
var biaoqingBtn = document.querySelector(".biao-qing-btn");
var usernowDom = document.querySelector(".user-now");
var usernowBtnDom = document.querySelectorAll(".user-now .button");
var goHomeBtn = document.querySelector('.gohome-memos')
var goBbsBtn = document.querySelector('.gobbs-memos')

var memoDom = document.querySelector(memosData.listDom);
var skeleton = `<div class="el-loading"><div class="el-skeleton mb-3"></div><div class="el-skeleton mb-3"></div><div class="el-skeleton width-50 mb-3"></div><div class="el-skeleton mb-3"></div><div class="el-skeleton mb-3"></div><div class="el-skeleton width-50 mb-3"></div></div>`;

var load = `<button class="col-12 load-btn button-load d-none flex-fill mb-3 p-3 animate__animated animate__fadeIn">加载更多</button>`;
memoDom.insertAdjacentHTML('afterend', load);
var loadBtn = document.querySelector("button.button-load");

var limit = memosData.limit,page = 1,nums = 0,dataNum = 0,memosContType = 0, memosAccess = 0,randomUser = 0;
var memoData = [],memosStr = [],memoCreatorMap = {},twikooCount = {},artalkCount = {};
let memosMode;
let nowLink;
let nowId;
let nowName;
let nowAvatar;
var memoChangeDate = 0;
var getSelectedValue = window.localStorage && window.localStorage.getItem("memos-visibility-select") || "PUBLIC";

document.addEventListener("DOMContentLoaded", () => {
  let getTheme = window.localStorage && window.localStorage.getItem("theme");
	let isDark = getTheme === "dark";
	let isLight = getTheme === "light";
  //切换主题
	if (getTheme !== null) {
		document.body.classList.toggle("dark-theme",isDark);
	}
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.body.classList.add("dark-theme","dark");
  }else{
    document.body.classList.toggle("dark-theme",isLight);
  }
	Array.prototype.forEach.call(document.querySelectorAll('.theme-toggle'), function(el){
    el.addEventListener('click', function() {
			document.body.classList.toggle("dark-theme");
			window.localStorage && window.localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
		});
	});
});

document.addEventListener("DOMContentLoaded", async () => {
  // 获取自定义列表
  if(typeof memosMyJson !== 'undefined'){
    try {
      memoOurList = await getMemoListData(memosJson.url); // 获取自定义列表
    } catch (error) {
      memoOurList = memoDefaultList
    }
  }else{
    try {
      memoOurList = await getMemoListData('../memos/memos.json'); // 获取自定义列表
    } catch (error) {
      memoOurList = memoDefaultList
    }
  }
  if(typeof memosMyList !== 'undefined'){
    const mergedArray = [...memosMyList, ...memoOurList];
    memoList = mergedArray.filter((item, index) => {
      const stringifiedItem = JSON.stringify(item);
      return index === mergedArray.findIndex(obj => {
        return JSON.stringify(obj) === stringifiedItem;
      });
    });
  }else{
    memoList = memoOurList
  }
  nowLink = memosPath || memoList[0].link;
  nowId = memosMeID || memoList[0].creatorId;
  nowName = memosMeNickname || memoList[0].creatorName;
  nowAvatar = memosMeAvatarUrl || memoList[0].avatar;
  memoFollow(getMode);
  getEditIcon();
});

// 获取自定义 memos.json 订阅列表
async function getMemoListData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.myMemoList
}

function memoFollow(mode) {
  //记忆显示模式
  usernowBtnDom.forEach((item) => {item.classList.remove('current');})
  if(mode == "MEMOSHOME"){
    goHomeBtn.classList.add("current")
    getUserMemos(nowLink,nowId,nowName,nowAvatar)
  }else if(mode == "MEMOSBBS"){
    goBbsBtn.classList.add("current")
    getMemos();
  }else if(mode == "RANDUSER"){
    randomUserBtn.classList.add("current")
    goRandUser()
  }else if(mode == "NOPUBLIC"){
    getUserMemos(nowLink,nowId,nowName,nowAvatar,"","",mode)
  }else{
    goHomeBtn.classList.add("current")
    getUserMemos(nowLink,nowId,nowName,nowAvatar)
  }

  loadBtn.addEventListener("click", function () {
    if(page < dataNum) {
      page++;
    }
    updateData(memoData)
    cocoMessage.success("加载中");
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
  }

};

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
    let link = memo.link;
    let memoString = JSON.stringify(memo).replace(/"/g, '&quot;');
    let avatar = memo.avatar;
    let count = memo.count || "";
    let website = memo.website;
    let creatorId = memo.creatorId;
    let creatorName = memo.creatorName;
    let createdTs = memo.createdTs;
    let memosId = createdTs+memo.id;
    let memosVisibility = memo.visibility
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
    let imgArr = memo.content.match(IMG_REG);
    let imgStr = String(imgArr).replace(/[,]/g, '');
    if (imgArr) {
        let memosImg = imgStr.replace(IMG_REG, `<div class="memo-resource width-100"><img class="lozad" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="$2"></div>`)
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
        return `<div class="item-tag d-flex align-items-center text-sm line-xl mr-2 px-2" onclick="getTagNow('${link}','${creatorId}','${creatorName}','${avatar}',this)">${String(t).replace(/[#]/, '')}</div>`;
      }).join('');
    }else{
      memosTag = `<div class="item-tag d-flex align-items-center text-sm line-xl mr-2 px-2 no-cursor">动态</div>`;
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
            imgLink = `${memo.link}/o/r/${resourceList[j].id}`;///${fileId}
        }
        if (restype == 'image') {
          imgUrl += `<div class="memo-resource w-100"><img class="lozad" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${imgLink}"/></div>`;
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
    let memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosOpenId != null && memosOpenId !== ""  && nowId == creatorId && nowLink == link) {
      itemOption = `<div class="item-option mr-1"><div class="d-flex dropdown"><svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></g></svg><div class="dropdown-wrapper d-none"><a class="btn edit-btn" data-form="${memoString}" onclick="editMemo(this)">编辑</a><a class="btn" onclick="archiveMemo('${memo.id}')">归档</a><a class="btn" onclick="deleteMemo('${memo.id}')">删除</a></div></div></div>`;
    }else{
      itemOption = `<div class="item-option mr-1"><a class="d-flex" href="${memosLink}" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"></path></svg></a></div>`;
    } 
    itemContent = `<div class="item-content"><div class="item-inner">${memosRes}</div><div class="item-footer d-flex mt-2"><div class="d-flex">${memosTag}</div>`;
    if (twikooEnv && memosVisibility == "PUBLIC") {
      itemContent += `<div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a data-id="${memo.id}" data-time="${createdTs}" data-env="${twikooEnv}" data-path="${memosLink}" onclick="loadTwikoo(this)" rel="noopener noreferrer" class="d-flex"><svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 10h.01M12 10h.01M16 10h.01"/></svg></a><span class="ml-1">${count}</span></div></div></div><div id="${memosId}" class="item-comment mt-3 d-none"></div>`;
    } else if (artalkEnv && memosVisibility == "PUBLIC") {
      itemContent += `<div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a data-id="${memo.id}" data-time="${createdTs}" data-env="${artalkEnv}" data-path="${artSite}" onclick="loadArtalk(this)" rel="noopener noreferrer" class="d-flex"><svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 10h.01M12 10h.01M16 10h.01"/></svg></a><span class="ml-1">${count}</span></div></div></div><div id="${memosId}" class="item-comment mt-3 d-none"></div>`;
    } else if(memosVisibility !== "PUBLIC"){
      itemContent += `<div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center mr-1" onclick="getUserMemos('${link}','${creatorId}','${creatorName}','${avatar}','','','NOPUBLIC')"><svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" height="1.15rem" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M1.68 4.206C2.652 6.015 4.67 7.258 7 7.258c2.331 0 4.348-1.243 5.322-3.052M2.75 5.596L.5 7.481m4.916-.415L4.333 9.794m6.917-4.198l2.25 1.885m-4.92-.415l1.083 2.728"/></svg></div></div></div>`;
    } else {
      itemContent += `<div class="d-flex flex-fill justify-content-end"></div></div>`;
    }
    itemContent += `</div></div></div>`
    result += `<div class="memo-${memosId} d-flex animate__animated mb-3"><div class="card-item flex-fill p-3"><div class="item-header d-flex mb-3"><div class="d-flex flex-fill"><div onclick="getUserMemos('${link}', '${creatorId}','${creatorName}','${avatar}')" class="item-avatar mr-2" style="background-image:url(${avatar})"></div><div class="item-sub d-flex flex-column p-1"><div class="item-creator"><a href="${website}" target="_blank">${creatorName}</a></div><div class="item-mate mt-2 text-xs" onclick="viaNow('${creatorName}','${memosLink}')">${new Date(createdTs * 1000 - 5 ).toLocaleString()}</div></div></div>${itemOption}</div>${neodbDom+itemContent}</div></div>`;
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
  this.updateData(memoData);
  setTimeout(function() {
    loadBtn.classList.remove('d-none');
  }, 1000);
  //setTimeout(function() {
    window.scrollTo({
      top: usernowDom.offsetTop - 30,
      behavior: "smooth"
    });
  //}, 800);
  goBbsBtn.classList.remove("noclick")
}

//搜索 Memo
searchBtn.addEventListener("click", function () {
  if(searchInput.classList.contains("d-none")){
    searchInput.classList.remove("d-none")
    searchInput.focus();
  }else{
    searchInput.classList.add("animate__fadeOutRight")
    setTimeout(function() {
      searchInput.classList.add("d-none")
      searchInput.classList.remove("animate__fadeOutRight")
    }, 500);
  }
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      let tagnowHas = document.querySelector(".memos-tagnow")
      if(tagnowHas) tagnowHas.remove();
      const serchText = searchInput.value;
      let usernowName = document.querySelector(".user-now-name").innerHTML;
      if(serchText !== "" && serchText != null){
        let serchDom = `
          <div class="memos-tagnow row p-2 mb-2"">
            <div class="memos-tagnow-title mr-3">当前搜索:</div>
            <div class="memos-tagnow-name card-item pr-2 pl-2" onclick="reloadUser('search')">${serchText}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-auto ml-1 opacity-40"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></div>
          </div>`
        memosDom.insertAdjacentHTML('beforebegin', serchDom);
        if(usernowName == ""){
          getMemos(serchText)
        }else{
          let userNameIndex = memoList.findIndex(item => (item.creatorName == usernowName));
          if(userNameIndex == -1){
            getUserMemos(nowLink,nowId,nowName,nowAvatar,"",serchText)
          }else{
            let userNowData = memoList[userNameIndex]
            getUserMemos(userNowData.link,userNowData.creatorId,userNowData.creatorName,userNowData.avatar,"",serchText)
          }
        }
        searchInput.value = ''
      }
    }
  });
});

//显示订阅列表
userlistBtn.addEventListener("click", function () {
  let userlistDom = document.querySelector(".userlist");
  if(userlistDom){
    userlistDom.remove();
  }else{
    let userlistDom = `<div class="userlist card-item d-flex flex-wrap mb-3 animate__animated animate__fadeIn">`;
    for (var i = 0; i < memoList.length; i++) {
      let nowMemo = memoList[i]
      userlistDom += `<div onclick="getUserMemos('${nowMemo.link}', '${nowMemo.creatorId}','${nowMemo.creatorName}','${nowMemo.avatar}')" class="item-avatar" style="background-image:url(${nowMemo.avatar})"></div>`
    }
    userlistDom += `</div>`;
    memosDom.insertAdjacentHTML('beforebegin', userlistDom);
  }
});

//返回个人主页
function goHome(){
  goHomeBtn.classList.add("noclick")
  usernowBtnDom.forEach((item) => {item.classList.remove('current');})
  goHomeBtn.classList.add("current")
  goBbsBtn.classList.remove("current")
  randomUser = 0;
  getUserMemos(nowLink,nowId,nowName,nowAvatar)
  cocoMessage.success("Hi， "+nowName);
};

//切换为广场模式
function goBbs(){
  goBbsBtn.classList.add("noclick")
  usernowBtnDom.forEach((item) => {item.classList.remove('current');})
  goBbsBtn.classList.add("current")
  goHomeBtn.classList.remove("current")
  getMemos();
  let usernowName = document.querySelector(".user-now-name");
  let usernowAvatar = document.querySelector(".user-now-avatar");
  usernowName.innerHTML = "";
  usernowAvatar.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  //goBbsBtn.classList.remove("noclick")
  cocoMessage.success("有啥新鲜事儿？");
};

goHomeBtn.addEventListener("click", function () {
  window.localStorage && window.localStorage.setItem("memos-mode",  "MEMOSHOME");
  goHome();
});
goBbsBtn.addEventListener("click", function () {
  window.localStorage && window.localStorage.setItem("memos-mode",  "MEMOSBBS");
  goBbs()
});
randomUserBtn.addEventListener("click", function () {
  window.localStorage && window.localStorage.setItem("memos-mode",  "RANDUSER");
  goRandUser()
});
//随机个人
function goRandUser(){
  randomUser = 1;
  usernowBtnDom.forEach((item) => {item.classList.remove('current');})
  randomUserBtn.classList.add("current")
  let usernowName = document.querySelector(".user-now-name");
  let usernowAvatar = document.querySelector(".user-now-avatar");
  usernowName.innerHTML = ""
  usernowAvatar.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  let randomIndex = Math.floor(Math.random() * (memoList.length +1));
  let userNowData = memoList[randomIndex]
  getUserMemos(userNowData.link,userNowData.creatorId,userNowData.creatorName,userNowData.avatar,"","")
  cocoMessage.success(userNowData.creatorName+" 上线～");
}

//重载当前 user
function reloadUser(mode){
  let tagnowHas = document.querySelector(".memos-tagnow")
  if(tagnowHas) tagnowHas.remove();
  let usernowName = document.querySelector(".user-now-name").innerHTML;
  if(usernowName == ""){
    getMemos()
  }else{
    let userNameIndex = memoList.findIndex(item => (item.creatorName == usernowName));
    if(userNameIndex == -1){
      getUserMemos(nowLink,nowId,nowName,nowAvatar)
    }else{
      let userNowData = memoList[userNameIndex]
      getUserMemos(userNowData.link,userNowData.creatorId,userNowData.creatorName,userNowData.avatar)
    }
  }
  if(mode == "search"){
    memosTextarea.value = '';
  }
}

// 获取指定用户列表
async function getUserMemos(link,id,name,avatar,tag,search,mode,random) {
    memoDom.innerHTML = skeleton;
    loadBtn.classList.add('d-none');
    randomUserBtn.classList.add("noclick")
    memoData = [],memoCreatorMap = {}, page = 1,nums = 0,dataNum = 0,memosContType = 1;
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    let usernowName = document.querySelector(".user-now-name");
    let usernowAvatar = document.querySelector(".user-now-avatar");
    usernowName.innerHTML = name;
    usernowAvatar.src = avatar;
    if (link == memosPath) {
      memosAccess = 1;
    };
    let userMemoUrl;
    if(tag){
      userMemoUrl = `${link}/api/v1/memo?creatorId=${id}&tag=${tag}&rowStatus=NORMAL&limit=50`;
    }else if(search){
      userMemoUrl = `${link}/api/v1/memo?creatorId=${id}&content=${search}&rowStatus=NORMAL&limit=${limit}`;
    }else if(mode == "NOPUBLIC"){
      userMemoUrl = `${link}/api/v1/memo`;
    }else if(random){
      userMemoUrl = `${link}/api/v1/memo?&limit=1&offset=${random}`;
    }else{
      userMemoUrl = `${link}/api/v1/memo?creatorId=${id}&rowStatus=NORMAL&limit=50`;
    }

    if (link == memosPath) {
      try {
        let response = await fetch(userMemoUrl,{
            headers: {
              'Authorization': `Bearer ${memosOpenId}`,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        let data = await response.json();
        data.forEach(item => {
          item.avatar = memosMeAvatarUrl
          item.link = memosPath
          item.twikoo = memosMeTwikoo
          item.artalk = memosMeArtalk
          item.artSite = memosMeArtalkSite
        });
        if (mode == "NOPUBLIC") {
          memosCount = data.length;
          window.localStorage && window.localStorage.setItem("memos-response-count", memosCount);
          data = data.filter((item) => item.visibility !== "PUBLIC");
        }
        memoData = data.flatMap(result => result);
        memoList.forEach(item => {
          memoCreatorMap[item.creatorName] = item;
        });
        memoData = memoData.map(item => {
          let data = memoCreatorMap[item.creatorName];
          return {...item, ...data};
        });
        if (mode !== "NOPUBLIC") {
          memoData = await this.getMemoCount(memoData);
        }
        memoDom.innerHTML = "";
        this.updateData(memoData);
        if(!random && memoData.length >= 8 ){
          setTimeout(function() {
            loadBtn.classList.remove('d-none');
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    }else{
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
          this.updateData(memoData);
          if(memoData.length >= 8 ){
            setTimeout(function() {
              loadBtn.classList.remove('d-none');
            }, 1000);
          }
        } catch (error) {
          console.error(error);
        }
    }
    setTimeout(function() {
      goHomeBtn.classList.remove("noclick")
      randomUserBtn.classList.remove("noclick")
    }, 800);
    window.scrollTo({
      top: usernowDom.offsetTop - 30,
      behavior: "smooth"
    });
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
  let tagnowHas = document.querySelector(".memos-tagnow")
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
  }else{
    artalkDom.classList.add('d-none');
    document.getElementById("artalk").remove()
  }
}

//编辑修改
let memosOldSelect;
function editMemo(memo) {
  memosOldSelect = memosVisibilitySelect.value;
  getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
  memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  if(memosOpenId && getEditor == "show"){
    document.querySelector(".memos-image-list").innerHTML = '';
    let e = JSON.parse(memo.getAttribute("data-form"));
    let memoResList = e.resourceList,memosResource = [],imageList = "";
    memosVisibilitySelect.value = e.visibility;
    window.localStorage && window.localStorage.setItem("memos-editor-dataform",JSON.stringify(e));
    window.localStorage && window.localStorage.setItem("memos-visibility-select",memosVisibilitySelect.value);
    memosTextarea.value = e.content;
    memosTextarea.style.height = memosTextarea.scrollHeight + 'px';
    submitMemoBtn.classList.add("d-none");
    editMemoDom.classList.remove("d-none");
    if(memoResList.length > 0){
      for (let i = 0; i < memoResList.length; i++) {
        let imgLink = '', fileId = '',resexlink = memoResList[i].externalLink;
        if (resexlink) {
            imgLink = resexlink
        } else {
            fileId = memoResList[i].publicId || memoResList[i].filename
            imgLink = `${memosPath}/o/r/${memoResList[i].id}`;///${fileId}
        }
        memosResource.push(memoResList[i].id);
        imageList += `<div data-id="${memoResList[i].id}" class="imagelist-item d-flex text-xs mt-2 mr-2" onclick="deleteImage(this)"><div class="d-flex image-background" style="background-image:url(${imgLink})"><span class="d-none">${fileId}</span></div></div>`;
      }
      window.localStorage && window.localStorage.setItem("memos-resource-list",  JSON.stringify(memosResource));
      document.querySelector(".memos-image-list").insertAdjacentHTML('afterbegin', imageList);
      //imageListDrag()
    }
    document.body.scrollIntoView({behavior: 'smooth'});
  }
}

editMemoBtn.addEventListener("click", function () {
  let dataformNow = JSON.parse(window.localStorage && window.localStorage.getItem("memos-editor-dataform"));
  let memoId = dataformNow.id,memoRelationList = dataformNow.relationList,
  memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token"),
  memoContent = memosTextarea.value,
  memocreatedTs = dataformNow.createdTs,
  memoVisibility = memosVisibilitySelect.value,
  memoResourceList = window.localStorage && JSON.parse(window.localStorage.getItem("memos-resource-list"));
  if(memoChangeDate == 1){
    memocreatedTs = Math.floor(Date.now() / 1000);;
  }
  let hasContent = memoContent.length !== 0;
  if (hasContent) {
    let memoUrl = `${memosPath}/api/v1/memo/${memoId}`;
    let memoBody = {content:memoContent,id:memoId,createdTs:memocreatedTs,relationList:memoRelationList,resourceIdList:memoResourceList,visibility:memoVisibility}
    fetch(memoUrl, {
      method: 'PATCH',
      body: JSON.stringify(memoBody),
      headers: {
        'Authorization': `Bearer ${memosOpenId}`,
        'Content-Type': 'application/json'
      }
    }).then(function(res) {
      if (res.ok) {
        let tagnowHas = document.querySelector(".memos-tagnow")
        if(tagnowHas) tagnowHas.remove();
        cocoMessage.success(
        '修改成功',
        ()=>{
          memosVisibilitySelect.value = memosOldSelect;
          memoChangeDate = 0;
          clearTextarea();
        })
      }
    })
  }
})

cancelEditBtn.addEventListener("click", function () {
  if (!editMemoDom.classList.contains("d-none")) {
    memosVisibilitySelect.value = memosOldSelect;
    window.localStorage && window.localStorage.removeItem("memos-editor-dataform");
    editMemoDom.classList.add("d-none");
    submitMemoBtn.classList.remove("d-none");
    clearTextarea("cancel")
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
  let isOk = confirm("确认归档？");
  if(isOk){
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
            let memosMode = window.localStorage && window.localStorage.getItem("memos-mode");
            getUserMemos(nowLink,nowId,nowName,nowAvatar,"","",memosMode)
          })
        }
      })
    }
  }
}

//删除
function deleteMemo(memoId) {
  let isOk = confirm("确认删除？");
  if(isOk){
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
            let memosMode = window.localStorage && window.localStorage.getItem("memos-mode");
            getUserMemos(nowLink,nowId,nowName,nowAvatar,"","",memosMode)
          })
        }
      }).catch(err => {
        cocoMessage.error('出错了，再检查一下吧')
      })
    }
  }
}

function viaNow(name,link){
  let viaCopy = ` （via [@${name}](${link})）`
  navigator.clipboard.writeText(viaCopy).then(() => {alert(viaCopy)});
}

function getEditIcon() {
  let memosContent = '',memosVisibility = '',memosResource = [],memosRelation=[];
  let memosCount = window.localStorage && window.localStorage.getItem("memos-response-count");
  let memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
  let memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  let getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
  let isHide = getEditor === "hide";
  memosVisibilitySelect.value = getSelectedValue;
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

  //todoBtn.addEventListener("click", function () {
  //  let memoTodo = '- [] \n';
  //  insertValue(memoTodo);
  //  let bracketIndex = memosTextarea.value.indexOf("[]");
  //  if (bracketIndex !== -1) {
  //    memosTextarea.selectionStart = bracketIndex + 1;
  //    memosTextarea.selectionEnd = bracketIndex + 1;
  //  }
  //});

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
    memosTextarea.value += t;
    memosTextarea.style.height = memosTextarea.scrollHeight + 'px';
    // 更新光标位置
    memosTextarea.selectionStart = textLength;
    memosTextarea.selectionEnd = textLength;
    memosTextarea.focus()
  }

  memosVisibilitySelect.addEventListener('change', function() {
    memoNowSelct = window.localStorage && window.localStorage.getItem("memos-visibility-select");
    var selectedValue = memosVisibilitySelect.value;
    window.localStorage && window.localStorage.setItem("memos-visibility-select",selectedValue);
    if(memoNowSelct == "PRIVATE" && selectedValue == "PUBLIC"){
      memoChangeDate = 1;
    }
  });

  privateBtn.addEventListener("click", async function () {
    if (!privateBtn.classList.contains("private")) {
      privateBtn.classList.add("private")
      memosVisibilitySelect.value = "PRIVATE"
      usernowBtnDom.forEach((item) => {item.classList.remove('current');})
      window.localStorage && window.localStorage.setItem("memos-mode",  "NOPUBLIC");
      let memosMode = window.localStorage && window.localStorage.getItem("memos-mode");
      getUserMemos(nowLink,nowId,nowName,nowAvatar,"","","NOPUBLIC")
      cocoMessage.success("进入「私有浏览」模式")
    }else{
      memosVisibilitySelect.value = "PUBLIC"
      window.localStorage && window.localStorage.setItem("memos-mode",  "");
      privateBtn.classList.remove("private")
      getUserMemos(nowLink,nowId,nowName,nowAvatar,"","","")
      cocoMessage.success("已退出「私有浏览」模式")
    }
  });
  
  randomBtn.addEventListener("click", async function () {
    memosCount = window.localStorage && window.localStorage.getItem("memos-response-count");
    if(!memosCount){
      try {
        let userMemoUrl = `${nowLink}/api/v1/memo`
        let response = await fetch(userMemoUrl,{
            headers: {
              'Authorization': `Bearer ${memosOpenId}`,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        let data = await response.json();
        memosCount = data.length - 1;
        window.localStorage && window.localStorage.setItem("memos-response-count", memosCount);
        let randomNum = random(0,memosCount);
        getUserMemos(nowLink,nowId,nowName,nowAvatar,"","","",randomNum)
      } catch (error) {
        console.error(error);
      }
    }else{
      let randomNum = random(0,memosCount);
      getUserMemos(nowLink,nowId,nowName,nowAvatar,"","","",randomNum)
    }
  });

  uploadImageInput.addEventListener('change', () => {
    let filesData = uploadImageInput.files[0];
    if (uploadImageInput.files.length !== 0){
      uploadImage(filesData);
      cocoMessage.info('图片上传中……');
    }
  });

  async function uploadImage(data) {
    let memosResourceListNow = JSON.parse(window.localStorage && window.localStorage.getItem("memos-resource-list")) || [];
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
      let resexlink = res.externalLink;
      let imgLink = '', fileId = '';
      if (resexlink) {
          imgLink = resexlink
      } else {
          fileId = res.publicId || res.filename
          imgLink = `${memosPath}/o/r/${res.id}`;///${fileId}
      }
      let imageList = "";
      imageList += `<div data-id="${res.id}" class="imagelist-item d-flex text-xs mt-2 mr-2" onclick="deleteImage(this)"><div class="d-flex image-background" style="background-image:url(${imgLink})"><span class="d-none">${fileId}</span></div></div>`;
      document.querySelector(".memos-image-list").insertAdjacentHTML('afterbegin', imageList);
      cocoMessage.success(
      '上传成功',
      ()=>{
        memosResourceListNow.push(res.id);
        window.localStorage && window.localStorage.setItem("memos-resource-list",  JSON.stringify(memosResourceListNow));
        imageListDrag()
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
      let pathInputValue = pathInput.value;
      if (pathInputValue.substr(-1) === '/') {
        pathInputValue = pathInputValue.substr(0, pathInputValue.length - 1);
      }
      getMemosData(pathInputValue,tokenInput.value);
      if(artalkInput.value !== null || artalkInput.value !== '') window.localStorage && window.localStorage.setItem("memos-artalk-input", artalkInput.value);
      if(artalkSiteInput.value !== null || artalkSiteInput.value !== '') window.localStorage && window.localStorage.setItem("memos-artalksite-input", artalkSiteInput.value);
      if(twikooInput.value !== null || twikooInput.value !== '') window.localStorage && window.localStorage.setItem("memos-twikoo-input", twikooInput.value);
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
      submitMemoBtn.classList.add("noclick")
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
              clearTextarea()
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
          taglist += `<div class="imagelist-item d-flex text-xs mt-2 mr-2 px-2" onclick="setMemoTag(this)">#${t}</div>`;
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
      let response = await fetch(`${p}/api/v1/user/me`,{//api/v1/status,memo;api/v1/user/me
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${t}`,
          'Content-Type': 'application/json'
        } 
      });
      if (response.ok) {
        let resdata = await response.json();
        if (resdata) {
          memosMeID = resdata.id;
          memosMeNickname = resdata.nickname;
          memosMeAvatarUrl = resdata.avatarUrl;
          window.localStorage && window.localStorage.setItem("memos-access-path", p);
          window.localStorage && window.localStorage.setItem("memos-access-token", t);
          window.localStorage && window.localStorage.setItem("memos-visibility-select","PUBLIC");
          window.localStorage && window.localStorage.setItem("memos-me-id", memosMeID);
          window.localStorage && window.localStorage.setItem("memos-me-nickname", memosMeNickname);
          window.localStorage && window.localStorage.setItem("memos-me-avatarurl", memosMeAvatarUrl);
          cocoMessage.success('保存成功', () => {
            memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
            memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
            location.reload();
            //getUserMemos(memosPath,memosMeID,memosMeNickname,memosMeNickname,"")
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

function imageListDrag(){// 获取包含所有图像元素的父元素
  const imageList = document.querySelector('.memos-image-list');
  // 存储被拖动的元素
  let draggedItem = null;
  let memosResourceList;
  // 为每个图像元素添加拖动事件监听器
  imageList.querySelectorAll('.imagelist-item').forEach(item => {
    item.draggable = true;
    // 当拖动开始时
    item.addEventListener('dragstart', function(e) {
      // 存储被拖动的元素
      draggedItem = this;
      memosResourceList = [];
    });
    // 当拖动元素进入目标区域时
    item.addEventListener('dragover', function(e) {
      e.preventDefault(); // 阻止默认行为
      this.classList.add('dragover'); // 添加拖动进入样式
    });
  
    // 当拖动元素离开目标区域时
    item.addEventListener('dragleave', function() {
      this.classList.remove('dragover'); // 移除拖动进入样式
    });
  
    // 当拖动元素放置到目标区域时
    item.addEventListener('drop', function(e) {
      e.preventDefault(); // 阻止默认行为
      this.classList.remove('dragover'); // 移除拖动进入样式
      // 计算拖动元素中心点
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      // 判断鼠标相对中心点的位置
      const isLeft = e.clientX < centerX;
      if (isLeft) {
        // 插入到前一个元素前
        this.parentNode.insertBefore(draggedItem, this.previousElementSibling);
      } else {
        // 插入到后一个元素后  
        this.parentNode.insertBefore(draggedItem, this.nextElementSibling); 
      }
      document.querySelectorAll('.memos-image-list .imagelist-item').forEach((item) => {
        let itemId = Number(item.dataset.id)
        memosResourceList.push(itemId);
      })
      window.localStorage && window.localStorage.setItem("memos-resource-list",  JSON.stringify(memosResourceList));
    });
  });
}

function clearTextarea(mode){
  if (!editMemoDom.classList.contains("d-none")) {
    window.localStorage && window.localStorage.removeItem("memos-editor-dataform");
    editMemoDom.classList.add("d-none");
    submitMemoBtn.classList.remove("d-none");
  }
  submitMemoBtn.classList.remove("noclick");
  document.querySelector(".memos-image-list").innerHTML = '';
  window.localStorage && window.localStorage.removeItem("memos-resource-list");
  window.localStorage && window.localStorage.removeItem("memos-relation-list");
  let memosTextarea = document.querySelector(".memos-editor-textarea")
  memosTextarea.value = '';
  memosTextarea.style.height = 'inherit';
  let memosMode = mode || window.localStorage && window.localStorage.getItem("memos-mode");
  if(memosMode != "cancel"){
    getUserMemos(nowLink,nowId,nowName,nowAvatar,"","",memosMode)
  }
}
// 获取 owo.json 文件中的数据
let emojiSelectorVisible = false;
let emojiSelector;
let emojis = [{"icon": "😂","text": "哭笑不得"},{"icon": "😎","text": "酷"},{"icon": "😏","text": "坏笑"},{"icon": "😅","text": "流汗"},{"icon": "😄","text": "笑"},{"icon": "😜","text": "调皮"},{"icon": "🤣","text": "笑倒"},{"icon": "😭","text": "大哭"},{"icon": "🙄","text": "白眼"},{"icon": "🤐","text": "嘘"},{"icon": "😋","text": "美食脸"},{"icon": "🥶","text": "冰冻"},{"icon": "🥵","text": "热"},{"icon": "😴","text": "睡觉"},{"icon": "🤧","text": "打喷嚏"},{"icon": "🍉","text": "西瓜"},{"icon": "😱","text": "惊恐"},{"icon": "👋","text": "招手"},{"icon": "🔨","text": "锤子"},{"icon": "🐶","text": "小狗"},{"icon": "👏","text": "鼓掌"},{"icon": "🙈","text": "不看"},{"icon": "😓","text": "汗"},{"icon": "😍","text": "爱心眼"},{"icon": "🤝","text": "握手"},{"icon": "🥺","text": "求你"},{"icon": "😔","text": "沮丧"},{"icon": "😪","text": "困"},{"icon": "😕","text": "困惑"},{"icon": "🤷‍♂️","text": "摊手"},{"icon": "😛","text": "舌头"},{"icon": "🤭","text": "偷笑"},{"icon": "🤮","text": "呕吐"},{"icon": "🥺","text": "求你"},{"icon": "🙂","text": "轻松的笑"},{"icon": "😈","text": "恶魔"},{"icon": "😃","text": "笑脸"},{"icon": "🤫","text": "嘘"},{"icon": "😒","text": "无语"},{"icon": "😵","text": "晕"},{"icon": "💪","text": "加油"},{"icon": "👍","text": "赞"},{"icon": "👎",  "text": "踩"},{"icon": "😡","text": "愤怒"},{"icon": "🤬","text": "怒骂"},{"icon": "😖","text": "心烦"},{"icon": "🌹","text": "玫瑰"},{"icon": "🏃","text": "跑步"},{"icon": "😆","text": "大笑"},{"icon": "💵","text": "钞票"},{"icon": "😘","text": "飞吻"},{"icon": "😷","text": "生病"},{"icon": "🤕","text": "受伤"},{"icon": "🎉","text": "庆祝"},{"icon": "❤️","text": "红心"},{"icon": "💔","text": "心碎"},{"icon": "😣","text": "无奈"},{"icon": "😘","text": "飞吻"},{"icon": "💩","text": "一坨便便"},{"icon": "🤩","text": "爱慕"}];

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


/**
 * Lately.min.js 2.5.2
 * https://tokinx.github.io/lately/
 */
!function(){window.Lately=new function(){var t=this;this.lang={second:"秒",minute:"分钟",hour:"小时",day:"天",month:"个月",year:"年",ago:"前",error:"NaN"};var e=function(e){e=new Date(n(e));var r=new function(){this.second=(Date.now()-e.getTime())/1e3,this.minute=this.second/60,this.hour=this.minute/60,this.day=this.hour/24,this.month=this.day/30,this.year=this.month/12},i=Object.keys(r).reverse().find(function(t){return r[t]>=1});return(i?function(t,e){return Math.floor(t)+e}(r[i],t.lang[i]):t.lang.error)+t.lang.ago},n=function(t){return t=new Date(t&&("number"==typeof t?t:t.replace(/-/g,"/").replace("T"," "))),!isNaN(t.getTime())&&t.getTime()};return{init:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=r.target,a=void 0===i?"time":i,o=r.lang;o&&(t.lang=o);var u=!0,h=!1,l=void 0;try{for(var s,c=document.querySelectorAll(a)[Symbol.iterator]();!(u=(s=c.next()).done);u=!0){var f=s.value,g=n(f.dateTime)||n(f.title)||n(f.innerHTML)||0;if(!g)return;f.title=new Date(g).toLocaleString(),f.innerHTML=e(g)}}catch(t){h=!0,l=t}finally{try{!u&&c.return&&c.return()}finally{if(h)throw l}}},format:e}}}();
/**
 * ViewImage.min.js 2.0.2
 * https://tokinx.github.io/ViewImage/
 */
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(b){return b.raw=b};$jscomp.createTemplateTagFirstArgWithRaw=function(b,a){b.raw=a;return b};$jscomp.arrayIteratorImpl=function(b){var a=0;return function(){return a<b.length?{done:!1,value:b[a++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};$jscomp.makeIterator=function(b){var a="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return a?a.call(b):$jscomp.arrayIterator(b)};
$jscomp.arrayFromIterator=function(b){for(var a,d=[];!(a=b.next()).done;)d.push(a.value);return d};$jscomp.arrayFromIterable=function(b){return b instanceof Array?b:$jscomp.arrayFromIterator($jscomp.makeIterator(b))};
(function(){window.ViewImage=new function(){var b=this;this.target="[view-image] img";this.listener=function(a){if(!(a.ctrlKey||a.metaKey||a.shiftKey||a.altKey)){var d=String(b.target.split(",").map(function(g){return g.trim()+":not([no-view])"})),c=a.target.closest(d);if(c){var e=c.closest("[view-image]")||document.body;d=[].concat($jscomp.arrayFromIterable(e.querySelectorAll(d))).map(function(g){return g.href||g.src});b.display(d,c.href||c.src);a.stopPropagation();a.preventDefault()}}};this.init=
function(a){a&&(b.target=a);["removeEventListener","addEventListener"].forEach(function(d){document[d]("click",b.listener,!1)})};this.display=function(a,d){var c=a.indexOf(d),e=(new DOMParser).parseFromString('\n                <div class="view-image">\n                    <style>.view-image{position:fixed;inset:0;z-index:500;padding:1rem;display:flex;flex-direction:column;animation:view-image-in 300ms;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}.view-image__out{animation:view-image-out 300ms}@keyframes view-image-in{0%{opacity:0}}@keyframes view-image-out{100%{opacity:0}}.view-image-btn{width:32px;height:32px;display:flex;justify-content:center;align-items:center;cursor:pointer;border-radius:3px;background-color:rgba(255,255,255,0.2)}.view-image-btn:hover{background-color:rgba(255,255,255,0.5)}.view-image-close__full{position:absolute;inset:0;background-color:rgba(48,55,66,0.3);z-index:unset;cursor:zoom-out;margin:0}.view-image-container{height:0;flex:1;display:flex;align-items:center;justify-content:center;}.view-image-lead{display:contents}.view-image-lead img{position:relative;z-index:1;max-width:100%;max-height:100%;object-fit:contain;border-radius:3px}.view-image-lead__in img{animation:view-image-lead-in 300ms}.view-image-lead__out img{animation:view-image-lead-out 300ms forwards}@keyframes view-image-lead-in{0%{opacity:0;transform:translateY(-20px)}}@keyframes view-image-lead-out{100%{opacity:0;transform:translateY(20px)}}[class*=__out] ~ .view-image-loading{display:block}.view-image-loading{position:absolute;inset:50%;width:8rem;height:2rem;color:#aab2bd;overflow:hidden;text-align:center;margin:-1rem -4rem;z-index:1;display:none}.view-image-loading::after{content:"";position:absolute;inset:50% 0;width:100%;height:3px;background:rgba(255,255,255,0.5);transform:translateX(-100%) translateY(-50%);animation:view-image-loading 800ms -100ms ease-in-out infinite}@keyframes view-image-loading{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.view-image-tools{position:relative;display:flex;justify-content:space-between;align-content:center;color:#fff;max-width:600px;position: absolute; bottom: 5%; left: 1rem; right: 1rem; backdrop-filter: blur(10px);margin:0 auto;padding:10px;border-radius:5px;background:rgba(0,0,0,0.1);margin-bottom:constant(safe-area-inset-bottom);margin-bottom:env(safe-area-inset-bottom);z-index:1}.view-image-tools__count{width:60px;display:flex;align-items:center;justify-content:center}.view-image-tools__flip{display:flex;gap:10px}.view-image-tools [class*=-close]{margin:0 10px}</style>\n                    <div class="view-image-container">\n                        <div class="view-image-lead"></div>\n                        <div class="view-image-loading"></div>\n                        <div class="view-image-close view-image-close__full"></div>\n                    </div>\n                    <div class="view-image-tools">\n                        <div class="view-image-tools__count">\n                            <span><b class="view-image-index">'+
(c+1)+"</b>/"+a.length+'</span>\n                        </div>\n                        <div class="view-image-tools__flip">\n                            <div class="view-image-btn view-image-tools__flip-prev">\n                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M31 36L19 24L31 12" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                            </div>\n                            <div class="view-image-btn view-image-tools__flip-next">\n                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M19 12L31 24L19 36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                            </div>\n                        </div>\n                        <div class="view-image-btn view-image-close">\n                            <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M8 8L40 40" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                        </div>\n                    </div>\n                </div>\n            ',
"text/html").body.firstChild,g=function(f){var h={Escape:"close",ArrowLeft:"tools__flip-prev",ArrowRight:"tools__flip-next"};h[f.key]&&e.querySelector(".view-image-"+h[f.key]).click()},l=function(f){var h=new Image,k=e.querySelector(".view-image-lead");k.className="view-image-lead view-image-lead__out";setTimeout(function(){k.innerHTML="";h.onload=function(){setTimeout(function(){k.innerHTML='<img src="'+h.src+'" alt="ViewImage" no-view/>';k.className="view-image-lead view-image-lead__in"},100)};
h.src=f},300)};document.body.appendChild(e);l(d);window.addEventListener("keydown",g);e.onclick=function(f){f.target.closest(".view-image-close")?(window.removeEventListener("keydown",g),e.onclick=null,e.classList.add("view-image__out"),setTimeout(function(){return e.remove()},290)):f.target.closest(".view-image-tools__flip")&&(c=f.target.closest(".view-image-tools__flip-prev")?0===c?a.length-1:c-1:c===a.length-1?0:c+1,l(a[c]),e.querySelector(".view-image-index").innerHTML=c+1)}}}})();
/**
 * coco-message
 * https://github.com/TheWindRises-2/coco-message
 */
"use strict";function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}!function(o,t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(o=o||self,o.cocoMessage=t())}(void 0,function(){function o(o,t){var e=document.createElement("div");for(var n in o){var i=o[n];"className"==n?(n="class",e.setAttribute(n,i)):"_"==n[0]&&e.addEventListener(n.slice(1),i)}if("string"==typeof t)e.innerHTML=t;else if("object"==_typeof(t)&&t.tagName)e.appendChild(t);else if(t)for(var s=0;s<t.length;s++){var r=t[s];e.appendChild(r)}return e}function t(o,t){for(var e in t)o.style[e]=t[e];""===o.getAttribute("style")&&o.removeAttribute("style")}function e(o,t){var e=o.className||"";if(!n(e,t)){var i=e.split(/\s+/);i.push(t),o.className=i.join(" ")}}function n(o,t){return o.indexOf(t)>-1}function i(o,t){var e=o.className||"";if(n(e,t)){var i=e.split(/\s+/),s=i.indexOf(t);i.splice(s,1),o.className=i.join(" ")}""===o.className&&o.removeAttribute("class")}function s(){return r(arguments,"info")}function r(o,t){var e={};for(var n in h)e[n]=h[n];for(var i=0;i<o.length;i++){var s=o[i];void 0!==s&&("string"==typeof s||"object"==_typeof(s)?e.msg=s:"boolean"==typeof s?e.showClose=s:"function"==typeof s?e.onClose=s:"number"==typeof s&&(e.duration=s))}return e.type=t,a(e)}function a(e){var n=e.type,s=e.duration,r=e.msg,a=e.showClose,d=e.onClose,g=0===s,p=l();"loading"==n&&(r=""===r?"正在加载":r,g=a,s=0);var h=o({className:"coco-msg-wrapper"},[o({className:"coco-msg coco-msg-fade-in ".concat(n)},[o({className:"coco-msg-icon"},p[n]),o({className:"coco-msg-content"},r),o({className:"coco-msg-wait ".concat(g?"coco-msg-pointer":"coco-msg-wait-hidden"),_click:function(){f(h,d)}},c(g)||"")])]);return 0!==s&&setTimeout(function(){f(h,d)},s),m.children.length||document.body.appendChild(m),m.appendChild(h),t(h,{height:h.offsetHeight+"px"}),setTimeout(function(){i(h.children[0],"coco-msg-fade-in")},300),function(){f(h,d)}}function c(o){return o?'<svg class="coco-msg-close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5514"><path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" p-id="5515"></path></svg>':""}function f(o,n){o&&(t(o,{padding:0,height:0}),e(o.children[0],"coco-msg-fade-out"),n&&n(),setTimeout(function(){if(o){for(var t=!1,e=0;e<m.children.length;e++)m.children[e]===o&&(t=!0);t&&d(o),o=null,m.children.length||t&&d(m)}},300))}function l(){return{info:'\n    <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3250"><path d="M469.333333 341.333333h85.333334v469.333334H469.333333z" fill="#ffffff" p-id="3251"></path><path d="M469.333333 213.333333h85.333334v85.333334H469.333333z" fill="#ffffff" p-id="3252"></path><path d="M384 341.333333h170.666667v85.333334H384z" fill="#ffffff" p-id="3253"></path><path d="M384 725.333333h256v85.333334H384z" fill="#ffffff" p-id="3254"></path></svg>\n    ',success:'\n    <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1807"><path d="M455.42 731.04c-8.85 0-17.75-3.05-24.99-9.27L235.14 553.91c-16.06-13.81-17.89-38.03-4.09-54.09 13.81-16.06 38.03-17.89 54.09-4.09l195.29 167.86c16.06 13.81 17.89 38.03 4.09 54.09-7.58 8.83-18.31 13.36-29.1 13.36z" p-id="1808" fill="#ffffff"></path><path d="M469.89 731.04c-8.51 0-17.07-2.82-24.18-8.6-16.43-13.37-18.92-37.53-5.55-53.96L734.1 307.11c13.37-16.44 37.53-18.92 53.96-5.55 16.43 13.37 18.92 37.53 5.55 53.96L499.67 716.89c-7.58 9.31-18.64 14.15-29.78 14.15z" p-id="1809" fill="#ffffff"></path></svg>\n    ',warning:'\n    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18912"><path d="M468.114286 621.714286c7.314286 21.942857 21.942857 36.571429 43.885714 36.571428s36.571429-14.628571 43.885714-36.571428L585.142857 219.428571c0-43.885714-36.571429-73.142857-73.142857-73.142857-43.885714 0-73.142857 36.571429-73.142857 80.457143l29.257143 394.971429zM512 731.428571c-43.885714 0-73.142857 29.257143-73.142857 73.142858s29.257143 73.142857 73.142857 73.142857 73.142857-29.257143 73.142857-73.142857-29.257143-73.142857-73.142857-73.142858z" p-id="18913" fill="#ffffff"></path></svg>\n    ',error:'\n    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5514"><path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" p-id="5515" fill="#ffffff"></path></svg>\n    ',loading:'\n    <div class="coco-msg_loading">\n    <svg class="coco-msg-circular" viewBox="25 25 50 50">\n      <circle class="coco-msg-path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>\n    </div>\n    '}}function d(o){o&&o.parentNode.removeChild(o)}function g(){for(var o=0;o<m.children.length;o++){var t=m.children[o];f(t)}}function p(){var o=document;if(o&&o.head){var t=o.head,e=o.createElement("style"),n=".coco-msg-stage *{box-sizing:border-box}.coco-msg-stage{position:fixed;top:20px;left:50%;width:auto;transform:translate(-50%,0);z-index:3000;padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top)}.coco-msg-wrapper{position:relative;left:50%;transform:translate(-50%,0);transition:height .35s ease-out,padding .35s ease-out;padding:8px 0}.coco-msg{padding:8px 16px;border-radius:7px;position:relative;left:50%;transform:translate(-50%,0);display:inline-flex;align-items:center;box-shadow:0 4px 16px rgba(15,15,15,.15);color:rgba(44,44,44,.9);background-color:rgba(255,255,255,.95);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.dark .coco-msg{color:rgba(255,255,255,.9);background-color:rgba(36,36,36,.95);box-shadow:0 0 1px 0 rgba(55,55,55,.3)}.coco-msg-icon{position:relative;width:16px;height:16px;border-radius:100px;display:flex;justify-content:center;align-items:center}.coco-msg-icon svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px}.coco-msg-wait{width:20px;height:20px;position:relative;display:inline-flex;justify-content:center;align-items:center;margin-left:10px}.coco-msg-wait:active svg{transform:scale(.7)}.coco-msg-wait svg{transition:.12s ease-out;fill:currentColor}.coco-msg-close{width:14px;height:14px}.coco-msg-content{margin-left:10px;text-align:left;font-size:14px;font-weight:400;word-break:keep-all;line-height:1.57143;display:inline-block}.coco-msg.info .coco-msg-icon{background-color:#3491fa}.coco-msg.success .coco-msg-icon{background-color:#00b42a}.coco-msg.warning .coco-msg-icon{background-color:#f7ba1e}.coco-msg.error .coco-msg-icon{background-color:#f53f3f}.dark .coco-msg.info .coco-msg-icon{background-color:#1d4dd2}.dark .coco-msg.success .coco-msg-icon{background-color:#129a37}.dark .coco-msg.warning .coco-msg-icon{background-color:#cc961f}.dark .coco-msg.error .coco-msg-icon{background-color:#cb2e34}.dark .coco-msg .coco-msg-icon path{fill:rgba(36,36,36,.95)}.coco-msg_loading{flex-shrink:0;width:20px;height:20px;position:relative}.coco-msg-circular{-webkit-animation:coco-msg-rotate 2s linear infinite both;animation:coco-msg-rotate 2s linear infinite both;transform-origin:center center;height:20px!important;width:20px!important;color:#3491fa;margin-top:-1px}.dark .coco-msg-circular{color:#1d4dd2}.coco-msg-path{stroke-dasharray:1,200;stroke-dashoffset:0;stroke:currentColor;-webkit-animation:coco-msg-dash 1.5s ease-in-out infinite;animation:coco-msg-dash 1.5s ease-in-out infinite;stroke-linecap:round}@-webkit-keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.coco-msg-pointer{cursor:pointer}.coco-msg-wait-hidden{display:none}.coco-msg-fade-in{-webkit-animation:coco-msg-fade .22s ease-out both;animation:coco-msg-fade .22s ease-out both}.coco-msg-fade-out{animation:coco-msg-fade .22s linear reverse both}@-webkit-keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,0)}}@keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,0)}}";e.innerHTML=n,t.appendChild(e)}}if("undefined"!=typeof window){var m=o({className:"coco-msg-stage"}),h={msg:"",duration:2e3,showClose:!1},u={info:function(){return r(arguments,"info")},success:function(){return r(arguments,"success")},warning:function(){return r(arguments,"warning")},error:function(){return r(arguments,"error")},loading:function(){return r(arguments,"loading")},destroyAll:function(){g()},config:function(o){for(var t in o)Object.hasOwnProperty.call(o,t)&&void 0!==o[t]&&(h[t]=o[t])}};for(var v in u)s[v]=u[v];return p(),s}});
