/**
 * 투썸오더 제안서 - 공통 스크롤 싱크 모듈
 * doc-common.js
 *
 * 사용법:
 *   initScrollSync({
 *     targets: [
 *       { key: 'sectionKey1' },
 *       { key: 'sectionKey2' },
 *       ...
 *     ],
 *     defaultKey: 'sectionKey1',
 *     delayScroll: false,        // true면 초기 스크롤 후 리스너 활성화 (menu-list용)
 *     iframeSelector: '.phone-screen iframe',
 *     sectionSelector: '.doc-content > .doc-section'
 *   });
 */
function initScrollSync(config) {
  var iframeSel = config.iframeSelector || '.phone-screen iframe';
  var sectionSel = config.sectionSelector || '.doc-content > .doc-section';
  var iframe = document.querySelector(iframeSel);
  var targets = config.targets || [];
  var defaultKey = config.defaultKey || (targets[0] && targets[0].key);
  var currentHighlight = null;
  var scrollTimer = null;
  var scrollListenerEnabled = config.delayScroll ? false : true;

  // doc-section 매핑
  var sections = document.querySelectorAll(sectionSel);
  targets.forEach(function(t, i) {
    if (sections[i]) t.el = sections[i];
  });

  function sendHighlight(section) {
    if (section === currentHighlight) return;
    currentHighlight = section;

    targets.forEach(function(t) {
      if (t.el) t.el.classList.remove('active-sync');
    });
    if (section) {
      targets.forEach(function(t) {
        if (t.key === section && t.el) t.el.classList.add('active-sync');
      });
    }

    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({ type: 'highlight', section: section }, '*');
      } catch(e) {}
    }
  }

  function findClosestSection() {
    var viewMid = window.innerHeight / 2;
    var closest = null;
    var closestDist = Infinity;

    targets.forEach(function(t) {
      if (!t.el) return;
      var rect = t.el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var sectionMid = rect.top + rect.height / 2;
      var dist = Math.abs(sectionMid - viewMid);
      if (dist < closestDist) {
        closestDist = dist;
        closest = t.key;
      }
    });

    return closest;
  }

  function onScroll() {
    if (!scrollListenerEnabled) return;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      var found = findClosestSection();
      sendHighlight(found);
    }, 80);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // 초기 로드
  sendHighlight(defaultKey);

  if (config.delayScroll) {
    setTimeout(function() {
      // 기본 키가 첫 번째가 아니면 해당 섹션으로 스크롤
      if (defaultKey !== targets[0].key) {
        targets.forEach(function(t) {
          if (t.key === defaultKey && t.el) {
            t.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
      setTimeout(function() { scrollListenerEnabled = true; }, 800);
    }, 300);
  } else {
    setTimeout(function() {
      var found = findClosestSection();
      sendHighlight(found || defaultKey);
    }, 500);
  }
}
