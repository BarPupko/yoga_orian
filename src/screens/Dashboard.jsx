// Instructor Dashboard — manage classes, students, stats
// Accessed via instructor mode toggle

const DEFAULT_CLASSES = [
  { id: 'c1', type: 'האטה בוקר',     date: '2026-04-24', time: '07:00', location: 'אברהם דנינו 12',  capacity: 12, attendees: [
      { id: 'u1', name: 'מיכל כהן',    phone: '050-1234567', joined: '10:22' },
      { id: 'u2', name: 'נועה לוי',    phone: '052-2345678', joined: '11:04' },
      { id: 'u3', name: 'תמר אברהם', phone: '054-3456789', joined: '12:18' },
      { id: 'u4', name: 'רותם דגן',   phone: '050-4567890', joined: '14:30' },
      { id: 'u5', name: 'שירה בן חיים', phone: '053-5678901', joined: '15:45' },
      { id: 'u6', name: 'יעל שמש',    phone: '052-6789012', joined: '16:02' },
      { id: 'u7', name: 'ליאת פרץ',   phone: '054-7890123', joined: '17:20' },
  ] },
  { id: 'c2', type: 'וויניאסה זרימה',  date: '2026-04-24', time: '18:30', location: 'הפארק הגדול · כיכר דשא',  capacity: 20, attendees: [
      { id: 'u8',  name: 'אורית כהן',   phone: '050-1112233', joined: 'אתמול' },
      { id: 'u9',  name: 'דנה רוזן',     phone: '052-2223344', joined: 'אתמול' },
      { id: 'u10', name: 'איריס גולן',   phone: '054-3334455', joined: '08:11' },
      { id: 'u11', name: 'הדס טל',       phone: '053-4445566', joined: '09:40' },
      { id: 'u12', name: 'עדי מזרחי',    phone: '050-5556677', joined: '10:15' },
      { id: 'u13', name: 'שני ברק',      phone: '052-6667788', joined: '11:00' },
      { id: 'u14', name: 'מאיה אליהו',   phone: '054-7778899', joined: '12:30' },
      { id: 'u15', name: 'גאיה שלום',    phone: '053-8889900', joined: '13:45' },
      { id: 'u16', name: 'רחלי זיו',     phone: '050-9990011', joined: '14:22' },
      { id: 'u17', name: 'דפנה מור',     phone: '052-0001122', joined: '15:30' },
      { id: 'u18', name: 'ענת לב',       phone: '054-1112233', joined: '16:55' },
      { id: 'u19', name: 'הילה דרור',   phone: '053-2223344', joined: '17:10' },
      { id: 'u20', name: 'טליה נחום',    phone: '050-3334455', joined: '18:05' },
      { id: 'u21', name: 'אור אבני',    phone: '052-4445566', joined: '19:30' },
      { id: 'u22', name: 'עמית קדם',    phone: '054-5556677', joined: '20:45' },
  ] },
  { id: 'c3', type: 'יין לרגיעה',        date: '2026-04-25', time: '20:00', location: 'סטודיו · רחוב הזית 12',  capacity: 10, attendees: [
      { id: 'u23', name: 'אלמוג כהן',    phone: '050-6667788', joined: '07:30' },
      { id: 'u24', name: 'כרמל שור',     phone: '052-7778899', joined: '09:15' },
      { id: 'u25', name: 'נועם לב',      phone: '054-8889900', joined: '11:22' },
  ] },
  { id: 'c4', type: 'שיעור פרטי',         date: '2026-04-25', time: '10:00', location: 'בית הלקוחה',            capacity: 1,  attendees: [
      { id: 'u26', name: 'רעות ברזילי',  phone: '053-1231231', joined: 'לפני שבוע' },
  ] },
  { id: 'c5', type: 'אשטנגה מתקדמים',     date: '2026-04-26', time: '08:00', location: 'סטודיו · רחוב הזית 12',  capacity: 8, attendees: [
      { id: 'u27', name: 'יעל רוזנברג',  phone: '050-9871234', joined: '09:30' },
      { id: 'u28', name: 'ליבי אשכנזי',  phone: '052-8765432', joined: '10:45' },
  ] },
];

const CLASS_TYPES = ['האטה בוקר', 'וויניאסה זרימה', 'יין לרגיעה', 'אשטנגה מתקדמים', 'שיעור פרטי', 'מדיטציה מודרכת', 'יוגה לנשים בהריון'];
const LOCATIONS   = ['סטודיו · רחוב הזית 12', 'הפארק הגדול · כיכר דשא', 'חוף הים · תל ברוך', 'בית הלקוחה', 'מקוון · זום'];

function Dashboard({ onExit }) {
  const [view, setView] = React.useState('overview'); // overview | classes | add | students
  const [classes, setClasses] = React.useState(() => {
    try {
      const saved = localStorage.getItem('yo-classes');
      return saved ? JSON.parse(saved) : DEFAULT_CLASSES;
    } catch { return DEFAULT_CLASSES; }
  });
  const [editingId, setEditingId] = React.useState(null);
  const [rosterId, setRosterId] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  // Persist
  React.useEffect(() => {
    try { localStorage.setItem('yo-classes', JSON.stringify(classes)); } catch {}
  }, [classes]);

  // Simulate live sign-ups: randomly add an attendee to a random upcoming class every ~9s
  React.useEffect(() => {
    const NAMES_POOL = ['רוני אגם', 'מאיה גל', 'ספיר חן', 'נופר קדוש', 'תהילה לב', 'איה ברק', 'ליה דוד', 'אביגיל שמחה', 'נטע בר', 'שקד גור'];
    const t = setInterval(() => {
      setClasses(list => {
        const upcoming = list.filter(c => c.attendees.length < c.capacity);
        if (!upcoming.length) return list;
        const target = upcoming[Math.floor(Math.random() * upcoming.length)];
        const name = NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)];
        const phone = '05' + Math.floor(Math.random() * 10) + '-' + Math.floor(1000000 + Math.random() * 8999999);
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const newUser = { id: 'u' + Date.now(), name, phone, joined: timeStr, isNew: true };
        showToast(`הרשמה חדשה: ${name} · ${target.type}`);
        return list.map(c => c.id === target.id
          ? { ...c, attendees: [...c.attendees, newUser] }
          : c
        );
      });
    }, 9000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // === derived stats ===
  const totalStudents = new Set(classes.flatMap(c => c.attendees.map(a => a.id))).size;
  const totalSignups = classes.reduce((s, c) => s + c.attendees.length, 0);
  const totalCapacity = classes.reduce((s, c) => s + c.capacity, 0);
  const occupancy = totalCapacity ? Math.round((totalSignups / totalCapacity) * 100) : 0;
  const weeklyRevenue = classes.reduce((s, c) => {
    const price = c.type === 'שיעור פרטי' ? 150 : 45;
    return s + c.attendees.length * price;
  }, 0);

  // Heatmap: classes per weekday
  const dayLoad = [0,0,0,0,0,0,0];
  classes.forEach(c => {
    const d = new Date(c.date);
    dayLoad[d.getDay()] += c.attendees.length;
  });

  // Upcoming sorted
  const sorted = [...classes].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  // === mutations ===
  const cancelClass = (id) => {
    if (!confirm('לבטל את השיעור? ההרשמות יבוטלו וישלח עדכון לתלמידות.')) return;
    setClasses(list => list.filter(c => c.id !== id));
    showToast('השיעור בוטל · עדכון נשלח');
  };
  const saveEdit = (id, patch) => {
    setClasses(list => list.map(c => c.id === id ? { ...c, ...patch } : c));
    setEditingId(null);
    showToast('השינויים נשמרו');
  };
  const addClass = (data) => {
    const id = 'c' + Date.now();
    setClasses(list => [...list, { id, attendees: [], ...data }]);
    setView('classes');
    showToast('שיעור חדש נוסף ללוח');
  };
  const removeStudent = (classId, userId) => {
    setClasses(list => list.map(c => c.id === classId
      ? { ...c, attendees: c.attendees.filter(a => a.id !== userId) }
      : c
    ));
    showToast('המשתתפת הוסרה');
  };

  const activeClass = classes.find(c => c.id === rosterId);
  const editingClass = classes.find(c => c.id === editingId);

  return (
    <div className="dash">
      <DashHeader onExit={onExit} />

      <nav className="dash-nav">
        {[
          { id: 'overview', name: 'סקירה',  Icon: IconSpark },
          { id: 'classes',  name: 'שיעורים', Icon: IconCal },
          { id: 'add',      name: 'הוסף',    Icon: IconPlus },
          { id: 'students', name: 'תלמידות', Icon: IconUsers },
        ].map(t => (
          <button key={t.id} className={view === t.id ? 'on' : ''} onClick={() => setView(t.id)}>
            <t.Icon size={15} />
            <span>{t.name}</span>
          </button>
        ))}
      </nav>

      <div className="dash-body">
        {view === 'overview' && (
          <Overview
            stats={{ totalStudents, totalSignups, occupancy, weeklyRevenue, dayLoad }}
            classes={sorted.slice(0, 3)}
            onOpen={() => setView('classes')}
          />
        )}
        {view === 'classes' && (
          <ClassList
            classes={sorted}
            onCancel={cancelClass}
            onEdit={setEditingId}
            onRoster={setRosterId}
          />
        )}
        {view === 'add' && (
          <AddClassForm onAdd={addClass} onCancel={() => setView('classes')} />
        )}
        {view === 'students' && (
          <StudentList classes={classes} />
        )}
      </div>

      {editingClass && (
        <EditClassModal
          cls={editingClass}
          onSave={(patch) => saveEdit(editingClass.id, patch)}
          onClose={() => setEditingId(null)}
        />
      )}
      {activeClass && (
        <RosterModal
          cls={activeClass}
          onRemove={(uid) => removeStudent(activeClass.id, uid)}
          onClose={() => setRosterId(null)}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function DashHeader({ onExit }) {
  return (
    <header className="dash-top">
      <div className="dash-brand">
        <div className="dash-avatar">או</div>
        <div>
          <div className="dash-hello">שלום, אוריאן</div>
          <div className="dash-role">לוח מדריכה · Studio Manager</div>
        </div>
      </div>
      <button className="dash-exit" onClick={onExit} aria-label="יציאה">
        <IconArrow size={16} />
      </button>
    </header>
  );
}

function Overview({ stats, classes, onOpen }) {
  const { totalStudents, totalSignups, occupancy, weeklyRevenue, dayLoad } = stats;
  const days = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
  const maxLoad = Math.max(1, ...dayLoad);

  return (
    <div className="overview">
      <div className="stat-grid">
        <div className="stat card-lg">
          <div className="stat-k">סך הרשמות השבוע</div>
          <div className="stat-v">{totalSignups}</div>
          <div className="stat-delta up">
            <IconTrendUp size={12} /> +12% משבוע שעבר
          </div>
          <div className="mini-chart">
            {[8,12,6,14,9,16,18].map((v,i) => (
              <div key={i} className="bar" style={{ height: (v / 20 * 100) + '%' }} />
            ))}
          </div>
        </div>
        <div className="stat">
          <div className="stat-k">תלמידות פעילות</div>
          <div className="stat-v">{totalStudents}</div>
          <div className="stat-delta up"><IconTrendUp size={12} /> +3 חדשות</div>
        </div>
        <div className="stat">
          <div className="stat-k">תפוסת שיעורים</div>
          <div className="stat-v">{occupancy}<small>%</small></div>
          <div className="ring-prog">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--hair)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="3"
                strokeDasharray={`${occupancy * 0.942} 94.2`}
                transform="rotate(-90 18 18)"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="stat">
          <div className="stat-k">הכנסות השבוע</div>
          <div className="stat-v">₪{weeklyRevenue.toLocaleString('he-IL')}</div>
          <div className="stat-delta up"><IconTrendUp size={12} /> +₪480</div>
        </div>
      </div>

      <div className="dash-section">
        <div className="dash-section-head">
          <h3>עומס שבועי</h3>
          <span className="hint">הרשמות לפי יום</span>
        </div>
        <div className="heatmap">
          {dayLoad.map((v, i) => (
            <div key={i} className="hcol">
              <div className="hbar" style={{ height: Math.max(10, (v / maxLoad * 80)) + 'px', opacity: 0.2 + (v / maxLoad) * 0.8 }} />
              <div className="hlab">{days[i]}</div>
              <div className="hnum">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-section">
        <div className="dash-section-head">
          <h3>השיעורים הקרובים</h3>
          <button className="linkish" onClick={onOpen}>הכל ←</button>
        </div>
        <div className="next-classes">
          {classes.map(c => (
            <div key={c.id} className="next-row">
              <div className="next-time">
                <div className="nt-day">{formatDay(c.date)}</div>
                <div className="nt-time">{c.time}</div>
              </div>
              <div className="next-col">
                <div className="next-type">{c.type}</div>
                <div className="next-loc">{c.location}</div>
              </div>
              <div className={`next-fill ${c.attendees.length >= c.capacity ? 'full' : ''}`}>
                <strong>{c.attendees.length}</strong>/{c.capacity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClassList({ classes, onCancel, onEdit, onRoster }) {
  // Group by date
  const grouped = {};
  classes.forEach(c => { (grouped[c.date] ||= []).push(c); });
  const dates = Object.keys(grouped).sort();

  return (
    <div className="class-list">
      {dates.length === 0 && (
        <div className="empty">אין שיעורים בלוח. הוסיפי את הראשון →</div>
      )}
      {dates.map(d => (
        <div key={d} className="day-group">
          <div className="day-group-head">
            <span className="dgh-day">{formatDay(d)}</span>
            <span className="dgh-date">{formatLongDate(d)}</span>
          </div>
          {grouped[d].map(c => {
            const full = c.attendees.length >= c.capacity;
            const pct = Math.min(100, (c.attendees.length / c.capacity) * 100);
            const hasNew = c.attendees.some(a => a.isNew);
            return (
              <div key={c.id} className={`class-card ${hasNew ? 'pulse' : ''}`}>
                <div className="cc-time">
                  <div className="cct-num">{c.time}</div>
                  <div className="cct-type">{c.type}</div>
                </div>
                <div className="cc-body">
                  <div className="cc-loc"><IconPin size={12} /> {c.location}</div>
                  <div className="cc-progress">
                    <div className="cc-bar"><div className="cc-bar-fill" style={{ width: pct + '%' }} /></div>
                    <div className="cc-count">
                      <strong>{c.attendees.length}</strong>/{c.capacity}
                      {hasNew && <span className="new-pill">חדש</span>}
                    </div>
                  </div>
                </div>
                <div className="cc-actions">
                  <button className="ca" onClick={() => onRoster(c.id)} title="רשימה">
                    <IconUsers size={14} /> רשימה
                  </button>
                  <button className="ca" onClick={() => onEdit(c.id)} title="עריכה">
                    <IconPencil size={14} /> עריכה
                  </button>
                  <button className="ca danger" onClick={() => onCancel(c.id)} title="ביטול">
                    <IconTrash size={14} /> ביטול
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function AddClassForm({ onAdd, onCancel }) {
  const [form, setForm] = React.useState({
    type: CLASS_TYPES[0],
    date: new Date().toISOString().slice(0, 10),
    time: '08:00',
    location: LOCATIONS[0],
    capacity: 12,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <div className="form-title">שיעור חדש</div>
      <div className="form-sub">הוסיפי שיעור ליומן. התלמידות יראו אותו מיד.</div>

      <label className="field">
        <span>סוג השיעור</span>
        <select value={form.type} onChange={e => set('type', e.target.value)}>
          {CLASS_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </label>

      <div className="field-row">
        <label className="field">
          <span>תאריך</span>
          <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
        </label>
        <label className="field">
          <span>שעה</span>
          <input type="time" value={form.time} onChange={e => set('time', e.target.value)} />
        </label>
      </div>

      <label className="field">
        <span>מיקום</span>
        <select value={form.location} onChange={e => set('location', e.target.value)}>
          {LOCATIONS.map(l => <option key={l}>{l}</option>)}
        </select>
      </label>

      <label className="field">
        <span>קיבולת מקסימלית</span>
        <div className="cap-row">
          <button type="button" onClick={() => set('capacity', Math.max(1, form.capacity - 1))}>−</button>
          <div className="cap-val">{form.capacity}</div>
          <button type="button" onClick={() => set('capacity', form.capacity + 1)}>+</button>
        </div>
      </label>

      <div className="form-actions">
        <button type="button" className="ghost" onClick={onCancel}>ביטול</button>
        <button type="submit" className="primary">הוסף לוח שנה</button>
      </div>
    </form>
  );
}

function StudentList({ classes }) {
  // Collect all unique students w/ count
  const map = new Map();
  classes.forEach(c => c.attendees.forEach(a => {
    const cur = map.get(a.id) || { ...a, count: 0, last: c.date };
    cur.count += 1;
    if (c.date > cur.last) cur.last = c.date;
    map.set(a.id, cur);
  }));
  const all = [...map.values()].sort((a, b) => b.count - a.count);

  const [q, setQ] = React.useState('');
  const filtered = q ? all.filter(s => s.name.includes(q) || s.phone.includes(q)) : all;

  return (
    <div className="students">
      <div className="search">
        <IconSearch size={14} />
        <input placeholder="חיפוש תלמידה או טלפון..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="student-stats">
        <div><strong>{all.length}</strong> תלמידות רשומות</div>
        <div><strong>{all.filter(a => a.count >= 3).length}</strong> קבועות</div>
      </div>
      <div className="student-list">
        {filtered.map(s => (
          <div key={s.id} className="student-row">
            <div className="st-avatar">{s.name.slice(0, 1)}</div>
            <div className="st-col">
              <div className="st-name">{s.name}</div>
              <div className="st-phone">{s.phone}</div>
            </div>
            <div className="st-meta">
              <div className="st-count">{s.count}</div>
              <div className="st-count-lbl">שיעורים</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="empty">לא נמצאו תלמידות</div>}
      </div>
    </div>
  );
}

function EditClassModal({ cls, onSave, onClose }) {
  const [form, setForm] = React.useState({
    date: cls.date, time: cls.time, location: cls.location, capacity: cls.capacity, type: cls.type,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>עריכת שיעור</h3>
          <button onClick={onClose} aria-label="סגור">✕</button>
        </div>
        <div className="modal-body">
          <label className="field">
            <span>סוג</span>
            <select value={form.type} onChange={e => set('type', e.target.value)}>
              {CLASS_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </label>
          <div className="field-row">
            <label className="field">
              <span>תאריך</span>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </label>
            <label className="field">
              <span>שעה</span>
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)} />
            </label>
          </div>
          <label className="field">
            <span>מיקום</span>
            <select value={form.location} onChange={e => set('location', e.target.value)}>
              {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              {!LOCATIONS.includes(form.location) && <option>{form.location}</option>}
            </select>
          </label>
          <label className="field">
            <span>קיבולת</span>
            <div className="cap-row">
              <button type="button" onClick={() => set('capacity', Math.max(Math.max(1, cls.attendees.length), form.capacity - 1))}>−</button>
              <div className="cap-val">{form.capacity}</div>
              <button type="button" onClick={() => set('capacity', form.capacity + 1)}>+</button>
            </div>
            {form.capacity < cls.attendees.length && <div className="warn">שימי לב: פחות מכמות הנרשמות הנוכחית ({cls.attendees.length})</div>}
          </label>
        </div>
        <div className="modal-foot">
          <button className="ghost" onClick={onClose}>ביטול</button>
          <button className="primary" onClick={() => onSave(form)}>שמירה</button>
        </div>
      </div>
    </div>
  );
}

function RosterModal({ cls, onRemove, onClose }) {
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>רשימת משתתפות</h3>
          <button onClick={onClose} aria-label="סגור">✕</button>
        </div>
        <div className="roster-meta">
          <div>{cls.type} · {formatDay(cls.date)} · {cls.time}</div>
          <div className="roster-count"><strong>{cls.attendees.length}</strong>/{cls.capacity}</div>
        </div>
        <div className="roster-list">
          {cls.attendees.map((a, idx) => (
            <div key={a.id} className={`roster-row ${a.isNew ? 'new' : ''}`}>
              <div className="ri">{idx + 1}</div>
              <div className="rc">
                <div className="rn">{a.name}</div>
                <div className="rp">{a.phone}</div>
              </div>
              <div className="rj">
                <div className="rj-lbl">נרשמה</div>
                <div className="rj-val">{a.joined}</div>
              </div>
              <button className="ri-rm" onClick={() => onRemove(a.id)} aria-label="הסר">✕</button>
            </div>
          ))}
          {cls.attendees.length === 0 && <div className="empty">עדיין אין נרשמות</div>}
        </div>
      </div>
    </div>
  );
}

function formatDay(dateStr) {
  const d = new Date(dateStr);
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  return days[d.getDay()];
}
function formatLongDate(dateStr) {
  const d = new Date(dateStr);
  const m = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  return `${d.getDate()} ${m[d.getMonth()]}`;
}

// Additional icons
const IconPlus   = (p) => <Icon {...p}><path d="M12 5 V19"/><path d="M5 12 H19"/></Icon>;
const IconPencil = (p) => <Icon {...p}><path d="M4 20 L4 16 L16 4 L20 8 L8 20 Z"/><path d="M14 6 L18 10"/></Icon>;
const IconTrash  = (p) => <Icon {...p}><path d="M5 7 H19"/><path d="M10 7 V4 H14 V7"/><path d="M7 7 L8 20 H16 L17 7"/></Icon>;
const IconPin    = (p) => <Icon {...p}><path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z"/><circle cx="12" cy="9" r="2.5"/></Icon>;
const IconTrendUp= (p) => <Icon {...p}><path d="M3 17 L9 11 L13 15 L21 7"/><path d="M15 7 H21 V13"/></Icon>;
const IconSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M16 16 L21 21"/></Icon>;

Object.assign(window, { Dashboard, IconPlus, IconPencil, IconTrash, IconPin, IconTrendUp, IconSearch });
