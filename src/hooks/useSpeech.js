// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\hooks\useSpeech.js
import { useState } from "react";
import { speakText, stopSpeech } from "../services/elevenLabsVoice";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if (!text) {
      setIsSpeaking(false);
      return;
    }
    
    speakText(text, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false)
    });
  };

  const stop = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  return { speak, stop, isSpeaking, supported: true };
}
