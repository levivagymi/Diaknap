/* ===== DATA ===== */
const YOUTUBE_STREAM_ID = ''; // ide kerül az ID pl. 'dQw4w9WgXcQ'

const highlights = [
  { name: 'Plázs', location: 'Belső udvar', emoji: '🏖️', color: '#ff3131' },
  { name: 'HYROX Vetélkedő', location: 'Rekortán pálya', emoji: '💪', color: '#00bf63' },
  { name: 'Bánki legerősebb embere', location: 'Konditerem', emoji: '🏋️', color: '#ffde59', dark: true },
  { name: 'Szabadulószoba', location: 'B12', emoji: '🔒', color: '#38b6ff' },
  { name: 'Tanár-Cosplay', location: 'Iskola területe', emoji: '🎭', color: '#ff3131' },
];

const programs = [
  { id: 0,  name: 'Diáknap megnyitó',           location: 'B belső udvar',       time: '08:00',       type: 'fixed' },
  { id: 1,  name: 'HYROX Vetélkedő',             location: 'Rekortán pálya',      time: '08:00–12:00', type: 'halfday' },
  { id: 2,  name: 'Drámajáték',                  location: 'Rajz terem',          time: 'egész nap',   type: 'allday' },
  { id: 3,  name: 'Bármi csak egy táska',        location: 'Iskola területe',     time: 'egész nap',   type: 'allday' },
  { id: 4,  name: 'Karaoke',                     location: 'Technika terem',      time: 'egész nap',   type: 'allday' },
  { id: 5,  name: 'Tanár-Cosplay',               location: 'Iskola területe',     time: 'nagyszünet',  type: 'special' },
  { id: 6,  name: 'Bánki legerősebb embere',     location: '60 méteres pálya',          time: 'egész nap',   type: 'allday' },
  { id: 7,  name: 'Foci bajnokság',              location: 'Ketrec',              time: 'egész nap',   type: 'allday' },
  { id: 8,  name: 'Seffer Filmszínház',          location: 'Multimédia terem',    time: 'egész nap',   type: 'allday' },
  { id: 9,  name: 'Tanár-diák focimeccs',        location: 'Rekortán pálya',      time: '12:00',       type: 'fixed' },
  { id: 10, name: 'Programozás verseny',         location: 'A/216',               time: 'egész nap',   type: 'allday' },
  { id: 11, name: 'Jiu-jitsu próbaedzés',        location: 'Balneo',              time: '09:00',       type: 'fixed' },
  { id: 12, name: 'Társasjáték',                 location: 'B5',                  time: 'egész nap',   type: 'allday' },
  { id: 13, name: 'Graffiti fal',                location: 'Színes terem',        time: 'egész nap',   type: 'allday' },
  { id: 14, name: 'Vakvezetés',                  location: 'A épület 2. em. aula',time: 'egész nap',   type: 'allday' },
  { id: 15, name: 'Ping-pong liga',              location: 'Aula',                time: 'egész nap',   type: 'allday' },
  { id: 16, name: 'Plázs',                       location: 'Belső udvar',         time: 'egész nap',   type: 'allday' },
  { id: 17, name: 'Kémia bemutató',              location: 'Kémialabor',          time: 'egész nap',   type: 'allday' },
  { id: 18, name: 'Szabadulószoba',              location: 'B12',                 time: 'egész nap',   type: 'allday' },
  { id: 19, name: 'Kincskeresés',                location: 'B épület',            time: 'egész nap',   type: 'allday' },
  { id: 20, name: 'Kvíz verseny',                location: 'A/228',               time: 'egész nap',   type: 'allday' },
  { id: 21, name: 'Fotóstand',                   location: 'Aula',                time: 'egész nap',   type: 'allday' },
  { id: 22, name: 'Kovácsolás misztériuma',      location: 'Műhelyek',            time: 'egész nap',   type: 'allday' },
  { id: 23, name: 'Vita klub',                   location: 'Könyvtár',            time: '08:00–12:00', type: 'halfday' },
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
  if (heroLogo) heroLogo.src = logoSrc;
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

window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.25}px)`;
  }
}, { passive: true });

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

/* ===== SCROLL TO TOP ===== */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
