/* ============================================================================
   materials-art.js — Ilustrime SVG të gjeneruara për çdo kategori materiali.
   Stil i njësuar: sfond i errët + vijë argjendi + theks portokalli (logo).
   window.MATERIAL_ART(key) → string SVG.
   ========================================================================== */
(function () {
  'use strict';
  var SILVER = '#C3CBD4', ORANGE = '#E66C21', ORANGE2 = '#F2894A', DARK = '#1B2630';

  function frame(inner) {
    return '<svg viewBox="0 0 400 275" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img">' +
      '<rect width="400" height="275" fill="#121b23"/>' +
      '<g stroke="#ffffff" stroke-opacity="0.045" stroke-width="1">' +
        '<path d="M0 68 H400 M0 137 H400 M0 206 H400 M100 0 V275 M200 0 V275 M300 0 V275"/>' +
      '</g>' +
      '<polygon points="0,0 74,0 0,58" fill="' + ORANGE + '" opacity="0.14"/>' +
      '<ellipse cx="210" cy="120" rx="230" ry="130" fill="#ffffff" opacity="0.03"/>' +
      inner +
    '</svg>';
  }
  function g(inner) { return '<g fill="none" stroke="' + SILVER + '" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + inner + '</g>'; }

  var ART = {
    // Çimento & Beton — thes çimentoje + mistri
    cimento: frame(
      g('<path d="M150 96 l40 -13 l40 13"/><rect x="150" y="96" width="80" height="118" rx="5"/><path d="M150 150 h80 M162 172 h56 M162 186 h40"/>') +
      '<rect x="150" y="128" width="80" height="20" fill="' + ORANGE + '" opacity="0.92"/>' +
      g('<path d="M250 120 l52 -14 l10 22 l-52 14 z"/><path d="M300 130 l24 26"/>')
    ),
    // Hekur — shufra hekuri (rebar)
    hekur: frame(
      '<g stroke="' + SILVER + '" stroke-opacity="0.6" stroke-width="10" stroke-linecap="round">' +
        '<path d="M150 74 V214"/><path d="M186 74 V214"/><path d="M222 74 V214"/>' +
      '</g>' +
      '<g stroke="' + ORANGE + '" stroke-width="10" stroke-linecap="round"><path d="M258 74 V214"/></g>' +
      g('<path d="M138 100 q60 -18 132 0 M138 150 q60 -18 132 0 M138 196 q60 -18 132 0"/>')
    ),
    // Suvatim — mistri që suvaton mur
    suvatim: frame(
      g('<path d="M140 200 q30 -16 60 0 t60 0 t60 0"/><path d="M140 176 q30 -16 60 0 t60 0 t60 0" stroke-opacity="0.35"/>') +
      g('<path d="M150 96 l96 40 l-14 30 l-96 -40 z"/>') +
      '<path d="M246 136 l30 14" stroke="' + ORANGE + '" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="150" y="96" width="60" height="6" rx="3" fill="' + ORANGE + '" transform="rotate(22 180 100)"/>'
    ),
    // Izolim & Ndërtim — prerje muri me shtresa izolimi
    izolim: frame(
      g('<rect x="150" y="80" width="100" height="120" rx="4"/><path d="M182 80 V200 M218 80 V200"/>') +
      '<path d="M182 90 l36 20 l-36 20 l36 20 l-36 20 l36 20" fill="none" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
      g('<path d="M262 92 h40 M262 116 h40 M262 140 h40 M262 164 h40"/>')
    ),
    // Elektrik — prizë + rrufe
    elektrik: frame(
      g('<rect x="150" y="86" width="104" height="104" rx="14"/><circle cx="202" cy="138" r="30"/><path d="M194 128 v10 M210 128 v10"/>') +
      '<path d="M300 84 l-26 44 h18 l-16 44 l40 -56 h-20 z" fill="' + ORANGE + '" stroke="' + ORANGE2 + '" stroke-width="2" stroke-linejoin="round"/>'
    ),
    // Sanitari — rubinet + pikë uji
    sanitari: frame(
      g('<path d="M168 100 h34 v22 h44 a26 26 0 0 1 26 26 v10"/><path d="M168 92 v34"/><rect x="150" y="150" width="120" height="10" rx="4"/>') +
      '<path d="M272 176 q-14 18 -14 30 a14 14 0 0 0 28 0 q0 -12 -14 -30 z" fill="' + ORANGE + '" opacity="0.92"/>'
    ),
    // Kanalizim — tuba (bërryl)
    kanalizim: frame(
      '<g fill="none" stroke="' + SILVER + '" stroke-opacity="0.6" stroke-width="18" stroke-linecap="round"><path d="M150 96 h50 a40 40 0 0 1 40 40 v70"/></g>' +
      '<g fill="none" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round" stroke-opacity="0.9"><path d="M150 78 v36 M150 78 h60 M240 190 h36 M258 190 v-36"/></g>' +
      g('<path d="M146 114 h8 M186 92 v8"/>')
    ),
    // Materiale për shtëpi — shtëpi
    shtepi: frame(
      g('<path d="M150 140 l52 -46 l52 46"/><path d="M162 132 V206 h80 V132"/><rect x="192" y="164" width="24" height="42"/>') +
      '<rect x="176" y="150" width="18" height="18" fill="' + ORANGE + '" opacity="0.9"/>' +
      g('<path d="M256 118 l18 -16 l18 16 M262 114 V158 h32 V114"/>')
    ),
    // Zgjidhje të tjera — ingranazh + çelës
    tjera: frame(
      g('<circle cx="196" cy="138" r="30"/><circle cx="196" cy="138" r="9"/><path d="M196 96 v14 M196 166 v14 M154 138 h14 M224 138 h14 M166 108 l10 10 M226 168 l-10 -10 M166 168 l10 -10 M226 108 l-10 10"/>') +
      '<path d="M262 108 a20 20 0 1 0 24 24 l24 24 l10 -10 l-24 -24 a20 20 0 0 0 -34 -14 z" fill="' + ORANGE + '" opacity="0.9"/>'
    )
  };

  window.MATERIAL_ART = function (key) { return ART[key] || ART.tjera; };
})();
