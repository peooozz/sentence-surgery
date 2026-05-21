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
      setBubbleText("Welcome back, Doctor! Select an emergency level to begin our clinical rounds.");
    } else if (gameState === "ambulance") {
      setBubbleText("Alert! A new grammatical emergency is arriving by ambulance. Prep the operating table immediately!");
    } else if (gameState === "surgery") {
      if (showExplanation) {
        setBubbleText(showExplanation.text);
      } else if (errorsOnPatient >= 2) {
        const activeErr = currentWords.find(w => w.errorActive);
        if (activeErr) {
          setBubbleText(`Nurse Diagnosis: '${activeErr.original}' needs correction. ${activeErr.hint}`);
        } else {
          setBubbleText("The grammatical wounds are sealing up! Review the sentence for remaining injuries.");
        }
      } else {
        setBubbleText("Grab a surgical instrument from the tray below and make a precise incision on the glowing word block!");
      }
    } else if (gameState === "success") {
      setBubbleText("Incredible procedure, Surgeon! The patient's syntax is stabilized and ready for discharge.");
    }
  }, [gameState, errorsOnPatient, showExplanation, currentWords]);

  // Voice read-out
  useEffect(() => {
    if (settings.voiceEnabled && bubbleText) {
      if (gameState === "success" || showExplanation?.isSuccess === false) {
        speak(bubbleText);
      }
    }
  }, [bubbleText, settings.voiceEnabled]);

  const handleSpeakToggle = () => {
    if (isSpeaking) { stop(); } else { speak(bubbleText); }
  };

  const handleReadSentence = () => {
    if (!activePatient) return;
    const sentenceStr = currentWords.map(w => w.currentText).join(" ");
    speak(`The current patient reads: ${sentenceStr}`);
  };

  return (
    <div className="fixed bottom-28 right-6 z-40 max-w-md flex items-end gap-4 pointer-events-auto">
      {/* Speech Bubble */}
      <div className="flex flex-col items-end">
        <div className="glass-panel-pink p-5 rounded-3xl rounded-br-none text-base text-slate-800 max-w-sm relative animate-fade-in shadow-lg border-2 border-rose-200">
          <p className="font-extrabold text-rose-600 mb-1.5 flex items-center gap-2">
            <span>Nurse Clara</span>
            {errorsOnPatient >= 2 && (
              <span className="text-amber-600 flex items-center text-xs gap-1 font-bold px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" /> DIAGNOSIS HINT
              </span>
            )}
          </p>
          <p className="leading-relaxed font-semibold text-slate-700">{bubbleText}</p>
          
          {/* Bubble Tail */}
          <div className="absolute right-0 bottom-[-8px] w-0 h-0 border-t-[8px] border-t-rose-200 border-l-[8px] border-l-transparent"></div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-2">
          {activePatient && gameState === "surgery" && (
            <button
              onClick={handleReadSentence}
              className="px-4 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-bold rounded-full transition-all text-sky-700 cursor-pointer shadow-sm"
            >
              Read Sentence
            </button>
          )}
          <button
            onClick={handleSpeakToggle}
            className={`p-2 rounded-full border transition-all cursor-pointer shadow-sm ${
              isSpeaking 
                ? "bg-rose-500 border-rose-400 text-white animate-pulse" 
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
            title="Read Nurse Bubble"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Nurse Avatar Graphic */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-400 to-sky-400 p-[2px] shadow-lg shrink-0">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
          <svg className="w-16 h-16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="18" r="10" fill="#fed7aa" />
            <path d="M12 18C12 11.3726 17.3726 6 24 6C30.6274 6 36 11.3726 36 18C36 19 35 19 34 18C30 15 26 19 24 19C22 19 18 15 14 18C13 19 12 19 12 18Z" fill="#78350f" />
            <path d="M17 10C17 10 21 6 24 6C27 6 31 10 31 10L32 12H16L17 10Z" fill="#ffffff" />
            <rect x="22" y="7" width="4" height="4" fill="#ef4444" />
            <rect x="23" y="6" width="2" height="6" fill="#ef4444" />
            <circle cx="20" cy="18" r="1.5" fill="#1e293b" />
            <circle cx="28" cy="18" r="1.5" fill="#1e293b" />
            <path d="M21 22C21 22 22.5 24 24 24C25.5 24 27 22 27 22" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="17" cy="20" r="1" fill="#f43f5e" opacity="0.5" />
            <circle cx="31" cy="20" r="1" fill="#f43f5e" opacity="0.5" />
            <path d="M10 42C10 33.1634 16.268 28 24 28C31.732 28 38 33.1634 38 42H10Z" fill="#38bdf8" />
            <path d="M24 28V36L20 32" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M24 36L28 32" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
