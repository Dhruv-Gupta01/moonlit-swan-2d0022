// Command palette
const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP, useRef: useRefP } = React;

function buildIndex() {
  const items = [];
  PORTFOLIO.files.forEach(f => items.push({ label: f.name, kind: 'File', action: () => jumpTo(f.section) }));
  PORTFOLIO.projects.forEach(p => items.push({ label: p.name, kind: 'Project', action: () => jumpTo('projects') }));
  PORTFOLIO.experience.forEach(e => items.push({ label: `${e.role} · ${e.company}`, kind: 'Role', action: () => jumpTo('experience') }));
  const L = PORTFOLIO.identity.links;
  items.push({ label: 'Open GitHub', kind: 'Link', action: () => window.open(L.github, '_blank') });
  items.push({ label: 'Open LinkedIn', kind: 'Link', action: () => window.open(L.linkedin, '_blank') });
  items.push({ label: 'Open LeetCode', kind: 'Link', action: () => window.open(L.leetcode, '_blank') });
  items.push({ label: 'Email Dhruv', kind: 'Link', action: () => window.location.href = `mailto:${PORTFOLIO.identity.email}` });
  return items;
}

function jumpTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function Palette({ open, onClose }) {
  const [q, setQ] = useStateP('');
  const [sel, setSel] = useStateP(0);
  const inputRef = useRefP(null);
  const all = useMemoP(() => buildIndex(), []);
  const filtered = useMemoP(() => {
    const t = q.trim().toLowerCase();
    if (!t) return all;
    return all.filter(i => i.label.toLowerCase().includes(t) || i.kind.toLowerCase().includes(t));
  }, [q, all]);

  useEffectP(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (open) setQ('');
    setSel(0);
  }, [open]);

  useEffectP(() => { setSel(0); }, [q]);

  const run = (i) => {
    const item = filtered[i];
    if (!item) return;
    onClose();
    setTimeout(() => item.action(), 50);
  };

  if (!open) return null;

  return (
    <div className="palette-bg" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette-in">
          <span className="p">&gt;</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search files, projects, roles… ↑↓ ⏎ esc"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)); }
              else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
              else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
              else if (e.key === 'Escape') onClose();
            }}
          />
        </div>
        <div className="palette-results">
          {filtered.length === 0 && (
            <div className="r" style={{ color: 'var(--text-mute)' }}>
              <span className="idx">—</span><span>no results</span><span />
            </div>
          )}
          {filtered.map((item, i) => (
            <div
              key={i}
              className={`r ${i === sel ? 'sel' : ''}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => run(i)}
            >
              <span className="idx">{i === sel ? '▸' : ' '}</span>
              <span>{item.label}</span>
              <span className="kind">{item.kind}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Palette, jumpTo });
