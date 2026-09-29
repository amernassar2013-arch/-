// ===== اكتشف الأردن: shared logic (language, data, header/footer, pages) =====
const L=localStorage.lang||'ar',$=s=>document.querySelector(s);
document.documentElement.lang=L;document.documentElement.dir=L=='ar'?'rtl':'ltr';
const T={ar:{home:'الرئيسية',explore:'استكشف',plan:'تخطيط الذكاء الاصطناعي',lang:'EN',hk:'رحلة مصممة بالذكاء الاصطناعي',ht:'اكتشف الأردن <b>بطريقتك</b>',hs:'رحلتك المثالية تبدأ من اهتماماتك. دع الذكاء الاصطناعي يصمم لك تجربة أردنية أصيلة.',cta:'ابدأ التخطيط بالذكاء الاصطناعي',cta2:'استكشف الوجهات',ft:'نحو رحلة أردنية أكثر ذكاءً وأصالة.',rt:'اكتشف الأردن. جميع الحقوق محفوظة.',pt:'خطط رحلتك',pi:'ما الذي يهمك؟',days:'عدد الأيام',city:'مدينة الانطلاق',go:'أنشئ خطتي',why:'✨ لماذا اخترناه لك؟',whyt:'لأن اهتماماتك تطابق هذه الأماكن، ورتبناها من الأكثر تميزًا إلى الأقل.',day:'اليوم',et:'استكشف الوجهات',es:'الأماكن مقسمة حسب تفرّدها، من 5 نجوم إلى نجمة واحدة.',maps:'افتح في الخرائط',time:'الوقت المقترح',cost:'التكلفة',dist:'من عمّان',hr:'ساعات',jod:'د.أ',km:'كم',history:'تاريخ',nature:'طبيعة',desert:'صحراء',sea:'بحر',food:'طعام',adventure:'مغامرة',amman:'عمّان',aqaba:'العقبة',nf:'اختر اهتمامًا واحدًا على الأقل.',ek:'خطتك. ذوقك. الأردن.',et2:'مسار كامل، صُمّم لأجلك',es2:'من أول فنجان قهوة في عمّان إلى آخر غروب في وادي رم.',unf:'مكان لا يُنسى',disc:'اكتشف',z5:'تجربة لا تتكرر',z4:'استثنائي',z3:'مميز',z2:'يستحق الزيارة',z1:'محطة سريعة',l1:'تحليل اهتماماتك',l2:'حساب المسافات',l3:'تجهيز خطتك اليومية'},
en:{home:'Home',explore:'Explore',plan:'AI Planner',lang:'عربي',hk:'AI-designed trips',ht:'Discover Jordan <b>Your Way</b>',hs:'Your perfect trip starts with your interests. Let AI design an authentic Jordanian experience.',cta:'Start planning with AI',cta2:'Explore destinations',ft:'Toward a smarter, more authentic Jordan trip.',rt:'Discover Jordan. All rights reserved.',pt:'Plan your trip',pi:'What interests you?',days:'Days',city:'Starting city',go:'Create my plan',why:'✨ Why we chose this',whyt:'These places match your interests, ordered from most unique to least.',day:'Day',et:'Explore destinations',es:'Places grouped by uniqueness, from 5 stars down to 1.',maps:'Open in Maps',time:'Suggested time',cost:'Cost',dist:'From Amman',hr:'hours',jod:'JOD',km:'km',history:'History',nature:'Nature',desert:'Desert',sea:'Sea',food:'Food',adventure:'Adventure',amman:'Amman',aqaba:'Aqaba',nf:'Pick at least one interest.',ek:'Your plan. Your taste. Jordan.',et2:'A full route, designed for you',es2:'From the first coffee in Amman to the last sunset in Wadi Rum.',unf:'Unforgettable place',disc:'Discover',z5:'Once in a lifetime',z4:'Exceptional',z3:'Distinctive',z2:'Worth a visit',z1:'Quick stop',l1:'Analyzing your interests',l2:'Calculating distances',l3:'Preparing your daily plan'}};
const t=k=>T[L][k]||k;
// id, stars, lat, lng, interests, hours, JOD, km from Amman, [ar name, ar text], [en name, en text]
const P=[
['petra',5,30.3285,35.4444,['history','adventure'],'6',50,240,['مدينة البترا الوردية','مدينة نبطية منحوتة في الصخر، إحدى عجائب الدنيا السبع.'],['Petra, the Rose City','A Nabataean city carved into rock, one of the New Seven Wonders.']],
['wadi-rum',5,29.5766,35.4200,['desert','adventure'],'6',35,320,['وادي رم','صحراء الجبال الحمراء والرمال، اقضِ ليلة في مخيم بدوي.'],['Wadi Rum','Red sand and granite mountains. Spend a night in a Bedouin camp.']],
['jerash',4,32.2811,35.8993,['history'],'3',10,50,['جرش','مدينة رومانية محفوظة بأعمدتها وشوارعها ومسرحها.'],['Jerash','A well-preserved Roman city with colonnaded streets and theatres.']],
['dead-sea',4,31.5590,35.4732,['nature','sea'],'4',25,60,['البحر الميت','أخفض نقطة على الأرض، مياه مالحة وطين علاجي.'],['Dead Sea','The lowest point on Earth, with buoyant salt water and mineral mud.']],
['wadi-mujib',4,31.4430,35.8110,['nature','adventure'],'4',21,105,['وادي الموجب','مسارات مائية بين جدران الوادي، مغامرة منعشة.'],['Wadi Mujib','Water trails through a canyon, a refreshing adventure.']],
['ajloun',3,32.3326,35.7517,['history','nature'],'2',3,75,['قلعة عجلون','قلعة من العصر الإسلامي تطل على غابات الشمال.'],['Ajloun Castle','An Islamic-era castle overlooking northern forests.']],
['aqaba',3,29.5321,35.0063,['sea','adventure'],'5',30,330,['العقبة','غوص وشعاب مرجانية على البحر الأحمر.'],['Aqaba','Diving and coral reefs on the Red Sea.']],
['madaba',2,31.7160,35.7939,['history','food'],'2',5,35,['مادبا','مدينة الفسيفساء، وفيها خارطة الأرض المقدسة.'],['Madaba','The mosaic city, home to the Holy Land map.']],
['citadel',1,31.9543,35.9349,['history','food'],'2',3,0,['جبل القلعة في عمّان','آثار رومانية وأموية وإطلالة على وسط المدينة.'],['Amman Citadel','Roman and Umayyad ruins overlooking downtown.']]
,
['little-petra',4,30.4240,35.4470,['history','adventure'],'2',0,235,['البتراء الصغيرة','موقع نبطي هادئ قرب البترا، مثالي للاستكشاف.'],['Little Petra','A quiet Nabataean site near Petra, ideal for exploring.']],
['um-sayhoun',2,30.3390,35.4370,['food'],'1',8,240,['غداء أردني في أم صيحون','منسف ومأكولات محلية في قرية قرب البترا.'],['Jordanian lunch in Um Sayhoun','Mansaf and local dishes in a village near Petra.']]
].map(a=>({id:a[0],s:a[1],lat:a[2],lng:a[3],tags:a[4],h:a[5],jod:a[6],km:a[7],n:a[L=='ar'?8:9][0],d:a[L=='ar'?8:9][1]}));
const img=(id,i)=>`background-image:url(images/${id}${i?'-'+i:''}.jpg)`;
const stars=n=>`<span class=star>${'★'.repeat(n)}</span>`;
const mapsUrl=p=>`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`; // opens the native Maps app on phones
const card=p=>`<a class=card href="place.html?id=${p.id}"><div class=im style="${img(p.id)}"></div><div class=tx>${stars(p.s)}<h3>${p.n}</h3><small>${p.d}</small></div></a>`;
const logo=`<svg width=32 height=32 viewBox="0 0 32 32" fill=none stroke=currentColor stroke-width=2 aria-hidden=true><path d="M16 29s9-8 9-15a9 9 0 10-18 0c0 7 9 15 9 15z"/><circle cx=16 cy=14 r=3.5 /></svg>`;
// header + footer on every page (the green footer stays everywhere)
const pg=document.body.dataset.page,nv=(h,k,p)=>`<a href="${h}" class="${pg==p?'on':''}">${t(k)}</a>`;
$('#hdr').innerHTML=`<header><div class=wrap><a class=logo href="index.html">${logo} ${L=='ar'?'اكتشف الأردن':'Discover Jordan'}</a><nav>${nv('index.html','home','home')}${nv('explore.html','explore','explore')}${nv('planner.html','plan','planner')}</nav><button id=mb aria-label=menu>☰</button><button class="lang" id=lg>${t('lang')}</button></div></header>`;
$('#ftr').innerHTML=`<footer><div class=wrap><div><h3>${L=='ar'?'اكتشف الأردن':'Discover Jordan'}</h3><p>${t('ft')}</p></div><div>${nv('explore.html','explore','')}${nv('planner.html','plan','')}</div><div><a href="#">Instagram</a><a href="#">YouTube</a></div></div><div class=wrap><small>© 2026 ${t('rt')}</small></div></footer>`;
$('#mb').onclick=()=>$('nav').classList.toggle('open');
$('#lg').onclick=()=>{localStorage.lang=L=='ar'?'en':'ar';location.reload()};
document.querySelectorAll('[data-i]').forEach(e=>e.innerHTML=t(e.dataset.i));
// ---- explore: zones from 5 stars down to 1 ----
if(pg=='explore')$('#zones').innerHTML=[5,4,3,2,1].map(n=>{const l=P.filter(p=>p.s==n);return l.length?`<section class=zone><h2>${stars(n)} <small>${t('z'+n)}</small></h2><div class=grid>${l.map(card).join('')}</div></section>`:''}).join('');
// ---- place: photos, quick specs, intro, maps button ----
if(pg=='place'){const p=P.find(x=>x.id==new URLSearchParams(location.search).get('id'))||P[0];document.title=p.n;
$('#pl').innerHTML=`<h1>${p.n}</h1>${stars(p.s)}<div class=gal>${[0,1,2].map(i=>`<div class=im style="${img(p.id,i||'')}"></div>`).join('')}</div><div class=specs><span>${t('time')}<b>${p.h} ${t('hr')}</b></span><span>${t('dist')}<b>${p.km} ${t('km')}</b></span><span>${t('cost')}<b>${p.jod} ${t('jod')}</b></span></div><p>${p.d}</p><br><a class="btn gold" target=_blank rel=noopener href="${mapsUrl(p)}">📍 ${t('maps')}</a>`}
// ---- shared: trip view (day tabs + timeline + route map + AI callout) ----
const TM=L=='ar'?['8:30 ص','1:00 م','4:30 م']:['8:30 AM','1:00 PM','4:30 PM'];
function routeMap(l){const f=k=>l.map(p=>p[k]),a=Math.min(...f('lng')),b=Math.max(...f('lng')),c=Math.min(...f('lat')),d=Math.max(...f('lat'));
const X=p=>b==a?300:60+(p.lng-a)/(b-a)*480,Y=p=>d==c?150:50+(d-p.lat)/(d-c)*200;
return `<svg class=map viewBox="0 0 600 320"><path d="${l.map((p,i)=>(i?'L':'M')+X(p)+','+Y(p)).join('')}" fill=none stroke="#176B5B" stroke-width=3 stroke-dasharray="8 8"/>${l.map((p,i)=>`<a href="${mapsUrl(p)}" target=_blank><circle cx=${X(p)} cy=${Y(p)} r=14 fill="#176B5B"/><text x=${X(p)} y=${Y(p)+5} text-anchor=middle fill=#fff font-size=14>${i+1}</text><text x=${X(p)} y=${Y(p)+36} text-anchor=middle font-size=14 font-weight=700>${p.n}</text></a>`).join('')}</svg>`}
function trip(el,days){el.innerHTML=`<div class=tabs>${days.map((d,i)=>`<button class="tab${i?'':' on'}" data-d=${i}>${t('day')} ${i+1}<small>${d[0].n}</small></button>`).join('')}</div><div class=split><div id=tl></div><div id=mp></div></div><div class=why><b>${t('why')}</b><p>${t('whyt')}</p></div>`;
const show=i=>{el.querySelector('#tl').innerHTML=days[i].map((p,j)=>`<div class=slot><span class=tm>${TM[j]||''}</span><a class=card href="place.html?id=${p.id}"><div class=im style="${img(p.id)}"></div><div class=tx>${stars(p.s)}<h3>${p.n}</h3><small>${p.h} ${t('hr')} · ${p.jod} ${t('jod')}</small></div></a></div>`).join('');el.querySelector('#mp').innerHTML=routeMap(days[i])};
el.querySelector('.tabs').onclick=e=>{const b=e.target.closest('.tab');if(!b)return;el.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x==b));show(+b.dataset.d)};show(0)}
// ---- planner: interests + days -> loading checklist -> trip view ----
if(pg=='planner'){const sel=new Set(),I=['history','nature','desert','sea','food','adventure'];
$('#ints').innerHTML=I.map(k=>`<div class=opt data-k=${k}>${t(k)}</div>`).join('');
$('#ints').onclick=e=>{const k=e.target.dataset.k;if(!k)return;sel.has(k)?sel.delete(k):sel.add(k);e.target.classList.toggle('on')};
$('#go').onclick=async()=>{if(!sel.size)return alert(t('nf'));const n=+$('#nd').value||1,w=ms=>new Promise(r=>setTimeout(r,ms));
const ov=document.createElement('div');ov.className='ov';ov.innerHTML=`<div class=box><h3>${t('plan')}</h3><ul>${['l1','l2','l3'].map(k=>`<li>${t(k)}</li>`).join('')}</ul></div>`;document.body.append(ov);
for(const li of ov.querySelectorAll('li')){await w(700);li.classList.add('done')}await w(400);ov.remove();
const l=P.filter(p=>p.tags.some(x=>sel.has(x))).sort((a,b)=>b.s-a.s),days=[];for(let d=0;d<n;d++){const x=l.slice(d*3,d*3+3);if(x.length)days.push(x)}
trip($('#res'),days);$('#res').scrollIntoView({behavior:'smooth'});
// TODO Firebase: save {interests:[...sel], days:n, city:$('#ct').value} to Firestore here
}}
// ---- home: sample trip + featured place ----
if(pg=='home'){const g=id=>P.find(p=>p.id==id);trip($('#trip'),[['petra','um-sayhoun','little-petra'],['wadi-rum'],['aqaba']].map(d=>d.map(g)));
const w=g('wadi-rum');$('#feat').innerHTML=`<div class=gal>${[0,1,2].map(i=>`<div class=im style="${img(w.id,i||'')}"></div>`).join('')}</div><div><small>${t('unf')}</small><h2>${w.n}</h2><p>${w.d}</p><div class=specs><span>${t('dist')}<b>${w.km} ${t('km')}</b></span><span>${t('cost')}<b>${w.jod} ${t('jod')}</b></span></div><a class="btn gold" href="place.html?id=${w.id}">${t('disc')} ${w.n}</a></div>`}
