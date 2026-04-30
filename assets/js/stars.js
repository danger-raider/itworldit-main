// assets/js/stars.js
// Lightweight animated background.
// Supports dark and light themes without repainting the whole site incorrectly.

const canvas = document.getElementById("starsCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let w;
  let h;
  let stars;

  function getTheme() {
    return document.body.dataset.theme || "dark";
  }

  function getColors() {
    const isLight = getTheme() === "light";

    return {
      background: isLight ? "#f7f7ff" : "#0a0a1a",
      star: isLight ? "124,58,237" : "139,92,246",
      starOpacity: isLight ? 0.16 : 0.4,
    };
  }

  function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    stars = new Array(120).fill(null).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.5 + 0.5,
      r: Math.random() * 1.2 + 0.2,
    }));
  }

  function draw() {
    const colors = getColors();

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, w, h);

    for (const star of stars) {
      star.y += 0.05 * star.z;

      if (star.y > h) {
        star.y = 0;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.star}, ${colors.starOpacity * star.z})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", init);

  init();
  draw();
}
