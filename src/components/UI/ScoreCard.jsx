import React, { useState } from "react";
import { useGame } from "../GameProvider";
import { Award, ArrowRight, ShieldCheck, Flame, Compass, HeartHandshake } from "lucide-react";
import confetti from "canvas-confetti";

export default function ScoreCard() {
  const {
    activePatient,
    currentWords,
    errorsOnPatient,
    timeTaken,
    speedBonusXp,
    xp,
    rank,
    startPatient,
    patientIndex,
    currentLevel,
    setGameState
  } = useGame();

  const [scrollOpen, setScrollOpen] = useState(false);

  const triggerConfetti = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  React.useEffect(() => {
    triggerConfetti();
    const timer = setTimeout(() => { triggerConfetti(); }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleNextPatient = () => {
    startPatient(currentLevel, patientIndex + 1);
  };

  const correctedSentence = currentWords.map((w) => w.currentText).join(" ");
  const mistakes = errorsOnPatient;
  const accuracy = Math.max(0, 100 - mistakes * 20);

  return (
    <div className="fixed inset-0 z-35 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white border-2 border-amber-300 rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex flex-col items-center text-center animate-scale-up">
        
        {/* Celebration Title */}
        <div className="mb-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center mb-2 mx-auto animate-bounce">
            <Award className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text drop-shadow">
            SURGERY SUCCESSFUL!
          </h1>
          <p className="text-xs text-amber-600 font-semibold tracking-wider uppercase mt-1">
            Patient Discharged in Stable Condition
          </p>
        </div>

        {/* 3D-Styled Clickable Scroll */}
        <div className="w-full max-w-md my-4">
          <button
            onClick={() => setScrollOpen(!scrollOpen)}
            className="w-full bg-amber-50 hover:bg-amber-100 border-x-4 border-amber-700 text-slate-900 px-6 py-4 rounded-xl shadow-md flex flex-col items-center justify-between transition-all hover:scale-[1.02] border-y border-amber-200 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700"></div>
            <p className="text-[10px] text-amber-800 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Official Discharge Scroll
            </p>
            <p className="font-mono text-sm sm:text-base font-bold italic mt-2 text-slate-800 leading-relaxed max-w-xs sm:max-w-sm">
              "{correctedSentence}"
            </p>
            <span className="text-[10px] text-amber-700 font-semibold mt-3 underline hover:text-amber-900">
              {scrollOpen ? "Click to collapse medical summary" : "Click to view rules & incisions"}
            </span>
          </button>

          {/* Collapsible Scroll Details */}
          {scrollOpen && (
            <div className="bg-amber-50 text-slate-800 p-4 rounded-b-xl border-x-2 border-b-2 border-amber-700 text-left text-xs space-y-2 animate-fade-in shadow-inner max-w-md mx-auto">
              <p className="font-bold border-b border-amber-200 pb-1 text-slate-900 text-[11px] uppercase tracking-wide">
                Surgery Incisions Executed:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                {activePatient.words.filter(w => w.errorType).map((w, idx) => (
                  <li key={idx}>
                    <strong>Fixed:</strong> '{w.original}' repaired to '{w.correct}' (<em>{w.explanation}</em>)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md my-4">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Accuracy</p>
              <p className="text-sm font-extrabold text-slate-800">{accuracy}% ({mistakes} errors)</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-500">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Surgery Time</p>
              <p className="text-sm font-extrabold text-slate-800">{timeTaken} seconds</p>
            </div>
          </div>
        </div>

        {/* XP Breakdown Board */}
        <div className="w-full max-w-md bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 mb-6">
          <p className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase border-b border-slate-200 pb-1.5 flex justify-between">
            <span>XP Commission Statement</span>
            <span className="text-amber-600">Rank: {rank}</span>
          </p>
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Base Medical Fee:</span>
            <span className="text-emerald-600">+50 XP</span>
          </div>
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Accuracy Bonus:</span>
            <span className="text-emerald-600">+{Math.max(0, 50 - mistakes * 15)} XP</span>
          </div>
          {speedBonusXp > 0 && (
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Speed Bonus (under 40s):</span>
              <span className="text-emerald-600">+{speedBonusXp} XP</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-black text-slate-800 border-t border-slate-200 pt-2">
            <span>Total Commission:</span>
            <span className="text-emerald-600">+{50 + Math.max(0, 50 - mistakes * 15) + speedBonusXp} XP</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex gap-4 w-full max-w-md shrink-0">
          <button
            onClick={() => setGameState("menu")}
            className="flex-1 py-3 border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-600 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>DISCHARGE PATIENT</span>
          </button>
          
          <button
            onClick={handleNextPatient}
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 rounded-2xl font-extrabold text-xs text-white shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>NEXT PATIENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
