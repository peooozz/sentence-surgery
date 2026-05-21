// ElevenLabs Voice Service
// Voice: https://elevenlabs.io/app/voice-library?voiceId=8N2ng9i2uiUWqstgmWlH

const VOICE_ID = '8N2ng9i2uiUWqstgmWlH';
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

let currentAudio = null;

/**
 * Speaks text using ElevenLabs TTS API.
 * Falls back to browser SpeechSynthesis if no API key is configured.
 */
export async function speakText(text, { onStart, onEnd } = {}) {
  if (!text) return;

  // Stop any currently playing audio
  stopSpeech();

  if (API_KEY) {
    try {
      onStart?.();
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
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
              stability: 0.55,
              similarity_boost: 0.85,
              style: 0.4,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (!response.ok) throw new Error(`ElevenLabs error: ${response.status}`);

      const blob = await response.blob();
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
  utt.pitch = 1.05;
  utt.volume = 1;
  utt.onstart = () => onStart?.();
  utt.onend = () => onEnd?.();

  // Pick a good voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.lang === 'en-US');
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

// Nurse Clara's medical dialogue lines
export const NURSE_DIALOGUES = {
  greeting: [
    "Good morning, Doctor. Patient is prepped and ready.",
    "Vitals are stable. You may begin the procedure.",
    "The sentence is displaying grammatical trauma. Proceeding.",
  ],
  error_found: [
    "Error detected! Grammar emergency in sector Alpha!",
    "Warning: Subject-verb disagreement causing tissue damage!",
    "Punctuation wound identified. Surgical intervention required.",
    "Tense fracture detected. This needs immediate attention, Doctor.",
  ],
  error_fixed: [
    "Excellent repair, Doctor! Wound is healing nicely.",
    "Grammar restored! Patient vitals improving.",
    "Beautiful work. That clause is perfectly sutured.",
    "Splendid! The patient's sentence is stabilizing.",
  ],
  healed: [
    "Sentence fully recovered! Patient is stable and grammatically sound!",
    "Outstanding surgery! All errors eliminated. Patient discharged!",
    "Perfect grammar achieved! The sentence is completely healed!",
  ],
  tool_change: [
    "Handing you the instrument now, Doctor.",
    "Tool ready. Proceed with care.",
    "Understood. Changing tools.",
  ],
};

export function getRandomDialogue(category) {
  const lines = NURSE_DIALOGUES[category] || NURSE_DIALOGUES.greeting;
  return lines[Math.floor(Math.random() * lines.length)];
}
