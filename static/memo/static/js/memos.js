var memosData = {
  dom:"#memos",
  listDom:".memo-list",
  limit:"8",
  loadUrl:"static/loading.svg",
  gravatar:"https://cravatar.cn"
}
var gravatar = memosData.gravatar;
var memoList = [
  {creatorName:'林木木',website:'https://immmmm.com',link:'https://me.edui.fun',creatorId:'101',avatar:gravatar+'/avatar/ba83fa02fc4b2ba621514941307e21be.jpeg?s=400',twikoo:'https://metk.edui.fun'},
  {creatorName:'归臧',website:'https://nuoea.com/',link:'https://memos.nuoea.com/',creatorId:'101',avatar:gravatar+'/avatar/020d365ea2596ef6d516143bb0552704.jpeg?s=400',twikoo:'https://twikoo.nuoea.com/'},
  {creatorName:'koobai',website:'https://koobai.com',link:'https://memos.koobai.com',creatorId:'1',avatar:gravatar+'/avatar/3b3d336a7d389b7ae8531cbe177ae9b7.jpeg?s=400',artalk:'https://c.koobai.com',artSite:'空白唠叨'},
  {creatorName:'老张',website:'https://laozhang.org',link:'https://memos.laozhang.org',creatorId:'1',avatar:gravatar+'/avatar/679666f7bd1af3e55f0e51dd70ed161c.jpeg?s=400',artalk:'https://artalk.laozhang.org',artSite:'memos'},{creatorName:'小赵同学',website:'https://usj.cc/',link:'https://memos.usj.cc',creatorId:'1',avatar:gravatar+'/avatar/1cce0a22c2c7648eab76ec876c6a54d9.jpeg?s=400',artalk:'https://artalk.usj.cc',artSite:'优世界'},
  {creatorName:'不亦乐乎',website:'https://lms.pub',link:'https://b.lms.im',creatorId:'1',avatar:gravatar+'/avatar/d9cc49ea0301640d7a19b6a1e77012dd.jpeg?s=400',twikoo:'https://b.lms.im/tk/'},
];

var memosDom = document.querySelector(memosData.dom);
var userAdmin = memoList[0]
var userNow = `<div class="user-now card-item flex-fill p-3 mt-5 row"><div class="row-fill"><span class="back-memos button d-md-flex mr-3"><i class="iconfont iconappstore"></i></span><span class="theme-toggle header-toggle button d-md-flex mr-3"><i class="iconfont icondaytime-mode"></i></span></div><div class="item-avatar mr-3"><span class="user-now-name">${userAdmin.creatorName}</span><img class="user-now-avatar" src="${userAdmin.avatar}"/></div></div>`
memosDom.insertAdjacentHTML('beforebegin', userNow);

var memosEditorCont = `<div class="memos-editor animate__animated animate__fadeInRight d-none col"><div class="memos-editor-body mb-3 p-3"><div class="memos-editor-inner animate__animated animate__fadeIn d-none"><div class="memos-editor-content"><textarea class="memos-editor-textarea text-sm" rows="1" placeholder="任何想法..."></textarea></div><div class="memos-image-list d-flex flex-fill line-xl"></div><div class="memos-editor-tools pt-3"><div class="d-flex"><div class="button outline action-btn tag-btn mr-2"><i class="iconfont iconnumber"></i></div><div class="button outline action-btn todo-btn mr-2"><i class="iconfont iconunorderedlist"></i></div><div class="button outline action-btn code-btn mr-2"><i class="iconfont iconcode"></i></div><div class="button outline action-btn mr-2 link-btn"><i class="iconfont iconlink"></i></div><div class="button outline action-btn image-btn mr-2" onclick="this.lastElementChild.click()"><i class="iconfont iconimage"></i><input class="memos-upload-image-input d-none" type="file" accept="image/*"></div></div><div class="d-flex flex-fill"><div class="memos-tag-list d-none mt-2 animate__animated animate__fadeIn"></div></div></div><div class="memos-editor-footer border-t mt-3 pt-3 "><div class="d-flex"><div class="editor-selector select outline"><select class="select-memos-value pl-2 pr-4 py-2"><option value="PUBLIC">所有人可见</option><option value="PROTECTED">仅登录可见</option><option value="PRIVATE">仅自己可见</option></select></div><div class="button outline random-btn mx-2 p-2"><i class="iconfont iconretweet"></i></div><div class="button outline switchUser-btn d-none d-md-flex mr-2 p-2"><i class="iconfont iconswitchuser"></i></div></div><div class="editor-submit d-flex flex-fill justify-content-end"><div class="edit-memos d-none"><button class="outline cancel-edit-btn mr-2 px-3 py-2" title="取消">取消</button><button class="primary edit-memos-btn px-3 py-2" title="保存">保存</button></div><button class="primary submit-memos-btn px-3 py-2" title="记下">记下</button></div></div></div><div class="memos-editor-option animate__animated animate__fadeIn d-none"><div class="row flex-fill mr-3 p-2"><input name="memos-path-url" class="memos-path-input input-text col-6" type="text" value="" placeholder="Path"><input name="memos-token-url" class="memos-token-input input-text col-6" type="text" value="" placeholder="Token"></div><button class="primary submit-openapi-btn px-3 py-2">保存</button></div></div><div class="memos-random d-none"></div></div>`;
memosDom.insertAdjacentHTML('afterbegin',memosEditorCont);

var headerDom = document.querySelector(".header-title");
var editIcon = `<button class="load-memos-editor outline p-1" title=""><i class="iconfont iconedit-square"></i></button>`;
headerDom.insertAdjacentHTML('afterend', editIcon);

var memosEditorInner = document.querySelector(".memos-editor-inner"); 
var memosEditorOption = document.querySelector(".memos-editor-option");
var memosRadomCont = document.querySelector(".memos-random");

var taglistBtn = document.querySelector(".tag-btn");
var todoBtn = document.querySelector(".todo-btn");
var todoBtn = document.querySelector(".todo-btn");
var codeBtn = document.querySelector(".code-btn");
var linkBtn = document.querySelector(".link-btn");
var randomBtn = document.querySelector(".random-btn");
var switchUserBtn = document.querySelector(".switchUser-btn");
var loadEditorBtn = document.querySelector(".load-memos-editor");
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
var memosTextarea = document.querySelector(".memos-editor-textarea");
var memosVisibilitySelect = document.querySelector(".select-memos-value");
var submitMemoBtn = document.querySelector(".submit-memos-btn");
var editMemoDom = document.querySelector(".edit-memos");
var editMemoBtn = document.querySelector(".edit-memos-btn");
var cancelEditBtn = document.querySelector(".cancel-edit-btn");

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
	var headerIcon = document.querySelector('.header-toggle i')
	var getTheme = window.localStorage && window.localStorage.getItem("theme");
	var isDark = getTheme === "dark";
	var isLight = getTheme === "light";
	if (getTheme !== null) {
		document.body.classList.toggle("dark-theme",isDark);
		headerIcon.classList.toggle("iconnight-mode",isDark);
		headerIcon.classList.toggle("icondaytime-mode",isLight);
	}
	Array.prototype.forEach.call(document.querySelectorAll('.theme-toggle'), function(el){
    el.addEventListener('click', function() {
			document.body.classList.toggle("dark-theme"); 
			headerIcon.className = headerIcon.classList.contains("iconnight-mode") ? "iconfont icondaytime-mode" : "iconfont iconnight-mode"
			window.localStorage && window.localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
		});
	});

  memoFollow();
  getEditIcon();
});

function memoFollow() {
  //getMemos();
  getUserMemos(userAdmin.link,userAdmin.creatorId,userAdmin.creatorName,userAdmin.avatar,"")
  
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
    backIcon.className = backIcon.classList.contains("iconappstore") ? "iconfont iconstar" : "iconfont iconappstore"
    if(memosContType == 1) {
      getMemos();
      let usernowName = document.querySelector(".user-now-name");
      let usernowAvatar = document.querySelector(".user-now-avatar");
      usernowName.innerHTML = ""//userAdmin.creatorName;
      usernowAvatar.src = "static/loading.svg"//userAdmin.avatar;
    }else{
      getUserMemos(userAdmin.link,userAdmin.creatorId,userAdmin.creatorName,userAdmin.avatar,"")
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

  function withTimeout(millis, promise) {
    let timeout = new Promise((resolve, reject) =>
      setTimeout(() => reject(`Timed out after ${millis} ms.`), millis)
    );
    return Promise.race([promise, timeout]);
  };
  
  async function getMemos() {
    memoData = [], memoCreatorMap = {}, page = 1, nums = 0, dataNum = 0, memosContType = 0, memosAccess = 0;
    memoDom.innerHTML = skeleton;
    loadBtn.classList.add("d-none");
    let results = await Promise.allSettled(memoList.map(u => 
      withTimeout(2000, fetch(`${u.link}/api/v1/memo?creatorId=${u.creatorId}&rowStatus=NORMAL&limit=${limit}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(res.statusText); 
          }
          return response.json();
        })
    )));
    results = results.filter(i => i.status === 'fulfilled');
    memoData = results.flatMap(result => result.value);
    memoList.forEach(item => {
      memoCreatorMap[item.creatorName] = item;
    });
    memoData = memoData.map(item => {
      let data = memoCreatorMap[item.creatorName];
      return {...item, ...data};
    });
    memoData = await getMemoCount(memoData);
    memoDom.innerHTML = "";
    loadBtn.classList.remove("d-none");
    updateData(memoData);
  }

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
      let count = memo.count;
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
          return `<div class="item-tag d-flex align-items-center text-xs line-lg mr-2 px-2" onclick="getTagNow('${memo.link}','${memo.creatorId}','${memo.creatorName}','${memo.avatar}',this)">${String(t).replace(/[#]/g, '')}</div>`;
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
      result += `<div class="memo-${memosId} d-flex animate__animated mb-3"><div class="card-item flex-fill p-3"><div class="item-header d-flex mb-3"><div class="d-flex flex-fill"><div class="item-avatar mr-3" style="background-image:url(${avatar})"></div><div class="item-sub d-flex flex-column p-1"><div class="item-creator"><a href="${website}" target="_blank">${creatorName}</a></div><div class="item-mate mt-2 text-xs">${new Date(createdTs * 1000).toLocaleString()}</div></div></div>${itemOption}</div>${neodbDom+itemContent}</div></div>`;
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

// 获取指定用户列表
async function getUserMemos(u,i,n,a,t) {
    var backIcon = document.querySelector('.back-memos i');
    backIcon.className = "iconfont iconappstore";
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
//获取指定 Tag 评论
function getTagNow(u,i,n,a,e){
  let tagName = e.innerHTML
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
    let memoDom = document.querySelector(`.memo-${Number(twikooTime)+Number(twikooId)}`)
    window.scrollTo({
      top: memoDom.offsetTop,
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
    let memoDom = document.querySelector(`.memo-${Number(artalkTime) + Number(artalkId)}`)
    window.scrollTo({
      top: memoDom.offsetTop,
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

  memosTextarea.addEventListener('input', (e) => {
    memosTextarea.style.height = 'inherit';
    memosTextarea.style.height = e.target.scrollHeight + 'px';
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
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      document.querySelector(".memos-tag-list").classList.toggle("d-none"); 
    }
  });

  todoBtn.addEventListener("click", function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      let memoTodo = '- [] \n';
      insertValue(memoTodo);
      let bracketIndex = memosTextarea.value.indexOf("[]");
      if (bracketIndex !== -1) {
        memosTextarea.selectionStart = bracketIndex + 1;
        memosTextarea.selectionEnd = bracketIndex + 1;
      }
    }
  });

  codeBtn.addEventListener("click", function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      let memoCode = '```\n\n```';
      insertValue(memoCode);
      let bracketIndex = memosTextarea.value.indexOf("\n\n");
      if (bracketIndex !== -1) {
        memosTextarea.selectionStart = bracketIndex + 1;
        memosTextarea.selectionEnd = bracketIndex + 1;
      }
    }
  });

  linkBtn.addEventListener("click", function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      let memoLink = '[]()';
      insertValue(memoLink);
      let bracketIndex = memosTextarea.value.indexOf("()");
      if (bracketIndex !== -1) {
        memosTextarea.selectionStart = bracketIndex + 1;
        memosTextarea.selectionEnd = bracketIndex + 1;
      }
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

  randomBtn.addEventListener("click", async function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    memosCount = window.localStorage && window.localStorage.getItem("memos-response-count");
    if (memosPath && memosOpenId) {
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
    }
  });

  uploadImageInput.addEventListener('change', () => {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
      if (memosPath && memosOpenId) {
      let filesData = uploadImageInput.files[0];
      if (uploadImageInput.files.length !== 0){
        uploadImage(filesData);
      }
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
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      memosEditorOption.classList.remove("d-none");
      memosEditorInner.classList.add("d-none");
      memosRadomCont.innerHTML = '';
      tokenInput.value = '';
      pathInput.value = '';
    }
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
          taglist += `<div class="memos-tag d-flex text-xs mt-2 mr-2"><a class="d-flex px-2 justify-content-center" onclick="setMemoTag(this)">#${t}</a></div>`;
        })
        document.querySelector(".memos-tag-list").innerHTML = taglist;
        cocoMessage.success('准备就绪');
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
          // let apiRes = e.match(/openId=([^&]*)/);
          // let urlRes = e.match(/(.+?)(?:\/api)/)[1];
          // memosOpenId = t;
          // memosPath = p;
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
          return `<div class="item-tag d-flex align-items-center text-xs line-lg mr-2 px-2">${String(t).replace(/[#]/g, '')}</div>`;
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
      result += `<div class="d-flex animate__animated animate__fadeInRight mb-3"><div class="card-item flex-fill p-3"><div class="item-header d-flex mb-3"><div class="item-avatar mr-3" style="background-image:url(${avatar})"></div><div class="item-sub d-flex flex-column"><div class="item-creator"><a href="${memosPath}" target="_blank">${creatorName}</a></div><div class="item-mate mt-2 text-xs">${new Date(createdTs * 1000).toLocaleString()}</div></div>${itemOption}</div><div class="item-content"><div class="item-inner">${memosRes}</div><div class="item-footer d-flex mt-2"><div class="d-flex">${memosTag}</div><div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a href="${memosLink}" target="_blank"><i class="iconfont iconlink-ex"></i></a></div></div></div></div></div></div>`;
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

function setMemoTag(e){
  let memoTag = e.textContent + " ";
  memosTextarea.value += memoTag;
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