import { useState } from "react";
import { getItinerary } from "./api.js";

const heroImage =
  "https://images.unsplash.com/photo-1580204745408-9c18ddb64978?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800";
const petraImage =
  "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000";
const wadiImage =
  "https://images.unsplash.com/photo-1709599349283-9e207d6b2d99?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000";
const desertImage =
  "https://images.unsplash.com/photo-1673581209399-fab96b153c25?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000";

type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "compass"
  | "food"
  | "history"
  | "location"
  | "map"
  | "menu"
  | "minus"
  | "nature"
  | "plus"
  | "route"
  | "sea"
  | "sparkle"
  | "user";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    food: <><path d="M7 3v8M4 3v5c0 2 6 2 6 0V3M7 11v10M16 3v18M16 3c3 2 4 6 0 9" /></>,
    history: <><path d="M4 20h16M6 17h12M7 8h10M8 8v9M12 8v9M16 8v9M5 8l7-5 7 5" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    minus: <path d="M5 12h14" />,
    nature: <><path d="M12 21V8" /><path d="M12 13c-5 0-7-3-7-7 4 0 7 2 7 7ZM12 10c1-4 4-6 8-6 0 5-3 8-8 8" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h2c5 0 1-12 6-12" /></>,
    sea: <><path d="M3 9c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M3 15c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" /></>,
    sparkle: <><path d="m12 3 1.4 4.1L17.5 9l-4.1 1.6L12 15l-1.5-4.4L6.5 9l4-1.9L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.8L19 21l-.8-2.2L16 18l2.2-.7L19 15Z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-5 3.5-7 8-7s7.2 2 8 7" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const interests: { name: string; icon: IconName }[] = [
  { name: "التاريخ والآثار", icon: "history" },
  { name: "الطبيعة", icon: "nature" },
  { name: "الصحراء", icon: "compass" },
  { name: "البحر والاسترخاء", icon: "sea" },
  { name: "الطعام المحلي", icon: "food" },
  { name: "المغامرة", icon: "route" },
];

// Maps the Arabic interest labels shown in the UI to the backend's category ids.
// "الطعام المحلي" and "المغامرة" have no matching backend category yet,
// so they're simply ignored when building the request.
const interestToCategory: Record<string, string> = {
  "التاريخ والآثار": "ruins",
  "الطبيعة": "mountains",
  "الصحراء": "desert",
  "البحر والاسترخاء": "deadsea",
};

const categoryToArabicTag: Record<string, string> = {
  ruins: "تاريخ وآثار",
  mountains: "طبيعة",
  desert: "صحراء ومغامرة",
  deadsea: "بحر واسترخاء",
};

// Placeholder image per category until real per-place photos are added.
const categoryImage: Record<string, string> = {
  ruins: petraImage,
  desert: wadiImage,
  mountains: desertImage,
  deadsea: heroImage,
};

type ItineraryPlace = {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  city: string;
  visitDurationHours: number;
  description: string;
};

type ItineraryDay = {
  day: number;
  places: ItineraryPlace[];
};

export default function App() {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [selected, setSelected] = useState(["التاريخ والآثار", "الطبيعة", "المغامرة"]);
  const [days, setDays] = useState(4);
  const [activeDay, setActiveDay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (name: string) =>
    setSelected((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    const categories = Array.from(
      new Set(selected.map((name) => interestToCategory[name]).filter(Boolean)),
    );

    if (categories.length === 0) {
      setError("اختر اهتمام واحد على الأقل من: التاريخ، الطبيعة، الصحراء، أو البحر");
      setLoading(false);
      return;
    }

    try {
      const result = await getItinerary({ categories, days });
      setItineraryDays(result.itinerary);
      setLoading(false);
      setPlannerOpen(false);
      setActiveDay(0);
      document.getElementById("trip")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "صار في خطأ، حاول مرة ثانية");
      setLoading(false);
    }
  }

  const currentDay = itineraryDays[activeDay];
  const hasItinerary = itineraryDays.length > 0;

  return (
    <main dir="rtl">
      <header className="site-header">
        <a className="brand" href="#" aria-label="اكتشف الأردن، الرئيسية">
          <span className="brand-mark">
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M16 4.5 25 7l1 5 5 2-2 5 3 5-6 2-2 9-7-3-5-7 2-6-3-5 5-9Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M24.5 16.5c0 3-4.5 6.5-4.5 6.5s-4.5-3.5-4.5-6.5a4.5 4.5 0 1 1 9 0Z" fill="#D8B27C" />
              <circle cx="20" cy="16.5" r="1.5" fill="white" />
            </svg>
          </span>
          <span><b>اكتشف الأردن</b><small>JORDAN, YOUR WAY</small></span>
        </a>

        <nav className={mobileNav ? "nav open" : "nav"} aria-label="التنقل الرئيسي">
          <a className="active" href="#">الرئيسية</a>
          <a href="#place">استكشف</a>
          <button onClick={() => setPlannerOpen(true)}>تخطيط الذكاء الاصطناعي</button>
          <a href="#trip">رحلاتي</a>
        </nav>

        <div className="header-actions">
          <button className="language">EN <span></span></button>
          <button className="profile" aria-label="الملف الشخصي"><Icon name="user" size={18} /></button>
          <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="فتح القائمة"><Icon name="menu" /></button>
        </div>
      </header>

      <section className="hero">
        <img src={heroImage} alt="جبال وادي رم في الأردن" />
        <div className="hero-shade"></div>
        <div className="hero-content">
          <span className="eyebrow"><Icon name="sparkle" size={16} /> رحلة مصممة بالذكاء الاصطناعي</span>
          <h1>اكتشف الأردن<br /><em>بطريقتك</em></h1>
          <p>رحلتك المثالية تبدأ من اهتماماتك. دع الذكاء الاصطناعي يصمم لك تجربة أردنية أصيلة، لحظة بلحظة.</p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={() => setPlannerOpen(true)}>
              ابدأ التخطيط بالذكاء الاصطناعي <Icon name="arrow" />
            </button>
            <a href="#place" className="ghost-button">استكشف الوجهات</a>
          </div>
          <div className="trust-row">
            <div className="avatar-stack"><span>م</span><span>س</span><span>ل</span></div>
            <div><strong>+٢٤ ألف</strong><small>مسافر خطط رحلته معنا</small></div>
            <div className="stars">★★★★★ <small>٤.٩</small></div>
          </div>
        </div>
        <div className="weather-card">
          <div><span>الآن في البتراء</span><strong>٢٤°</strong></div>
          <span className="sun"></span>
        </div>
        <div className="scroll-hint"><span></span> مرّر للاستكشاف</div>
      </section>

      <section className="intro section-shell">
        <div>
          <span className="section-kicker">خطتك. ذوقك. الأردن.</span>
          <h2>مسار كامل، صُمّم لأجلك</h2>
        </div>
        <p>من أول فنجان قهوة في عمّان إلى آخر غروب في وادي رم، نختار كل محطة بناءً على ما تحب.</p>
      </section>

      <section className="trip-workspace section-shell" id="trip">
        <div className="itinerary">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">رحلتك القادمة</span>
              <h2>{hasItinerary ? `${itineraryDays.length} أيام مصمّمة لك` : "صمّم رحلتك الآن"}</h2>
            </div>
            <button className="icon-button" aria-label="التقويم"><Icon name="calendar" /></button>
          </div>

          {!hasItinerary && (
            <p style={{ padding: "1rem 0", opacity: 0.7 }}>
              اضغط "ابدأ التخطيط بالذكاء الاصطناعي" فوق لتوليد خطتك.
            </p>
          )}

          {hasItinerary && (
            <>
              <div className="day-tabs">
                {itineraryDays.map((day, index) => (
                  <button
                    key={day.day}
                    className={activeDay === index ? "active" : ""}
                    onClick={() => setActiveDay(index)}
                  >
                    اليوم {day.day}
                  </button>
                ))}
              </div>

              <div className="timeline">
                {(currentDay?.places || []).map((place) => (
                  <article className="timeline-item" key={place.id}>
                    <div className="time">
                      <b>{place.visitDurationHours} ساعة</b>
                      <span></span>
                    </div>
                    <div className="place-card">
                      <img src={categoryImage[place.category] ?? petraImage} alt="" />
                      <div>
                        <span>{categoryToArabicTag[place.category] ?? place.category}</span>
                        <h3>{place.nameAr}</h3>
                        <p><Icon name="location" size={15} /> {place.city}</p>
                      </div>
                      <Icon name="chevron" />
                    </div>
                  </article>
                ))}
              </div>

              <div className="ai-reasoning">
                <span className="ai-icon"><Icon name="sparkle" /></span>
                <div>
                  <b>لماذا اخترناه لك؟</b>
                  <p>رتّبنا الأماكن جغرافياً حسب اهتماماتك لتقليل وقت التنقل بين المحطات.</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="map-panel" aria-label="خريطة تفاعلية لمسار الرحلة">
          <div className="map-topbar">
            <span><Icon name="route" size={17} /> المسار الأمثل <b>٣ س ٤٥ د</b></span>
            <button><Icon name="map" size={17} /> طبقات الخريطة</button>
          </div>
          <div className="map-lines">
            <svg viewBox="0 0 760 670" preserveAspectRatio="none" aria-hidden="true">
              <path className="terrain" d="M-30 110c150-50 200 55 340 5s220-30 490 45M-20 420c130-70 210 40 350-20s250-45 480 10M100-10c15 150 90 180 60 310s35 250 5 390M600-10c-80 120 20 230-20 350s10 200 60 350" />
              <path className="route-line-back" d="M570 100C490 155 550 245 430 290S315 420 220 450s-30 120-110 150" />
              <path className="route-line" d="M570 100C490 155 550 245 430 290S315 420 220 450s-30 120-110 150" />
            </svg>
            <div className="map-label amman">عمّان</div>
            <div className="map-label karak">الكرك</div>
            <div className="map-label aqaba">العقبة</div>
            <div className="map-pin pin-one"><span>١</span><b>البتراء</b></div>
            <div className="map-pin pin-two"><span>٢</span><b>وادي رم</b></div>
            <div className="map-pin pin-three"><span>٣</span><b>العقبة</b></div>
          </div>
          <article className="map-place-preview">
            <img src={petraImage} alt="الخزنة في مدينة البتراء" />
            <div><span>المحطة الأولى</span><h3>مدينة البتراء</h3><p>المدينة الوردية، إحدى عجائب الدنيا السبع</p></div>
            <button><Icon name="arrow" /></button>
          </article>
        </div>
      </section>

      <section className="place-section section-shell" id="place">
        <div className="place-copy">
          <span className="section-kicker">مكان لا يُنسى</span>
          <h2>وادي رم، حيث يبدو<br />الأفق بلا نهاية</h2>
          <p>تجوّل بين جبال الغرانيت والرمال الحمراء، واختبر سكون الصحراء كما عاشه البدو لقرون.</p>
          <div className="quick-specs">
            <div><Icon name="clock" /><span>الوقت المقترح<b>٥–٦ ساعات</b></span></div>
            <div><Icon name="route" /><span>من البتراء<b>١١٢ كم</b></span></div>
            <div><Icon name="compass" /><span>التكلفة<b>ابتداءً من ٣٥ د.أ</b></span></div>
          </div>
          <button className="text-button">اكتشف وادي رم <Icon name="arrow" /></button>
        </div>
        <div className="gallery">
          <img className="gallery-main" src={wadiImage} alt="صحراء وادي رم" />
          <img src={desertImage} alt="جبال الصحراء في الأردن" />
          <img src={heroImage} alt="منظر واسع لوادي رم" />
          <span>+١٢ صورة</span>
        </div>
      </section>

      <footer>
        <div className="footer-main section-shell">
          <div className="footer-brand">
            <div className="brand"><span className="brand-mark"><Icon name="location" /></span><span><b>اكتشف الأردن</b><small>JORDAN, YOUR WAY</small></span></div>
            <p>نحو رحلة أردنية أكثر ذكاءً، أصالةً، وقرباً منك.</p>
          </div>
          <div><b>استكشف</b><a href="#place">الوجهات</a><a href="#trip">رحلات مقترحة</a><a href="#">تجارب محلية</a></div>
          <div><b>خطط رحلتك</b><button onClick={() => setPlannerOpen(true)}>مخطط الذكاء الاصطناعي</button><a href="#">دليل السفر</a><a href="#">الأسئلة الشائعة</a></div>
          <div><b>تابعنا</b><a href="#">Instagram</a><a href="#">YouTube</a><a href="#">X / Twitter</a></div>
        </div>
        <div className="footer-bottom section-shell"><span>© ٢٠٢٥ اكتشف الأردن. جميع الحقوق محفوظة.</span><span><a href="#">الخصوصية</a><a href="#">الشروط والأحكام</a></span></div>
      </footer>

      {plannerOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="planner-modal" role="dialog" aria-modal="true" aria-label="مخطط الرحلة بالذكاء الاصطناعي">
            <button className="modal-close" onClick={() => setPlannerOpen(false)} aria-label="إغلاق"><Icon name="close" /></button>
            <div className="modal-step">الخطوة ١ من ٣ <span><i></i></span></div>
            <span className="section-kicker"><Icon name="sparkle" size={15} /> مخطط الرحلة الذكي</span>
            <h2>ما الذي يثير شغفك؟</h2>
            <p>اختر اهتماماتك وسنصمم رحلة تشبهك تماماً.</p>

            <div className="interest-grid">
              {interests.map((interest) => {
                const isSelected = selected.includes(interest.name);
                return (
                  <button className={isSelected ? "selected" : ""} key={interest.name} onClick={() => toggleInterest(interest.name)}>
                    <span><Icon name={interest.icon} /></span>{interest.name}
                    {isSelected && <i><Icon name="check" size={13} /></i>}
                  </button>
                );
              })}
            </div>

            <div className="trip-fields">
              <div>
                <label>مدة الرحلة</label>
                <div className="counter">
                  <button onClick={() => setDays(Math.max(1, days - 1))}><Icon name="minus" size={16} /></button>
                  <b>{days} أيام</b>
                  <button onClick={() => setDays(Math.min(14, days + 1))}><Icon name="plus" size={16} /></button>
                </div>
              </div>
              <div>
                <label htmlFor="city">نقطة الانطلاق</label>
                <div className="select-wrap">
                  <Icon name="location" size={17} />
                  <select id="city"><option>عمّان</option><option>العقبة</option><option>البتراء</option><option>إربد</option></select>
                  <Icon name="chevron" size={16} />
                </div>
              </div>
            </div>

            <button className="generate-button" disabled={!selected.length} onClick={handleGenerate}>
              صمّم رحلتي الآن <Icon name="sparkle" />
            </button>

            {error && <p style={{ color: "#c0392b", textAlign: "center", marginTop: "0.5rem" }}>{error}</p>}
            <small className="privacy-note">لن يستغرق الأمر أكثر من دقيقة واحدة</small>

            {loading && (
              <div className="loading-overlay">
                <div className="orb"><Icon name="sparkle" size={28} /></div>
                <h3>نصمم رحلتك المثالية</h3>
                <p>لحظات قليلة ونأخذك إلى الأردن الذي تحب</p>
                <ul>
                  <li className="done"><Icon name="check" size={15} /> تحليل اهتماماتك</li>
                  <li className="active"><span></span> حساب المسافات والأوقات</li>
                  <li><span></span> تجهيز خطتك اليومية</li>
                </ul>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}