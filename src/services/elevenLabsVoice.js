// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\services\elevenLabsVoice.js

const VOICE_ID = '8N2ng9i2uiUWqstgmWlH';
const API_KEY = 'sk_305d2635b944fccb29aa94db19bea2600e1759375d603efe';

let currentAudio = null;
const audioCache = new Map();

/**
 * Speaks text using ElevenLabs TTS API.
 * Falls back to browser SpeechSynthesis if no API key is configured.
 */
export async function speakText(text, { onStart, onEnd } = {}) {
  if (!text) return;

  // Stop any currently playing audio
  stopSpeech();

  // 1. Check local audio blob cache
  if (audioCache.has(text)) {
    try {
      onStart?.();
      const blob = audioCache.get(text);
      const url = URL.createObjectURL(blob);
      currentAudio = new Audio(url);
      currentAudio.onended = () => {
        URL.revokeObjectURL(url);
        onEnd?.();
      };
      currentAudio.play();
      return;
    } catch (err) {
      console.warn("Cached audio playback failed, refetching...", err);
    }
  }

  // 2. Fetch from ElevenLabs if API key is present
  if (API_KEY) {
    try {
      onStart?.();
      const response = await fetch(
        `/api-elevenlabs/v1/text-to-speech/${VOICE_ID}/stream`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.5,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (!response.ok) throw new Error(`ElevenLabs error: ${response.status}`);

      const blob = await response.blob();
      
      // Save to cache
      audioCache.set(text, blob);

      const url = URL.createObjectURL(blob);
      currentAudio = new Audio(url);
      currentAudio.onended = () => {
        URL.revokeObjectURL(url);
        onEnd?.();
      };
      currentAudio.play();
    } catch (err) {
      console.warn('ElevenLabs TTS failed, using browser fallback:', err);
      _browserSpeak(text, onStart, onEnd);
    }
  } else {
    // No API key: use browser SpeechSynthesis
    _browserSpeak(text, onStart, onEnd);
  }
}

function _browserSpeak(text, onStart, onEnd) {
  if (!window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.95;
  utt.pitch = 1.15;
  utt.volume = 1;
  utt.onstart = () => onStart?.();
  utt.onend = () => onEnd?.();

  // Pick a good voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en-') && (v.name.includes('Google') || v.name.includes('Natural')));
  if (preferred) utt.voice = preferred;

  window.speechSynthesis.speak(utt);
}

export function stopSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// Nurse Clara's dialogues
export const NURSE_DIALOGUES = {
  greeting: [
    "Good morning, Doctor! Your patient is prepped and ready on the table.",
    "Welcome to the theatre, Doctor. We have a fresh grammar emergency.",
    "Vitals look stable. Let's heal this sentence!"
  ],
  error_found: [
    "Careful, Doctor! That incision wasn't quite right.",
    "Ouch! The patient rejected that tool alignment.",
    "Diagnostics indicate a negative reaction. Try another tool!"
  ],
  error_fixed: [
    "Brilliant work, Doctor! The sentence is healing!",
    "Incision successful! Wound is closed.",
    "Fantastic repair! Vitals are improving!"
  ],
  healed: [
    "Patient fully recovered! Excellent surgery, Doctor!",
    "All wounds stitched! The sentence is completely healed!",
    "Outstanding procedure. Discharge papers prepped."
  ],
  tool_change: [
    "Passing you the tool now.",
    "Surgical instrument prepped.",
    "Changing tools. Be careful, Doctor."
  ],
  level_up: [
    "Incredible! You've been promoted to a higher rank!",
    "New rank unlocked! Excellent clinical performance, Doctor!",
    "Brilliant work. You've earned a promotion!"
  ]
};

export function getRandomDialogue(category) {
  const lines = NURSE_DIALOGUES[category] || NURSE_DIALOGUES.greeting;
  return lines[Math.floor(Math.random() * lines.length)];
}
