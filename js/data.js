/* ============================================================================
   data.js — Përmbajtja shumëgjuhëshe (sq / fr / de)
   Fushat e përkthyeshme: { sq:'…', fr:'…', de:'…' }.  Redakto lirisht.
   ========================================================================== */
(function () {
  'use strict';

  /* Kategoritë e dyqanit — produktet reale të Cimi Group SA.
     Teksti pas " — " shfaqet si nën-rresht (p.sh. "të gjitha llojet"). */
  var CATEGORIES = [
    { key: 'cimento',
      name: { sq: 'Çimento & Llaç', fr: 'Ciment & Mortier', de: 'Zement & Mörtel' },
      desc: { sq: 'Çimento në thasë dhe lidhës për muraturë, gati për çdo kantier.', fr: 'Ciment en sacs et liant de maçonnerie, prêts pour tout chantier.', de: 'Sackzement und Mauerbinder, bereit für jede Baustelle.' },
      items: { sq: ['Çimento 42.5 PC — 25 kg', 'Sharrmall — 25 kg'], fr: ['Ciment 42.5 PC — 25 kg', 'Sharrmall — 25 kg'], de: ['Zement 42.5 PC — 25 kg', 'Sharrmall — 25 kg'] } },
    { key: 'muratura',
      name: { sq: 'Blloqe & Oxhaqe', fr: 'Blocs & Cheminées', de: 'Ziegel & Schornsteine' },
      desc: { sq: 'Blloqe giter për mure dhe sisteme oxhaqesh për ngrohje.', fr: 'Blocs creux pour la maçonnerie et systèmes de cheminée pour le chauffage.', de: 'Gitterziegel für Mauerwerk und Schornsteinsysteme für die Heizung.' },
      items: { sq: ['Bllok giter Tulltore', 'Bllok giter Rizam', 'Oxhak Ø18', 'Oxhak Ø16', 'Oxhak për ngrohje'], fr: ['Bloc creux Tulltore', 'Bloc creux Rizam', 'Conduit de cheminée Ø18', 'Conduit de cheminée Ø16', 'Cheminée de chauffage'], de: ['Gitterziegel Tulltore', 'Gitterziegel Rizam', 'Schornstein Ø18', 'Schornstein Ø16', 'Heizungsschornstein'] } },
    { key: 'hekur',
      name: { sq: 'Hekur & Fiksim', fr: 'Fer & Fixation', de: 'Eisen & Befestigung' },
      desc: { sq: 'Hekur betoni, rrjeta dhe elemente fiksimi për strukturë e armaturë.', fr: 'Fer à béton, treillis et éléments de fixation pour structure et armatures.', de: 'Betonstahl, Matten und Befestigungselemente für Struktur und Bewehrung.' },
      items: { sq: ['Hekur — dimensione të ndryshme', 'Rrjeta hekuri — dimensione të ndryshme', 'Kondor — të ndryshme', 'Bulona metalike — të ndryshme', 'Tipla betoni'], fr: ['Fer à béton — diverses dimensions', 'Treillis soudés — diverses dimensions', 'Kondor — divers', 'Boulons métalliques — divers', 'Chevilles pour béton'], de: ['Betonstahl — verschiedene Abmessungen', 'Baustahlmatten — verschiedene Abmessungen', 'Kondor — verschiedene', 'Metallbolzen — verschiedene', 'Betondübel'] } },
    { key: 'kulm',
      name: { sq: 'Kulm & Mbulesë', fr: 'Toiture & Couverture', de: 'Dach & Eindeckung' },
      desc: { sq: 'Sisteme të plota kulmi nga Tondach dhe Creaton — tjegulla, kulmarë dhe aksesorë.', fr: 'Systèmes de toiture complets Tondach et Creaton — tuiles, faîtières et accessoires.', de: 'Komplette Dachsysteme von Tondach und Creaton — Ziegel, Firste und Zubehör.' },
      items: { sq: ['Tjegulla Tondach — të gjitha llojet', 'Kulmar Tondach', 'Folie kulmi Tondach', 'Folie ventiluese për kulmar', 'Kapëse kulmaresh', 'Tjegulla Creaton', 'Kulmar Creaton', 'Bitolit'], fr: ['Tuiles Tondach — tous types', 'Faîtières Tondach', 'Écran de sous-toiture Tondach', 'Closoir ventilé pour faîtage', 'Crochets de faîtière', 'Tuiles Creaton', 'Faîtières Creaton', 'Bitolit'], de: ['Dachziegel Tondach — alle Arten', 'Firstziegel Tondach', 'Unterdachbahn Tondach', 'Firstlüftungsband', 'Firstklammern', 'Dachziegel Creaton', 'Firstziegel Creaton', 'Bitolit'] } },
    { key: 'izolim',
      name: { sq: 'Termoizolim', fr: 'Isolation thermique', de: 'Wärmedämmung' },
      desc: { sq: 'Pllaka izoluese dhe ngjitës për fasada, dysheme e themele.', fr: 'Panneaux isolants et colles pour façades, sols et fondations.', de: 'Dämmplatten und Kleber für Fassaden, Böden und Fundamente.' },
      items: { sq: ['Styropor — dimensione të ndryshme', 'Ngjitës për styropor — të ndryshëm', 'Styrodur — dimensione të ndryshme'], fr: ['Styropor — diverses dimensions', 'Colles pour polystyrène — diverses', 'Styrodur — diverses dimensions'], de: ['Styropor — verschiedene Abmessungen', 'Styroporkleber — verschiedene', 'Styrodur — verschiedene Abmessungen'] } },
    { key: 'qeramike',
      name: { sq: 'Qeramikë & Ngjitës', fr: 'Céramique & Colles', de: 'Keramik & Kleber' },
      desc: { sq: 'Pllaka qeramike, ngjitës dhe izolime për banjo, kuzhina e dysheme.', fr: 'Carrelage, colles et isolations pour salles de bain, cuisines et sols.', de: 'Fliesen, Kleber und Abdichtungen für Bad, Küche und Boden.' },
      items: { sq: ['Materiale qeramike', 'Ngjitës qeramike & izolime'], fr: ['Matériaux céramiques', 'Colles à carrelage & isolations'], de: ['Keramikmaterialien', 'Fliesenkleber & Abdichtungen'] } },
    { key: 'elektrik',
      name: { sq: 'Elektrik', fr: 'Électricité', de: 'Elektrik' },
      desc: { sq: 'Material elektrik GEWISS dhe gypa për instalime elektrike.', fr: 'Matériel électrique GEWISS et gaines pour installations électriques.', de: 'GEWISS-Elektromaterial und Rohre für Elektroinstallationen.' },
      items: { sq: ['Material elektrik GEWISS — të gjitha llojet', 'Gypa elektrikë — dimensione të ndryshme'], fr: ['Matériel électrique GEWISS — tous types', 'Gaines électriques — diverses dimensions'], de: ['Elektromaterial GEWISS — alle Arten', 'Elektro-Installationsrohre — verschiedene Abmessungen'] } },
    { key: 'sanitari',
      name: { sq: 'Hidrosanitari & Ngrohje', fr: 'Plomberie & Chauffage', de: 'Sanitär & Heizung' },
      desc: { sq: 'Gypa kanalizimi, materiale sanitare dhe ngrohje qendrore.', fr: 'Tuyaux d\'assainissement, matériel sanitaire et chauffage central.', de: 'Kanalrohre, Sanitärmaterial und Zentralheizung.' },
      items: { sq: ['Gypa kanalizimi Vargon', 'Material sanitar TM — të gjitha llojet', 'Material për ngrohje qendrore'], fr: ['Tuyaux d\'assainissement Vargon', 'Matériel sanitaire TM — tous types', 'Matériel pour chauffage central'], de: ['Kanalrohre Vargon', 'Sanitärmaterial TM — alle Arten', 'Material für Zentralheizung'] } },
    { key: 'makina',
      name: { sq: 'Makina pune', fr: 'Machines de travail', de: 'Arbeitsmaschinen' },
      desc: { sq: 'Makina dhe pajisje pune për kantier dhe punë profesionale.', fr: 'Machines et équipements pour le chantier et le travail professionnel.', de: 'Maschinen und Geräte für Baustelle und professionellen Einsatz.' },
      items: { sq: ['Makina pune — të ndryshme'], fr: ['Machines de travail — diverses'], de: ['Arbeitsmaschinen — verschiedene'] } }
  ];

  var PROCESS = [
    { no: '01', title: { sq: 'Planifikimi', fr: 'Planification', de: 'Planung' }, desc: { sq: 'Kuptojmë nevojat e projektit dhe përcaktojmë çfarë duhet.', fr: 'Nous comprenons les besoins du projet et définissons ce qu\'il faut.', de: 'Wir verstehen die Projektbedürfnisse und legen fest, was benötigt wird.' } },
    { no: '02', title: { sq: 'Përzgjedhja e materialeve', fr: 'Choix des matériaux', de: 'Materialauswahl' }, desc: { sq: 'Zgjedhim materialet e duhura për kërkesat e projektit.', fr: 'Nous choisissons les bons matériaux selon les exigences du projet.', de: 'Wir wählen die richtigen Materialien für die Projektanforderungen.' } },
    { no: '03', title: { sq: 'Furnizimi', fr: 'Approvisionnement', de: 'Lieferung' }, desc: { sq: 'Sigurojmë furnizimin e materialeve sipas nevojës.', fr: 'Nous assurons l\'approvisionnement des matériaux selon les besoins.', de: 'Wir stellen die Materialversorgung nach Bedarf sicher.' } },
    { no: '04', title: { sq: 'Transporti & Organizimi', fr: 'Transport & Organisation', de: 'Transport & Organisation' }, desc: { sq: 'Organizojmë transportin dhe dërgesën në kohën e duhur.', fr: 'Nous organisons le transport et la livraison au bon moment.', de: 'Wir organisieren Transport und Lieferung zur richtigen Zeit.' } },
    { no: '05', title: { sq: 'Puna në terren', fr: 'Travail sur chantier', de: 'Arbeit vor Ort' }, desc: { sq: 'Mbështesim realizimin e punës drejtpërdrejt në terren.', fr: 'Nous soutenons la réalisation du travail directement sur le chantier.', de: 'Wir unterstützen die Umsetzung direkt vor Ort.' } },
    { no: '06', title: { sq: 'Përfundimi', fr: 'Achèvement', de: 'Fertigstellung' }, desc: { sq: 'Projekti çohet deri te detaji i fundit, i përfunduar.', fr: 'Le projet est mené jusqu\'au moindre détail, achevé.', de: 'Das Projekt wird bis ins letzte Detail fertiggestellt.' } }
  ];

  var PROJECTS = [
    { id: 'qtx', featured: true, image: 'assets/projects/qtx-05.jpg', ratio: 'wide', location: 'Xërxe, Kosovë', year: '',
      title: { sq: 'QTX Mall — Xërxe', fr: 'QTX Mall — Xërxe', de: 'QTX Mall — Xërxe' },
      category: { sq: 'Strukturë & montim', fr: 'Structure & installation', de: 'Struktur & Montage' },
      excerpt: { sq: 'Prodhim, transport dhe montim i strukturës së çelikut dhe totemeve reklamuese për QTX Mall.', fr: 'Fabrication, transport et installation de la structure en acier et des totems publicitaires pour QTX Mall.', de: 'Fertigung, Transport und Montage der Stahlstruktur und der Werbetotems für QTX Mall.' },
      description: { sq: 'Projekt i realizuar për QTX Mall në Xërxe: prodhimi dhe montimi i shtyllave e strukturave të çelikut dhe i totemeve reklamuese, transporti dhe ngritja me vinç, si dhe instalimi i shenjave të ndriçuara — nga struktura deri te detaji i fundit.', fr: 'Projet réalisé pour QTX Mall à Xërxe : fabrication et montage des mâts et structures en acier et des totems publicitaires, transport et levage à la grue, ainsi que l\'installation des enseignes lumineuses — de la structure au moindre détail.', de: 'Projekt für QTX Mall in Xërxe: Fertigung und Montage der Stahlmasten und -strukturen sowie der Werbetotems, Transport und Kranhub und Installation der Leuchtschilder — von der Struktur bis zum letzten Detail.' },
      materials: { sq: ['Profile çeliku', 'Strukturë', 'Totem & shenja'], fr: ['Profilés acier', 'Structure', 'Totems & enseignes'], de: ['Stahlprofile', 'Struktur', 'Totems & Schilder'] },
      gallery: ['assets/projects/qtx-06.jpg', 'assets/projects/qtx-13.jpg', 'assets/projects/qtx-01.jpg', 'assets/projects/qtx-14.jpg', 'assets/projects/qtx-03.jpg', 'assets/projects/qtx-10.jpg', 'assets/projects/qtx-11.jpg'] },

    { id: 'p1', image: 'assets/projects/project-01.jpg', ratio: 'portrait', location: '', year: '',
      title: { sq: 'Furnizim për objekt banimi', fr: 'Fourniture pour une maison', de: 'Lieferung für ein Wohnhaus' },
      category: { sq: 'Furnizim & dërgesë', fr: 'Fourniture & livraison', de: 'Lieferung & Zustellung' },
      excerpt: { sq: 'Dërgesë me vinç e materialeve për ndërtimin e një objekti banimi.', fr: 'Livraison à la grue des matériaux pour la construction d\'une maison.', de: 'Kranzustellung der Materialien für den Bau eines Wohnhauses.' },
      description: { sq: 'Furnizim dhe ngritje me vinç e materialeve drejt e në kat, për ndërtimin e një objekti banimi — organizuar sipas ecurisë së punimeve.', fr: 'Fourniture et levage à la grue des matériaux directement à l\'étage, pour la construction d\'une maison — organisés selon l\'avancement des travaux.', de: 'Lieferung und Kranhub der Materialien direkt in die Etage, für den Bau eines Wohnhauses — organisiert nach Baufortschritt.' },
      materials: { sq: ['Tulla & Blloqe', 'Çimento & Beton', 'Materiale ndërtimi'], fr: ['Briques & Blocs', 'Ciment & Béton', 'Matériaux de construction'], de: ['Ziegel & Blöcke', 'Zement & Beton', 'Baumaterialien'] },
      gallery: ['assets/projects/project-01-1.jpg', 'assets/projects/project-01-2.jpg'] },

    { id: 'p2', image: 'assets/projects/project-02.jpg', ratio: 'portrait', location: '', year: '',
      title: { sq: 'Furnizim me tulla', fr: 'Fourniture de briques', de: 'Ziegellieferung' },
      category: { sq: 'Furnizim materialesh', fr: 'Fourniture de matériaux', de: 'Materiallieferung' },
      excerpt: { sq: 'Dërgesë me vinç e paletave të tullave (Porotherm / Wienerberger).', fr: 'Livraison à la grue des palettes de briques (Porotherm / Wienerberger).', de: 'Kranzustellung der Ziegelpaletten (Porotherm / Wienerberger).' },
      description: { sq: 'Furnizim me tulla cilësore, të dërguara dhe të ngritura me vinç drejt e në objekt, për ecuri të shpejtë të punimeve.', fr: 'Fourniture de briques de qualité, livrées et levées à la grue directement sur site, pour un avancement rapide des travaux.', de: 'Lieferung hochwertiger Ziegel, per Kran direkt zum Objekt geliefert und gehoben, für einen zügigen Baufortschritt.' },
      materials: { sq: ['Tulla', 'Blloqe', 'Llaç'], fr: ['Briques', 'Blocs', 'Mortier'], de: ['Ziegel', 'Blöcke', 'Mörtel'] },
      gallery: ['assets/projects/project-02-1.jpg', 'assets/projects/project-02-2.jpg'] },

    { id: 'p3', image: 'assets/projects/project-03.jpg', ratio: 'portrait', location: '', year: '',
      title: { sq: 'Strukturë & armaturë', fr: 'Structure & armatures', de: 'Struktur & Bewehrung' },
      category: { sq: 'Ndërtim banimi', fr: 'Construction résidentielle', de: 'Wohnbau' },
      excerpt: { sq: 'Materiale për strukturën dhe armaturën e një objekti banimi.', fr: 'Matériaux pour la structure et les armatures d\'une maison.', de: 'Materialien für Struktur und Bewehrung eines Wohnhauses.' },
      description: { sq: 'Furnizim me hekur, armaturë dhe materiale strukturore, të dërguara me vinç në objekt sipas nevojës në terren.', fr: 'Fourniture de fer, d\'armatures et de matériaux de structure, livrés à la grue sur site selon les besoins du chantier.', de: 'Lieferung von Eisen, Bewehrung und Strukturmaterialien, per Kran nach Bedarf zum Objekt geliefert.' },
      materials: { sq: ['Hekur', 'Rrjeta', 'Çimento & Beton'], fr: ['Fer', 'Treillis', 'Ciment & Béton'], de: ['Eisen', 'Baustahlmatten', 'Zement & Beton'] },
      gallery: ['assets/projects/project-03-1.jpg', 'assets/projects/project-03-2.jpg'] },

    { id: 'p4', image: 'assets/projects/project-04.jpg', ratio: 'portrait', location: '', year: '',
      title: { sq: 'Dërgesë me vinç në objekt', fr: 'Livraison à la grue sur site', de: 'Kranlieferung am Objekt' },
      category: { sq: 'Furnizim & terren', fr: 'Fourniture & chantier', de: 'Lieferung & Vor Ort' },
      excerpt: { sq: 'Ngritje e materialeve me vinç drejt e në katin e objektit.', fr: 'Levage des matériaux à la grue directement à l\'étage.', de: 'Materialhub per Kran direkt in die Etage.' },
      description: { sq: 'Mbështetje në terren me ngritje e materialeve me vinç, që puna të ecë pa vonesa dhe në mënyrë të organizuar.', fr: 'Accompagnement sur le chantier avec levage des matériaux à la grue, pour que les travaux avancent sans retard et de manière organisée.', de: 'Unterstützung vor Ort mit Kranhub der Materialien, damit die Arbeiten ohne Verzögerung und organisiert vorankommen.' },
      materials: { sq: ['Tulla', 'Materiale mbulese', 'Blloqe'], fr: ['Briques', 'Matériaux de toiture', 'Blocs'], de: ['Ziegel', 'Dachmaterialien', 'Blöcke'] },
      gallery: ['assets/projects/project-04-1.jpg', 'assets/projects/project-04-2.jpg'] },

    { id: 'p5', image: 'assets/projects/project-05.jpg', ratio: 'portrait', location: '', year: '',
      title: { sq: 'Transport & furnizim', fr: 'Transport & fourniture', de: 'Transport & Lieferung' },
      category: { sq: 'Logjistikë', fr: 'Logistique', de: 'Logistik' },
      excerpt: { sq: 'Transport dhe dërgesë e materialeve deri te objekti.', fr: 'Transport et livraison des matériaux jusqu\'au chantier.', de: 'Transport und Lieferung der Materialien bis zum Objekt.' },
      description: { sq: 'Organizim i transportit dhe dërgesës së materialeve deri te objekti, në kohën e duhur dhe sipas planit të punimeve.', fr: 'Organisation du transport et de la livraison des matériaux jusqu\'au chantier, au bon moment et selon le planning des travaux.', de: 'Organisation von Transport und Lieferung der Materialien bis zum Objekt, termingerecht und nach Bauplan.' },
      materials: { sq: ['Tulla', 'Tjegulla', 'Materiale ndërtimi'], fr: ['Briques', 'Tuiles', 'Matériaux de construction'], de: ['Ziegel', 'Dachziegel', 'Baumaterialien'] },
      gallery: ['assets/projects/project-05-1.jpg', 'assets/projects/project-05-2.jpg'] },

    { id: 'p6', image: 'assets/projects/project-06.jpg', ratio: 'portrait', location: '', year: '',
      title: { sq: 'Objekt komercial — profile çeliku', fr: 'Bâtiment commercial — acier', de: 'Gewerbebau — Stahl' },
      category: { sq: 'Strukturë çeliku', fr: 'Structure acier', de: 'Stahlbau' },
      excerpt: { sq: 'Furnizim me profile çeliku për strukturën e një objekti komercial.', fr: 'Fourniture de profilés acier pour la structure d\'un bâtiment commercial.', de: 'Lieferung von Stahlprofilen für die Struktur eines Gewerbebaus.' },
      description: { sq: 'Furnizim me profile dhe trarë çeliku për strukturën e një objekti komercial, të transportuara dhe të shkarkuara me pirun në terren.', fr: 'Fourniture de profilés et de poutres en acier pour la structure d\'un bâtiment commercial, transportés et déchargés au chariot élévateur sur le chantier.', de: 'Lieferung von Stahlprofilen und -trägern für die Struktur eines Gewerbebaus, per Stapler auf der Baustelle transportiert und entladen.' },
      materials: { sq: ['Profile çeliku', 'Trarë', 'Hekur'], fr: ['Profilés acier', 'Poutres', 'Fer'], de: ['Stahlprofile', 'Träger', 'Eisen'] },
      gallery: ['assets/projects/project-06-1.jpg', 'assets/projects/project-06-2.jpg'] }
  ];

  var FIELD = [
    { image: 'assets/field-work/field-01.jpg', ratio: 'portrait', size: 'lg', caption: { sq: 'Ngarkim materialesh në depo', fr: 'Chargement de matériaux au dépôt', de: 'Materialverladung im Lager' } },
    { image: 'assets/field-work/field-02.jpg', ratio: 'wide', size: 'md', caption: { sq: 'Dërgesa në bazën tonë', fr: 'Livraisons à notre dépôt', de: 'Lieferungen an unserem Standort' } },
    { image: 'assets/field-work/field-03.jpg', ratio: 'portrait', size: 'sm', caption: { sq: 'Ngarkim me vinç', fr: 'Chargement à la grue', de: 'Kranverladung' } },
    { image: 'assets/field-work/field-04.jpg', ratio: 'portrait', size: 'md', caption: { sq: 'Dërgesë me vinç në kat', fr: 'Livraison à la grue en étage', de: 'Kranlieferung in die Etage' } },
    { image: 'assets/field-work/field-05.jpg', ratio: 'portrait', size: 'md', caption: { sq: 'Ngritje materialesh në objekt', fr: 'Levage de matériaux sur site', de: 'Materialhub am Objekt' } },
    { image: 'assets/field-work/field-06.jpg', ratio: 'portrait', size: 'lg', caption: { sq: 'Furnizim tullash në terren', fr: 'Fourniture de briques sur chantier', de: 'Ziegellieferung vor Ort' } },
    { image: 'assets/field-work/field-07.jpg', ratio: 'portrait', size: 'sm', caption: { sq: 'Punë në kantier', fr: 'Travail sur le chantier', de: 'Arbeit auf der Baustelle' } },
    { image: 'assets/field-work/field-08.jpg', ratio: 'portrait', size: 'md', caption: { sq: 'Dërgesë me vinç', fr: 'Livraison à la grue', de: 'Kranlieferung' } },
    { image: 'assets/field-work/field-09.jpg', ratio: 'portrait', size: 'md', caption: { sq: 'Objekt gjatë ndërtimit', fr: 'Bâtiment en construction', de: 'Gebäude im Bau' } }
  ];

  var GALLERY = [
    { image: 'assets/gallery/gallery-01.jpg', ratio: 'wide', cat: 'materiale', caption: { sq: 'Depoja jonë', fr: 'Notre dépôt', de: 'Unser Lager' } },
    { image: 'assets/gallery/gallery-02.jpg', ratio: 'wide', cat: 'materiale', caption: { sq: 'Materiale në depo', fr: 'Matériaux en dépôt', de: 'Materialien im Lager' } },
    { image: 'assets/gallery/gallery-03.jpg', ratio: 'wide', cat: 'materiale', caption: { sq: 'Tuba & materiale', fr: 'Tuyaux & matériaux', de: 'Rohre & Materialien' } },
    { image: 'assets/gallery/gallery-04.jpg', ratio: 'portrait', cat: 'materiale', caption: { sq: 'Profile në depo', fr: 'Profilés en dépôt', de: 'Profile im Lager' } },
    { image: 'assets/gallery/gallery-05.jpg', ratio: 'wide', cat: 'furnizim', caption: { sq: 'Baza & furnizimi', fr: 'Le dépôt & la fourniture', de: 'Standort & Versorgung' } },
    { image: 'assets/gallery/gallery-06.jpg', ratio: 'portrait', cat: 'furnizim', caption: { sq: 'Dërgesa te objekti', fr: 'Livraisons au chantier', de: 'Lieferungen zum Objekt' } },
    { image: 'assets/gallery/gallery-07.jpg', ratio: 'portrait', cat: 'furnizim', caption: { sq: 'Transport & dërgesë', fr: 'Transport & livraison', de: 'Transport & Lieferung' } },
    { image: 'assets/gallery/gallery-08.jpg', ratio: 'wide', cat: 'produkte', caption: { sq: 'Produkte gati për dërgesë', fr: 'Produits prêts à livrer', de: 'Lieferfertige Produkte' } },
    { image: 'assets/gallery/gallery-09.jpg', ratio: 'wide', cat: 'projekte', caption: { sq: 'Baza e Cimi Group', fr: 'Le siège de Cimi Group', de: 'Der Standort von Cimi Group' } },
    { image: 'assets/gallery/gallery-10.jpg', ratio: 'portrait', cat: 'projekte', caption: { sq: 'Objekti ynë', fr: 'Nos locaux', de: 'Unser Gebäude' } },
    { image: 'assets/gallery/gallery-11.jpg', ratio: 'portrait', cat: 'projekte', caption: { sq: 'Objekt komercial', fr: 'Bâtiment commercial', de: 'Gewerbebau' } },
    { image: 'assets/gallery/gallery-12.jpg', ratio: 'portrait', cat: 'struktura', caption: { sq: 'Armaturë në terren', fr: 'Armatures sur chantier', de: 'Bewehrung vor Ort' } },
    { image: 'assets/gallery/gallery-13.jpg', ratio: 'portrait', cat: 'produkte', caption: { sq: 'Profile çeliku', fr: 'Profilés acier', de: 'Stahlprofile' } },
    { image: 'assets/gallery/gallery-14.jpg', ratio: 'portrait', cat: 'produkte', caption: { sq: 'Elemente çeliku', fr: 'Éléments en acier', de: 'Stahlelemente' } },
    { image: 'assets/projects/qtx-05.jpg', ratio: 'wide', cat: 'projekte', caption: { sq: 'QTX Mall — Xërxe', fr: 'QTX Mall — Xërxe', de: 'QTX Mall — Xërxe' } },
    { image: 'assets/projects/qtx-06.jpg', ratio: 'portrait', cat: 'struktura', caption: { sq: 'Montim i shenjës QTX Mall', fr: 'Installation de l\'enseigne QTX Mall', de: 'Montage des QTX-Mall-Schilds' } },
    { image: 'assets/projects/qtx-13.jpg', ratio: 'portrait', cat: 'struktura', caption: { sq: 'Totem reklamues', fr: 'Totem publicitaire', de: 'Werbetotem' } },
    { image: 'assets/projects/qtx-01.jpg', ratio: 'portrait', cat: 'struktura', caption: { sq: 'Montim strukture çeliku', fr: 'Montage de structure acier', de: 'Stahlstruktur-Montage' } },
    { image: 'assets/projects/qtx-14.jpg', ratio: 'portrait', cat: 'struktura', caption: { sq: 'Strukturë çeliku QTX', fr: 'Structure acier QTX', de: 'QTX-Stahlstruktur' } },
    { image: 'assets/projects/qtx-11.jpg', ratio: 'wide', cat: 'projekte', caption: { sq: 'QTX Mall gjatë punimeve', fr: 'QTX Mall pendant les travaux', de: 'QTX Mall während der Arbeiten' } }
  ];

  var PARTNERS_FEATURED = [
    { name: 'GEWISS', origin: 'Itali', logo: 'assets/brands/gewiss.svg' },
    { name: 'TM', origin: 'Itali', logo: 'assets/brands/tm.svg' }
  ];

  /* Ekosistemi i markave europiane, i grupuar sipas fushës.
     GEWISS & TM janë të konfirmuara; të tjerat janë prodhues europianë
     produktet e të cilëve mund të sigurohen sipas kërkesës. */
  var BRAND_GROUPS = [
    { key: 'elektrik', icon: 'M13 2 4 14h7l-1 8 9-12h-7z',
      title: { sq: 'Instalime elektrike', fr: 'Installations électriques', de: 'Elektroinstallationen' },
      sub: { sq: 'Priza, çelësa, gypa, komponentë', fr: 'Prises, interrupteurs, gaines, composants', de: 'Steckdosen, Schalter, Rohre, Komponenten' },
      brands: [{ name: 'GEWISS', featured: true }, { name: 'TM', featured: true }, { name: 'Schneider Electric' }, { name: 'ABB' }, { name: 'Legrand' }] },
    { key: 'kulm', icon: 'M2 12l10-8 10 8M5 10v10h14V10M9 20v-6h6v6',
      title: { sq: 'Kulm & mbulesë', fr: 'Toiture & couverture', de: 'Dach & Eindeckung' },
      sub: { sq: 'Tjegulla, kulmarë, folie kulmi', fr: 'Tuiles, faîtières, écrans de sous-toiture', de: 'Dachziegel, Firste, Unterdachbahnen' },
      brands: [{ name: 'Tondach', featured: true }, { name: 'Creaton', featured: true }] },
    { key: 'muratura', icon: 'M3 6h18v12H3zM3 12h18M9 6v6M15 12v6',
      title: { sq: 'Blloqe, çimento & lidhës', fr: 'Blocs, ciment & liants', de: 'Ziegel, Zement & Binder' },
      sub: { sq: 'Blloqe giter, çimento, sharrmall', fr: 'Blocs creux, ciment, liant Sharrmall', de: 'Gitterziegel, Zement, Sharrmall' },
      brands: [{ name: 'Tulltore', featured: true }, { name: 'Rizam', featured: true }, { name: 'Sharrmall', featured: true }] },
    { key: 'sanitari', icon: 'M6 12V5a2 2 0 012-2h1M4 12h16v3a5 5 0 01-5 5H9a5 5 0 01-5-5z',
      title: { sq: 'Hidrosanitari, kanalizim & ngrohje', fr: 'Sanitaire, assainissement & chauffage', de: 'Sanitär, Kanalisation & Heizung' },
      sub: { sq: 'Gypa kanalizimi, sanitari, ngrohje qendrore', fr: 'Tuyaux, sanitaire, chauffage central', de: 'Kanalrohre, Sanitär, Zentralheizung' },
      brands: [{ name: 'Vargon', featured: true }, { name: 'TM', featured: true }, { name: 'Geberit' }, { name: 'Grohe' }] },
    { key: 'cimento', icon: 'M3 17l7-7 4 4 7-7M3 21h18',
      title: { sq: 'Ngjitës, qeramikë & rifinitura', fr: 'Colles, céramique & finitions', de: 'Kleber, Keramik & Finish' },
      sub: { sq: 'Ngjitës qeramike, llaçe, suva', fr: 'Colles à carrelage, mortiers, enduits', de: 'Fliesenkleber, Mörtel, Putze' },
      brands: [{ name: 'Sika' }, { name: 'Mapei' }, { name: 'Knauf' }] },
    { key: 'izolim', icon: 'M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5',
      title: { sq: 'Termoizolim', fr: 'Isolation thermique', de: 'Wärmedämmung' },
      sub: { sq: 'Styropor, styrodur & sisteme izolimi', fr: 'Polystyrène, Styrodur & systèmes d\'isolation', de: 'Styropor, Styrodur & Dämmsysteme' },
      brands: [{ name: 'Rockwool' }, { name: 'Knauf Insulation' }] },
    { key: 'ngjyra', icon: 'M4 20s1-4 4-4 4 3 8-1M14 14l6-6a2 2 0 00-3-3l-6 6',
      title: { sq: 'Ngjyra & mbrojtje', fr: 'Peintures & protection', de: 'Farben & Schutz' },
      sub: { sq: 'Ngjyra, boje, mbrojtje sipërfaqesh', fr: 'Peintures, protection des surfaces', de: 'Farben, Oberflächenschutz' },
      brands: [{ name: 'Caparol' }, { name: 'Jotun' }] }
  ];

  window.CIMI_DATA = { CATEGORIES: CATEGORIES, PROCESS: PROCESS, PROJECTS: PROJECTS, FIELD: FIELD, GALLERY: GALLERY, PARTNERS_FEATURED: PARTNERS_FEATURED, BRAND_GROUPS: BRAND_GROUPS };
})();
