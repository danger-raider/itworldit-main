// ===== Theme toggle =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(mode) {
  if (mode === "dark") {
    document.documentElement.classList.add("dark");
    themeIcon.textContent = "☀️";
    if (themeLabel) themeLabel.textContent = "Dark";
  } else {
    document.documentElement.classList.remove("dark");
    themeIcon.textContent = "🌙";
    if (themeLabel) themeLabel.textContent = "Light";
  }
}

let savedTheme = localStorage.getItem("theme");
if (!savedTheme) {
  savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// ===== Language switcher (UA / EN) =====
// Потім ми винесемо текст у lang/ua.json та lang/en.json
// Зараз просто заглушка, щоб не ламати сторінки.

const langSwitcher = document.getElementById("langSwitcher");
if (langSwitcher) {
  langSwitcher.addEventListener("change", (e) => {
    // TODO: load from /lang/<code>.json і підставити тексти
    console.log("Language switch to:", e.target.value);
  });
}

// ===== Contact form stub =====
// антиспам-перевірка honeypot; місце для інтеграції Formspree/EmailJS
const formEl = document.getElementById("contactForm");
if (formEl) {
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const statusEl = document.getElementById("formStatus");

    const formData = new FormData(formEl);
    if (formData.get("company")) {
      // honeypot filled -> бот
      statusEl.textContent = "Blocked as spam.";
      return;
    }

    // TODO: сюди додамо відправку через Formspree або EmailJS
    statusEl.textContent = "Дякуємо! Ваше повідомлення отримано. Aoi відповість найближчим часом.";
    formEl.reset();
  });
}
