// assets/js/main.js
// Main site script.
// 1. Loads header/footer partials.
// 2. Initializes header UI.
// 3. Initializes smooth theme, language and font transitions.
// 4. Initializes content helpers and contact form.

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartials();

  initHeaderDropdowns();
  initTheme();
  initFontSwitcher();
  initLanguageSwitcher();
  initMobileMenu();
  markActiveNavLink();
  initRevealOnScroll();
  initContactForm();
  initHeroGallery();
});

/**
 * Loads header/footer partials before UI initialization.
 */
async function loadPartials() {
  await Promise.all([
    includeHTML("header", "/partials/header.html"),
    includeHTML("footer", "/partials/footer.html"),
  ]);
}

/**
 * Inserts an HTML partial into a target element.
 */
async function includeHTML(elementId, filePath) {
  const target = document.getElementById(elementId);

  if (!target) {
    return;
  }

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);

    target.innerHTML = `
      <div class="relative z-50 border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-200">
        Could not load ${filePath}
      </div>
    `;
  }
}

/**
 * Runs a soft visual transition before applying UI changes.
 * Font-family itself cannot be animated, so we softly fade/saturate the page.
 */
function runSoftTransition(className, callback, delay = 100) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    callback();
    return;
  }

  document.body.classList.add(className);

  window.setTimeout(() => {
    callback();

    requestAnimationFrame(() => {
      window.setTimeout(() => {
        document.body.classList.remove(className);
      }, 160);
    });
  }, delay);
}

/**
 * Premium custom dropdowns for header controls.
 */
function initHeaderDropdowns() {
  const dropdowns = document.querySelectorAll(".site-dropdown");

  function closeAllDropdowns(exceptDropdown = null) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === exceptDropdown) {
        return;
      }

      const button = dropdown.querySelector(".site-dropdown__button");

      dropdown.classList.remove("is-open");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".site-dropdown__button");

    if (!button) {
      return;
    }

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = dropdown.classList.contains("is-open");

      closeAllDropdowns(dropdown);

      dropdown.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });

  window.closeHeaderDropdowns = closeAllDropdowns;
}

/**
 * Site dictionary.
 */
const DICT = {
  ua: {
    brand_tagline: "Перетворюємо складність на простоту",

    nav_home: "Головна",
    nav_services: "Послуги",
    nav_blog: "Блог",
    nav_about: "Про нас",
    nav_contact: "Контакти",

    theme_dark: "Темна",
    theme_light: "Світла",

    hero_title: "Ваш партнер у цифровій трансформації",
    hero_sub:
      "Шукаємо прості рішення для складних проблем. Налаштування інфраструктури, безпека, автоматизація, MVP.",
    cta_book: "Записатись на консультацію",

    footer_navigation: "Навігація",
    footer_services: "Послуги",
    footer_description:
      "Практична ІТ-інженерія для бізнесу: стабільна інфраструктура, автоматизація, кібербезпека та зрозумілі технічні рішення.",
    footer_service_outsourcing: "IT Аутсорсинг",
    footer_service_consulting: "IT Консалтинг та аудит",
    footer_service_automation: "Автоматизація бізнесу",
    footer_service_security: "Кібербезпека",
    footer_cta_title: "Потрібна надійна IT-підтримка?",
    footer_cta_text:
      "Розкажіть, що має працювати краще, безпечніше або швидше. Ми допоможемо перетворити це на зрозумілий технічний план.",
    footer_cta_button: "Записатись на консультацію",
    footer_rights: "Всі права захищені.",
    hero_kicker: "IT-інженерія / автоматизація / безпека",
    hero_cta_services: "Переглянути послуги",

    hero_slide_1_title: "Інфраструктура",
    hero_slide_1_text:
      "Сервери, мережі, VPN, моніторинг і стабільна щоденна робота бізнесу.",
    hero_slide_2_title: "Кібербезпека",
    hero_slide_2_text:
      "Hardening, контроль доступу, безпечна пошта, VPN і попередження інцидентів.",
    hero_slide_3_title: "Автоматизація",
    hero_slide_3_text:
      "Менше рутини, чистіші процеси, пов’язані інструменти та швидші рішення.",
    hero_slide_4_title: "Консалтинг",
    hero_slide_4_text:
      "Технічний аудит, планування архітектури та зрозумілі дорожні карти впровадження.",
  },

  en: {
    brand_tagline: "Turning complexity into simplicity",

    nav_home: "Home",
    nav_services: "Services",
    nav_blog: "Blog",
    nav_about: "About",
    nav_contact: "Contact",

    theme_dark: "Dark",
    theme_light: "Light",

    hero_title: "Your partner in digital transformation",
    hero_sub:
      "Turning complexity into simplicity. Infrastructure, security, automation, MVP.",
    cta_book: "Book a consultation",

    footer_navigation: "Navigation",
    footer_services: "Services",
    footer_description:
      "Practical IT engineering for businesses that need stable infrastructure, automation, cybersecurity and clear technical decisions.",
    footer_service_outsourcing: "IT Outsourcing",
    footer_service_consulting: "IT Consulting & Audit",
    footer_service_automation: "Business Automation",
    footer_service_security: "Cybersecurity",
    footer_cta_title: "Need reliable IT support?",
    footer_cta_text:
      "Tell us what needs to work better, safer or faster. We will help turn it into a clear technical plan.",
    footer_cta_button: "Book a consultation",
    footer_rights: "All rights reserved.",
    hero_kicker: "IT engineering / automation / security",
    hero_cta_services: "View services",

    hero_slide_1_title: "Infrastructure",
    hero_slide_1_text:
      "Servers, networks, VPN, monitoring and stable business operations.",
    hero_slide_2_title: "Cybersecurity",
    hero_slide_2_text:
      "Hardening, access control, secure mail, VPN and incident prevention.",
    hero_slide_3_title: "Automation",
    hero_slide_3_text:
      "Less routine, cleaner processes, connected tools and faster decisions.",
    hero_slide_4_title: "Consulting",
    hero_slide_4_text:
      "Technical audits, architecture planning and clear implementation roadmaps.",
  },
};

/**
 * Returns current language.
 */
function getCurrentLang() {
  return localStorage.getItem("lang") || "ua";
}

/**
 * Returns current theme.
 */
function getCurrentTheme() {
  return document.body.dataset.theme || localStorage.getItem("theme") || "dark";
}

/**
 * Theme switcher.
 */
function initTheme() {
  const html = document.documentElement;
  const body = document.body;

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  function applyTheme(mode) {
    const isDark = mode === "dark";
    const lang = getCurrentLang();
    const dict = DICT[lang] || DICT.ua;

    html.classList.toggle("dark", isDark);
    body.dataset.theme = mode;

    if (themeIcon) {
      themeIcon.textContent = isDark ? "🌙" : "☀️";
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? dict.theme_dark : dict.theme_light;
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme",
      );
    }
  }

  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(savedTheme);

  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    runSoftTransition(
      "is-theme-changing",
      () => {
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
      },
      80,
    );
  });
}

/**
 * Font switcher with smooth visual transition.
 */
function initFontSwitcher() {
  const body = document.body;
  const fontCurrent = document.getElementById("fontCurrent");
  const fontOptions = document.querySelectorAll("[data-font-value]");

  const fontLabels = {
    poppins: "Poppins",
    noto: "Noto Sans",
    roboto: "Roboto",
  };

  function applyFont(fontName) {
    body.dataset.font = fontName;

    if (fontCurrent) {
      fontCurrent.textContent = fontLabels[fontName] || fontLabels.poppins;
    }

    fontOptions.forEach((option) => {
      const isSelected = option.dataset.fontValue === fontName;

      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });
  }

  const savedFont = localStorage.getItem("font") || "poppins";
  applyFont(savedFont);

  fontOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.stopPropagation();

      const selectedFont = option.dataset.fontValue || "poppins";
      const currentFont =
        body.dataset.font || localStorage.getItem("font") || "poppins";

      if (selectedFont === currentFont) {
        if (window.closeHeaderDropdowns) {
          window.closeHeaderDropdowns();
        }

        return;
      }

      runSoftTransition(
        "is-font-changing",
        () => {
          localStorage.setItem("font", selectedFont);
          applyFont(selectedFont);
        },
        100,
      );

      if (window.closeHeaderDropdowns) {
        window.closeHeaderDropdowns();
      }
    });
  });
}

/**
 * Language switcher with smooth visual transition.
 */
function initLanguageSwitcher() {
  const langCurrent = document.getElementById("langCurrent");
  const langOptions = document.querySelectorAll("[data-lang-value]");

  function applyLang(code) {
    const dict = DICT[code];

    if (!dict) {
      return;
    }

    document.documentElement.lang = code === "ua" ? "uk" : "en";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (dict[key]) {
        element.textContent = dict[key];
      }
    });

    if (langCurrent) {
      langCurrent.textContent = code.toUpperCase();
    }

    langOptions.forEach((option) => {
      const isSelected = option.dataset.langValue === code;

      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });

    localStorage.setItem("lang", code);

    updateThemeLabelOnly();
  }

  const savedLang = getCurrentLang();
  applyLang(savedLang);

  langOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.stopPropagation();

      const selectedLang = option.dataset.langValue || "ua";
      const currentLang = getCurrentLang();

      if (selectedLang === currentLang) {
        if (window.closeHeaderDropdowns) {
          window.closeHeaderDropdowns();
        }

        return;
      }

      runSoftTransition(
        "is-lang-changing",
        () => {
          applyLang(selectedLang);
        },
        100,
      );

      if (window.closeHeaderDropdowns) {
        window.closeHeaderDropdowns();
      }
    });
  });
}

/**
 * Updates only the visible theme label after language switching.
 */
function updateThemeLabelOnly() {
  const themeLabel = document.getElementById("themeLabel");

  if (!themeLabel) {
    return;
  }

  const lang = getCurrentLang();
  const dict = DICT[lang] || DICT.ua;
  const currentTheme = getCurrentTheme();

  themeLabel.textContent =
    currentTheme === "dark" ? dict.theme_dark : dict.theme_light;
}

/**
 * Responsive mobile menu.
 */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const menuIcon = document.getElementById("menuIcon");
  const nav = document.getElementById("mainNav");

  if (!menuToggle || !nav) {
    return;
  }

  function openMenu() {
    if (window.closeHeaderDropdowns) {
      window.closeHeaderDropdowns();
    }

    nav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");

    if (menuIcon) {
      menuIcon.textContent = "×";
    }
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");

    if (menuIcon) {
      menuIcon.textContent = "☰";
    }
  }

  function isMenuOpen() {
    return nav.classList.contains("is-open");
  }

  menuToggle.addEventListener("click", () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 760) {
      closeMenu();
    }
  });
}
/**
 * Hero full-screen gallery.
 */
function initHeroGallery() {
  const gallery = document.querySelector("[data-hero-gallery]");

  if (!gallery) {
    return;
  }

  const slides = Array.from(gallery.querySelectorAll("[data-hero-slide]"));
  const thumbs = Array.from(gallery.querySelectorAll("[data-hero-thumb]"));
  const prevButton = gallery.querySelector("[data-hero-prev]");
  const nextButton = gallery.querySelector("[data-hero-next]");
  const currentCounter = gallery.querySelector("[data-hero-current]");
  const totalCounter = gallery.querySelector("[data-hero-total]");

  if (!slides.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 7600;

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function setSlide(index) {
    const nextIndex = (index + slides.length) % slides.length;

    currentIndex = nextIndex;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    thumbs.forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === currentIndex;

      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-selected", String(isActive));
    });

    if (currentCounter) {
      currentCounter.textContent = formatNumber(currentIndex + 1);
    }
  }

  function nextSlide() {
    setSlide(currentIndex + 1);
  }

  function prevSlide() {
    setSlide(currentIndex - 1);
  }

  function stopAutoplay() {
    if (!autoplayTimer) {
      return;
    }

    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function startAutoplay() {
    if (prefersReducedMotion || slides.length < 2) {
      return;
    }

    stopAutoplay();
    autoplayTimer = window.setInterval(nextSlide, autoplayDelay);
  }

  if (totalCounter) {
    totalCounter.textContent = formatNumber(slides.length);
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = Number(thumb.dataset.slideIndex || 0);

      setSlide(index);
      startAutoplay();
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  gallery.addEventListener("mouseenter", stopAutoplay);
  gallery.addEventListener("mouseleave", startAutoplay);
  gallery.addEventListener("focusin", stopAutoplay);
  gallery.addEventListener("focusout", startAutoplay);

  setSlide(0);
  startAutoplay();
}
/**
 * Marks active navigation link.
 */
function markActiveNavLink() {
  const currentPath = normalizePath(window.location.pathname);
  const links = document.querySelectorAll(".site-header__nav-link[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    const linkPath = normalizePath(href);

    if (linkPath === currentPath) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    }
  });
}

/**
 * Normalizes paths for active nav comparison.
 */
function normalizePath(path) {
  if (!path) {
    return "/";
  }

  let normalized = path;

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  if (normalized.endsWith("/index.html")) {
    normalized = normalized.replace("/index.html", "/");
  }

  return normalized;
}

/**
 * Reveal animation helper.
 */
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((element) => observer.observe(element));
}

/**
 * Contact form.
 */
function initContactForm() {
  const FORMSPREE_URL = "https://formspree.io/f/mvgebbyy";

  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form._honey && form._honey.value.trim() !== "") {
      return;
    }

    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
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
    } catch (error) {
      console.error(error);

      if (formStatus) {
        formStatus.className = "error-box";
        formStatus.textContent =
          "⚠️ Не вдалося надіслати запит. Перевір інтернет або спробуй інший браузер.";
      }
    }
  });
}
