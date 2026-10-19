/* latest.js — 연구소 1면에는 브리핑 자료만 건다.
   2026-10-16 소장님 지시 「가장 최신에 올리는 콘텐츠가 메인에 배치되게 하세요」
   2026-10-19 소장님 지시 「연구소 메인페이지의 경우 연구소와 관련한 콘텐츠가 올라가게 하세요. 즉 브리핑 자료가」 「항상 브리핑 자료만 올라가게 하라」
   브리핑 = posts.json 의 분야가 「정책브리핑」이거나 묶음 이름에 「브리핑」이 든 글.
   메인 — 가장 최근 브리핑 / 최신 자료 — 그다음 브리핑 다섯 / 아래 묶음판 — 브리핑 묶음별.
   기사(연재)는 뉴스 쪽(/news/)에만 나온다. posts.json 을 못 읽으면 1면 HTML 그대로 보인다(그 HTML도 브리핑만 담는다). */
(function () {
  if (!window.fetch) return;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function md(d) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || ''); return m ? (+m[2]) + '월 ' + (+m[3]) + '일' : ''; }
  function dd(d) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || ''); return m ? m[2] + '.' + m[3] : ''; }
  function isBrief(p) { return p.분야 === '정책브리핑' || /브리핑/.test(String(p.묶음 || '')); }
  fetch('data/posts.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (posts) {
      if (!Array.isArray(posts)) return;
      var list = posts.map(function (p, i) { return { p: p, i: i }; })
        .filter(function (x) { return x.p && x.p.파일 && x.p.제목 && x.p.공개 !== '보류' && isBrief(x.p); })
        .sort(function (a, b) { var da = a.p.날짜 || '', db = b.p.날짜 || ''; return da < db ? 1 : da > db ? -1 : a.i - b.i; })
        .map(function (x) { return x.p; });
      if (!list.length) return;
      var lead = document.querySelector('.top .lead');
      if (lead) {
        var n = list[0];
        var h = '<span class="tag">' + esc(n.묶음 || '정책브리핑') + '</span><h1><a href="' + esc(n.파일) + '">' + esc(n.제목) + '</a></h1>';
        if (n.부제) h += '<p>' + esc(n.부제) + '</p>';
        if (n.리드) h += '<p>' + esc(n.리드) + '</p>';
        if (n.대표그림) h += '<figure class="leadpic"><a href="' + esc(n.파일) + '"><img src="' + esc(n.대표그림) + '" alt="' + esc(n.제목) + '"></a></figure>';
        h += '<div class="by">' + esc(n.바이라인 || '김갑봉 소장') + (md(n.날짜) ? ' · ' + md(n.날짜) : '') + ' · <a href="' + esc(n.파일) + '">글 전문 읽기 →</a></div>';
        lead.innerHTML = h;
      }
      var side = document.querySelector('.top .side ol');
      if (side) {
        side.innerHTML = list.slice(1, 6).map(function (p) {
          return '<li><a href="' + esc(p.파일) + '">' + (p.대표그림 ? '<span class="th"><img src="' + esc(p.대표그림) + '" alt="" loading="lazy"></span>' : '') +
            '<span><span class="sk">' + esc(p.묶음 || '정책브리핑') + '</span><span class="st">' + esc(p.제목) + '</span></span></a></li>';
        }).join('');
      }
      var grps = document.querySelector('main .grps');
      if (grps) {
        var order = [], by = {};
        list.forEach(function (p) { var k = p.묶음 || '정책브리핑'; if (!by[k]) { by[k] = []; order.push(k); } by[k].push(p); });
        grps.innerHTML = order.map(function (k) {
          var a = by[k], b = a[0];
          return '<section class="grp"><div class="gh"><h2>' + esc(k) + '</h2><span class="gd">연구소 브리핑</span><span class="more">' + a.length + '편</span></div>' +
            '<a class="big' + (b.대표그림 ? ' haspic' : '') + '" href="' + esc(b.파일) + '">' + (b.대표그림 ? '<span class="cut"><img src="' + esc(b.대표그림) + '" alt="" loading="lazy"></span>' : '') +
            '<span class="txt"><span class="kick">' + esc(k) + '</span><h4>' + esc(b.제목) + '</h4>' + (b.부제 ? '<p>' + esc(b.부제) + '</p>' : '') + '</span></a>' +
            '<ul class="rows">' + a.slice(1, 6).map(function (p) { return '<li><a href="' + esc(p.파일) + '"><span class="d">' + dd(p.날짜) + '</span><span class="t">' + esc(p.제목) + '</span></a></li>'; }).join('') + '</ul></section>';
        }).join('');
      }
    })
    .catch(function () {});
})();
