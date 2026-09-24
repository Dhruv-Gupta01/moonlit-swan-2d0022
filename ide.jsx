// IDE chrome: Titlebar + file-tree Sidebar + Tabs + bottom status bar.
const { useState, useEffect, useRef, useMemo } = React;

function Titlebar({ active, onOpenPalette }) {
  const fileMap = { overview: 'README.md', experience: 'experience.ts', projects: 'projects.jsx', skills: 'skills.json', about: 'about.md', contact: 'contact.ts' };
  const file = fileMap[active] || 'README.md';
  return (
    <div className="titlebar">
      <div className="traffic"><span /><span /><span /></div>
      <div className="path">
        <span className="crumb">dhruv-gupta</span>
        <span className="sep">/</span>
        <span className="crumb">portfolio</span>
        <span className="sep">/</span>
        <span className="crumb">src</span>
        <span className="sep">/</span>
        <span className="crumb active">{file}</span>
      </div>
      <div className="actions">
        <span className="chip" onClick={onOpenPalette}>
          <kbd>⌘</kbd><kbd>K</kbd> search
        </span>
        <span className="chip">
          <span className="dot" /> running
        </span>
      </div>
    </div>
  );
}

function Sidebar({ active, onJump, collapsed, onToggle }) {
  const [openExplorer, setOpenExplorer] = useState(true);
  const [openLinks, setOpenLinks] = useState(true);

  if (collapsed) {
    return (
      <aside className="sidebar collapsed">
        <button className="sb-collapse-btn" onClick={onToggle} title="Expand sidebar">
          <span>›</span>
        </button>
        <div className="sb-rail">
          {PORTFOLIO.files.map(f => (
            <button
              key={f.section}
              className={`rail-item ${active === f.section ? 'active' : ''}`}
              onClick={() => onJump(f.section)}
              title={f.name}
            >
              <span className={`icon ${f.icon}`}>⬢</span>
            </button>
          ))}
          <div className="rail-divider" />
          <a className="rail-item" href={PORTFOLIO.identity.links.github} target="_blank" rel="noreferrer" title="GitHub">
            <span className="icon js">↗</span>
          </a>
          <a className="rail-item" href={PORTFOLIO.identity.links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
            <span className="icon ts">↗</span>
          </a>
          <a className="rail-item" href={PORTFOLIO.identity.links.leetcode} target="_blank" rel="noreferrer" title="LeetCode">
            <span className="icon jsx">↗</span>
          </a>
          <a className="rail-item" href={`mailto:${PORTFOLIO.identity.email}`} title="Email">
            <span className="icon json">@</span>
          </a>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sb-section">
        <button
          className="sb-head clickable"
          onClick={() => setOpenExplorer(o => !o)}
        >
          <span><span className="caret">{openExplorer ? '▾' : '▸'}</span> Explorer</span>
          <span className="sb-head-act" onClick={(e) => { e.stopPropagation(); onToggle(); }} title="Collapse sidebar">‹</span>
        </button>
        {openExplorer && (
          <div className="tree">
            <div className="row folder">
              <span className="chev">▾</span>
              <span className="icon folder">▸</span>
              <span>portfolio</span>
              <span />
            </div>
            <div className="indent">
              <div className="row folder">
                <span className="chev">▾</span>
                <span className="icon folder">▸</span>
                <span>src</span>
                <span />
              </div>
              <div className="indent">
                {PORTFOLIO.files.map(f => (
                  <a
                    key={f.section}
                    className={`row ${active === f.section ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onJump(f.section); }}
                    href={`#${f.section}`}
                  >
                    <span className="chev"> </span>
                    <span className={`icon ${f.icon}`}>⬢</span>
                    <span>{f.name}</span>
                    <span className="kbd">{f.key}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sb-section">
        <button
          className="sb-head clickable"
          onClick={() => setOpenLinks(o => !o)}
        >
          <span><span className="caret">{openLinks ? '▾' : '▸'}</span> Links</span>
        </button>
        {openLinks && (
          <div className="tree">
            <a className="row" href={PORTFOLIO.identity.links.github} target="_blank" rel="noreferrer">
              <span className="chev"> </span><span className="icon js">↗</span><span>GitHub</span><span />
            </a>
            <a className="row" href={PORTFOLIO.identity.links.linkedin} target="_blank" rel="noreferrer">
              <span className="chev"> </span><span className="icon ts">↗</span><span>LinkedIn</span><span />
            </a>
            <a className="row" href={PORTFOLIO.identity.links.leetcode} target="_blank" rel="noreferrer">
              <span className="chev"> </span><span className="icon jsx">↗</span><span>LeetCode</span><span />
            </a>
            <a className="row" href={`mailto:${PORTFOLIO.identity.email}`}>
              <span className="chev"> </span><span className="icon json">↗</span><span>Email</span><span />
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}

function Tabs({ active, onJump }) {
  return (
    <div className="tabs">
      {PORTFOLIO.files.map(f => (
        <button
          key={f.section}
          className={`tab ${active === f.section ? 'active modified' : ''}`}
          onClick={() => onJump(f.section)}
        >
          <span className={`icon ${f.icon}`}>⬢</span>
          <span>{f.name}</span>
          <span className="close">×</span>
        </button>
      ))}
    </div>
  );
}

function StatusBarBottom({ active }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hhmm = time.toTimeString().slice(0, 5);
  const section = PORTFOLIO.files.find(f => f.section === active);
  return (
    <div className="statusbar-bottom">
      <div className="left">
        <span><span className="i">⎇</span>main</span>
        <span><span className="i">◉</span>0</span>
        <span><span className="i">⚠</span>0</span>
        <span>{section?.name || 'README.md'}</span>
      </div>
      <div className="right">
        <span>UTF-8</span>
        <span>LF</span>
        <span>TypeScript React</span>
        <span>🔔 {hhmm}</span>
      </div>
    </div>
  );
}

Object.assign(window, { Titlebar, Sidebar, Tabs, StatusBarBottom });
