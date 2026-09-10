(() => {
  const lang = document.documentElement.lang === 'ja' ? 'ja' : document.documentElement.lang === 'en' ? 'en' : 'uk';
  const image = '/assets/img/cases/japan-welfare-research.webp';
  const copy = {
    uk: {
      heroStrong:'Japan Welfare Research · японський інтерфейс',
      heroText:'Open-data dashboard із KPI, CPI, регіональним аналізом і картою Японії.',
      analyticsStrong:'Аналітичний workspace',
      analyticsText:'Графіки, показники, geography scope та карта працюють як одна дослідницька поверхня.',
      methodStrong:'Методологія та перевірюваність',
      methodText:'Нижні секції продукту пояснюють джерела, методологію й обмеження інтерпретації.',
      full:'Переглянути повний screenshot продукту',
      fullCaption:'Повний інтерфейс · Japanese version'
    },
    en: {
      heroStrong:'Japan Welfare Research · Japanese interface',
      heroText:'Open-data dashboard combining KPIs, CPI, regional analysis and a map of Japan.',
      analyticsStrong:'Analytics workspace',
      analyticsText:'Charts, indicators, geography scope and the map work as one research surface.',
      methodStrong:'Methodology and auditability',
      methodText:'Lower product sections document sources, methodology and interpretation limits.',
      full:'View the full product screenshot',
      fullCaption:'Full interface · Japanese version'
    },
    ja: {
      heroStrong:'Japan Welfare Research · 日本語インターフェース',
      heroText:'KPI、CPI、地域分析、日本地図を統合したオープンデータ・ダッシュボード。',
      analyticsStrong:'分析ワークスペース',
      analyticsText:'チャート、指標、地域スコープ、地図を一つの調査画面として統合しています。',
      methodStrong:'方法論と検証可能性',
      methodText:'下部セクションでは出典、方法論、解釈上の制約を確認できます。',
      full:'プロダクト全体のスクリーンショットを見る',
      fullCaption:'全体画面 · 日本語版'
    }
  }[lang];

  function shot(frameClass, strong, text) {
    return `<figure class="jwr-shot"><div class="jwr-shot__frame ${frameClass}"><img src="${image}" alt="Japan Welfare Research Japanese product interface" loading="lazy" decoding="async"></div><figcaption><strong>${strong}</strong><span>${text}</span></figcaption></figure>`;
  }

  function render() {
    const detail = document.querySelector('.jwr-detail');
    if (!detail || document.querySelector('.jwr-shot')) return;

    const intro = detail.querySelector('.jwr-detail__intro');
    const sections = detail.querySelectorAll('.jwr-detail__section');
    if (!intro || sections.length < 3) return;

    const hero = document.createElement('div');
    hero.innerHTML = shot('jwr-shot__frame--hero', copy.heroStrong, copy.heroText);
    intro.insertAdjacentElement('afterend', hero.firstElementChild);

    const visualGrid = document.createElement('div');
    visualGrid.className = 'jwr-detail__visual-grid';
    visualGrid.innerHTML = `${shot('jwr-shot__frame--analytics', copy.analyticsStrong, copy.analyticsText)}${shot('jwr-shot__frame--methodology', copy.methodStrong, copy.methodText)}`;
    sections[0].appendChild(visualGrid);

    const full = document.createElement('div');
    full.className = 'jwr-full-view';
    full.innerHTML = `<details><summary>${copy.full}</summary><figure class="jwr-shot"><div class="jwr-shot__frame"><img src="${image}" alt="Full Japan Welfare Research Japanese interface" loading="lazy" decoding="async"></div><figcaption><strong>${copy.fullCaption}</strong><span>Japan Welfare Research</span></figcaption></figure></details>`;
    sections[2].appendChild(full);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(render, 20));
  } else {
    window.setTimeout(render, 20);
  }
})();