// Appointment Booking — weekly calendar + slots + session type + confirm
const HE_DAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
const HE_MONTHS = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
const ALL_SLOTS = ['07:00', '08:30', '10:00', '17:00', '18:30', '20:00'];

// Pseudo-random but deterministic availability per day
function availabilityFor(date) {
  const key = date.getDate() + date.getMonth() * 31;
  const seed = (key * 9301 + 49297) % 233280;
  const rand = (i) => ((seed + i * 2654435761) >>> 0) % 100;
  const weekend = date.getDay() === 6; // Saturday in Israel
  return ALL_SLOTS.map((s, i) => ({
    time: s,
    taken: weekend ? true : rand(i) < 35,
  }));
}

function Booking({ go }) {
  const [anchor, setAnchor] = React.useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // start of this week (Sunday)
    d.setDate(d.getDate() - d.getDay());
    return d;
  });
  const [selected, setSelected] = React.useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    if (d.getDay() === 6) d.setDate(d.getDate() + 1);
    return d;
  });
  const [sessionType, setSessionType] = React.useState('private');
  const [slot, setSlot] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(anchor);
    d.setDate(anchor.getDate() + i);
    return d;
  });

  const slots = React.useMemo(() => availabilityFor(selected), [selected.getTime()]);
  const hasAvail = (date) => availabilityFor(date).some(s => !s.taken);

  const isSame = (a, b) => a.toDateString() === b.toDateString();
  const monthLabel = `${HE_MONTHS[selected.getMonth()]} ${selected.getFullYear()}`;

  const canConfirm = slot != null;

  const bookLabel = {
    date: selected.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' }),
    time: slot,
    type: sessionType === 'private' ? 'שיעור פרטי · 60 דק׳' : 'שיעור קבוצתי · 75 דק׳',
    price: sessionType === 'private' ? '₪ 260' : '₪ 90',
  };

  return (
    <div className="screen">
      <div className="topbar">
        <div className="brand"><span className="dot" /><span>קביעת שיעור</span></div>
        <div className="greet">שלום שלום 🙏</div>
      </div>

      <div className="booking">
        <h1>בואי נמצא<br/><span style={{ fontStyle: 'italic', color: 'var(--accent-deep)' }}>זמן בשבילך</span></h1>
        <div className="sub">בחרי יום, שעה וסוג השיעור. אשלח אישור בוואטסאפ.</div>

        <div className="segment" role="tablist">
          <button className={sessionType === 'private' ? 'on' : ''} onClick={() => setSessionType('private')}>
            <IconUser size={14} style={{ verticalAlign: 'middle', marginInlineEnd: 6 }} />
            שיעור פרטי
          </button>
          <button className={sessionType === 'group' ? 'on' : ''} onClick={() => setSessionType('group')}>
            <IconUsers size={14} style={{ verticalAlign: 'middle', marginInlineEnd: 6 }} />
            שיעור קבוצתי
          </button>
        </div>

        <div className="week-head">
          <div className="month">{monthLabel}</div>
          <div className="arrows">
            <button aria-label="שבוע קודם" onClick={() => {
              const d = new Date(anchor); d.setDate(d.getDate() - 7); setAnchor(d);
            }}><IconArrowR size={16} /></button>
            <button aria-label="שבוע הבא" onClick={() => {
              const d = new Date(anchor); d.setDate(d.getDate() + 7); setAnchor(d);
            }}><IconArrow size={16} /></button>
          </div>
        </div>

        <div className="week-row">
          {week.map((d, i) => {
            const isSel = isSame(d, selected);
            const full = !hasAvail(d);
            return (
              <button
                key={i}
                className={`day-pill ${isSel ? 'sel' : ''} ${full ? 'full' : 'avail'}`}
                onClick={() => { if (!full) { setSelected(d); setSlot(null); } }}
                disabled={full}
              >
                <span className="dn">{HE_DAYS[d.getDay()]}</span>
                <span className="dd">{d.getDate()}</span>
              </button>
            );
          })}
        </div>

        <div className="slots-label">שעות פנויות</div>
        <div className="slots">
          {slots.map(s => (
            <button
              key={s.time}
              className={`slot ${slot === s.time ? 'on' : ''}`}
              disabled={s.taken}
              onClick={() => setSlot(s.time)}
            >{s.time}</button>
          ))}
        </div>

        {canConfirm && (
          <div className="summary">
            <div className="srow"><span className="sk">תאריך</span><span className="sv">{bookLabel.date}</span></div>
            <div className="srow"><span className="sk">שעה</span><span className="sv">{bookLabel.time}</span></div>
            <div className="srow"><span className="sk">סוג שיעור</span><span className="sv">{bookLabel.type}</span></div>
            <div className="srow"><span className="sk">עלות</span><span className="sv">{bookLabel.price}</span></div>
          </div>
        )}

        <button className="cta" disabled={!canConfirm} onClick={() => setConfirmed(true)}>
          {canConfirm ? 'לאישור השיעור' : 'בחרי שעה לסיום הקביעה'}
        </button>
      </div>

      {confirmed && (
        <div className="confirm-veil" onClick={() => setConfirmed(false)}>
          <div className="confirm" onClick={e => e.stopPropagation()}>
            <div className="check"><IconCheck size={28} /></div>
            <h3>השיעור נקבע</h3>
            <p>
              נתראה {bookLabel.date} בשעה {bookLabel.time}.<br/>
              אישור יישלח אליך בוואטסאפ.
            </p>
            <div className="namaste">נמסטה · אוריאן 🙏</div>
            <button onClick={() => { setConfirmed(false); setSlot(null); }}>תודה</button>
          </div>
        </div>
      )}
    </div>
  );
}

window.Booking = Booking;
