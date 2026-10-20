/* fit.js — 기사 큰 제목을 늘 한 줄로 (2026-10-21 소장님 「헤드라인 제목은 항상 한줄이 되게하라 지침이다」) */
(function(){
  function fit(){
    var hs=document.querySelectorAll('article.art h1');
    for(var i=0;i<hs.length;i++){
      var h=hs[i]; h.style.whiteSpace='nowrap'; h.style.fontSize='';
      var s=parseFloat(getComputedStyle(h).fontSize)||40, n=0;
      while(h.scrollWidth>h.clientWidth+1 && s>13 && n<80){ s-=1; h.style.fontSize=s+'px'; n++; }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fit); else fit();
  var t; window.addEventListener('resize',function(){ clearTimeout(t); t=setTimeout(fit,120); });
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
})();
