/* fit.js — 헤드라인 제목을 늘 한 줄로 (2026-10-21 소장님 「헤드라인 제목은 항상 한줄이 되게하라 지침이다」)
   기사 쪽 큰 제목(article.art h1)과 뉴스 1면 머리기사 제목(.lead h2) */
(function(){
  var SEL='article.art h1, .lead h2';
  function fit(){
    var hs=document.querySelectorAll(SEL);
    for(var i=0;i<hs.length;i++){
      var h=hs[i]; h.style.whiteSpace='nowrap'; h.style.fontSize=''; h.style.overflow='hidden';
      for(var p=h.parentElement,k=0;p&&k<3;p=p.parentElement,k++){ p.style.minWidth='0'; }
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

/* 연구소 홈페이지 바로가기 — 제호 왼쪽 칸에 연구소 로고 (2026-10-28 소장님 「뉴스 홈페이지에 연구소 홈페이지 바로가기가 있으면 좋겠고」 「연구소는 연구소 로고를 사용해서 바로가기」) */
(function(){
  function add(){
    var l=document.querySelector('.mast .lft'); if(!l||l.querySelector('a.labhome')) return;
    var st=document.createElement('style');
    st.textContent='.mast .lft .labhome{display:inline-block;margin-bottom:4px}.mast .lft .labhome img{display:block;height:46px;width:auto}@media(max-width:820px){.mast .lft .labhome img{height:34px;margin:0 auto}}';
    document.head.appendChild(st);
    var a=document.createElement('a'); a.className='labhome'; a.href='https://weminai.com/'; a.title='경세제민 AI·경제연구소 홈페이지';
    var i=document.createElement('img'); i.src='https://weminai.com/logo.png'; i.alt='경세제민 AI·경제연구소 홈페이지'; a.appendChild(i);
    l.insertBefore(a,l.firstChild);
    if(l.childNodes.length>1 && l.childNodes[1].nodeName!=='BR') l.insertBefore(document.createElement('br'),a.nextSibling);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add); else add();
})();
