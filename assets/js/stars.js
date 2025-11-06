// простий starfield, без залежностей
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

let w, h, stars;

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  stars = new Array(120).fill().map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 0.5 + 0.5, // яскравість
    r: Math.random() * 1.2 + 0.2   // радіус
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0a0a1a";
  ctx.fillRect(0, 0, w, h);

  for (const s of stars) {
    // невелике паріння
    s.y += 0.05 * s.z;
    if (s.y > h) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(139,92,246,${0.4 * s.z})`; // фіолетове світіння Аоі
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
