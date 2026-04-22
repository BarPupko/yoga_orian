// Main app shell: routing, theme persistence, Tweaks handshake
const TABS = [
  { id: 'home',       name: 'בית',      Icon: IconHome },
  { id: 'booking',    name: 'קביעת תור', Icon: IconCal  },
  { id: 'library',    name: 'תנוחות',    Icon: IconLib  },
  { id: 'meditation', name: 'מדיטציה',   Icon: IconMedi },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "earth",
  "layout": "normal",
  "heroName": "יוגה עם אוריאן"
}/*EDITMODE-END*/;

function App() {
  // Mode: student (default) or instructor dashboard
  const [mode, setMode] = React.useState(() => {
    try { return localStorage.getItem('yo-mode') || 'student'; } catch { return 'student'; }
  });
  // Active tab persisted across refresh
  const [tab, setTab] = React.useState(() => {
    try { return localStorage.getItem('yo-tab') || 'home'; } catch { return 'home'; }
  });
  const [tweaks, _setTweaks] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('yo-tweaks') || '{}');
      return { ...TWEAK_DEFAULTS, ...saved };
    } catch { return TWEAK_DEFAULTS; }
  });
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  const setTweaks = (patch) => {
    _setTweaks(prev => {
      const next = { ...prev, ...patch };
      try { localStorage.setItem('yo-tweaks', JSON.stringify(next)); } catch {}
      try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch {}
      return next;
    });
  };

  React.useEffect(() => { applyTheme(tweaks.theme); }, [tweaks.theme]);
  React.useEffect(() => { try { localStorage.setItem('yo-tab', tab); } catch {} }, [tab]);
  React.useEffect(() => { try { localStorage.setItem('yo-mode', mode); } catch {} }, [mode]);

  React.useEffect(() => {
    function onMsg(e) {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setTweaksOpen(true);
      else if (t === '__deactivate_edit_mode') setTweaksOpen(false);
    }
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Instructor mode — render dashboard at full-bleed
  if (mode === 'instructor') {
    return (
      <>
        <div className="bg-stage" />
        <div className="shell" data-layout={tweaks.layout}>
          <Dashboard onExit={() => setMode('student')} />
          {tweaksOpen && (
            <Tweaks
              tweaks={tweaks} setTweaks={setTweaks}
              mode={mode} setMode={setMode}
              onClose={() => setTweaksOpen(false)}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-stage" />
      <div className="shell" data-layout={tweaks.layout}>
        <HeroNameBridge value={tweaks.heroName} />

        {/* Always render all screens; hide inactive ones so Meditation audio persists */}
        <div style={{ display: tab === 'home' ? 'contents' : 'none' }}>
          <Home go={setTab} theme={tweaks.theme} />
        </div>
        <div style={{ display: tab === 'booking' ? 'contents' : 'none' }}>
          <Booking go={setTab} />
        </div>
        <div style={{ display: tab === 'library' ? 'contents' : 'none' }}>
          <Library />
        </div>
        <div style={{ display: tab === 'meditation' ? 'contents' : 'none' }}>
          <Meditation />
        </div>

        <nav className="tabbar" aria-label="ניווט ראשי">
          {TABS.map(({ id, name, Icon }) => (
            <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
              <span className="ti"><Icon size={18} /></span>
              <span>{name}</span>
            </button>
          ))}
        </nav>

        {tweaksOpen && (
          <Tweaks
            tweaks={tweaks} setTweaks={setTweaks}
            mode={mode} setMode={setMode}
            onClose={() => setTweaksOpen(false)}
          />
        )}
      </div>
    </>
  );
}

function HeroNameBridge({ value }) {
  React.useEffect(() => {
    const el = document.querySelector('.home-hero h1');
    if (!el) return;
    if (!value || value === TWEAK_DEFAULTS.heroName) return;
    el.innerHTML = value.replace(/\n/g, '<br/>');
  }, [value]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
