/* latest.js — 1면 메인에 가장 최근에 올린 글을 건다.
   2026-10-16 소장님 지시 「가장 최신에 올리는 콘텐츠가 메인에 배치되게 하세요」.
   data/posts.json 에서 날짜가 가장 늦은 글(같은 날이면 목록 앞쪽, 곧 나중에 올린 글)을 고른다.
   1면에 손으로 쓴 메인이 이미 그 글이면 아무것도 바꾸지 않는다.
   다르면 메인을 그 글로 바꾸고, 원래 메인 글을 최신 자료 맨 위로 내린다.
   posts.json 을 못 읽으면 1면 HTML 그대로 보인다. */
(function () {
  var lead = document.querySelector('.top .lead');
  if (!lead || !window.fetch) return;
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function md(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || '');
    return m ? (+m[2]) + '월 ' + (+m[3]) + '일' : '';
  }
  fetch('data/posts.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (posts) {
      if (!Array.isArray(posts) || !posts.length) return;
      var list = posts
        .map(function (p, i) { return { p: p, i: i }; })
        .filter(function (x) { return x.p && x.p.파일 && x.p.제목 && x.p.공개 !== '보류'; })
        .sort(function (a, b) {
          var da = a.p.날짜 || '', db = b.p.날짜 || '';
          return da < db ? 1 : da > db ? -1 : a.i - b.i;
        });
      if (!list.length) return;
      var n = list[0].p;
      var a = lead.querySelector('h1 a');
      var cur = a ? a.getAttribute('href') : '';
      if (cur === n.파일) return;

      /* 원래 메인을 최신 자료 맨 위로 */
      var side = document.querySelector('.top .side ol');
      var oldImg = lead.querySelector('img');
      var oldTag = lead.querySelector('.tag');
      if (side && cur) {
        var dup = side.querySelector('a[href="' + n.파일 + '"]');
        if (dup && dup.closest('li')) dup.closest('li').remove();
        if (!side.querySelector('a[href="' + cur + '"]')) {
          var li = document.createElement('li');
          li.innerHTML = '<a href="' + esc(cur) + '"><span class="th"><img src="' +
            esc(oldImg ? oldImg.getAttribute('src') : '') + '" alt="" loading="lazy"></span><span><span class="sk">' +
            esc(oldTag ? oldTag.textContent : '') + '</span><span class="st">' + esc(a ? a.textContent : '') +
            '</span></span></a>';
          side.insertBefore(li, side.firstChild);
          while (side.children.length > 5) side.removeChild(side.lastChild);
        }
      }

      var h = '<span class="tag">' + esc(n.묶음 || n.분야 || '새 자료') + '</span>' +
        '<h1><a href="' + esc(n.파일) + '">' + esc(n.제목) + '</a></h1>';
      if (n.부제) h += '<p>' + esc(n.부제) + '</p>';
      if (n.리드) h += '<p>' + esc(n.리드) + '</p>';
      if (n.대표그림) h += '<figure class="leadpic"><a href="' + esc(n.파일) + '"><img src="' + esc(n.대표그림) +
        '" alt="' + esc(n.제목) + '"></a></figure>';
      h += '<div class="by">' + esc(n.바이라인 || '김갑봉 소장') + (md(n.날짜) ? ' · ' + md(n.날짜) : '') +
        ' · <a href="' + esc(n.파일) + '">글 전문 읽기 →</a></div>';
      lead.innerHTML = h;
    })
    .catch(function () {});
})();
