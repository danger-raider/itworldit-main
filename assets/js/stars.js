// assets/js/stars.js
// Lightweight animated background + identity interaction layer.
// Optimized for mobile, reduced motion and inactive browser tabs.

(() => {
  const canvas = document.getElementById("starsCanvas");

  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function initIdentityInteractions() {
    if (reducedMotionQuery.matches || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const selector = [
      ".service-card",
      ".feature-card",
      ".about-stat-card",
      ".about-pro-competencies article",
      ".about-pro-collab__grid > div",
      ".about-capability",
      ".about-principles article",
      ".about-process article",
      ".automation-impact__item",
      ".webdev-value__items > div",
      ".security-posture__items > div",
      ".contact-method",
      ".blog-card",
      ".blog-mini-card",
      ".cta-card",
    ].join(",");

    document.querySelectorAll(selector).forEach((card) => {
      card.classList.add("iw-interactive-card");

      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -2.2;
        const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 2.2;

        card.style.setProperty("--iw-x", `${x}px`);
        card.style.setProperty("--iw-y", `${y}px`);
        card.style.setProperty("--iw-rx", `${rx}deg`);
        card.style.setProperty("--iw-ry", `${ry}deg`);
      }, { passive: true });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--iw-rx");
        card.style.removeProperty("--iw-ry");
      }, { passive: true });
    });
  }

  document.addEventListener("DOMContentLoaded", initIdentityInteractions, { once: true });

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let stars = [];
  let animationFrameId = null;
  let resizeTimer = null;
  let isRunning = false;

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

  function getStarCount() {
    const viewportWidth = window.innerWidth;
    const prefersReducedMotion = reducedMotionQuery.matches;

    if (prefersReducedMotion) {
      return viewportWidth < 768 ? 18 : 32;
    }

    if (viewportWidth < 480) {
      return 36;
    }

    if (viewportWidth < 768) {
      return 48;
    }

    if (viewportWidth < 1024) {
      return 72;
    }

    return 120;
  }

  function setCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;

    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function createStars() {
    const count = getStarCount();

    stars = new Array(count).fill(null).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.5 + 0.5,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.035 + 0.025,
    }));
  }

  function drawFrame(shouldMove = true) {
    const colors = getColors();

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, width, height);

    for (const star of stars) {
      if (shouldMove) {
        star.y += star.speed * star.z;

        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.star}, ${colors.starOpacity * star.z})`;
      ctx.fill();
    }
  }

  function stopAnimation() {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    isRunning = false;
  }

  function animate() {
    if (document.hidden || reducedMotionQuery.matches) {
      stopAnimation();
      drawFrame(false);
      return;
    }

    drawFrame(true);
    animationFrameId = window.requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (isRunning || document.hidden || reducedMotionQuery.matches) {
      drawFrame(false);
      return;
    }

    isRunning = true;
    animationFrameId = window.requestAnimationFrame(animate);
  }

  function refreshCanvas() {
    stopAnimation();
    setCanvasSize();
    createStars();
    drawFrame(false);
    startAnimation();
  }

  function handleResize() {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(() => {
      refreshCanvas();
    }, 160);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stopAnimation();
      return;
    }

    startAnimation();
  }

  function handleReducedMotionChange() {
    refreshCanvas();
  }

  function observeThemeChanges() {
    const observer = new MutationObserver(() => {
      drawFrame(!reducedMotionQuery.matches && !document.hidden);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  window.addEventListener("resize", handleResize, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
  } else if (typeof reducedMotionQuery.addListener === "function") {
    reducedMotionQuery.addListener(handleReducedMotionChange);
  }

  observeThemeChanges();
  refreshCanvas();
})();
