// places.js — Jordan Tourism App: expanded places dataset
// Categories: mountains, ruins, desert, deadsea

const places = [
  // ===== MOUNTAINS / NATURE =====
  {
    id: "ajloun-castle",
    name: "Ajloun Castle",
    nameAr: "قلعة عجلون",
    category: "mountains",
    city: "Ajloun",
    lat: 32.3325,
    lng: 35.7517,
    visitDurationHours: 1.5,
    description: "A 12th-century Ayyubid fortress on a forested hilltop overlooking the Jordan Valley."
  },
  {
    id: "ajloun-forest-reserve",
    name: "Ajloun Forest Reserve",
    nameAr: "محمية غابات عجلون",
    category: "mountains",
    city: "Ajloun",
    lat: 32.3667,
    lng: 35.7333,
    visitDurationHours: 2,
    description: "Oak and pistachio woodland reserve with hiking trails and wildlife watching."
  },
  {
    id: "dibeen-forest-reserve",
    name: "Dibeen Forest Reserve",
    nameAr: "محمية غابات دبين",
    category: "mountains",
    city: "Jerash area",
    lat: 32.2503,
    lng: 35.7936,
    visitDurationHours: 2,
    description: "Pine and oak forest reserve known for rare Aleppo pine trees and picnic trails."
  },
  {
    id: "salt-old-town",
    name: "As-Salt Old Town",
    nameAr: "مدينة السلط القديمة",
    category: "mountains",
    city: "Salt",
    lat: 32.0389,
    lng: 35.7272,
    visitDurationHours: 2,
    description: "Ottoman-era hillside town with yellow limestone architecture, a UNESCO-listed site."
  },
  {
    id: "zay-national-park",
    name: "Zay National Park",
    nameAr: "منتزه الزي الوطني",
    category: "mountains",
    city: "Salt area",
    lat: 32.1206,
    lng: 35.7397,
    visitDurationHours: 1.5,
    description: "Pine-forested park overlooking the Jordan Valley, popular for picnics and views."
  },
  {
    id: "kufranja-waterfall",
    name: "Kufranja Nature Reserve",
    nameAr: "محمية الكفرنجة",
    category: "mountains",
    city: "Kufranja",
    lat: 32.2986,
    lng: 35.6194,
    visitDurationHours: 2,
    description: "Green valley reserve with a walking trail leading to a seasonal waterfall."
  },
  {
    id: "yarmouk-reserve",
    name: "Yarmouk Forest Reserve",
    nameAr: "محمية غابات اليرموك",
    category: "mountains",
    city: "Irbid area",
    lat: 32.7028,
    lng: 35.8500,
    visitDurationHours: 2,
    description: "Northernmost nature reserve with oak forests along the Yarmouk river valley."
  },

  // ===== RUINS / HERITAGE =====
  {
    id: "jerash",
    name: "Jerash (Gerasa)",
    nameAr: "جرش",
    category: "ruins",
    city: "Jerash",
    lat: 32.2745,
    lng: 35.8916,
    visitDurationHours: 3,
    description: "One of the best-preserved Roman provincial cities, with colonnaded streets and amphitheaters."
  },
  {
    id: "petra",
    name: "Petra",
    nameAr: "البتراء",
    category: "ruins",
    city: "Wadi Musa",
    lat: 30.3285,
    lng: 35.4444,
    visitDurationHours: 6,
    description: "Ancient Nabataean city carved into rose-colored cliffs; a UNESCO World Heritage site."
  },
  {
    id: "umm-qais",
    name: "Umm Qais (Gadara)",
    nameAr: "أم قيس",
    category: "ruins",
    city: "Umm Qais",
    lat: 32.6567,
    lng: 35.6850,
    visitDurationHours: 2,
    description: "Greco-Roman ruins overlooking the Sea of Galilee, the Golan Heights, and the Jordan Valley."
  },
  {
    id: "umm-al-jimal",
    name: "Umm al-Jimal",
    nameAr: "أم الجمال",
    category: "ruins",
    city: "Mafraq",
    lat: 32.3242,
    lng: 36.3319,
    visitDurationHours: 1.5,
    description: "Black basalt ruins of a Byzantine and early Islamic town, nicknamed the 'Black Oasis'."
  },
  {
    id: "qasr-amra",
    name: "Qasr Amra",
    nameAr: "قصر عمرة",
    category: "ruins",
    city: "Eastern Desert",
    lat: 31.8020,
    lng: 36.5850,
    visitDurationHours: 1,
    description: "UNESCO-listed Umayyad desert castle famous for its frescoed bathhouse."
  },
  {
    id: "qasr-kharana",
    name: "Qasr Kharana",
    nameAr: "قصر خرانة",
    category: "ruins",
    city: "Eastern Desert",
    lat: 31.7167,
    lng: 36.3667,
    visitDurationHours: 1,
    description: "Striking square Umayyad desert fortress rising out of the open plain."
  },
  {
    id: "qasr-azraq",
    name: "Qasr Azraq",
    nameAr: "قصر الأزرق",
    category: "ruins",
    city: "Azraq",
    lat: 31.8333,
    lng: 36.8167,
    visitDurationHours: 1,
    description: "Black basalt fort once used by T.E. Lawrence during the Arab Revolt."
  },
  {
    id: "machaerus",
    name: "Machaerus (Mukawir)",
    nameAr: "قلعة مكاور",
    category: "ruins",
    city: "Mukawir",
    lat: 31.5730,
    lng: 35.6270,
    visitDurationHours: 1.5,
    description: "Hilltop Herodian fortress overlooking the Dead Sea, linked to the story of John the Baptist."
  },
  {
    id: "amman-citadel",
    name: "Amman Citadel",
    nameAr: "جبل القلعة",
    category: "ruins",
    city: "Amman",
    lat: 31.9539,
    lng: 35.9350,
    visitDurationHours: 1.5,
    description: "Hilltop archaeological site in downtown Amman with Roman, Byzantine, and Umayyad remains."
  },
  {
    id: "roman-theatre-amman",
    name: "Roman Theatre",
    nameAr: "المدرج الروماني",
    category: "ruins",
    city: "Amman",
    lat: 31.9503,
    lng: 35.9359,
    visitDurationHours: 1,
    description: "Large, steeply raked 2nd-century Roman theatre in the heart of downtown Amman."
  },
  {
    id: "madaba",
    name: "Madaba",
    nameAr: "مأدبا",
    category: "ruins",
    city: "Madaba",
    lat: 31.7167,
    lng: 35.7833,
    visitDurationHours: 1.5,
    description: "City of mosaics, home to the famous Byzantine floor map of the Holy Land."
  },
  {
    id: "mount-nebo",
    name: "Mount Nebo",
    nameAr: "جبل نيبو",
    category: "ruins",
    city: "Madaba area",
    lat: 31.7683,
    lng: 35.7250,
    visitDurationHours: 1,
    description: "Biblical site where Moses is said to have viewed the Promised Land, with sweeping views."
  },
  {
    id: "pella",
    name: "Pella (Tabaqat Fahl)",
    nameAr: "طبقة فحل",
    category: "ruins",
    city: "Pella",
    lat: 32.4500,
    lng: 35.6167,
    visitDurationHours: 1.5,
    description: "Multi-era ruins in the Jordan Valley spanning Bronze Age to Islamic periods."
  },
  {
    id: "karak-castle",
    name: "Karak Castle",
    nameAr: "قلعة الكرك",
    category: "ruins",
    city: "Karak",
    lat: 31.1825,
    lng: 35.7008,
    visitDurationHours: 2,
    description: "Massive Crusader castle perched above the town of Karak on the King's Highway."
  },
  {
    id: "shobak-castle",
    name: "Shobak Castle",
    nameAr: "قلعة الشوبك",
    category: "ruins",
    city: "Shobak",
    lat: 30.5372,
    lng: 35.5589,
    visitDurationHours: 1.5,
    description: "Remote Crusader castle on a hilltop between Petra and the desert highway."
  },
  {
    id: "baptism-site",
    name: "Bethany Beyond the Jordan (Al-Maghtas)",
    nameAr: "المغطس",
    category: "ruins",
    city: "Jordan Valley",
    lat: 31.8378,
    lng: 35.5439,
    visitDurationHours: 1.5,
    description: "UNESCO World Heritage baptism site on the Jordan River, traditional site of Jesus' baptism."
  },

  // ===== DESERT =====
  {
    id: "wadi-rum",
    name: "Wadi Rum",
    nameAr: "وادي رم",
    category: "desert",
    city: "Wadi Rum",
    lat: 29.5324,
    lng: 35.4206,
    visitDurationHours: 5,
    description: "Vast red-sand desert valley with towering sandstone mountains; Bedouin camps and jeep tours."
  },
  {
    id: "dana-reserve",
    name: "Dana Biosphere Reserve",
    nameAr: "محمية ضانا",
    category: "desert",
    city: "Dana",
    lat: 30.6716,
    lng: 35.6034,
    visitDurationHours: 4,
    description: "Jordan's largest nature reserve, spanning rugged desert canyons and mountain villages."
  },
  {
    id: "humeima",
    name: "Humeima (Al-Humayma)",
    nameAr: "الحميمة",
    category: "desert",
    city: "Southern Desert",
    lat: 29.9333,
    lng: 35.4000,
    visitDurationHours: 1.5,
    description: "Remote desert archaeological site with Nabataean and early Abbasid ruins."
  },
  {
    id: "disi-desert",
    name: "Disi Desert",
    nameAr: "صحراء الديسي",
    category: "desert",
    city: "Disi",
    lat: 29.6833,
    lng: 35.6500,
    visitDurationHours: 3,
    description: "Quiet stretch of desert near Wadi Rum, known for sand dunes and stargazing camps."
  },

  // ===== DEAD SEA / UNIQUE NATURE =====
  {
    id: "dead-sea",
    name: "Dead Sea (Sweimeh)",
    nameAr: "البحر الميت",
    category: "deadsea",
    city: "Sweimeh",
    lat: 31.5590,
    lng: 35.5732,
    visitDurationHours: 3,
    description: "The lowest point on Earth; famous for its buoyant, mineral-rich waters and mud spas."
  },
  {
    id: "mujib-reserve",
    name: "Mujib Biosphere Reserve",
    nameAr: "محمية الموجب",
    category: "deadsea",
    city: "Mujib",
    lat: 31.4906,
    lng: 35.5820,
    visitDurationHours: 3,
    description: "Canyon reserve below sea level with river-trekking trails ending near the Dead Sea."
  },
  {
    id: "hammamat-main",
    name: "Ma'in Hot Springs",
    nameAr: "حمامات ماعين",
    category: "deadsea",
    city: "Ma'in",
    lat: 31.6167,
    lng: 35.6833,
    visitDurationHours: 2,
    description: "Waterfalls of naturally heated mineral water cascading over cliffs near the Dead Sea."
  },
  {
    id: "aqaba-red-sea",
    name: "Aqaba & Red Sea Coast",
    nameAr: "العقبة والبحر الأحمر",
    category: "deadsea",
    city: "Aqaba",
    lat: 29.5321,
    lng: 35.0063,
    visitDurationHours: 4,
    description: "Jordan's only coastal city, known for coral reef diving and snorkeling in the Red Sea."
  }
];

module.exports = places;
