// Minimal stroke icons — line-only, no fills
const Icon = ({ d, size = 20, stroke = 'currentColor', fill = 'none', children, vb = '0 0 24 24' }) => (
  <svg width={size} height={size} viewBox={vb} fill={fill} stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

const IconHome = (p) => <Icon {...p}><path d="M4 11 L12 4 L20 11 V20 H4 Z" /><path d="M10 20 V14 H14 V20" /></Icon>;
const IconCal  = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9 H21"/><path d="M8 3 V7"/><path d="M16 3 V7"/></Icon>;
const IconLib  = (p) => <Icon {...p}><circle cx="12" cy="8" r="3"/><path d="M6 20 C6 15 8 13 12 13 C16 13 18 15 18 20"/></Icon>;
const IconMedi = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></Icon>;
const IconPlay = (p) => <Icon {...p}><path d="M7 5 L19 12 L7 19 Z" fill="currentColor"/></Icon>;
const IconPause= (p) => <Icon {...p}><rect x="7" y="5" width="4" height="14" fill="currentColor"/><rect x="13" y="5" width="4" height="14" fill="currentColor"/></Icon>;
const IconBack = (p) => <Icon {...p}><path d="M7 5 L7 19"/><path d="M19 5 L9 12 L19 19 Z" fill="currentColor"/></Icon>;
const IconSound= (p) => <Icon {...p}><path d="M5 10 V14 H8 L12 17 V7 L8 10 Z"/><path d="M15 9 C16.5 10.5 16.5 13.5 15 15"/><path d="M17.5 7 C20 9.5 20 14.5 17.5 17"/></Icon>;
const IconMute = (p) => <Icon {...p}><path d="M5 10 V14 H8 L12 17 V7 L8 10 Z"/><path d="M16 10 L20 14 M20 10 L16 14"/></Icon>;
const IconArrow= (p) => <Icon {...p}><path d="M9 6 L15 12 L9 18"/></Icon>;
const IconArrowR= (p) => <Icon {...p}><path d="M15 6 L9 12 L15 18"/></Icon>;
const IconSpark= (p) => <Icon {...p}><path d="M12 3 V8"/><path d="M12 16 V21"/><path d="M3 12 H8"/><path d="M16 12 H21"/><path d="M6 6 L9 9"/><path d="M15 15 L18 18"/><path d="M18 6 L15 9"/><path d="M9 15 L6 18"/></Icon>;
const IconLeaf = (p) => <Icon {...p}><path d="M5 19 C5 11 11 5 19 5 C19 13 13 19 5 19 Z"/><path d="M5 19 L14 10"/></Icon>;
const IconClock= (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7 V12 L15 14"/></Icon>;
const IconCheck= (p) => <Icon {...p}><path d="M5 12 L10 17 L19 8"/></Icon>;
const IconUser = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21 C4 16 8 14 12 14 C16 14 20 16 20 21"/></Icon>;
const IconUsers= (p) => <Icon {...p}><circle cx="9" cy="8" r="3.5"/><path d="M3 20 C3 16 5.5 14 9 14 C12.5 14 15 16 15 20"/><path d="M15.5 14 C18 14 21 16 21 20"/><circle cx="17" cy="7" r="2.5"/></Icon>;

Object.assign(window, {
  Icon, IconHome, IconCal, IconLib, IconMedi, IconPlay, IconPause, IconBack,
  IconSound, IconMute, IconArrow, IconArrowR, IconSpark, IconLeaf, IconClock,
  IconCheck, IconUser, IconUsers,
});
