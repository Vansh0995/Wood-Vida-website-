/* ============================================================
   WOOD VIDA — WV-HOME.JS   ("Light On" home, all screens)

   How it works:
   - the story is one tall track with ONE pinned screen (sticky)
   - 6 scenes are stacked inside it; scrolling decides which scene
     is arriving, how far you are inside it, and what animates
   - only transform / opacity / clip-path change (smooth everywhere)
   - no videos: only the current and neighbouring photos load
   - laptops with a mouse also get a soft tilt and a warm light that
     follows the pointer

   Add before </body> in index.html (and remove home-story.js):
   <script src="wv-home.js" defer></script>
   ============================================================ */

(function () {
  'use strict';

  var track = document.getElementById('mh');

  if (!track) return;


  /* ---------- footer links: the old home sections are gone,
     so send those links to their own pages instead ---------- */

  var pageFor = {
    '#about': 'about.html',
    '#collections': 'collection.html',
    '#custom': 'custom.html',
    '#contact': 'contact.html',
    '#our-story': 'our-story.html',
    '#nature-preserved': 'nature-preserved.html'
  };

  document.querySelectorAll('.footer-links a').forEach(function (a) {
    var target = pageFor[a.getAttribute('href')];
    if (target) a.setAttribute('href', target);
  });


  /* ---------- setup ---------- */

  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var FADE = 0.4; /* how long (in screens) one scene takes to spread over the last */

  var stage = track.querySelector('.mh-stage');
  var hudNum = track.querySelector('.mh-num');
  var hudCap = track.querySelector('.mh-cap');
  var hudFill = track.querySelector('.mh-fill');

  var scenes = Array.prototype.map.call(
    track.querySelectorAll('.mh-scene'),
    function (el) {
      return {
        el: el,
        kind: el.dataset.kind || '',
        len: parseFloat(el.dataset.len) || 1,
        label: el.dataset.label || '',
        light: el.hasAttribute('data-light'),
        imgs: Array.prototype.slice.call(el.querySelectorAll('img[data-src]')),
        start: 0,
        on: false,
        copyOn: false
      };
    }
  );

  var last = scenes.length - 1;
  var total = 0;

  scenes.forEach(function (s) {
    s.start = total;
    total += s.len;
  });

  /* track height = every scene + one screen for the pinned view itself */
  track.style.setProperty('--mh-total', (total + 1).toFixed(2));
  track.classList.add('mh-ready');

  var idle = 0; /* the lamp glows a little on its own when the page opens */


  /* ---------- photo loading (only what is near) ---------- */

  var lastActive = -1;

  function loadNear(active) {

    scenes.forEach(function (s, i) {

      if (Math.abs(i - active) > 2) return;

      s.imgs.forEach(function (img) {
        if (!img.getAttribute('src')) img.src = img.dataset.src;
      });
    });
  }


  /* ---------- draw one frame ---------- */

  var raf = 0;

  function render() {

    raf = 0;

    if (!track.offsetHeight) return;

    var unit = stage.offsetHeight || window.innerHeight;
    var y = clamp(-track.getBoundingClientRect().top / unit, 0, total);

    /* how far each scene has spread (0 hidden .. 1 fully covering) */
    var arrived = scenes.map(function (s, i) {
      return i === 0 ? 1 : clamp((y - (s.start - FADE)) / FADE, 0, 1);
    });

    var active = 0;

    arrived.forEach(function (v, i) {
      if (v >= 0.5) active = i;
    });

    scenes.forEach(function (s, i) {

      var covered = i < last && arrived[i + 1] >= 1;
      var visible = arrived[i] > 0 && !covered;

      if (visible !== s.on) {
        s.on = visible;
        s.el.classList.toggle('is-on', visible);
      }

      if (!visible) return;

      var q = clamp((y - s.start) / s.len, 0, 1);
      var io = Math.min(
        i === 0 ? 1 : clamp(q / 0.3, 0, 1),
        i === last ? 1 : clamp((1 - q) / 0.25, 0, 1)
      );
      var st = s.el.style;

      st.setProperty('--in', ease(arrived[i]).toFixed(3));
      st.setProperty('--q', q.toFixed(3));
      st.setProperty('--io', io.toFixed(3));

      /* scene-specific motion */
      if (s.kind === 'lamp') {

        /* the lamp switches on as you scroll */
        var lit = Math.max(idle, ease(clamp(q / 0.6, 0, 1)));
        st.setProperty('--lit', lit.toFixed(3));

      } else if (s.kind === 'hand') {

        /* the workshop photo slides in and straightens */
        st.setProperty('--pe', ease(clamp(q / 0.35, 0, 1)).toFixed(3));

      } else if (s.kind === 'anatomy') {

        /* four callouts appear one after another */
        [0.08, 0.28, 0.48, 0.68].forEach(function (t, k) {
          st.setProperty('--a' + (k + 1), ease(clamp((q - t) / 0.14, 0, 1)).toFixed(3));
        });

      } else if (s.kind === 'dims') {

        /* height, width, base: the measuring lines draw themselves */
        st.setProperty('--d1', ease(clamp((q - 0.05) / 0.35, 0, 1)).toFixed(3));
        st.setProperty('--d2', ease(clamp((q - 0.35) / 0.3, 0, 1)).toFixed(3));
        st.setProperty('--d3', ease(clamp((q - 0.6) / 0.3, 0, 1)).toFixed(3));
      }

      var copyOn = io > 0.6;

      if (copyOn !== s.copyOn) {
        s.copyOn = copyOn;
        s.el.classList.toggle('copy-on', copyOn);
      }
    });

    /* progress strip */
    if (hudFill) hudFill.style.transform = 'scaleX(' + (y / total).toFixed(3) + ')';

    if (active !== lastActive) {

      lastActive = active;

      if (hudNum) hudNum.textContent = pad(active + 1);
      if (hudCap) hudCap.textContent = scenes[active].label;

      stage.classList.toggle('is-light', scenes[active].light);

      loadNear(active);
    }
  }

  function kick() {
    if (!raf) raf = window.requestAnimationFrame(render);
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick, { passive: true });
  window.addEventListener('orientationchange', kick);

  render();


  /* ---------- the switch in the last scene ---------- */

  var toggle = track.querySelector('.mh-switch');

  if (toggle) {

    toggle.addEventListener('click', function () {

      var scene = toggle.closest('.mh-scene');
      var off = scene.classList.toggle('lamp-off');
      var label = toggle.querySelector('span');

      toggle.setAttribute('aria-pressed', off ? 'false' : 'true');
      if (label) label.textContent = off ? 'Lamp off' : 'Lamp on';

      if (navigator.vibrate) navigator.vibrate(12);
    });
  }


  /* ---------- laptop with a mouse: soft tilt + light that follows ---------- */

  var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (hasMouse && !reduceMotion) {

    var cursor = track.querySelector('.mh-cursor');
    var px = 0, py = 0, cx = 0, cy = 0, pointerRaf = 0;

    var applyPointer = function () {

      pointerRaf = 0;

      stage.style.setProperty('--mx', px.toFixed(3));
      stage.style.setProperty('--my', py.toFixed(3));

      if (cursor) cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
    };

    stage.addEventListener('pointermove', function (e) {

      var r = stage.getBoundingClientRect();

      cx = e.clientX - r.left;
      cy = e.clientY - r.top;
      px = (cx / r.width) * 2 - 1;
      py = (cy / r.height) * 2 - 1;

      stage.classList.add('is-pointer');

      if (!pointerRaf) pointerRaf = window.requestAnimationFrame(applyPointer);
    });

    stage.addEventListener('pointerleave', function () {
      stage.classList.remove('is-pointer');
      px = 0;
      py = 0;
      if (!pointerRaf) pointerRaf = window.requestAnimationFrame(applyPointer);
    });
  }


  /* ---------- opening moment: the lamp warms up by itself ---------- */

  function warmUp() {

    if (reduceMotion) {
      idle = 0.6;
      kick();
      return;
    }

    var t0 = performance.now() + 400;

    (function step(now) {

      var t = clamp((now - t0) / 2600, 0, 1);

      idle = 0.36 * ease(t);
      render();

      if (t < 1) window.requestAnimationFrame(step);

    })(performance.now());
  }

  if (document.readyState === 'complete') warmUp();
  else window.addEventListener('load', warmUp, { once: true });

})();
