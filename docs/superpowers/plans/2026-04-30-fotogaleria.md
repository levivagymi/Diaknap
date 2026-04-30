# Fotógaléria Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Jelszóval védett fotógaléria szekció az index.html-be — blur overlay takarja a képeket, egyetlen jelszóval feloldható, lightboxban megtekinthetők és letölthetők.

**Architecture:** Pure frontend (HTML/CSS/JS), nincs backend. Jelszó hardcoded JS-ben (`bankitb123`). Unlock állapot localStorage-ban persist. Külön lightbox overlay a fotóknak (a meglévő plakát lightbox változatlan marad). Három különálló módosítás: HTML struktúra → CSS stílusok → JS logika.

**Tech Stack:** Vanilla JS (IIFE pattern), CSS custom properties (meglévő), localStorage

---

### Task 1: HTML — galéria szekció, jelszó modal, fotó lightbox

**Files:**
- Modify: `index.html:178` (poster section zárótagja után, footer előtt)

- [ ] **Step 1: Galéria szekció + jelszó modal + fotó lightbox hozzáadása**

Az `index.html`-ben a `</section>` (poster section vége, 178. sor) és `<!-- FOOTER -->` közé szúrd be:

```html
  <!-- GALLERY -->
  <section class="section gallery-section" id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Fotók</h2>
        <p class="section-sub">Diáknapon készült képek</p>
      </div>
      <div class="gallery-wrapper">
        <div class="gallery-grid" id="galleryGrid"></div>
        <div class="gallery-lock-overlay" id="galleryLockOverlay">
          <div class="gallery-lock-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Kattints a képek megtekintéséhez
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALLERY PASSWORD MODAL -->
  <div class="gallery-modal-overlay" id="galleryModalOverlay">
    <div class="gallery-modal" role="dialog" aria-modal="true" aria-labelledby="galleryModalTitle">
      <h3 class="gallery-modal-title" id="galleryModalTitle">Jelszó szükséges</h3>
      <p class="gallery-modal-desc">Ez a tartalom csak Bánki diákok számára elérhető.</p>
      <input type="password" id="galleryPasswordInput" class="gallery-modal-input" placeholder="Jelszó" autocomplete="current-password" />
      <p class="gallery-modal-error" id="galleryModalError">Helytelen jelszó</p>
      <div class="gallery-modal-actions">
        <button class="gallery-modal-cancel" id="galleryModalCancel">Mégse</button>
        <button class="gallery-modal-submit" id="galleryModalSubmit">Megnyitás</button>
      </div>
    </div>
  </div>

  <!-- GALLERY LIGHTBOX -->
  <div class="lightbox-overlay" id="galleryLightbox" role="dialog" aria-modal="true" aria-label="Fotógaléria">
    <button class="lb-close" id="galleryLbClose" aria-label="Bezárás">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <button class="lb-nav lb-prev" id="galleryLbPrev" aria-label="Előző fotó">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <div class="lb-img-wrap">
      <img class="lb-img" id="galleryLbImg" src="" alt="" />
    </div>
    <button class="lb-nav lb-next" id="galleryLbNext" aria-label="Következő fotó">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="lb-counter" id="galleryLbCounter"></div>
    <a class="lb-download" id="galleryLbDownload" download>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Letöltés
    </a>
  </div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: gallery section HTML — grid, lock overlay, password modal, lightbox"
```

---

### Task 2: CSS — galéria stílusok

**Files:**
- Modify: `css/style.css` — a `/* ===== FOOTER ===== */` blokk elé (838. sor)

- [ ] **Step 1: CSS hozzáadása**

A `/* ===== FOOTER ===== */` komment elé szúrd be:

```css
/* ===== GALLERY ===== */
.gallery-section {
  background: var(--bg);
}

.gallery-wrapper {
  position: relative;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  filter: blur(8px);
  transition: filter 0.4s ease;
  pointer-events: none;
  user-select: none;
}

.gallery-grid.unlocked {
  filter: none;
  pointer-events: auto;
  user-select: auto;
}

@media (max-width: 900px) {
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 600px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}

.gallery-item {
  aspect-ratio: 4/3;
  background: var(--surface2);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.gallery-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.3);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-lock-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.35s ease;
  border-radius: 10px;
}

.gallery-lock-overlay.hidden {
  opacity: 0;
  pointer-events: none;
}

.gallery-lock-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 24px;
  border-radius: 50px;
  pointer-events: none;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

/* Gallery Password Modal */
.gallery-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.gallery-modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.gallery-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  padding: 32px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
  animation: modalSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-modal-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}

.gallery-modal-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.gallery-modal-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 8px;
}

.gallery-modal-input:focus {
  border-color: var(--green);
}

.gallery-modal-error {
  font-size: 13px;
  color: var(--red);
  min-height: 18px;
  margin-bottom: 20px;
  opacity: 0;
  transition: opacity 0.2s;
}

.gallery-modal-error.visible {
  opacity: 1;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}

.gallery-modal-input.shake {
  animation: shake 0.35s ease;
  border-color: var(--red);
}

.gallery-modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.gallery-modal-cancel {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.gallery-modal-cancel:hover {
  background: var(--surface2);
  color: var(--text);
}

.gallery-modal-submit {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: var(--green);
  color: #000;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;
}

.gallery-modal-submit:hover {
  opacity: 0.85;
}

/* Gallery Lightbox download button */
.lb-download {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 50px;
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.8);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  border: 1px solid rgba(255,255,255,0.15);
}

.lb-download:hover {
  background: rgba(255,255,255,0.22);
  color: #fff;
}

@media (max-width: 600px) {
  .lb-download {
    bottom: 16px;
    right: 16px;
    font-size: 12px;
    padding: 7px 13px;
  }
}

```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: gallery CSS — grid, blur, lock overlay, password modal, lightbox download"
```

---

### Task 3: JS — galéria adatok, unlock logika, fotó lightbox

**Files:**
- Modify: `js/main.js` — végére (359. sor után)

- [ ] **Step 1: Adattömb + unlock IIFE + lightbox IIFE hozzáadása**

A `js/main.js` végére szúrd be (a scroll-to-top blokk után):

```js
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
  const GALLERY_PASSWORD = 'bankitb123';
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

  function tryPassword() {
    if (input.value === GALLERY_PASSWORD) {
      localStorage.setItem('gallery-unlocked', '1');
      unlockGallery();
    } else {
      errorMsg.classList.add('visible');
      input.classList.remove('shake');
      void input.offsetWidth;
      input.classList.add('shake');
      input.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
    }
  }

  if (localStorage.getItem('gallery-unlocked') === '1') {
    unlockGallery();
    return;
  }

  lockOverlay.addEventListener('click', openModal);
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
    lbDownload.href = src;
    lbDownload.download = alt.replace(/\s+/g, '_') + '.jpg';
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
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: gallery JS — render, unlock with password, lightbox with download"
```

---

### Task 4: Ellenőrzés + docs törlés

**Files:**
- Delete: `docs/` mappa (teljes)

- [ ] **Step 1: Manuális ellenőrzés böngészőben**

Nyisd meg az `index.html`-t böngészőben. Ellenőrizd:
1. Galéria szekció megjelenik, 12 placeholder slot látszik elmosva
2. Kattintás a galérián → jelszó modal jelenik meg
3. Helytelen jelszó → shake animáció + piros hibaüzenet
4. Helyes jelszó (`bankitb123`) → blur eltűnik, képek klikkelhetők
5. Kép kattintás → lightbox megnyílik, ← → Esc működik, letöltés gomb látszik
6. Oldal újratöltés → galéria azonnal unlocked (localStorage)
7. DevTools → Application → localStorage → `gallery-unlocked` töröld → visszaáll locked állapotba

- [ ] **Step 2: docs mappa törlése**

```bash
git rm -r docs/
git commit -m "chore: remove docs folder"
```
