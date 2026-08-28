import {
  CATEGORIES,
  CATEGORY_IDS,
  getCategory,
  getCategoryByKey,
  getItem,
  getItemsByCategory,
} from './portfolio-data.js';

const KEYS = {
  modeOverview: 'o',
  modeExplore: 'e',
  home: 'h',
  back: 'b',
  openLink: 'l',
};

let mode = 'explore';
let sceneApi = null;
let reducedMotion = false;
let activeCategory = null;
let cockpitView = 'home';
let overviewCategory = null;

const dom = {};

function formatKeyHint(key) {
  return `<kbd class="key-hint">[${String(key).toUpperCase()}]</kbd>`;
}

function labelWithKey(text, key) {
  return `${text} ${formatKeyHint(key)}`;
}

function itemMetaPreview(item) {
  if (item.tech?.length) return item.tech.join(' · ');
  const text = item.description;
  return text.length <= 60 ? text : `${text.slice(0, 60)}…`;
}

function setActiveNavCategory(categoryId) {
  dom.categoriesNav.querySelectorAll('button').forEach((btn) => {
    btn.classList.toggle('nav-btn--active', categoryId != null && btn.dataset.category === categoryId);
  });
}

function machineConsole(lines, { blink = false } = {}) {
  const body = lines
    .map(
      (line, i) =>
        `<p class="screen-console__line${blink && i === lines.length - 1 ? ' screen-console__line--blink' : ''}">${line}</p>`
    )
    .join('');
  return `<div class="screen-console" aria-hidden="true">${body}</div>`;
}

function renderScreen(html) {
  dom.mainScreen.innerHTML = html;
  dom.mainScreen.classList.remove('cockpit__screen--fade');
  void dom.mainScreen.offsetWidth;
  dom.mainScreen.classList.add('cockpit__screen--fade');
}

function itemKeyHint(index) {
  return index < 9 ? formatKeyHint(String(index + 1)) : '';
}

function renderCategoryRow(item, index, cat) {
  const titleKey = itemKeyHint(index) ? ` ${itemKeyHint(index)}` : '';
  const bodyHtml = `
    <img class="screen-row__thumb" src="${item.image}" alt="" loading="lazy" />
    <span class="screen-row__body">
      <span class="screen-row__title">${item.title}${titleKey}</span>
      <span class="screen-row__meta">${itemMetaPreview(item)}</span>
    </span>`;

  const actionHtml =
    cat.id === 'projects' && item.url && item.linkLabel
      ? `<a class="screen-row__action" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.linkLabel} ${formatKeyHint(KEYS.openLink)}</a>`
      : '';

  if (actionHtml) {
    return `
      <div class="screen-row screen-row--split screen-row--${cat.css}">
        <button type="button" class="screen-row__main" data-item="${item.id}">
          ${bodyHtml}
          <span class="screen-row__arrow" aria-hidden="true">›</span>
        </button>
        ${actionHtml}
      </div>`;
  }

  return `
    <button type="button" class="screen-row screen-row--${cat.css}" data-item="${item.id}">
      ${bodyHtml}
      <span class="screen-row__arrow" aria-hidden="true">›</span>
    </button>`;
}

function bindCategoryList() {
  dom.mainScreen.querySelector('[data-action="home"]')?.addEventListener('click', showCockpitHome);
  dom.mainScreen.querySelectorAll('button[data-item]').forEach((btn) => {
    btn.addEventListener('click', () => showCockpitItem(btn.dataset.item));
  });
}

function showCockpitHome() {
  cockpitView = 'home';
  activeCategory = null;
  setActiveNavCategory(null);
  dom.cockpitStatus.textContent = 'SYS ONLINE — SELECT SECTOR';
  if (dom.welcomeMsg) dom.welcomeMsg.classList.remove('is-hidden');

  const tiles = CATEGORIES.map(
    (cat) => {
      const count = getItemsByCategory(cat.id).length;
      const countText = count === 1 ? '1 entry' : `${count} entries`;
      return `
      <button type="button" class="screen-tile screen-tile--${cat.css}" data-category="${cat.id}">
        <span class="screen-tile__label">${cat.label} ${formatKeyHint(cat.key)}</span>
        <span class="screen-tile__count">${countText}</span>
      </button>`;
    }
  ).join('');

  renderScreen(`
    <div class="screen-panel screen-panel--home">
      ${machineConsole(
        [
          '> MAIN DISPLAY ONLINE',
          '> AWAITING SECTOR SELECTION_',
        ],
        { blink: true }
      )}
      <div class="screen-tiles">${tiles}</div>
    </div>
  `);

  dom.mainScreen.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => showCockpitCategory(btn.dataset.category));
  });
}

function showCockpitCategory(categoryId) {
  const cat = getCategory(categoryId);
  if (!cat) return;

  hideWelcomeMessage();
  cockpitView = 'category';
  activeCategory = categoryId;
  setActiveNavCategory(categoryId);
  dom.cockpitStatus.textContent = `SECTOR: ${cat.label.toUpperCase()}`;

  const items = getItemsByCategory(categoryId);
  const rows = items.map((item, index) => renderCategoryRow(item, index, cat)).join('');
  const recordWord = items.length === 1 ? 'RECORD' : 'RECORDS';

  renderScreen(`
    <div class="screen-panel">
      <div class="screen-view__bar">
        <button type="button" class="screen-back" data-action="home">${labelWithKey('Home', KEYS.home)}</button>
        <h2 class="screen-view__title screen-view__title--${cat.css}">${cat.label}</h2>
      </div>
      ${machineConsole([
        `> SECTOR: ${cat.label.toUpperCase()} · ${items.length} ${recordWord}`,
      ])}
      <div class="screen-list">${rows}</div>
    </div>
  `);

  bindCategoryList();
  history.replaceState(null, '', `#${categoryId}`);
}

function showCockpitItem(itemId) {
  const item = getItem(itemId);
  if (!item) return;

  hideWelcomeMessage();
  cockpitView = 'item';
  const cat = getCategory(item.category);
  dom.cockpitStatus.textContent = `FILE: ${item.title.slice(0, 28).toUpperCase()}`;

  const linkHtml =
    item.url && item.linkLabel
      ? `<a class="screen-detail__link" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.linkLabel} ${formatKeyHint(KEYS.openLink)}</a>`
      : '';
  const techHtml = item.tech?.length ? `<p class="screen-detail__tech">(${item.tech.join(', ')})</p>` : '';

  renderScreen(`
    <div class="screen-panel">
      <div class="screen-view__bar">
        <button type="button" class="screen-back" data-action="back">${labelWithKey('Back', KEYS.back)}</button>
        <h2 class="screen-view__title screen-view__title--${cat?.css ?? 'work'}">${cat?.label ?? 'File'}</h2>
      </div>
      <article class="screen-detail screen-detail--${cat?.css ?? 'work'}">
        <img class="screen-detail__image" src="${item.image}" alt="${item.title}" loading="lazy" />
        <h2 class="screen-detail__title">${item.title}</h2>
        <p class="screen-detail__desc">${item.description}</p>
        ${techHtml}
        ${linkHtml}
      </article>
    </div>
  `);

  dom.mainScreen.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    showCockpitCategory(item.category);
  });
  history.replaceState(null, '', `#${item.category}/${item.id}`);
}

function buildOverview() {
  dom.overviewSections.innerHTML = '';
  CATEGORIES.forEach((cat) => {
    const items = getItemsByCategory(cat.id);
    const section = document.createElement('section');
    section.className = 'overview-section';
    section.id = `overview-${cat.id}`;

    const header = document.createElement('h2');
    header.className = `overview-section__header overview-section__header--${cat.css}`;
    header.innerHTML = `${cat.label} ${formatKeyHint(cat.key)} <span class="overview-section__count">(${items.length})</span>`;
    section.appendChild(header);

    const cards = document.createElement('div');
    cards.className = 'item-cards';

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = `item-card ${cat.cardClass}`;

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      card.appendChild(img);

      const h3 = document.createElement('h3');
      h3.textContent = item.title;
      card.appendChild(h3);

      const p = document.createElement('p');
      p.textContent = item.description;
      card.appendChild(p);

      if (item.tech?.length) {
        const tech = document.createElement('p');
        tech.className = 'item-card__tech';
        tech.innerHTML = `<b>(${item.tech.join(', ')})</b>`;
        card.appendChild(tech);
      }

      if (item.url && item.linkLabel) {
        const link = document.createElement('a');
        link.className = 'item-card__link';
        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = item.linkLabel;
        card.appendChild(link);
      }

      cards.appendChild(card);
    });

    section.appendChild(cards);
    dom.overviewSections.appendChild(section);
  });
}

function updateModeToggleLabel() {
  const isOverview = mode === 'overview';
  dom.modeToggle.innerHTML = isOverview
    ? labelWithKey('Explore', KEYS.modeExplore)
    : labelWithKey('Overview', KEYS.modeOverview);
}

function scrollToCategory(categoryId) {
  overviewCategory = categoryId;
  document.getElementById(`overview-${categoryId}`)?.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
  });
}

const keyboardActions = {
  setMode,
  goCategory(categoryId) {
    if (mode === 'overview') {
      overviewCategory = categoryId;
      scrollToCategory(categoryId);
    } else {
      setActiveNavCategory(categoryId);
      showCockpitCategory(categoryId);
    }
  },
  goHome() {
    showCockpitHome();
    setActiveNavCategory(null);
  },
  goBack() {
    if (activeCategory) showCockpitCategory(activeCategory);
  },
  openItem: showCockpitItem,
  onEscape() {
    if (mode !== 'explore') return;
    if (cockpitView === 'item' && activeCategory) {
      showCockpitCategory(activeCategory);
    } else if (cockpitView === 'category') {
      showCockpitHome();
      setActiveNavCategory(null);
    }
  },
};

function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const key = e.key.toLowerCase();

    if (key === 'escape') {
      e.preventDefault();
      keyboardActions.onEscape();
      return;
    }
    if (key === KEYS.modeOverview && mode === 'explore') {
      e.preventDefault();
      setMode('overview');
      return;
    }
    if (key === KEYS.modeExplore && mode === 'overview') {
      e.preventDefault();
      setMode('explore');
      return;
    }

    const cat = getCategoryByKey(key);
    if (cat) {
      e.preventDefault();
      keyboardActions.goCategory(cat.id);
      return;
    }

    if (mode !== 'explore') return;

    if (key === KEYS.home && cockpitView !== 'home') {
      e.preventDefault();
      keyboardActions.goHome();
    } else if (key === KEYS.back && cockpitView === 'item') {
      e.preventDefault();
      keyboardActions.goBack();
    } else if (cockpitView === 'category' && key >= '1' && key <= '9') {
      const items = getItemsByCategory(activeCategory);
      const item = items[parseInt(key, 10) - 1];
      if (item) {
        e.preventDefault();
        showCockpitItem(item.id);
      }
    }
  });
}

function buildNav() {
  dom.categoriesNav.innerHTML = '';
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `nav-btn nav-btn--${cat.css}`;
    btn.innerHTML = labelWithKey(cat.label, cat.key);
    btn.dataset.category = cat.id;
    btn.addEventListener('click', () => keyboardActions.goCategory(cat.id));
    dom.categoriesNav.appendChild(btn);
  });
}

function bindEvents() {
  dom.modeToggle.addEventListener('click', () => {
    setMode(mode === 'explore' ? 'overview' : 'explore');
  });
  window.addEventListener('hashchange', () => applyHash(location.hash));
  document.addEventListener('visibilitychange', () => {
    sceneApi?.setAnimationPaused(document.hidden || mode === 'overview');
  });
}

export function initUI(options) {
  sceneApi = options.scene ?? null;
  reducedMotion = options.reducedMotion ?? false;

  dom.body = document.body;
  dom.modeToggle = document.getElementById('mode-toggle');
  dom.categoriesNav = document.querySelector('.site-nav__categories');
  dom.cockpit = document.getElementById('cockpit');
  dom.mainScreen = document.getElementById('main-screen');
  dom.cockpitStatus = document.getElementById('cockpit-status');
  dom.welcomeMsg = document.getElementById('welcome-msg');
  dom.overview = document.getElementById('overview');
  dom.overviewSections = document.getElementById('overview-sections');
  dom.fallbackNotice = document.getElementById('fallback-notice');

  buildNav();
  buildOverview();
  bindEvents();
  bindKeyboard();

  if (reducedMotion) {
    setMode('overview', true);
  } else {
    showCockpitHome();
    updateModeToggleLabel();
  }
}

function hideWelcomeMessage() {
  if (dom.welcomeMsg && !dom.welcomeMsg.classList.contains('is-hidden')) {
    dom.welcomeMsg.classList.add('is-hidden');
  }
}

export function setMode(nextMode, silent = false) {
  mode = nextMode;
  const isOverview = mode === 'overview';

  dom.body.classList.toggle('mode-explore', !isOverview);
  dom.body.classList.toggle('mode-overview', isOverview);
  updateModeToggleLabel();
  dom.modeToggle.setAttribute('aria-pressed', String(isOverview));
  dom.cockpit.hidden = isOverview;
  dom.overview.hidden = !isOverview;
  sceneApi?.setAnimationPaused(isOverview || document.hidden);

  if (!isOverview) {
    showCockpitHome();
  } else {
    setActiveNavCategory(null);
    overviewCategory = overviewCategory ?? CATEGORIES[0].id;
  }

  if (!silent) {
    if (isOverview) history.replaceState(null, '', '#overview');
    else if (location.hash === '#overview') history.replaceState(null, '', window.location.pathname);
  }
}

export function showWebGLFallback() {
  dom.fallbackNotice.hidden = false;
  setMode('overview', true);
}

export function applyHash(hash, initial = false) {
  if (!hash || hash === '#') return;

  if (hash === '#overview') {
    setMode('overview', initial);
    return;
  }

  const match = hash.match(/^#([^/]+)\/([^/]+)$/);
  if (match) {
    const [, categoryId, itemId] = match;
    if (!getItem(itemId)) return;
    if (mode === 'overview') {
      scrollToCategory(categoryId);
      return;
    }
    if (initial) setMode('explore', true);
    setActiveNavCategory(categoryId);
    showCockpitItem(itemId);
    return;
  }

  const catId = hash.slice(1);
  if (CATEGORY_IDS.includes(catId)) keyboardActions.goCategory(catId);
}
