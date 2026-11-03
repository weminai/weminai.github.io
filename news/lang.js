/* AI경제저널 외국어 자동 번역 띠 — 구글 번역 주소(translate.goog)를 국기마다 건다.
   2026-11-03 소장님 「권고대로 하되」 「한국어 중 미 일 러 에스파뇰 독일어 프랑스어 베트남어 태국어 인도어 아랍어」 「인니어」 「튀르키에」 「크메르어 넣으라」 「짝을 맞추자 8개씩」 「브라질」(포르투갈어 더해 열여섯)
   제호 위에 놓는다. 국기 그림은 이 파일 안에서 SVG 로 그린다(국기는 저작권 없음). 원문 쪽에서는 각 말로, 번역 쪽에서는 태극기를 누르면 원문으로 돌아간다 */
(function(){
var F={
ko:'<rect width="30" height="20" fill="#fff"/><g transform="translate(15 10)"><circle r="5" fill="#C60C30"/><path d="M-5 0a5 5 0 0 0 10 0a2.5 2.5 0 0 0-5 0a2.5 2.5 0 0 1-5 0z" fill="#003478" transform="rotate(33.7)"/></g><g fill="#000"><g transform="translate(6.2 4.6) rotate(-56.3)"><rect x="-2.2" y="-1.6" width="4.4" height=".8"/><rect x="-2.2" y="-.4" width="4.4" height=".8"/><rect x="-2.2" y=".8" width="4.4" height=".8"/></g><g transform="translate(23.8 15.4) rotate(-56.3)"><rect x="-2.2" y="-1.6" width="1.9" height=".8"/><rect x=".3" y="-1.6" width="1.9" height=".8"/><rect x="-2.2" y="-.4" width="1.9" height=".8"/><rect x=".3" y="-.4" width="1.9" height=".8"/><rect x="-2.2" y=".8" width="1.9" height=".8"/><rect x=".3" y=".8" width="1.9" height=".8"/></g><g transform="translate(23.8 4.6) rotate(56.3)"><rect x="-2.2" y="-1.6" width="4.4" height=".8"/><rect x="-2.2" y="-.4" width="1.9" height=".8"/><rect x=".3" y="-.4" width="1.9" height=".8"/><rect x="-2.2" y=".8" width="4.4" height=".8"/></g><g transform="translate(6.2 15.4) rotate(56.3)"><rect x="-2.2" y="-1.6" width="1.9" height=".8"/><rect x=".3" y="-1.6" width="1.9" height=".8"/><rect x="-2.2" y="-.4" width="4.4" height=".8"/><rect x="-2.2" y=".8" width="1.9" height=".8"/><rect x=".3" y=".8" width="1.9" height=".8"/></g></g>',
zh:'<rect width="30" height="20" fill="#EE1C25"/><g fill="#FFFF00"><path d="M5 2l1.18 3.62H10L6.9 7.86 8.09 11.5 5 9.26 1.91 11.5 3.1 7.86 0 5.62h3.82z"/><circle cx="10" cy="2" r=".9"/><circle cx="12" cy="4" r=".9"/><circle cx="12" cy="7" r=".9"/><circle cx="10" cy="9" r=".9"/></g>',
en:'<rect width="30" height="20" fill="#fff"/><g fill="#B22234"><rect width="30" height="1.54"/><rect y="3.08" width="30" height="1.54"/><rect y="6.15" width="30" height="1.54"/><rect y="9.23" width="30" height="1.54"/><rect y="12.3" width="30" height="1.54"/><rect y="15.4" width="30" height="1.54"/><rect y="18.46" width="30" height="1.54"/></g><rect width="12" height="10.77" fill="#3C3B6E"/><g fill="#fff"><circle cx="2" cy="2" r=".5"/><circle cx="5" cy="2" r=".5"/><circle cx="8" cy="2" r=".5"/><circle cx="10.6" cy="2" r=".5"/><circle cx="3.5" cy="4.2" r=".5"/><circle cx="6.5" cy="4.2" r=".5"/><circle cx="9.3" cy="4.2" r=".5"/><circle cx="2" cy="6.4" r=".5"/><circle cx="5" cy="6.4" r=".5"/><circle cx="8" cy="6.4" r=".5"/><circle cx="10.6" cy="6.4" r=".5"/><circle cx="3.5" cy="8.6" r=".5"/><circle cx="6.5" cy="8.6" r=".5"/><circle cx="9.3" cy="8.6" r=".5"/></g>',
ja:'<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/>',
ru:'<rect width="30" height="20" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039A6"/><rect y="13.33" width="30" height="6.67" fill="#D52B1E"/>',
es:'<rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/>',
de:'<rect width="30" height="20" fill="#FFCE00"/><rect width="30" height="6.67"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/>',
fr:'<rect width="30" height="20" fill="#fff"/><rect width="10" height="20" fill="#002395"/><rect x="20" width="10" height="20" fill="#ED2939"/>',
vi:'<rect width="30" height="20" fill="#DA251D"/><path d="M15 4l1.76 5.41h5.7l-4.61 3.35 1.76 5.41L15 14.82l-4.61 3.35 1.76-5.41-4.61-3.35h5.7z" fill="#FFFF00"/>',
th:'<rect width="30" height="20" fill="#A51931"/><rect y="3.33" width="30" height="13.33" fill="#F4F5F8"/><rect y="6.67" width="30" height="6.67" fill="#2D2A4A"/>',
hi:'<rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#FF9933"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".6"/><circle cx="15" cy="10" r=".6" fill="#000080"/>',
ar:'<rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#00732F"/><rect y="13.33" width="30" height="6.67"/><rect width="8" height="20" fill="#FF0000"/>',
id:'<rect width="30" height="20" fill="#fff"/><rect width="30" height="10" fill="#CE1126"/>',
tr:'<rect width="30" height="20" fill="#E30A17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.25" cy="10" r="4" fill="#E30A17"/><path d="M15.6 10l3.7-1.2-2.29 3.15V8.05l2.29 3.15z" fill="#fff"/>',
km:'<rect width="30" height="20" fill="#032EA1"/><rect y="5" width="30" height="10" fill="#E00025"/><g fill="#fff"><rect x="8.5" y="12.6" width="13" height="1.2"/><rect x="9.3" y="11.2" width="11.4" height="1.4"/><path d="M13.6 11.2V8.4l.7-.6.7-1.9.7 1.9.7.6v2.8z"/><path d="M10.6 11.2V9.4l.5-.5.5-1.3.5 1.3.5.5v1.8z"/><path d="M17.4 11.2V9.4l.5-.5.5-1.3.5 1.3.5.5v1.8z"/><rect x="9.4" y="10.2" width="1.2" height="1"/><rect x="19.4" y="10.2" width="1.2" height="1"/></g>',
pt:'<rect width="30" height="20" fill="#009C3B"/><path d="M15 2.2L27.4 10 15 17.8 2.6 10z" fill="#FFDF00"/><circle cx="15" cy="10" r="4.4" fill="#002776"/><path d="M10.7 9.1a10 10 0 0 1 8.6 2.1v.9a10 10 0 0 0-8.7-2.2z" fill="#fff"/>'
};
var L=[['ko','ko','한국어(원문)'],['zh','zh-CN','中文'],['en','en','English'],['ja','ja','日本語'],['ru','ru','Русский'],['es','es','Español'],['de','de','Deutsch'],['fr','fr','Français'],['vi','vi','Tiếng Việt'],['th','th','ไทย'],['hi','hi','हिन्दी'],['ar','ar','العربية'],['id','id','Bahasa Indonesia'],['tr','tr','Türkçe'],['km','km','ខ្មែរ'],['pt','pt','Português']];
var h=location.hostname, inTG=/\.translate\.goog$/.test(h);
var orig=inTG?h.replace(/\.translate\.goog$/,'').replace(/--/g,'\u0000').replace(/-/g,'.').replace(/\u0000/g,'-'):h;
if(!/weminai\.com$/.test(orig)) orig='news.weminai.com';
var tgh=orig.replace(/-/g,'--').replace(/\./g,'-')+'.translate.goog';
var q=location.search.replace(/^\?/,'').split('&').filter(function(x){ return x && !/^_x_tr_/.test(x); }).join('&');
var path=location.pathname;
var url=function(c){ if(c==='ko') return 'https://'+orig+path+(q?'?'+q:'')+location.hash;
  return 'https://'+tgh+path+'?'+(q?q+'&':'')+'_x_tr_sl=ko&_x_tr_tl='+c+'&_x_tr_hl=ko&_x_tr_pto=wapp'+location.hash; };
var css='.langbar{position:relative;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;gap:6px;width:-moz-fit-content;width:fit-content;margin:0 auto 12px;grid-column:1/-1;justify-self:center}'+   /* 나라(국기)만 가운데 정렬(소장님 「나라를 가운데 정열」) — 「자동 번역」 글자는 띠 밖 오른쪽에 붙여 가운데를 흩뜨리지 않는다 */
 '.langbar a{display:block;line-height:0;margin:0;font-size:0;border:1px solid #d6d6d6;border-radius:2px;transition:transform .15s}.langbar a:hover,.langbar a:focus{transform:translateY(-1px);border-color:#888}'+
 '.langbar svg{width:27px;height:18px;display:block}.langbar .lb{position:absolute;left:100%;top:50%;transform:translateY(-50%);margin-left:8px;font-size:11px;color:#8a8a8a;letter-spacing:.02em;white-space:nowrap}'+
 '@media(max-width:640px){.langbar{display:grid;grid-template-columns:repeat('+Math.ceil(L.length/2)+',auto);gap:6px 5px;margin:0 auto 8px}.langbar .lb{top:auto;bottom:2px;transform:none;margin-left:5px;font-size:10px}.langbar .lb .g{display:none}}'+   /* 웹은 한 줄(소장님 「웨버전은 한 줄」), 모바일은 두 줄(소장님 「모바일은 두줄」) — 국기를 반씩 나눠 두 줄 */
 '@media print{.langbar{display:none}}';
var put=function(){
  if(document.querySelector('.langbar')) return;
  var host=document.querySelector('.mast .wrap')||document.querySelector('header .wrap')||document.querySelector('header');
  if(!host) return;
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  var d=document.createElement('div'); d.className='langbar'; d.setAttribute('role','navigation'); d.setAttribute('aria-label','자동 번역(구글)'); d.setAttribute('translate','no'); d.classList.add('notranslate');
  d.innerHTML=L.map(function(x){ return '<a href="'+url(x[1])+'" title="'+x[2]+(x[0]==='ko'?'':' — 구글 자동 번역')+'" lang="'+x[1]+'"'+(x[0]==='ko'?'':' rel="nofollow"')+'><svg viewBox="0 0 30 20" aria-hidden="true">'+F[x[0]]+'</svg><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">'+x[2]+'</span></a>'; }).join('')+'<span class="lb">자동 번역<span class="g">(구글)</span></span>';
  host.insertBefore(d,host.firstChild);   /* 제호 위(소장님 「제호 위에다 넣으세요」) */
};
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',put); else put();
})();
