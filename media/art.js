/* 기사 도구 — 글자 크기·저장·인쇄·공유 (2026-10-22) */
(function(){
  var art=document.querySelector('article.art'); if(!art) return;
  function toast(m){var t=document.createElement('div');t.className='art-toast';t.textContent=m;document.body.appendChild(t);requestAnimationFrame(function(){t.classList.add('on')});setTimeout(function(){t.classList.remove('on');setTimeout(function(){t.remove()},300)},1800)}
  var fs=0; try{fs=+localStorage.getItem('art_fs')||0}catch(e){}
  function setfs(){art.classList.remove('fs1','fs2','fs3'); if(fs) art.classList.add('fs'+fs)}
  setfs();
  document.addEventListener('click',function(e){
    var b=e.target.closest('.art .tools button'); if(!b) return;
    var a=b.getAttribute('data-a');
    if(a==='fs'){fs=(fs+1)%4;setfs();try{localStorage.setItem('art_fs',fs)}catch(e){};toast(['기본 글자','글자 조금 크게','글자 크게','글자 가장 크게'][fs]);}
    else if(a==='save'){var L=[];try{L=JSON.parse(localStorage.getItem('art_saved')||'[]')}catch(e){}
      var u=location.pathname, h=document.querySelector('.art h1');
      if(!L.some(function(x){return x.u===u})){L.unshift({u:u,t:h?h.textContent:document.title,d:Date.now()});try{localStorage.setItem('art_saved',JSON.stringify(L.slice(0,200)))}catch(e){}}
      toast('이 브라우저에 기사를 저장했습니다');}
    else if(a==='print'){window.print();}
    else if(a==='share'){var d={title:document.title,url:location.href};
      if(navigator.share){navigator.share(d).catch(function(){});}
      else if(navigator.clipboard){navigator.clipboard.writeText(location.href).then(function(){toast('기사 주소를 복사했습니다')});}
      else{toast(location.href);}}
  });
})();
