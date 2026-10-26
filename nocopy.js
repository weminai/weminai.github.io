/* 경세제민 AI·경제 연구소 — 복사는 리드문까지, 복사한 글에는 출처가 남는다. */
/* 2026-10-21 소장님 지시 「이 두곳은 복사를 허용하세요」 — 기사 머리(분류·제목·부제·바이라인)와 기사 끝 기자 칸은 복사를 연다 */
/* 2026-10-25 소장님 「저는 부제목까진 복사를 허용하라고 했습니다」 — 부제 칸 .subs 를 연다 */
/* 2026-10-26 소장님 「기술적으로 리드문까지만 복사를 허용하라」 「항상 우리 출처가 남게하라」 「모든 콘텐츠에 일관된 방식을 적용하라」
   — 기사 본문 첫 문단(리드문), 연구보고서 머리와 요약까지 복사를 연다. 복사하면 끝에 출처(제호·제목·주소)가 붙는다.
   — 분야 꼬리표를 누르면 그 분야 지면(/news/s.html?k=분야)으로 간다
   2026-10-26 소장님 「회원가입은 후원회원으로 전환하고」 「각 콘텐츠마다 달리면 좋겠다. 건당 500원에서 월 CMS는 3000원부터 5000, 1만원이상으로」
   — 「회원가입」 연결 글자를 「후원하기」로 바꾸고, 글 끝마다 후원 안내 상자를 단다 */
(function(){
  try{ if(window.top!==window.self){ window.top.location=window.self.location; } }catch(e){ document.documentElement.style.display='none'; }
  var OPEN='input,textarea,select,[contenteditable],.art .kick,.art h1,.art .sub,.art .subs,.art .byl,.af .by .who,.cp-open';
  var SEC={"정책브리핑":"정책브리핑","해양":"해양","항공":"항공","공항·물류":"항공","철도":"철도","복합물류":"복합물류",
    "도시계획·부동산":"도시·부동산","도시·부동산":"도시·부동산","기후위기":"기후위기","경제":"경제","AI":"AI",
    "국제":"국제","국제관계":"국제","인천경제":"인천경제","금융·증시":"금융·증시","기획연재":"기획연재"};
  function el(n){ return n && (n.nodeType===1 ? n : n.parentElement); }
  function open(n){ n=el(n); return !!(n && n.closest && n.closest(OPEN)); }
  /* 고른 글자가 모두 열린 칸 안에 있을 때만 참 — 리드문에서 둘째 문단까지 끌어 고르면 막힌다 */
  function selOpen(){ var s=window.getSelection&&window.getSelection(); if(!s||s.isCollapsed) return false;
    for(var i=0;i<s.rangeCount;i++){ var r=s.getRangeAt(i), root=r.commonAncestorContainer;
      if(root.nodeType!==1) root=root.parentNode;
      if(open(root)) continue;
      var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null), n;
      while((n=w.nextNode())){ if(!r.intersectsNode(n)||!/\S/.test(n.nodeValue)) continue; if(skip(n)) continue; if(!open(n)) return false; } }
    return true; }
  /* 글자 크기·저장·인쇄·공유 단추 같은 화면 도구는 고른 범위에 끼어도 막지 않고, 복사한 글에서 뺀다 (2026-10-26 소장님 「왜 복사하기와 붙여넣기가 안되지?」) */
  var SKIP='button,.tools,.art .tools,[aria-hidden="true"],script,style';
  function skip(n){ n=el(n); return !!(n && n.closest && n.closest(SKIP)); }
  function mark(n){ if(!n) return; n.classList.add('cp-open'); n.style.webkitUserSelect='text'; n.style.userSelect='text'; n.style.webkitTouchCallout='default'; }
  function setup(){
    /* 리드문 — 기사 본문 첫 문단 */
    var b=document.querySelector('.art .body'); if(b){ mark(b.querySelector('p')); }
    /* 연구보고서 — 머리와 요약 */
    mark(document.querySelector('.rp .rph')); mark(document.querySelector('.rp .sum'));
    /* 분야 꼬리표 → 분야 지면 */
    var k=document.querySelector('.art .kick');
    if(k && !k.querySelector('a')){ var t=k.textContent.trim(), s=SEC[t];
      if(s){ var a=document.createElement('a'); a.href='/news/s.html?k='+encodeURIComponent(s); a.textContent=t; a.style.color='inherit'; a.style.textDecoration='none'; a.setAttribute('draggable','false');
        k.textContent=''; k.appendChild(a); } }
    /* 회원가입 → 후원하기 */
    [].forEach.call(document.querySelectorAll('a[href$="member.html"]'),function(a){
      var t=a.textContent.trim(); if(t==='회원가입') a.textContent='후원하기'; else if(t==='회원 안내') a.textContent='후원회원 안내'; });
    /* 글 끝 후원 상자 — 기사 본문 뒤, 연구보고서 끝 */
    var end=document.querySelector('.art .body')||document.querySelector('article.rp');
    if(end && !document.querySelector('.give-box')){
      var id=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
      var g=document.createElement('div'); g.className='give-box';
      g.style.cssText='margin:28px 0 8px;padding:16px 18px;border:1px solid #D9E2F2;border-left:4px solid #1A6DFF;background:#F4F8FE;font-size:15px;line-height:1.7;color:#222';
      g.innerHTML='<b>이 글이 쓸모 있으셨다면 후원해 주십시오.</b><br>글 한 편 500원부터, 매달 3000원·5000원·1만원 이상. '+
        '계좌 입금 <b>신한은행 100-038-966032</b>(예금주 경세제민에이아이경제연구소 주식회사) — 받는 분 통장 표시에 성함과 글 번호 <b>'+id+'</b>를 적어 주십시오. '+
        '카드·모바일 결제는 준비 중입니다. <a href="/news/member.html#give" style="color:#0B4FCE;text-decoration:underline;font-weight:700">후원회원 안내</a>';
      end.parentNode.insertBefore(g,end.nextSibling);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup); else setup();
  function src(){
    var h=document.querySelector('.art h1,.rp h1'), t=(h?h.textContent:document.title.split(' · ')[0]).replace(/\s+/g,' ').trim();
    var u=location.origin+location.pathname;
    return {t:t,u:u};
  }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  ['copy','cut'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      var tg=el(e.target);
      if(tg && tg.closest && tg.closest('input,textarea,select,[contenteditable]')) return;
      if(!selOpen()){ e.preventDefault(); return; }
      var s=window.getSelection(); if(!s||s.isCollapsed||!e.clipboardData) return;
      var o=src();
      var div=document.createElement('div'); for(var i=0;i<s.rangeCount;i++){ div.appendChild(s.getRangeAt(i).cloneContents()); }
      [].forEach.call(div.querySelectorAll(SKIP),function(x){ x.parentNode.removeChild(x); });
      div.style.cssText='position:fixed;left:-9999px;top:0;white-space:pre-wrap'; document.body.appendChild(div); var txt=div.innerText.replace(/[ \t\u00a0]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim(); document.body.removeChild(div); div.removeAttribute('style');
      var line='출처: AI경세제민(경세제민 AI·경제연구소(주)) 「'+o.t+'」';
      e.clipboardData.setData('text/plain', txt+'\n\n'+line+'\n'+o.u);
      e.clipboardData.setData('text/html', div.innerHTML+'<p>'+esc(line)+'<br><a href="'+esc(o.u)+'">'+esc(o.u)+'</a></p>');
      e.preventDefault();
    },true);
  });
  ['paste','contextmenu','dragstart','selectstart'].forEach(function(ev){
    document.addEventListener(ev,function(e){ if(!open(e.target)) e.preventDefault(); },true);
  });
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if(!(e.ctrlKey||e.metaKey)||['c','v','x','s','u'].indexOf(k)<0) return;
    if(open(e.target)) return;
    if((k==='c'||k==='x') && selOpen()) return;
    e.preventDefault();
  },true);
})();
