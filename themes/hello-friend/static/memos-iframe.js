var addCSS = "#toBi iframe{border:none;box-shadow: 0 4px 6px 0px rgba(0,0,0,.14);position: fixed;flex-direction: column;justify-content: space-between;bottom: 5rem;right: 1rem;width: 448px;min-height:190px;height:190px;max-height: 600px;border-radius: 0.45rem;display: flex;z-index: 999999;overflow: hidden;left: unset;animation: atkFadeIn both .3s;background-color: #292a2d;}#toBi-icon{position: fixed; bottom: 1rem; right: 1rem; width: 50px; height: 50px; border-radius: 25px; background-color:#292a2d; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px; cursor: pointer; z-index: 2147483645; transition: all 0.2s ease-in-out 0s; left: unset; transform: scale(1);}#toBi-icon:hover{transform: scale(1.08);}#toBi-svg{display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;}@keyframes atkFadeIn {0% {opacity: 0} to {opacity: 1}}@media (max-width:550px) {#toBi iframe{right:0;width:100%;}}"
var toBiDom = '<div id="toBi-icon"><div id="toBi-svg"></div></div>'
var toBiDomRem = '<svg id="closeIcon" onclick="removeIframe()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="white" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>'
var toBiDomAdd = '<svg id="toBi-comt" onclick="addIframe()" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M816 808H672c-4.8 0-8 1.6-11.2 4.8l-80 80c-36.8 36.8-97.6 36.8-136 0l-80-80c-3.2-3.2-6.4-4.8-11.2-4.8h-144c-70.4 0-128-57.6-128-128V232c0-70.4 57.6-128 128-128h608c70.4 0 128 57.6 128 128v448C944 750.4 886.4 808 816 808zm0-64c35.2 0 64-28.8 64-64V232c0-35.2-28.8-64-64-64H208c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h144c20.8 0 41.6 8 56 24l80 80c12.8 12.8 32 12.8 44.8 0l80-80c14.4-14.4 35.2-24 56-24H816zM320 408c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48zm192 0c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48zm192 0c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48z" fill="#ffffff"></path></svg>'

document.addEventListener("DOMContentLoaded", () => {
  loadCssCode(addCSS);
  createDiv()
})
function createDiv(){
  var toBiDiv = document.createElement('div');
  toBiDiv.id = 'toBi'
  document.body.appendChild(toBiDiv);
  toBiDiv.insertAdjacentHTML('afterend', toBiDom);
  document.querySelector("#toBi-svg").insertAdjacentHTML('afterbegin', toBiDomAdd);
}
function addIframe(){
    var iframe = document.createElement("iframe");
    iframe.src = "/memo"; // 替换为您要嵌入的远程网页的 URL
    iframe.id = "memos"
    document.getElementById("toBi").appendChild(iframe);
    document.getElementById("toBi-svg").innerHTML = toBiDomRem
};
function removeIframe(){
  var iframeNow = document.getElementById("memos")
  iframeNow.src = 'about:blank';
  try{
    iframeNow.contentWindow.document.write('')
    iframeNow.contentWindow.document.clear('')
  }catch(e){}
  iframeNow.parentNode.removeChild(iframeNow)
  document.querySelector("#toBi-svg").innerHTML = toBiDomAdd
}
function loadCssCode(code){
  var style = document.createElement('style');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  style.appendChild(document.createTextNode(code));
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
}