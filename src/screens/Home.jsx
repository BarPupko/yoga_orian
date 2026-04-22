// Home / Landing
function Home({ go, theme }) {
  const hour = new Date().getHours();
  const greet = hour < 6 ? 'לילה שקט' : hour < 12 ? 'בוקר טוב' : hour < 18 ? 'אחר צהריים טובים' : 'ערב טוב';

  return (
    <div className="screen">
      <div className="topbar">
        <div className="brand">
          <span className="dot"></span>
          <span>יוגה · אוריאן</span>
        </div>
        <div className="greet">{greet}</div>
      </div>

      <section className="home-hero">
        <div className="orb" />
        <div className="orb b" />
        <div className="eyebrow">נשימה · תנועה · שקט</div>
        <h1>
          יוגה<br/>
          <span className="accent">עם אוריאן</span>
        </h1>
        <div className="tagline">
          מרחב שקט לחזור אל הגוף, אל הנשימה, אל עצמך.
        </div>
        <div className="mantra">
          <span>ॐ</span>
          <span>sat · chit · ananda</span>
        </div>
        <div className="sig">— אוריאן</div>
      </section>

      <div className="today-card">
        <div className="tnum">07</div>
        <div className="tcol">
          <div className="tlabel">התרגול של היום</div>
          <div className="tname">זרימת בוקר רכה</div>
          <div className="tmeta">25 דקות · מתחילים</div>
        </div>
        <button className="tgo" onClick={() => go('meditation')} aria-label="התחל">
          <IconArrow size={18} />
        </button>
      </div>

      <div className="section-title">
        <h2>המרחב שלך</h2>
        <div className="rule" />
        <span className="more">4 אזורים</span>
      </div>

      <div className="quick-grid">
        <button className="quick feature" onClick={() => go('booking')}>
          <div className="deco" />
          <div className="deco b" />
          <div className="qi"><IconCal size={18} /></div>
          <div className="qt">קביעת שיעור</div>
          <div className="qs">זמנים פנויים השבוע · פרטי או קבוצתי</div>
        </button>

        <button className="quick" onClick={() => go('library')}>
          <div className="qi"><IconLib size={18} /></div>
          <div className="qt">אסנות</div>
          <div className="qs">ספריית תנוחות עם שמות בסנסקריט</div>
        </button>

        <button className="quick" onClick={() => go('meditation')}>
          <div className="qi"><IconMedi size={18} /></div>
          <div className="qt">מדיטציה</div>
          <div className="qs">טיימר שקט עם צלילי הנדפאן</div>
        </button>
      </div>
    </div>
  );
}

window.Home = Home;
