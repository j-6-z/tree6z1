/* ============================================================
   tree6z — footer.js
   Drop <div id="site-footer"></div> where the footer should go,
   then load before </body>:  <script src="footer.js"></script>
   Self-contained: injects its own styles. One place for the phone number.
   ============================================================ */
(function () {
  // ── the ONLY place the phone number lives ──
  var PHONE = '3062802167';
  var PHONE_TEL = '+1' + PHONE;
  var PHONE_DISP = '(' + PHONE.slice(0, 3) + ') ' + PHONE.slice(3, 6) + '-' + PHONE.slice(6);
  var EMAIL = 'tree6zlandscaping@gmail.com';
  var YEAR = new Date().getFullYear();
  // Same logo as the nav. Tries /public first, then root, then a text wordmark.
  var LOGO_SRC = '/public/tree6z-logo1.jpg';
  var LOGO_SRC_ALT = '/tree6z-logo1.jpg';

  var css = `
  .t6-footer{background:var(--ink,#181816);color:#f3eee2;font-family:'Fraunces',Georgia,serif}
  .t6-footer a{color:inherit;text-decoration:none}
  .t6-ft-cols{max-width:1180px;margin:0 auto;padding:3.5rem 1.5rem 2.5rem;display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:2.5rem;border-bottom:1px solid rgba(243,238,226,0.1)}
  .t6-ft-cols h5{font-family:'JetBrains Mono',monospace;font-size:0.64rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(243,238,226,0.4);margin:0 0 1rem;padding-bottom:0.55rem;border-bottom:1px solid rgba(243,238,226,0.1)}
  .t6-ft-logo-img{height:44px;width:auto;display:block;margin-bottom:0.85rem}
  .t6-ft-brand{font-family:'Archivo Black',Impact,sans-serif;font-size:2rem;letter-spacing:-0.02em;text-transform:uppercase;margin-bottom:0.75rem}
  .t6-ft-brand em{font-style:normal;color:#7ec77a}
  .t6-ft-cols p{font-size:0.92rem;line-height:1.6;color:rgba(243,238,226,0.6);margin:0 0 1.25rem;max-width:34ch}
  .t6-ft-line{display:flex;align-items:center;gap:0.5rem;font-family:'JetBrains Mono',monospace;font-size:0.78rem;letter-spacing:0.04em;color:rgba(243,238,226,0.78);margin-bottom:0.5rem;transition:color 0.2s}
  .t6-ft-line:hover{color:#7ec77a}
  .t6-ft-line svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;flex-shrink:0}
  .t6-ft-cols ul{list-style:none;margin:0;padding:0}
  .t6-ft-cols li{margin-bottom:0.45rem}
  .t6-ft-cols li a{font-size:0.88rem;color:rgba(243,238,226,0.6);transition:color 0.2s,padding-left 0.2s}
  .t6-ft-cols li a:hover{color:#f3eee2;padding-left:0.3rem}
  .t6-ft-areas{display:flex;flex-wrap:wrap;gap:0.3rem}
  .t6-ft-areas span{font-family:'JetBrains Mono',monospace;font-size:0.64rem;letter-spacing:0.08em;text-transform:uppercase;padding:0.3rem 0.55rem;border:1px solid rgba(243,238,226,0.12);border-radius:2px;color:rgba(243,238,226,0.55)}
  .t6-ft-bot{max-width:1180px;margin:0 auto;padding:1.4rem 1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.85rem;font-family:'JetBrains Mono',monospace;font-size:0.64rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(243,238,226,0.4)}
  .t6-ft-bot .sm{display:flex;gap:1.25rem}
  .t6-ft-bot .sm a{transition:color 0.2s}
  .t6-ft-bot .sm a:hover{color:#f3eee2}
  @media(max-width:820px){
    .t6-ft-cols{grid-template-columns:1fr 1fr;padding:2.5rem 1rem 2rem;gap:2rem}
    .t6-ft-bot{padding:1.2rem 1rem;font-size:0.58rem}
  }`;

  var phoneIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>';
  var mailIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';

  var areas = ['Stonebridge','Willowgrove','Briarwood','Evergreen','Warman','Martensville','Dalmeny'];

  var html =
    '<footer class="t6-footer">' +
      '<div class="t6-ft-cols">' +
        '<div>' +
          '<img class="t6-ft-logo-img" src="' + LOGO_SRC + '" alt="tree6z" data-alt="' + LOGO_SRC_ALT + '" ' +
            'onerror="var a=this.getAttribute(\'data-alt\');if(a){this.removeAttribute(\'data-alt\');this.src=a;}else{this.style.display=\'none\';var t=this.parentNode.querySelector(\'.t6-ft-brand\');if(t)t.style.display=\'block\';}">' +
          '<div class="t6-ft-brand" style="display:none">tree6z<em>.</em></div>' +
          '<p>Local Saskatoon family-run property maintenance. Year-round, no contracts, same crew every time.</p>' +
          '<a class="t6-ft-line" href="tel:' + PHONE_TEL + '">' + phoneIcon + PHONE_DISP + '</a>' +
          '<a class="t6-ft-line" href="mailto:' + EMAIL + '">' + mailIcon + EMAIL + '</a>' +
        '</div>' +
        '<div><h5>Services</h5><ul>' +
          '<li><a href="/#svc-lawn">Lawn care</a></li>' +
          '<li><a href="/#svc-leaf">Leaf removal</a></li>' +
          '<li><a href="/#svc-spring">Spring cleanup</a></li>' +
          '<li><a href="/#svc-snow">Snow removal</a></li>' +
        '</ul></div>' +
        '<div><h5>Company</h5><ul>' +
          '<li><a href="/">Home</a></li>' +
          '<li><a href="/#about">About</a></li>' +
          '<li><a href="/#faq">FAQ</a></li>' +
          '<li><a href="/#contact">Get a quote</a></li>' +
        '</ul></div>' +
        '<div><h5>Service Areas</h5><div class="t6-ft-areas">' +
          areas.map(function (a) { return '<span>' + a + '</span>'; }).join('') +
        '</div></div>' +
      '</div>' +
      '<div class="t6-ft-bot">' +
        '<span>&copy; ' + YEAR + ' tree6z · Saskatoon, SK · Fully insured &amp; licensed</span>' +
        '<div class="sm"><a href="/policy.html#privacy">Privacy</a><a href="/policy.html#terms">Terms</a><a href="mailto:' + EMAIL + '">Email us</a></div>' +
      '</div>' +
    '</footer>';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var mount = document.getElementById('site-footer') || (function () {
    var d = document.createElement('div'); d.id = 'site-footer';
    document.body.appendChild(d); return d;
  })();
  mount.innerHTML = html;
})();