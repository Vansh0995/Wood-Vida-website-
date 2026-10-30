/* ============================================================
   WOOD VIDA — FULL-PAGE CINEMATIC BACKGROUND (vanilla JS)
   Scroll position of the WHOLE Home page drives 8 scenes:
   forest > right wood > transport > crafting > polishing >
   packaging > delivery > finished product at home.
   - One passive scroll listener; the animation frame loop runs
     only while the layer is still easing, then stops itself.
   - Only the current and next scene's media is loaded.
   - Videos pause the moment their scene is out of view.
   - Does not touch any of your existing scripts or elements.
   ============================================================ */
(() => {
  'use strict';

  const BLUR_MAX = 4;   // px of blur mid-transition (desktop only). 0 turns blur off.
  const HOLD = 0.9;     // story completes at 90% of the page; the final scene holds to the bottom.

  const root = document.getElementById('wv-cinematic');
  if (!root) return;

  document.body.classList.add('wv-cinematic-on');

  // Reduced motion: leave one still frame (CSS handles it), no scroll animation.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('wv-cinematic-static');
    return;
  }

  const narrow = matchMedia('(max-width: 768px)');
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const scenes = [...root.querySelectorAll('.wv-cinematic-scene')].map(el => {
    const cam = el.querySelector('.wv-cinematic-media');
    const media = cam && cam.querySelector('[data-src]');
    const s = {
      el, cam, media,
      isVideo: !!media && media.tagName === 'VIDEO',
      pan: parseFloat(el.dataset.pan) || 3,   // sideways camera drift in vw
      on: false
    };
    // If a file is missing, drop the element; the scene keeps its earthy base colour.
    if (media) media.addEventListener('error', () => { media.remove(); s.media = null; });
    return s;
  });
  const last = scenes.length - 1;
  const fg = [...root.querySelectorAll('.wv-cinematic-fg i')];

  let target = 0, cur = 0, raf = 0, booted = false, width = innerWidth;

  /* ---------- media loading / playback ---------- */
  const load = s => {
    const m = s && s.media;
    if (!m || m.dataset.loaded || (saveData && s.isVideo)) return;
    m.dataset.loaded = '1';
    if (s.isVideo) { m.muted = true; m.preload = 'auto'; }
    m.src = m.dataset.src;
  };
  const play = s => {
    if (s.isVideo && s.media && s.media.getAttribute('src') && document.visibilityState === 'visible') {
      s.media.play().catch(() => {});
    }
  };
  const setOn = (i, s, on) => {
    s.el.classList.toggle('is-on', on);
    if (!booted) return;
    if (on) { load(s); load(scenes[i + 1]); play(s); }
    else if (s.isVideo && s.media) s.media.pause();
  };

  /* ---------- whole-page scroll progress ---------- */
  const readTarget = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    target = clamp(scrollY / max / HOLD, 0, 1);
  };

  /* ---------- draw one frame ---------- */
  const render = p => {
    const f = p * last;               // 0 .. 7
    const m = narrow.matches;

    scenes.forEach((s, i) => {
      const d = f - i;                // -1 upcoming ... 0 current ... 1 passed
      const ad = Math.abs(d);
      const o = clamp((0.75 - ad) / 0.5, 0, 1);   // cross-fade
      const vis = o > 0.001;

      if (vis !== s.on) { s.on = vis; setOn(i, s, vis); }
      if (!vis) return;

      s.el.style.opacity = o.toFixed(3);

      // camera: slow push-in, sideways drift, gentle depth and tilt
      const x = -d * (m ? s.pan * 0.6 : s.pan);
      const y = -d * 1.5;
      const z = m ? 0 : -ad * 120;
      const rx = m ? 0 : d * 1.2;
      const sc = 1.22 + d * 0.05;
      s.cam.style.transform =
        `translate3d(${x.toFixed(2)}vw,${y.toFixed(2)}vh,${z.toFixed(0)}px) rotateX(${rx.toFixed(2)}deg) scale(${sc.toFixed(3)})`;

      const b = m ? 0 : Math.max(0, ad - 0.25) * 2 * BLUR_MAX;
      s.cam.style.filter = b > 0.2 ? `blur(${b.toFixed(1)}px)` : 'none';
    });

    // foreground light drifts at a different speed than the scenes (parallax depth)
    if (fg[0]) fg[0].style.transform = `translate3d(${(-p * 10).toFixed(2)}vw,${(-p * 40).toFixed(1)}vh,0)`;
    if (fg[1]) fg[1].style.transform = `translate3d(${(p * 8).toFixed(2)}vw,${(p * 30).toFixed(1)}vh,0)`;
  };

  /* ---------- easing loop: stops itself when settled ---------- */
  const tick = () => {
    const diff = target - cur;
    cur = Math.abs(diff) < 0.0004 ? target : cur + diff * 0.1;
    render(cur);
    raf = cur === target ? 0 : requestAnimationFrame(tick);
  };
  const kick = () => {
    readTarget();
    if (!raf) raf = requestAnimationFrame(tick);
  };

  /* ---------- start ---------- */
  readTarget();
  cur = target;
  render(cur);

  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', () => {
    if (innerWidth !== width) { width = innerWidth; kick(); }   // ignore mobile toolbar height changes
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    scenes.forEach(s => {
      if (!s.isVideo || !s.media) return;
      if (document.visibilityState === 'hidden') s.media.pause();
      else if (s.on) play(s);
    });
  });

  // Media starts loading only after the page has finished loading.
  const boot = () => {
    booted = true;
    kick();   // page height is final now; re-sync progress
    scenes.forEach((s, i) => s.on && setOn(i, s, true));
  };
  if (document.readyState === 'complete') boot();
  else addEventListener('load', boot, { once: true });
})();