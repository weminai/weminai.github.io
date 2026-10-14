/* 경세제민 AI·경제 연구소 — 복사·퍼가기 금지. 연구소의 지적재산이다. */
(function(){
  try{ if(window.top!==window.self){ window.top.location=window.self.location; } }catch(e){ document.documentElement.style.display='none'; }
  function form(t){ return t && t.closest && t.closest('input,textarea,select,[contenteditable]'); }
  ['copy','cut','paste','contextmenu','dragstart','selectstart'].forEach(function(ev){
    document.addEventListener(ev,function(e){ if(!form(e.target)) e.preventDefault(); },true);
  });
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if((e.ctrlKey||e.metaKey) && ['c','v','x','s','u'].indexOf(k)>=0 && !form(e.target)) e.preventDefault();
  },true);
})();
