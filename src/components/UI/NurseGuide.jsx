// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\components\UI\NurseGuide.jsx
import React, { useEffect, useState } from "react";
import { useGame } from "../GameProvider";
import { useSpeech } from "../../hooks/useSpeech";
import { Volume2, VolumeX, AlertCircle } from "lucide-react";

export default function NurseGuide() {
  const { 
    gameState, 
    activePatient, 
    currentWords, 
    errorsOnPatient, 
    showExplanation, 
    settings 
  } = useGame();
  
  const { speak, stop, isSpeaking } = useSpeech();
  const [bubbleText, setBubbleText] = useState("");

  // Determine nurse dialogue based on state and error counts
  useEffect(() => {
    if (gameState === "menu") {
      setBubbleText("Welcome back, Doctor! Select a case file from the chapters panel to begin our rounds.");
    } else if (gameState === "ambulance") {
      setBubbleText("Emergency! A new patient is arriving by ambulance. Prep the operating table!");
    } else if (gameState === "surgery") {
      if (showExplanation) {
        setBubbleText(showExplanation.text);
      } else if (errorsOnPatient >= 2) {
        const activeErr = currentWords.find(w => w.errorActive);
        if (activeErr) {
          setBubbleText(`Nurse Diagnosis: '${activeErr.original}' is infected. Hint: ${activeErr.hint}`);
        } else {
          setBubbleText("Almost there! Review the remaining words for silent syntax injuries.");
        }
      } else {
        setBubbleText("Select a tool from the tray and click on the glowing word block to make an incision!");
      }
    } else if (gameState === "success") {
      setBubbleText("Spectacular procedure, Doctor! The patient's grammar has been fully stabilized.");
    }
  }, [gameState, errorsOnPatient, showExplanation, currentWords]);

  // Automatic voice read-out on dialogue change
  useEffect(() => {
    if (settings.voiceEnabled && bubbleText) {
      // Auto-read on success, errors, or menu arrivals
      if (gameState === "success" || gameState === "menu" || showExplanation?.isSuccess === false) {
        speak(bubbleText);
      }
    }
  }, [bubbleText, settings.voiceEnabled]);

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(bubbleText);
    }
  };

  const handleReadSentence = () => {
    if (!activePatient) return;
    const sentenceStr = currentWords.map(w => w.currentText).join(" ");
    speak(`The sentence reads: ${sentenceStr}`);
  };

  const positionClass = gameState === "surgery" 
    ? "fixed bottom-26 left-6 z-40" 
    : "fixed top-24 left-6 z-40";

  return (
    <div className={`${positionClass} max-w-sm flex items-start gap-3 pointer-events-auto`}>
      
      {/* Avatar Cap Graphic */}
      <div className="w-18 h-18 rounded-xl bg-pink-500 border-3 border-black shadow-[4px_4px_0px_#000000] flex items-center justify-center overflow-hidden shrink-0 select-none">
        <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="18" r="10" fill="#fed7aa" />
          <path d="M12 18C12 11.3726 17.3726 6 24 6C30.6274 6 36 11.3726 36 18C36 19 35 19 34 18C30 15 26 19 24 19C22 19 18 15 14 18C13 19 12 19 12 18Z" fill="#311042" />
          <path d="M17 10C17 10 21 6 24 6C27 6 31 10 31 10L32 12H16L17 10Z" fill="#ffffff" />
          <rect x="22" y="7" width="4" height="4" fill="#ef4444" />
          <rect x="23" y="6" width="2" height="6" fill="#ef4444" />
          <circle cx="20" cy="18" r="1.5" fill="#000000" />
          <circle cx="28" cy="18" r="1.5" fill="#000000" />
          <path d="M21 22C21 22 22.5 24 24 24C25.5 24 27 22 27 22" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="17" cy="20" r="1" fill="#f43f5e" opacity="0.5" />
          <circle cx="31" cy="20" r="1" fill="#f43f5e" opacity="0.5" />
          <path d="M10 42C10 33.1634 16.268 28 24 28C31.732 28 38 33.1634 38 42H10Z" fill="#ec4899" />
          <path d="M24 28V36L20 32" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M24 36L28 32" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Speech Bubble */}
      <div className="flex flex-col items-start">
        <div className="comic-speech-bubble p-5 max-w-sm relative animate-speech-bubble bg-white text-black border-4 border-black shadow-[6px_6px_0px_#000000] rounded-2xl rounded-bl-none">
          <p className="font-extrabold text-pink-600 mb-1.5 flex items-center gap-2 comic-header uppercase tracking-wider text-sm select-none">
            <span>Nurse Clara</span>
            {errorsOnPatient >= 2 && (
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-yellow-400 border-2 border-black shadow-[1px_1px_0px_#000000] text-black flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> DIAGNOSIS
              </span>
            )}
          </p>
          <p className="leading-relaxed font-bold text-black comic-text text-sm">{bubbleText}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3 select-none">
          {activePatient && gameState === "surgery" && (
            <button
              onClick={handleReadSentence}
              className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 border-2 border-black text-xs font-black rounded-lg transition-all text-black cursor-pointer shadow-[2px_2px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000]"
            >
              Read Sentence 🔊
            </button>
          )}
          <button
            onClick={handleSpeakToggle}
            className={`p-2 rounded-lg border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] ${
              isSpeaking 
                ? "bg-rose-500 text-white animate-pulse" 
                : "bg-white text-black hover:bg-slate-100"
            }`}
            title="Read Clara Dialogue"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

    </div>
  );
}
