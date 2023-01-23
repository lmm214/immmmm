  //相对时间
  window.Lately && Lately.init({ target: '.post-date,.datetime,.datatime,.photo-time'});
  //图片灯箱
  window.ViewImage && ViewImage.init('.post-content img:not(.avatar,.tk-avatar-img)')
  //外链 gallery 标签相册瀑布流
  var photosAll = document.getElementsByTagName('gallery') || '';
  if(photosAll){
    for(var i=0;i < photosAll.length;i++){
      photosAll[i].innerHTML = '<div class="gallery-photos">'+photosAll[i].innerHTML+'</div>'
      var photosIMG = photosAll[i].getElementsByTagName('img')
      for(var j=0;j < photosIMG.length;j++){
        wrap(photosIMG[j], document.createElement('div'));
      }
    }
  }
  function wrap(el, wrapper) {
    wrapper.className = "gallery-photo";
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  //相册瀑布流
  let galleryPhotos = document.querySelectorAll('.gallery-photos') || ''
  if(galleryPhotos){
    imgStatus.watch('.gallery-photo img', function(imgs) {
      if(imgs.isDone()){
        for(var i=0;i < galleryPhotos.length;i++){
          waterfall(galleryPhotos[i]);
          let pagePhoto = galleryPhotos[i].querySelectorAll('.gallery-photo');
          for(var j=0;j < pagePhoto.length;j++){pagePhoto[j].className += " visible"};
        }
      }
    });
    window.addEventListener('resize', function () {
      for(var i=0;i < galleryPhotos.length;i++){
        waterfall(galleryPhotos[i]);
      }
    });
  }
  //随机日志
  function randomPost() {
    fetch('/sitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        let locationHref,locSplit;
        do {
            locationHref = ls[Math.floor(Math.random() * ls.length)].innerHTML
            locSplit = locationHref.split('/')[3] || ''
        } while (locSplit == '' || locSplit == 'tags' || locSplit == 'posts'); 
        location.href = locationHref
    })
  }