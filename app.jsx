// App shell
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 275,
  "accentHue2": 200,
  "accentHue3": 340,
  "density": 1.0,
  "showTabs": true
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const root = document.documentElement;
  root.style.setProperty('--accent', `oklch(0.72 0.18 ${t.accentHue})`);
  root.style.setProperty('--accent-2', `oklch(0.78 0.16 ${t.accentHue2})`);
  root.style.setProperty('--accent-3', `oklch(0.72 0.22 ${t.accentHue3})`);
}

function App() {
  const [active, setActive] = useStateA('overview');
  const [paletteOpen, setPaletteOpen] = useStateA(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useStateA(false);
  const tweaks = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => { applyTweaks(tweaks.values); }, [tweaks.values]);

  useEffectA(() => {
    document.body.classList.toggle('sidebar-collapsed', sidebarCollapsed);
  }, [sidebarCollapsed]);

  useEffectA(() => {
    const h = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setPaletteOpen(true);
        return;
      }
      if (e.key === 'Escape') { setPaletteOpen(false); return; }
      const file = PORTFOLIO.files.find(f => f.key === e.key);
      if (file) { e.preventDefault(); jumpTo(file.section); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffectA(() => {
    const ids = PORTFOLIO.files.map(f => f.section);
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Titlebar active={active} onOpenPalette={() => setPaletteOpen(true)} />
      <div className={`ide ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar
          active={active}
          onJump={jumpTo}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(c => !c)}
        />
        <main className="main" style={{ fontSize: `${14 * tweaks.values.density}px` }}>
          {tweaks.values.showTabs && <Tabs active={active} onJump={jumpTo} />}
          <Hero />
          <Readme />
          <Experience />
          <Projects />
          <Skills />
          <About />
          <Contact />
          <div style={{ height: 48 }} />
        </main>
      </div>
      <StatusBarBottom active={active} />
      <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakSlider label="Primary hue (indigo)" value={tweaks.values.accentHue}
            onChange={(v) => tweaks.set('accentHue', v)} min={0} max={360} step={1} />
          <TweakSlider label="Secondary hue (cyan)" value={tweaks.values.accentHue2}
            onChange={(v) => tweaks.set('accentHue2', v)} min={0} max={360} step={1} />
          <TweakSlider label="Tertiary hue (magenta)" value={tweaks.values.accentHue3}
            onChange={(v) => tweaks.set('accentHue3', v)} min={0} max={360} step={1} />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakSlider label="Text density" value={tweaks.values.density}
            onChange={(v) => tweaks.set('density', v)} min={0.85} max={1.2} step={0.01} />
          <TweakToggle label="Editor tabs" value={tweaks.values.showTabs}
            onChange={(v) => tweaks.set('showTabs', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
