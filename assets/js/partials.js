<script>
/* assets/js/partials.js
   Підтягує header/footer, коректно для будь-якої вкладеності шляхів,
   і викликає initUI() лише після вставки.
*/

(function () {
  // Визначаємо базовий шлях до кореня сайту
  // Для GitHub Pages (user.github.io/repo/...) абсолютні /partials/... дадуть 404.
  // Тому рахуємо відносно поточного файлу.
  function basePath() {
    const depth = location.pathname.split("/").filter(Boolean).length;
    // якщо відкриваєш головну типу /repo/index.html -> depth>=2
    // повертаємо '../' стільки разів, щоб дістатись кореня
    // припускаємо, що index.html лежить у корені репо
    const parts = location.pathname.split("/");
    // знаходимо корінь репозиторію (після user.github.io)
    // Простіше: рахуємо, скільки папок від поточного до кореня репо
    let ups = [];
    // якщо ми в корені (index.html) — нічого не додаємо
    // якщо в /services/mvp.html -> потрібно '../'
    if (parts.length > 2) {
      // рахуємо скільки сегментів після кореня репо
      // Зручний емпіричний варіант: поки не зустрінемо файл *.html — додаємо '../'
      const last = parts[parts.length - 1];
      const folderCount = last.endsWith(".html") ? (parts.length - 2) : (parts.length - 1);
      for (let i = 2; i < folderCount; i++) ups.push("..");
    }
    return (ups.length ? ups.join("/") : ".") + "/";
  }

  async function inject(id, file) {
    const el = document.getElementById(id);
    if (!el) return;
    const url = basePath() + file; // наприклад './partials/header.html' або '../partials/header.html'
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch partial failed: " + url);
    el.innerHTML = await res.text();
  }

  async function boot() {
    try {
      await inject("header", "partials/header.html");
      await inject("footer", "partials/footer.html");
    } catch (e) {
      console.warn(e);
    }
    // Після того як вставили UX-елементи з header — ініціалізуємо UI
    if (window.initUI) window.initUI();
  }

  // Старт після DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
</script>
