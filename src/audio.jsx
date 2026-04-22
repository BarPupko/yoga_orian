// Handpan ambient synth — Web Audio API
// Hang drum / handpan frequencies in D minor (classic "D Kurd" scaling)
// Notes: D3, A3, Bb3, C4, D4, E4, F4, G4, A4

const HANDPAN_NOTES = [146.83, 220.00, 233.08, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];

class HandpanEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.timer = null;
    this.playing = false;
    this._muted = false;
  }
  _init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;

    // gentle reverb via convolver w/ synthetic IR
    const conv = this.ctx.createConvolver();
    conv.buffer = this._makeIR(3.2, 2.6);
    const rev = this.ctx.createGain();
    rev.gain.value = 0.55;
    const dry = this.ctx.createGain();
    dry.gain.value = 0.65;

    this.master.connect(dry);
    this.master.connect(conv);
    conv.connect(rev);
    dry.connect(this.ctx.destination);
    rev.connect(this.ctx.destination);
  }
  _makeIR(duration, decay) {
    const rate = this.ctx.sampleRate;
    const len = Math.floor(rate * duration);
    const buf = this.ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const data = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }
  _pluck(freq, when, vel = 0.5) {
    const ctx = this.ctx;
    // Two-oscillator "bell-like" tone with short attack + long decay
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vel, when + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0005, when + 3.8);

    const o1 = ctx.createOscillator();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(freq, when);

    const o2 = ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.setValueAtTime(freq * 2.01, when);
    const g2 = ctx.createGain();
    g2.gain.value = 0.3;

    // subtle detune for warmth
    const o3 = ctx.createOscillator();
    o3.type = 'triangle';
    o3.frequency.setValueAtTime(freq * 0.5, when);
    const g3 = ctx.createGain();
    g3.gain.value = 0.15;

    // low-pass filter for softness
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(2400, when);
    lp.Q.value = 0.8;

    o1.connect(g);
    o2.connect(g2); g2.connect(g);
    o3.connect(g3); g3.connect(g);
    g.connect(lp);
    lp.connect(this.master);

    o1.start(when); o1.stop(when + 4);
    o2.start(when); o2.stop(when + 4);
    o3.start(when); o3.stop(when + 4);
  }
  async play() {
    this._init();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    if (this.playing) return;
    this.playing = true;

    // Fade master in
    const t0 = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t0);
    this.master.gain.setValueAtTime(this.master.gain.value, t0);
    this.master.gain.linearRampToValueAtTime(this._muted ? 0 : 0.22, t0 + 1.5);

    const schedule = () => {
      if (!this.playing) return;
      const now = this.ctx.currentTime;
      // Schedule 2-3 notes over the next ~6-9 seconds
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const delay = i * (2 + Math.random() * 1.5);
        const note = HANDPAN_NOTES[Math.floor(Math.random() * HANDPAN_NOTES.length)];
        const vel = 0.25 + Math.random() * 0.35;
        this._pluck(note, now + delay, vel);
      }
      this.timer = setTimeout(schedule, (count * 2.2 + 1) * 1000);
    };
    schedule();
  }
  pause() {
    if (!this.ctx) return;
    this.playing = false;
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(0, t + 1.2);
  }
  setMuted(m) {
    this._muted = m;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.linearRampToValueAtTime(m ? 0 : 0.22, t + 0.5);
  }
  // Play a pleasant resolution chord
  bell(duration = 2) {
    this._init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    [293.66, 349.23, 440.00].forEach((f, i) => {
      this._pluck(f, now + i * 0.18, 0.4);
    });
  }
}

// Pronounce Sanskrit via Web Speech API with sensible fallbacks
function speakSanskrit(text, opts = {}) {
  if (!('speechSynthesis' in window)) return Promise.resolve();
  return new Promise((resolve) => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = opts.rate ?? 0.78;
      u.pitch = opts.pitch ?? 1.0;
      u.volume = 1.0;
      // Try Indian English, Hindi, then any English voice for Sanskrit approximations
      const voices = window.speechSynthesis.getVoices();
      const pick =
        voices.find(v => /en-IN/i.test(v.lang)) ||
        voices.find(v => /hi-IN/i.test(v.lang)) ||
        voices.find(v => /sa-IN/i.test(v.lang)) ||
        voices.find(v => /en-(US|GB)/i.test(v.lang)) ||
        voices[0];
      if (pick) u.voice = pick;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    } catch (e) { resolve(); }
  });
}

Object.assign(window, { HandpanEngine, speakSanskrit });
