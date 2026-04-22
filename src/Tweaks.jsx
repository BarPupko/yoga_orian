// Tweaks panel — theme + layout density + instructor-mode toggle
function Tweaks({ tweaks, setTweaks, mode, setMode, onClose }) {
  return (
    <div className="tweaks-panel" role="dialog" aria-label="התאמות">
      <h4>
        <span>Tweaks</span>
        <button onClick={onClose} aria-label="סגור">✕</button>
      </h4>

      <div className="tweaks-row">
        <div className="instructor-toggle-row">
          <div>
            <div className="ilbl">מצב מדריכה</div>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>
              {mode === 'instructor' ? 'פעיל · לוח ניהול' : 'כבוי · תצוגת תלמידות'}
            </div>
          </div>
          <button onClick={() => setMode(mode === 'instructor' ? 'student' : 'instructor')}>
            {mode === 'instructor' ? 'יציאה' : 'כניסה'}
          </button>
        </div>
      </div>

      <div className="tweaks-row">
        <div className="lbl">ערכת צבעים</div>
        <div className="theme-row">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`theme-chip ${tweaks.theme === t.id ? 'on' : ''}`}
              onClick={() => setTweaks({ theme: t.id })}
            >
              <span className="swatch">
                {t.swatches.map((s, i) => <b key={i} style={{ background: s }} />)}
              </span>
              <span className="name">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <div className="lbl">צפיפות מסך הבית</div>
        <div className="density-row">
          {[
            { id: 'dense', name: 'צפוף' },
            { id: 'normal', name: 'רגיל' },
            { id: 'spacious', name: 'מרווח' },
          ].map(d => (
            <button
              key={d.id}
              className={`density-chip ${tweaks.layout === d.id ? 'on' : ''}`}
              onClick={() => setTweaks({ layout: d.id })}
            >{d.name}</button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <div className="lbl">כותרת הגיבור</div>
        <input
          type="text"
          value={tweaks.heroName}
          onChange={e => setTweaks({ heroName: e.target.value })}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid var(--hair)',
            borderRadius: 10,
            background: 'var(--paper)',
            fontSize: 14,
            fontFamily: 'var(--font-display)',
          }}
        />
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
