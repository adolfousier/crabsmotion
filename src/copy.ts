// Every on-screen string, one block per locale. Scenes read these through
// LocaleContext so the same composition tree renders en, pt-PT or id.
// Wording matches the release notes; numbers stay in RELEASE (theme.ts).

export type Locale = "en" | "pt" | "id" | "fr" | "ru";

export const LOCALES: Locale[] = ["en", "pt", "id", "fr", "ru"];

export type PlanLabels = { living: string; bed1: string; bed2: string; unit: string };

// A label that follows a number needs plural agreement in Russian ("8 фич" but
// "2 фичи"). Locales without that problem keep a plain string.
export type CountLabel = string | ((n: number) => string);

export const resolveLabel = (label: CountLabel, n: number): string =>
  typeof label === "function" ? label(n) : label;

// Russian plural rule: 1 фича, 2 фичи, 5 фич, 11 фич, 21 фича.
export const ruPlural = (n: number, one: string, few: string, many: string): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

export type Copy = {
  drop: {
    justDropped: string;
    features: CountLabel;
    fixes: CountLabel;
    commits: CountLabel;
    tests: CountLabel;
  };
  hook: { headline: string[] };
  setup: { ask: string; headline: string[] };
  free: { reply: string; plan: PlanLabels; headline: string[] };
  errand: {
    ask: string;
    steps: [string, string];
    price: string;
    sent: string;
    delivered: string;
    headline: string[];
  };
  plan: {
    title: string;
    step: (step: number, total: number) => string;
    calls: (calls: number) => string;
    clock: [string, string, string];
    headline: string[];
  };
  whatsnew: {
    title: (version: string) => string;
    label: CountLabel;
    features: string[];
    footer: (fixes: number, commits: number, tests: number) => string;
  };
  cowork: { joined: string; headline: string[] };
  numbers: {
    title: string;
    commits: CountLabel;
    fixes: CountLabel;
    tests: CountLabel;
    features: CountLabel;
    contributors: CountLabel;
  };
  outro: { line: string; verbs: string[]; verbsVertical: string[] };
};

const en: Copy = {
  drop: { justDropped: "JUST DROPPED", features: "FEATURES", fixes: "FIXES", commits: "COMMITS", tests: "TESTS" },
  hook: { headline: ["*~45 MB.* ONE BINARY."] },
  setup: {
    ask: "Hey! I'm your crab. What should I call you?",
    headline: ["NO ACCOUNT.", "NO KEYS.", "*JUST TALK.*"],
  },
  free: {
    reply: "That's a floor plan: 3 rooms, 84 m².",
    plan: { living: "LIVING", bed1: "BED 1", bed2: "BED 2", unit: "A-101 GROUND FLOOR" },
    headline: ["*FREE* AI", "*FREE* VISION", "*FREE* IMAGE GEN", "*FREE* VOICE"],
  },
  errand: {
    ask: "order me a 13kg butane from gazmondego, morning delivery",
    steps: ["opening gazmondego.com", "filling the order form"],
    price: "Butane 13kg x1 · €39.90",
    sent: "ORDER SENT ✓",
    delivered: "delivered.",
    headline: ["IT RUNS YOUR", "ERRANDS.", "*FOR REAL.*"],
  },
  plan: {
    title: "Plan · Ship the landing page",
    step: (s, total) => `Step ${s}/${total}`,
    calls: (c) => `${c} tool calls`,
    clock: ["9m", "6h", "2 days"],
    headline: ["RUNS FOR *HOURS.*", "RUNS FOR *DAYS.*", "NO HAND-HOLDING."],
  },
  whatsnew: {
    title: (v) => `WHAT'S NEW IN ${v}`,
    label: "HIGHLIGHTS",
    features: [
      "Arabic pack with script detection",
      "Chinese: Simplified and Traditional",
      "CJK detection spares Japanese, Korean",
      "European Portuguese speech understood",
      "Non-English packs at 400+ phrases",
      "edit_file keeps the final newline",
      "hashline_edit keeps the line ending",
      "CI fails on byte slices that panic",
      "Actions and toolchain pinned",
    ],
    footer: (fixes, commits, tests) =>
      `${formatNumber(fixes, "en")} FIXES · ${formatNumber(commits, "en")} COMMITS · ${formatNumber(tests, "en")} TESTS`,
  },
  cowork: { joined: " joined", headline: ["BRING YOUR", "*FRIENDS.*"] },
  numbers: {
    title: "IN NUMBERS",
    commits: "COMMITS",
    fixes: "FIXES",
    tests: "TESTS",
    features: "FEATURES",
    contributors: "CONTRIBUTORS",
  },
  outro: {
    line: "~45 MB · ONE BINARY",
    verbs: ["DOWNLOAD. RUN. *TALK.*"],
    verbsVertical: ["DOWNLOAD.", "RUN.", "*TALK.*"],
  },
};

const pt: Copy = {
  drop: { justDropped: "ACABOU DE SAIR", features: "NOVIDADES", fixes: "CORREÇÕES", commits: "COMMITS", tests: "TESTES" },
  hook: { headline: ["*~45 MB.* UM SÓ BINÁRIO."] },
  setup: {
    ask: "Olá! Sou o teu caranguejo. Como te chamas?",
    headline: ["SEM CONTA.", "SEM CHAVES.", "*FALA.*"],
  },
  free: {
    reply: "Isso é uma planta: 3 divisões, 84 m².",
    plan: { living: "SALA", bed1: "QUARTO 1", bed2: "QUARTO 2", unit: "A-101 PISO 0" },
    headline: ["IA *GRÁTIS*", "VISÃO *GRÁTIS*", "IMAGEM *GRÁTIS*", "VOZ *GRÁTIS*"],
  },
  errand: {
    ask: "encomenda-me um gás butano de 13kg na gazmondego, entrega de manhã",
    steps: ["a abrir gazmondego.com", "a preencher o formulário"],
    price: "Butano 13kg x1 · 39,90 €",
    sent: "ENCOMENDA ENVIADA ✓",
    delivered: "entregue.",
    headline: ["TRATA DAS TUAS", "TAREFAS.", "*A SÉRIO.*"],
  },
  plan: {
    title: "Plano · Lançar a landing page",
    step: (s, total) => `Passo ${s}/${total}`,
    calls: (c) => `${c} chamadas de ferramenta`,
    clock: ["9m", "6h", "2 dias"],
    headline: ["CORRE DURANTE *HORAS.*", "CORRE DURANTE *DIAS.*", "SOZINHO."],
  },
  whatsnew: {
    title: (v) => `NOVIDADES NA ${v}`,
    label: "DESTAQUES",
    features: [
      "Pacote árabe com deteção de escrita",
      "Chinês: simplificado e tradicional",
      "Deteção CJK poupa japonês e coreano",
      "Português europeu falado entendido",
      "Pacotes não ingleses com 400+ frases",
      "edit_file já não come a última linha",
      "hashline_edit mantém o fim de linha",
      "CI falha em slices que podem entrar em pânico",
      "Actions e toolchain fixados",
    ],
    footer: (fixes, commits, tests) =>
      `${formatNumber(fixes, "pt")} CORREÇÕES · ${formatNumber(commits, "pt")} COMMITS · ${formatNumber(tests, "pt")} TESTES`,
  },
  cowork: { joined: " entrou", headline: ["TRAZ OS TEUS", "*AMIGOS.*"] },
  numbers: {
    title: "EM NÚMEROS",
    commits: "COMMITS",
    fixes: "CORREÇÕES",
    tests: "TESTES",
    features: "NOVIDADES",
    contributors: "CONTRIBUIDORES",
  },
  outro: {
    line: "~45 MB · UM SÓ BINÁRIO",
    verbs: ["DESCARREGA. CORRE. *FALA.*"],
    verbsVertical: ["DESCARREGA.", "CORRE.", "*FALA.*"],
  },
};

const id: Copy = {
  drop: { justDropped: "BARU SAJA RILIS", features: "FITUR", fixes: "PERBAIKAN", commits: "COMMIT", tests: "TES" },
  hook: { headline: ["*~45 MB.* SATU BINER."] },
  setup: {
    ask: "Hai! Aku kepitingmu. Namamu siapa?",
    headline: ["TANPA AKUN.", "TANPA KEY.", "*TINGGAL NGOMONG.*"],
  },
  free: {
    reply: "Itu denah lantai: 3 kamar, 84 m².",
    plan: { living: "RUANG TAMU", bed1: "KAMAR 1", bed2: "KAMAR 2", unit: "A-101 LANTAI DASAR" },
    headline: ["AI *GRATIS*", "VISION *GRATIS*", "GAMBAR *GRATIS*", "SUARA *GRATIS*"],
  },
  errand: {
    ask: "pesenin gas butana 13kg dari gazmondego, antar pagi",
    steps: ["membuka gazmondego.com", "mengisi formulir pesanan"],
    price: "Butana 13kg x1 · €39,90",
    sent: "PESANAN TERKIRIM ✓",
    delivered: "terkirim.",
    headline: ["URUSAN KAMU", "BERES.", "*BENERAN.*"],
  },
  plan: {
    title: "Rencana · Rilis landing page",
    step: (s, total) => `Langkah ${s}/${total}`,
    calls: (c) => `${c} panggilan tool`,
    clock: ["9m", "6j", "2 hari"],
    headline: ["JALAN *BERJAM-JAM.*", "JALAN *BERHARI-HARI.*", "TANPA DIAWASI."],
  },
  whatsnew: {
    title: (v) => `YANG BARU DI ${v}`,
    label: "SOROTAN",
    features: [
      "Paket Arab dengan deteksi aksara",
      "Tionghoa: Sederhana dan Tradisional",
      "Deteksi CJK tak sentuh Jepang, Korea",
      "Bahasa Portugal Eropa dipahami",
      "Paket non-Inggris 400+ frasa",
      "edit_file tak makan baris terakhir",
      "hashline_edit jaga akhir baris file",
      "CI gagal pada slice yang bisa panic",
      "Actions dan toolchain dipin",
    ],
    footer: (fixes, commits, tests) =>
      `${formatNumber(fixes, "id")} PERBAIKAN · ${formatNumber(commits, "id")} COMMIT · ${formatNumber(tests, "id")} TES`,
  },
  cowork: { joined: " bergabung", headline: ["BAWA TEMAN", "*KAMU.*"] },
  numbers: {
    title: "DALAM ANGKA",
    commits: "COMMIT",
    fixes: "PERBAIKAN",
    tests: "TES",
    features: "FITUR",
    contributors: "KONTRIBUTOR",
  },
  outro: {
    line: "~45 MB · SATU BINER",
    verbs: ["DOWNLOAD. JALANKAN. *NGOMONG.*"],
    verbsVertical: ["DOWNLOAD.", "JALANKAN.", "*NGOMONG.*"],
  },
};

const fr: Copy = {
  drop: { justDropped: "VIENT DE SORTIR", features: "NOUVEAUTÉS", fixes: "CORRECTIONS", commits: "COMMITS", tests: "TESTS" },
  hook: { headline: ["*~45 MB.* UN SEUL BINAIRE."] },
  setup: {
    ask: "Salut ! Je suis ton crabe. Comment tu t'appelles ?",
    headline: ["SANS COMPTE.", "SANS CLÉS.", "*PARLE.*"],
  },
  free: {
    reply: "C'est un plan : 3 pièces, 84 m².",
    plan: { living: "SALON", bed1: "CHAMBRE 1", bed2: "CHAMBRE 2", unit: "A-101 REZ-DE-CHAUSSÉE" },
    headline: ["IA *GRATUITE*", "VISION *GRATUITE*", "IMAGE *GRATUITE*", "VOIX *GRATUITE*"],
  },
  errand: {
    ask: "commande-moi une bouteille de butane 13kg chez gazmondego, livraison le matin",
    steps: ["ouverture de gazmondego.com", "remplissage du formulaire"],
    price: "Butane 13kg x1 · 39,90 €",
    sent: "COMMANDE ENVOYÉE ✓",
    delivered: "livrée.",
    headline: ["IL FAIT TES", "COURSES.", "*POUR DE VRAI.*"],
  },
  plan: {
    title: "Plan · Lancer la landing page",
    step: (s, total) => `Étape ${s}/${total}`,
    calls: (c) => `${c} appels d'outils`,
    clock: ["9m", "6h", "2 j"],
    headline: ["TOURNE DES *HEURES.*", "TOURNE DES *JOURS.*", "SANS SURVEILLANCE."],
  },
  whatsnew: {
    title: (v) => `NOUVEAUTÉS DE ${v}`,
    label: "POINTS CLÉS",
    features: [
      "Pack arabe avec détection d'écriture",
      "Chinois : simplifié et traditionnel",
      "La détection CJK épargne le japonais",
      "Portugais européen compris à l'oral",
      "Packs non anglais à 400+ phrases",
      "edit_file garde le dernier saut de ligne",
      "hashline_edit garde le saut de ligne",
      "CI échoue sur un slice qui panique",
      "Actions et toolchain épinglés",
    ],
    footer: (fixes, commits, tests) =>
      `${formatNumber(fixes, "fr")} CORRECTIONS · ${formatNumber(commits, "fr")} COMMITS · ${formatNumber(tests, "fr")} TESTS`,
  },
  cowork: { joined: " a rejoint", headline: ["AMÈNE TES", "*AMIS.*"] },
  numbers: {
    title: "EN CHIFFRES",
    commits: "COMMITS",
    fixes: "CORRECTIONS",
    tests: "TESTS",
    features: "NOUVEAUTÉS",
    contributors: "CONTRIBUTEURS",
  },
  outro: {
    line: "~45 MB · UN SEUL BINAIRE",
    verbs: ["TÉLÉCHARGE. LANCE. *PARLE.*"],
    verbsVertical: ["TÉLÉCHARGE.", "LANCE.", "*PARLE.*"],
  },
};

const ru: Copy = {
  drop: {
    justDropped: "ТОЛЬКО ВЫШЕЛ",
    features: (n) => ruPlural(n, "ФИЧА", "ФИЧИ", "ФИЧ"),
    fixes: (n) => ruPlural(n, "ФИКС", "ФИКСА", "ФИКСОВ"),
    commits: (n) => ruPlural(n, "КОММИТ", "КОММИТА", "КОММИТОВ"),
    tests: (n) => ruPlural(n, "ТЕСТ", "ТЕСТА", "ТЕСТОВ"),
  },
  hook: { headline: ["*~45 MB.* ОДИН БИНАРНИК."] },
  setup: {
    ask: "Привет! Я твой краб. Как тебя зовут?",
    headline: ["БЕЗ АККАУНТА.", "БЕЗ КЛЮЧЕЙ.", "*ПРОСТО ГОВОРИ.*"],
  },
  free: {
    reply: "Это план этажа: 3 комнаты, 84 м².",
    plan: { living: "ГОСТИНАЯ", bed1: "СПАЛЬНЯ 1", bed2: "СПАЛЬНЯ 2", unit: "A-101 ПЕРВЫЙ ЭТАЖ" },
    headline: ["ИИ *БЕСПЛАТНО*", "ЗРЕНИЕ *БЕСПЛАТНО*", "КАРТИНКИ *БЕСПЛАТНО*", "ГОЛОС *БЕСПЛАТНО*"],
  },
  errand: {
    ask: "закажи баллон бутана 13кг на gazmondego, доставка утром",
    steps: ["открываю gazmondego.com", "заполняю форму заказа"],
    price: "Бутан 13кг x1 · 39,90 €",
    sent: "ЗАКАЗ ОТПРАВЛЕН ✓",
    delivered: "доставлено.",
    headline: ["ОН ДЕЛАЕТ ТВОИ", "ДЕЛА.", "*ПО-НАСТОЯЩЕМУ.*"],
  },
  plan: {
    title: "План · Запустить лендинг",
    step: (s, total) => `Шаг ${s}/${total}`,
    calls: (c) => `${c} вызовов инструментов`,
    clock: ["9м", "6ч", "2 дня"],
    headline: ["РАБОТАЕТ *ЧАСАМИ.*", "РАБОТАЕТ *ДНЯМИ.*", "БЕЗ ПРИСМОТРА."],
  },
  whatsnew: {
    title: (v) => `ЧТО НОВОГО В ${v}`,
    label: (n) => ruPlural(n, "ПУНКТ", "ПУНКТА", "ПУНКТОВ"),
    features: [
      "Арабский пакет с определением письма",
      "Китайский: упрощённый и традиционный",
      "CJK не трогает японский и корейский",
      "Португальский (Европа) понимается",
      "Не-английские пакеты: 400+ фраз",
      "edit_file не режет конец файла",
      "hashline_edit хранит конец строки",
      "CI падает на срезе с паникой",
      "Actions и toolchain закреплены",
    ],
    footer: (fixes, commits, tests) =>
      `${formatNumber(fixes, "ru")} ${ruPlural(fixes, "ФИКС", "ФИКСА", "ФИКСОВ")} · ` +
      `${formatNumber(commits, "ru")} ${ruPlural(commits, "КОММИТ", "КОММИТА", "КОММИТОВ")} · ` +
      `${formatNumber(tests, "ru")} ${ruPlural(tests, "ТЕСТ", "ТЕСТА", "ТЕСТОВ")}`,
  },
  cowork: { joined: " присоединился", headline: ["ЗОВИ СВОИХ", "*ДРУЗЕЙ.*"] },
  numbers: {
    title: "В ЦИФРАХ",
    commits: (n) => ruPlural(n, "КОММИТ", "КОММИТА", "КОММИТОВ"),
    fixes: (n) => ruPlural(n, "ФИКС", "ФИКСА", "ФИКСОВ"),
    tests: (n) => ruPlural(n, "ТЕСТ", "ТЕСТА", "ТЕСТОВ"),
    features: (n) => ruPlural(n, "ФИЧА", "ФИЧИ", "ФИЧ"),
    contributors: (n) => ruPlural(n, "УЧАСТНИК", "УЧАСТНИКА", "УЧАСТНИКОВ"),
  },
  outro: {
    line: "~45 MB · ОДИН БИНАРНИК",
    verbs: ["СКАЧАЙ. ЗАПУСТИ. *ГОВОРИ.*"],
    verbsVertical: ["СКАЧАЙ.", "ЗАПУСТИ.", "*ГОВОРИ.*"],
  },
};

export const COPY: Record<Locale, Copy> = { en, pt, id, fr, ru };

// en-US groups with commas, pt-PT and Indonesian with dots, French and Russian
// with a non-breaking space. Hand-rolled so the render never depends on which
// ICU data the box happens to ship.
export const formatNumber = (value: number, locale: Locale): string => {
  const digits = Math.round(value).toString();
  const sep = locale === "en" ? "," : locale === "fr" || locale === "ru" ? "\u00A0" : ".";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};
