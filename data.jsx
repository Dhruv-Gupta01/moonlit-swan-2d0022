// Data for dev-IDE portfolio
const PORTFOLIO = {
  identity: {
    name: "Dhruv Gupta",
    role: "Full-Stack Engineer",
    email: "dhruvgupta9191@gmail.com",
    links: {
      github: "https://github.com/Dhruv-Gupta01",
      linkedin: "https://www.linkedin.com/in/dhruv-gupta-8a362b188",
      leetcode: "https://leetcode.com/u/dhruvgupta9911/",
      aiInterviewer: "https://github.com/Dhruv-Gupta01/ai-interviewer",
    },
    stats: [
      { k: "experience", v: "2", u: "yrs" },
      { k: "concurrent orders", v: "100+" },
      { k: "latency cut", v: "30", u: "%" },
      { k: "test coverage", v: "90", u: "%+" },
    ],
  },

  typed: [
    "building real-time systems.",
    "shipping CRDT collaboration.",
    "fine-tuning LLM pipelines.",
    "cutting p50 latency in half.",
  ],

  experience: [
    {
      logoClass: "krda", logoText: "KL",
      role: "Software Engineer",
      company: "Kreeda Labs",
      location: "Pune, India",
      period: "Aug 2025 — Present",
      status: "live",
      lead: "Shipping real-time trading + CRDT collaboration at low latency.",
      bullets: [
        "Designed a real-time <strong>algorithmic trading platform</strong> ingesting live <em>bid/ask</em> feeds — multi-leg strategies across <em>100+ concurrent orders</em> with resilient reconnect handling.",
        "Led MVP of <strong>Word- and Excel-like collaborative editors</strong> using <em>Y.js CRDTs</em>, supporting <em>100+ concurrent users</em>.",
        "Integrated fine-tuned LLMs for <strong>format-aware responses</strong> — structured output respecting the active document schema.",
        "Architected sync pipelines on <em>AWS S3 + PostgreSQL</em> with CRDT conflict resolution eliminating corruption.",
      ],
      metrics: [
        { k: "concurrent users", v: "100+" },
        { k: "concurrent orders", v: "100+" },
        { k: "test coverage", v: "90%+" },
      ],
    },
    {
      logoClass: "ltim", logoText: "LT",
      role: "Software Engineer",
      company: "LTIMindtree",
      location: "Mumbai, India",
      period: "Jul 2024 — Aug 2025",
      status: "closed",
      lead: "Cut API latency 30% on a Relationship Management dashboard.",
      bullets: [
        "Shipped <strong>5+ features</strong> including analytics dashboards and forecasting modules using <em>Spring Boot</em> + <em>Angular</em>.",
        "Reduced average API response time from <strong>1.2s → 840ms (−30%)</strong> via <em>N+1 query</em> rewrites, composite indexes, and <em>Redis caching</em>.",
      ],
      metrics: [
        { k: "p50 before", v: "1.2s" },
        { k: "p50 after", v: "840ms" },
        { k: "features", v: "5+" },
      ],
    },
    {
      logoClass: "octr", logoText: "OC",
      role: "Software Engineer Intern",
      company: "Octro Inc.",
      location: "Noida, India",
      period: "Jan 2024 — Jun 2024",
      status: "closed",
      lead: "Built a real-time multiplayer Roulette engine in Erlang.",
      bullets: [
        "Designed end-to-end backend of a <strong>real-time multiplayer Roulette</strong> in <em>Erlang</em> — rules, bet validation, payouts for <em>150+ concurrent players</em>.",
        "Engineered a low-latency matchmaking + lobby system using <em>RabbitMQ</em> with <strong>sub-second</strong> response times.",
      ],
      metrics: [
        { k: "concurrent players", v: "150+" },
        { k: "match latency", v: "<1s" },
        { k: "stack", v: "Erlang" },
      ],
    },
  ],

  projects: [
    {
      name: "AI Interviewer",
      subtitle: "Voice-first interview platform",
      live: true,
      repo: "https://github.com/Dhruv-Gupta01/ai-interviewer",
      desc: "A <strong>real-time, voice-native interview platform</strong> with a streaming pipeline — Deepgram STT → Groq LLM → Deepgram TTS — achieving <strong>sub-second latency</strong> over WebSocket audio streaming.",
      features: [
        "<strong>4 modes:</strong> behavioral · technical · DSA (Monaco) · system design (Fabric.js)",
        "<strong>Role-aware prompts</strong> built from parsed resumes & JDs",
        "JWT auth, admin dashboard, shareable interview links",
        "<strong>LLM-scored reports</strong> with competency ratings and hiring recs",
      ],
      tags: ["Deepgram", "Groq", "WebSockets", "Monaco", "Fabric.js", "JWT", "React", "Node"],
      visualKind: "voice",
    },
    {
      name: "Multi-Leg Trading Engine",
      subtitle: "Low-latency algorithmic strategies",
      live: false,
      internal: true,
      desc: "Production trading platform ingesting live <strong>bid/ask feeds</strong> and executing multi-leg strategies across <strong>100+ concurrent orders</strong>. Deterministic execution, resilient reconnects, extensive backtests.",
      features: [
        "Multi-leg strategies across live feeds",
        "Resilient reconnect + replay semantics",
        "<strong>90%+ JUnit coverage</strong> on critical paths",
      ],
      tags: ["Java", "Spring Boot", "WebSockets", "Concurrency", "PostgreSQL"],
      visualKind: "candles",
    },
    {
      name: "Collaborative Editors",
      subtitle: "Word & Excel-like · CRDT-based",
      live: false,
      internal: true,
      desc: "<strong>Real-time collaborative editors</strong> supporting <strong>100+ concurrent users</strong>. CRDT-based conflict resolution eliminates corruption; fine-tuned LLMs generate <em>format-aware</em> structured output inline.",
      features: [
        "100+ concurrent users per document",
        "CRDT merge + server-side validation",
        "Inline LLM with schema-aware output",
      ],
      tags: ["Y.js", "CRDT", "AWS S3", "PostgreSQL", "LLM"],
      visualKind: "grid",
    },
  ],

  skills: {
    core: [
      { name: "Java / Spring Boot", pct: 95 },
      { name: "JavaScript / TypeScript", pct: 92 },
      { name: "Node.js / Express / Bun", pct: 88 },
      { name: "PostgreSQL / Redis", pct: 86 },
      { name: "React.js", pct: 84 },
      { name: "WebSockets / Real-time", pct: 82 },
      { name: "REST / Microservices", pct: 85 },
      { name: "Docker / AWS", pct: 75 },
    ],
    adjacent: [
      { name: "Y.js / CRDTs", pct: 80 },
      { name: "OpenAI / Claude APIs", pct: 85 },
      { name: "Deepgram / Groq", pct: 78 },
      { name: "Prompt engineering", pct: 82 },
      { name: "Erlang", pct: 70 },
      { name: "RabbitMQ", pct: 72 },
      { name: "Hibernate / JPA", pct: 80 },
      { name: "JUnit / Jest", pct: 88 },
    ],
    // Flat list for 3D globe
    globe: [
      "Java", "Spring", "TypeScript", "React", "Node", "Python", "Erlang", "C++",
      "PostgreSQL", "Redis", "MongoDB", "MySQL", "Docker", "AWS", "Y.js", "CRDT",
      "WebSocket", "RabbitMQ", "Claude", "OpenAI", "Deepgram", "Groq", "Angular",
      "JUnit", "Jest", "Bun", "Express", "JPA", "Monaco", "Fabric.js",
    ],
  },

  files: [
    { name: "README.md", icon: "md", section: "overview", key: "1" },
    { name: "experience.ts", icon: "ts", section: "experience", key: "2" },
    { name: "projects.jsx", icon: "jsx", section: "projects", key: "3" },
    { name: "skills.json", icon: "json", section: "skills", key: "4" },
    { name: "about.md", icon: "md", section: "about", key: "5" },
    { name: "contact.ts", icon: "ts", section: "contact", key: "6" },
  ],
};

window.PORTFOLIO = PORTFOLIO;
