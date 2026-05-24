// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\hooks\synthAudio.js

let audioCtx = null;
let humNode = null;
let humOsc1 = null;
let humOsc2 = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const synthAudio = {
  // Start the background hospital ambient hum
  startAmbientHum() {
    try {
      const ctx = getAudioContext();
      if (humNode) return;

      humNode = ctx.createGain();
      humNode.gain.setValueAtTime(0.04, ctx.currentTime); // very quiet background hum

      // Low frequency hum (ventilation)
      humOsc1 = ctx.createOscillator();
      humOsc1.type = "sine";
      humOsc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      // Second harmonic
      humOsc2 = ctx.createOscillator();
      humOsc2.type = "sine";
      humOsc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 note

      // Combine oscillators
      humOsc1.connect(humNode);
      humOsc2.connect(humNode);
      humNode.connect(ctx.destination);

      humOsc1.start();
      humOsc2.start();
    } catch (e) {
      console.warn("Failed to start ambient hum:", e);
    }
  },

  stopAmbientHum() {
    try {
      if (humOsc1) {
        humOsc1.stop();
        humOsc1.disconnect();
        humOsc1 = null;
      }
      if (humOsc2) {
        humOsc2.stop();
        humOsc2.disconnect();
        humOsc2 = null;
      }
      if (humNode) {
        humNode.disconnect();
        humNode = null;
      }
    } catch (e) {
      console.warn("Failed to stop ambient hum:", e);
    }
  },

  // Heart rate monitor beep
  playHeartBeep(isFast = false, isFlatline = false) {
    // Muted to remove annoying repeating beeps
  },

  // Tool pickup metallic clink
  playToolPickup() {
    // Muted to remove annoying tool pickup/drop sound clicks
  },

  // Correct fix / incision seal sound
  playSuccess() {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Positive ascending chord (major pentatonic)
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const delay = 0.06;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * delay);

        gain.gain.setValueAtTime(0.0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * delay + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * delay);
        osc.stop(now + idx * delay + 0.25);
      });
    } catch (e) {
      console.warn("Failed to play success sound:", e);
    }
  },

  // Incorrect fix / error buzz sound (gentle)
  playFailure() {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Double low-pitch buzzer
      [0, 0.15].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now + delay);
        // Sligh pitch-bend downwards
        osc.frequency.linearRampToValueAtTime(100, now + delay + 0.12);

        gain.gain.setValueAtTime(0.06, now + delay);
        gain.gain.linearRampToValueAtTime(0.0001, now + delay + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.12);
      });
    } catch (e) {
      console.warn("Failed to play failure sound:", e);
    }
  },

  // Injector / laser healing sizzle
  playLaserSizzle() {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const duration = 0.4;

      // Create white noise buffer
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Filter noise to create a sizzle
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2500, now);
      filter.Q.setValueAtTime(4.0, now);
      filter.frequency.exponentialRampToValueAtTime(4500, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {
      console.warn("Failed to play laser sizzle:", e);
    }
  },

  // Victory celebration song (short orchestral-like synth flourish)
  playVictoryJingle() {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // A simple 3-second ascending chord progression
      // Chords: C major -> F major -> G major -> C major (high)
      const progressions = [
        { time: 0.0, notes: [261.63, 329.63, 392.00] }, // C4, E4, G4
        { time: 0.3, notes: [349.23, 440.00, 523.25] }, // F4, A4, C5
        { time: 0.6, notes: [392.00, 493.88, 587.33] }, // G4, B4, D5
        { time: 0.9, notes: [523.25, 659.25, 783.99, 1046.50] } // C5, E5, G5, C6 (triumphant)
      ];

      progressions.forEach((chord) => {
        chord.notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + chord.time);

          gain.gain.setValueAtTime(0.0, now + chord.time);
          gain.gain.linearRampToValueAtTime(0.04, now + chord.time + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + chord.time + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + chord.time);
          osc.stop(now + chord.time + 0.8);
        });
      });
    } catch (e) {
      console.warn("Failed to play victory jingle:", e);
    }
  }
};
