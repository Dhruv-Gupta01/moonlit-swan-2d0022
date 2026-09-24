// Hero + 3D skills globe + sections + projects + skills + about + contact.
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

// ===== Typed text =====
function TypedRotator({ lines }) {
  const [idx, setIdx] = useStateS(0);
  const [text, setText] = useStateS('');
  const [del, setDel] = useStateS(false);

  useEffectS(() => {
    const cur = lines[idx];
    if (!del && text === cur) {
      const t = setTimeout(() => setDel(true), 1600);
      return () => clearTimeout(t);
    }
    if (del && text === '') {
      setDel(false);
      setIdx((idx + 1) % lines.length);
      return;
    }
    const t = setTimeout(() => {
      setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1));
    }, del ? 28 : 60);
    return () => clearTimeout(t);
  }, [text, del, idx, lines]);

  return (
    <span>
      <span style={{ color: 'var(--accent-3)' }}>$</span>{' '}
      <span style={{ color: 'var(--accent-2)' }}>dhruv</span>
      <span style={{ color: 'var(--text-mute)' }}>.is(</span>
      <span style={{ color: 'var(--green)' }}>"{text}"</span>
      <span className="caret" />
      <span style={{ color: 'var(--text-mute)' }}>)</span>
    </span>
  );
}

// ===== Hero =====
function Hero() {
  const id = PORTFOLIO.identity;
  return (
    <section id="overview" className="section hero">
      <div className="prompt-line">
        <span className="sigil">~/portfolio</span>
        <span style={{ color: 'var(--text-mute)' }}>on</span>
        <span style={{ color: 'var(--accent-3)' }}>⎇ main</span>
        <span style={{ color: 'var(--text-mute)' }}>✓</span>
      </div>

      <h1>
        Dhruv Gupta.<br />
        <span className="grad">Ship real-time.</span>
      </h1>

      <div className="typed">
        <TypedRotator lines={PORTFOLIO.typed} />
      </div>

      <p className="tag">
        <strong>Full-stack engineer</strong> building RL environments for coding agents, LLM
        evaluation platforms, and real-time systems. Equally at home in a Spring Boot service,
        a CRDT sync engine, or a sub-second voice pipeline.
      </p>

      <div className="cta">
        <a className="btn primary" href="#projects" onClick={(e) => { e.preventDefault(); jumpTo('projects'); }}>
          View projects <span className="arrow">→</span>
        </a>
        <a className="btn" href={id.links.github} target="_blank" rel="noreferrer">
          <span>⬢</span> GitHub
        </a>
        <a className="btn" href={id.links.aiInterviewer} target="_blank" rel="noreferrer">
          <span>★</span> AI Interviewer
        </a>
        <a className="btn" href={`mailto:${id.email}`}>
          <span>✉</span> Email
        </a>
      </div>

      <div className="stat-grid stagger">
        {id.stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="k">{s.k}</div>
            <div className="v">{s.v}{s.u && <span className="u">{s.u}</span>}</div>
          </div>
        ))}
      </div>

      <SkillsGlobe />
    </section>
  );
}

// ===== 3D Skills Globe (canvas, no Three.js — pure 2D projection of rotating 3D points) =====
function SkillsGlobe() {
  const canvasRef = useRefS(null);
  const words = PORTFOLIO.skills.globe;

  useEffectS(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const safeResize = () => requestAnimationFrame(resize);
    const ro = new ResizeObserver(safeResize);
    ro.observe(canvas);

    // Distribute points on a sphere via Fibonacci lattice
    const N = words.length;
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, label: words[i] });
    }

    let rx = 0.2, ry = 0;
    let mouseX = 0, mouseY = 0, targetMX = 0, targetMY = 0;
    let paused = false;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onEnter = () => paused = true;
    const onLeave = () => { paused = false; targetMX = 0; targetMY = 0; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseenter', onEnter);
    canvas.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mouseX += (targetMX - mouseX) * 0.08;
      mouseY += (targetMY - mouseY) * 0.08;

      if (!paused) ry += 0.003;
      ry += mouseX * 0.02;
      rx = 0.2 + mouseY * 0.6;

      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.36;

      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      // Project + sort by z
      const projected = pts.map(p => {
        // rotate Y then X
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        let y1 = p.y;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        return { x: x1, y: y2, z: z2, label: p.label };
      }).sort((a, b) => a.z - b.z);

      // Draw orbit rings (behind)
      ctx.strokeStyle = 'rgba(140, 120, 220, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, R, R * Math.abs(Math.cos(rx + i * 0.3)) + 4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Center glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.1);
      grad.addColorStop(0, 'rgba(140, 100, 230, 0.22)');
      grad.addColorStop(0.5, 'rgba(140, 100, 230, 0.05)');
      grad.addColorStop(1, 'rgba(140, 100, 230, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Connecting lines to a few nearby neighbors
      ctx.strokeStyle = 'rgba(120, 180, 230, 0.1)';
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        if (a.z < 0) continue;
        for (let j = i + 1; j < Math.min(i + 4, projected.length); j++) {
          const b = projected[j];
          if (b.z < 0) continue;
          const dx = (a.x - b.x), dy = (a.y - b.y), dz = (a.z - b.z);
          const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (d < 0.5) {
            ctx.globalAlpha = (0.5 - d) * 0.6;
            ctx.beginPath();
            ctx.moveTo(cx + a.x * R, cy + a.y * R);
            ctx.lineTo(cx + b.x * R, cy + b.y * R);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw labels
      ctx.font = '500 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      projected.forEach(p => {
        const scale = (p.z + 1.5) / 2.5; // 0.2 .. 1
        const alpha = Math.max(0.15, scale);
        const px = cx + p.x * R;
        const py = cy + p.y * R;

        // glow dot
        ctx.fillStyle = `oklch(0.78 0.16 200 / ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.5 * scale + 1, 0, Math.PI * 2);
        ctx.fill();

        // label
        const fontSize = 10 + scale * 4;
        ctx.font = `${500} ${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = p.z > 0.3
          ? `oklch(0.92 0.02 275 / ${alpha})`
          : `oklch(0.7 0.08 275 / ${alpha * 0.7})`;
        ctx.fillText(p.label, px, py - 10 * scale);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseenter', onEnter);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="globe-wrap">
      <div className="label">
        <span>// </span><span className="acc">skills.globe</span>
        <span style={{ color: 'var(--text-mute)' }}> · hover to steer</span>
      </div>
      <canvas ref={canvasRef} />
      <div className="legend">
        <span><span className="dot" style={{ background: 'var(--accent-2)' }} /> core</span>
        <span><span className="dot" style={{ background: 'var(--accent-3)' }} /> adjacent</span>
        <span><span className="dot" style={{ background: 'var(--green)' }} /> AI &amp; LLM</span>
      </div>
    </div>
  );
}

// ===== Code-block README =====
function Readme() {
  return (
    <div className="editor-body section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <span className="idx">01 · README.md</span>
        <h2><span className="tok">##</span> About</h2>
        <span className="meta">~/portfolio/README.md</span>
      </div>
      <CodeBlock lines={[
        [{ c: 'com', t: '// Engineer, building the systems agents get trained and tested on.' }],
        [],
        [{ c: 'kw', t: 'export const' }, { c: '', t: ' ' }, { c: 'var', t: 'dhruv' }, { c: '', t: ' = {' }],
        [{ c: '', t: '  ' }, { c: 'prop', t: 'role' }, { c: '', t: ': ' }, { c: 'str', t: '"Full-Stack Engineer"' }, { c: '', t: ',' }],
        [{ c: '', t: '  ' }, { c: 'prop', t: 'years' }, { c: '', t: ': ' }, { c: 'num', t: '2' }, { c: '', t: ',' }],
        [{ c: '', t: '  ' }, { c: 'prop', t: 'focus' }, { c: '', t: ': [' }, { c: 'str', t: '"RL envs"' }, { c: '', t: ', ' }, { c: 'str', t: '"LLM evals"' }, { c: '', t: ', ' }, { c: 'str', t: '"real-time"' }, { c: '', t: ', ' }, { c: 'str', t: '"CRDT"' }, { c: '', t: '],' }],
        [{ c: '', t: '  ' }, { c: 'prop', t: 'currentlyAt' }, { c: '', t: ': ' }, { c: 'str', t: '"Biz-Tech Analytics"' }, { c: '', t: ',' }],
        [{ c: '', t: '  ' }, { c: 'prop', t: 'shippedRecently' }, { c: '', t: ': ' }, { c: 'fn', t: 'async' }, { c: '', t: ' () => (' }],
        [{ c: '', t: '    ' }, { c: 'kw', t: 'await' }, { c: '', t: ' ' }, { c: 'fn', t: 'Promise' }, { c: '', t: '.' }, { c: 'fn', t: 'all' }, { c: '', t: '([' }],
        [{ c: '', t: '      ' }, { c: 'str', t: '"RL environment for coding agents"' }, { c: '', t: ',' }],
        [{ c: '', t: '      ' }, { c: 'str', t: '"benchmark evaluation platform"' }, { c: '', t: ',' }],
        [{ c: '', t: '      ' }, { c: 'str', t: '"ATS for a 1,000+ freelancer pool"' }, { c: '', t: ',' }],
        [{ c: '', t: '    ])' }],
        [{ c: '', t: '  ),' }],
        [{ c: '', t: '};' }],
        [],
        [{ c: 'com', t: '// Open to interesting AI, evals & real-time work.' }],
        [{ c: 'com', t: '// Reach out: dhruvgupta9191@gmail.com' }],
      ]} highlights={[11, 12, 13]} />
    </div>
  );
}

function CodeBlock({ lines, highlights = [] }) {
  return (
    <div className="codeblock">
      <div className="gutter">
        {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
      </div>
      <div className="code">
        {lines.map((toks, i) => (
          <div
            key={i}
            className={`ln ${toks.length === 0 ? 'empty' : ''} ${highlights.includes(i) ? 'highlight' : ''}`}
          >
            {toks.map((t, j) => (
              <span key={j} className={t.c}>{t.t}</span>
            ))}
            {toks.length === 0 && '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Experience =====
function Experience() {
  return (
    <div className="editor-body section" id="experience">
      <div className="section-head">
        <span className="idx">02 · experience.ts</span>
        <h2><span className="tok">type</span> Experience[]</h2>
        <span className="meta">3 roles</span>
      </div>
      <div className="exp-list stagger">
        {PORTFOLIO.experience.map((e, i) => <ExpCard key={i} e={e} />)}
      </div>
    </div>
  );
}

function ExpCard({ e }) {
  return (
    <div className="exp">
      <div className="exp-head">
        <div className={`logo ${e.logoClass}`}>{e.logoText}</div>
        <div>
          <div className="title">{e.role} · <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>{e.company}</span></div>
          <div className="sub">{e.location} · {e.period}</div>
        </div>
        <div className={`status ${e.status}`}>
          <span className="dot" />{e.status === 'live' ? 'Current' : 'Past'}
        </div>
        <div className="period">{e.period.split('—')[0]}</div>
      </div>
      <div className="exp-body">
        <div className="exp-lead">{e.lead}</div>
        <ul className="exp-bullets">
          {e.bullets.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: b }} />)}
        </ul>
        <div className="exp-metrics">
          {e.metrics.map((m, i) => (
            <div className="m" key={i}>
              <div className="k">{m.k}</div>
              <div className="v">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== Projects =====
function Projects() {
  return (
    <div className="editor-body section" id="projects">
      <div className="section-head">
        <span className="idx">03 · projects.jsx</span>
        <h2><span className="tok">&lt;</span>Projects<span className="tok"> /&gt;</span></h2>
        <span className="meta">{PORTFOLIO.projects.length} shipped</span>
      </div>
      <div className="proj-grid stagger">
        {PORTFOLIO.projects.map((p, i) => <ProjectCard key={i} p={p} seed={i} />)}
      </div>
    </div>
  );
}

function ProjectCard({ p, seed }) {
  return (
    <div className="proj">
      <div className="proj-left">
        <div className="proj-meta">
          <span>PROJ_{String(seed + 1).padStart(2, '0')}</span>
          <span>·</span>
          <span>{p.subtitle}</span>
          {p.live && <span className="live"><span className="dot" /> LIVE</span>}
          {p.internal && <span style={{ color: 'var(--text-mute)' }}>· internal</span>}
        </div>
        <h3>{p.name}</h3>
        <p className="desc" dangerouslySetInnerHTML={{ __html: p.desc }} />
        <ul className="features">
          {p.features.map((f, i) => <li key={i} dangerouslySetInnerHTML={{ __html: f }} />)}
        </ul>
        <div className="tag-row">
          {p.tags.map((t, i) => <span className="chip" key={i}>{t}</span>)}
        </div>
        <div className="actions">
          {p.repo && (
            <a className="btn" href={p.repo} target="_blank" rel="noreferrer">
              <span>⬢</span> View repo <span className="arrow">→</span>
            </a>
          )}
          {p.internal && (
            <span className="btn" style={{ opacity: 0.7, cursor: 'default' }}>
              <span>🔒</span> Internal · NDA
            </span>
          )}
        </div>
      </div>
      <div className="proj-right">
        <ProjectVisual kind={p.visualKind} seed={seed} />
      </div>
    </div>
  );
}

// ===== Animated project visuals =====
function ProjectVisual({ kind, seed }) {
  if (kind === 'voice') return <VoiceWaveVisual />;
  if (kind === 'candles') return <CandlesVisual seed={seed} />;
  if (kind === 'grid') return <CRDTGridVisual />;
  if (kind === 'verifier') return <PipelineVisual stages={['compile', 'hidden tests', 'time / mem limits', 'reward']} />;
  if (kind === 'bench') return <PipelineVisual stages={['task', 'sandbox run', 'verify', 'score']} />;
  if (kind === 'funnel') return <PipelineVisual stages={['intake', 'resume scoring', 'screening', 'interview scheduled']} />;
  return null;
}

// Animated stage pipeline: a "run" advances through each stage in turn.
function PipelineVisual({ stages }) {
  const [step, setStep] = useStateS(0);
  useEffectS(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (stages.length + 2)), 800);
    return () => clearInterval(t);
  }, [stages.length]);
  return (
    <div style={{ width: '100%', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--mono, monospace)', fontSize: 13 }}>
      {stages.map((s, i) => {
        const done = step > i;
        const active = step === i;
        return (
          <div key={s} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            border: '1px solid var(--line)', borderRadius: 8,
            color: done ? 'var(--green)' : active ? 'var(--accent-2)' : 'var(--text-mute)',
            transition: 'color .3s, border-color .3s',
            borderColor: done ? 'var(--green)' : active ? 'var(--accent-2)' : 'var(--line)',
          }}>
            <span style={{ width: 16 }}>{done ? '\u2713' : active ? '\u25B6' : '\u25CB'}</span>
            <span>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

function VoiceWaveVisual() {
  const ref = useRefS(null);
  useEffectS(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => requestAnimationFrame(resize)); ro.observe(c);
    let t = 0, raf = 0;
    const bars = 56;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.04;
      const bw = w / bars;
      for (let i = 0; i < bars; i++) {
        const center = Math.sin(t + i * 0.25) * 0.5 + Math.sin(t * 0.7 + i * 0.1) * 0.3;
        const amp = (0.2 + Math.abs(center) * 0.8);
        const bh = amp * h * 0.6;
        const y = h / 2 - bh / 2;
        const hue = 275 + (i / bars) * 80;
        ctx.fillStyle = `oklch(0.72 0.18 ${hue})`;
        ctx.globalAlpha = 0.5 + amp * 0.5;
        ctx.fillRect(i * bw + 2, y, bw - 4, bh);
      }
      ctx.globalAlpha = 1;
      // label
      ctx.fillStyle = 'rgba(230,230,240,0.9)';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText('▶ STT ─▶ LLM ─▶ TTS   <1s round-trip', 20, 28);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

function CandlesVisual({ seed }) {
  const ref = useRefS(null);
  useEffectS(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => requestAnimationFrame(resize)); ro.observe(c);

    let s = seed * 7349 + 1;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    const n = 42;
    const candles = [];
    let prev = 0.5;
    for (let i = 0; i < n; i++) {
      const o = prev;
      const ch = (rand() - 0.45) * 0.08;
      const cl = Math.max(0.1, Math.min(0.9, o + ch));
      const hi = Math.max(o, cl) + rand() * 0.04;
      const lo = Math.min(o, cl) - rand() * 0.04;
      candles.push({ o, c: cl, h: hi, l: lo });
      prev = cl;
    }

    let t = 0, raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.01;

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) {
        const y = (h / 6) * i;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      const cw = w / n;
      candles.forEach((k, i) => {
        const x = i * cw + cw / 2;
        const up = k.c > k.o;
        const col = up ? 'oklch(0.78 0.17 150)' : 'oklch(0.7 0.2 25)';
        ctx.strokeStyle = col;
        ctx.fillStyle = col;
        // wick
        ctx.beginPath();
        ctx.moveTo(x, h - k.h * h);
        ctx.lineTo(x, h - k.l * h);
        ctx.stroke();
        // body
        const by = h - Math.max(k.o, k.c) * h;
        const bh = Math.abs(k.c - k.o) * h || 1;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x - cw * 0.3, by, cw * 0.6, bh);
        ctx.globalAlpha = 1;
      });

      // moving scanline
      const sx = (Math.sin(t) * 0.5 + 0.5) * w;
      ctx.fillStyle = 'rgba(140, 100, 230, 0.15)';
      ctx.fillRect(sx - 1, 0, 2, h);

      // label
      ctx.fillStyle = 'rgba(230,230,240,0.9)';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText('$MFT  100+ orders · multi-leg', 20, 28);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [seed]);
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

function CRDTGridVisual() {
  const ref = useRefS(null);
  useEffectS(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => requestAnimationFrame(resize)); ro.observe(c);

    const cols = 14, rows = 9;
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c2 = 0; c2 < cols; c2++) cells.push({ r, c: c2, a: 0, user: 0 });
    const users = [
      'oklch(0.78 0.16 200)',
      'oklch(0.72 0.22 340)',
      'oklch(0.78 0.17 150)',
      'oklch(0.85 0.15 95)',
    ];
    let tick = 0, raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      tick++;
      if (tick % 12 === 0) {
        // flash random cells
        for (let i = 0; i < 3; i++) {
          const k = cells[Math.floor(Math.random() * cells.length)];
          k.a = 1;
          k.user = Math.floor(Math.random() * users.length);
        }
      }
      const cw = w / cols, ch = h / rows;
      cells.forEach(k => {
        k.a *= 0.94;
        // cell bg
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.strokeRect(k.c * cw, k.r * ch, cw, ch);
        if (k.a > 0.02) {
          ctx.fillStyle = users[k.user];
          ctx.globalAlpha = k.a * 0.6;
          ctx.fillRect(k.c * cw, k.r * ch, cw, ch);
          ctx.globalAlpha = 1;
        }
      });

      // cursor labels
      ['dhruv', 'alice', 'bob', 'carla'].forEach((name, i) => {
        const phase = tick * 0.01 + i * 1.5;
        const cx = (Math.sin(phase) * 0.4 + 0.5) * w;
        const cy = (Math.cos(phase * 0.7) * 0.4 + 0.5) * h;
        ctx.fillStyle = users[i];
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillText(name, cx + 7, cy + 3);
      });

      ctx.fillStyle = 'rgba(230,230,240,0.9)';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText('4 users · CRDT merge · 0 conflicts', 20, 28);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ===== Skills =====
function Skills() {
  return (
    <div className="editor-body section" id="skills">
      <div className="section-head">
        <span className="idx">04 · skills.json</span>
        <h2><span className="tok">"</span>stack<span className="tok">"</span>: &#123; ... &#125;</h2>
        <span className="meta">core · adjacent</span>
      </div>
      <div className="skills-panel">
        <SkillCol title="core_stack" rows={PORTFOLIO.skills.core} />
        <SkillCol title="adjacent" rows={PORTFOLIO.skills.adjacent} ask />
      </div>
    </div>
  );
}

function SkillCol({ title, rows, ask }) {
  // Map pct → editorial proficiency band, no naked numbers
  const band = (p) => {
    if (p >= 90) return { label: 'primary',    cls: 'b-primary',    dots: 4 };
    if (p >= 80) return { label: 'daily',      cls: 'b-daily',      dots: 3 };
    if (p >= 70) return { label: 'proficient', cls: 'b-proficient', dots: 2 };
    return            { label: 'learning',   cls: 'b-learning',   dots: 1 };
  };
  return (
    <div className="skills-card">
      <div className="title">
        <span className="brace">&#123;</span>
        <span className="key">"{title}"</span>
        <span className="colon">:</span>
        <span className="bracket">[</span>
      </div>
      <ul className="skill-list">
        {rows.map((r, i) => {
          const b = band(r.pct);
          return (
            <li className={`skill ${ask ? 'ask' : ''}`} key={i}>
              <span className="lineno">{String(i + 1).padStart(2, '0')}</span>
              <span className="name">"{r.name}"</span>
              <span className={`band ${b.cls}`}>
                <span className="dots" aria-hidden="true">
                  {[0,1,2,3].map(d => (
                    <span key={d} className={`dot ${d < b.dots ? 'on' : ''}`} />
                  ))}
                </span>
                <span className="band-label">{b.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="title close">
        <span className="bracket">]</span>
        <span className="brace">&#125;</span>
      </div>
    </div>
  );
}

// ===== About =====
function About() {
  return (
    <div className="editor-body section" id="about">
      <div className="section-head">
        <span className="idx">05 · about.md</span>
        <h2><span className="tok">##</span> Credentials</h2>
        <span className="meta">Education · Certs</span>
      </div>
      <div className="two-col stagger">
        <div className="card">
          <span className="card-tag">Education</span>
          <h4>Jaypee Institute of Information Technology</h4>
          <div className="sub2">B.Tech — Computer Science · 2020 – 2024 · Noida</div>
          <p>
            CS foundations — data structures, algorithms, systems. Graduated with an
            engineering mindset focused on correctness under concurrency.
          </p>
        </div>
        <div className="card">
          <span className="card-tag">Certification</span>
          <h4>Oracle Certified Professional — Java SE 11</h4>
          <div className="sub2">Core Java · OOP · Functional · Multithreading</div>
          <p>
            Validated the substrate for Spring Boot services and trading logic shipped at
            Kreeda Labs and LTIMindtree.
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== Contact =====
function Contact() {
  const id = PORTFOLIO.identity;
  return (
    <div className="editor-body section contact" id="contact">
      <div className="section-head">
        <span className="idx">06 · contact.ts</span>
        <h2><span className="tok">export async function</span> getInTouch()</h2>
        <span className="meta">reply within 24h</span>
      </div>
      <div className="headline">
        Let's build<br /><span className="grad">something real-time.</span>
      </div>
      <p className="lead">
        Open to interesting full-stack and real-time systems roles. The best way to reach me
        is email. I reply to most messages within a day.
      </p>
      <div className="contact-grid">
        <a href={`mailto:${id.email}`}>
          <span className="ico">@</span>
          <span className="info"><div className="k">email</div><div className="v">{id.email}</div></span>
          <span className="arr">→</span>
        </a>
        <a href={id.links.github} target="_blank" rel="noreferrer">
          <span className="ico">⬢</span>
          <span className="info"><div className="k">github</div><div className="v">/Dhruv-Gupta01</div></span>
          <span className="arr">→</span>
        </a>
        <a href={id.links.linkedin} target="_blank" rel="noreferrer">
          <span className="ico">in</span>
          <span className="info"><div className="k">linkedin</div><div className="v">/dhruv-gupta-8a362b188</div></span>
          <span className="arr">→</span>
        </a>
        <a href={id.links.leetcode} target="_blank" rel="noreferrer">
          <span className="ico">&lt;/&gt;</span>
          <span className="info"><div className="k">leetcode</div><div className="v">/u/dhruvgupta9911</div></span>
          <span className="arr">→</span>
        </a>
      </div>
    </div>
  );
}

Object.assign(window, {
  Hero, Readme, Experience, Projects, Skills, About, Contact, SkillsGlobe, CodeBlock,
});
