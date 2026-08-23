/**
 * Web Audio API synthesizer for playful, romantic sound effects and background ambient melody.
 */

let audioCtx: AudioContext | null = null;
let bgMusicInterval: number | null = null;
let isMusicPlaying = false;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuteState(muted: boolean) {
  isMuted = muted;
  if (muted && isMusicPlaying) {
    stopBackgroundMusic();
  }
}

export function getMuteState(): boolean {
  return isMuted;
}

/** Confetti pop celebration sound */
export function playConfettiPop() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Pop burst
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.13);

  // Sparkle chime sequence
  const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  freqs.forEach((freq, i) => {
    const sOsc = ctx.createOscillator();
    const sGain = ctx.createGain();
    sOsc.type = 'triangle';
    sOsc.frequency.setValueAtTime(freq, now + 0.05 + i * 0.05);

    sGain.gain.setValueAtTime(0.12 - i * 0.015, now + 0.05 + i * 0.05);
    sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25 + i * 0.05);

    sOsc.connect(sGain);
    sGain.connect(ctx.destination);
    sOsc.start(now + 0.05 + i * 0.05);
    sOsc.stop(now + 0.3 + i * 0.05);
  });
}

/** Cute music box chime for card clicks & unlocks */
export function playChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [587.33, 739.99, 880.00, 1174.66]; // D, F#, A, D5 (warm major chord)

  freqs.forEach((f, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now + index * 0.06);

    gain.gain.setValueAtTime(0.15, now + index * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + index * 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + index * 0.06);
    osc.stop(now + 0.45 + index * 0.06);
  });
}

/** Soft extinguish whoosh & chime when blowing candle */
export function playBlowCandleSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Soft whoosh (noise approximation with low sine decay)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.26);

  // Sparkle tone
  const sOsc = ctx.createOscillator();
  const sGain = ctx.createGain();
  sOsc.type = 'sine';
  sOsc.frequency.setValueAtTime(987.77, now + 0.1);
  sGain.gain.setValueAtTime(0.1, now + 0.1);
  sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  sOsc.connect(sGain);
  sGain.connect(ctx.destination);
  sOsc.start(now + 0.1);
  sOsc.stop(now + 0.52);
}

/** Tactile coupon stamp / redeem sound */
export function playStampSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Thump
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.16);

  // Cheerful chime
  setTimeout(() => {
    playChime();
  }, 100);
}

/** Cheerful "Happy Birthday" arpeggio melody */
export function playBirthdayMelody() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Notes for "Happy Birthday to you..." in C Major
  // G4, G4, A4, G4, C5, B4
  const notes = [
    { freq: 392.00, dur: 0.25, delay: 0 },
    { freq: 392.00, dur: 0.25, delay: 0.28 },
    { freq: 440.00, dur: 0.5, delay: 0.56 },
    { freq: 392.00, dur: 0.5, delay: 1.1 },
    { freq: 523.25, dur: 0.5, delay: 1.65 },
    { freq: 493.88, dur: 0.9, delay: 2.2 },
    // G4, G4, A4, G4, D5, C5
    { freq: 392.00, dur: 0.25, delay: 3.2 },
    { freq: 392.00, dur: 0.25, delay: 3.48 },
    { freq: 440.00, dur: 0.5, delay: 3.76 },
    { freq: 392.00, dur: 0.5, delay: 4.3 },
    { freq: 587.33, dur: 0.5, delay: 4.85 },
    { freq: 523.25, dur: 1.0, delay: 5.4 },
  ];

  const now = ctx.currentTime;
  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, now + note.delay);

    gain.gain.setValueAtTime(0.18, now + note.delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.delay + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.delay);
    osc.stop(now + note.delay + note.dur + 0.05);
  });
}

/** Sweet gentle romantic background music loop */
export function toggleBackgroundMusic(onStateChange?: (playing: boolean) => void): boolean {
  if (isMusicPlaying) {
    stopBackgroundMusic();
    onStateChange?.(false);
    return false;
  } else {
    startBackgroundMusic();
    onStateChange?.(true);
    return true;
  }
}

export function isBgMusicActive(): boolean {
  return isMusicPlaying;
}

export function startBackgroundMusic() {
  const ctx = getAudioContext();
  if (!ctx) return;
  isMusicPlaying = true;

  // Romantic acoustic progression: Cmaj7 -> Am7 -> Fmaj7 -> G7
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
    [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
    [174.61, 261.63, 329.63, 349.23], // Fmaj7 (F3, C4, E4, F4)
    [196.00, 246.94, 293.66, 349.23], // G7 (G3, B3, D4, F4)
  ];

  let chordIndex = 0;

  const playNextChord = () => {
    if (!isMusicPlaying || isMuted) return;
    const currentChord = chords[chordIndex % chords.length];
    chordIndex++;

    const now = ctx.currentTime;
    currentChord.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.2);

      gain.gain.setValueAtTime(0.04, now + i * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 2.2 + i * 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.2);
      osc.stop(now + 2.4);
    });
  };

  playNextChord();
  bgMusicInterval = window.setInterval(playNextChord, 2200);
}

export function stopBackgroundMusic() {
  isMusicPlaying = false;
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}
