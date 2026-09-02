(() => {
  const lang = document.documentElement.lang === 'ja' ? 'ja' : document.documentElement.lang === 'en' ? 'en' : 'uk';
  const copy = {
    uk: { title:'Раніші інфраструктурні та продуктні роботи', intro:'Частина довшої практики до нинішніх R&D і engineering cases. Тут лише ті роботи, які реально додають контекст до досвіду.', problem:'Проблема', value:'Практична цінність', proof:'Freelance track record', collaborations:'20 співпраць', reviews:'25 відгуків', portfolio:'19 робіт у портфоліо', source:'Public profile + confirmed history' },
    en: { title:'Earlier infrastructure and product work', intro:'Selected work from a longer engineering practice before the current R&D and case-study set. Only examples that add useful context are included.', problem:'Problem', value:'Practical value', proof:'Freelance track record', collaborations:'20 client collaborations', reviews:'25 reviews', portfolio:'19 portfolio items', source:'Public profile + confirmed history' },
    ja: { title:'これまでのインフラ・プロダクト実績', intro:'現在のR&D・技術事例以前の実務から、経験の背景を示すものだけを選んで掲載しています。', problem:'課題', value:'実務上の価値', proof:'Freelance実績', collaborations:'顧客協業 20件', reviews:'レビュー 25件', portfolio:'ポートフォリオ 19件', source:'公開プロフィール + 確認済み履歴' }
  }[lang];

  const field = (item, key) => item[`${key}_${lang}`] || item[`${key}_en`] || '';

  async function renderHistory() {
    const mount = document.querySelector('[data-cases-mount]');
    if (!mount) return;

    try {
      const response = await fetch('/assets/data/experience-archive.json', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      const work = Array.isArray(data.selected_work) ? data.selected_work : [];
      if (!work.length) return;

      const section = document.createElement('section');
      section.className = 'cases-history trust-v2-section';
      section.innerHTML = `
        <div class="trust-v2-proofbar" aria-label="${copy.proof}">
          <div><strong>${copy.collaborations}</strong><span>${copy.proof}</span></div>
          <div><strong>${copy.reviews}</strong><span>${copy.proof}</span></div>
          <div><strong>${copy.portfolio}</strong><span>${copy.source}</span></div>
        </div>
        <div class="section-header has-line trust-v2-heading">
          <h2 class="section-title">${copy.title}</h2>
          <p class="cases-group__lead">${copy.intro}</p>
        </div>
        <div class="trust-v2-history-grid">
          ${work.map((item, index) => `
            <article class="trust-v2-history-card">
              <div class="trust-v2-history-top"><span class="case-chip">ARCHIVE</span><span>${String(index + 1).padStart(2,'0')}</span></div>
              <h3>${field(item, 'title')}</h3>
              <dl>
                <div><dt>${copy.problem}</dt><dd>${field(item, 'problem')}</dd></div>
                <div><dt>${copy.value}</dt><dd>${field(item, 'value')}</dd></div>
              </dl>
            </article>
          `).join('')}
        </div>`;
      mount.appendChild(section);
    } catch (error) {
      console.warn('Trust v2 history layer could not be loaded.', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(renderHistory, 0));
  } else {
    window.setTimeout(renderHistory, 0);
  }
})();