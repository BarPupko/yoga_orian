// Yoga Poses Library — grid, tap to speak Sanskrit name via Web Speech API
function Library() {
  const [cat, setCat] = React.useState('הכול');
  const [speaking, setSpeaking] = React.useState(null);

  const list = cat === 'הכול' ? POSES : POSES.filter(p => p.cat === cat);

  async function pronounce(pose) {
    setSpeaking(pose.id);
    try {
      await speakSanskrit(pose.saSpoken || pose.sa, { rate: 0.78 });
    } finally {
      setSpeaking(null);
    }
  }

  return (
    <div className="screen">
      <div className="topbar">
        <div className="brand"><span className="dot" /><span>ספריית התנוחות</span></div>
        <div className="greet">ॐ</div>
      </div>

      <div className="library">
        <h1>אסנות <span style={{ color: 'var(--accent)', fontSize: '0.75em', fontWeight: 500 }}>Āsana</span></h1>
        <div className="sub">לחצי על תנוחה להאזין להגייה בסנסקריט.</div>

        <div className="filters">
          {POSE_CATS.map(c => (
            <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="pose-grid">
          {list.map(p => (
            <button
              key={p.id}
              className={`pose ${speaking === p.id ? 'speaking' : ''}`}
              onClick={() => pronounce(p)}
              aria-label={`האזן ל-${p.sa}`}
            >
              <div className="pose-art">{p.art}</div>
              <div className="ph">{p.he}</div>
              <div className="ps">{p.sa}</div>
              <div className="pmeta">
                <span>{p.cat} · {p.level}</span>
                <span className="play-badge">
                  {speaking === p.id ? <IconSound size={12} /> : <IconPlay size={10} />}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Library = Library;
