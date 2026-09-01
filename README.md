# Cimi Group SA — Website + PWA

Platformë web moderne (PWA-first), shumëfaqëshe dhe shumëgjuhëshe për **Cimi Group SA** — materiale ndërtimi, elektrik, hidrosanitari dhe zgjidhje profesionale me mbështetje në terren.
Ndërtuar me **HTML5 + Tailwind CSS (i kompiluar) + JavaScript i pastër** — pa framework, e shpejtë, e instalueshme si aplikacion.

Dizajni ndjek **logon zyrtare**: portokalli `#E66C21`, çeliktë e errët `#0E171E`, argjendi metalik.

---

## Si ta hapësh
Faqja është statike, por përdor Service Worker + router — hape me një server statik (jo me `file://`):
```bash
python3 -m http.server 8080      # ose:  npx serve .
```
Pastaj hap `http://localhost:8080`.

---

## Karakteristikat
- **Shumëfaqëshe** me router të shpejtë (pa reload) dhe tranzicione smooth: Ballina, Projekte, Materialet, Firmat që punojmë, Puna në terren, Galeri, Lokacioni, Kontakti.
- **3 gjuhë**: Shqip (primare), Frëngjisht, Gjermanisht — ndërrues në header + drawer, ruhet zgjedhja.
- **Materialet**: çdo kategori ka një **ilustrim të gjeneruar** (SVG) në stilin e brandit.
- **Firmat që punojmë**: ekosistem markash europiane të grupuara sipas fushës (GEWISS & TM të veçuara).
- **PWA**: manifest, service worker, offline page, install prompt, ikona nga logoja reale.
- Lightbox, detaje projekti (panel), galeri me filtra, formë kontakti (mailto), animacione reveal, FAB telefoni në mobile.

---

## Struktura
```
index.html            → app shell (header/footer/router injektohen nga JS)
offline.html          → faqja jashtë linje (PWA)
manifest.json · service-worker.js
css/  ├─ styles.css    → CSS i kompiluar (përdoret nga faqja)
      └─ input.css     → burimi Tailwind (redakto → rikompilo)
js/
  ├─ i18n.js           → ⭐ përkthimet sq / fr / de (UI)
  ├─ data.js           → ⭐ përmbajtja shumëgjuhëshe (projekte, galeri, marka…)
  ├─ materials-art.js  → ilustrimet e gjeneruara të materialeve
  ├─ helpers.js · chrome.js · views.js · interactions.js · router.js · pwa.js · app.js
assets/  → logo reale, foto, ikona (shih assets/README.md)
```

---

## Si të shtoj përmbajtjen time
1. **Fotot / logot e markave** → vendosi në `assets/` me emrat e pritur (shih `assets/README.md`). Çdo foto ka **fallback automatik**.
2. **Projekte, galeri, marka, materiale** → redakto **`js/data.js`** (fushat `{ sq, fr, de }`).
3. **Tekstet e ndërfaqes** → **`js/i18n.js`**.
4. **Ngjyra e theksit** → `--accent` te `css/input.css` (`:root`), pastaj rikompilo.

## Rikompilimi i CSS (vetëm nëse ndryshon klasa Tailwind ose ngjyra)
```bash
npm install
npm run build:css     # ose: npm run watch:css
```
> Ndryshimi i përmbajtjes te `data.js` / `i18n.js` **nuk** kërkon rikompilim.

---

## Të dhënat zyrtare (të pandryshueshme në kod)
- **Adresa:** Rruga Visar Hoti, Ratkoc, Kosovë
- **Telefon:** 044 425 968
- **Email:** besim.hoti@hotmail.com

## Shënim për markat
GEWISS dhe TM janë të konfirmuara. Markat e tjera europiane te faqja "Firmat që punojmë" janë prodhues, produktet e të cilëve mund të sigurohen sipas kërkesës — logot zyrtare shtohen sipas disponueshmërisë (vendosi te `assets/brands/`).
