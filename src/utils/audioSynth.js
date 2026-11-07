// Web Audio API ambient festive sound generator
// Zero external files, 100% offline, pure harmonic synthesis

let audioCtx = null;
let masterGain = null;
let isPlaying = false;
let activeNodes = [];
let chordTimer = null;

export function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Play a sparkling celebration chime when Diya is lit or name submitted
export function playChimeSound() {
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major pentatonic bells
    
    chimeFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  } catch {
    // Graceful fallback if audio is blocked by browser policy
  }
}

// Gentle ambient meditative tanpura-like drone
export function toggleAmbientMusic() {
  try {
    initAudio();
    if (!audioCtx) return false;

    if (isPlaying) {
      stopAmbientMusic();
      return false;
    } else {
      startAmbientMusic();
      return true;
    }
  } catch {
    return false;
  }
}

function startAmbientMusic() {
  if (!audioCtx) return;
  isPlaying = true;

  // Root drone frequencies (C# tanpura: C#3, G#3, C#4)
  const baseFreqs = [138.59, 207.65, 277.18, 554.37];

  baseFreqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = i === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Warm subtle filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800 + i * 200, audioCtx.currentTime);

    // Low gentle ambient volume
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.035 / (i + 1), audioCtx.currentTime + 3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start();
    activeNodes.push({ osc, gain, filter });
  });

  // Cycle gentle higher bell harmonics every few seconds
  let noteIndex = 0;
  const peacefulNotes = [277.18, 311.13, 369.99, 415.30, 554.37];
  
  chordTimer = setInterval(() => {
    if (!isPlaying || !audioCtx) return;
    try {
      const bellOsc = audioCtx.createOscillator();
      const bellGain = audioCtx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(peacefulNotes[noteIndex % peacefulNotes.length], audioCtx.currentTime);
      noteIndex++;

      bellGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      bellGain.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + 0.8);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);

      bellOsc.connect(bellGain);
      bellGain.connect(masterGain);
      bellOsc.start();
      bellOsc.stop(audioCtx.currentTime + 4);
    } catch {
      // Ignore audio glitches
    }
  }, 4000);
}

export function stopAmbientMusic() {
  isPlaying = false;
  if (chordTimer) {
    clearInterval(chordTimer);
    chordTimer = null;
  }
  activeNodes.forEach(({ osc, gain }) => {
    try {
      if (audioCtx) {
        gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
        setTimeout(() => osc.stop(), 1100);
      } else {
        osc.stop();
      }
    } catch {
      // safe cleanup
    }
  });
  activeNodes = [];
}
