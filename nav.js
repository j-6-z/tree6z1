/* ============================================================
   tree6z — nav.js
   Drop <div id="site-nav"></div> near the top of any page,
   then load this file before </body>:  <script src="nav.js"></script>
   Self-contained: injects its own styles + the floating call bubble.
   Change the phone number in ONE place below.
   ============================================================ */
(function () {
  // ── the ONLY place the phone number lives ──
  var PHONE = '3062802167';
  var PHONE_TEL = '+1' + PHONE;
  var PHONE_DISP = '(' + PHONE.slice(0, 3) + ') ' + PHONE.slice(3, 6) + '-' + PHONE.slice(6);
  // Your logo lives at public/tree6z-logo1.jpg in the project.
  // The nav tries the most likely web URLs in order, then falls back to a
  // clean "tree6z" text wordmark — so it works no matter how the host maps it.
  var LOGO_SRC = '/public/tree6z-logo1.jpg';   // static deploy (project root = web root)
  var LOGO_SRC_ALT = '/tree6z-logo1.jpg';      // framework deploy (public served at root)

  var css = `
  :root{
    --paper:#f3eee2;--paper-2:#e9e2d2;
    --ink:#181816;--ink-soft:#3a3a35;--ink-mute:#7a766b;
    --rule:rgba(24,24,22,0.12);--rule-soft:rgba(24,24,22,0.06);
    --moss:#2d4a2b;--moss-deep:#1f361e;--moss-light:#a8d3a4;--moss-glow:#7ec77a;
    --d:'Archivo Black',Impact,sans-serif;--s:'Fraunces',Georgia,serif;--m:'JetBrains Mono',ui-monospace,monospace;
    --ease:cubic-bezier(0.2,0.7,0.2,1);
  }
  .t6-nav{position:sticky;top:0;z-index:40;background:var(--paper);border-bottom:1px solid var(--rule);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:1rem;padding:0.85rem 1.5rem}
  .t6-logo{justify-self:start;display:flex;align-items:center;gap:0.5rem;text-decoration:none}
  .t6-logo-img{height:38px;width:auto;display:block}
  .t6-logo-txt{display:flex;align-items:baseline;gap:0.5rem}
  .t6-logo-txt b{font-family:var(--d);font-weight:400;font-size:1.4rem;letter-spacing:-0.02em;color:var(--ink);text-transform:lowercase}
  .t6-logo-txt i{font-family:var(--m);font-style:normal;font-size:0.56rem;letter-spacing:0.14em;color:var(--ink-mute);text-transform:uppercase}
  .t6-links{justify-self:center;display:flex;gap:0.2rem}
  .t6-links a{font-family:var(--m);font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-soft);text-decoration:none;padding:0.5rem 0.8rem;border-radius:2px;transition:background 0.2s,color 0.2s}
  .t6-links a:hover,.t6-links a.active{background:var(--ink);color:var(--paper)}
  .t6-right{justify-self:end;display:flex;align-items:center;gap:0.75rem}
  .t6-callcta{display:inline-flex;align-items:center;gap:0.45rem;font-family:var(--m);font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;background:var(--moss);color:var(--paper);text-decoration:none;padding:0.6rem 0.95rem;border-radius:2px;transition:background 0.2s}
  .t6-callcta:hover{background:var(--moss-deep)}
  .t6-callcta svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2}
  .t6-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:8px;min-width:44px;min-height:44px;align-items:center;justify-content:center;cursor:pointer;-webkit-tap-highlight-color:transparent}
  .t6-burger i{display:block;width:22px;height:2px;background:var(--ink);transition:all 0.3s var(--ease)}
  .t6-burger.on i:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
  .t6-burger.on i:nth-child(2){opacity:0}
  .t6-burger.on i:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
  .t6-drawer{position:fixed;inset:0;z-index:80;background:var(--paper);transform:translateX(100%);transition:transform 0.4s var(--ease);display:flex;flex-direction:column;padding:5rem 2rem 3rem;overflow-y:auto}
  .t6-drawer.on{transform:translateX(0)}
  .t6-drawer a.dl{font-family:var(--d);font-size:clamp(2rem,8vw,3rem);letter-spacing:-0.02em;text-transform:uppercase;color:var(--ink);text-decoration:none;padding:0.5rem 0;border-bottom:1px solid var(--rule-soft);transition:color 0.2s,padding-left 0.2s}
  .t6-drawer a.dl:hover,.t6-drawer a.dl.active{color:var(--moss);padding-left:0.4rem}
  .t6-dfoot{margin-top:auto;padding-top:2rem;border-top:1px solid var(--rule)}
  .t6-dfoot a{display:block;font-family:var(--m);font-size:0.78rem;color:var(--ink-soft);text-decoration:none;padding:0.4rem 0;letter-spacing:0.06em}
  .t6-bubble{position:fixed;bottom:max(1.1rem,env(safe-area-inset-bottom,1.1rem));right:1.1rem;z-index:60;display:flex;align-items:center;gap:0.55rem;background:var(--moss);color:var(--paper);text-decoration:none;padding:0.8rem 1.2rem;border-radius:100px;font-family:var(--m);font-size:0.76rem;letter-spacing:0.1em;text-transform:uppercase;box-shadow:0 8px 24px rgba(24,24,22,0.28);transition:transform 0.2s,background 0.2s;-webkit-tap-highlight-color:transparent}
  .t6-bubble:hover{transform:scale(1.03);background:var(--moss-deep)}
  .t6-bubble svg{width:14px;height:14px;fill:currentColor;stroke:none}
  .t6-bubble.gone{opacity:0;visibility:hidden;pointer-events:none}
  @media(max-width:820px){
    .t6-links,.t6-callcta{display:none}
    .t6-burger{display:flex}
    .t6-nav{padding:0.8rem 1rem}
    .t6-logo-img{height:32px}
    .t6-bubble{left:50%;right:auto;transform:translateX(-50%)}
    .t6-bubble:hover{transform:translateX(-50%) scale(1.03)}
  }
  @media(prefers-reduced-motion:reduce){*{transition-duration:0.001ms!important}}`;

  var phoneIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>';

  var links = [
    { href: '/#svc-lawn', label: 'Lawn' },
    { href: '/#svc-leaf', label: 'Leaf' },
    { href: '/#svc-spring', label: 'Spring' },
    { href: '/#svc-snow', label: 'Snow' },
    { href: '/#contact', label: 'Quote' }
  ];

  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function navLinks(cls) {
    return links.map(function (l) {
      var file = l.href.split('#')[0];
      var active = (file === here || (here === '' && file === 'index.html')) && l.label !== 'Quote' ? ' active' : '';
      return '<a class="' + cls + active + '" href="' + l.href + '">' + l.label + '</a>';
    }).join('');
  }

  var html =
    '<nav class="t6-nav">' +
      '<a class="t6-logo" href="/" aria-label="tree6z — home">' +
      '<img class="t6-logo-img" src="' + LOGO_SRC + '" alt="tree6z" data-alt="' + LOGO_SRC_ALT + '" ' +
        'onerror="var a=this.getAttribute(\'data-alt\');if(a){this.removeAttribute(\'data-alt\');this.src=a;}else{this.style.display=\'none\';var t=this.parentNode.querySelector(\'.t6-logo-txt\');if(t)t.style.display=\'flex\';}">' +
      '<span class="t6-logo-txt" style="display:none"><b>tree6z</b><i>est. saskatoon</i></span>' +
    '</a>' +
      '<div class="t6-links">' + navLinks('') + '</div>' +
      '<div class="t6-right">' +
        '<a class="t6-callcta" href="tel:' + PHONE_TEL + '">' + phoneIcon + 'Call ' + PHONE_DISP + '</a>' +
        '<button class="t6-burger" id="t6burger" aria-label="Menu" aria-expanded="false" aria-controls="t6drawer"><i></i><i></i><i></i></button>' +
      '</div>' +
    '</nav>' +
    '<div class="t6-drawer" id="t6drawer" aria-hidden="true">' +
      '<a class="dl" href="/">Home</a>' +
      '<a class="dl" href="/#svc-lawn">Lawn Care</a>' +
      '<a class="dl" href="/#svc-leaf">Leaf Removal</a>' +
      '<a class="dl" href="/#svc-spring">Spring Cleanup</a>' +
      '<a class="dl" href="/#svc-snow">Snow Removal</a>' +
      '<a class="dl" href="/#contact">Get a Quote</a>' +
      '<div class="t6-dfoot">' +
        '<a href="tel:' + PHONE_TEL + '">' + PHONE_DISP + '</a>' +
        '<a href="mailto:tree6zlandscaping@gmail.com">tree6zlandscaping@gmail.com</a>' +
      '</div>' +
    '</div>' +
    '<a class="t6-bubble" id="t6bubble" href="tel:' + PHONE_TEL + '" aria-label="Call tree6z now">' + phoneIcon.replace('aria-hidden="true"', 'aria-hidden="true" style="fill:currentColor;stroke:none"') + 'Call now</a>';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var mount = document.getElementById('site-nav') || (function () {
    var d = document.createElement('div'); d.id = 'site-nav';
    document.body.insertBefore(d, document.body.firstChild); return d;
  })();
  mount.innerHTML = html;

  // position:sticky silently breaks if <html>/<body> uses overflow-x:hidden
  // (it becomes a scroll container). Swap hidden→clip so the nav can stick.
  [document.documentElement, document.body].forEach(function (el) {
    try { if (getComputedStyle(el).overflowX === 'hidden') el.style.overflowX = 'clip'; } catch (e) {}
  });

  // ── interactions ──
  var open = false;
  var drawer = document.getElementById('t6drawer');
  var burger = document.getElementById('t6burger');
  var bubble = document.getElementById('t6bubble');

  function toggle(force) {
    open = (typeof force === 'boolean') ? force : !open;
    drawer.classList.toggle('on', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (bubble) bubble.classList.toggle('gone', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { toggle(); });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { toggle(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) toggle(false); });

  // hide bubble when footer is on screen
  window.addEventListener('scroll', function () {
    if (!bubble) return;
    var ftr = document.querySelector('#site-footer, footer');
    if (!ftr) return;
    var r = ftr.getBoundingClientRect();
    if (r.top < window.innerHeight - 40) bubble.classList.add('gone');
    else if (!open) bubble.classList.remove('gone');
  }, { passive: true });
})();