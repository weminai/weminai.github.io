/* AI경제저널 회원 로그인(구글) — 2026-11-09 소장님 「로그인 제도가 필요하다」 「구글이 좋다」 「그전엔 일단 로그인제도만 운영하고」
   파이어베이스 인증(프로젝트 ai-economy-journal, 연구소 계정 weminaimax@weminai.com). 아래 설정값은 공개용이라 누리집에 두어도 된다
   받는 정보: 구글이 넘겨주는 이름·이메일·프로필 사진뿐. 회원 정보를 따로 저장하지 않는다(창간 전) */
(function(){ try{
  var CFG={apiKey:"AIzaSyDAmnIKsRZ9UbU4i_l15VvNYHCpxGlD-sc",authDomain:"ai-economy-journal.firebaseapp.com",projectId:"ai-economy-journal",storageBucket:"ai-economy-journal.firebasestorage.app",messagingSenderId:"1018126089787",appId:"1:1018126089787:web:859852a1d25ebe499f661e"};
  var V='10.12.2';
  var W=window.weminAuth=window.weminAuth||{user:null,listeners:[]};
  W.on=function(f){ W.listeners.push(f); if(W.inited){ try{f(W.user);}catch(e){} } };
  function load(src){ return new Promise(function(res,rej){ var s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
  W.ready=load('https://www.gstatic.com/firebasejs/'+V+'/firebase-app-compat.js').then(function(){ return load('https://www.gstatic.com/firebasejs/'+V+'/firebase-auth-compat.js'); }).then(function(){
    if(!firebase.apps.length) firebase.initializeApp(CFG);
    var auth=firebase.auth(); auth.languageCode='ko';
    W.signIn=function(){ var p=new firebase.auth.GoogleAuthProvider(); p.setCustomParameters({prompt:'select_account'}); return auth.signInWithPopup(p).catch(function(e){ if(e && (e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment')) return auth.signInWithRedirect(p); }); };
    W.signOut=function(){ return auth.signOut(); };
    auth.onAuthStateChanged(function(u){ W.user=u; W.inited=true; draw(); W.listeners.forEach(function(f){ try{f(u);}catch(e){} }); try{ window.dispatchEvent(new CustomEvent('wemin-auth')); }catch(e){} });
  }).catch(function(){});
  function btnCss(){ return 'display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:14px;font-weight:700;color:#17428F;background:#fff;border:1px solid #17428F;border-radius:6px;padding:5px 10px;cursor:pointer;margin-right:6px;vertical-align:middle'; }
  function draw(){
    var host=null, links=[].slice.call(document.querySelectorAll('a,button'));
    for(var i=0;i<links.length;i++){ if(links[i].textContent.trim()==='후원하기' && links[i].getBoundingClientRect().top<300){ host=links[i]; break; } }
    var el=document.getElementById('wemin-login');
    if(!el){ el=document.createElement('span'); el.id='wemin-login'; if(host&&host.parentNode) host.parentNode.insertBefore(el,host); else { el.style.cssText='position:fixed;top:8px;right:8px;z-index:50'; document.body.appendChild(el); } }
    el.innerHTML='';
    var u=W.user, b=document.createElement('button'); b.type='button'; b.style.cssText=btnCss();
    if(u){
      if(u.photoURL){ var im=document.createElement('img'); im.src=u.photoURL; im.alt=''; im.width=20; im.height=20; im.referrerPolicy='no-referrer'; im.style.cssText='border-radius:50%'; b.appendChild(im); }
      b.appendChild(document.createTextNode('로그아웃')); b.title=(u.displayName||'')+' '+(u.email||''); b.onclick=function(){ W.signOut(); };
    } else {
      b.appendChild(document.createTextNode('로그인')); b.title='구글 계정으로 로그인'; b.onclick=function(){ W.signIn(); };
    }
    el.appendChild(b);
  }
}catch(e){} })();
