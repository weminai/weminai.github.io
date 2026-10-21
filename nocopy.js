/* 경세제민 AI·경제 연구소 — 복사·퍼가기 금지. 연구소의 지적재산이다. */
/* 2026-10-21 소장님 지시 「이 두곳은 복사를 허용하세요」 — 기사 머리(분류·제목·부제·바이라인)와 기사 끝 기자 칸은 복사를 연다 */
(function(){
  try{ if(window.top!==window.self){ window.top.location=window.self.location; } }catch(e){ document.documentElement.style.display='none'; }
  var OPEN='input,textarea,select,[contenteditable],.art .kick,.art h1,.art .sub,.art .byl,.af .by .who';
  function el(n){ return n && (n.nodeType===1 ? n : n.parentElement); }
  function open(n){ n=el(n); return !!(n && n.closest && n.closest(OPEN)); }
  function selOpen(){ var s=window.getSelection&&window.getSelection(); if(!s||s.isCollapsed) return false; return open(s.anchorNode)&&open(s.focusNode); }
  ['copy','cut'].forEach(function(ev){
    document.addEventListener(ev,function(e){ if(!open(e.target)&&!selOpen()) e.preventDefault(); },true);
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
