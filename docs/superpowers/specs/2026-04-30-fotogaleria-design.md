# Fotógaléria szekció — Design Spec
**Dátum:** 2026-04-30  
**Projekt:** Bánki Diáknap 2026  

---

## Áttekintés

Új szekció az `index.html`-ben a plakátok szekció után. Diáknapon készült fotók galériája, jelszóvédelemmel. Blur overlay takarja a képeket, egyetlen jelszóval (`bankitb123`) az egész galéria feloldható. Lightboxban megtekinthetők és letölthetők a képek.

---

## Architektúra

Pure frontend (HTML/CSS/JS), nincs backend. Jelszó hardcoded a JS-ben — nem kriptográfiai biztonság a cél, csak hogy idegenek ne férjenek hozzá könnyen. Ugyanaz a pattern mint a meglévő plakát lightbox: IIFE, adattömb, IntersectionObserver fade-in.

---

## HTML struktúra

```html
<section class="section" id="gallery">
  <div class="container">
    <div class="section-header">
      <h2>Fotók</h2>
      <p>Diáknapon készült képek</p>
    </div>
    <div class="gallery-wrapper">
      <div class="gallery-grid" id="galleryGrid">
        <!-- JS rendereli: 12 × .gallery-item > img -->
      </div>
      <div class="gallery-lock-overlay" id="galleryLockOverlay">
        <div class="gallery-lock-badge">
          🔒 Kattints a képek megtekintéséhez
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Jelszó modal -->
<div class="gallery-modal-overlay" id="galleryModalOverlay" role="dialog" aria-modal="true">
  <div class="gallery-modal">
    <h3>Jelszó szükséges</h3>
    <p>Ez a tartalom csak Bánki diákok számára elérhető.</p>
    <input type="password" id="galleryPasswordInput" placeholder="Jelszó" />
    <p class="gallery-modal-error" id="galleryModalError" hidden>Helytelen jelszó</p>
    <div class="gallery-modal-actions">
      <button id="galleryModalCancel">Mégse</button>
      <button id="galleryModalSubmit" class="btn-primary">Megnyitás</button>
    </div>
  </div>
</div>

<!-- Fotó lightbox (a plakát lightbox mintájára) -->
<div class="lightbox-overlay" id="galleryLightbox">
  <button class="lb-close" id="galleryLbClose">✕</button>
  <button class="lb-nav lb-prev" id="galleryLbPrev">‹</button>
  <img class="lb-img" id="galleryLbImg" src="" alt="" />
  <button class="lb-nav lb-next" id="galleryLbNext">›</button>
  <div class="lb-counter" id="galleryLbCounter"></div>
  <a class="lb-download" id="galleryLbDownload" download>⬇ Letöltés</a>
</div>
```

---

## JavaScript (IIFE, main.js-be)

### Adattömb

```js
const galleryPhotos = [
  { src: 'assets/gallery/foto_01.jpg', alt: 'Diáknap 2026 – 1' },
  // ... 12 placeholder (CSS-sel megjelenített szürke doboz, src üres vagy placeholder.jpg)
];
```

Placeholder fázisban: `src: ''` és CSS `background: var(--surface2)` + aspect-ratio adja a vizuális elemet.

### Unlock logika

1. Betöltéskor: `localStorage.getItem('gallery-unlocked') === '1'` → `unlockGallery()` hívás
2. `#galleryLockOverlay` click → modal megnyit
3. Submit: jelszó egyezik `'bankitb123'`-mal → `unlockGallery()`, localStorage set, modal zár
4. `unlockGallery()`: overlay-re `.hidden` class hozzáadása, grid-re `.unlocked` class hozzáadása

### Lightbox

- `.gallery-item` click (csak unlock után aktív) → lightbox megnyit az adott indexszel
- Prev/Next: index navigáció
- Keyboard: `ArrowLeft`, `ArrowRight`, `Escape`
- Counter: `"X / Y"` formátum
- Download gomb: `<a>` `href` és `download` attribútum frissítése aktuális képre

---

## CSS

### Blur + overlay

```css
.gallery-grid { filter: blur(8px); transition: filter 0.4s ease; }
.gallery-grid.unlocked { filter: none; }

.gallery-lock-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  background: rgba(0,0,0,0.15);
  border-radius: inherit;
  transition: opacity 0.4s ease;
}
.gallery-lock-overlay.hidden { opacity: 0; pointer-events: none; }
```

### Grid

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 900px)  { .gallery-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px)  { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
```

### Placeholder item

```css
.gallery-item {
  aspect-ratio: 4/3;
  background: var(--surface2);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}
.gallery-item img { width: 100%; height: 100%; object-fit: cover; }
```

### Modal

Meglévő `.access-modal` stílus mintájára — center-screen, backdrop blur, animate-in.

### Download gomb (lightbox)

Új elem a meglévő lightbox CSS-en belül, bottom-center, a counter mellé.

---

## Jelszó modal UX

- Helytelen jelszó → `#galleryModalError` megjelenik, input shake animáció (CSS keyframe)
- Enter billentyű → submit
- Escape / Mégse → modal zár, galéria marad zárva

---

## Adatvédelem / biztonsági megjegyzés

A jelszó JS forrásban látható — ez szándékos. A cél nem technikai védelem, hanem hogy a véletlen látogató ne férjen hozzá. A diákok megkapják a jelszót.

---

## Fájlok érintve

- `index.html` — új szekció, modal, lightbox HTML
- `css/style.css` — gallery, modal, download gomb stílusok
- `js/main.js` — galleryPhotos tömb, unlock IIFE, lightbox IIFE
- `assets/gallery/` — könyvtár létrehozása (egyelőre üres, placeholder CSS-ből)
