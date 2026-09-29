// ===== اكتشف الأردن: shared logic =====

// ---------- Helpers ----------
const $ = (selector) => document.querySelector(selector);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------- Language ----------
const LANGUAGES = { ar: 'العربية', en: 'English', it: 'Italiano' };
const RTL_LANGUAGES = ['ar'];
const FALLBACK_LANG = 'en';

const lang = LANGUAGES[localStorage.lang] ? localStorage.lang : 'ar';

document.documentElement.lang = lang;
document.documentElement.dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';

// Pick the current language from a {ar, en, it} object, fall back to English
const pick = (field) => field[lang] || field[FALLBACK_LANG];

const TRANSLATIONS = {
  ar: {
    home: 'الرئيسية',
    explore: 'استكشف',
    plan: 'تخطيط الذكاء الاصطناعي',
    hk: 'رحلة مصممة بالذكاء الاصطناعي',
    ht: 'اكتشف الأردن <b>بطريقتك</b>',
    hs: 'رحلتك المثالية تبدأ من اهتماماتك. دع الذكاء الاصطناعي يصمم لك تجربة أردنية أصيلة.',
    cta: 'ابدأ التخطيط بالذكاء الاصطناعي',
    cta2: 'استكشف الوجهات',
    ft: 'نحو رحلة أردنية أكثر ذكاءً وأصالة.',
    rt: 'اكتشف الأردن. جميع الحقوق محفوظة.',
    pt: 'خطط رحلتك',
    pi: 'ما الذي يهمك؟',
    days: 'عدد الأيام',
    city: 'مدينة الانطلاق',
    go: 'أنشئ خطتي',
    why: '✨ لماذا اخترناه لك؟',
    whyt: 'لأن اهتماماتك تطابق هذه الأماكن، ورتبناها من الأكثر تميزًا إلى الأقل.',
    day: 'اليوم',
    et: 'استكشف الوجهات',
    es: 'الأماكن مقسمة حسب تفرّدها، من 5 نجوم إلى نجمة واحدة.',
    maps: 'افتح في الخرائط',
    time: 'الوقت المقترح',
    cost: 'التكلفة',
    dist: 'من عمّان',
    hr: 'ساعات',
    jod: 'د.أ',
    km: 'كم',
    history: 'تاريخ',
    nature: 'طبيعة',
    desert: 'صحراء',
    sea: 'بحر',
    food: 'طعام',
    adventure: 'مغامرة',
    amman: 'عمّان',
    aqaba: 'العقبة',
    nf: 'اختر اهتمامًا واحدًا على الأقل.',
    noResults: 'ما لقينا أماكن تطابق اهتماماتك. جرّب اهتمامات ثانية.',
    ek: 'خطتك. ذوقك. الأردن.',
    et2: 'مسار كامل، صُمّم لأجلك',
    es2: 'من أول فنجان قهوة في عمّان إلى آخر غروب في وادي رم.',
    unf: 'مكان لا يُنسى',
    disc: 'اكتشف',
    z5: 'تجربة لا تتكرر',
    z4: 'استثنائي',
    z3: 'مميز',
    z2: 'يستحق الزيارة',
    z1: 'محطة سريعة',
    l1: 'تحليل اهتماماتك',
    l2: 'حساب المسافات',
    l3: 'تجهيز خطتك اليومية',
  },
  en: {
    home: 'Home',
    explore: 'Explore',
    plan: 'AI Planner',
    hk: 'AI-designed trips',
    ht: 'Discover Jordan <b>Your Way</b>',
    hs: 'Your perfect trip starts with your interests. Let AI design an authentic Jordanian experience.',
    cta: 'Start planning with AI',
    cta2: 'Explore destinations',
    ft: 'Toward a smarter, more authentic Jordan trip.',
    rt: 'Discover Jordan. All rights reserved.',
    pt: 'Plan your trip',
    pi: 'What interests you?',
    days: 'Days',
    city: 'Starting city',
    go: 'Create my plan',
    why: '✨ Why we chose this',
    whyt: 'These places match your interests, ordered from most unique to least.',
    day: 'Day',
    et: 'Explore destinations',
    es: 'Places grouped by uniqueness, from 5 stars down to 1.',
    maps: 'Open in Maps',
    time: 'Suggested time',
    cost: 'Cost',
    dist: 'From Amman',
    hr: 'hours',
    jod: 'JOD',
    km: 'km',
    history: 'History',
    nature: 'Nature',
    desert: 'Desert',
    sea: 'Sea',
    food: 'Food',
    adventure: 'Adventure',
    amman: 'Amman',
    aqaba: 'Aqaba',
    nf: 'Pick at least one interest.',
    noResults: 'No places match your interests. Try different ones.',
    ek: 'Your plan. Your taste. Jordan.',
    et2: 'A full route, designed for you',
    es2: 'From the first coffee in Amman to the last sunset in Wadi Rum.',
    unf: 'Unforgettable place',
    disc: 'Discover',
    z5: 'Once in a lifetime',
    z4: 'Exceptional',
    z3: 'Distinctive',
    z2: 'Worth a visit',
    z1: 'Quick stop',
    l1: 'Analyzing your interests',
    l2: 'Calculating distances',
    l3: 'Preparing your daily plan',
  },
  it: {
    home: 'Home',
    explore: 'Esplora',
    plan: 'Pianificatore IA',
    hk: "Viaggi progettati con l'IA",
    ht: 'Scopri la Giordania <b>a modo tuo</b>',
    hs: "Il tuo viaggio perfetto parte dai tuoi interessi. Lascia che l'IA progetti per te un'autentica esperienza giordana.",
    cta: "Inizia a pianificare con l'IA",
    cta2: 'Esplora le destinazioni',
    ft: 'Verso un viaggio in Giordania più intelligente e autentico.',
    rt: 'Scopri la Giordania. Tutti i diritti riservati.',
    pt: 'Pianifica il tuo viaggio',
    pi: 'Cosa ti interessa?',
    days: 'Numero di giorni',
    city: 'Città di partenza',
    go: 'Crea il mio piano',
    why: '✨ Perché lo abbiamo scelto per te',
    whyt: 'Questi luoghi corrispondono ai tuoi interessi, ordinati dal più unico al meno unico.',
    day: 'Giorno',
    et: 'Esplora le destinazioni',
    es: 'Luoghi raggruppati per unicità, da 5 stelle a 1.',
    maps: 'Apri in Maps',
    time: 'Tempo consigliato',
    cost: 'Costo',
    dist: 'Da Amman',
    hr: 'ore',
    jod: 'JOD',
    km: 'km',
    history: 'Storia',
    nature: 'Natura',
    desert: 'Deserto',
    sea: 'Mare',
    food: 'Cibo',
    adventure: 'Avventura',
    amman: 'Amman',
    aqaba: 'Aqaba',
    nf: 'Scegli almeno un interesse.',
    noResults: 'Nessun luogo corrisponde ai tuoi interessi. Prova con interessi diversi.',
    ek: 'Il tuo piano. I tuoi gusti. La Giordania.',
    et2: 'Un itinerario completo, pensato per te',
    es2: "Dal primo caffè ad Amman all'ultimo tramonto a Wadi Rum.",
    unf: 'Un luogo indimenticabile',
    disc: 'Scopri',
    z5: "Un'esperienza irripetibile",
    z4: 'Eccezionale',
    z3: 'Speciale',
    z2: 'Merita una visita',
    z1: 'Tappa veloce',
    l1: 'Analisi dei tuoi interessi',
    l2: 'Calcolo delle distanze',
    l3: 'Preparazione del piano giornaliero',
  },
};

// Falls back to English if the key is missing in the current language
const t = (key) =>
  TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS[FALLBACK_LANG][key] ?? key;

const SITE_NAMES = { ar: 'اكتشف الأردن', en: 'Discover Jordan', it: 'Scopri la Giordania' };
const siteName = pick(SITE_NAMES);

// ---------- Data ----------
// stars: 1-5 (uniqueness), hours: suggested time, costJod: cost in JOD,
// distanceKm: distance from Amman
const RAW_PLACES = [
  {
    id: 'petra', stars: 5, lat: 30.3285, lng: 35.4444,
    tags: ['history', 'adventure'], hours: 6, costJod: 50, distanceKm: 240,
    name: { ar: 'مدينة البترا الوردية', en: 'Petra, the Rose City', it: 'Petra, la Città Rosa' },
    description: {
      ar: 'مدينة نبطية منحوتة في الصخر، إحدى عجائب الدنيا السبع.',
      en: 'A Nabataean city carved into rock, one of the New Seven Wonders.',
      it: 'Città nabatea scavata nella roccia, una delle Nuove Sette Meraviglie del Mondo.',
    },
  },
  {
    id: 'wadi-rum', stars: 5, lat: 29.5766, lng: 35.42,
    tags: ['desert', 'adventure'], hours: 6, costJod: 35, distanceKm: 320,
    name: { ar: 'وادي رم', en: 'Wadi Rum', it: 'Wadi Rum' },
    description: {
      ar: 'صحراء الجبال الحمراء والرمال، اقضِ ليلة في مخيم بدوي.',
      en: 'Red sand and granite mountains. Spend a night in a Bedouin camp.',
      it: 'Sabbia rossa e montagne di granito. Trascorri una notte in un campo beduino.',
    },
  },
  {
    id: 'jerash', stars: 4, lat: 32.2811, lng: 35.8993,
    tags: ['history'], hours: 3, costJod: 10, distanceKm: 50,
    name: { ar: 'جرش', en: 'Jerash', it: 'Jerash' },
    description: {
      ar: 'مدينة رومانية محفوظة بأعمدتها وشوارعها ومسرحها.',
      en: 'A well-preserved Roman city with colonnaded streets and theatres.',
      it: 'Una città romana ben conservata, con strade colonnate e teatri.',
    },
  },
  {
    id: 'dead-sea', stars: 4, lat: 31.559, lng: 35.4732,
    tags: ['nature', 'sea'], hours: 4, costJod: 25, distanceKm: 60,
    name: { ar: 'البحر الميت', en: 'Dead Sea', it: 'Mar Morto' },
    description: {
      ar: 'أخفض نقطة على الأرض، مياه مالحة وطين علاجي.',
      en: 'The lowest point on Earth, with buoyant salt water and mineral mud.',
      it: 'Il punto più basso della Terra, con acqua salata che fa galleggiare e fango minerale.',
    },
  },
  {
    id: 'wadi-mujib', stars: 4, lat: 31.443, lng: 35.811,
    tags: ['nature', 'adventure'], hours: 4, costJod: 21, distanceKm: 105,
    name: { ar: 'وادي الموجب', en: 'Wadi Mujib', it: 'Wadi Mujib' },
    description: {
      ar: 'مسارات مائية بين جدران الوادي، مغامرة منعشة.',
      en: 'Water trails through a canyon, a refreshing adventure.',
      it: "Percorsi d'acqua in un canyon, un'avventura rinfrescante.",
    },
  },
  {
    id: 'ajloun', stars: 3, lat: 32.3326, lng: 35.7517,
    tags: ['history', 'nature'], hours: 2, costJod: 3, distanceKm: 75,
    name: { ar: 'قلعة عجلون', en: 'Ajloun Castle', it: 'Castello di Ajloun' },
    description: {
      ar: 'قلعة من العصر الإسلامي تطل على غابات الشمال.',
      en: 'An Islamic-era castle overlooking northern forests.',
      it: 'Un castello di epoca islamica che domina le foreste del nord.',
    },
  },
  {
    id: 'aqaba', stars: 3, lat: 29.5321, lng: 35.0063,
    tags: ['sea', 'adventure'], hours: 5, costJod: 30, distanceKm: 330,
    name: { ar: 'العقبة', en: 'Aqaba', it: 'Aqaba' },
    description: {
      ar: 'غوص وشعاب مرجانية على البحر الأحمر.',
      en: 'Diving and coral reefs on the Red Sea.',
      it: 'Immersioni e barriere coralline nel Mar Rosso.',
    },
  },
  {
    id: 'madaba', stars: 2, lat: 31.716, lng: 35.7939,
    tags: ['history', 'food'], hours: 2, costJod: 5, distanceKm: 35,
    name: { ar: 'مادبا', en: 'Madaba', it: 'Madaba' },
    description: {
      ar: 'مدينة الفسيفساء، وفيها خارطة الأرض المقدسة.',
      en: 'The mosaic city, home to the Holy Land map.',
      it: 'La città dei mosaici, dove si trova la mappa della Terra Santa.',
    },
  },
  {
    id: 'citadel', stars: 1, lat: 31.9543, lng: 35.9349,
    tags: ['history', 'food'], hours: 2, costJod: 3, distanceKm: 0,
    name: { ar: 'جبل القلعة في عمّان', en: 'Amman Citadel', it: 'Cittadella di Amman' },
    description: {
      ar: 'آثار رومانية وأموية وإطلالة على وسط المدينة.',
      en: 'Roman and Umayyad ruins overlooking downtown.',
      it: 'Rovine romane e omayyadi con vista sul centro città.',
    },
  },
  {
    id: 'little-petra', stars: 4, lat: 30.424, lng: 35.447,
    tags: ['history', 'adventure'], hours: 2, costJod: 0, distanceKm: 235,
    name: { ar: 'البتراء الصغيرة', en: 'Little Petra', it: 'Piccola Petra' },
    description: {
      ar: 'موقع نبطي هادئ قرب البترا، مثالي للاستكشاف.',
      en: 'A quiet Nabataean site near Petra, ideal for exploring.',
      it: 'Un tranquillo sito nabateo vicino a Petra, ideale da esplorare.',
    },
  },
  {
    id: 'um-sayhoun', stars: 2, lat: 30.339, lng: 35.437,
    tags: ['food'], hours: 1, costJod: 8, distanceKm: 240,
    name: {
      ar: 'غداء أردني في أم صيحون',
      en: 'Jordanian lunch in Um Sayhoun',
      it: 'Pranzo giordano a Um Sayhoun',
    },
    description: {
      ar: 'منسف ومأكولات محلية في قرية قرب البترا.',
      en: 'Mansaf and local dishes in a village near Petra.',
      it: 'Mansaf e piatti locali in un villaggio vicino a Petra.',
    },
  },

  // ===== Added from the guide (21 places) =====
  // PROVISIONAL: stars, hours, distanceKm and lat/lng are approximate estimates
  // costJod is null on purpose (unknown) and is hidden in the UI - fill it in when verified.
  {
    id: 'ajloun-forest', stars: 2, lat: 32.318, lng: 35.785,
    tags: ['nature', 'adventure'], hours: 3, costJod: null, distanceKm: 80,
    name: { ar: 'محمية غابات عجلون', en: 'Ajloun Forest Reserve', it: 'Riserva Forestale di Ajloun' },
    description: {
      ar: 'محمية طبيعية تتميز بتلالها الخضراء المكسوة بأشجار البلوط والسنديان، وتوفر مسارات مشي وأكواخاً خشبية للإقامة.',
      en: 'A nature reserve of green hills covered in oak trees, with hiking trails and wooden cabins to stay in.',
      it: 'Riserva naturale con verdi colline coperte di querce e lecci, con sentieri escursionistici e capanne di legno dove soggiornare.',
    },
  },
  {
    id: 'umm-qais', stars: 4, lat: 32.6553, lng: 35.6858,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 110,
    name: { ar: 'أم قيس', en: 'Umm Qais', it: 'Umm Qais' },
    description: {
      ar: 'مدينة أثرية تعود للعصر الروماني (جدارا قديماً)، تطل على بحيرة طبريا وهضبة الجولان، وتتميز بأبنيتها المصنوعة من الحجر البازلتي الأسود.',
      en: 'A Roman-era archaeological city (ancient Gadara) overlooking the Sea of Galilee and the Golan Heights, built from black basalt stone.',
      it: "Città archeologica di epoca romana (l'antica Gadara), affacciata sul Lago di Tiberiade e sulle alture del Golan, con edifici in pietra basaltica nera.",
    },
  },
  {
    id: 'pella', stars: 2, lat: 32.4483, lng: 35.6178,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 120,
    name: { ar: 'بيلا / طبقة فحل', en: 'Pella / Tabaqat Fahl', it: 'Pella (Tabaqat Fahl)' },
    description: {
      ar: 'موقع أثري مهم يضم آثاراً تعود للعصور الحجرية والبرونزية والرومانية والإسلامية المبكرة.',
      en: 'An important archaeological site with remains from the Stone Age, Bronze Age, Roman and early Islamic periods.',
      it: "Importante sito archeologico con resti dell'età della pietra, dell'età del bronzo, dell'epoca romana e del primo periodo islamico.",
    },
  },
  {
    id: 'umm-al-jimal', stars: 3, lat: 32.3306, lng: 36.3625,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 85,
    name: { ar: 'أم الجمال', en: 'Umm al-Jimal', it: 'Umm al-Jimal' },
    description: {
      ar: 'مدينة أثرية نبطية ورومانية وبيزنطية بُنيت بالكامل من الحجارة البازلتية السوداء، وتضم كنائس ونظماً مائية قديمة.',
      en: 'A Nabataean, Roman and Byzantine archaeological town built entirely of black basalt, with churches and ancient water systems.',
      it: 'Città archeologica nabatea, romana e bizantina costruita interamente in pietra basaltica nera, con chiese e antichi sistemi idrici.',
    },
  },
  {
    id: 'mount-nebo', stars: 3, lat: 31.7686, lng: 35.7256,
    tags: ['history'], hours: 1, costJod: null, distanceKm: 40,
    name: { ar: 'جبل نيبو', en: 'Mount Nebo', it: 'Monte Nebo' },
    description: {
      ar: 'موقع ديني وتاريخي مهم يطل على فلسطين والبحر الميت، ويُعتقد أنه المكان الذي أطل منه النبي موسى على الأرض المقدسة.',
      en: 'An important religious and historic site overlooking Palestine and the Dead Sea, believed to be where Moses looked out over the Holy Land.',
      it: 'Importante luogo religioso e storico con vista sulla Palestina e sul Mar Morto; si crede che da qui Mosè abbia contemplato la Terra Santa.',
    },
  },
  {
    id: 'baptism-site', stars: 4, lat: 31.8372, lng: 35.5505,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 55,
    name: { ar: 'موقع المعمودية / المغطس', en: 'Baptism Site / Al-Maghtas', it: 'Sito del Battesimo (Al-Maghtas)' },
    description: {
      ar: 'موقع أثري وديني مدرج على لائحة التراث العالمي، يُعتقد أنه المكان الذي تم فيه تعميد السيد المسيح على يد يوحنا المعمدان.',
      en: 'A World Heritage archaeological and religious site, believed to be where Jesus was baptized by John the Baptist.',
      it: "Sito archeologico e religioso Patrimonio dell'Umanità, dove si crede che Gesù sia stato battezzato da Giovanni Battista.",
    },
  },
  {
    id: 'dana', stars: 3, lat: 30.6811, lng: 35.6067,
    tags: ['nature', 'adventure'], hours: 6, costJod: null, distanceKm: 200,
    name: { ar: 'محمية ضانا للمحيط الحيوي', en: 'Dana Biosphere Reserve', it: 'Riserva della Biosfera di Dana' },
    description: {
      ar: 'أكبر محمية طبيعية في الأردن، تحتوي على تنوع حيوي وأقاليم جغرافية مختلفة ومسارات مشي ممتدة.',
      en: "Jordan's largest nature reserve, with rich biodiversity, several geographic zones and long hiking trails.",
      it: 'La più grande riserva naturale della Giordania, con grande biodiversità, diverse regioni geografiche e lunghi sentieri escursionistici.',
    },
  },
  {
    id: 'feynan', stars: 2, lat: 30.63, lng: 35.487,
    tags: ['nature', 'adventure'], hours: 6, costJod: null, distanceKm: 230,
    name: { ar: 'فينان', en: 'Feynan', it: 'Feynan' },
    description: {
      ar: 'منطقة في محمية ضانا تُشتهر بالنُزل البيئي (Feynan Eco-Lodge) والمناجم الأثرية القديمة لاستخراج النحاس.',
      en: 'An area in Dana Reserve known for the Feynan Eco-Lodge and ancient copper mines.',
      it: 'Zona nella riserva di Dana famosa per il Feynan Eco-Lodge e per le antiche miniere di rame.',
    },
  },
  {
    id: 'karak', stars: 4, lat: 31.18, lng: 35.7045,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 125,
    name: { ar: 'قلعة الكرك', en: 'Karak Castle', it: 'Castello di Karak' },
    description: {
      ar: 'قلعة صليبية وإسلامية ضخمة تقع على قمة جبل مرتفع، وتضم ممرات وأنفاقاً تحت الأرض.',
      en: 'A huge Crusader and Islamic castle on a high hilltop, with underground passages and tunnels.',
      it: "Grande fortezza crociata e islamica sulla cima di un'alta collina, con corridoi e gallerie sotterranee.",
    },
  },
  {
    id: 'shobak', stars: 3, lat: 30.5311, lng: 35.5606,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 190,
    name: { ar: 'قلعة الشوبك', en: 'Shobak Castle', it: 'Castello di Shobak' },
    description: {
      ar: 'قلعة تاريخية تعود للعصرين الصليبي (مونتريال) والمملوكي، تقع على جبل مطل وتتميز بأبراجها وأنفاقها المائية.',
      en: 'A historic castle from the Crusader (Montreal) and Mamluk eras, on a commanding hill, known for its towers and water tunnels.',
      it: "Fortezza storica di epoca crociata (Montreal) e mamelucca, su un monte panoramico, nota per le torri e i tunnel d'acqua.",
    },
  },
  {
    id: 'mukawir', stars: 3, lat: 31.5686, lng: 35.6117,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 70,
    name: { ar: 'مكاور', en: 'Mukawir', it: 'Mukawir' },
    description: {
      ar: 'قلعة تاريخية على جبل يطل على البحر الميت، ترتبط قديماً بقصة سجن يوحنا المعمدان وقطع رأسه.',
      en: 'A historic fortress on a mountain overlooking the Dead Sea, linked to the story of the imprisonment and beheading of John the Baptist.',
      it: "Fortezza storica su un monte che domina il Mar Morto, legata all'antica storia della prigionia e decapitazione di Giovanni Battista.",
    },
  },
  {
    id: 'salt', stars: 3, lat: 32.0392, lng: 35.7272,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 30,
    name: { ar: 'مدينة السلط القديمة', en: 'As-Salt Historic City', it: 'Città vecchia di As-Salt' },
    description: {
      ar: 'مدينة تاريخية مدرجة على قائمة التراث العالمي، تتميز ببيوتها من الحجر الأصفر العثماني وعمارتها التراثية وروح الضيافة.',
      en: 'A World Heritage historic city, known for its Ottoman-era yellow stone houses, heritage architecture and spirit of hospitality.',
      it: "Città storica Patrimonio dell'Umanità, con case in pietra gialla di epoca ottomana, architettura tradizionale e uno spirito di ospitalità.",
    },
  },
  {
    id: 'roman-theatre', stars: 1, lat: 31.9516, lng: 35.9394,
    tags: ['history'], hours: 1, costJod: null, distanceKm: 0,
    name: { ar: 'المدرج الروماني', en: 'Roman Theatre, Amman', it: 'Teatro Romano di Amman' },
    description: {
      ar: 'مسرح روماني كبير يعود للقرن الثاني الميلادي في قلب عمّان، ويتسع لنحو 6,000 مشاهد.',
      en: 'A large Roman theatre from the 2nd century AD in the heart of Amman, seating around 6,000 spectators.',
      it: 'Grande teatro romano del II secolo d.C. nel cuore di Amman, con circa 6.000 posti.',
    },
  },
  {
    id: 'downtown', stars: 1, lat: 31.95, lng: 35.938,
    tags: ['food', 'history'], hours: 3, costJod: null, distanceKm: 0,
    name: { ar: 'وسط البلد', en: 'Downtown Amman', it: 'Centro di Amman (Downtown)' },
    description: {
      ar: 'المركز التاريخي والتجاري لمدينة عمّان، يضم الأسواق القديمة والمطاعم الشعبية والمعالم التراثية.',
      en: 'The historic and commercial center of Amman, with old markets, popular restaurants and heritage landmarks.',
      it: 'Il centro storico e commerciale di Amman, con vecchi mercati, ristoranti popolari e monumenti del patrimonio.',
    },
  },
  {
    id: 'royal-automobile-museum', stars: 2, lat: 31.999, lng: 35.883,
    tags: ['history'], hours: 2, costJod: null, distanceKm: 10,
    name: { ar: 'متحف السيارات الملكي', en: 'Royal Automobile Museum', it: "Museo Reale dell'Automobile" },
    description: {
      ar: 'متحف يعرض تاريخ الأردن الحديث من خلال مجموعة نادرة من السيارات والدراجات الملكية منذ عهد الملك عبد الله الأول.',
      en: "A museum telling the story of modern Jordan through a rare collection of royal cars and motorcycles since the time of King Abdullah I.",
      it: 'Museo che racconta la storia moderna della Giordania attraverso una rara collezione di auto e moto reali, dai tempi di re Abdullah I.',
    },
  },
  {
    id: 'iraq-al-amir', stars: 2, lat: 31.9092, lng: 35.7512,
    tags: ['history'], hours: 1, costJod: null, distanceKm: 25,
    name: { ar: 'العراق الأمير', en: 'Iraq Al-Amir', it: 'Iraq al-Amir' },
    description: {
      ar: 'بلدة تاريخية غرب عمّان تضم قصر العبد الأثري من الفترة الهلنستية، بالإضافة إلى مغاور طبيعية وأثرية.',
      en: 'A historic town west of Amman with the Hellenistic-era Qasr al-Abd and natural and archaeological caves.',
      it: 'Città storica a ovest di Amman con il sito archeologico di Qasr al-Abd, di epoca ellenistica, e grotte naturali e archeologiche.',
    },
  },
  {
    id: 'qasr-amra', stars: 4, lat: 31.8022, lng: 36.5875,
    tags: ['history', 'desert'], hours: 1, costJod: null, distanceKm: 85,
    name: { ar: 'قصر عمرة', en: 'Qasr Amra', it: 'Qasr Amra' },
    description: {
      ar: 'قصر صحراوي أموي مدرج على لائحة اليونسكو، يشتهر بلوحاته الجدارية الفريدة في داخله.',
      en: 'An Umayyad desert palace on the UNESCO list, famous for the unique wall paintings inside.',
      it: 'Castello omayyade nel deserto, Patrimonio UNESCO, famoso per gli affreschi e i dipinti murali unici al suo interno.',
    },
  },
  {
    id: 'azraq-castle', stars: 3, lat: 31.8836, lng: 36.8258,
    tags: ['history', 'desert'], hours: 1, costJod: null, distanceKm: 100,
    name: { ar: 'قلعة الأزرق', en: 'Azraq Castle', it: 'Castello di Azraq' },
    description: {
      ar: 'قلعة أثرية بُنيت من البازلت الأسود واستُخدمت عبر العصور الرومانية والأموية، واستقر بها لورنس العرب خلال الثورة العربية الكبرى.',
      en: 'An archaeological castle of black basalt used through Roman and Umayyad times, where Lawrence of Arabia stayed during the Great Arab Revolt.',
      it: "Fortezza in basalto nero usata in epoca romana e omayyade, dove Lawrence d'Arabia si stabilì durante la Grande Rivolta Araba.",
    },
  },
  {
    id: 'azraq-wetland', stars: 2, lat: 31.8317, lng: 36.83,
    tags: ['nature'], hours: 2, costJod: null, distanceKm: 100,
    name: { ar: 'محمية الأزرق المائية', en: 'Azraq Wetland Reserve', it: 'Riserva delle Zone Umide di Azraq' },
    description: {
      ar: 'واحة طبيعية في الصحراء الشرقية ومحطة مهمة للطيور المهاجرة، وتضم ممرات خشبية للاستكشاف.',
      en: 'A natural oasis in the eastern desert and an important stop for migratory birds, with wooden walkways for exploring.',
      it: 'Oasi naturale nel deserto orientale, tappa importante per gli uccelli migratori, con passerelle di legno per esplorarla.',
    },
  },
  {
    id: 'shaumari', stars: 2, lat: 31.7783, lng: 36.7847,
    tags: ['nature'], hours: 2, costJod: null, distanceKm: 110,
    name: { ar: 'محمية الشومري', en: 'Shawmari Wildlife Reserve', it: 'Riserva Naturale di Shaumari' },
    description: {
      ar: 'أول محمية في الأردن لإعادة إحياء الحياة البرية، وتشتهر برعاية وتكثير المها العربي وغزلان الريم.',
      en: "Jordan's first wildlife restoration reserve, known for breeding the Arabian oryx and rim gazelles.",
      it: "La prima riserva della Giordania per la reintroduzione della fauna selvatica, nota per la tutela dell'orice arabo e delle gazzelle.",
    },
  },
  {
    id: 'aqaba-marine-park', stars: 2, lat: 29.4485, lng: 34.9765,
    tags: ['sea', 'adventure'], hours: 4, costJod: null, distanceKm: 330,
    name: { ar: 'المنتزه البحري في العقبة', en: 'Aqaba Marine Park', it: 'Parco Marino di Aqaba' },
    description: {
      ar: 'محمية بحرية توفر مناطق مخصصة للغوص والغطس السطحي لمشاهدة الشعاب المرجانية والأحياء البحرية.',
      en: 'A marine reserve with dedicated areas for diving and snorkeling to see coral reefs and marine life.',
      it: 'Area marina protetta con zone dedicate a immersioni e snorkeling per ammirare barriere coralline e vita marina.',
    },
  },
];

// Flatten name/description to the current language
const PLACES = RAW_PLACES.map((place) => ({
  ...place,
  name: pick(place.name),
  description: pick(place.description),
}));

const findPlace = (id) => PLACES.find((place) => place.id === id);

// costJod can be null (unknown) - hide it instead of showing "null JOD"
const costSpecHtml = (place) =>
  place.costJod == null
    ? ''
    : `<span>${t('cost')}<b>${place.costJod} ${t('jod')}</b></span>`;

const detailsLine = (place) =>
  [
    `${place.hours} ${t('hr')}`,
    place.costJod == null ? null : `${place.costJod} ${t('jod')}`,
  ]
    .filter(Boolean)
    .join(' · ');

// ---------- UI helpers ----------
const imageStyle = (id, index) =>
  `background-image:url(images/${id}${index ? '-' + index : ''}.jpg)`;

const starsHtml = (count) => `<span class=star>${'★'.repeat(count)}</span>`;

// Opens the native Maps app on phones
const mapsUrl = (place) =>
  `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;

const cardHtml = (place) => `
  <a class=card href="place.html?id=${place.id}">
    <div class=im style="${imageStyle(place.id)}"></div>
    <div class=tx>
      ${starsHtml(place.stars)}
      <h3>${place.name}</h3>
      <small>${place.description}</small>
    </div>
  </a>`;

const galleryHtml = (place) =>
  `<div class=gal>${[0, 1, 2]
    .map((i) => `<div class=im style="${imageStyle(place.id, i || '')}"></div>`)
    .join('')}</div>`;

const LOGO_SVG = `<svg width=32 height=32 viewBox="0 0 32 32" fill=none stroke=currentColor stroke-width=2 aria-hidden=true><path d="M16 29s9-8 9-15a9 9 0 10-18 0c0 7 9 15 9 15z"/><circle cx=16 cy=14 r=3.5 /></svg>`;

// ---------- Header + footer (on every page) ----------
const currentPage = document.body.dataset.page;

const navLink = (href, textKey, pageName) =>
  `<a href="${href}" class="${currentPage === pageName ? 'on' : ''}">${t(textKey)}</a>`;

// One button per language, same .lang style as the original single button
function languageButtonsHtml() {
  return Object.keys(LANGUAGES)
    .map((code) =>
      `<button class="lang${code === lang ? ' on' : ''}" data-lang="${code}" title="${LANGUAGES[code]}">${code.toUpperCase()}</button>`)
    .join('');
}

function renderHeader() {
  const header = $('#hdr');
  if (!header) return;

  header.innerHTML = `
    <header>
      <div class=wrap>
        <a class=logo href="index.html">${LOGO_SVG} ${siteName}</a>
        <nav>
          ${navLink('index.html', 'home', 'home')}
          ${navLink('explore.html', 'explore', 'explore')}
          ${navLink('planner.html', 'plan', 'planner')}
        </nav>
        <button id=mb aria-label=menu>☰</button>
        ${languageButtonsHtml()}
      </div>
    </header>`;

  $('#mb').onclick = () => $('nav').classList.toggle('open');
  document.querySelectorAll('button.lang').forEach((button) => {
    button.onclick = () => {
      if (button.dataset.lang === lang) return;
      localStorage.lang = button.dataset.lang;
      location.reload();
    };
  });
}

function renderFooter() {
  const footer = $('#ftr');
  if (!footer) return;

  footer.innerHTML = `
    <footer>
      <div class=wrap>
        <div><h3>${siteName}</h3><p>${t('ft')}</p></div>
        <div>
          ${navLink('explore.html', 'explore', '')}
          ${navLink('planner.html', 'plan', '')}
        </div>
        <div><a href="#">Instagram</a><a href="#">YouTube</a></div>
      </div>
      <div class=wrap><small>© 2026 ${t('rt')}</small></div>
    </footer>`;
}

function translateStaticText() {
  document.querySelectorAll('[data-i]').forEach((element) => {
    element.innerHTML = t(element.dataset.i);
  });
}

// ---------- Trip view (day tabs + timeline + route map) ----------
const TIME_SLOTS_BY_LANG = {
  ar: ['8:30 ص', '1:00 م', '4:30 م'],
  en: ['8:30 AM', '1:00 PM', '4:30 PM'],
  it: ['8:30', '13:00', '16:30'],
};
const TIME_SLOTS = pick(TIME_SLOTS_BY_LANG);

function routeMapSvg(places) {
  const lngs = places.map((p) => p.lng);
  const lats = places.map((p) => p.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  // Convert real coordinates to positions inside the 600x320 SVG
  const toX = (p) => (maxLng === minLng ? 300 : 60 + ((p.lng - minLng) / (maxLng - minLng)) * 480);
  const toY = (p) => (maxLat === minLat ? 150 : 50 + ((maxLat - p.lat) / (maxLat - minLat)) * 200);

  const routePath = places
    .map((p, i) => `${i ? 'L' : 'M'}${toX(p)},${toY(p)}`)
    .join('');

  const markers = places
    .map((p, i) => `
      <a href="${mapsUrl(p)}" target=_blank>
        <circle cx=${toX(p)} cy=${toY(p)} r=14 fill="#176B5B"/>
        <text x=${toX(p)} y=${toY(p) + 5} text-anchor=middle fill=#fff font-size=14>${i + 1}</text>
        <text x=${toX(p)} y=${toY(p) + 36} text-anchor=middle font-size=14 font-weight=700>${p.name}</text>
      </a>`)
    .join('');

  return `<svg class=map viewBox="0 0 600 320">
    <path d="${routePath}" fill=none stroke="#176B5B" stroke-width=3 stroke-dasharray="8 8"/>
    ${markers}
  </svg>`;
}

function timelineHtml(dayPlaces) {
  return dayPlaces
    .map((place, i) => `
      <div class=slot>
        <span class=tm>${TIME_SLOTS[i] || ''}</span>
        <a class=card href="place.html?id=${place.id}">
          <div class=im style="${imageStyle(place.id)}"></div>
          <div class=tx>
            ${starsHtml(place.stars)}
            <h3>${place.name}</h3>
            <small>${detailsLine(place)}</small>
          </div>
        </a>
      </div>`)
    .join('');
}

function renderTrip(container, days) {
  if (!days.length) {
    container.innerHTML = `<p>${t('noResults')}</p>`;
    return;
  }

  container.innerHTML = `
    <div class=tabs>
      ${days
        .map((day, i) => `
          <button class="tab${i ? '' : ' on'}" data-d=${i}>
            ${t('day')} ${i + 1}<small>${day[0].name}</small>
          </button>`)
        .join('')}
    </div>
    <div class=split><div id=tl></div><div id=mp></div></div>
    <div class=why><b>${t('why')}</b><p>${t('whyt')}</p></div>`;

  const showDay = (index) => {
    container.querySelector('#tl').innerHTML = timelineHtml(days[index]);
    container.querySelector('#mp').innerHTML = routeMapSvg(days[index]);
  };

  container.querySelector('.tabs').onclick = (event) => {
    const clickedTab = event.target.closest('.tab');
    if (!clickedTab) return;

    container.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.toggle('on', tab === clickedTab);
    });
    showDay(Number(clickedTab.dataset.d));
  };

  showDay(0);
}

// ---------- Pages ----------

// Explore: zones from 5 stars down to 1
function initExplore() {
  $('#zones').innerHTML = [5, 4, 3, 2, 1]
    .map((stars) => {
      const places = PLACES.filter((p) => p.stars === stars);
      if (!places.length) return '';

      return `
        <section class=zone>
          <h2>${starsHtml(stars)} <small>${t('z' + stars)}</small></h2>
          <div class=grid>${places.map(cardHtml).join('')}</div>
        </section>`;
    })
    .join('');
}

// Place: photos, quick specs, intro, maps button
function initPlace() {
  const id = new URLSearchParams(location.search).get('id');
  const place = findPlace(id) || PLACES[0];
  document.title = place.name;

  $('#pl').innerHTML = `
    <h1>${place.name}</h1>
    ${starsHtml(place.stars)}
    ${galleryHtml(place)}
    <div class=specs>
      <span>${t('time')}<b>${place.hours} ${t('hr')}</b></span>
      <span>${t('dist')}<b>${place.distanceKm} ${t('km')}</b></span>
      ${costSpecHtml(place)}
    </div>
    <p>${place.description}</p>
    <br>
    <a class="btn gold" target=_blank rel=noopener href="${mapsUrl(place)}">📍 ${t('maps')}</a>`;
}

// Planner: interests + days -> loading checklist -> trip view
function initPlanner() {
  const INTERESTS = ['history', 'nature', 'desert', 'sea', 'food', 'adventure'];
  const PLACES_PER_DAY = 3;
  const selected = new Set();

  $('#ints').innerHTML = INTERESTS
    .map((key) => `<div class=opt data-k=${key}>${t(key)}</div>`)
    .join('');

  $('#ints').onclick = (event) => {
    const key = event.target.dataset.k;
    if (!key) return;

    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
    event.target.classList.toggle('on');
  };

  $('#go').onclick = async () => {
    if (!selected.size) return alert(t('nf'));

    const numberOfDays = Number($('#nd').value) || 1;

    await showLoadingOverlay();

    const matching = PLACES
      .filter((place) => place.tags.some((tag) => selected.has(tag)))
      .sort((a, b) => b.stars - a.stars);

    const days = [];
    for (let d = 0; d < numberOfDays; d++) {
      const dayPlaces = matching.slice(d * PLACES_PER_DAY, (d + 1) * PLACES_PER_DAY);
      if (dayPlaces.length) days.push(dayPlaces);
    }

    renderTrip($('#res'), days);
    $('#res').scrollIntoView({ behavior: 'smooth' });

    // TODO Firebase: save { interests: [...selected], days: numberOfDays, city: $('#ct').value } to Firestore here
  };
}

async function showLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'ov';
  overlay.innerHTML = `
    <div class=box>
      <h3>${t('plan')}</h3>
      <ul>${['l1', 'l2', 'l3'].map((key) => `<li>${t(key)}</li>`).join('')}</ul>
    </div>`;
  document.body.append(overlay);

  for (const item of overlay.querySelectorAll('li')) {
    await wait(700);
    item.classList.add('done');
  }

  await wait(400);
  overlay.remove();
}

// Home: sample trip + featured place
function initHome() {
  const sampleTrip = [['petra', 'um-sayhoun', 'little-petra'], ['wadi-rum'], ['aqaba']]
    .map((ids) => ids.map(findPlace));
  renderTrip($('#trip'), sampleTrip);

  const featured = findPlace('wadi-rum');
  $('#feat').innerHTML = `
    ${galleryHtml(featured)}
    <div>
      <small>${t('unf')}</small>
      <h2>${featured.name}</h2>
      <p>${featured.description}</p>
      <div class=specs>
        <span>${t('dist')}<b>${featured.distanceKm} ${t('km')}</b></span>
        <span>${t('cost')}<b>${featured.costJod} ${t('jod')}</b></span>
      </div>
      <a class="btn gold" href="place.html?id=${featured.id}">${t('disc')} ${featured.name}</a>
    </div>`;
}

// ---------- Start ----------
const PAGE_INITIALIZERS = {
  home: initHome,
  explore: initExplore,
  place: initPlace,
  planner: initPlanner,
};

renderHeader();
renderFooter();
translateStaticText();
PAGE_INITIALIZERS[currentPage]?.();