// assets/js/main.js
// Всі перемикачі + форма. Вони стартують лише коли partials підставили header/footer
// бо initUI викликається з partials.js після вставки.
// assets/js/main.js
// Єдиний файл для перемикачів, меню, i18n і форми.
// Працює з поточним header.html та contact.html у твоєму проєкті.

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;

  // ========= THEME =========
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  function applyTheme(mode) {
    const isDark = mode === "dark";
    html.classList.toggle("dark", isDark);
    body.dataset.theme = mode;

    if (themeIcon && themeLabel) {
      if (isDark) {
        themeIcon.textContent = "🌙";
        themeLabel.textContent = "Dark";
      } else {
        themeIcon.textContent = "☀️";
        themeLabel.textContent = "Light";
      }
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
      const newTheme = body.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }

  // ========= FONT SWITCH =========
  const fontSwitcher = document.getElementById("fontSwitcher");
  const savedFont = localStorage.getItem("font") || "default";

  function applyFont(mode) {
    // body[data-font="..."] стилізується у style.css
    body.dataset.font = mode;
    if (fontSwitcher) fontSwitcher.value = mode;
  }

  applyFont(savedFont);

  if (fontSwitcher) {
    fontSwitcher.addEventListener("change", () => {
      const newFont = fontSwitcher.value;
      localStorage.setItem("font", newFont);
      applyFont(newFont);
    });
  }

  // ========= LANGUAGE (простий словник всередині) =========
  // Щоб зараз просто ЗАПРАЦЮВАЛО. Потім легко винесемо це в /lang/*.json.
  const DICT = {
    ua: {
      hero_title: "Ваш партнер у цифровій трансформації",
      hero_sub:
        "Шукаємо прості рішення для складних проблем. Налаштування інфраструктури, безпека, автоматизація, MVP.",
      cta_book: "Записатись на консультацію"
    },
    en: {
      hero_title: "Your partner in digital transformation",
      hero_sub:
        "Turning complexity into simplicity. Infrastructure, security, automation, MVP.",
      cta_book: "Book a consultation"
    }
  };

  const langSwitcher = document.getElementById("langSwitcher");

  function applyLang(code) {
    const dict = DICT[code];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    if (langSwitcher) langSwitcher.value = code;
    localStorage.setItem("lang", code);
  }

  const savedLang = localStorage.getItem("lang") || "ua";
  applyLang(savedLang);

  if (langSwitcher) {
    langSwitcher.addEventListener("change", () => {
      applyLang(langSwitcher.value);
    });
  }

  // ========= MOBILE MENU =========
  const menuToggle = document.getElementById("menuToggle");
  const desktopNav = document.getElementById("desktopNav");

  if (menuToggle && desktopNav) {
    menuToggle.addEventListener("click", () => {
      const isHidden = desktopNav.classList.contains("hidden");
      desktopNav.classList.toggle("hidden", !isHidden);
      desktopNav.classList.toggle("flex", isHidden);
      desktopNav.classList.toggle("opacity-0", !isHidden);
      desktopNav.classList.toggle("opacity-100", isHidden);
      desktopNav.classList.toggle("translate-y-2", !isHidden);
      desktopNav.classList.toggle("translate-y-0", isHidden);
    });
  }

  // ========= ACTIVE NAV LINK =========
  (function markActiveNav() {
    const current = location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll("#header a[href]");

    links.forEach((a) => {
      const hrefLast = a.getAttribute("href").split("/").pop();
      if (hrefLast === current) {
        a.classList.add("text-neon", "font-semibold");
      }
    });
  })();

  // ========= REVEAL ON SCROLL =========
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ========= CONTACT FORM (Formspree + honeypot) =========
  const FORMSPREE_URL = "https://formspree.io/f/mvgebbyy";

  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // honeypot
      if (form._honey && form._honey.value.trim() !== "") {
        return; // бот
      }

      const data = new FormData(form);

      try {
        const response = await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.className = "success-box";
            formStatus.textContent =
              "✅ Дякуємо! Запит надіслано. Ми відповімо, як тільки зможемо.";
          }
          form.reset();
        } else {
          if (formStatus) {
            formStatus.className = "error-box";
            formStatus.textContent =
              "⚠️ Сталася помилка на боці сервера. Спробуй ще раз пізніше.";
          }
        }
      } catch (err) {
        console.error(err);
        if (formStatus) {
          formStatus.className = "error-box";
          formStatus.textContent =
            "⚠️ Не вдалося надіслати запит. Перевір інтернет або спробуй інший браузер.";
        }
      }
    });
  }
});
