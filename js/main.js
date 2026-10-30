import { createStarfield } from './starfield.js';
import { initUI } from './ui.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initUI({ reducedMotion });

const sky = document.getElementById('hero-sky');
if (sky) {
  try {
    createStarfield(sky, { reducedMotion });
  } catch (err) {
    console.error('Starfield unavailable:', err);
  }
}
