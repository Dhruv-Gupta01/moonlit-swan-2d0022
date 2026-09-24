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
      { k: "experience", v: "2+", u: "yrs" },
      { k: "eval tasks built", v: "10+" },
      { k: "freelancer pool (ATS)", v: "1,000+" },
      { k: "concurrent orders", v: "100+" },
    ],
  },

  typed: [
    "building RL environments for coding agents.",
    "writing evals that beat frontier models.",
    "shipping real-time systems.",
    "automating hiring at scale.",
  ],

  experience: [
    {
      logoClass: "biz", logoText: "BT",
      role: "Software Engineer",
      company: "Biz-Tech Analytics",
      location: "Delhi, India",
      period: "Jul 2026 — Present",
      status: "live",
      lead: "Building RL environments and evaluation infrastructure for coding agents.",
      bullets: [
        "Built an <strong>RL environment for coding agents</strong> in <em>C++ and Java</em> — sandboxed execution and automated verifiers (<em>compilation checks, hidden unit tests, time &amp; memory limits</em>) that produce reward signals. Trained agents against it, improving their coding performance through verifier-based feedback.",
        "Built a <strong>benchmark evaluation platform</strong> on the <em>MERN stack</em> and authored <em>10+ complex tasks</em> across <em>C++, Python and JavaScript</em>, designed to defeat frontier models, with automated execution, verification and scoring.",
        "Designed and shipped an <strong>ATS</strong> automating hiring for a <em>1,000+ freelancer pool</em> — application intake from Naukri and Wellfound, resume screening and scoring, and interview scheduling.",
      ],
      metrics: [
        { k: "eval tasks", v: "10+" },
        { k: "freelancer pool", v: "1,000+" },
        { k: "task languages", v: "3" },
      ],
    },
    {
      logoClass: "krda", logoText: "KL",
      role: "Software Engineer",
      company: "Kreeda Labs",
      location: "Pune, India",
      period: "Aug 2025 — Jul 2026",
      status: "closed",
      lead: "Shipped real-time trading + CRDT collaboration at low latency.",
      bullets: [
        "Designed a real-time <strong>algorithmic trading platform</strong> ingesting live <em>bid/ask</em> feeds — multi-leg strategies across <em>100+ concurrent orders</em> with resilient reconnect handling.",
        "Led MVP of <strong>Word- and Excel-like collaborative editors</strong> using <em>Y.js CRDTs</em>, supporting <em>100+ concurrent users</em>.",
        "Integrated fine-tuned LLMs for <strong>format-aware responses</strong> — structured output respecting the active document schema.",
        "Architected sync pipelines on <em>AWS S3 + PostgreSQL</em> with CRDT conflict resolution preventing data corruption.",
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
  ],

  projects: [
    {
      name: "RL Environment for Coding Agents",
      subtitle: "Verifier-driven reward signals · C++ / Java",
      live: false,
      internal: true,
      desc: "An <strong>RL environment</strong> where coding agents are trained against sandboxed execution and automated verifiers. Agents that run against it get better through <strong>verifier-based reward signals</strong>.",
      features: [
        "Sandboxed compile + run in <strong>C++ and Java</strong>",
        "Hidden unit tests with <strong>time &amp; memory limits</strong>",
        "Test results converted into <strong>reward signals</strong>",
      ],
      tags: ["RL", "Verifiers", "Sandboxing", "C++", "Java"],
      visualKind: "verifier",
    },
    {
      name: "Benchmark Evaluation Platform",
      subtitle: "Frontier-model evals · MERN",
      live: false,
      internal: true,
      desc: "A platform that runs models against <strong>10+ complex tasks</strong> in C++, Python and JavaScript — tasks deliberately built to defeat frontier agents — with <strong>automated execution, verification and scoring</strong>.",
      features: [
        "Tasks across <strong>C++, Python, JavaScript</strong>",
        "Automated run &rarr; verify &rarr; score loop",
        "Built end to end on the <strong>MERN stack</strong>",
      ],
      tags: ["MongoDB", "Express", "React", "Node", "LLM Evals"],
      visualKind: "bench",
    },
    {
      name: "Hiring ATS",
      subtitle: "Automated freelancer pipeline",
      live: false,
      internal: true,
      desc: "An <strong>applicant tracking system</strong> that runs hiring for a <strong>1,000+ freelancer pool</strong>: intake from Naukri and Wellfound, resume screening and scoring, and interview scheduling.",
      features: [
        "Application intake from <strong>Naukri &amp; Wellfound</strong>",
        "<strong>Resume screening and scoring</strong>",
        "Automated <strong>interview scheduling</strong>",
      ],
      tags: ["ATS", "Automation", "Scoring", "Scheduling"],
      visualKind: "funnel",
    },
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
      desc: "<strong>Real-time collaborative editors</strong> supporting <strong>100+ concurrent users</strong>. CRDT-based conflict resolution prevents data corruption; fine-tuned LLMs generate <em>format-aware</em> structured output inline.",
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
      { name: "RL Environments / Verifiers", pct: 80 },
      { name: "RabbitMQ", pct: 72 },
      { name: "LLM Evals / Benchmarking", pct: 80 },
      { name: "JUnit / Jest", pct: 88 },
    ],
    // Flat list for 3D globe
    globe: [
      "Java", "Spring", "TypeScript", "React", "Node", "Python", "RL", "C++",
      "PostgreSQL", "Redis", "MongoDB", "MySQL", "Docker", "AWS", "Y.js", "CRDT",
      "WebSocket", "RabbitMQ", "Claude", "OpenAI", "Deepgram", "Groq", "Angular",
      "JUnit", "Jest", "Bun", "Express", "Evals", "Sandboxing", "Monaco", "Fabric.js",
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
