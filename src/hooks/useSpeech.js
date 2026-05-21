// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\hooks\useSpeech.js
import { useState, useEffect } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSupported(true);
    }
  }, []);

  const speak = (text) => {
    if (!supported) return;

    // Cancel any active speech first
    window.speechSynthesis.cancel();

    if (!text) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose a friendly sounding voice (prefer female/nurse-like or high quality English)
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith("en-") && v.name.includes("Google")) || 
                         voices.find(v => v.lang.startsWith("en-")) || 
                         voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 0.95; // Slightly slower, friendly pace for kids
    utterance.pitch = 1.15; // Slightly higher, friendly pitch

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return { speak, stop, isSpeaking, supported };
}
