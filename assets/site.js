(function () {
  'use strict';

  var PHONE_DISPLAY = '+1 (647) 806-9453';
  var PHONE_LINK = '+16478069453';
  var EMAIL = 'hello@openmovers.ca';
  var path = window.location.pathname.replace(/index\.html$/, '');

  function isCurrent(section) {
    if (section === 'home') return path === '/' || path === '';
    if (section === 'services') return path.indexOf('/services') === 0;
    return path.indexOf('/' + section) === 0;
  }

  function navLink(href, label, section) {
    var current = isCurrent(section) ? ' aria-current="page"' : '';
    return '<a class="nav-link" href="' + href + '"' + current + '>' + label + '</a>';
  }

  var header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = [
      '<a class="skip-link" href="#main-content">Skip to content</a>',
      '<header class="site-header">',
        '<div class="utility-bar"><div class="shell utility-inner">',
          '<p>Local moves · Long distance · Residential · Commercial · Packing</p>',
          '<p>Toronto, GTA &amp; beyond &nbsp;·&nbsp; <a href="tel:', PHONE_LINK, '">', PHONE_DISPLAY, '</a></p>',
        '</div></div>',
        '<div class="shell nav-wrap">',
          '<a class="brand" href="/" aria-label="OpenMovers Toronto home">',
            '<span class="brand-mark" aria-hidden="true"></span>',
            '<span><span class="brand-name">Open<em>Movers</em></span><small>Toronto</small></span>',
          '</a>',
          '<nav class="main-nav" id="main-navigation" aria-label="Main navigation">',
            navLink('/about/', 'About', 'about'),
            '<div class="nav-drop">',
              '<button class="nav-drop-button" type="button" aria-label="Browse moving services">Services</button>',
              '<div class="nav-dropdown">',
                '<a href="/services/">All services</a>',
                '<a href="/services/local-moving/">Local moving</a>',
                '<a href="/services/long-distance/">Long-distance moving</a>',
                '<a href="/services/residential-moving/">Residential moving</a>',
                '<a href="/services/commercial-moving/">Commercial moving</a>',
                '<a href="/services/packing-services/">Packing services</a>',
              '</div>',
            '</div>',
            navLink('/service-areas/', 'Areas', 'service-areas'),
            navLink('/faq/', 'FAQ', 'faq'),
            navLink('/testimonials/', 'Reviews', 'testimonials'),
            '<div class="nav-mobile-actions">',
              '<a class="button button-outline" href="tel:', PHONE_LINK, '">Call ', PHONE_DISPLAY, '</a>',
              '<a class="button" href="/quote/">Get a free quote</a>',
            '</div>',
          '</nav>',
          '<div class="nav-actions">',
            '<a class="phone-link" href="tel:', PHONE_LINK, '">', PHONE_DISPLAY, '</a>',
            '<a class="button button-small" href="/quote/">Free quote</a>',
          '</div>',
          '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Open menu"><span></span></button>',
        '</div>',
      '</header>'
    ].join('');
  }

  var footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = [
      '<footer class="site-footer">',
        '<div class="shell footer-main">',
          '<div class="footer-brand">',
            '<a class="brand" href="/" aria-label="OpenMovers Toronto home">',
              '<span class="brand-mark" aria-hidden="true"></span>',
              '<span><span class="brand-name" style="color:#fff">Open<em>Movers</em></span><small style="color:#fff">Toronto</small></span>',
            '</a>',
            '<p>Practical, carefully planned moves across Toronto, the GTA and beyond. Ask us for a clear, no-obligation quote for your route.</p>',
          '</div>',
          '<div>',
            '<p class="footer-title">Moving</p>',
            '<div class="footer-links">',
              '<a href="/services/local-moving/">Local moving</a>',
              '<a href="/services/long-distance/">Long distance</a>',
              '<a href="/services/residential-moving/">Residential</a>',
              '<a href="/services/commercial-moving/">Commercial</a>',
              '<a href="/services/packing-services/">Packing</a>',
            '</div>',
          '</div>',
          '<div>',
            '<p class="footer-title">Company</p>',
            '<div class="footer-links">',
              '<a href="/about/">About us</a>',
              '<a href="/service-areas/">Service areas</a>',
              '<a href="/faq/">FAQ</a>',
              '<a href="/testimonials/">Reviews</a>',
              '<a href="/quote/">Get a quote</a>',
            '</div>',
          '</div>',
          '<div class="footer-contact">',
            '<p class="footer-title">Contact</p>',
            '<div class="footer-links">',
              '<a href="tel:', PHONE_LINK, '">', PHONE_DISPLAY, '</a>',
              '<a href="mailto:', EMAIL, '">', EMAIL, '</a>',
              '<a href="https://wa.me/16478069453" target="_blank" rel="noopener">Message on WhatsApp ↗</a>',
              '<span>Toronto, Ontario</span>',
              '<span>Mon–Sun, 7:00 AM–9:00 PM</span>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="shell footer-bottom">',
          '<span>© <span data-current-year></span> OpenMovers Toronto. All rights reserved.</span>',
          '<span>Clear quotes · Careful crews · Toronto building know-how</span>',
        '</div>',
      '</footer>',
      '<a class="whatsapp-float" href="https://wa.me/16478069453" target="_blank" rel="noopener" aria-label="Message OpenMovers on WhatsApp">◉ <span>WhatsApp us</span></a>'
    ].join('');
  }

  var menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  document.querySelectorAll('[data-current-year]').forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    var today = new Date();
    var localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    input.setAttribute('min', localToday);
  });

  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  var faqSearch = document.querySelector('[data-faq-search]');
  if (faqSearch) {
    faqSearch.addEventListener('input', function () {
      var query = faqSearch.value.trim().toLowerCase();
      var visible = 0;
      document.querySelectorAll('[data-faq-item]').forEach(function (item) {
        var match = item.textContent.toLowerCase().indexOf(query) !== -1;
        item.style.display = match ? '' : 'none';
        if (match) visible += 1;
      });
      var empty = document.querySelector('.faq-empty');
      if (empty) empty.style.display = visible ? 'none' : 'block';
    });
  }

  function fieldLabel(form, name) {
    var field = form.querySelector('[name="' + name + '"]');
    if (!field) return name;
    var id = field.id;
    var label = id ? form.querySelector('label[for="' + id + '"]') : null;
    return label ? label.textContent.trim().replace(/\s+/g, ' ') : name.replace(/_/g, ' ');
  }

  document.querySelectorAll('[data-quote-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var grouped = {};
      data.forEach(function (value, key) {
        if (key === 'consent' || !String(value).trim()) return;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(String(value).trim());
      });

      var lines = ['Hi OpenMovers, I would like a free moving quote.'];
      Object.keys(grouped).forEach(function (key) {
        lines.push(fieldLabel(form, key) + ': ' + grouped[key].join(', '));
      });
      lines.push('Please let me know the next step.');

      var status = form.querySelector('[data-form-status]');
      if (status) status.textContent = 'Your move details are ready. Opening WhatsApp…';
      var whatsappUrl = 'https://wa.me/16478069453?text=' + encodeURIComponent(lines.join('\n'));
      var popup = window.open(whatsappUrl, '_blank');
      if (popup) popup.opener = null;
      else window.location.href = whatsappUrl;
    });
  });
})();
