# bysbn.com Recon Report

Fetched: 2026-11-11 (UTC). `https://bysbn.com/` returned HTTP 200 directly (no redirect to www).

## Verdict: NONE of the three candidates match

The live site at bysbn.com is **not** candidate (a), (b), or (c). It is a hand-authored **static multi-page HTML site** (plain HTML + one shared CSS file + a small inline script — no framework, no build step, no external JS bundle) served as static files on **Vercel** (`server: Vercel`, `x-vercel-cache: HIT`).

Evidence against each candidate:

- **(a) Vite + React one-page portfolio** (branch `claude/happy-lamport-RkJrJ`): NO MATCH.
  - No hashed `/assets/index-*.js` bundle; `/assets/index.js` and `/vite.svg` both 404. The only thing under `/assets/` is `assets/logo-black.png`.
  - Title is "Noah Kissinger — SBN MEDIA", not "Portfolio".
  - No section ids `hero/work/journal/explorations/stats` — the site is multi-page (`index.html`, `work.html`, `about.html`), not one-page.
  - Fonts: Inter only; no Instrument Serif.
  - No Mux at all — zero hits for "mux.com" / "stream.mux.com"; hero video is a self-hosted `reel.mp4`. The Mux playback ID `Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g` does not appear.
  - No work items "Luminary Brand System", "Orbit SaaS Dashboard", "Pulse Motion Studio", "Terrain E-commerce"; zero hits for "Journal" or "Explorations".
- **(b) Next.js "SHOT BY NOAH"** (branch `claude/portfolio-completion-vn8g1f`): NO MATCH.
  - Not Next.js: no `/_next/...` paths in the HTML and `https://bysbn.com/_next/static/` returns 404.
  - Branding is "SBN MEDIA", not "SHOT BY NOAH" (the string "Shot By" appears only in the Instagram handle `shot.bynoah`).
  - Font is Inter, not Space Grotesk; no `#FF6B2C` orange accent (palette is white/near-black: `--bg:#ffffff`, `--ink:#0b0b0c`).
  - Pages are `work.html` / `about.html` (static files), not routed `/work` `/about` `/contact`; there is no contact page.
- **(c) Next.js "Total Spectrum Counseling"**: NO MATCH. No counseling branding anywhere, no Playfair Display, not Next.js.

The live site is thematically the same person/brand as candidate (b) (Noah Kissinger / SBN Media / `shot.bynoah`), but it is a different, simpler implementation that matches none of the three codebases.

## Page metadata

- **Title:** `Noah Kissinger — SBN MEDIA` (work.html: `Work — SBN MEDIA`; about.html: `About — SBN MEDIA`)
- **Meta description:** `Noah Kissinger — Videographer, Photographer, Ads Manager & Brand Strategist. SBN Media.`
- **Meta tags:** `charset=UTF-8`, `viewport width=device-width, initial-scale=1.0` — no OG/Twitter tags, no `generator` meta.
- **Fonts:** Google Fonts preconnect + `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap` (Inter only)
- **Stylesheets:** `style.css` (8,025 bytes, also fully inlined into each page's `<style>` block; its header comment says "SBN MEDIA — shared stylesheet (source of truth)… Light portfolio (reference: tomasgomez.art)")
- **Scripts:** none external — one small inline `<script>` (syncs blurred bg reel with foreground reel + a tap-to-unmute sound toggle)
- **Icons:** `favicon.png`, `apple-touch-icon.png`
- **Footer links:** `https://instagram.com/shot.bynoah`, `mailto:noah@bysbn.com`, `https://www.linkedin.com/in/noah-kissinger-49454b2a2`

## Framework fingerprint

- `/_next/static/` → **404** (not Next.js)
- `/assets/index.js` → **404**, `/vite.svg` → **404** (not a Vite build; no hashed asset bundle referenced anywhere in the HTML)
- `work.html` → 200, `about.html` → 200, `reel.mp4` → 200, `assets/logo-black.png` → 200 (plain static files with `.html` extensions)
- Response headers: `server: Vercel`, `x-vercel-cache: HIT`, `etag`, `last-modified: Tue, 10 Nov 2026 17:45:16 GMT` → static hosting on Vercel, deployed/updated 2026-11-10.

## Identifying-string grep (landing HTML + style.css, case-insensitive)

There is no main JS bundle to grep (no external scripts), so the greps ran against the landing HTML and `style.css`:

- **"SBN"** — `<title>Noah Kissinger — SBN MEDIA</title>`; `…rapher, Ads Manager & Brand Strategist. SBN Media.">`; `s="brand" href="index.html" aria-label="SBN Media home">`; `<img src="assets/logo-black.png" alt="SBN Media">`; style.css: `/* SBN MEDIA — shared stylesheet (source of…`
- **"bysbn"** — `<a href="mailto:noah@bysbn.com">Email</a>`
- **"Noah"** — `<title>Noah Kissinger — SBN MEDIA</title>`; `<meta name="description" content="Noah Kissinger — Videographer, Photographe…`; `<h1>Noah Kissinger</h1>`; `<a href="https://instagram.com/shot.bynoah" …>Instagr…`; `mailto:noah@bysbn.com`; `https://www.linkedin.com/in/noah-kissinger-49454b2a2`
- **"Shot By"** — only as the Instagram handle: `<a href="https://instagram.com/shot.bynoah" target="_blank" rel="noopener">Ins…`
- **"Portfolio"** — only in a CSS comment: `style.css: Light portfolio (reference: tomasgomez.art): WHITE page…`
- **"Journal"** — no matches
- **"Explorations"** — no matches
- **"mux.com"** — no matches
- **"stream.mux.com"** — no matches
- (extra probes) **"Luminary"**, **"Space Grotesk"**, **"Instrument Serif"**, **"FF6B2C"**, **"Playfair"** — no matches

## Video and image asset URLs

No streaming URLs (no `.m3u8`, no stream.mux.com playback IDs). All media is self-hosted relative to `https://bysbn.com/`:

**Videos (progressive MP4):**
- `reel.mp4` (hero reel on landing page, poster `poster.jpg`)
- `clips/anta-pov.mp4`, `clips/boxing.mp4`, `clips/calpoly-hoops.mp4`, `clips/calpoly-practice.mp4`, `clips/doghours-anta.mp4`, `clips/hc-track.mp4`, `clips/hometown-favorites.mp4`, `clips/ig.mp4`, `clips/jqb-sesh.mp4` (work.html; each with a matching `clips/*.jpg` poster)

**Images:**
- `assets/logo-black.png`, `favicon.png`, `apple-touch-icon.png`, `poster.jpg`
- Clip posters: `clips/anta-pov.jpg`, `clips/boxing.jpg`, `clips/calpoly-hoops.jpg`, `clips/calpoly-practice.jpg`, `clips/doghours-anta.jpg`, `clips/hc-track.jpg`, `clips/hometown-favorites.jpg`, `clips/ig.jpg`, `clips/jqb-sesh.jpg`
- Photos: `photos/portrait.jpg`; `photos/made-drivebw.jpg`, `photos/made-handler.jpg`, `photos/made-net.jpg`, `photos/made-portrait.jpg`; `photos/sj-bench.jpg`, `photos/sj-celebrate.jpg`, `photos/sj-drive.jpg`, `photos/sj-dunk.jpg`, `photos/sj-dunkbw.jpg`, `photos/sj-flex.jpg`, `photos/sj-hustle.jpg`, `photos/sj-walk.jpg`; `photos/sport-1.jpg` … `photos/sport-14.jpg`; `photos/wedding-1.jpg`, `photos/wedding-2.jpg`, `photos/wedding-3.jpg`

## Fetched landing-page HTML (full — the page is 121 lines)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Noah Kissinger — SBN MEDIA</title>
<meta name="description" content="Noah Kissinger — Videographer, Photographer, Ads Manager & Brand Strategist. SBN Media.">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
<style>
/* Inlined from style.css so this page renders standalone in preview sandboxes. */
:root{--bg:#ffffff;--ink:#0b0b0c;--ink-dim:#6f6f74;--line:#e8e8e6;--panel:#f2f2ef;--maxw:1200px;--pad:clamp(20px,5vw,64px);--headerH:70px}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:400;line-height:1.5;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
a{color:inherit;text-decoration:none}
img,video{display:block;max-width:100%}
.site-header{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;padding:15px var(--pad);border-bottom:1px solid var(--line);background:var(--bg)}
.site-nav{justify-self:start;display:flex;gap:clamp(16px,2.6vw,32px)}
.site-nav a{color:var(--ink-dim);font-size:13px;letter-spacing:.14em;text-transform:uppercase;transition:color .25s ease;padding-bottom:2px}
.site-nav a:hover,.site-nav a[aria-current="page"]{color:var(--ink)}
.brand{justify-self:center;display:flex;align-items:center;gap:10px}
.brand img{height:34px;width:auto}
.brand .wordmark{font-size:13px;font-weight:600;letter-spacing:.34em;text-indent:.34em;text-transform:uppercase}
.hero{position:relative;height:calc(100svh - var(--headerH));min-height:440px;background:#0b0b0c;overflow:hidden}
.hero .bg-video{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;filter:blur(22px) brightness(.5);transform:scale(1.14)}
.hero video.fg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:100%;max-height:100%;width:auto;height:auto;z-index:1}
.hero::after{content:"";position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse at center,rgba(0,0,0,.15) 0%,rgba(0,0,0,.5) 100%)}
.hero .overlay{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 var(--pad);pointer-events:none;color:#fff;opacity:0;animation:heroIn .9s ease 1s both}
@keyframes heroIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.hero h1{font-size:clamp(26px,5vw,64px);font-weight:600;line-height:1;letter-spacing:-.01em;text-transform:uppercase;text-shadow:0 1px 30px rgba(0,0,0,.35)}
.hero .roles{margin-top:clamp(12px,1.6vw,18px);font-size:clamp(10px,1.2vw,14px);letter-spacing:.16em;text-transform:uppercase;text-shadow:0 1px 20px rgba(0,0,0,.4)}
.hero .roles span{opacity:.6;margin:0 .5em}
.hero .sound-toggle{position:absolute;z-index:4;right:clamp(16px,3vw,30px);bottom:clamp(16px,3vw,30px);display:inline-flex;align-items:center;gap:8px;padding:9px 15px;border:1px solid rgba(255,255,255,.35);border-radius:100px;background:rgba(0,0,0,.32);color:#fff;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:background .25s ease,border-color .25s ease;opacity:0;animation:heroIn .9s ease 1.3s both}
.hero .sound-toggle:hover{background:rgba(0,0,0,.55);border-color:rgba(255,255,255,.75)}
.hero .sound-toggle svg{width:15px;height:15px;display:block;flex:none}
.site-footer{display:flex;justify-content:center;gap:clamp(20px,4vw,36px);padding:clamp(18px,3vw,28px) var(--pad);font-size:11px;letter-spacing:.2em;text-transform:uppercase;border-top:1px solid var(--line)}
.site-footer a{color:var(--ink-dim);transition:color .25s ease}
.site-footer a:hover{color:var(--ink)}
@media (max-width:640px){.site-header{grid-template-columns:1fr;justify-items:center;gap:12px;text-align:center}.site-nav{justify-self:center}.brand{order:-1}}
</style>
</head>
<body class="home">

  <header class="site-header">
    <nav class="site-nav">
      <a href="index.html" aria-current="page">Home</a>
      <a href="work.html">Work</a>
      <a href="about.html">About</a>
    </nav>
    <a class="brand" href="index.html" aria-label="SBN Media home">
      <img src="assets/logo-black.png" alt="SBN Media">
    </a>
  </header>

  <main class="hero">
    <video class="bg-video" autoplay muted loop playsinline poster="poster.jpg" aria-hidden="true">
      <source src="reel.mp4" type="video/mp4">
    </video>
    <video class="fg" autoplay muted loop playsinline poster="poster.jpg">
      <source src="reel.mp4" type="video/mp4">
    </video>
    <div class="overlay">
      <h1>Noah Kissinger</h1>
      <div class="roles">Videographer<span>|</span>Photographer<span>|</span>Ads Manager<span>|</span>Brand Strategist</div>
    </div>
    <button class="sound-toggle" id="soundToggle" type="button" aria-pressed="false" aria-label="Turn sound on">
      <span class="ico" aria-hidden="true"></span><span class="lbl">Sound off</span>
    </button>
  </main>

  <script>
    /* Keep the blurred background reel in sync with the sharp vertical one. */
    (function () {
      var hero = document.querySelector('.hero');
      if (!hero) return;
      var bg = hero.querySelector('.bg-video'), fg = hero.querySelector('.fg');
      if (!bg || !fg) return;
      function start() { var p = bg.play(); if (p && p.catch) p.catch(function () {}); }
      fg.addEventListener('loadeddata', start);
      fg.addEventListener('play', start);
      fg.addEventListener('timeupdate', function () {
        if (Math.abs((bg.currentTime || 0) - (fg.currentTime || 0)) > 0.12) {
          try { bg.currentTime = fg.currentTime; } catch (e) {}
        }
      });

      /* Tap-to-unmute: autoplay must start muted, so let visitors turn sound on.
         Only the sharp foreground reel carries audio; the blurred bg stays silent. */
      var btn = document.getElementById('soundToggle');
      var ON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
      var OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';
      function render() {
        var on = !fg.muted;
        btn.querySelector('.ico').innerHTML = on ? ON : OFF;
        btn.querySelector('.lbl').textContent = on ? 'Sound on' : 'Sound off';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on');
      }
      if (btn) {
        render();
        btn.addEventListener('click', function () {
          fg.muted = !fg.muted;
          if (!fg.muted) { fg.volume = 1; var p = fg.play(); if (p && p.catch) p.catch(function () {}); }
          render();
        });
      }
    })();
  </script>

  <footer class="site-footer">
    <a href="https://instagram.com/shot.bynoah" target="_blank" rel="noopener">Instagram</a>
    <a href="mailto:noah@bysbn.com">Email</a>
    <a href="https://www.linkedin.com/in/noah-kissinger-49454b2a2" target="_blank" rel="noopener">LinkedIn</a>
  </footer>

</body>
</html>
```
