import { createScene } from './scene.js';
import { initUI, showWebGLFallback, applyHash } from './ui.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function checkWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function main() {
  const container = document.getElementById('canvas-container');
  let sceneApi = null;

  if (!reducedMotion && checkWebGL()) {
    try {
      sceneApi = createScene(container, { reducedMotion: false });
    } catch (err) {
      console.error('Failed to init starfield:', err);
    }
  }

  initUI({ scene: sceneApi, reducedMotion: reducedMotion || !sceneApi });

  if (!sceneApi && !reducedMotion) showWebGLFallback();

  applyHash(location.hash, true);
}

main();
