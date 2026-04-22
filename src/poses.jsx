// Yoga poses — anime-style soft figure illustrations with breathing animation
// Each pose is an SVG with rounded body forms (head with hair suggestion, torso,
// flowing limbs) rather than stick figures. The `.pose-art` container applies
// a gentle breathing sway animation via CSS.

// Shared style note: use filled body shapes (skin tone + accent) and let CSS
// override colors when the card is in "speaking" state.

const POSES = [
  {
    id: 'mountain', he: 'תנוחת ההר', sa: 'Tadasana', saSpoken: 'Tah-dah-sana', cat: 'עמידה', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* hair back */}
        <path className="hair" d="M40 12 Q36 20 38 32 Q42 26 50 24 Q58 26 62 32 Q64 20 60 12 Q50 8 40 12 Z"/>
        {/* head */}
        <circle className="skin" cx="50" cy="20" r="7"/>
        {/* neck + torso (triangular tank shape) */}
        <path className="body" d="M46 27 Q46 30 44 34 Q38 42 40 58 L60 58 Q62 42 56 34 Q54 30 54 27 Q50 30 46 27 Z"/>
        {/* arms at sides, palms forward */}
        <path className="limb" d="M40 36 Q34 44 34 56 Q34 60 38 60"/>
        <path className="limb" d="M60 36 Q66 44 66 56 Q66 60 62 60"/>
        {/* legs */}
        <path className="limb" d="M45 58 Q43 72 44 88 L48 88 Q49 72 49 60"/>
        <path className="limb" d="M55 58 Q57 72 56 88 L52 88 Q51 72 51 60"/>
      </svg>
    )
  },
  {
    id: 'tree', he: 'תנוחת העץ', sa: 'Vrikshasana', saSpoken: 'Vrik-shah-sana', cat: 'שיווי משקל', level: 'בינוני',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        <path className="hair" d="M40 14 Q34 22 38 34 Q44 30 50 28 Q56 30 62 34 Q66 22 60 14 Q50 9 40 14 Z"/>
        <circle className="skin" cx="50" cy="22" r="6"/>
        {/* arms up in namaste */}
        <path className="limb" d="M46 27 Q40 18 44 8"/>
        <path className="limb" d="M54 27 Q60 18 56 8"/>
        <path className="skin" d="M46 8 Q50 12 54 8 Q52 5 50 5 Q48 5 46 8 Z"/>
        {/* torso */}
        <path className="body" d="M44 28 Q42 38 44 54 L56 54 Q58 38 56 28 Q50 31 44 28 Z"/>
        {/* standing leg */}
        <path className="limb" d="M50 54 Q50 70 50 88 L54 88 Q54 70 54 56"/>
        {/* bent leg, foot pressed to thigh */}
        <path className="limb" d="M48 56 Q38 64 42 74 Q50 70 52 58"/>
      </svg>
    )
  },
  {
    id: 'downdog', he: 'הכלב הצופה מטה', sa: 'Adho Mukha Svanasana', saSpoken: 'Ad-ho Moo-kha Shvah-nah-sana', cat: 'הפוך', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* inverted V with head hanging down */}
        <path className="body" d="M10 86 Q18 76 32 58 Q48 38 68 34 Q82 38 90 86" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
        {/* head hanging */}
        <path className="hair" d="M26 60 Q20 66 22 74 Q28 72 32 68 Q34 60 30 56 Q26 56 26 60 Z"/>
        <circle className="skin" cx="28" cy="66" r="5"/>
        {/* arms forward */}
        <path className="limb" d="M18 82 Q22 72 32 60"/>
        {/* legs back */}
        <path className="limb" d="M82 82 Q78 72 66 58"/>
      </svg>
    )
  },
  {
    id: 'warrior2', he: 'הלוחם השני', sa: 'Virabhadrasana II', saSpoken: 'Veer-ah-bah-drah-sana dvee', cat: 'עמידה', level: 'בינוני',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        <path className="hair" d="M42 14 Q36 22 40 32 Q46 28 50 26 Q54 28 60 32 Q64 22 58 14 Q50 10 42 14 Z"/>
        <circle className="skin" cx="50" cy="22" r="6"/>
        {/* arms outstretched */}
        <path className="limb" d="M44 32 L16 38 Q12 38 12 40"/>
        <path className="limb" d="M56 32 L84 38 Q88 38 88 40"/>
        {/* torso wide base */}
        <path className="body" d="M44 28 Q42 42 44 56 L56 56 Q58 42 56 28 Q50 31 44 28 Z"/>
        {/* front leg bent */}
        <path className="limb" d="M52 56 Q60 70 70 88"/>
        {/* back leg extended */}
        <path className="limb" d="M48 56 Q38 72 26 90"/>
      </svg>
    )
  },
  {
    id: 'child', he: 'תנוחת הילד', sa: 'Balasana', saSpoken: 'Bah-lah-sana', cat: 'מנוחה', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* curled body */}
        <path className="body" d="M16 84 Q18 60 40 56 Q62 54 78 64 Q82 70 80 80 L80 84 Z"/>
        {/* head resting forward */}
        <path className="hair" d="M72 60 Q80 62 84 70 Q82 76 74 74 Q70 68 72 60 Z"/>
        <circle className="skin" cx="76" cy="68" r="5"/>
        {/* extended arms */}
        <path className="limb" d="M24 78 Q18 74 12 76"/>
        <path className="limb" d="M34 74 Q28 72 22 72"/>
      </svg>
    )
  },
  {
    id: 'cobra', he: 'תנוחת הקוברה', sa: 'Bhujangasana', saSpoken: 'Boo-jahn-gah-sana', cat: 'פתיחת לב', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* chest lifted, legs along floor */}
        <path className="body" d="M20 44 Q18 54 28 60 Q46 66 64 72 Q82 76 88 78 L88 84 Q60 80 32 72 Q20 66 20 56 Z"/>
        <path className="hair" d="M14 36 Q10 42 12 50 Q18 48 24 46 Q24 40 20 36 Q16 34 14 36 Z"/>
        <circle className="skin" cx="18" cy="44" r="5"/>
        {/* arms supporting */}
        <path className="limb" d="M24 54 Q22 66 24 78"/>
        <path className="limb" d="M38 60 Q38 70 40 80"/>
      </svg>
    )
  },
  {
    id: 'lotus', he: 'תנוחת הלוטוס', sa: 'Padmasana', saSpoken: 'Pahd-mah-sana', cat: 'מדיטציה', level: 'מתקדם',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        <path className="hair" d="M40 12 Q34 22 38 34 Q44 28 50 26 Q56 28 62 34 Q66 22 60 12 Q50 8 40 12 Z"/>
        <circle className="skin" cx="50" cy="22" r="6"/>
        {/* torso */}
        <path className="body" d="M44 28 Q42 40 44 54 L56 54 Q58 40 56 28 Q50 31 44 28 Z"/>
        {/* crossed legs — soft rounded base */}
        <path className="body" d="M20 78 Q20 62 40 58 Q50 56 60 58 Q80 62 80 78 Q80 88 50 88 Q20 88 20 78 Z"/>
        {/* hands on knees */}
        <path className="limb" d="M40 44 Q28 54 24 68"/>
        <path className="limb" d="M60 44 Q72 54 76 68"/>
      </svg>
    )
  },
  {
    id: 'bridge', he: 'תנוחת הגשר', sa: 'Setu Bandhasana', saSpoken: 'Seh-too Bahn-dah-sana', cat: 'פתיחת לב', level: 'בינוני',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* arched body */}
        <path className="body" d="M8 74 Q12 68 18 68 Q28 38 52 32 Q76 34 86 56 Q88 66 86 78" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
        <path className="hair" d="M10 72 Q4 78 8 84 Q14 84 16 78 Q16 74 14 72 Q12 70 10 72 Z"/>
        <circle className="skin" cx="11" cy="76" r="4"/>
        {/* feet planted */}
        <path className="limb" d="M86 76 Q90 82 84 86 L82 86"/>
      </svg>
    )
  },
  {
    id: 'corpse', he: 'תנוחת הגופה', sa: 'Shavasana', saSpoken: 'Sha-vah-sana', cat: 'מנוחה', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* lying flat */}
        <path className="hair" d="M10 46 Q6 54 10 60 Q16 58 20 54 Q18 46 14 44 Q12 44 10 46 Z"/>
        <circle className="skin" cx="15" cy="52" r="5"/>
        <path className="body" d="M20 48 Q40 46 62 48 Q82 50 88 54 Q88 58 82 58 Q60 56 40 58 Q22 56 20 56 Z"/>
        {/* relaxed arms */}
        <path className="limb" d="M34 56 Q30 66 26 68"/>
        <path className="limb" d="M54 56 Q52 64 48 66"/>
        {/* feet splayed */}
        <path className="limb" d="M86 54 Q92 48 92 52"/>
        <path className="limb" d="M86 56 Q92 60 92 56"/>
      </svg>
    )
  },
  {
    id: 'triangle', he: 'תנוחת המשולש', sa: 'Trikonasana', saSpoken: 'Tri-ko-nah-sana', cat: 'עמידה', level: 'בינוני',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        <path className="hair" d="M24 24 Q18 32 22 42 Q28 38 32 36 Q36 26 30 22 Q26 20 24 24 Z"/>
        <circle className="skin" cx="27" cy="32" r="5"/>
        {/* tilted torso */}
        <path className="body" d="M30 36 Q40 44 56 58 L62 52 Q46 40 34 32 Q32 32 30 36 Z"/>
        {/* top arm up */}
        <path className="limb" d="M54 46 Q60 28 66 12"/>
        {/* bottom arm down to floor */}
        <path className="limb" d="M48 52 Q44 62 42 72"/>
        {/* spread legs */}
        <path className="limb" d="M58 56 Q74 74 90 88"/>
        <path className="limb" d="M56 60 Q40 80 24 90"/>
      </svg>
    )
  },
  {
    id: 'chair', he: 'תנוחת הכיסא', sa: 'Utkatasana', saSpoken: 'Oot-kah-tah-sana', cat: 'עמידה', level: 'בינוני',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        <path className="hair" d="M40 14 Q34 22 38 32 Q44 28 50 26 Q56 28 62 32 Q66 22 60 14 Q50 10 40 14 Z"/>
        <circle className="skin" cx="50" cy="22" r="6"/>
        {/* arms overhead */}
        <path className="limb" d="M46 30 Q38 18 32 8"/>
        <path className="limb" d="M54 30 Q62 18 68 8"/>
        {/* torso leaning slightly forward */}
        <path className="body" d="M44 30 Q40 42 42 54 L58 54 Q60 42 56 30 Q50 33 44 30 Z"/>
        {/* bent legs (sitting) */}
        <path className="limb" d="M44 54 Q32 66 36 80 L36 90"/>
        <path className="limb" d="M56 54 Q68 66 64 80 L64 90"/>
      </svg>
    )
  },
  {
    id: 'cat', he: 'החתול והפרה', sa: 'Marjaryasana', saSpoken: 'Mar-jahr-yah-sana', cat: 'עמוד שדרה', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* arched back on all fours */}
        <path className="body" d="M18 62 Q30 40 54 42 Q78 46 86 60 Q88 70 82 72 Q60 56 40 58 Q22 64 22 72 Q18 72 18 62 Z"/>
        <path className="hair" d="M12 58 Q6 64 10 72 Q16 70 20 64 Q20 58 16 56 Q14 56 12 58 Z"/>
        <circle className="skin" cx="15" cy="62" r="5"/>
        {/* arms and legs */}
        <path className="limb" d="M24 68 Q24 80 26 90"/>
        <path className="limb" d="M40 62 Q40 80 42 90"/>
        <path className="limb" d="M74 66 Q76 80 78 90"/>
      </svg>
    )
  },
  {
    id: 'pigeon', he: 'תנוחת היונה', sa: 'Eka Pada Rajakapotasana', saSpoken: 'Eh-kah Pah-dah Rah-jah-kah-po-tah-sana', cat: 'פתיחת ירכיים', level: 'מתקדם',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* torso upright, one leg forward bent, one back */}
        <path className="hair" d="M38 16 Q32 24 36 34 Q42 30 46 28 Q50 20 46 16 Q42 14 38 16 Z"/>
        <circle className="skin" cx="42" cy="24" r="5"/>
        <path className="body" d="M38 30 Q34 44 38 58 L56 60 Q64 46 62 34 Q50 34 38 30 Z"/>
        {/* front leg bent horizontally */}
        <path className="body" d="M28 72 Q38 66 54 66 Q68 68 74 74 Q74 80 64 80 Q46 78 32 80 Q26 78 28 72 Z"/>
        {/* back leg extended */}
        <path className="limb" d="M56 62 Q72 74 92 86"/>
        {/* arm up */}
        <path className="limb" d="M40 36 Q26 24 20 10"/>
      </svg>
    )
  },
  {
    id: 'cobbler', he: 'תנוחת הסנדלר', sa: 'Baddha Konasana', saSpoken: 'Bahd-dah Ko-nah-sana', cat: 'פתיחת ירכיים', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        <path className="hair" d="M40 14 Q34 22 38 32 Q44 28 50 26 Q56 28 62 32 Q66 22 60 14 Q50 10 40 14 Z"/>
        <circle className="skin" cx="50" cy="22" r="6"/>
        <path className="body" d="M44 28 Q42 40 44 54 L56 54 Q58 40 56 28 Q50 31 44 28 Z"/>
        {/* diamond legs — butterfly */}
        <path className="body" d="M14 78 Q22 60 48 58 Q58 58 58 68 Q40 74 26 82 Q18 84 14 78 Z"/>
        <path className="body" d="M86 78 Q78 60 52 58 Q42 58 42 68 Q60 74 74 82 Q82 84 86 78 Z"/>
        {/* hands on feet */}
        <path className="limb" d="M44 42 Q42 58 48 66"/>
        <path className="limb" d="M56 42 Q58 58 52 66"/>
      </svg>
    )
  },
  {
    id: 'boat', he: 'תנוחת הסירה', sa: 'Navasana', saSpoken: 'Nah-vah-sana', cat: 'ליבה', level: 'בינוני',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* V-shape with legs and torso raised */}
        <path className="hair" d="M16 44 Q10 52 14 60 Q20 56 24 54 Q24 46 20 42 Q16 42 16 44 Z"/>
        <circle className="skin" cx="20" cy="50" r="5"/>
        {/* torso */}
        <path className="body" d="M22 54 Q32 62 46 70 L52 62 Q36 54 26 48 Q22 50 22 54 Z"/>
        {/* legs up */}
        <path className="body" d="M44 70 Q60 58 80 44 L86 50 Q66 66 48 76 Q44 74 44 70 Z"/>
        {/* arms reaching */}
        <path className="limb" d="M28 58 Q38 64 48 60"/>
        <path className="limb" d="M34 64 Q44 70 52 68"/>
      </svg>
    )
  },
  {
    id: 'halfmoon', he: 'תנוחת חצי הירח', sa: 'Ardha Chandrasana', saSpoken: 'Ar-dhah Chan-drah-sana', cat: 'שיווי משקל', level: 'מתקדם',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* horizontal balance */}
        <path className="hair" d="M14 42 Q8 48 10 56 Q18 54 22 50 Q22 44 18 40 Q14 40 14 42 Z"/>
        <circle className="skin" cx="18" cy="46" r="5"/>
        <path className="body" d="M22 48 Q42 42 64 44 Q80 46 86 50 L84 56 Q64 54 44 54 Q26 54 22 54 Z"/>
        {/* top arm up */}
        <path className="limb" d="M54 46 Q58 30 62 14"/>
        {/* bottom arm to floor */}
        <path className="limb" d="M36 52 Q30 66 28 80"/>
        {/* lifted leg */}
        <path className="limb" d="M80 50 Q88 44 96 42"/>
        {/* standing leg */}
        <path className="limb" d="M70 54 Q72 72 72 88"/>
      </svg>
    )
  },
  {
    id: 'wheel', he: 'תנוחת הגלגל', sa: 'Chakrasana', saSpoken: 'Chah-krah-sana', cat: 'פתיחת לב', level: 'מתקדם',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* full backbend */}
        <path className="body" d="M10 84 Q14 76 22 72 Q22 40 50 28 Q78 40 78 72 Q86 76 90 84" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
        <path className="hair" d="M18 68 Q14 78 20 82 Q26 80 26 72 Q24 66 20 66 Q18 66 18 68 Z"/>
        <circle className="skin" cx="22" cy="74" r="4"/>
      </svg>
    )
  },
  {
    id: 'crow', he: 'תנוחת העורב', sa: 'Bakasana', saSpoken: 'Bah-kah-sana', cat: 'זרועות', level: 'מתקדם',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* arm balance — body tucked over arms */}
        <path className="body" d="M30 50 Q40 38 56 38 Q72 42 76 52 Q78 62 68 66 Q54 66 40 64 Q28 60 30 50 Z"/>
        <path className="hair" d="M68 38 Q74 32 78 38 Q76 44 70 44 Q68 42 68 38 Z"/>
        <circle className="skin" cx="74" cy="40" r="4"/>
        {/* tucked knees */}
        <path className="body" d="M32 58 Q20 56 16 50 Q14 44 18 40 Q26 42 34 48"/>
        {/* arms pressing down */}
        <path className="limb" d="M36 64 Q32 76 30 86"/>
        <path className="limb" d="M58 66 Q56 78 54 86"/>
      </svg>
    )
  },
  {
    id: 'camel', he: 'תנוחת הגמל', sa: 'Ustrasana', saSpoken: 'Oosh-trah-sana', cat: 'פתיחת לב', level: 'בינוני',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* kneeling backbend */}
        <path className="body" d="M40 88 Q34 74 38 58 Q42 42 56 38 Q70 36 74 48 Q70 60 60 60 Q52 62 48 74 Q48 86 56 90"/>
        <path className="hair" d="M66 34 Q74 32 78 40 Q74 46 68 46 Q64 42 66 34 Z"/>
        <circle className="skin" cx="72" cy="38" r="5"/>
        {/* arms reaching back to heels */}
        <path className="limb" d="M62 48 Q58 72 60 90"/>
      </svg>
    )
  },
  {
    id: 'dancer', he: 'תנוחת הרקדנית', sa: 'Natarajasana', saSpoken: 'Nah-tah-rah-jah-sana', cat: 'שיווי משקל', level: 'מתקדם',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        <path className="hair" d="M34 16 Q28 24 32 34 Q38 30 42 28 Q46 20 42 16 Q38 14 34 16 Z"/>
        <circle className="skin" cx="38" cy="24" r="5"/>
        {/* torso leaning */}
        <path className="body" d="M34 30 Q30 44 38 56 L50 54 Q54 44 48 32 Q42 32 34 30 Z"/>
        {/* front arm reaching */}
        <path className="limb" d="M36 36 Q26 22 14 14"/>
        {/* back arm holding foot */}
        <path className="limb" d="M48 40 Q62 46 74 40"/>
        {/* standing leg */}
        <path className="limb" d="M44 56 Q46 72 48 88"/>
        {/* lifted back leg */}
        <path className="limb" d="M48 54 Q66 46 78 42 Q74 34 68 32"/>
      </svg>
    )
  },
  {
    id: 'plank', he: 'תנוחת הקרש', sa: 'Kumbhakasana', saSpoken: 'Koom-bah-kah-sana', cat: 'ליבה', level: 'בסיס',
    art: (
      <svg viewBox="0 0 100 100" className="pose-svg anime" preserveAspectRatio="xMidYMid meet">
        {/* straight diagonal */}
        <path className="body" d="M14 58 Q30 52 52 50 Q74 50 86 56 L86 64 Q66 58 44 60 Q26 62 14 66 Z"/>
        <path className="hair" d="M12 54 Q6 60 10 68 Q16 66 20 62 Q20 56 16 52 Q12 52 12 54 Z"/>
        <circle className="skin" cx="16" cy="58" r="5"/>
        {/* straight arms */}
        <path className="limb" d="M18 64 Q18 78 20 88"/>
        <path className="limb" d="M30 64 Q30 78 32 88"/>
        {/* straight legs */}
        <path className="limb" d="M82 60 Q86 74 90 86"/>
      </svg>
    )
  },
];

const POSE_CATS = ['הכול', 'עמידה', 'שיווי משקל', 'הפוך', 'פתיחת לב', 'מדיטציה', 'עמוד שדרה', 'מנוחה', 'פתיחת ירכיים', 'ליבה', 'זרועות'];

Object.assign(window, { POSES, POSE_CATS });
