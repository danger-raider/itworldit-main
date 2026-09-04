(() => {
  const lang = document.documentElement.lang === 'ja' ? 'ja' : document.documentElement.lang === 'en' ? 'en' : 'uk';
  const content = {
    uk: {
      introTitle:'Що це за продукт',
      intro:'Japan Welfare Research — незалежна open-data дослідницька платформа про японську систему disability welfare та економічний тиск навколо неї. Вона зводить у спільний інтерфейс офіційні статистичні дані та матеріали MHLW, щоб порівнювати регіональні зміни цін, мінімальної зарплати й загальносистемні перегляди винагороди за однакові періоди.',
      noteTitle:'Японський контекст — не декорація',
      note:'Продукт спроєктований саме для японського контексту: японська є основною мовою інтерфейсу, а English та Українська доступні як додаткові локалізації. Дані, терміни й пояснення побудовані навколо японських державних джерел і структури регіонів.',
      featureTitle:'Що реалізовано',
      features:[
        ['01','Open-data dashboard','KPI, часові діапазони, вибір показників і порівняння офіційних даних у єдиному дослідницькому інтерфейсі.'],
        ['02','Географічний аналіз','Інтерактивна карта Японії та вибір nationwide / prefecture scope із відображенням доступності даних.'],
        ['03','CPI та cost evidence','Порівняння індексів споживчих цін із додатковим контекстом офіційних цін і мінімальної зарплати за той самий період.'],
        ['04','MHLW policy comparison','Окремий шар для зіставлення регіонального цінового тиску із загальносистемними переглядами MHLW.'],
        ['05','Gap Proxy','Пояснюваний індикатор різниці між зміною CPI та національним reimbursement benchmark. У продукті прямо вказано, що це не дефіцит і не збиток конкретного закладу.'],
        ['06','Methodology & provenance','Окремі сторінки Data, Methodology, Glossary та History, щоб джерела, припущення й зміни можна було перевірити.']
      ],
      dataTitle:'Чому тут важлива методологія',
      dataText:'У такому продукті красивий графік без походження даних майже нічого не вартий. Тому платформа побудована навколо відтворюваності: публічні набори даних зберігаються структуровано, джерела й методологічні обмеження винесені окремо, а інтерпретації відділені від самих чисел.',
      points:[
        ['Public data only','Платформа працює з відкритими статистичними й нормативними джерелами та не потребує персональних даних.'],
        ['Traceable sources','Користувач може перейти від підсумкового показника назад до методології, джерела та періоду даних.'],
        ['Regional comparison','Національні та префектурні дані можна дивитися в одному сценарії без ручного зведення кількох джерел.'],
        ['Explain before impress','У складних показників є caveats і пояснення, щоб dashboard не створював хибної точності.']
      ],
      architectureTitle:'Продуктова й технічна архітектура',
      architectureText:'Рішення побудоване як легка web-платформа з окремим шаром структурованих JSON-даних, клієнтською аналітикою, графіками та Leaflet-картою. Така архітектура добре підходить для відкритого дослідницького продукту: її просто публікувати, перевіряти, версіонувати й розвивати без важкого backend-контуру там, де він не потрібен.',
      valueTitle:'Практична цінність',
      valueHeading:'Замість десятків таблиць і документів — одна перевірювана дослідницька система',
      value:'Кейс вирішує не проблему “намалювати dashboard”, а проблему фрагментованого аналізу. Щоб зрозуміти, як змінюється зовнішній ціновий тиск у різних регіонах і як він співвідноситься з національними переглядами welfare reimbursement, досліднику більше не потрібно вручну збирати різні джерела, синхронізувати періоди й пояснювати кожне число окремо. Платформа робить цей процес повторюваним, прозорим і значно швидшим.'
    },
    en: {
      introTitle:'What the product is',
      intro:'Japan Welfare Research is an independent open-data research platform focused on Japan’s disability welfare system and the economic pressure surrounding it. It brings official statistics and MHLW material into one interface so regional price changes, minimum wage data and nationwide reimbursement revisions can be compared over aligned time periods.',
      noteTitle:'Japanese context is part of the product',
      note:'The platform was designed for Japan rather than merely translated for it. Japanese is the primary interface language, with English and Ukrainian available as additional localizations. Terminology, data structures and regional navigation follow Japanese public sources and geography.',
      featureTitle:'What was implemented',
      features:[
        ['01','Open-data dashboard','KPIs, date ranges, indicator selection and comparison of official datasets in one research interface.'],
        ['02','Geographic analysis','Interactive Japan map with nationwide and prefecture scope selection plus data-availability status.'],
        ['03','CPI and cost evidence','Consumer-price indicators supplemented with official price and minimum-wage context for the same period.'],
        ['04','MHLW policy comparison','A separate layer for comparing regional cost pressure with nationwide MHLW reimbursement revisions.'],
        ['05','Gap Proxy','An explainable indicator comparing CPI change with the national reimbursement benchmark, explicitly caveated as not being a facility deficit or loss.'],
        ['06','Methodology & provenance','Dedicated Data, Methodology, Glossary and History pages so sources, assumptions and changes remain auditable.']
      ],
      dataTitle:'Why methodology matters',
      dataText:'For this kind of product, a polished chart without data provenance has very little value. The platform is therefore built around reproducibility: public datasets are stored in structured form, methodological limitations are documented, and interpretation is kept separate from the underlying values.',
      points:[
        ['Public data only','The platform works with open statistical and policy sources and does not require personal data.'],
        ['Traceable sources','Users can move from an indicator back to its methodology, source and data period.'],
        ['Regional comparison','National and prefectural data can be explored in one workflow instead of manually reconciling multiple sources.'],
        ['Explain before impress','Complex indicators include caveats and explanations to avoid presenting false precision.']
      ],
      architectureTitle:'Product and technical architecture',
      architectureText:'The solution is built as a lightweight web platform with structured JSON datasets, client-side analytics, charts and a Leaflet map. That architecture fits an open research product well: it is easy to publish, inspect, version and extend without introducing a heavy backend where one is not necessary.',
      valueTitle:'Practical value',
      valueHeading:'One auditable research system instead of dozens of disconnected tables and documents',
      value:'The case solves more than a “build a dashboard” problem. It addresses fragmented analysis. To understand how external cost pressure changes across regions and how it compares with nationwide welfare reimbursement revisions, a researcher no longer needs to manually collect multiple sources, align time periods and reconstruct context around every number. The platform turns that work into a repeatable, transparent and substantially faster process.'
    },
    ja: {
      introTitle:'このプロダクトについて',
      intro:'Japan Welfare Research は、日本の障害福祉制度と、その周辺で生じるコスト圧力を対象とした独立系オープンデータ研究プラットフォームです。公的統計と厚生労働省資料を一つの画面にまとめ、地域別の物価変化、最低賃金、全国共通の報酬改定を同じ期間で比較できるようにしました。',
      noteTitle:'日本向けであること自体が設計要件',
      note:'単に日本語へ翻訳した製品ではなく、日本の公開資料、地域構造、用語体系を前提に設計しています。日本語を主言語とし、English と Українська も追加ローカライズとして利用できます。',
      featureTitle:'実装した機能',
      features:[
        ['01','オープンデータ・ダッシュボード','KPI、期間選択、指標切替、公的データ比較を一つの研究用インターフェースに統合。'],
        ['02','地域別分析','日本地図から全国・都道府県の対象範囲を選択し、データ公開状況も確認可能。'],
        ['03','CPI とコスト根拠','消費者物価指数に加え、同期間の公的価格情報と最低賃金を文脈として確認。'],
        ['04','厚労省方針との比較','地域の価格圧力と全国共通の報酬改定を分けて比較できる分析レイヤー。'],
        ['05','Gap Proxy','CPI変化と全国の報酬改定指標との差を説明可能な形で表示。施設の赤字や損失を意味する指標ではないことも明示。'],
        ['06','方法論と出典管理','Data、Methodology、Glossary、History を分離し、出典・前提・変更履歴を追跡可能に。']
      ],
      dataTitle:'方法論を重視した理由',
      dataText:'この領域では、見栄えの良いグラフだけでは十分ではありません。重要なのは、数字がどこから来たか、どの期間を比較しているか、どのような制約があるかを追跡できることです。そのため、公開データを構造化し、方法論上の注意点と解釈を分離しています。',
      points:[
        ['公開データのみ','公開統計・制度資料を使用し、個人データを必要としない構成です。'],
        ['出典を追跡可能','指標から方法論、出典、対象期間まで確認できます。'],
        ['地域比較を一つの流れで','全国と都道府県のデータを、複数資料を手作業で突き合わせずに比較できます。'],
        ['誤解を避ける説明','複雑な指標には注意書きと解説を付け、過度な精密さを演出しない設計です。']
      ],
      architectureTitle:'プロダクト・技術構成',
      architectureText:'構造化JSONデータ、クライアント側分析、チャート、Leaflet地図を組み合わせた軽量なWebプラットフォームとして実装しています。公開研究プロダクトとして、公開・検証・バージョン管理・拡張を行いやすく、不要なバックエンドを持たない構成です。',
      valueTitle:'実務上の価値',
      valueHeading:'分散した表や資料を、一つの検証可能な研究システムへ',
      value:'この事例の価値は「ダッシュボードを作った」ことではありません。地域ごとの外部コスト圧力がどう変化し、全国の福祉報酬改定とどのような差があるかを調べる際、複数の資料を集め、期間を合わせ、数字ごとの背景を手作業で整理する必要がありました。Japan Welfare Research は、その調査を再現可能で透明性のある、より短時間のプロセスに変えています。'
    }
  }[lang];

  function render() {
    const main = document.querySelector('[data-case-mount]');
    const secondSection = main && main.querySelector('.section.section--compact');
    if (!main || !secondSection || document.querySelector('.jwr-detail')) return;
    const container = secondSection.querySelector('.container');
    if (!container) return;

    const section = document.createElement('section');
    section.className = 'jwr-detail';
    section.innerHTML = `
      <div class="jwr-detail__intro">
        <div><p class="eyebrow">PRODUCT DEEP DIVE</p><h2>${content.introTitle}</h2><p class="jwr-detail__lead">${content.intro}</p></div>
        <aside class="jwr-detail__note"><b>${content.noteTitle}</b><p>${content.note}</p></aside>
      </div>
      <section class="jwr-detail__section"><h2>${content.featureTitle}</h2><div class="jwr-detail__grid">${content.features.map(f=>`<article class="jwr-detail__card"><small>${f[0]}</small><h3>${f[1]}</h3><p>${f[2]}</p></article>`).join('')}</div></section>
      <section class="jwr-detail__section"><h2>${content.dataTitle}</h2><p>${content.dataText}</p><div class="jwr-detail__points">${content.points.map(p=>`<div class="jwr-detail__point"><strong>${p[0]}</strong><span>${p[1]}</span></div>`).join('')}</div></section>
      <section class="jwr-detail__section"><h2>${content.architectureTitle}</h2><p>${content.architectureText}</p><div class="jwr-detail__value"><small>${content.valueTitle}</small><h3>${content.valueHeading}</h3><p>${content.value}</p></div></section>`;

    const next = container.querySelector('.case-next');
    if (next) container.insertBefore(section, next); else container.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(render, 0)); else setTimeout(render, 0);
})();