import { CATEGORIES, SKILLS, getCategoryByKey, getItemsByCategory } from './portfolio-data.js';

const ARROW = '<svg class="icon-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>';

const LEVELS = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6, Native: 6 };

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rich(text) {
  return esc(text).replace(/\*\*(.+?)\*\*/g, '<strong class="metric">$1</strong>');
}

function plain(text) {
  return String(text ?? '').replace(/\*\*/g, '');
}

function splitTitle(title) {
  const [role, org] = title.split(' @ ');
  return { role, org: org ?? '' };
}

function isExternal(url) {
  return /^https?:/.test(url);
}

function linkAttrs(url) {
  return isExternal(url) ? `href="${esc(url)}" target="_blank" rel="noopener noreferrer"` : `href="${esc(url)}"`;
}

function tags(item) {
  if (!item.tech?.length) return '';
  return `<ul class="tags" aria-label="Technologies">${item.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
}

function media(item, className = '') {
  const bg = item.imageBg === 'light' ? ' media--light' : '';
  return `<div class="media${bg} ${className}"><img src="${esc(item.image)}" alt="" loading="lazy" decoding="async" /></div>`;
}

function period(item) {
  if (!item.period) return '';
  const current = /present$/i.test(item.period);
  return `<span class="period${current ? ' period--current' : ''}">${current ? '<span class="now-dot" aria-hidden="true"></span>' : ''}${esc(item.period)}</span>`;
}

function meta(item, { withPlace = true } = {}) {
  const parts = [period(item), withPlace && item.place ? `<span>${esc(item.place)}</span>` : ''].filter(Boolean);
  return parts.length ? `<p class="meta">${parts.join('')}</p>` : '';
}

function sectionNumber(index) {
  return String(index + 1).padStart(2, '0');
}

function sectionHeader(cat, index, count) {
  const countHtml = count ? `<p class="section__count">${count} ${count === 1 ? 'entry' : 'entries'}</p>` : '';
  return `
    <header class="section__header reveal">
      <p class="section__index" aria-hidden="true">${sectionNumber(index)}</p>
      <div class="section__heading">
        <h2 class="section__title" id="${cat.id}-title">${esc(cat.heading ?? cat.label)}</h2>
        <p class="section__blurb">${esc(cat.blurb)}</p>
      </div>
      ${countHtml}
    </header>`;
}

function renderExperience(items) {
  const rows = items
    .map((item) => {
      const { role, org } = splitTitle(item.title);
      const highlights = item.highlights?.length
        ? `<ul class="xp__highlights">${item.highlights.map((h) => `<li>${rich(h)}</li>`).join('')}</ul>`
        : '';
      return `
      <li class="xp reveal" id="${item.id}">
        <div class="xp__side">
          <p class="xp__org">${esc(org)}</p>
          ${meta(item)}
        </div>
        <div class="xp__body">
          <h3 class="xp__role">${esc(role)}</h3>
          <p class="xp__desc">${rich(item.description)}</p>
          ${highlights}
        </div>
        ${tags(item)}
      </li>`;
    })
    .join('');
  return `<ol class="xp-list tick">${rows}</ol>`;
}

function renderProjects(items) {
  const cards = items
    .map((item) => {
      const title = item.url
        ? `<a class="card__link" ${linkAttrs(item.url)}>${esc(item.title)}<span class="visually-hidden"> (${esc(item.linkLabel)}, opens in a new tab)</span></a>`
        : esc(item.title);
      return `
      <li class="card reveal${item.url ? ' card--linked' : ''}" id="${item.id}">
        ${media(item, 'card__media')}
        <div class="card__body">
          ${item.highlight ? `<p class="eyebrow-label">${esc(item.highlight)}</p>` : ''}
          <h3 class="card__title">${title}</h3>
          <p class="card__desc">${rich(item.description)}</p>
          ${tags(item)}
        </div>
        ${item.url ? `<span class="card__arrow" aria-hidden="true">${ARROW}</span>` : ''}
      </li>`;
    })
    .join('');
  return `<ul class="card-grid">${cards}</ul>`;
}

function renderAchievements(items) {
  const rows = items
    .map(
      (item) => `
      <li class="win reveal" id="${item.id}">
        ${media(item, 'win__media')}
        <div class="win__body">
          ${item.highlight ? `<p class="eyebrow-label">${esc(item.highlight)}</p>` : ''}
          <h3 class="win__title">${esc(item.title)}</h3>
          ${meta(item)}
          <p class="win__desc">${rich(item.description)}</p>
        </div>
        ${
          item.url
            ? `<a class="text-link win__link" ${linkAttrs(item.url)}>${esc(item.linkLabel)}${ARROW}<span class="visually-hidden"> about ${esc(plain(item.title))} (opens in a new tab)</span></a>`
            : ''
        }
      </li>`
    )
    .join('');
  return `<ol class="win-list">${rows}</ol>`;
}

function renderEducation(items) {
  const cards = items
    .map((item) => {
      const { role, org } = splitTitle(item.title);
      return `
      <li class="edu reveal" id="${item.id}">
        <p class="edu__org" aria-hidden="true">${esc(org)}</p>
        <h3 class="edu__role">${esc(role)}<span class="visually-hidden">, ${esc(org)}</span></h3>
        ${meta(item)}
        <p class="edu__desc">${rich(item.description)}</p>
      </li>`;
    })
    .join('');
  return `<ul class="edu-grid">${cards}</ul>`;
}

function renderSkills() {
  const groups = SKILLS.groups
    .map(
      (group) => `
      <div class="skill-group${group.core ? ' skill-group--core' : ''}">
        <h3 class="skill-group__label">${esc(group.label)}</h3>
        <ul class="chips">${group.items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>`
    )
    .join('');

  const languages = SKILLS.languages
    .map(({ name, level }) => {
      const filled = LEVELS[level] ?? 0;
      const native = level === 'Native';
      const bars = Array.from({ length: 6 }, (_, i) => `<span class="${i < filled ? 'is-on' : ''}"></span>`).join('');
      return `
        <li class="lang${native ? ' lang--native' : ''}">
          <span class="lang__name">${esc(name)}</span>
          <span class="lang__meter" aria-hidden="true">${bars}</span>
          <span class="lang__level">${esc(level)}</span>
        </li>`;
    })
    .join('');

  return `
    <div class="skills reveal">
      <div class="skills__stack">${groups}</div>
      <div class="skills__aside">
        <div class="skill-group">
          <h3 class="skill-group__label">Languages</h3>
          <ul class="langs">${languages}</ul>
        </div>
        <div class="skill-group">
          <h3 class="skill-group__label">Interests</h3>
          <p class="interests">${SKILLS.interests.map(esc).join('<span class="interests__sep" aria-hidden="true">✦</span>')}</p>
        </div>
      </div>
    </div>`;
}

function renderContact(items, cat, index) {
  const email = items.find((i) => i.url?.startsWith('mailto:'));
  const others = items.filter((i) => i !== email && i.url);
  const address = email?.url.replace('mailto:', '') ?? '';
  return `
    <div class="contact reveal">
      <p class="section__index" aria-hidden="true">${sectionNumber(index)}</p>
      <h2 class="contact__title" id="${cat.id}-title">Let’s talk<span class="accent" aria-hidden="true">.</span></h2>
      <p class="section__blurb">${esc(cat.blurb)}</p>
      ${email ? `<a class="contact__email" href="${esc(email.url)}">${esc(address)}</a>` : ''}
      <ul class="contact__links">
        ${others
          .map(
            (i) =>
              `<li><a class="text-link" ${linkAttrs(i.url)}>${esc(i.title)}${ARROW}<span class="visually-hidden"> (opens in a new tab)</span></a></li>`
          )
          .join('')}
      </ul>
    </div>`;
}

const RENDERERS = {
  experience: renderExperience,
  projects: renderProjects,
  achievements: renderAchievements,
  education: renderEducation,
  skills: renderSkills,
  contact: renderContact,
};

function renderSections(main) {
  main.innerHTML = CATEGORIES.map((cat, index) => {
    const items = getItemsByCategory(cat.id);
    const render = RENDERERS[cat.id];
    const header = cat.id === 'contact' ? '' : sectionHeader(cat, index, items.length);
    return `
      <section class="section section--${cat.id}" id="${cat.id}" aria-labelledby="${cat.id}-title">
        <div class="container">
          ${header}
          ${render ? render(items, cat, index) : ''}
        </div>
      </section>`;
  }).join('');
}

function renderNav(list) {
  list.innerHTML = CATEGORIES.map(
    (cat, index) => `
      <li>
        <a class="site-nav__link${cat.id === 'contact' ? ' site-nav__link--cta' : ''}" href="#${cat.id}" data-section="${cat.id}">
          <span class="site-nav__num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${esc(cat.label)}
        </a>
      </li>`
  ).join('');
}

function renderKeyHint(target) {
  if (!target) return;
  const keys = CATEGORIES.map((c) => `<kbd>${c.key.toUpperCase()}</kbd>`).join('');
  target.innerHTML = `Press ${keys} to jump between sections, <kbd>H</kbd> for top`;
}

function trackActiveSection(links) {
  const byId = new Map([...links].map((a) => [a.dataset.section, a]));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  ['top', ...CATEGORIES.map((cat) => cat.id)].forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function revealOnScroll(reducedMotion) {
  const targets = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('can-reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  targets.forEach((el) => observer.observe(el));
}

function scrollToId(id, reducedMotion) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
}

function bindKeyboard(reducedMotion) {
  document.addEventListener('keydown', (e) => {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    const key = e.key.toLowerCase();
    if (key === 'h') {
      e.preventDefault();
      scrollToId('top', reducedMotion);
      return;
    }
    const cat = getCategoryByKey(key);
    if (cat) {
      e.preventDefault();
      scrollToId(cat.id, reducedMotion);
    }
  });
}

function bindHeader(header) {
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// Older links used `#category/item`; land on the item instead of a dead hash.
function applyLegacyHash(reducedMotion) {
  const match = location.hash.match(/^#([^/]+)\/([^/]+)$/);
  if (!match) return;
  const target = document.getElementById(match[2]) ? match[2] : match[1];
  requestAnimationFrame(() => scrollToId(target, reducedMotion));
}

export function initUI({ reducedMotion = false } = {}) {
  const main = document.getElementById('main');
  const navList = document.getElementById('site-nav-list');

  renderSections(main);
  renderNav(navList);
  renderKeyHint(document.getElementById('footer-keys'));

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  trackActiveSection(navList.querySelectorAll('a[data-section]'));
  revealOnScroll(reducedMotion);
  bindKeyboard(reducedMotion);
  bindHeader(document.querySelector('.site-header'));

  if (location.hash && !location.hash.includes('/')) {
    requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
  }
  applyLegacyHash(reducedMotion);
}
