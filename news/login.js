/* AI경제저널 회원 로그인(구글)과 가입 신청서 — 2026-11-09 소장님 「로그인 제도가 필요하다」 「구글이 좋다」 「다 채우면 바로 회원이 되는 게 바람직하지 않아요?」 「탈퇴신청 기능이 있어야 합니다」
파이어베이스 인증 + 파이어스토어(서울, asia-northeast3). 프로젝트 ai-economy-journal, 연구소 계정 weminaimax@weminai.com. 아래 설정값은 공개용이고 키는 누리집 주소로 제한해 두었다
회원 명단(members/{uid}): 이메일, 회원번호, 이름 또는 별칭, 사는 곳, 하는 일, 관심 섹션, 동의 기록, 가입·마지막 로그인 일시. 구글 이름·사진은 명단에 옮기지 않고 화면에도 쓰지 않는다
출입 규칙: 회원은 제 문서만 읽고 쓴다. 전체 명단은 연구소 계정만 */
(function(){ try{
var CFG={apiKey:"AIzaSyDAmnIKsRZ9UbU4i_l15VvNYHCpxGlD-sc",authDomain:"ai-economy-journal.firebaseapp.com",projectId:"ai-economy-journal",storageBucket:"ai-economy-journal.firebasestorage.app",messagingSenderId:"1018126089787",appId:"1:1018126089787:web:859852a1d25ebe499f661e"};
var V='10.12.2';
var REG=['인천','서울','경기','충청','광주전남','대구경북','부울경','강원','전북','제주','해외'];
var JOB=['공무원(시·군·구)','공무원(경찰)','공무원(교육)','정치인·의회','시민사회·주민단체','노동자','자영업·소상공인','기업','연구·교육','학생','그 밖'];
var SEC=['경제','정치행정','인천경제','사회','국제','기후에너지','AI','교통물류','오피니언','인문·학술','기획연재'];
var NAVY='#17428F';
var W=window.weminAuth=window.weminAuth||{user:null,member:null,listeners:[]};
W.on=function(f){ W.listeners.push(f); if(W.inited){ try{f(W.user,W.member);}catch(e){} } };
function load(src){ return new Promise(function(res,rej){ var s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
function fire(){ W.inited=true; draw(); W.listeners.forEach(function(f){ try{f(W.user,W.member);}catch(e){} }); try{ window.dispatchEvent(new CustomEvent('wemin-auth')); }catch(e){} }
var auth=null, db=null;
W.ready=load('https://www.gstatic.com/firebasejs/'+V+'/firebase-app-compat.js').then(function(){ return load('https://www.gstatic.com/firebasejs/'+V+'/firebase-auth-compat.js'); }).then(function(){ return load('https://www.gstatic.com/firebasejs/'+V+'/firebase-firestore-compat.js'); }).then(function(){
if(!firebase.apps.length) firebase.initializeApp(CFG);
auth=firebase.auth(); auth.languageCode='ko'; db=firebase.firestore();
W.signIn=function(){ var p=new firebase.auth.GoogleAuthProvider(); p.setCustomParameters({prompt:'select_account'}); return auth.signInWithPopup(p).catch(function(e){ if(e && (e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment')) return auth.signInWithRedirect(p); }); };
W.signOut=function(){ closeAll(); return auth.signOut(); };
auth.onAuthStateChanged(function(u){ W.user=u; W.member=null;
if(!u){ fire(); return; }
db.collection('members').doc(u.uid).get().then(function(s){
if(s.exists){ W.member=s.data(); db.collection('members').doc(u.uid).update({lastLogin:firebase.firestore.FieldValue.serverTimestamp()}).catch(function(){}); fire(); }
else { fire(); openForm(); }
}).catch(function(){ fire(); });
});
}).catch(function(){});

function css(){ if(document.getElementById('wm-css')) return; var st=document.createElement('style'); st.id='wm-css';
st.textContent='.wm-bg{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:24px 12px}'+
'.wm-box{background:#fff;max-width:640px;width:100%;border-radius:8px;padding:24px 22px;font-size:15px;line-height:1.6;color:#111;box-shadow:0 8px 30px rgba(0,0,0,.25)}'+
'.wm-box h2{margin:0 0 6px;font-size:22px;color:'+NAVY+'}.wm-box .note{background:#f4f6fb;border-left:4px solid '+NAVY+';padding:10px 12px;margin:10px 0 16px;font-size:14px}'+
'.wm-box label.t{display:block;font-weight:800;margin:14px 0 6px}.wm-box .req{color:#c0392b}'+
'.wm-box input[type=text]{width:100%;box-sizing:border-box;font:inherit;padding:9px 10px;border:1px solid #b9c3d9;border-radius:4px}'+
'.wm-box select{width:100%;font:inherit;padding:8px;border:1px solid #b9c3d9;border-radius:4px;background:#fff}'+
'.wm-box .chips{display:flex;flex-wrap:wrap;gap:6px 14px}.wm-box .chips label{white-space:nowrap;cursor:pointer}'+
'.wm-box .cons{background:#f6f5f1;border:1px solid #e3e0d8;padding:12px;margin-top:16px;font-size:14px}.wm-box .cons label{display:block;margin:4px 0;cursor:pointer}'+
'.wm-box .err{color:#c0392b;font-weight:700;margin-top:10px;min-height:1em}'+
'.wm-box .row{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:16px}'+
'.wm-box button{font:inherit;font-weight:800;border-radius:6px;padding:9px 16px;cursor:pointer;border:1px solid '+NAVY+'}'+
'.wm-box .pri{background:'+NAVY+';color:#fff}.wm-box .sec{background:#fff;color:'+NAVY+'}.wm-box .dan{background:#fff;color:#c0392b;border-color:#c0392b}'+
'.wm-box table{border-collapse:collapse;width:100%;font-size:15px}.wm-box td{border-bottom:1px solid #eee;padding:7px 4px;vertical-align:top}.wm-box td:first-child{width:7em;font-weight:800;color:#444}'+
'.wm-box a{color:'+NAVY+'}';
document.head.appendChild(st); }
function closeAll(){ var b=document.getElementById('wm-bg'); if(b&&b.parentNode) b.parentNode.removeChild(b); }
function modal(html){ css(); closeAll(); var bg=document.createElement('div'); bg.id='wm-bg'; bg.className='wm-bg'; bg.innerHTML='<div class="wm-box" role="dialog" aria-modal="true">'+html+'</div>'; document.body.appendChild(bg); return bg; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function opts(a){ return '<option value="">고르십시오</option>'+a.map(function(x){ return '<option>'+esc(x)+'</option>'; }).join(''); }
function chips(a,name){ return '<div class="chips">'+a.map(function(x){ return '<label><input type="checkbox" name="'+name+'" value="'+esc(x)+'"> '+esc(x)+'</label>'; }).join('')+'</div>'; }

function openForm(){ var u=W.user; if(!u) return;
var bg=modal('<h2>AI경제저널 회원 가입 신청</h2>'+
'<div class="note">2026년 11월 9일부터 회원 제도를 시행합니다. 아래 칸을 모두 채우시면 바로 회원이 되고, 위민아이(Wemin-AI) 요약을 보실 수 있습니다. 2027년 4월 정식 창간 전까지 무료입니다. <a href="/news/terms.html" target="_blank">이용약관</a> · <a href="/news/privacy.html" target="_blank">개인정보 처리방침</a></div>'+
'<div style="font-size:14px;color:#555">로그인한 구글 계정: '+esc(u.email||'')+' (구글 이름·사진은 회원 명단에 옮기지 않습니다)</div>'+
'<label class="t" for="wm-nick">이름 또는 별칭(자나 호도 가능) <span class="req">*</span></label><input type="text" id="wm-nick" maxlength="10" placeholder="2자 이상 10자 이하, 다른 회원과 겹칠 수 없습니다">'+
'<label class="t" for="wm-reg">사는 곳 <span class="req">*</span></label><select id="wm-reg">'+opts(REG)+'</select>'+
'<label class="t" for="wm-job">하는 일 <span class="req">*</span></label><select id="wm-job">'+opts(JOB)+'</select>'+
'<label class="t">관심 섹션(여럿 고를 수 있습니다) <span class="req">*</span></label>'+chips(SEC,'wm-sec')+
'<div class="cons">'+
'<div style="margin-bottom:6px">모으는 것: 구글 계정 전자우편, 이름 또는 별칭, 사는 곳, 하는 일, 관심 섹션, 동의 기록, 가입·로그인 일시. 쓰는 곳: 회원 확인, 위민아이 요약 제공, 맞춤 기사 안내. 두는 기간: 탈퇴하시는 날까지(탈퇴 즉시 지웁니다). 회원 명단은 구글 파이어베이스 서울 저장소에, 로그인 기록은 구글 미국 서버에서 처리됩니다.</div>'+
'<label><input type="checkbox" id="wm-c1"> (필수) <a href="/news/terms.html" target="_blank">이용약관</a>에 동의합니다</label>'+
'<label><input type="checkbox" id="wm-c2"> (필수) <a href="/news/privacy.html" target="_blank">개인정보 수집·이용</a>에 동의합니다</label>'+
'<label><input type="checkbox" id="wm-c3"> (필수) 만 14세 이상입니다</label>'+
'<label><input type="checkbox" id="wm-c4"> (선택) AI경제저널 소식을 전자우편으로 받겠습니다</label></div>'+
'<div class="err" id="wm-err"></div>'+
'<div class="row"><button type="button" class="sec" id="wm-later">나중에 하기(로그아웃)</button><button type="button" class="pri" id="wm-go">가입 신청</button></div>');
bg.querySelector('#wm-later').onclick=function(){ W.signOut(); };
bg.querySelector('#wm-go').onclick=function(){ submit(bg, this); };
}
function submit(bg, btn){
var $=function(s){ return bg.querySelector(s); }, err=$('#wm-err'); err.textContent='';
var nick=$('#wm-nick').value.replace(/\s+/g,' ').trim(), reg=$('#wm-reg').value, job=$('#wm-job').value;
var sec=[].slice.call(bg.querySelectorAll('input[name="wm-sec"]:checked')).map(function(x){ return x.value; });
if(nick.length<2||nick.length>10){ err.textContent='이름 또는 별칭은 2자 이상 10자 이하로 적어 주십시오.'; return; }
if(/[\/]/.test(nick)||nick==='..'){ err.textContent='이름 또는 별칭에 「/」는 쓸 수 없습니다.'; return; }
if(!reg){ err.textContent='사는 곳을 골라 주십시오.'; return; }
if(!job){ err.textContent='하는 일을 골라 주십시오.'; return; }
if(!sec.length){ err.textContent='관심 섹션을 하나 이상 골라 주십시오.'; return; }
if(!$('#wm-c1').checked||!$('#wm-c2').checked||!$('#wm-c3').checked){ err.textContent='필수 동의 세 가지에 모두 표시해 주십시오.'; return; }
var u=W.user, FV=firebase.firestore.FieldValue, mref=db.collection('members').doc(u.uid), nref=db.collection('nicks').doc(nick), cref=db.collection('meta').doc('counter');
btn.disabled=true; btn.textContent='신청하는 중…';
db.runTransaction(function(tx){
return Promise.all([tx.get(cref),tx.get(nref),tx.get(mref)]).then(function(r){
if(r[2].exists) throw {code:'already'};
if(r[1].exists) throw {code:'nick'};
var n=(r[0].exists?(r[0].data().n||0):0)+1;
var data={no:n,nick:nick,region:reg,job:job,sections:sec,consents:{terms:true,privacy:true,age14:true,news:!!$('#wm-c4').checked,at:null},email:u.email,createdAt:FV.serverTimestamp(),lastLogin:FV.serverTimestamp()};
delete data.consents.at;
tx.set(cref,{n:n}); tx.set(mref,data); tx.set(nref,{uid:u.uid});
return n;
});
}).then(function(n){
return mref.get().then(function(s){ W.member=s.data(); fire(); done(n); });
}).catch(function(e){
btn.disabled=false; btn.textContent='가입 신청';
if(e&&e.code==='nick') err.textContent='「'+nick+'」은(는) 이미 다른 회원이 쓰고 있습니다. 다른 이름 또는 별칭을 적어 주십시오.';
else if(e&&e.code==='already'){ closeAll(); location.reload(); }
else err.textContent='신청이 되지 않았습니다. 잠시 뒤 다시 해 주십시오. 계속 안 되면 weminaimax@weminai.com 으로 알려 주십시오.';
});
}
function done(n){ var m=W.member||{};
var bg=modal('<h2>회원이 되셨습니다</h2><p>'+esc(m.nick)+' 님, 반갑습니다. 회원번호는 <b>'+n+'</b>번입니다.</p>'+
'<p>이제 기사 끝 「위민아이(Wemin-AI) 요약 보기」를 누르시면 핵심 다섯 줄을 보실 수 있습니다.</p>'+
'<p style="font-size:14px;color:#555">후원해 주실 분은 거래 은행 앱에서 직접 자동이체를 걸어 주시고, 받는 분 통장 표시에 이름과 회원번호('+n+')를 함께 적어 주십시오. <a href="/news/member.html">후원 안내</a></p>'+
'<div class="row"><button type="button" class="pri" id="wm-ok">확인</button></div>');
bg.querySelector('#wm-ok').onclick=closeAll;
}
function fmt(t){ try{ var d=t.toDate(); return d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일'; }catch(e){ return ''; } }
function openMine(){ var m=W.member, u=W.user; if(!u) return; if(!m){ openForm(); return; }
var bg=modal('<h2>내 정보</h2><table>'+
'<tr><td>회원번호</td><td>'+esc(m.no)+'</td></tr>'+
'<tr><td>이름·별칭</td><td>'+esc(m.nick)+'</td></tr>'+
'<tr><td>전자우편</td><td>'+esc(m.email)+'</td></tr>'+
'<tr><td>사는 곳</td><td><select id="wm-reg">'+opts(REG)+'</select></td></tr>'+
'<tr><td>하는 일</td><td><select id="wm-job">'+opts(JOB)+'</select></td></tr>'+
'<tr><td>관심 섹션</td><td>'+chips(SEC,'wm-sec')+'</td></tr>'+
'<tr><td>소식 받기</td><td><label><input type="checkbox" id="wm-c4"> 전자우편으로 받기</label></td></tr>'+
'<tr><td>가입한 날</td><td>'+esc(fmt(m.createdAt))+'</td></tr></table>'+
'<p style="font-size:13px;color:#666">이름 또는 별칭은 바꿀 수 없습니다. 바꾸시려면 탈퇴 뒤 다시 가입해 주십시오. <a href="/news/terms.html" target="_blank">이용약관</a> · <a href="/news/privacy.html" target="_blank">개인정보 처리방침</a></p>'+
'<div class="err" id="wm-err"></div>'+
'<div class="row"><button type="button" class="dan" id="wm-leave">탈퇴</button><button type="button" class="sec" id="wm-out">로그아웃</button><button type="button" class="sec" id="wm-x">닫기</button><button type="button" class="pri" id="wm-save">고친 것 저장</button></div>');
var $=function(s){ return bg.querySelector(s); };
$('#wm-reg').value=m.region||''; $('#wm-job').value=m.job||''; $('#wm-c4').checked=!!(m.consents&&m.consents.news);
[].slice.call(bg.querySelectorAll('input[name="wm-sec"]')).forEach(function(x){ x.checked=(m.sections||[]).indexOf(x.value)>=0; });
$('#wm-x').onclick=closeAll; $('#wm-out').onclick=function(){ W.signOut(); };
$('#wm-save').onclick=function(){ var sec=[].slice.call(bg.querySelectorAll('input[name="wm-sec"]:checked')).map(function(x){ return x.value; });
if(!$('#wm-reg').value||!$('#wm-job').value||!sec.length){ $('#wm-err').textContent='사는 곳, 하는 일, 관심 섹션을 모두 골라 주십시오.'; return; }
var c=m.consents||{}; var nc={terms:true,privacy:true,age14:true,news:$('#wm-c4').checked};
db.collection('members').doc(u.uid).update({region:$('#wm-reg').value,job:$('#wm-job').value,sections:sec,consents:nc}).then(function(){ return db.collection('members').doc(u.uid).get(); }).then(function(s){ W.member=s.data(); $('#wm-err').style.color='#1e7d32'; $('#wm-err').textContent='저장했습니다.'; }).catch(function(){ $('#wm-err').textContent='저장하지 못했습니다. 잠시 뒤 다시 해 주십시오.'; }); };
$('#wm-leave').onclick=function(){ leave(); };
}
function leave(){ var u=W.user, m=W.member||{};
if(!window.confirm('탈퇴하시겠습니까?\n\n회원 명단의 정보(회원번호 '+(m.no||'')+', '+(m.nick||'')+')와 로그인 계정이 바로 지워지며 되살릴 수 없습니다.\n후원 자동이체를 걸어 두셨다면 쓰시는 은행 앱에서 직접 해지해 주십시오.')) return;
var b=db.batch(); b.delete(db.collection('members').doc(u.uid)); if(m.nick) b.delete(db.collection('nicks').doc(m.nick));
b.commit().then(function(){ return u.delete().catch(function(e){ if(e&&e.code==='auth/requires-recent-login'){ var p=new firebase.auth.GoogleAuthProvider(); return u.reauthenticateWithPopup(p).then(function(){ return u.delete(); }); } throw e; }); })
.then(function(){ W.member=null; closeAll(); alert('탈퇴했습니다. 그동안 함께해 주셔서 고맙습니다.'); })
.catch(function(){ alert('탈퇴 처리가 다 끝나지 않았습니다. weminaimax@weminai.com 으로 알려 주시면 바로 지워 드립니다.'); auth.signOut(); });
}
W.openForm=openForm; W.openMine=openMine;

function btnCss(){ return 'display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:14px;font-weight:700;color:'+NAVY+';background:#fff;border:1px solid '+NAVY+';border-radius:6px;padding:5px 10px;cursor:pointer;margin-right:6px;vertical-align:middle'; }
function draw(){
var host=null, links=[].slice.call(document.querySelectorAll('a,button'));
for(var i=0;i<links.length;i++){ if(links[i].textContent.trim()==='후원하기' && links[i].getBoundingClientRect().top<300){ host=links[i]; break; } }
var el=document.getElementById('wemin-login');
if(!el){ el=document.createElement('span'); el.id='wemin-login'; if(host&&host.parentNode) host.parentNode.insertBefore(el,host); else { el.style.cssText='position:fixed;top:8px;right:8px;z-index:50'; document.body.appendChild(el); } }
el.innerHTML='';
var u=W.user, b=document.createElement('button'); b.type='button'; b.style.cssText=btnCss();
if(u && W.member){ b.textContent='내 정보'; b.title=(W.member.nick||'')+' (회원번호 '+(W.member.no||'')+')'; b.onclick=openMine; }
else if(u){ b.textContent='가입 신청'; b.title='가입 신청서를 내시면 바로 회원이 됩니다'; b.onclick=openForm; }
else { b.textContent='로그인'; b.title='구글 계정으로 로그인'; b.onclick=function(){ W.signIn(); }; }
el.appendChild(b);
}
}catch(e){} })();
