/* ============================================================
   WOOD VIDA — NAVBAR.JS
   1. Marks the current page in the bottom navbar
   2. Top navbar hides on scroll down, shows on scroll up
      (smoother on phones: ignores tiny scroll jitter)
   Does NOT transform .site-nav or .nav-inner
   ============================================================ */

(function () {

    /* ---------- 1. ACTIVE PAGE IN BOTTOM NAVBAR ---------- */

    var bottomNav = document.querySelector('.nav-menu');

    if (bottomNav) {

        var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

        /* product pages belong to the Collection tab */
        if (file === 'product.html') file = 'collection.html';

        bottomNav.querySelectorAll('a').forEach(function (link) {

            var href = (link.getAttribute('href') || '')
                .split('?')[0]
                .split('#')[0]
                .toLowerCase();

            if (href === file) {
                link.setAttribute('aria-current', 'page');
            }
        });

        /* on phones the bar scrolls sideways: bring the active tab to the middle */
        window.requestAnimationFrame(function () {

            var active = bottomNav.querySelector('[aria-current="page"]');

            if (active) {
                bottomNav.scrollLeft = Math.max(
                    0,
                    active.offsetLeft - (bottomNav.clientWidth - active.offsetWidth) / 2
                );
            }
        });
    }


    /* ---------- 2. TOP NAVBAR SMART SCROLL ---------- */

    var navbar = document.querySelector('.site-nav');

    if (!navbar) return;

    var lastScrollY = window.scrollY;
    var ticking = false;
    var MIN_MOVE = 8; /* px, ignores small jitter while the finger scrolls */

    function handleNavbarScroll() {

        var currentScrollY = Math.max(0, window.scrollY);

        /* typing in the search box: keep the bar where it is */
        var focused = document.activeElement;

        if (
            focused &&
            focused.tagName === 'INPUT' &&
            navbar.contains(focused)
        ) {
            lastScrollY = currentScrollY;
            ticking = false;
            return;
        }

        /* top of page: always show */
        if (currentScrollY <= 20) {

            navbar.classList.remove('top-nav-hidden');

            lastScrollY = currentScrollY;
            ticking = false;
            return;
        }

        if (Math.abs(currentScrollY - lastScrollY) < MIN_MOVE) {
            ticking = false;
            return;
        }

        /* down = hide, up = show */
        navbar.classList.toggle('top-nav-hidden', currentScrollY > lastScrollY);

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function () {

        if (!ticking) {

            window.requestAnimationFrame(handleNavbarScroll);

            ticking = true;
        }

    }, { passive: true });

})();