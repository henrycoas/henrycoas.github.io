const PALETTE = [
  { color: [214, 224, 255], weight: 0.62 },
  { color: [124, 155, 255], weight: 0.3 },
  { color: [45, 91, 255], weight: 0.06 },
  { color: [255, 221, 51], weight: 0.02 },
];

const SPEED = 0.035;
const NEAR = 0.08;

function pickColor() {
  let r = Math.random();
  for (const entry of PALETTE) {
    if ((r -= entry.weight) <= 0) return entry.color;
  }
  return PALETTE[0].color;
}

function makeStar(star = {}, fresh = false) {
  star.x = (Math.random() - 0.5) * 2;
  star.y = (Math.random() - 0.5) * 2;
  star.z = fresh ? 1 : NEAR + Math.random() * (1 - NEAR);
  star.color = pickColor();
  star.twinkle = Math.random() * Math.PI * 2;
  return star;
}

export function createStarfield(canvas, { reducedMotion = false } = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let width = 0;
  let height = 0;
  let stars = [];
  let rafId = null;
  let visible = true;
  let last = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.round(Math.min(320, (width * height) / 4200));
    while (stars.length < target) stars.push(makeStar());
    stars.length = target;
    if (reducedMotion || rafId === null) draw(0);
  }

  function draw(dt) {
    ctx.clearRect(0, 0, width, height);
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    const cx = width / 2 + pointer.x * 24;
    const cy = height / 2 + pointer.y * 16;
    const focal = Math.max(width, height) * 0.5;

    for (const s of stars) {
      if (dt) {
        s.z -= SPEED * dt;
        s.twinkle += dt * 1.6;
        if (s.z <= NEAR) makeStar(s, true);
      }
      const px = cx + (s.x / s.z) * focal;
      const py = cy + (s.y / s.z) * focal;
      if (px < -4 || px > width + 4 || py < -4 || py > height + 4) {
        if (dt) makeStar(s, true);
        continue;
      }
      const depth = 1 - s.z;
      const size = 0.4 + depth * 1.8;
      const fadeIn = Math.min(1, (1 - s.z) * 4);
      const alpha = fadeIn * (0.35 + depth * 0.6) * (0.85 + Math.sin(s.twinkle) * 0.15);
      const [r, g, b] = s.color;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame(now) {
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    draw(dt);
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (reducedMotion || rafId !== null || !visible || document.hidden) return;
    last = 0;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  if (!reducedMotion) {
    window.addEventListener('pointermove', (e) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    });
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(canvas);

  resize();
  start();
  return { start, stop };
}
