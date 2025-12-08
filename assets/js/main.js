// assets/js/main.js
// Всі перемикачі + форма. Вони стартують лише коли partials підставили header/footer
// бо initUI викликається з partials.js після вставки.


document.addEventListener("DOMContentLoaded", () => {
  // === Theme Switch ===
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme") || "dark";
  body.dataset.theme = savedTheme;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = body.dataset.theme === "dark" ? "light" : "dark";
      body.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
    });
  }

  // === Font Switch ===
  const fontToggle = document.getElementById("font-toggle");

  const savedFont = localStorage.getItem("font") || "default";
  document.documentElement.style.setProperty(
    "--font-family",
    savedFont === "alt" ? "'Nunito', sans-serif" : "'Inter', sans-serif"
  );

  if (fontToggle) {
    fontToggle.addEventListener("click", () => {
      const newFont = savedFont === "default" ? "alt" : "default";
      localStorage.setItem("font", newFont);
      document.documentElement.style.setProperty(
        "--font-family",
        newFont === "alt" ? "'Nunito', sans-serif" : "'Inter', sans-serif"
      );
    });
  }
});

// window.initUI = function () {
//   // ====== Theme toggle ======
//   const themeToggle = document.getElementById("themeToggle");
//   const themeIcon = document.getElementById("themeIcon");
//   const themeLabel = document.getElementById("themeLabel");

//   function applyTheme(mode) {
//     if (mode === "dark") {
//       document.documentElement.classList.add("dark");
//       if (themeIcon) themeIcon.textContent = "☀️";
//       if (themeLabel) themeLabel.textContent = "Dark";
//     } else {
//       document.documentElement.classList.remove("dark");
//       if (themeIcon) themeIcon.textContent = "🌙";
//       if (themeLabel) themeLabel.textContent = "Light";
//     }
//   }
//   let savedTheme = localStorage.getItem("theme");
//   if (!savedTheme) {
//     savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//   }
//   applyTheme(savedTheme);
//   if (themeToggle) {
//     themeToggle.addEventListener("click", () => {
//       const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
//       applyTheme(newTheme);
//       localStorage.setItem("theme", newTheme);
//     });
//   }

  // ====== Language switcher (простий вбудований словник) ======
  const DICT = {
    ua: {
      hero_title: "Ваш партнер у цифровій трансформації",
      hero_sub: "Шукаємо прості рішення для складних проблем.",
      cta_book: "Записатись на консультацію"
    },
    en: {
      hero_title: "Your partner in digital transformation",
      hero_sub: "Turning complexity into simplicity.",
      cta_book: "Book consultation"
    }
  };
  function applyLang(code) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (DICT[code] && DICT[code][key]) el.textContent = DICT[code][key];
    });
    localStorage.setItem("lang", code);
  }
  const langSwitcher = document.getElementById("langSwitcher");
  let savedLang = localStorage.getItem("lang") || "ua";
  applyLang(savedLang);
  if (langSwitcher) {
    langSwitcher.value = savedLang;
    langSwitcher.addEventListener("change", (e) => applyLang(e.target.value));
  }

  // // ====== Font switcher (тимчасово) ======
  // const fontSwitcher = document.getElementById("fontSwitcher");
  // if (fontSwitcher) {
  //   const savedFont = localStorage.getItem("font") || "poppins";
  //   document.body.dataset.font = savedFont;
  //   fontSwitcher.value = savedFont;
  //   fontSwitcher.addEventListener("change", (e) => {
  //     document.body.dataset.font = e.target.value;
  //     localStorage.setItem("font", e.target.value);
  //   });
  // }

  // ====== Mobile menu ======
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });
    mobileMenu.addEventListener("click", () => mobileMenu.classList.remove("show"));
  }

  // ====== Highlight active nav link ======
  (function highlightActive() {
    const path = location.pathname.replace(/\/+$/, "");
    const filename = path.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach(a => {
      const href = a.getAttribute("href") || "";
      if (href.includes(filename) || (path.includes("/services") && href.includes("services/"))) {
        a.classList.add("nav-active");
      }
    });
  })();

  // ====== Reveal on scroll ======
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
  },{ threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // ====== Contact form (Formspree, honeypot) ======
const FORMSPREE_URL = "https://formspree.io/f/mvgebbyy";

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot
    if (form._honey.value !== "") return;

    const data = new FormData(form);

    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: data
    });

    if (response.ok) {
      formStatus.innerHTML = "<div class='success-box'>Дякуємо! Ваше повідомлення надіслано 💙</div>";
      form.reset();
    } else {
      formStatus.innerHTML = "<div class='error-box'>Помилка надсилання. Спробуйте пізніше.</div>";
    }
  });
}

  // const formEl = document.getElementById("contactForm");
  // if (formEl) {
  //   const statusEl = document.getElementById("formStatus");
  //   const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvgebbyy"; // <= сюди встав свій ID

  //   formEl.addEventListener("submit", async (e) => {
  //     e.preventDefault();
  //     const data = new FormData(formEl);
  //     if (data.get("_honey")) { // honeypot
  //       if (statusEl) statusEl.textContent = "Blocked as spam.";
  //       formEl.reset();
  //       return;
  //     }
  //     try {
  //       if (statusEl) statusEl.textContent = "⏳ Надсилання...";
  //       const res = await fetch(FORMSPREE_ENDPOINT, {
  //         method: "POST",
  //         headers: { "Accept": "application/json" },
  //         body: data
  //       });
  //       if (res.ok) {
  //         if (statusEl) statusEl.textContent = "✅ Дякуємо! Aoi відповість найближчим часом.";
  //         formEl.reset();
  //       } else {
  //         if (statusEl) statusEl.textContent = "⚠️ Помилка надсилання. Спробуйте пізніше.";
  //       }
  //     } catch(err){
  //       if (statusEl) statusEl.textContent = "⚠️ Помилка мережі.";
  //     }
  //   });
  // }
//};
