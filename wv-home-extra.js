/* Home-only scroll reveal and subtle desktop mouse effects. */
(function () {
  'use strict';
  var section = document.querySelector('.wvh-story');
  if (!section) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = section.querySelectorAll('.wvh-reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('wvh-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (item) { observer.observe(item); });
  } else {
    items.forEach(function (item) { item.classList.add('wvh-visible'); });
  }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    var raf = 0, x = 0, y = 0;
    section.addEventListener('pointermove', function (event) {
      var rect = section.getBoundingClientRect();
      x = event.clientX - rect.left; y = event.clientY - rect.top;
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        section.style.setProperty('--wvh-x', x + 'px');
        section.style.setProperty('--wvh-y', y + 'px');
        section.classList.add('wvh-pointer-active'); raf = 0;
      });
    }, { passive: true });
    section.addEventListener('pointerleave', function () { section.classList.remove('wvh-pointer-active'); }, { passive: true });
    var tilt = section.querySelector('[data-wvh-tilt]');
    if (tilt) {
      tilt.addEventListener('pointermove', function (event) {
        var rect = tilt.getBoundingClientRect();
        var nx = (event.clientX - rect.left) / rect.width - .5;
        var ny = (event.clientY - rect.top) / rect.height - .5;
        tilt.style.transform = 'perspective(900px) rotateY(' + (nx * 2.4).toFixed(2) + 'deg) rotateX(' + (-ny * 2.4).toFixed(2) + 'deg)';
      });
      tilt.addEventListener('pointerleave', function () { tilt.style.transform = ''; });
    }
  }
})();
