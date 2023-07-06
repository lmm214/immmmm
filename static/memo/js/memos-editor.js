//var editIcon = '<button class="load-memos-editor p-1"><i class="iconfont iconedit-square"></i></button>';
//document.body.insertAdjacentHTML('beforeend', editIcon);
cocoMessage.config({
  duration: 600,
});

var memosDom = document.querySelector(memosData.dom);
var memosEditorCont = '<div class="memos-editor animate__animated animate__fadeIn d-none col-12"><div class="memos-editor-body mb-3 p-3"><div class="memos-editor-inner animate__animated animate__fadeIn d-none"><div class="memos-editor-content"><textarea class="memos-editor-textarea text-sm" rows="1" placeholder="任何想法..."></textarea></div><div class="memos-editor-tools pt-3"><div class="d-flex"><div class="button outline action-btn tag-btn mr-2"><i class="iconfont iconnumber"></i></div><div class="button outline action-btn todo-btn mr-2"><i class="iconfont iconunorderedlist"></i></div><div class="button outline action-btn code-btn mr-2"><i class="iconfont iconcode"></i></div><div class="button outline action-btn mr-2 link-btn"><i class="iconfont iconlink"></i></div><div class="button outline action-btn image-btn mr-2" onclick="this.lastElementChild.click()"><i class="iconfont iconimage"></i><input class="memos-upload-image-input d-none" type="file" accept="image/*"></div></div><div class="d-flex flex-fill"><div class="memos-tag-list d-none mt-2 animate__animated animate__fadeIn"></div></div></div><div class="memos-editor-footer border-t mt-3 pt-3 "><div class="d-flex"><div class="editor-selector select outline"><select class="select-memos-value pl-2 pr-4 py-2"><option value="PUBLIC">所有人可见</option><option value="PROTECTED">仅登录可见</option><option value="PRIVATE">仅自己可见</option></select></div><div class="button outline random-btn mx-2 p-2"><i class="iconfont iconretweet"></i></div><div class="button outline switchUser-btn p-2"><i class="iconfont iconswitchuser"></i></div></div><div class="editor-submit d-flex flex-fill justify-content-end"><button class="primary submit-memos-btn px-3 py-2">记下</button></div></div></div><div class="memos-editor-option animate__animated animate__fadeIn d-none"><input name="memos-api-url" class="memos-open-api-input input-text flex-fill mr-3 p-2" type="password" value="" maxlength="120" placeholder="OpenAPI"><button class="primary submit-openapi-btn px-3 py-2">保存</button></div></div><div class="memos-random d-none"></div></div>';
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
//var loadEditorBtn = document.querySelector(".load-memos-editor");
var submitApiBtn = document.querySelector(".submit-openapi-btn");
var submitMemoBtn = document.querySelector(".submit-memos-btn");
var memosVisibilitySelect = document.querySelector(".select-memos-value");
var openApiInput = document.querySelector(".memos-open-api-input");
var uploadImageInput = document.querySelector(".memos-upload-image-input");
var memosTextarea = document.querySelector(".memos-editor-textarea");

document.addEventListener("DOMContentLoaded", () => {
  getEditIcon();
});

function getEditIcon() {
  var memosContent = '',memosVisibility = '',memosResource = [];
  var memosCount = window.localStorage && window.localStorage.getItem("memos-response-count");
  var memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
  var memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
  var getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
  var isHide = getEditor === "hide";
  memosTextarea.addEventListener('input', (e) => {
    memosTextarea.style.height = 'inherit';
    memosTextarea.style.height = e.target.scrollHeight + 'px';
  });

  if (getEditor !== null) {
		document.querySelector(".memos-editor").classList.toggle("d-none",isHide);
    getEditor == "show" ? hasMemosOpenId() : ''
	};

  //loadEditorBtn.addEventListener("click", function () {
  if(memosOpenId !== null){
    getEditor != "show" ? hasMemosOpenId() : ''
    document.querySelector(".memos-editor").classList.remove("d-none"); 
    window.localStorage && window.localStorage.setItem("memos-editor-display", document.querySelector(".memos-editor").classList.contains("d-none") ? "hide" : "show");
    getEditor = window.localStorage && window.localStorage.getItem("memos-editor-display");
  //});
  }else{
    document.querySelector(".memos-editor-option").classList.remove("d-none");
    document.querySelector(".memos-editor").classList.remove("d-none");
  }

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
      let memoTodo = '- [ ] \n';
      memosTextarea.value += memoTodo;
      memosTextarea.style.height = memosTextarea.scrollHeight + 'px';
    }
  });

  codeBtn.addEventListener("click", function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      let memoCode = '```\n\n```';
      let textareaH = memosTextarea.clientHeight;
      memosTextarea.value += memoCode;
      memosTextarea.style.height = memosTextarea.scrollHeight + 'px';
    }
  });

  linkBtn.addEventListener("click", function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      let memoLink = '[]()';
    memosTextarea.value += memoLink;
    }
  });

  randomBtn.addEventListener("click", function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    memosCount = window.localStorage && window.localStorage.getItem("memos-response-count");
    if (memosPath && memosOpenId) {
      let randomNum = random(0,memosCount);
      let randomUrl= memosPath+"/api/memo/all?&limit=1&offset="+randomNum;
      fetch(randomUrl).then(res => {
        if (res.status == 200) {
          return res.json()
        }else{
          cocoMessage.error('出错了，再检查一下吧!')
        }
      }).then(resdata => {
        updateAvatarUrl(resdata.data);
      })
      .catch(err => {cocoMessage.error('网络错误')});
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
    const imageData = new FormData();
    const blobUrl = memosPath+"/api/resource/blob?openId="+memosOpenId;
    imageData.append('file', data, data.name)
    const resp = await fetch(blobUrl, {
      method: "POST",
      body: imageData
    })
    const res = await resp.json().then(res => {
      if(res.data.id){
        cocoMessage.success(
        '上传成功',
        ()=>{
          memosResource.push(res.data.id);
          window.localStorage && window.localStorage.setItem("memos-resource-list",  JSON.stringify(memosResource));
        })
      }
    })
  };

  switchUserBtn.addEventListener("click", function () {
    memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    if (memosPath && memosOpenId) {
      memosEditorOption.classList.remove("d-none");
      memosEditorInner.classList.add("d-none");
      memosRadomCont.innerHTML = '';
      openApiInput.value = '';
    }
  });

  submitApiBtn.addEventListener("click", function () {
    if(openApiInput.value == null || openApiInput.value == ''){
      cocoMessage.info('内容不能为空');
    }else{
      getMemosData(openApiInput.value);
    }
  });

  submitMemoBtn.addEventListener("click", function () {
    memosContent = memosTextarea.value;
    memosVisibility = memosVisibilitySelect.value;
    memosResource = window.localStorage && JSON.parse(window.localStorage.getItem("memos-resource-list"));
    memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
    let  hasContent = memosContent.length !== 0;
    if (memosOpenId && hasContent) {
      let memoUrl = memosPath+"/api/memo?openId="+memosOpenId;
      let memoBody = {content:memosContent,visibility:memosVisibility,resourceIdList:memosResource}
      fetch(memoUrl, {
        method: 'post',
        body: JSON.stringify(memoBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(res) {
        if (res.status == 200) {
          cocoMessage.success(
          '发送成功',
          ()=>{
            location.reload();
          })
        }
      })
    }else if(!hasContent){
      cocoMessage.info('内容不能为空');
    }else{
      cocoMessage.info(
        '请设置 Memos Open API',
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
      cocoMessage.info('请设置 Memos Open API');
    }else{
      const tagUrl = memosPath+"/api/tag?openId="+memosOpenId;
      const response = fetch(tagUrl).then(response => response.json()).then(resdata => {
        return resdata.data
      }).then(response => {
        let taglist = "";
        response.map((t)=>{
          taglist += '<div class="memos-tag d-flex text-xs mt-2 mr-2"><a class="d-flex px-2 justify-content-center" onclick="setMemoTag(this)">#'+t+'</a></div>'
        })
        document.querySelector(".memos-tag-list").innerHTML = taglist;
        //cocoMessage.success('准备就绪');
        memosEditorInner.classList.remove("d-none");
        memosEditorOption.classList.add("d-none"); 
        memosRadomCont.classList.remove("d-none");
      }).catch(err => {
        memosEditorOption.classList.remove("d-none");
        cocoMessage.error('Memos Open API 有误，请重新输入!');
      });
    }
  }

  function random(a,b) {
    var choices = b - a + 1;
    return Math.floor(Math.random() * choices + a);
  }

  function getMemosData(e) {
    let apiReg = /openId=([^&]*)/,urlReg = /(.+?)(?:\/api)/;
    fetch(e).then(res => {
      if (res.status == 200) {
        return res.json()
      }else{
        cocoMessage.error('出错了，再检查一下吧!')
      }
    }).then(resdata => {
      if(typeof(resdata) !== "undefined"){
        let apiRes = e.match(apiReg),urlRes = e.match(urlReg)[1];
        memosOpenId = apiRes[1];
        memosPath = urlRes;
        memosCount = resdata.data.length;
        window.localStorage && window.localStorage.setItem("memos-access-path", urlRes);
        window.localStorage && window.localStorage.setItem("memos-access-token", memosOpenId);
        window.localStorage && window.localStorage.setItem("memos-response-count", memosCount);
        cocoMessage.success(
        '保存成功',
        ()=>{
          memosEditorOption.classList.add("d-none");
          memosEditorInner.classList.remove("d-none"); 
          memosPath = window.localStorage && window.localStorage.getItem("memos-access-path");
          memosOpenId = window.localStorage && window.localStorage.getItem("memos-access-token");
          hasMemosOpenId();
        })
      }
    })
  };

  function updateAvatarUrl(e) {
    let avatarUrl = memosPath+"/api/user/me?openId="+memosOpenId;
    fetch(avatarUrl).then(res => {
      if (res.status == 200) {
        return res.json()
      }else{
        cocoMessage.error('出错了，再检查一下吧!')
      }
    }).then(resdata => {
      let d = resdata.data;
      e.map(item => {
        return item.avatarUrl = d.avatarUrl
      });
      updateRadom(e);
    })
  }

  function updateRadom(data) {
    let result = '';
    let TAG_REG = /#(.+?) /g, 
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

    for (var i = 0; i < data.length; i++) {
      let avatar = data[i].avatarUrl;
      let creatorName = data[i].creatorName;
      let createdTs = data[i].createdTs;
      let memosId = data[i].id;
      let memosLink = memosPath + "/m/" + memosId;
      let memosRes = data[i].content
        .replace(TAG_REG, "")
        .replace(IMG_REG, "")
        .replace(LINK_REG, '<a class="primary" href="$2" target="_blank">$1</a>')
        memosRes = marked.parse(memosRes)
        .replace(BILIBILI_REG, '<div class="video-wrapper"><iframe src="//player.bilibili.com/player.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>')
        .replace(NETEASE_MUSIC_REG, '<meting-js auto="https://music.163.com/#/song?id=$1"></meting-js>')
        .replace(QQMUSIC_REG, '<meting-js auto="https://y.qq.com/n/yqq/song$1.html"></meting-js>')
      
      //解析 content 内 md 格式图片
      var imgArr = data[i].content.match(IMG_REG);
      var imgStr = String(imgArr).replace(/[,]/g, '');
      if (imgArr) {
          var memosImg = imgStr.replace(IMG_REG, '<div class="memo-resource width-100"><img loading="lazy" src="$2"></div>')
          memosRes += '<div class="resource-wrapper"><div class="images-wrapper my-2">' + memosImg + '</div></div>'
      }
      var tagArr = data[i].content.match(TAG_REG);
      var memosTag = '';
      if (tagArr) {
        memosTag = String(tagArr[0]).replace(/[#]/g, '')
      }else{
        memosTag = '动态'
      }
      
      //解析内置资源文件
      if (data[i].resourceList && data[i].resourceList.length > 0) {
        var resourceList = data[i].resourceList;
        var imgUrl = '',resUrl = '',resImgLength = 0;
        for (var j = 0; j < resourceList.length; j++) {
          var restype = resourceList[j].type.slice(0, 5);
          var resexlink = resourceList[j].externalLink;
          var imgLink = '', fileId = '';
            if (resexlink) {
                imgLink = resexlink
            } else {
                fileId = resourceList[j].publicId || resourceList[j].filename
                imgLink = data[i].link + '/o/r/' + resourceList[j].id + '/' + fileId
            }
          if (restype == 'image') {
            imgUrl += '<div class="memo-resource w-100"><img loading="lazy" src="' + imgLink + '"/></div>'
            resImgLength = resImgLength + 1
          }
          if (restype !== 'image') {
            resUrl += '<a target="_blank" rel="noreferrer" href="' + imgLink + '">' + resourceList[j].filename + '</a>'
          }
        }
        if (imgUrl) {
          memosRes += '<div class="resource-wrapper"><div class="images-wrapper my-2">' + imgUrl + '</div></div>'
        }
        if (resUrl) {
          memosRes += '<p class="datasource">' + resUrl + '</p>'
        }
      }
      result += '<div class="d-flex animate__animated animate__fadeIn mb-3"><div class="card-item flex-fill p-3"><div class="item-header d-flex mb-3"><div class="item-avatar mr-3" style="background-image:url('+ avatar +')"></div><div class="item-sub d-flex flex-column"><div class="item-creator"><a href='+ memosPath +' target="_blank">' + creatorName + '</a></div><div class="item-mate mt-2 text-xs">' + new Date(createdTs * 1000).toLocaleString() + '</div></div></div><div class="item-content"><div class="item-inner">' + memosRes + '</div><div class="item-footer d-flex mt-2"><div class="item-tag d-flex align-items-center text-xs px-2">'+ memosTag +'</div>';
      result += '<div class="d-flex flex-fill justify-content-end"><div class="item d-flex align-items-center"><a href="'+memosLink+'" target="_blank"><i class="iconfont iconlink-ex"></i></a></div></div></div>';
      result += '</div></div></div>';
    };
    memosRadomCont.innerHTML = result;

    //图片灯箱
    window.ViewImage && ViewImage.init('.images-wrapper img')
    //相对时间
    window.Lately && Lately.init({
      target: '.item-mate'
    });
  }
}

function setMemoTag(e){
  let memoTag = e.textContent + " ";
  memosTextarea.value += memoTag;
}