/* ===== DATA ===== */
const YOUTUBE_STREAM_ID = 'CGBynso5h50';

const highlights = [
  { name: 'Plázs', location: 'Belső udvar', emoji: '🏖️', color: '#ff3131' },
  { name: 'HYROX Vetélkedő', location: 'Rekortán pálya', emoji: '💪', color: '#00bf63' },
  { name: 'Bánki legerősebb embere', location: 'Konditerem', emoji: '🏋️', color: '#ffde59', dark: true },
  { name: 'Szabadulószoba', location: 'B12', emoji: '🔒', color: '#38b6ff' },
  { name: 'Tanár-Cosplay', location: 'Iskola területe', emoji: '🎭', color: '#ff3131' },
];

const programs = [
  { id: 0,  name: 'Diáknap megnyitó',           location: 'B belső udvar',              time: '08:00',       type: 'fixed',   teacher: 'Juhász Arnold',              desc: 'A Diáknap hivatalos megnyitója a B udvaron – a főszervezők köszöntik a diákokat, ismertetik a nap programjait, majd elindul a buli.' },
  { id: 1,  name: 'HYROX Vetélkedő',             location: 'Rekortán pálya',             time: '08:00–12:00', type: 'halfday', teacher: 'Hartman Noémi',              desc: 'Erőnléti és ügyességi feladatokból álló verseny, ahol a csapatok különböző fizikai kihívásokban mérik össze tudásukat.' },
  { id: 2,  name: 'Drámajáték',                  location: 'Rajz terem',                 time: 'egész nap',   type: 'allday',  teacher: 'Molnár Klára',               desc: '2 fős csapatok húznak karaktert, helyszínt és szituációt – aztán meg kell alkotni és eljátszani egy kisebb jelenetet. Improvizáció, humor és kreativitás.' },
  { id: 3,  name: 'Bármi csak egy táska',        location: 'Iskola területe',            time: 'egész nap',   type: 'allday',  teacher: '–',                          desc: 'Minden diák hoz valamit, ami nem táska – a legjobb és legviccesebb alkotásokat értékeljük és jutalmazzuk.' },
  { id: 4,  name: 'Karaoke',                     location: 'Technika terem',             time: 'egész nap',   type: 'allday',  teacher: 'Horváth Veronika',           desc: 'Kötetlen éneklési lehetőség, ahol bárki előadhatja kedvenc dalát, egyénileg vagy csapatban.' },
  { id: 5,  name: 'Tanár-Cosplay',               location: 'Iskola területe',            time: 'nagyszünet',  type: 'special', teacher: 'Hering Zsolt',               desc: 'Öltözz be a kedvenc tanárodnak és játszd el! Nagyszünetben összegyűlünk az aulában, majd közösen pontozunk és értékelünk.' },
  { id: 6,  name: 'Bánki legerősebb embere',     location: '60 méteres pálya',           time: 'egész nap',   type: 'allday',  teacher: 'Fekete Gábor',               desc: 'Súlyemelőverseny kreatív erőpróbákkal – ki a Bánki legerősebb embere 2026-ban? Különböző fizikai kihívások várnak egész nap.' },
  { id: 7,  name: 'Foci bajnokság',              location: 'Ketrec',                     time: 'egész nap',   type: 'allday',  teacher: 'Zwickl-Szabó Judit',         desc: 'Osztályok közötti futballtorna a ketrecpályán – verbuválj csapatot és küzdj a bajnoki cím megszerzéséért!' },
  { id: 8,  name: 'ST Cinema Club',              location: 'Multimédia terem',           time: 'egész nap',   type: 'allday',  teacher: 'Seffer Tímea',               desc: 'Filmvetítés nyugodt környezetben, ahol a diákok kikapcsolódhatnak és közösen nézhetnek meg egy alkotást.' },
  { id: 9,  name: 'Tanár-diák focimeccs',        location: 'Rekortán pálya',             time: '12:00',       type: 'fixed',   teacher: '–',                          desc: 'A foci bajnokság nyertese kiáll megmérkőzni egy tanári csapattal a rekortán pályán. Ki nyer – a diákok vagy a tanárok?' },
  { id: 10, name: 'Programozás verseny',         location: 'A/216',                      time: 'egész nap',   type: 'allday',  teacher: 'Orsó Lajos',                 desc: 'Logikai és algoritmikus feladatok megoldása számítógépen, egyéni vagy csapatverseny formájában.' },
  { id: 11, name: 'Jiu-jitsu próbaedzés',        location: 'Balneo',                     time: '09:00',       type: 'fixed',   teacher: 'Balogh Dárius',              desc: 'Ingyenes bevezető edzés a brazil jiu-jitsu alapjaiba – előképzettség nem szükséges, csak jó hangulat és egy kis bátorság.' },
  { id: 12, name: 'Társasjáték',                 location: 'B5',                         time: 'egész nap',   type: 'allday',  teacher: 'Erdély Györgyi Anna',        desc: 'Stratégiai, kooperatív és party társasjátékok széles kínálatával – csatlakozz egy meglévő játékhoz, vagy kezdj egy újat barátaiddal.' },
  { id: 13, name: 'Graffiti fal',                location: 'Színes terem',               time: 'egész nap',   type: 'allday',  teacher: 'Antal Szilvia',              desc: 'Hatalmas papír a padlón – mindenki rajzolhat amit akar. A nap végén egy közös alkotás születik, amit kiállításként tekinthetsz meg pár hétig.' },
  { id: 14, name: 'Vakvezetés',                  location: 'A épület, 2. em. aula',      time: 'egész nap',   type: 'allday',  teacher: 'Gyimesi Janka',              desc: 'Kétfős csapatok: az egyik játékos bekötött szemmel halad, míg a társa szóban irányítja. A cél: minél gyorsabban és hibamentesebben teljesíteni a pályát.' },
  { id: 15, name: 'Ping-pong liga',              location: 'Aula',                       time: 'egész nap',   type: 'allday',  teacher: 'Fadilné Eizen Erika',        desc: 'Folyamatosan zajló asztalitenisz-bajnokság – állj asztalhoz bármikor és küzdj fel magad a ligatabella csúcsára.' },
  { id: 16, name: 'Plázs',                       location: 'Belső udvar',                time: 'egész nap',   type: 'allday',  teacher: 'DÖK',                        desc: 'Közösségi tér DJ-vel, podcast-szerű beszélgetős műsorokkal (tanár-diák, diák-diák, tanár-tanár) és limonádéval – a nap szíve.' },
  { id: 17, name: 'Kémia bemutató',              location: 'A épület, 2. em. kémialabor',time: 'egész nap',   type: 'allday',  teacher: 'Máth Csaba',                 desc: 'Látványos kísérletek és érdekes bemutatók a kémia világából.' },
  { id: 18, name: 'Szabadulószoba',              location: 'B12',                        time: 'egész nap',   type: 'allday',  teacher: 'Klementi Csaba',             desc: 'Logikai feladatokkal teli játék, ahol a csapatoknak együttműködve kell kijutniuk a szobából. 2–3 fős csapatokkal.' },
  { id: 19, name: 'Kincskeresés',                location: 'B épület',                   time: 'egész nap',   type: 'allday',  teacher: 'DÖK',                        desc: 'A B épületben véletlenszerű tárgyak bújnak meg – játékos szöveges clue-k alapján kell megtalálni őket. Ki ér a kincshez először?' },
  { id: 20, name: 'Kvíz verseny',                location: 'A/228',                      time: 'egész nap',   type: 'allday',  teacher: 'Vojnár Ágnes',               desc: 'Általános műveltségi vetélkedő, ahol a csapatok különböző témákban mérik össze tudásukat.' },
  { id: 21, name: 'Fotóstand',                   location: 'Aula',                       time: 'egész nap',   type: 'allday',  teacher: '–',                          desc: 'Kreatív fotózkodási lehetőség vicces kellékekkel és háttérrel – vidd haza az emléket a Diáknap 2026-ról.' },
  { id: 22, name: 'Kovácsolás misztériuma',      location: 'Műhelyek',                   time: 'egész nap',   type: 'allday',  teacher: 'Magócs Tibor',               desc: 'Bemutató a fémmegmunkálás világából, ahol a résztvevők megismerhetik a kovácsolás alapjait.' },
  { id: 23, name: 'Vita klub',                   location: 'Könyvtár',                   time: '08:00–12:00', type: 'halfday', teacher: 'Barcza László',              desc: 'Formális vita előre megadott témákkal, Pro és Kontra oldallal – érvelj, meggyőzz és védd az álláspontodat strukturált keretek között.' },
];

/* ===== THEME ===== */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const navLogo = document.getElementById('nav-logo');
const heroLogo = document.getElementById('hero-logo');

function getTheme() {
  return localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const logoSrc = theme === 'light' ? 'assets/logo-light.png' : 'assets/logo-dark.png';
  if (navLogo) navLogo.src = logoSrc;
  if (heroLogo) heroLogo.src = 'assets/logo-dark.png';
}

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

applyTheme(getTheme());

/* ===== SMART NAV ===== */
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > 80 && y > lastScrollY) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
      lastScrollY = y;
      ticking = false;
    });
    ticking = true;
  }
});

/* ===== PARALLAX HERO ===== */
const heroBg = document.getElementById('hero-bg');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let parallaxTicking = false;
  window.addEventListener('scroll', () => {
    if (!parallaxTicking && window.scrollY < window.innerHeight) {
      requestAnimationFrame(() => {
        heroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.25}px)`;
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });
}

/* ===== COUNTDOWN ===== */
const TARGET = new Date('2026-05-15T08:00:00+02:00');

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');
const cdWrap = document.getElementById('countdown-wrap');
const cdToday = document.getElementById('countdown-today');

function pad(n) { return String(n).padStart(2, '0'); }

function tickNum(el, val) {
  const next = pad(val);
  if (el.textContent !== next) {
    el.textContent = next;
    el.classList.remove('tick');
    void el.offsetWidth;
    el.classList.add('tick');
  }
}

function updateCountdown() {
  const now = new Date();
  const diff = TARGET - now;

  if (diff <= 0) {
    cdWrap.style.display = 'none';
    cdToday.style.display = 'block';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  tickNum(cdDays, days);
  tickNum(cdHours, hours);
  tickNum(cdMins, mins);
  tickNum(cdSecs, secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== HIGHLIGHTS RENDER ===== */
const highlightsGrid = document.getElementById('highlights-grid');

highlights.forEach((h, i) => {
  const card = document.createElement('div');
  card.className = 'highlight-card fade-up';
  card.style.backgroundColor = h.color;
  card.style.transitionDelay = `${i * 80}ms`;

  card.innerHTML = `
    <span class="hc-emoji">${h.emoji}</span>
    <div class="hc-name">${h.name}</div>
    <div class="hc-loc">${h.location}</div>
  `;

  if (h.dark) {
    card.style.color = '#111';
    card.querySelector('.hc-name').style.color = '#111';
    card.querySelector('.hc-loc').style.color = 'rgba(0,0,0,0.55)';
  }

  highlightsGrid.appendChild(card);
});

/* ===== PROGRAMS RENDER ===== */
const programsGrid = document.getElementById('programs-grid');

function badgeClass(type) {
  if (type === 'allday') return 'badge-allday';
  if (type === 'fixed')  return 'badge-fixed';
  return 'badge-special';
}

programs.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'program-card fade-up';
  card.setAttribute('data-type', p.type);
  card.setAttribute('data-filter', p.type);
  card.setAttribute('data-id', p.id);
  card.style.transitionDelay = `${i * 40}ms`;

  card.innerHTML = `
    <div class="pc-name">${p.name}</div>
    <div class="pc-footer">
      <div class="pc-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>${p.location}</span>
      </div>
      <span class="pc-badge ${badgeClass(p.type)}">${p.time}</span>
    </div>
  `;

  programsGrid.appendChild(card);
});

/* ===== PROGRAM DETAIL MODAL ===== */
(function () {
  const overlay    = document.getElementById('prog-modal-overlay');
  const closeBtn   = document.getElementById('prog-modal-close');
  const titleEl    = document.getElementById('prog-modal-title');
  const locationEl = document.getElementById('prog-modal-location');
  const timeEl     = document.getElementById('prog-modal-time');
  const teacherEl  = document.getElementById('prog-modal-teacher');
  const descEl     = document.getElementById('prog-modal-desc');

  function open(id) {
    const p = programs.find(x => x.id === id);
    if (!p) return;
    titleEl.textContent = p.name;
    locationEl.textContent = p.location;
    timeEl.textContent = p.time;
    timeEl.className = `pc-badge ${badgeClass(p.type)}`;
    teacherEl.textContent = p.teacher;
    descEl.textContent = p.desc;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('programs-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.program-card');
    if (!card) return;
    open(Number(card.dataset.id));
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });
}());

/* ===== FILTER ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.program-card').forEach(card => {
      const type = card.dataset.filter;
      const show = filter === 'all' || type === filter ||
        (filter === 'fixed' && (type === 'fixed' || type === 'halfday'));
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ===== YOUTUBE EMBED ===== */
const livePlaceholder = document.getElementById('live-placeholder');
const liveIframeWrap = document.getElementById('live-iframe-wrap');
const ytIframe = document.getElementById('yt-iframe');

if (YOUTUBE_STREAM_ID) {
  ytIframe.src = `https://www.youtube.com/embed/${YOUTUBE_STREAM_ID}?autoplay=1&rel=0`;
  liveIframeWrap.style.display = 'block';
  livePlaceholder.style.display = 'none';

  let loaded = false;
  ytIframe.addEventListener('load', () => { loaded = true; });

  setTimeout(() => {
    if (!loaded) {
      liveIframeWrap.style.display = 'none';
      livePlaceholder.style.display = 'flex';
    }
  }, 6000);
} else {
  liveIframeWrap.style.display = 'none';
  livePlaceholder.style.display = 'flex';
}

/* ===== INTERSECTION OBSERVER ===== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        setTimeout(() => { entry.target.style.transitionDelay = '0ms'; }, 600);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ===== SECTION FADE-IN via MutationObserver (for dynamically added elements) ===== */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 }
);

document.querySelectorAll('.section').forEach(s => sectionObserver.observe(s));

/* ===== ACCESS MODAL ===== */
(function () {
  const overlay = document.getElementById('access-modal-overlay');
  const closeBtn = document.getElementById('access-modal-close');

  if (localStorage.getItem('access-accepted')) {
    overlay.classList.add('hidden');
    return;
  }

  document.body.style.overflow = 'hidden';

  closeBtn.addEventListener('click', function () {
    localStorage.setItem('access-accepted', '1');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  });
})();

/* ===== LIGHTBOX ===== */
(function () {
  const overlay  = document.getElementById('lightbox-overlay');
  const lbImg    = document.getElementById('lb-img');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');
  const lbClose  = document.getElementById('lb-close');
  const lbCounter = document.getElementById('lb-counter');

  const posters = Array.from(document.querySelectorAll('.poster-item'));
  let current = 0;

  function open(index) {
    current = index;
    const img = posters[current].querySelector('.poster-img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCounter.textContent = `${current + 1} / ${posters.length}`;
    lbPrev.disabled = current === 0;
    lbNext.disabled = current === posters.length - 1;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const next = current + dir;
    if (next < 0 || next >= posters.length) return;
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.92)';
    setTimeout(() => {
      current = next;
      const img = posters[current].querySelector('.poster-img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCounter.textContent = `${current + 1} / ${posters.length}`;
      lbPrev.disabled = current === 0;
      lbNext.disabled = current === posters.length - 1;
      lbImg.style.opacity = '';
      lbImg.style.transform = '';
    }, 160);
  }

  posters.forEach((item, i) => item.addEventListener('click', () => open(i)));
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
})();

/* ===== SCROLL TO TOP ===== */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== GALLERY DATA ===== */
const galleryPhotos = [
  { src: '', alt: 'Diáknap 2026 – 1' },
  { src: '', alt: 'Diáknap 2026 – 2' },
  { src: '', alt: 'Diáknap 2026 – 3' },
  { src: '', alt: 'Diáknap 2026 – 4' },
  { src: '', alt: 'Diáknap 2026 – 5' },
  { src: '', alt: 'Diáknap 2026 – 6' },
  { src: '', alt: 'Diáknap 2026 – 7' },
  { src: '', alt: 'Diáknap 2026 – 8' },
  { src: '', alt: 'Diáknap 2026 – 9' },
  { src: '', alt: 'Diáknap 2026 – 10' },
  { src: '', alt: 'Diáknap 2026 – 11' },
  { src: '', alt: 'Diáknap 2026 – 12' },
];

/* ===== GALLERY RENDER ===== */
(function () {
  const grid = document.getElementById('galleryGrid');
  galleryPhotos.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item fade-up';
    item.style.transitionDelay = `${i * 40}ms`;
    if (photo.src) {
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = 'lazy';
      item.appendChild(img);
    }
    grid.appendChild(item);
  });
  document.querySelectorAll('#galleryGrid .fade-up').forEach(el => observer.observe(el));
})();

/* ===== GALLERY UNLOCK ===== */
(function () {
  const GALLERY_HASH = 'f4c9521099e292caa5445b44177650154325c99673c91202e73d11279643b5f1';
  const grid        = document.getElementById('galleryGrid');
  const lockOverlay = document.getElementById('galleryLockOverlay');
  const modalOverlay = document.getElementById('galleryModalOverlay');
  const input       = document.getElementById('galleryPasswordInput');
  const errorMsg    = document.getElementById('galleryModalError');
  const submitBtn   = document.getElementById('galleryModalSubmit');
  const cancelBtn   = document.getElementById('galleryModalCancel');

  function unlockGallery() {
    grid.classList.add('unlocked');
    lockOverlay.classList.add('hidden');
    closeModal();
  }

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    input.value = '';
    errorMsg.classList.remove('visible');
    setTimeout(() => input.focus(), 100);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function showError() {
    errorMsg.classList.add('visible');
    input.classList.remove('shake');
    void input.offsetWidth;
    input.classList.add('shake');
    input.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
  }

  async function tryPassword() {
    const hash = await sha256(input.value);
    if (hash === GALLERY_HASH) {
      localStorage.setItem('gallery-unlocked', GALLERY_HASH);
      unlockGallery();
    } else {
      showError();
    }
  }

  if (localStorage.getItem('gallery-unlocked') === GALLERY_HASH) {
    unlockGallery();
    return;
  }

  lockOverlay.addEventListener('click', openModal);
  lockOverlay.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
  });
  submitBtn.addEventListener('click', tryPassword);
  cancelBtn.addEventListener('click', closeModal);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryPassword();
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
})();

/* ===== GALLERY LIGHTBOX ===== */
(function () {
  const overlay    = document.getElementById('galleryLightbox');
  const lbImg      = document.getElementById('galleryLbImg');
  const lbPrev     = document.getElementById('galleryLbPrev');
  const lbNext     = document.getElementById('galleryLbNext');
  const lbClose    = document.getElementById('galleryLbClose');
  const lbCounter  = document.getElementById('galleryLbCounter');
  const lbDownload = document.getElementById('galleryLbDownload');

  let items = [];
  let current = 0;

  function getItems() {
    return Array.from(document.querySelectorAll('#galleryGrid .gallery-item'));
  }

  function updateDownload(src, alt) {
    if (src) {
      lbDownload.href = src;
      lbDownload.download = alt.replace(/\s+/g, '_') + '.jpg';
      lbDownload.style.display = '';
    } else {
      lbDownload.href = '';
      lbDownload.style.display = 'none';
    }
  }

  function open(index) {
    items = getItems();
    current = index;
    const photo = galleryPhotos[current];
    lbImg.src = photo.src || '';
    lbImg.alt = photo.alt;
    lbCounter.textContent = `${current + 1} / ${items.length}`;
    lbPrev.disabled = current === 0;
    lbNext.disabled = current === items.length - 1;
    updateDownload(photo.src || '', photo.alt);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const next = current + dir;
    if (next < 0 || next >= items.length) return;
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.92)';
    setTimeout(() => {
      current = next;
      const photo = galleryPhotos[current];
      lbImg.src = photo.src || '';
      lbImg.alt = photo.alt;
      lbCounter.textContent = `${current + 1} / ${items.length}`;
      lbPrev.disabled = current === 0;
      lbNext.disabled = current === items.length - 1;
      updateDownload(photo.src || '', photo.alt);
      lbImg.style.opacity = '';
      lbImg.style.transform = '';
    }, 160);
  }

  document.getElementById('galleryGrid').addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    items = getItems();
    const index = items.indexOf(item);
    if (index !== -1) open(index);
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
})();
