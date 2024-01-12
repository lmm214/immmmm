var editIcon = '<button class="load-memos-editor p-1"><i class="iconfont iconedit-square"></i></button>';
document.body.insertAdjacentHTML('beforeend', editIcon);

var memosDom = document.querySelector(memosData.dom);
var memosEditorCont = `<div class="memos-editor animate__animated animate__fadeIn d-none col-12"><div class="memos-editor-body mb-3 p-3"><div class="memos-editor-inner animate__animated animate__fadeIn d-none"><div class="memos-editor-content"><textarea class="memos-editor-textarea text-sm" rows="1" placeholder="任何想法..."></textarea></div><div class="memos-image-list d-flex flex-fill line-xl"></div><div class="memos-editor-tools pt-3"><div class="d-flex"><div class="button outline action-btn tag-btn mr-2"><i class="iconfont iconnumber"></i></div><div class="button outline action-btn todo-btn mr-2"><i class="iconfont iconunorderedlist"></i></div><div class="button outline action-btn code-btn mr-2"><i class="iconfont iconcode"></i></div><div class="button outline action-btn mr-2 link-btn"><i class="iconfont iconlink"></i></div><div class="button outline action-btn image-btn mr-2" onclick="this.lastElementChild.click()"><i class="iconfont iconimage"></i><input class="memos-upload-image-input d-none" type="file" accept="image/*"></div></div><div class="d-flex flex-fill"><div class="memos-tag-list d-none mt-2 animate__animated animate__fadeIn"></div></div></div><div class="memos-editor-footer border-t mt-3 pt-3 "><div class="d-flex"><div class="editor-selector select outline"><select class="select-memos-value pl-2 pr-4 py-2"><option value="PUBLIC">所有人可见</option><option value="PROTECTED">仅登录可见</option><option value="PRIVATE">仅自己可见</option></select></div><div class="button outline random-btn mx-2 p-2"><i class="iconfont iconretweet"></i></div><div class="button outline switchUser-btn d-none d-md-flex mr-2 p-2"><i class="iconfont iconswitchuser"></i></div></div><div class="editor-submit d-flex flex-fill justify-content-end"><div class="edit-memos d-none"><button class="outline cancel-edit-btn mr-2 px-3 py-2" title="取消">取消</button><button class="primary edit-memos-btn px-3 py-2" title="保存">保存</button></div><button class="primary submit-memos-btn px-3 py-2" title="记下">记下</button></div></div></div><div class="memos-editor-option animate__animated animate__fadeIn d-none"><div class="row flex-fill mr-3 p-2"><input name="memos-path-url" class="memos-path-input input-text col-6" type="text" value="" placeholder="Path"><input name="memos-token-url" class="memos-token-input input-text col-6" type="text" value="" placeholder="Token"></div><button class="primary submit-openapi-btn px-3 py-2">保存</button></div></div><div class="memos-random d-none"></div></div>`;
memosDom.insertAdjacentHTML('afterbegin',memosEditorCont);

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

document.addEventListener("DOMContentLoaded", () => {
  getEditIcon();
});

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
    let result = '';
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
      result += `<div class="d-flex animate__animated animate__fadeIn mb-3"><div class="card-item flex-fill p-3"><div class="item-header d-flex mb-3"><div class="item-avatar mr-3" style="background-image:url(${avatar})"></div><div class="item-sub d-flex flex-column"><div class="item-creator"><a href="${memosPath}" target="_blank">${creatorName}</a></div><div class="item-mate mt-2 text-xs">${new Date(createdTs * 1000).toLocaleString()}</div></div></div><div class="item-content"><div class="item-inner">${memosRes}</div><div class="item-footer d-flex mt-2"><div class="d-flex">${memosTag}</div><div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a href="${memosLink}" target="_blank"><i class="iconfont iconlink-ex"></i></a></div></div></div></div></div></div>`;
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