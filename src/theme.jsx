// Theme management — persisted, applied via data-theme on <html>
const THEMES = [
  { id: 'earth',    name: 'אדמה',   swatches: ['#B9552E', '#7A8B6B', '#EFD9C4'] },
  { id: 'ocean',    name: 'ים',     swatches: ['#2E6F8E', '#6A9BA8', '#CFE0E7'] },
  { id: 'forest',   name: 'יער',    swatches: ['#3E6B3A', '#8A9A5B', '#D6E0CD'] },
  { id: 'twilight', name: 'דמדומים', swatches: ['#5A4A8A', '#8B6E93', '#DAD1E5'] },
];

function applyTheme(id) {
  document.documentElement.setAttribute('data-theme', id);
}

Object.assign(window, { THEMES, applyTheme });
