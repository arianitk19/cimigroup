# Asetet — Cimi Group SA

Ky folder është i organizuar që materialet reale të vendosen lehtë, pa ndryshuar kodin.
Të gjitha fotot kanë **fallback automatik**: derisa të mos ekzistojë fotoja reale, shfaqet një placeholder elegant. Sapo të vendoset fotoja me emrin e duhur, ajo shfaqet automatikisht.

## Ku të vendosen materialet

| Folder | Çfarë të vendoset | Emrat e pritur |
|---|---|---|
| `branding/logo/` | Logo zyrtare e Cimi Group SA | `logo-full.svg/png` (logo e plotë), `logo-mark.svg/png` (vetëm simboli) |
| `projects/` | Fotot e projekteve | `project-01.jpg`, `project-01-1.jpg`, `project-01-2.jpg` … (shih `js/data.js`) |
| `field-work/` | Fotot e punës në terren | `field-01.jpg`, `field-02.jpg` … |
| `gallery/` | Fotot e galerisë | `gallery-01.jpg`, `gallery-02.jpg` … |
| `materials/` | Fotot e materialeve/kategorive | `material-cimento.jpg`, `material-hekur.jpg` … |
| `brands/` | Logot e markave (GEWISS, TM, etj.) | `gewiss.svg/png`, `tm.svg/png` … |
| `icons/` | Ikonat e PWA (të gjeneruara) | — mos i prek |

## Rekomandime për fotot
- Format: `.jpg` për fotografi (cilësi ~80%), `.webp` opsional për performancë.
- Hero & terren: **landscape** (p.sh. 1920×1080).
- Galeri: përzierje landscape/portrait — kompozimi masonry i menaxhon.
- Logot e markave: mundësisht **SVG** ose PNG me sfond transparent.

## Si të shtoj/ndryshoj përmbajtje
E gjithë përmbajtja (projekte, galeri, partnerë, kategori, hapat e procesit) menaxhohet nga **`js/data.js`**.
Shto një objekt të ri në array-in përkatës dhe vendos foton me emrin që i ke dhënë — asgjë tjetër nuk ndryshon.

## Ngjyra & identiteti
Palette-ja aktuale (industrial premium) është në `css/styles.css` te `:root`.
Kur të vendoset logoja reale, ngjyra e theksit (`--accent`, aktualisht bronz `#C1873B`) mund të përshtatet me identitetin e logos — një ndryshim, në një vend.
