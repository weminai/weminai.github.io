/* 첫 화면 순환 띠 — 연구보고서와 정책브리핑, 묶음(분야)마다 최신 한 편씩 돌아가며 보인다(2026-10-22 소장님 「다른 항목의 브리핑이 순환하게 하라」) */
(function(){
 var box=document.getElementById('rot'); if(!box||!window.fetch)return;
 function e(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function d(s){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(s||'');return m?m[1]+'.'+m[2]+'.'+m[3]:'';}
 function rep(p){return /연구보고서/.test(String(p.분야||'')+String(p.묶음||''));}
 fetch('data/posts.json',{cache:'no-cache'}).then(function(r){return r.ok?r.json():[];}).then(function(ps){
  if(!Array.isArray(ps))return;
  var L=ps.filter(function(p){return p&&p.파일&&p.제목&&p.공개!=='보류'&&(p.분야==='정책브리핑'||rep(p));})
   .sort(function(a,b){return (a.날짜||'')<(b.날짜||'')?1:(a.날짜||'')>(b.날짜||'')?-1:0;});
  var seen={},P=[]; L.forEach(function(p){var k=rep(p)?'연구보고서:'+p.파일:(p.묶음||'정책브리핑'); if(!seen[k]){seen[k]=1;P.push(p);}});
  P.sort(function(a,b){return rep(a)===rep(b)?0:rep(a)?-1:1;});
  if(!P.length)return;
  function card(p){var lab=rep(p)?'연구보고서':(p.묶음||'정책브리핑'); var ti=String(p.제목).replace(/^\s*\[[^\]]*\]\s*/,'');
   return '<a class="rc" href="'+e(p.파일)+'"><span class="im"'+(p.대표그림?' style="background-image:url('+e(p.대표그림)+')"':'')+'></span><span class="m">'+e(lab)+'</span><b>'+e(ti)+'</b><span class="dt">'+d(p.날짜)+'</span></a>';}
  var html=P.map(card).join(''); box.innerHTML=html+html;
  var n=P.length,i=0,stop=false;
  function w(){var c=box.querySelector('.rc');return c?c.getBoundingClientRect().width+20:320;}
  function go(k,anim){i=k;box.style.transition=anim===false?'none':'transform .6s ease';box.style.transform='translateX('+(-i*w())+'px)';}
  box.addEventListener('transitionend',function(){if(i>=n)go(i-n,false);if(i<0)go(i+n,false);});
  var rot=box.closest('.rot');
  rot.querySelector('.r').onclick=function(){go(i+1);};
  rot.querySelector('.l').onclick=function(){if(i<=0)go(n,false);setTimeout(function(){go(i-1);},20);};
  rot.addEventListener('mouseenter',function(){stop=true;}); rot.addEventListener('mouseleave',function(){stop=false;});
  setInterval(function(){if(!stop&&!document.hidden)go(i+1);},3500);
 }).catch(function(){});
})();
/* 자료검색 — 연구소 안내 쪽과 정책브리핑·연구보고서를 찾는다(기사는 찾지 않는다) */
(function(){
 var u=document.getElementById('qlist'); if(!u||!window.fetch)return;
 var q=(new URLSearchParams(location.search).get('q')||'').trim(); var box=document.querySelector('.qbar input'); if(box)box.value=q;
 if(!q)return;
 function e(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function d(s){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(s||'');return m?m[1]+'.'+m[2]+'.'+m[3]:'';}
 var ws=q.toLowerCase().split(/\s+/).filter(Boolean);
 var PAGES=[['research.html#biz','연구소 안내','연구소가 하는 일 — 연구용역 정책연구 기본계획 경제성분석 타당성 비용편익 조사분석 설문 공론조사 컨설팅 AI 교육 도시계획 재생 엔지니어링 홍보기획'],['research.html#rec','연구소 안내','연구 실적 — 인천시의회 전통시장 입체복합 도시공간 해양수산 거점 타당성'],['about.html#people','연구소 안내','연구진 — 김갑봉 소장 김효진 대표이사 객원연구원'],['about.html#map','연구소 안내','오시는 길 연락처 주소 전화 032-777-0421'],['ask.html','의뢰·신청','연구 의뢰 강연 교육 신청'],['join.html','객원연구원','객원연구원 신청']];

  var hit=function(s){s=String(s).toLowerCase();return ws.every(function(w){return s.indexOf(w)>=0;});};
  var R=PAGES.filter(function(p){return hit(p[2]);}).map(function(p){return {f:p[0],g:p[1],t:p[2].split(' — ')[0],dt:''};});
  var done=function(){
  document.getElementById('qh').textContent='「'+q+'」 검색 결과';
  document.getElementById('qn').textContent=R.length?R.length+'건을 찾았습니다.':'찾은 것이 없습니다. 다른 말로 찾아보시거나 032-777-0421로 물어 주십시오.';
  u.innerHTML=R.slice(0,80).map(function(x){return '<li><a href="'+e(x.f)+'"><span class="g">'+e(x.g)+'</span><span class="t">'+e(x.t)+'</span><span class="d">'+x.dt+'</span></a></li>';}).join('');
  };
  fetch('data/posts.json',{cache:'no-cache'}).then(function(r){return r.ok?r.json():[];}).then(function(ps){
   (Array.isArray(ps)?ps:[]).filter(function(p){return p&&p.파일&&p.제목&&p.공개!=='보류'&&(p.분야==='정책브리핑'||/연구보고서/.test(String(p.분야||'')+String(p.묶음||'')))&&hit([p.제목,p.부제,p.묶음,p.분야,p.리드].join(' '));})
    .sort(function(a,b){return (a.날짜||'')<(b.날짜||'')?1:-1;}).forEach(function(p){R.push({f:p.파일,g:p.묶음||p.분야||'',t:String(p.제목).replace(/^\s*\[[^\]]*\]\s*/,''),dt:d(p.날짜)});});
   done();
  }).catch(done);
 
})();
