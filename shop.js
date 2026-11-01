/* ============================================================
   WOOD VIDA — SHOP.JS
   Collection + Premium Product Page
   ============================================================ */

(() => {
  'use strict';

  const CATS = window.WV_CATEGORIES || {};
  const SLOTS = window.WV_GRID_SLOTS || {};
  const PRODUCTS = window.WV_PRODUCTS || [];
  const WA = window.WV_WHATSAPP || '917309990055';

  const COLS = 5;
  const CART_KEY = 'woodVidaCart';

  /* ============================================================
     HELPERS
     ============================================================ */

  const esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c])
    );

  const isLive = (p) => !p.soon;

  const catOf = (p) =>
    CATS[p.category] || {
      label: '',
      single: '',
      line: ''
    };

  const priceText = (p) =>
    p.price
      ? '₹' + Number(p.price).toLocaleString('en-IN')
      : 'Price on request';

  const waLink = (p) =>
    'https://wa.me/' +
    WA +
    '?text=' +
    encodeURIComponent(
      "Hello WOOD VIDA, I'm interested in " + p.name + '.'
    );

  const readCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  };

  const syncCartCount = () => {
    const el = document.getElementById('cart-count');

    if (el) {
      el.textContent = readCart().length;
    }
  };

  /* ============================================================
     WHATSAPP ICON
     ============================================================ */

  const WA_ICON = `
    <span class="whatsapp-enquiry-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.2a9.8 9.8 0 0 0-8.47 14.72L2 21.8l5.02-1.48A9.8 9.8 0 1 0 12 2.2zm0 17.8a8 8 0 0 1-4.06-1.1l-.29-.17-2.98.88.89-2.91-.19-.3A8 8 0 1 1 12 20zm4.42-5.96c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"
        />
      </svg>
    </span>
  `;

  /* ============================================================
     PRODUCT CARD
     ============================================================ */

  const cardHTML = (p, i) => {
    const delay =
      'style="--i:' + Math.min(i, 12) + '"';

    if (p.soon) {
      return `
        <div class="cl-card cl-soon" ${delay}>
          <span class="cl-soon-media">
            <em>Coming soon</em>
          </span>

          ${
            p.name
              ? `
                <span class="cl-card-info">
                  <span class="cl-card-cat">
                    ${esc(catOf(p).single)}
                  </span>

                  <span class="cl-card-name">
                    ${esc(p.name)}
                  </span>
                </span>
              `
              : ''
          }
        </div>
      `;
    }

    return `
      <a
        class="cl-card"
        href="product.html?id=${encodeURIComponent(p.id)}"
        ${delay}
      >

        <span class="cl-card-media">

          <img
            src="${esc(p.image)}"
            alt="${esc(p.name)}"
            loading="fast"
            decoding="async"
          >

          <span class="cl-badge">
            One of one
          </span>

          <span class="cl-view">
            View piece
          </span>

        </span>

        <span class="cl-card-info">

          <span class="cl-card-cat">
            ${esc(catOf(p).single)}
          </span>

          <span class="cl-card-name">
            ${esc(p.name)}
          </span>

          <span class="cl-card-price">
            ${esc(priceText(p))}
          </span>

        </span>

      </a>
    `;
  };

  const fillerHTML = (i) =>
    cardHTML(
      {
        soon: true
      },
      i
    );

  /* ============================================================
     COLLECTION PAGE
     ============================================================ */

  function initCollection(grid) {
    const tabs = [
      ...document.querySelectorAll('[data-category]')
    ];

    const search =
      document.getElementById('site-search-input');

    const titleEl =
      document.getElementById('cl-title');

    const eyebrowEl =
      document.getElementById('cl-eyebrow');

    const lineEl =
      document.getElementById('cl-line');

    const metaEl =
      document.getElementById('cl-meta');

    const emptyEl =
      document.getElementById('cl-empty');

    const base =
      location.pathname.split('/').pop() ||
      'collection.html';

    const defaultLine =
      'Every piece is different because every piece begins with wood that nature shaped first.';

    let tab = 'all';
    let q = '';

    const fromUrl = () => {
      const c =
        new URLSearchParams(location.search)
          .get('category');

      return c && CATS[c]
        ? c
        : 'all';
    };

    /* Live product counts */

    tabs.forEach((a) => {
      const c = a.dataset.category;

      const n = PRODUCTS.filter(
        (p) =>
          isLive(p) &&
          (c === 'all' || p.category === c)
      ).length;

      const small =
        a.querySelector('small');

      if (small) {
        small.textContent = n;
      }
    });

    const setHeading = (liveCount) => {
      if (tab === 'all') {
        titleEl.innerHTML =
          'The <em>Collection</em>';

        eyebrowEl.textContent =
          'All pieces';

        lineEl.textContent =
          defaultLine;

        document.title =
          'Collection — WOOD VIDA';
      } else {
        const label =
          CATS[tab].label;

        const words =
          label.split(' ');

        const last =
          words.pop();

        titleEl.innerHTML =
          (words.length
            ? esc(words.join(' ')) + ' '
            : '') +
          '<em>' +
          esc(last) +
          '</em>';

        eyebrowEl.textContent =
          'The collection';

        lineEl.textContent =
          CATS[tab].line;

        document.title =
          label +
          ' — WOOD VIDA';
      }

      metaEl.textContent =
        liveCount +
        (liveCount === 1
          ? ' piece'
          : ' pieces') +
        ' available';
    };

    const render = () => {
      const items =
        PRODUCTS.filter(
          (p) =>
            tab === 'all' ||
            p.category === tab
        );

      const liveCount =
        items.filter(isLive).length;

      let html = '';
      let showEmpty = false;

      if (q) {
        const hits =
          items.filter(
            (p) =>
              isLive(p) &&
              (
                p.name +
                ' ' +
                (p.description || '') +
                ' ' +
                catOf(p).label
              )
                .toLowerCase()
                .includes(q)
          );

        html =
          hits.map(cardHTML).join('');

        showEmpty =
          hits.length === 0;
      } else {
        const slots =
          Math.max(
            SLOTS[tab] || 15,
            Math.ceil(
              items.length / COLS
            ) * COLS
          );

        html =
          items.map(cardHTML).join('');

        for (
          let k = items.length;
          k < slots;
          k++
        ) {
          html += fillerHTML(k);
        }
      }

      grid.innerHTML = html;

      emptyEl.hidden =
        !showEmpty;

      setHeading(liveCount);

      tabs.forEach((a) => {
        const on =
          a.dataset.category === tab;

        a.classList.toggle(
          'active',
          on
        );

        if (on) {
          a.setAttribute(
            'aria-current',
            'page'
          );
        } else {
          a.removeAttribute(
            'aria-current'
          );
        }
      });
    };

    tabs.forEach((a) => {
      a.addEventListener(
        'click',
        (e) => {
          e.preventDefault();

          tab =
            a.dataset.category;

          history.pushState(
            {},
            '',
            tab === 'all'
              ? base
              : base +
                '?category=' +
                tab
          );

          render();
        }
      );
    });

    window.addEventListener(
      'popstate',
      () => {
        tab = fromUrl();
        render();
      }
    );

    if (search) {
      search.addEventListener(
        'input',
        () => {
          q =
            search.value
              .trim()
              .toLowerCase();

          render();
        }
      );

      search.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }
      );
    }

    tab = fromUrl();

    render();
  }

  /* ============================================================
     PRODUCT PAGE
     ============================================================ */

  function initProduct(root) {
    const id =
      new URLSearchParams(
        location.search
      ).get('id');

    const p =
      PRODUCTS.find(
        (x) =>
          String(x.id) ===
          String(id)
      );

    const crumbs =
      document.getElementById(
        'pd-crumbs'
      );

    const relatedWrap =
      document.getElementById(
        'pd-related-wrap'
      );

    /* ----------------------------------------------------------
       PRODUCT NOT FOUND
       ---------------------------------------------------------- */

    if (!p || p.soon) {
      root.innerHTML = `
        <div class="pd-missing">

          <p class="cl-eyebrow">
            ${p ? 'Coming soon' : 'Not found'}
          </p>

          <h1 class="cl-title">
            ${
              p
                ? 'This piece is <em>coming soon.</em>'
                : 'We could not find <em>this piece.</em>'
            }
          </h1>

          <a
            class="button"
            href="collection.html"
          >
            Back to the collection
          </a>

        </div>
      `;

      if (relatedWrap) {
        relatedWrap.hidden = true;
      }

      return;
    }

    /* ----------------------------------------------------------
       PRODUCT DATA
       ---------------------------------------------------------- */

    const cat =
      catOf(p);

    const images =
      p.images &&
      p.images.length
        ? p.images
        : [p.image];

    const dims =
      p.dimensions &&
      (
        p.dimensions.width ||
        p.dimensions.height ||
        p.dimensions.depth
      )
        ? p.dimensions
        : null;

    const dimLine = (cm) =>
      cm +
      ' cm · ' +
      (cm / 2.54).toFixed(1) +
      ' in';

    const sizeRows = dims
      ? [
          ['Width', 'width'],
          ['Height', 'height'],
          ['Depth', 'depth']
        ]
          .filter(
            (r) =>
              dims[r[1]]
          )
          .map(
            (r) => [
              r[0],
              dimLine(
                dims[r[1]]
              )
            ]
          )
      : [];

    if (dims && p.weight) {
      sizeRows.push([
        'Weight',
        p.weight + ' kg'
      ]);
    }

    /* ----------------------------------------------------------
       PAGE TITLE
       ---------------------------------------------------------- */

    document.title =
      p.name +
      ' — WOOD VIDA';

    /* ----------------------------------------------------------
       BREADCRUMB
       ---------------------------------------------------------- */

    if (crumbs) {
      crumbs.innerHTML = `
        <a href="collection.html">
          Collection
        </a>

        /

        <a href="collection.html?category=${encodeURIComponent(
          p.category
        )}">
          ${esc(cat.label)}
        </a>

        /

        <span>
          ${esc(p.name)}
        </span>
      `;
    }

    /* ----------------------------------------------------------
       SPECIFICATIONS
       ---------------------------------------------------------- */

    const specs = [
      [
        'Category',
        cat.label
      ],

      [
        'Edition',
        'One of one'
      ],

      [
        'Material',
        p.wood ||
          'Naturally fallen wood'
      ]
    ];

    if (p.finish) {
      specs.push([
        'Finish',
        p.finish
      ]);
    }

    if (!dims && p.size) {
      specs.push([
        'Size',
        p.size
      ]);
    }

    if (p.availability) {
      specs.push([
        'Availability',
        p.availability
      ]);
    }

    /* ----------------------------------------------------------
       PRODUCT FEATURES
       ---------------------------------------------------------- */

    const featuresHTML =
      p.features &&
      p.features.length
        ? `
          <section class="pd-section">

            <p class="cl-eyebrow">
              Details
            </p>

            <h2 class="pd-sub">
              Key features
            </h2>

            <ul class="pd-features">
              ${p.features
                .map(
                  (feature) => `
                    <li>
                      <span class="pd-feature-mark">
                        +
                      </span>

                      <span>
                        ${esc(feature)}
                      </span>
                    </li>
                  `
                )
                .join('')}
            </ul>

          </section>
        `
        : '';

    /* ----------------------------------------------------------
       STORY
       ---------------------------------------------------------- */

    const storyHTML =
      p.story
        ? `
          <section class="pd-section">

            <p class="cl-eyebrow">
              The piece
            </p>

            <h2 class="pd-sub">
              The story behind it
            </h2>

            <p class="pd-text">
              ${esc(p.story)}
            </p>

          </section>
        `
        : '';

    /* ----------------------------------------------------------
       CARE
       ---------------------------------------------------------- */

    const careHTML =
      p.care
        ? `
          <section class="pd-section">

            <p class="cl-eyebrow">
              Care
            </p>

            <h2 class="pd-sub">
              Looking after your piece
            </h2>

            <p class="pd-text">
              ${esc(p.care)}
            </p>

          </section>
        `
        : '';

    /* ----------------------------------------------------------
       SHIPPING + WARRANTY
       ---------------------------------------------------------- */

    const serviceHTML =
      p.shipping ||
      p.warranty
        ? `
          <section class="pd-section">

            <p class="cl-eyebrow">
              Before you order
            </p>

            ${
              p.shipping
                ? `
                  <div class="pd-info-block">

                    <h3>
                      Shipping
                    </h3>

                    <p>
                      ${esc(p.shipping)}
                    </p>

                  </div>
                `
                : ''
            }

            ${
              p.warranty
                ? `
                  <div class="pd-info-block">

                    <h3>
                      Warranty
                    </h3>

                    <p>
                      ${esc(p.warranty)}
                    </p>

                  </div>
                `
                : ''
            }

          </section>
        `
        : '';

    /* ----------------------------------------------------------
       DIMENSIONS
       ---------------------------------------------------------- */

    const dimensionsHTML =
      sizeRows.length
        ? `
          <section class="pd-section">

            <p class="cl-eyebrow">
              Measurements
            </p>

            <h2 class="pd-sub">
              Size specifications
            </h2>

            <dl class="pd-specs">

              ${sizeRows
                .map(
                  (r) => `
                    <div class="pd-spec">

                      <dt>
                        ${esc(r[0])}
                      </dt>

                      <dd>
                        ${esc(r[1])}
                      </dd>

                    </div>
                  `
                )
                .join('')}

            </dl>

          </section>
        `
        : '';

    /* ==========================================================
       PRODUCT HTML
       ========================================================== */

    root.innerHTML = `

      <!-- ================================================
           PRODUCT GALLERY
      ================================================= -->

      <div class="pd-gallery">

        <div
          class="pd-main pd-stage"
          id="pd-stage"
        >

          <img
            id="pd-main-img"
            src="${esc(images[0])}"
            alt="${esc(p.name)}"
          >

          <div
            class="pd-3d"
            id="pd-3d"
            hidden
          ></div>

        </div>


        ${
          images.length > 1
            ? `
              <div class="pd-thumbs">

                ${images
                  .map(
                    (src, i) => `
                      <button
                        type="button"
                        class="pd-thumb ${
                          i === 0
                            ? 'active'
                            : ''
                        }"
                        data-src="${esc(
                          src
                        )}"
                        aria-label="Photo ${
                          i + 1
                        }"
                      >

                        <img
                          src="${esc(
                            src
                          )}"
                          alt=""
                        >

                      </button>
                    `
                  )
                  .join('')}

              </div>
            `
            : ''
        }

      </div>


      <!-- ================================================
           PRODUCT INFORMATION
      ================================================= -->

      <div class="pd-info">

        <p class="cl-eyebrow">
          ${esc(cat.single)}
          · One of one
        </p>


        <h1 class="pd-title">
          ${esc(p.name)}
        </h1>


        <p class="pd-price">
          ${esc(priceText(p))}
        </p>


        ${
          p.availability
            ? `
              <p class="pd-availability">
                ${esc(
                  p.availability
                )}
              </p>
            `
            : ''
        }


        <p class="pd-text">
          ${esc(
            p.description || ''
          )}
        </p>


        <p class="pd-text">
          Every piece is different because every piece begins with wood that nature shaped first.
        </p>


        <!-- PRODUCT SPECS -->

        <dl class="pd-specs">

          ${specs
            .map(
              (s) => `
                <div class="pd-spec">

                  <dt>
                    ${esc(s[0])}
                  </dt>

                  <dd>
                    ${esc(s[1])}
                  </dd>

                </div>
              `
            )
            .join('')}

        </dl>


        <!-- ACTIONS -->

        <div class="pd-actions">

          <button
            type="button"
            class="button"
            id="pd-cart"
          >
            Add to cart
          </button>


          <a
            class="whatsapp-enquiry-button"
            href="${waLink(p)}"
            target="_blank"
            rel="noopener noreferrer"
          >

            ${WA_ICON}

            <span>
              Enquiry on WhatsApp
            </span>

          </a>

        </div>


        <p
          class="pd-note"
          id="pd-note"
        ></p>


        <!-- EXTRA INFORMATION -->

        <div class="pd-details">

          ${featuresHTML}

          ${dimensionsHTML}

          ${storyHTML}

          ${careHTML}

          ${serviceHTML}

        </div>

      </div>

    `;

    /* ==========================================================
       IMAGE THUMBNAILS
       ========================================================== */

    const photo =
      document.getElementById(
        'pd-main-img'
      );

    const thumbs = [
      ...root.querySelectorAll(
        '.pd-thumb'
      )
    ];

    thumbs.forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {

          const src =
            btn.dataset.src;

          if (src) {
            photo.src = src;
          }

          thumbs.forEach(
            (b) =>
              b.classList.toggle(
                'active',
                b === btn
              )
          );

        }
      );
    });

    /* ==========================================================
       CART
       ========================================================== */

    const cartBtn =
      document.getElementById(
        'pd-cart'
      );

    const note =
      document.getElementById(
        'pd-note'
      );

    const inCart = () =>
      readCart().some(
        (x) =>
          String(x.id) ===
          String(p.id)
      );

    const paintCart = () => {

      if (!cartBtn) return;

      cartBtn.textContent =
        inCart()
          ? 'View cart'
          : 'Add to cart';

      if (note) {
        note.textContent =
          inCart()
            ? 'This one-of-one piece is in your cart.'
            : '';
      }
    };

    if (cartBtn) {

      cartBtn.addEventListener(
        'click',
        () => {

          if (inCart()) {
            location.href =
              'cart.html';

            return;
          }

          const cart =
            readCart();

          cart.push({
            id: p.id,
            name: p.name,
            category:
              p.category,
            image:
              images[0],
            price:
              p.price || null
          });

          localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
          );

          syncCartCount();

          paintCart();
        }
      );

      paintCart();
    }

    /* ==========================================================
       RELATED PRODUCTS
       ========================================================== */

    const related =
      PRODUCTS.filter(
        (x) =>
          x.category ===
            p.category &&
          isLive(x) &&
          x.id !== p.id
      ).slice(0, COLS);

    const relGrid =
      document.getElementById(
        'pd-related'
      );

    if (
      relGrid &&
      related.length
    ) {

      relGrid.innerHTML =
        related
          .map(cardHTML)
          .join('');

    } else if (
      relatedWrap
    ) {

      relatedWrap.hidden =
        true;
    }
  }

  /* ============================================================
     INITIALIZE
     ============================================================ */

  const grid =
    document.getElementById(
      'cl-grid'
    );

  const productRoot =
    document.getElementById(
      'pd-root'
    );

  if (grid) {
    initCollection(grid);
  }

  if (productRoot) {
    initProduct(productRoot);
  }

  syncCartCount();

})();