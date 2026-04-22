// Meditation Room — breathing animation + duration picker + handpan ambient
function Meditation() {
  const [duration, setDuration] = React.useState(10); // minutes
  const [remaining, setRemaining] = React.useState(10 * 60);
  const [running, setRunning] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [phase, setPhase] = React.useState('שאיפה');
  const engineRef = React.useRef(null);
  const tickRef = React.useRef(null);
  const phaseRef = React.useRef(null);

  React.useEffect(() => {
    engineRef.current = new HandpanEngine();
    // Preload voices for pronunciation (not used here, but good citizen)
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
    return () => { try { engineRef.current?.pause(); } catch (e) {} };
  }, []);

  // Countdown
  React.useEffect(() => {
    if (!running) { if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; } return; }
    tickRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(tickRef.current);
          tickRef.current = null;
          setRunning(false);
          try { engineRef.current?.bell(2); } catch (e) {}
          setTimeout(() => { try { engineRef.current?.pause(); } catch (e) {} }, 2000);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [running]);

  // Breath phase cycling in sync with 10s breath animation (5s in, 5s out)
  React.useEffect(() => {
    if (!running) { if (phaseRef.current) { clearInterval(phaseRef.current); phaseRef.current = null; } return; }
    setPhase('שאיפה');
    let inhale = true;
    phaseRef.current = setInterval(() => {
      inhale = !inhale;
      setPhase(inhale ? 'שאיפה' : 'נשיפה');
    }, 5000);
    return () => { if (phaseRef.current) clearInterval(phaseRef.current); };
  }, [running]);

  function pickDuration(m) {
    setDuration(m);
    setRemaining(m * 60);
    if (running) {
      setRunning(false);
      try { engineRef.current?.pause(); } catch (e) {}
    }
  }

  async function togglePlay() {
    if (running) {
      setRunning(false);
      try { engineRef.current?.pause(); } catch (e) {}
    } else {
      if (remaining === 0) setRemaining(duration * 60);
      setRunning(true);
      try { await engineRef.current?.play(); } catch (e) {}
    }
  }

  function reset() {
    setRunning(false);
    setRemaining(duration * 60);
    try { engineRef.current?.pause(); } catch (e) {}
  }

  function toggleMute() {
    const m = !muted;
    setMuted(m);
    engineRef.current?.setMuted(m);
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div className="screen medi">
      <div className="topbar">
        <div className="brand"><span className="dot" /><span>חדר המדיטציה</span></div>
        <div className="greet">ॐ שאנטי</div>
      </div>

      <div className="medi-head">
        <div className="eyebrow">נשום · עצום · היה</div>
        <h1>רגע לעצמך</h1>
        <p>let the breath lead</p>
      </div>

      <div className="breath-wrap">
        <div className={`breath ${running ? 'running' : ''}`}>
          <div className="ring r1" />
          <div className="ring r2" />
          <div className="ring r3" />
          <div className="orb" />
        </div>
        <div className="breath-label">
          {running ? phase : 'מוכנה?'}
          <small>{running ? (phase === 'שאיפה' ? 'inhale' : 'exhale') : 'press to begin'}</small>
        </div>
      </div>

      <div className="time-display">{mm}:{ss}</div>

      <div className="durations">
        {[5, 10, 20].map(m => (
          <button key={m} className={`duration ${duration === m ? 'on' : ''}`} onClick={() => pickDuration(m)}>
            {m} דקות
          </button>
        ))}
      </div>

      <div className="medi-controls">
        <button className={`medi-btn mute ${muted ? 'off' : ''}`} onClick={toggleMute} aria-label={muted ? 'השמע' : 'השתק'}>
          {muted ? <IconMute size={20} /> : <IconSound size={20} />}
        </button>
        <button className="medi-btn primary" onClick={togglePlay} aria-label={running ? 'עצור' : 'התחל'}>
          {running ? <IconPause size={24} /> : <IconPlay size={24} />}
        </button>
        <button className="medi-btn" onClick={reset} aria-label="אפס">
          <IconBack size={18} />
        </button>
      </div>

      <div className="sound-label">צלילי הנדפאן ברקע</div>
    </div>
  );
}

window.Meditation = Meditation;
