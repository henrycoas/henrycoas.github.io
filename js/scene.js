import * as THREE from 'three';

const SPAWN_Z = -320;
const PASS_Z = 12;
const SPREAD_X = 280;
const SPREAD_Y = 180;
const TRAVEL_RANGE = PASS_Z - SPAWN_Z;

/**
 * Rest-frame star color (approximate blackbody) before relativistic effects.
 * Returns [r, g, b] in 0–1.
 */
function sampleRestColor(out) {
  const t = Math.random();
  if (t < 0.2) {
    out[0] = 1;
    out[1] = 0.72;
    out[2] = 0.5;
  } else if (t < 0.45) {
    out[0] = 1;
    out[1] = 0.94;
    out[2] = 0.82;
  } else if (t < 0.7) {
    out[0] = 0.92;
    out[1] = 0.95;
    out[2] = 1;
  } else {
    out[0] = 0.75;
    out[1] = 0.88;
    out[2] = 1;
  }
}

/**
 * Relativistic Doppler blueshift + beaming for radial approach (stars move +Z toward camera).
 * f_obs / f_emit = sqrt((1 + β) / (1 − β)) for recession reversed for approach.
 */
function applyRelativisticColor(positions, speeds, colors, rest, i) {
  const z = positions[i * 3 + 2];
  const beta = Math.min(speeds[i] / 4.8, 0.9);

  const approach = Math.max(0, Math.min(1, 1 - (z - SPAWN_Z) / TRAVEL_RANGE));
  const doppler = Math.sqrt((1 + beta) / (1 - beta));
  const shift = Math.min((doppler - 1) / 2.8, 1);

  const r0 = rest[i * 3];
  const g0 = rest[i * 3 + 1];
  const b0 = rest[i * 3 + 2];
  const beam = 1 + beta * 0.55 * approach;

  colors[i * 3] = Math.min(1, r0 * (1 - shift * 0.8) * beam);
  colors[i * 3 + 1] = Math.min(1, g0 * (1 - shift * 0.15) * beam);
  colors[i * 3 + 2] = Math.min(1, b0 * (1 + shift * 0.65) * beam);
}

/** Ambient starfield in cockpit window — stars fly toward the camera */
export function createScene(container, options = {}) {
  const reducedMotion = options.reducedMotion ?? false;
  const isMobile = window.innerWidth < 768;
  const starCount = isMobile ? 1200 : 2800;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 600);
  camera.position.set(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const starfield = createStarfield(starCount);
  scene.add(starfield.points);

  let running = true;
  let animationPaused = false;

  function resize() {
    const w = Math.max(container.clientWidth, 1);
    const h = Math.max(container.clientHeight, 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    if (!animationPaused && !reducedMotion) {
      animateStarfield(starfield);
    }
    renderer.render(scene, camera);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();

  return {
    setAnimationPaused(paused) {
      animationPaused = paused;
    },
    setRunning(value) {
      running = value;
      if (value) animate();
    },
    dispose() {
      running = false;
      window.removeEventListener('resize', resize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    },
  };
}

const _restSample = [0, 0, 0];

function spawnStar(positions, speeds, colors, rest, i) {
  positions[i * 3] = (Math.random() - 0.5) * SPREAD_X;
  positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
  positions[i * 3 + 2] = SPAWN_Z - Math.random() * 80;
  speeds[i] = 0.5 + Math.random() * 1.4;

  sampleRestColor(_restSample);
  rest[i * 3] = _restSample[0];
  rest[i * 3 + 1] = _restSample[1];
  rest[i * 3 + 2] = _restSample[2];
  applyRelativisticColor(positions, speeds, colors, rest, i);
}

function createStarfield(count) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const rest = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) spawnStar(positions, speeds, colors, rest, i);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 1.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    vertexColors: true,
  });

  new THREE.TextureLoader().load('star.png', (tex) => {
    mat.map = tex;
    mat.needsUpdate = true;
  });

  return { points: new THREE.Points(geo, mat), positions, speeds, colors, rest, count };
}

function animateStarfield(starfield) {
  const { positions, speeds, colors, rest, count } = starfield;
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 2] += speeds[i];
    if (positions[i * 3 + 2] > PASS_Z) {
      spawnStar(positions, speeds, colors, rest, i);
    } else {
      applyRelativisticColor(positions, speeds, colors, rest, i);
    }
  }
  const geo = starfield.points.geometry;
  geo.attributes.position.needsUpdate = true;
  geo.attributes.color.needsUpdate = true;
}
