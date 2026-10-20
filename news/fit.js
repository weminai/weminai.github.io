/* fit.js — 헤드라인 제목을 늘 한 줄로 (2026-10-21 소장님 「헤드라인 제목은 항상 한줄이 되게하라 지침이다」)
   기사 쪽 큰 제목(article.art h1)과 뉴스 1면 머리기사 제목(.lead h2) */
(function(){
  var SEL='article.art h1, .lead h2';
  function fit(){
    var hs=document.querySelectorAll(SEL);
    for(var i=0;i<hs.length;i++){
      var h=hs[i]; h.style.whiteSpace='nowrap'; h.style.fontSize='';
      var s=parseFloat(getComputedStyle(h).fontSize)||40, n=0;
      while(h.scrollWidth>h.clientWidth+1 && s>13 && n<80){ s-=1; h.style.fontSize=s+'px'; n++; }
    }
  }
  var t; function later(){ clearTimeout(t); t=setTimeout(fit,80); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fit); else fit();
  window.addEventListener('resize',later);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
  if(window.MutationObserver){ var mo=new MutationObserver(function(){ later(); }); var go=function(){ mo.observe(document.body,{childList:true,subtree:true}); }; if(document.body) go(); else document.addEventListener('DOMContentLoaded',go); }
})();
