/* fit.js — 헤드라인 제목을 늘 한 줄로 (2026-10-21 소장님 「헤드라인 제목은 항상 한줄이 되게하라 지침이다」)
   기사 쪽 큰 제목(article.art h1)과 뉴스 1면 머리기사 제목(.lead h2) */
(function(){
  var SEL='article.art h1, .lead h2, #lead h2';   /* 2026-11-03 1면 머리기사 칸은 id="lead" — 소장님 「제목은 항상 한줄을 유지하라」 「다른예약작업이 기사를 올려도」 */
  function fit(){
    var hs=document.querySelectorAll(SEL);
    /* 2026-11-01 소장님 승인 — 휴대전화(폭 640 이하)에서는 헤드라인 두 줄까지 허용, 한 줄로 줄이지 않는다 */
    if(window.innerWidth<=640){ for(var j=0;j<hs.length;j++){ hs[j].style.whiteSpace='normal'; hs[j].style.fontSize=''; hs[j].style.overflow=''; } return; }
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
  /* 2026-11-02 소장님 「제호 왼쪽에 연구소 지우라」(「내 지시다」) — 제호 왼쪽 연구소 로고를 더 넣지 않는다(10-28 바로가기 결정을 소장님이 거두심) */
  return;
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

/* 바닥글 「독자권익위원회」 — 편집규약 다음에 규정 쪽 링크(2026-11-03 소장님 「독자권익위원회 표준 정관(?) 규정을 만들어서 하단에 넣으세요」 「내가 지시한 사항 여기서 다 이행하라」). 기사 쪽마다 고치지 않고 여기서 넣는다 */
(function(){
  function add(){ var c=document.querySelector('.nff .links a[href="/news/code.html"]'); if(!c||document.querySelector('.nff .links a[href="/news/committee.html"]')) return;
    var a=document.createElement('a'); a.href='/news/committee.html'; a.textContent='독자권익위원회'; c.parentNode.insertBefore(a,c.nextSibling); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add); else add();
})();


/* 소셜미디어 공유 단추 — 기획연재·브리핑·보고서·연구보고서를 뺀 모든 기사(2026-11-03 소장님 「소셜미디어에 공유하기 기능을 추가할 수 없습니까?」 「네이버밴드도사람이 많고요」 「인스타도 할 수 있게하고요」)
   제목 아래와 본문 끝 두 곳. 기사 쪽마다 고치지 않고 여기서 넣는다. 대상은 posts.json 으로 가린다 */
(function(){
  if(!/^\/media\/[^\/]+\.html$/.test(location.pathname)) return;
  var file=location.pathname.split('/').pop();
  var url='https://news.weminai.com/media/'+file;
  function toast(m){ var t=document.createElement('div'); t.className='shtoast'; t.textContent=m; document.body.appendChild(t); setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); },3200); }
  function copy(m){ var done=function(){ toast(m); };
    if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(done,function(){ prompt('아래 주소를 복사해 주십시오',url); }); }
    else { prompt('아래 주소를 복사해 주십시오',url); } }
  function native(title,fb){ if(navigator.share){ navigator.share({title:title,url:url}).catch(function(){}); } else copy(fb); }
  function build(p){
    var title=String(p["제목"]||document.title);
    var st=document.createElement('style');
    st.textContent='.share{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:14px 0 4px}.share .lb{font-size:13px;font-weight:800;color:#555;margin-right:4px}'+
      '.share button{font:inherit;font-size:13px;font-weight:800;padding:6px 11px;border-radius:16px;border:0;cursor:pointer;color:#fff;line-height:1.2}'+
      '.share .ka{background:#FEE500;color:#191919}.share .bd{background:#06C755}.share .fb{background:#1877F2}.share .x{background:#000}.share .ig{background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)}.share .cp{background:#fff;color:#333;border:1px solid #BBB}'+
      '.shtoast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#141414;color:#fff;padding:10px 16px;border-radius:6px;font-size:14px;z-index:9999;max-width:90%}'+
      '@media print{.share{display:none}}';
    document.head.appendChild(st);
    var html='<span class="lb">공유</span><button type="button" class="ka" data-s="ka">카카오톡</button><button type="button" class="bd" data-s="bd">밴드</button><button type="button" class="fb" data-s="fb">페이스북</button><button type="button" class="x" data-s="x">X</button><button type="button" class="ig" data-s="ig">인스타그램</button><button type="button" class="cp" data-s="cp">링크 복사</button>';
    var spots=[document.querySelector('article .byl'), document.querySelector('article .af')];
    spots.forEach(function(el,i){ if(!el) return; var d=document.createElement('div'); d.className='share'; d.innerHTML=html; if(i===0) el.parentNode.insertBefore(d,el.nextSibling); else el.parentNode.insertBefore(d,el); });
    document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.share button'); if(!b) return; var s=b.getAttribute('data-s'), u=encodeURIComponent(url), t=encodeURIComponent(title);
      if(s==='fb') window.open('https://www.facebook.com/sharer/sharer.php?u='+u,'_blank','noopener,width=620,height=560');
      else if(s==='x') window.open('https://twitter.com/intent/tweet?text='+t+'&url='+u,'_blank','noopener,width=620,height=560');
      else if(s==='bd') window.open('https://band.us/plugin/share?body='+encodeURIComponent(title+'\n'+url)+'&route='+encodeURIComponent('news.weminai.com'),'_blank','noopener,width=620,height=640');
      else if(s==='ka') native(title,'기사 주소를 복사했습니다. 카카오톡 대화창에 붙여 넣어 주십시오.');
      else if(s==='ig') native(title,'기사 주소를 복사했습니다. 인스타그램 스토리·프로필 링크에 붙여 넣어 주십시오.');
      else if(s==='cp') copy('기사 주소를 복사했습니다.');
    });
  }
  fetch('/data/posts.json',{cache:'no-cache'}).then(function(r){ return r.json(); }).then(function(list){ list=(Array.isArray(list)?list:[]).filter(function(p){ return p["누리집"]!=="연구소"; }); /* 연구소 몫(보도자료·연구보고서)은 뉴스에 걸지 않는다 — 통합지침 쉰다섯 2항, 2026-11-06 소장님 승인 */
    var p=null; for(var i=0;i<list.length;i++){ if(String(list[i]["파일"]||'').split('/').pop()===file){ p=list[i]; break; } }
    if(!p) return;
    var hay=[p["묶음"],p["분야"],p["갈래"]].join(' ');   /* 제목 본문 속 낱말(보기: 칼럼 제목의 「보고서」)로 빼지 않는다 — 제목은 머리 꺾쇠 [○○ 브리핑]만 본다(2026-11-03 소장님 「소셜미디어 공유하기 없는 기사도 잇습니다」) */
    var head=(String(p["제목"]||'').match(/^\s*\[[^\]]*\]/)||[''])[0];
    /* 2026-11-05 소장님 결정 「모든 글에 넣기」 — 기획연재·브리핑·보고서도 빼지 않고 모든 글 쪽에 공유 단추를 넣는다(11-03 「빼라」를 갈음). hay·head 는 기록으로 남긴다 */
    var go=function(){ build(p); };
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
  }).catch(function(){});
})();
/* 2026-11-03 외국어 자동 번역 국기 띠(news/lang.js)를 부른다 — 소장님 「내 지시다」. fit.js 를 쓰는 1면·섹션·기사 쪽 모두에 제호 위로 들어간다 */
(function(){ if(document.querySelector('script[src*="/news/lang.js"]')) return; var s=document.createElement('script'); s.src='/news/lang.js?v=261103'; s.defer=true; (document.head||document.documentElement).appendChild(s); })();

/* 2026-11-08 소장님 「전체기사 빼고 12개 섹션으로」 「해양항공 합치라」 「도시부동산 경제로」 — 상단 메뉴 열둘을 기사 쪽·안내 쪽 모두에 여기서 한 번에 다시 그린다(기사 쪽 HTML에 박힌 옛 메뉴를 덮는다) */
(function(){ var M=["경제","정치행정","인천경제","사회","국제","기후에너지","AI","교통물류","오피니언","인문·학술","기획연재"];   /* 2026-11-08 밤 소장님 「학술과 인문학을 합치라」 「인문(점)학술」 「인문학은 학술 앞에」 */   /* 2026-11-08 밤 소장님 「인문학을 추가해주세요」 「해양항공은 교통물류에 넣어 버립시다」 「최대한 섹션은 폭 넓게」 */
  function nav(){ var w=document.querySelector('.gnb .wrap'); if(!w) return; var all=w.querySelector('a.all'), t=w.querySelector('.tools');
    var as=w.querySelectorAll('a'); for(var i=0;i<as.length;i++){ if(as[i]!==all && !(t&&t.contains(as[i]))) as[i].parentNode.removeChild(as[i]); }
    var cur=decodeURIComponent((location.search.match(/[?&]k=([^&]*)/)||[])[1]||"");
    M.forEach(function(n){ var a=document.createElement('a'); a.href='/news/s.html?k='+encodeURIComponent(n); a.textContent=n; if(cur===n) a.className='on'; if(t) w.insertBefore(a,t); else w.appendChild(a); }); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',nav); else nav(); })();

/* 2026-11-09 AI 요약 — 소장님 「AI요약은 클릭했을 때 보여주는 방식으로 하라」. 기사 쪽(/media/아이디.html)에서 posts.json 그 글의 「요약」(배열 또는 줄바꿈 글)이 있으면 부제 아래 「AI 요약 보기」 단추를 두고, 누르면 펼친다. 요약은 편집국이 본문 사실로 확인한 것만 넣는다 */
;(function(){ try{
  var m=location.pathname.match(/\/media\/([A-Za-z0-9_-]+)\.html$/); if(!m) return;
  function go(){ fetch('/data/posts.json',{cache:'no-cache'}).then(function(r){ return r.json(); }).then(function(d){
    var p=null; for(var i=0;i<d.length;i++){ if(d[i].id===m[1]){ p=d[i]; break; } }
    if(!p || !p['요약'] || document.getElementById('aisum')) return;
    var items=Array.isArray(p['요약'])?p['요약']:String(p['요약']).split('\n');
    var subs=document.querySelector('article .subs'); if(!subs) return;
    var w=document.createElement('div'); w.id='aisum'; w.style.cssText='margin:14px 0 18px';
    var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-expanded','false');
    b.style.cssText='font:inherit;font-size:14px;font-weight:700;color:#8a1c1c;background:#faf7f0;border:1px solid #d9d2c3;border-radius:999px;padding:6px 14px;cursor:pointer';
    b.textContent='AI 요약 보기 \u25BE';
    var box=document.createElement('div'); box.hidden=true;
    box.style.cssText='margin-top:10px;padding:14px 18px;border:1px solid #d9d2c3;border-left:4px solid #8a1c1c;background:#faf7f0;border-radius:4px;font-size:16px;line-height:1.7';
    var ul=document.createElement('ul'); ul.style.cssText='margin:0;padding-left:1.1em';
    items.forEach(function(t){ t=String(t).trim(); if(!t) return; var li=document.createElement('li'); li.textContent=t; ul.appendChild(li); });
    var note=document.createElement('div'); note.style.cssText='margin-top:8px;font-size:12px;color:#777';
    note.textContent='AI가 본문에서 뽑고 편집국이 확인한 요약입니다. 자세한 내용은 본문을 읽어 주십시오.';
    box.appendChild(ul); box.appendChild(note);
    b.addEventListener('click',function(){ box.hidden=!box.hidden; b.setAttribute('aria-expanded',String(!box.hidden)); b.textContent=box.hidden?'AI 요약 보기 \u25BE':'AI 요약 닫기 \u25B4'; });
    w.appendChild(b); w.appendChild(box); subs.parentNode.insertBefore(w, subs.nextSibling);
  }).catch(function(){}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
}catch(e){} })();
