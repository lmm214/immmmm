/**
 * ViewImage.min.js 2.0.0
 * MIT License - http://www.opensource.org/licenses/mit-license.php
 * https://tokinx.github.io/ViewImage/
 */
 function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}(function(){window.ViewImage=new function(){var a=this;this.target='[view-image] img',this.listener=function(b){if(!(b.ctrlKey||b.metaKey||b.shiftKey||b.altKey)){var c=a.target.split(',').map(function(h){return h.trim()+':not([no-view])'})+'',d=b.target.closest(c);if(d){var f=d.closest('[view-image]')||document.body,g=[].concat(_toConsumableArray(f.querySelectorAll(c))).map(function(h){return h.href||h.src});a.display(g,d.href||d.src),b.stopPropagation(),b.preventDefault()}}},this.init=function(b){b&&(a.target=b),['removeEventListener','addEventListener'].forEach(function(c){document[c]('click',a.listener,!1)})},this.display=function(b,c){var d=b.indexOf(c),f=new DOMParser().parseFromString('\n                <div class="view-image">\n                    <style>.view-image{position:fixed;inset:0;z-index:500;padding:3%;display:flex;flex-direction:column;animation:view-image-in 300ms;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}.view-image__out{animation:view-image-out 300ms}@keyframes view-image-in{0%{opacity:0}}@keyframes view-image-out{100%{opacity:0}}.view-image-btn{width:32px;height:32px;display:flex;justify-content:center;align-items:center;cursor:pointer;border-radius:3px;background-color:rgba(255,255,255,0.2)}.view-image-btn:hover{background-color:rgba(255,255,255,0.5)}.view-image-close__full{position:absolute;inset:0;background-color:rgba(48,55,66,0.3);z-index:unset;cursor:zoom-out;margin:0}.view-image-container{height:0;flex:1;display:flex;align-items:center;justify-content:center;padding-bottom:3%}.view-image-lead{display:contents}.view-image-lead img{position:relative;z-index:1;max-width:100%;max-height:100%;object-fit:contain;border-radius:3px}.view-image-lead__in img{animation:view-image-lead-in 300ms}.view-image-lead__out img{animation:view-image-lead-out 300ms forwards}@keyframes view-image-lead-in{0%{opacity:0;transform:translateY(-20px)}}@keyframes view-image-lead-out{100%{opacity:0;transform:translateY(20px)}}[class*=__out] ~ .view-image-loading{display:block}.view-image-loading{position:absolute;inset:50%;width:8rem;height:2rem;color:#aab2bd;overflow:hidden;text-align:center;margin:-1rem -4rem;z-index:1;display:none}.view-image-loading::after{content:"";position:absolute;inset:50% 0;width:100%;height:3px;background:rgba(255,255,255,0.5);transform:translateX(-100%) translateY(-50%);animation:view-image-loading 800ms -100ms ease-in-out infinite}@keyframes view-image-loading{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.view-image-tools{position:relative;display:flex;justify-content:space-between;align-content:center;color:#fff;max-width:600px;width:100%;margin:0 auto;padding:10px;border-radius:5px;background:rgba(255,255,255,0.1);margin-bottom:constant(safe-area-inset-bottom);margin-bottom:env(safe-area-inset-bottom);z-index:1}.view-image-tools__count{width:60px;display:flex;align-items:center;justify-content:center}.view-image-tools__flip{display:flex;gap:10px}.view-image-tools [class*=-close]{margin:0 10px}</style>\n                    <div class="view-image-container">\n                        <div class="view-image-lead"></div>\n                        <div class="view-image-loading"></div>\n                        <div class="view-image-close view-image-close__full"></div>\n                    </div>\n                    <div class="view-image-tools">\n                        <div class="view-image-tools__count">\n                            <span><b class="view-image-index">'+(d+1)+'</b>/'+b.length+'</span>\n                        </div>\n                        <div class="view-image-tools__flip">\n                            <div class="view-image-btn view-image-tools__flip-prev">\n                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M31 36L19 24L31 12" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                            </div>\n                            <div class="view-image-btn view-image-tools__flip-next">\n                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M19 12L31 24L19 36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                            </div>\n                        </div>\n                        <div class="view-image-btn view-image-close">\n                            <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M8 8L40 40" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                        </div>\n                    </div>\n                </div>\n            ','text/html').body.firstChild,g=function keyFn(j){var k={Escape:'close',ArrowLeft:'tools__flip-prev',ArrowRight:'tools__flip-next'};k[j.key]&&f.querySelector('.view-image-'+k[j.key]).click()},h=function loadImage(j){var k=new Image,l=f.querySelector('.view-image-lead');l.className='view-image-lead view-image-lead__out',setTimeout(function(){l.innerHTML='',k.onload=function(){setTimeout(function(){l.innerHTML='<img src="'+k.src+'" alt="ViewImage" no-view/>',l.className='view-image-lead view-image-lead__in'},100)},k.src=j},300)};document.body.appendChild(f),h(c),window.addEventListener('keydown',g),f.onclick=function(j){j.target.closest('.view-image-close')?(window.removeEventListener('keydown',g),f.onclick=null,f.classList.add('view-image__out'),setTimeout(function(){return f.remove()},290)):j.target.closest('.view-image-tools__flip')&&(d=j.target.closest('.view-image-tools__flip-prev')?0===d?b.length-1:d-1:d===b.length-1?0:d+1,h(b[d]),f.querySelector('.view-image-index').innerHTML=d+1)}}}})();