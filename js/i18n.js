/* ============================================================================
   i18n.js — Sistemi shumëgjuhësh: Shqip (primar), Frëngjisht, Gjermanisht
   ========================================================================== */
(function () {
  'use strict';

  const LANGS = [
    { code: 'sq', label: 'Shqip', flag: 'SQ' },
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'de', label: 'Deutsch', flag: 'DE' }
  ];

  const DICT = {
    sq: {
      nav: { ballina: 'Ballina', projekte: 'Projekte', materialet: 'Materialet', partneret: 'Firmat që punojmë', terren: 'Puna në terren', galeri: 'Galeri', lokacioni: 'Lokacioni', kontakti: 'Kontakti' },
      cta: { shiko: 'Shiko projektet', nakontakto: 'Na kontakto', shikoProjektin: 'Shiko projektin', telefono: 'Telefono', pwa: 'Instalo aplikacionin' },
      hero: { eyebrow: 'Cimi Group SA · Ratkoc, Kosovë', t1: 'Nga fillimi,', accent: 'deri në përfundim.', sub: 'Cimi Group SA ofron materiale ndërtimore, zgjidhje profesionale dhe mbështetje në terren për projekte të ndryshme ndërtimore.' },
      trust: { a: 'Materiale të përzgjedhura', b: 'Produkte europiane', c: 'Zgjidhje profesionale', d: 'Mbështetje në terren' },
      about: { eyebrow: 'Kush jemi', title1: 'Më shumë se', title2: 'materiale ndërtimore.', lead: 'Cimi Group SA nuk është vetëm vendi ku blihen materialet. Është partner për njerëzit dhe kompanitë që duan të realizojnë një projekt në mënyrë të organizuar dhe profesionale.', p2: 'Nga furnizimi me materialet e duhura, te zgjidhjet e përshtatura dhe mbështetja drejtpërdrejt në terren — synojmë të jemi një partner i vetëm që e shoqëron projektin nga ideja e parë deri te përfundimi i tij.', pt1: 'Furnizim me materiale për një gamë të gjerë projektesh.', pt2: 'Zgjidhje profesionale të përshtatura me nevojat e projektit.', pt3: 'Bashkëpunim dhe mbështetje deri te përfundimi.' },
      materials: { eyebrow: 'Çfarë ofrojmë', title: 'Kategoritë e materialeve', note: 'Një gamë e gjerë materialesh dhe produktesh për ndërtim, renovim dhe furnizim profesional.', includes: 'Përfshin', explore: 'Të gjitha kategoritë', viewAll: 'Shiko materialet' },
      process: { eyebrow: 'Si punojmë', title: 'Nga fillimi deri në përfundim', note: 'Një rrugë e qartë — nga planifikimi te përfundimi i projektit.' },
      projects: { eyebrow: 'Portofoli', title: 'Projekte', note: 'Një përzgjedhje projektesh — furnizim, zgjidhje dhe mbështetje në terren.', viewAll: 'Shiko të gjitha projektet', featured: 'Projekt i veçuar', hasVideo: 'Me video' },
      project: { kategoria: 'Kategoria', lokacioni: 'Lokacioni', viti: 'Viti', materialet: 'Materialet e përdorura', galeria: 'Galeria e projektit', video: 'Video nga puna' },
      partners: { eyebrow: 'Bashkëpunimet', title: 'Firmat që punojmë', note: 'Përfaqësojmë dhe furnizojmë produkte europiane, të zgjedhura për cilësi dhe standard profesional.', gewissKicker: 'Produkt italian', gewissTag: 'Zgjidhje italiane. Standard profesional.', gewissDesc: 'Përfaqësojmë GEWISS — zgjidhje italiane për instalime elektrike dhe materiale profesionale, të përdorura në projekte ndërtimore.', disclaimer: 'Markat e listuara janë prodhues europianë, produktet e të cilëve mund të sigurohen sipas kërkesës së projektit. Logot zyrtare shtohen sipas disponueshmërisë.', viewAll: 'Të gjitha firmat' },
      field: { eyebrow: 'Realiteti i punës', title: 'Puna në terren', note: 'Materiale, instalime dhe punë reale — dokumentuar drejtpërdrejt nga terreni.', viewAll: 'Shiko punën në terren' },
      gallery: { eyebrow: 'Galeria', title: 'Galeri', note: 'Momente nga projektet, terreni, materialet dhe produktet.', f_all: 'Të gjitha', f_projekte: 'Projekte', f_struktura: 'Strukturë & montim', f_furnizim: 'Furnizim & dërgesa', f_materiale: 'Materiale', f_produkte: 'Produkte' },
      location: { eyebrow: 'Ku na gjeni', title: 'Lokacioni', note: 'Na gjeni në Ratkoc, Kosovë.', adresa: 'Adresa', maps: 'Hap në Google Maps', how: 'Si të na gjeni', howText: 'Ndodhemi në Ratkoc, në komunën e Rahovecit. Përdorni butonin më lart për të hapur drejtimet në Google Maps.' },
      contact: { eyebrow: 'Kontakti', title1: 'Le ta fillojmë', title2: 'projektin tuaj.', intro: 'Na shkruani ose telefononi — jemi këtu për t\'ju ndihmuar të gjeni zgjidhjen e duhur.', telefon: 'Telefon', email: 'Email', adresa: 'Adresa', telHint: 'Telefono tani →', emailHint: 'Dërgo email →' },
      form: { emri: 'Emri', mbiemri: 'Mbiemri', telefoni: 'Telefoni', email: 'Email', lloji: 'Lloji i projektit', mesazhi: 'Mesazhi', zgjidhni: 'Zgjidhni…', o_ndertim: 'Ndërtim', o_renovim: 'Renovim', o_furnizim: 'Furnizim me materiale', o_elektrik: 'Instalime elektrike', o_sanitar: 'Instalime sanitare', o_tjeter: 'Tjetër', dergo: 'Dërgo kërkesën', note: 'Duke dërguar kërkesën, hapet aplikacioni juaj i email-it me të dhënat e plotësuara, gati për dërgim te Cimi Group SA.', err: 'Ju lutem plotësoni fushat e kërkuara (emri, mbiemri, email i vlefshëm dhe mesazhi).', sending: 'Po hapet aplikacioni juaj i email-it…' },
      final: { title1: 'Projekti juaj', title2: 'fillon këtu.', sub: 'Pavarësisht nëse bëhet fjalë për ndërtim, renovim apo furnizim me materiale, Cimi Group SA është këtu për t\'ju ndihmuar të gjeni zgjidhjen e duhur.' },
      footer: { desc: 'Materiale, zgjidhje dhe mbështetje për projekte ndërtimore.', menu: 'Menuja', kontakti: 'Kontakti', rights: 'Të gjitha të drejtat e rezervuara.' },
      brands: { note: 'Prodhues dhe marka europiane sipas fushave' },
      home: 'Ballina'
    },

    fr: {
      nav: { ballina: 'Accueil', projekte: 'Projets', materialet: 'Matériaux', partneret: 'Nos marques', terren: 'Sur chantier', galeri: 'Galerie', lokacioni: 'Emplacement', kontakti: 'Contact' },
      cta: { shiko: 'Voir les projets', nakontakto: 'Contactez-nous', shikoProjektin: 'Voir le projet', telefono: 'Appeler', pwa: 'Installer l\'application' },
      hero: { eyebrow: 'Cimi Group SA · Ratkoc, Kosovo', t1: 'Du début,', accent: 'jusqu\'à l\'achèvement.', sub: 'Cimi Group SA fournit des matériaux de construction, des solutions professionnelles et un accompagnement sur chantier pour divers projets de construction.' },
      trust: { a: 'Matériaux sélectionnés', b: 'Produits européens', c: 'Solutions professionnelles', d: 'Accompagnement sur chantier' },
      about: { eyebrow: 'Qui sommes-nous', title1: 'Plus que des', title2: 'matériaux de construction.', lead: 'Cimi Group SA n\'est pas seulement l\'endroit où l\'on achète des matériaux. C\'est un partenaire pour les particuliers et les entreprises qui veulent réaliser un projet de manière organisée et professionnelle.', p2: 'De la fourniture des bons matériaux aux solutions sur mesure et à l\'accompagnement direct sur le chantier — nous voulons être le partenaire unique qui accompagne le projet de la première idée jusqu\'à son achèvement.', pt1: 'Fourniture de matériaux pour une large gamme de projets.', pt2: 'Solutions professionnelles adaptées aux besoins du projet.', pt3: 'Collaboration et accompagnement jusqu\'à l\'achèvement.' },
      materials: { eyebrow: 'Ce que nous offrons', title: 'Catégories de matériaux', note: 'Une large gamme de matériaux et de produits pour la construction, la rénovation et l\'approvisionnement professionnel.', includes: 'Comprend', explore: 'Toutes les catégories', viewAll: 'Voir les matériaux' },
      process: { eyebrow: 'Comment nous travaillons', title: 'Du début à l\'achèvement', note: 'Un parcours clair — de la planification à l\'achèvement du projet.' },
      projects: { eyebrow: 'Portfolio', title: 'Projets', note: 'Une sélection de projets — fourniture, solutions et accompagnement sur chantier.', viewAll: 'Voir tous les projets', featured: 'Projet en vedette', hasVideo: 'Avec vidéo' },
      project: { kategoria: 'Catégorie', lokacioni: 'Emplacement', viti: 'Année', materialet: 'Matériaux utilisés', galeria: 'Galerie du projet', video: 'Vidéos du chantier' },
      partners: { eyebrow: 'Nos partenaires', title: 'Les marques que nous distribuons', note: 'Nous représentons et fournissons des produits européens, choisis pour leur qualité et leur standard professionnel.', gewissKicker: 'Produit italien', gewissTag: 'Solutions italiennes. Standard professionnel.', gewissDesc: 'Nous représentons GEWISS — des solutions italiennes pour installations électriques et des matériaux professionnels, utilisés dans les projets de construction.', disclaimer: 'Les marques listées sont des fabricants européens dont les produits peuvent être fournis selon les besoins du projet. Les logos officiels sont ajoutés selon leur disponibilité.', viewAll: 'Toutes les marques' },
      field: { eyebrow: 'La réalité du terrain', title: 'Travail sur chantier', note: 'Matériaux, installations et travail réel — documentés directement depuis le chantier.', viewAll: 'Voir le travail sur chantier' },
      gallery: { eyebrow: 'Galerie', title: 'Galerie', note: 'Moments des projets, du chantier, des matériaux et des produits.', f_all: 'Toutes', f_projekte: 'Projets', f_struktura: 'Structure & montage', f_furnizim: 'Fourniture & livraison', f_materiale: 'Matériaux', f_produkte: 'Produits' },
      location: { eyebrow: 'Où nous trouver', title: 'Emplacement', note: 'Retrouvez-nous à Ratkoc, au Kosovo.', adresa: 'Adresse', maps: 'Ouvrir dans Google Maps', how: 'Comment nous trouver', howText: 'Nous sommes situés à Ratkoc, dans la commune de Rahovec. Utilisez le bouton ci-dessus pour ouvrir l\'itinéraire dans Google Maps.' },
      contact: { eyebrow: 'Contact', title1: 'Commençons', title2: 'votre projet.', intro: 'Écrivez-nous ou appelez-nous — nous sommes là pour vous aider à trouver la bonne solution.', telefon: 'Téléphone', email: 'E-mail', adresa: 'Adresse', telHint: 'Appeler maintenant →', emailHint: 'Envoyer un e-mail →' },
      form: { emri: 'Prénom', mbiemri: 'Nom', telefoni: 'Téléphone', email: 'E-mail', lloji: 'Type de projet', mesazhi: 'Message', zgjidhni: 'Choisir…', o_ndertim: 'Construction', o_renovim: 'Rénovation', o_furnizim: 'Fourniture de matériaux', o_elektrik: 'Installations électriques', o_sanitar: 'Installations sanitaires', o_tjeter: 'Autre', dergo: 'Envoyer la demande', note: 'En envoyant la demande, votre application e-mail s\'ouvre avec les informations remplies, prête à être envoyée à Cimi Group SA.', err: 'Veuillez remplir les champs requis (prénom, nom, e-mail valide et message).', sending: 'Ouverture de votre application e-mail…' },
      final: { title1: 'Votre projet', title2: 'commence ici.', sub: 'Qu\'il s\'agisse de construction, de rénovation ou de fourniture de matériaux, Cimi Group SA est là pour vous aider à trouver la bonne solution.' },
      footer: { desc: 'Matériaux, solutions et accompagnement pour projets de construction.', menu: 'Menu', kontakti: 'Contact', rights: 'Tous droits réservés.' },
      brands: { note: 'Fabricants et marques européens par domaine' },
      home: 'Accueil'
    },

    de: {
      nav: { ballina: 'Startseite', projekte: 'Projekte', materialet: 'Materialien', partneret: 'Unsere Marken', terren: 'Vor Ort', galeri: 'Galerie', lokacioni: 'Standort', kontakti: 'Kontakt' },
      cta: { shiko: 'Projekte ansehen', nakontakto: 'Kontakt aufnehmen', shikoProjektin: 'Projekt ansehen', telefono: 'Anrufen', pwa: 'App installieren' },
      hero: { eyebrow: 'Cimi Group SA · Ratkoc, Kosovo', t1: 'Vom Anfang,', accent: 'bis zur Fertigstellung.', sub: 'Cimi Group SA liefert Baumaterialien, professionelle Lösungen und Unterstützung vor Ort für verschiedene Bauprojekte.' },
      trust: { a: 'Ausgewählte Materialien', b: 'Europäische Produkte', c: 'Professionelle Lösungen', d: 'Unterstützung vor Ort' },
      about: { eyebrow: 'Wer wir sind', title1: 'Mehr als nur', title2: 'Baumaterialien.', lead: 'Cimi Group SA ist nicht nur der Ort, an dem man Materialien kauft. Wir sind ein Partner für Menschen und Unternehmen, die ein Projekt organisiert und professionell umsetzen möchten.', p2: 'Von der Lieferung der richtigen Materialien über maßgeschneiderte Lösungen bis zur direkten Unterstützung vor Ort — wir möchten der eine Partner sein, der das Projekt von der ersten Idee bis zur Fertigstellung begleitet.', pt1: 'Materiallieferung für ein breites Spektrum an Projekten.', pt2: 'Professionelle Lösungen, abgestimmt auf die Projektanforderungen.', pt3: 'Zusammenarbeit und Unterstützung bis zur Fertigstellung.' },
      materials: { eyebrow: 'Was wir bieten', title: 'Materialkategorien', note: 'Ein breites Sortiment an Materialien und Produkten für Bau, Renovierung und professionelle Versorgung.', includes: 'Umfasst', explore: 'Alle Kategorien', viewAll: 'Materialien ansehen' },
      process: { eyebrow: 'Wie wir arbeiten', title: 'Vom Anfang bis zur Fertigstellung', note: 'Ein klarer Weg — von der Planung bis zum Projektabschluss.' },
      projects: { eyebrow: 'Portfolio', title: 'Projekte', note: 'Eine Auswahl von Projekten — Lieferung, Lösungen und Unterstützung vor Ort.', viewAll: 'Alle Projekte ansehen', featured: 'Ausgewähltes Projekt', hasVideo: 'Mit Video' },
      project: { kategoria: 'Kategorie', lokacioni: 'Standort', viti: 'Jahr', materialet: 'Verwendete Materialien', galeria: 'Projektgalerie', video: 'Videos von der Arbeit' },
      partners: { eyebrow: 'Partnerschaften', title: 'Marken, mit denen wir arbeiten', note: 'Wir vertreten und liefern europäische Produkte, ausgewählt für Qualität und professionellen Standard.', gewissKicker: 'Italienisches Produkt', gewissTag: 'Italienische Lösungen. Professioneller Standard.', gewissDesc: 'Wir vertreten GEWISS — italienische Lösungen für Elektroinstallationen und professionelle Materialien, eingesetzt in Bauprojekten.', disclaimer: 'Die aufgeführten Marken sind europäische Hersteller, deren Produkte je nach Projektbedarf beschafft werden können. Offizielle Logos werden nach Verfügbarkeit ergänzt.', viewAll: 'Alle Marken' },
      field: { eyebrow: 'Die Realität der Arbeit', title: 'Arbeit vor Ort', note: 'Materialien, Installationen und echte Arbeit — direkt vom Einsatzort dokumentiert.', viewAll: 'Arbeit vor Ort ansehen' },
      gallery: { eyebrow: 'Galerie', title: 'Galerie', note: 'Momente aus Projekten, vom Einsatzort, von Materialien und Produkten.', f_all: 'Alle', f_projekte: 'Projekte', f_struktura: 'Struktur & Montage', f_furnizim: 'Lieferung & Zustellung', f_materiale: 'Materialien', f_produkte: 'Produkte' },
      location: { eyebrow: 'Wo Sie uns finden', title: 'Standort', note: 'Sie finden uns in Ratkoc, Kosovo.', adresa: 'Adresse', maps: 'In Google Maps öffnen', how: 'So finden Sie uns', howText: 'Wir befinden uns in Ratkoc, in der Gemeinde Rahovec. Nutzen Sie die Schaltfläche oben, um die Route in Google Maps zu öffnen.' },
      contact: { eyebrow: 'Kontakt', title1: 'Beginnen wir', title2: 'Ihr Projekt.', intro: 'Schreiben oder rufen Sie uns an — wir helfen Ihnen, die richtige Lösung zu finden.', telefon: 'Telefon', email: 'E-Mail', adresa: 'Adresse', telHint: 'Jetzt anrufen →', emailHint: 'E-Mail senden →' },
      form: { emri: 'Vorname', mbiemri: 'Nachname', telefoni: 'Telefon', email: 'E-Mail', lloji: 'Projektart', mesazhi: 'Nachricht', zgjidhni: 'Auswählen…', o_ndertim: 'Bau', o_renovim: 'Renovierung', o_furnizim: 'Materiallieferung', o_elektrik: 'Elektroinstallationen', o_sanitar: 'Sanitärinstallationen', o_tjeter: 'Sonstiges', dergo: 'Anfrage senden', note: 'Beim Senden der Anfrage öffnet sich Ihre E-Mail-App mit den ausgefüllten Angaben, bereit zum Senden an Cimi Group SA.', err: 'Bitte füllen Sie die erforderlichen Felder aus (Vorname, Nachname, gültige E-Mail und Nachricht).', sending: 'Ihre E-Mail-App wird geöffnet…' },
      final: { title1: 'Ihr Projekt', title2: 'beginnt hier.', sub: 'Ob Bau, Renovierung oder Materiallieferung — Cimi Group SA hilft Ihnen, die richtige Lösung zu finden.' },
      footer: { desc: 'Materialien, Lösungen und Unterstützung für Bauprojekte.', menu: 'Menü', kontakti: 'Kontakt', rights: 'Alle Rechte vorbehalten.' },
      brands: { note: 'Europäische Hersteller und Marken nach Bereich' },
      home: 'Startseite'
    }
  };

  let current = 'sq';
  const listeners = [];

  function detectInitial() {
    try {
      const saved = localStorage.getItem('cimi-lang');
      if (saved && DICT[saved]) return saved;
    } catch (_) {}
    return 'sq';
  }

  function get(path, lang) {
    const d = DICT[lang || current];
    return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : null), d);
  }

  const I18N = {
    langs: LANGS,
    get lang() { return current; },
    t(path) { const v = get(path); return v == null ? path : v; },
    set(code) {
      if (!DICT[code] || code === current) { if (DICT[code]) { current = code; } }
      current = DICT[code] ? code : current;
      try { localStorage.setItem('cimi-lang', current); } catch (_) {}
      document.documentElement.lang = current;
      listeners.forEach((cb) => { try { cb(current); } catch (_) {} });
    },
    onChange(cb) { listeners.push(cb); },
    init() { current = detectInitial(); document.documentElement.lang = current; }
  };

  I18N.init();
  window.I18N = I18N;
})();
