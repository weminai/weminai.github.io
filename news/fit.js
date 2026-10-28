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

/* 참고문헌 접기 — 한 줄로 두고 누르면 펼침 (2026-10-29 소장님 「참고문헌 딱 한줄로 하고 클릭하면 보이게」 「스크롤이 너무 길어서」)
   세 꼴을 다 받는다: div.refs 안 h3 / h2.ref 뒤 p.rf / h3 뒤 h4·ul. 기사 파일은 고치지 않는다 */
(function(){
  function fold(){
    if(document.querySelector('details.reffold')) return;
    var hs=document.querySelectorAll('article h2, article h3, .refs h3, h2.ref');
    var st=document.createElement('style');
    st.textContent='details.reffold{margin:28px 0 8px;border-top:1px solid #D8D8D4;border-bottom:1px solid #D8D8D4}'+
      'details.reffold>summary{cursor:pointer;list-style:none;padding:12px 2px;font-weight:700;font-size:16px;color:#111}'+
      'details.reffold>summary::-webkit-details-marker{display:none}'+
      'details.reffold>summary::before{content:"\\25B8";display:inline-block;width:1.1em;color:#1B4FA8;transition:transform .15s}'+
      'details.reffold[open]>summary::before{transform:rotate(90deg)}'+
      'details.reffold>summary .n{font-weight:400;color:#6B6B68;font-size:14px;margin-left:6px}'+
      'details.reffold>summary .t{font-weight:400;color:#1B4FA8;font-size:13px;margin-left:8px}'+
      'details.reffold[open]>summary .t{display:none}'+
      'details.reffold .rfbody{padding:0 2px 12px}'+
      '@media print{details.reffold .rfbody{display:block}}';
    var done=0;
    for(var i=0;i<hs.length;i++){
      var h=hs[i]; if(!h.isConnected||(h.textContent||'').replace(/\s/g,'')!=='참고문헌') continue;
      var items=[], n=h.nextElementSibling, inBox=h.parentElement&&h.parentElement.classList.contains('refs');
      if(!inBox && n && n.classList && n.classList.contains('refs')){ h.parentNode.removeChild(h); continue; } /* 제목이 겹친 꼴: 뒤 div.refs 가 맡는다 */
      while(n){
        var tg=n.tagName, ok=false;
        if(inBox) ok=true;
        else if(tg==='P') ok=n.classList.contains('rf');
        else if(tg==='UL'||tg==='OL'||tg==='H4') ok=!n.classList.contains('rel');
        if(!ok) break;
        items.push(n); n=n.nextElementSibling;
      }
      if(!items.length) continue;
      var cnt=0; for(var j=0;j<items.length;j++){ var it=items[j]; cnt+= it.tagName==='P'?1:it.querySelectorAll('li').length; }
      var d=document.createElement('details'); d.className='reffold';
      var s=document.createElement('summary'); s.innerHTML='참고문헌'+(cnt?'<span class="n">'+cnt+'건</span>':'')+'<span class="t">펼쳐 보기</span>';
      var b=document.createElement('div'); b.className='rfbody';
      d.appendChild(s); d.appendChild(b);
      h.parentNode.insertBefore(d,h); h.parentNode.removeChild(h);
      for(var k=0;k<items.length;k++) b.appendChild(items[k]);
      done++;
    }
    if(done) document.head.appendChild(st);
    window.addEventListener('beforeprint',function(){ var ds=document.querySelectorAll('details.reffold'); for(var q=0;q<ds.length;q++) ds[q].open=true; });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fold); else fold();
})();
