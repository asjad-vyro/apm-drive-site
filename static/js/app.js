/*
 * Static build behaviour. Each block is a line-for-line port of the React
 * component named in its heading, so the static page behaves exactly like
 * the Next.js one. GSAP + ScrollTrigger are vendored next to this file.
 */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- SiteNav: scrolled pill ---------- */
  (function nav() {
    var header = document.getElementById("site-nav");
    if (!header) return;
    var bar = header.firstElementChild;
    var last = null;
    function apply() {
      var scrolled = window.scrollY > 20;
      if (scrolled === last) return;
      last = scrolled;
      header.style.padding = scrolled ? "10px 16px" : "16px";
      bar.style.maxWidth = scrolled ? "min(1180px, calc(100vw - 32px))" : "calc(100vw - 32px)";
      bar.style.padding = scrolled ? "8px 12px 8px 16px" : "10px 12px 10px 20px";
      bar.style.background = scrolled ? "rgba(247,246,242,0.96)" : "transparent";
      bar.style.border = scrolled ? "1px solid rgba(18,18,18,0.08)" : "1px solid transparent";
      bar.style.boxShadow = scrolled ? "0 16px 40px rgba(18,18,18,0.10), 0 2px 6px rgba(18,18,18,0.04)" : "none";
    }
    window.addEventListener("scroll", apply, { passive: true });
    apply();
  })();

  /* ---------- SiteNav: mobile menu ---------- */
  (function menu() {
    var m = document.getElementById("mobile-menu");
    var toggle = document.querySelector("[data-menu-toggle]");
    if (!m || !toggle) return;
    var bars = toggle.querySelectorAll("span > span");
    function set(open) {
      m.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (bars[0]) bars[0].style.transform = open ? "translateY(3.25px) rotate(45deg)" : "none";
      if (bars[1]) bars[1].style.transform = open ? "translateY(-3.25px) rotate(-45deg)" : "none";
    }
    toggle.addEventListener("click", function () { set(m.hidden); });
    m.querySelectorAll("[data-menu-close]").forEach(function (el) { el.addEventListener("click", function () { set(false); }); });
  })();

  /* ---------- Reveal ---------- */
  function observeReveal(els, margin) {
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("reveal-visible"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("reveal-visible"); io.unobserve(e.target); } });
    }, { rootMargin: margin });
    els.forEach(function (e) { io.observe(e); });
  }
  observeReveal(Array.prototype.slice.call(document.querySelectorAll(".reveal")), "0px 0px -8% 0px");

  /* ---------- Stamp (fit block) ---------- */
  if (!reduced) {
    document.querySelectorAll("[data-stamp-root]").forEach(function (root) {
      var items = Array.prototype.slice.call(root.querySelectorAll("[data-stamp]"));
      items.forEach(function (i) { i.classList.add("reveal"); });
      observeReveal(items, "0px 0px -12% 0px");
    });
  }

  /* ---------- FaqSection ---------- */
  document.querySelectorAll("[data-faq]").forEach(function (btn) {
    var panel = btn.nextElementSibling;
    var lines = btn.querySelectorAll("svg line");
    var vert = lines[1];
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (panel) panel.style.gridTemplateRows = open ? "1fr" : "0fr";
      if (vert) { vert.style.transform = open ? "scaleY(0)" : "scaleY(1)"; vert.style.opacity = open ? "0" : "1"; }
    });
  });

  /* ---------- Counter ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var value = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    function format(v) { return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US"); }
    if (reduced || !gsap) { el.textContent = format(value); return; }
    var obj = { v: 0 };
    gsap.to(obj, {
      v: value, duration: 1.6, ease: "power3.out",
      onUpdate: function () { el.textContent = format(obj.v); },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  /* ---------- InViewVideo ---------- */
  document.querySelectorAll("[data-ivv]").forEach(function (el) {
    var src = el.getAttribute("data-src");
    if (!src || reduced) return;
    var autoplay = el.getAttribute("data-autoplay") === "true";
    var vid = null;
    function arm() {
      if (vid) return vid;
      vid = document.createElement("video");
      vid.src = src; vid.muted = true; vid.loop = true; vid.playsInline = true; vid.autoplay = true;
      vid.preload = "metadata"; vid.setAttribute("aria-hidden", "true"); vid.setAttribute("playsinline", "");
      vid.className = "absolute inset-0 w-full h-full object-cover transition-opacity duration-300";
      vid.style.opacity = "0";
      vid.addEventListener("playing", function () { vid.style.opacity = "1"; });
      el.appendChild(vid);
      return vid;
    }
    function play() { var v = arm(); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    function stop() { if (vid) { vid.pause(); vid.style.opacity = "0"; } }
    var card = el.closest("a") || el;
    if (!autoplay && window.matchMedia("(pointer: fine)").matches) {
      card.addEventListener("mouseenter", function () { requestAnimationFrame(play); });
      card.addEventListener("mouseleave", stop);
      return;
    }
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) play(); else stop(); }, { threshold: autoplay ? 0.35 : 0.75 });
    io.observe(el);
  });

  /* ---------- GenerateReveal (hero) ---------- */
  document.querySelectorAll("[data-gen]").forEach(function (wrap) {
    var src = wrap.getAttribute("data-src");
    var video = wrap.getAttribute("data-video");
    var focusX = parseFloat(wrap.getAttribute("data-focus") || "0.5");
    var duration = parseFloat(wrap.getAttribute("data-duration") || "1500");
    var trigger = wrap.getAttribute("data-trigger") || "view";
    var canvas = wrap.querySelector("canvas");
    var img = wrap.querySelector("img");
    var placeholder = wrap.querySelector("div.bg-paper-2");

    function finish() {
      if (canvas) canvas.style.opacity = "0";
      if (img) img.style.opacity = "1";
      if (placeholder) placeholder.remove();
      if (!video || reduced) return;
      var v = document.createElement("video");
      v.src = video; v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = "auto";
      v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true");
      v.className = "absolute inset-0 w-full h-full object-cover";
      v.style.opacity = "0"; v.style.transition = "opacity 700ms ease"; v.style.objectPosition = focusX * 100 + "% 50%";
      v.addEventListener("playing", function () { v.style.opacity = "1"; });
      wrap.appendChild(v);
      // Pause the loop whenever it is off screen so it stops costing frames.
      new IntersectionObserver(function (es) { if (es[0].isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }).observe(wrap);
    }

    function run() {
      if (reduced || !canvas) { finish(); return; }
      var im = new Image();
      im.decoding = "async";
      im.onload = function () {
        if (placeholder) placeholder.remove();
        var ctx = canvas.getContext("2d", { alpha: false });
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var W = wrap.clientWidth, H = wrap.clientHeight;
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        canvas.style.width = W + "px"; canvas.style.height = H + "px";
        var off = document.createElement("canvas"), octx = off.getContext("2d");
        var ir = im.naturalWidth / im.naturalHeight, cr = W / H;
        var sx = 0, sy = 0, sw = im.naturalWidth, sh = im.naturalHeight;
        if (ir > cr) { sw = im.naturalHeight * cr; sx = (im.naturalWidth - sw) * focusX; } else { sh = im.naturalWidth / cr; sy = (im.naturalHeight - sh) / 2; }
        var t0 = performance.now();
        function ease(t) { return 1 - Math.pow(2, -10 * t); }
        function frame(now) {
          var p = Math.min(1, (now - t0) / duration), e = ease(p);
          var block = Math.max(1, Math.round(56 * Math.pow(1 - e, 1.6)));
          var cw = Math.max(1, Math.round(W / block)), ch = Math.max(1, Math.round(H / block));
          off.width = cw; off.height = ch;
          octx.imageSmoothingEnabled = true;
          octx.drawImage(im, sx, sy, sw, sh, 0, 0, cw, ch);
          ctx.imageSmoothingEnabled = block <= 2;
          ctx.drawImage(off, 0, 0, cw, ch, 0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(247,246,242," + (1 - e) * 0.55 + ")";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          if (p < 1) requestAnimationFrame(frame); else finish();
        }
        requestAnimationFrame(frame);
      };
      im.src = src;
    }

    if (trigger === "now") { run(); return; }
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); run(); } }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(wrap);
  });

  /* ---------- LineSystem ---------- */
  (function line() {
    var root = document.getElementById("page-root");
    var svg = root && root.querySelector("svg.line-svg");
    if (!svg || !gsap) return;
    var path = svg.querySelector(".line-path"), ghost = svg.querySelector(".line-ghost");
    var dot = svg.querySelector(".line-dot"), halo = svg.querySelector(".line-halo");
    var anchors = [], anchorLen = [], total = 0, progress = 0, trigger = null, lastShown = -1;

    function anchorPoint(el, rr) {
      var r = el.getBoundingClientRect();
      var ax = el.dataset.lineX || "center", ay = el.dataset.lineY || "center";
      var x = ax === "left" ? r.left : ax === "right" ? r.right : r.left + r.width / 2;
      var y = ay === "top" ? r.top : ay === "bottom" ? r.bottom : r.top + r.height / 2;
      return { x: x - rr.left, y: y - rr.top, el: el };
    }
    function splinePath(p) {
      if (p.length < 2) return "";
      var d = "M " + p[0].x.toFixed(1) + " " + p[0].y.toFixed(1);
      for (var i = 0; i < p.length - 1; i++) {
        var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
        var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
        var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
        d += " C " + c1x.toFixed(1) + " " + c1y.toFixed(1) + ", " + c2x.toFixed(1) + " " + c2y.toFixed(1) + ", " + p2.x.toFixed(1) + " " + p2.y.toFixed(1);
      }
      return d;
    }
    function render() {
      var shown = reduced ? total : total * progress;
      if (Math.abs(shown - lastShown) < 0.5) return;
      lastShown = shown;
      path.style.strokeDashoffset = String(total - shown);
      var q = path.getPointAtLength(Math.max(0, Math.min(total, shown)));
      dot.setAttribute("cx", q.x.toFixed(1)); dot.setAttribute("cy", q.y.toFixed(1));
      halo.setAttribute("cx", q.x.toFixed(1)); halo.setAttribute("cy", q.y.toFixed(1));
      dot.style.opacity = reduced || progress <= 0.001 ? "0" : "1";
      halo.style.opacity = dot.style.opacity;
      for (var i = 0; i < anchors.length; i++) {
        var lit = shown >= anchorLen[i] - 2;
        if ((anchors[i].el.dataset.lit === "true") !== lit) anchors[i].el.dataset.lit = lit ? "true" : "false";
      }
    }
    function measure() {
      var rr = root.getBoundingClientRect();
      var els = Array.prototype.slice.call(root.querySelectorAll("[data-line]")).filter(function (el) { return el.getClientRects().length > 0; });
      anchors = els.map(function (el) { return anchorPoint(el, rr); });
      var W = Math.round(rr.width), H = Math.round(root.scrollHeight);
      svg.setAttribute("width", String(W)); svg.setAttribute("height", String(H)); svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      var d = splinePath(anchors);
      path.setAttribute("d", d); ghost.setAttribute("d", d);
      total = path.getTotalLength();
      var N = 600, samples = [];
      for (var i = 0; i <= N; i++) { var l = (total * i) / N, q = path.getPointAtLength(l); samples.push({ x: q.x, y: q.y, l: l }); }
      anchorLen = anchors.map(function (a) {
        var best = 0, bd = Infinity;
        for (var j = 0; j < samples.length; j++) { var s = samples[j], dd = (s.x - a.x) * (s.x - a.x) + (s.y - a.y) * (s.y - a.y); if (dd < bd) { bd = dd; best = s.l; } }
        return best;
      });
      path.style.strokeDasharray = String(total);
      lastShown = -1;
      render();
    }
    function build() {
      measure();
      if (trigger) trigger.kill();
      trigger = ScrollTrigger.create({
        trigger: root, start: "top 55%", end: "bottom 70%", scrub: 0.25,
        onUpdate: function (self) { progress = self.progress; render(); },
      });
    }
    build();
    var lastH = root.scrollHeight, t;
    new ResizeObserver(function () {
      if (Math.abs(root.scrollHeight - lastH) < 4) return;
      lastH = root.scrollHeight;
      clearTimeout(t);
      t = setTimeout(function () { lastShown = -1; measure(); ScrollTrigger.refresh(); }, 150);
    }).observe(root);
    function onLoad() { lastShown = -1; measure(); ScrollTrigger.refresh(); }
    window.addEventListener("load", onLoad);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(onLoad);
    window.addEventListener("resize", build);
    if (!reduced) gsap.to(halo, { attr: { r: 16 }, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
  })();
})();
