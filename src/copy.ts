// Every on-screen string, one block per locale. Scenes read these through
// LocaleContext so the same composition tree renders en, pt-PT or id.
// Wording matches the release notes; numbers stay in RELEASE (theme.ts).

export type Locale = "en" | "pt" | "id";

export const LOCALES: Locale[] = ["en", "pt", "id"];

export type PlanLabels = { living: string; bed1: string; bed2: string; unit: string };

export type Copy = {
  drop: {
    justDropped: string;
    features: string;
    fixes: string;
    commits: string;
    tests: string;
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
    label: string;
    features: string[];
    footer: (fixes: string, commits: string, tests: string) => string;
  };
  cowork: { joined: string; headline: string[] };
  numbers: {
    title: string;
    commits: string;
    fixes: string;
    tests: string;
    features: string;
    contributors: string;
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
    label: "FEATURES",
    features: [
      "Telegram guests get the full surface",
      "One cancellable turn per guest",
      "Long turns stop and write a plan",
      "browser_act uploads local files",
      "bash won't sleep mid-task",
      "Transcript survives a session switch",
      "Headless install: provider day zero",
      "4 phantom fixes · 4 security fixes",
    ],
    footer: (fixes, commits, tests) => `${fixes} FIXES · ${commits} COMMITS · ${tests} TESTS`,
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
    label: "NOVIDADES",
    features: [
      "Convidados no Telegram com tudo",
      "Um turno cancelável por convidado",
      "Turnos longos param e fazem plano",
      "browser_act envia ficheiros locais",
      "bash não dorme a meio da tarefa",
      "Histórico sobrevive à troca de sessão",
      "Instalação headless: provider dia zero",
      "4 correções fantasma · 4 segurança",
    ],
    footer: (fixes, commits, tests) => `${fixes} CORREÇÕES · ${commits} COMMITS · ${tests} TESTES`,
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
    label: "FITUR",
    features: [
      "Tamu Telegram dapat semua fitur",
      "Satu turn bisa dibatalkan per tamu",
      "Turn panjang berhenti dan bikin plan",
      "browser_act upload file lokal",
      "bash tidak tidur di tengah tugas",
      "Transkrip selamat saat ganti sesi",
      "Instal headless: provider hari nol",
      "4 fix hantu · 4 fix keamanan",
    ],
    footer: (fixes, commits, tests) => `${fixes} PERBAIKAN · ${commits} COMMIT · ${tests} TES`,
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

export const COPY: Record<Locale, Copy> = { en, pt, id };

// en-US groups with commas, pt-PT and Indonesian with dots. Hand-rolled so the
// render never depends on which ICU data the box happens to ship.
export const formatNumber = (value: number, locale: Locale): string => {
  const digits = Math.round(value).toString();
  const sep = locale === "en" ? "," : ".";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};
