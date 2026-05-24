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
    <div className="fixed inset-0 z-35 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-yellow-50 border-4 border-black p-8 shadow-[8px_8px_0px_#000000] rounded-2xl flex flex-col items-center text-center animate-scale-up text-black select-none">
        
        {/* Celebration Title with Comic Starburst Banner */}
        <div className="relative mb-6 flex flex-col items-center justify-center py-6 w-full">
          {/* Animated SVG Starburst Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none scale-150 overflow-hidden z-0">
            <svg viewBox="0 0 200 200" className="w-72 h-72 animate-[spin_40s_linear_infinite] text-yellow-400 fill-current">
              <path d="M100 0 L110 70 L170 30 L130 90 L200 100 L130 110 L170 170 L110 130 L100 200 L90 130 L30 170 L70 110 L0 100 L70 90 L30 30 L90 70 Z" />
            </svg>
          </div>
          
          <div className="w-16 h-16 rounded-full bg-yellow-400 border-3 border-black flex items-center justify-center mb-4 z-10 animate-bounce shadow-[3px_3px_0px_#000000]">
            <Award className="w-8 h-8 text-black" />
          </div>

          <div className="relative bg-pink-500 text-white border-4 border-black px-8 py-3.5 rounded-xl rotate-[-2deg] shadow-[5px_5px_0px_#000000] z-10 max-w-md mx-auto">
            <h1 className="text-4xl comic-header text-yellow-300 uppercase tracking-widest text-center select-none">
              SURGERY SUCCESSFUL!
            </h1>
          </div>
          
          <p className="text-xs text-slate-800 font-extrabold tracking-wider uppercase mt-4 z-10 comic-text">
            ⚡ Patient Discharged in Stable Condition ⚡
          </p>
        </div>

        {/* Discharge Scroll Button */}
        <div className="w-full max-w-md my-3 z-10">
          <button
            onClick={() => setScrollOpen(!scrollOpen)}
            className="w-full bg-white hover:bg-slate-50 border-3 border-black text-black px-6 py-4 rounded-xl shadow-[4px_4px_0px_#000000] flex flex-col items-center justify-between transition-all hover:scale-[1.02] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-yellow-500 via-pink-500 to-sky-500"></div>
            <p className="text-xs text-sky-600 font-extrabold uppercase tracking-widest flex items-center gap-1.5 comic-text">
              <Compass className="w-4 h-4 text-black" /> Official Discharge Scroll
            </p>
            <p className="font-mono text-sm sm:text-base font-bold italic mt-2 text-slate-900 leading-relaxed max-w-xs sm:max-w-sm">
              "{correctedSentence}"
            </p>
            <span className="text-[10px] text-pink-600 font-black mt-3 uppercase tracking-wider underline hover:text-pink-800 comic-text">
              {scrollOpen ? "Click to collapse medical summary" : "Click to view rules & incisions"}
            </span>
          </button>

          {/* Collapsible Scroll Details */}
          {scrollOpen && (
            <div className="bg-white text-black p-4 rounded-b-xl border-x-3 border-b-3 border-black text-left text-xs space-y-2 mt-[-4px] shadow-[4px_4px_0px_#000000] animate-fade-in max-w-md mx-auto comic-text">
              <p className="font-black border-b-2 border-black pb-1 text-black text-[11px] uppercase tracking-wide">
                Surgery Incisions Executed:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-800">
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
        <div className="grid grid-cols-2 gap-4 w-full max-w-md my-3 z-10">
          <div className="bg-white p-3.5 rounded-xl border-3 border-black shadow-[3px_3px_0px_#000000] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-400 border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#000000]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left comic-text">
              <p className="text-[10px] text-slate-600 font-extrabold uppercase">Accuracy</p>
              <p className="text-sm font-black text-black">{accuracy}% ({mistakes} errors)</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border-3 border-black shadow-[3px_3px_0px_#000000] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-400 border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_#000000]">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-left comic-text">
              <p className="text-[10px] text-slate-600 font-extrabold uppercase">Surgery Time</p>
              <p className="text-sm font-black text-black">{timeTaken} seconds</p>
            </div>
          </div>
        </div>

        {/* XP Breakdown Board (Receipt Style) */}
        <div className="w-full max-w-md bg-white p-4 rounded-xl border-3 border-black text-left space-y-2 mb-6 shadow-[4px_4px_0px_#000000] z-10 comic-text">
          <p className="text-[11px] text-black font-black tracking-wider uppercase border-b-2 border-black pb-1.5 flex justify-between">
            <span>XP Commission Statement</span>
            <span className="text-pink-600">Rank: {rank}</span>
          </p>
          <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>Base Medical Fee:</span>
            <span className="text-emerald-600 font-black">+50 XP</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>Accuracy Bonus:</span>
            <span className="text-emerald-600 font-black">+{Math.max(0, 50 - mistakes * 15)} XP</span>
          </div>
          {speedBonusXp > 0 && (
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Speed Bonus (under 40s):</span>
              <span className="text-emerald-600 font-black">+{speedBonusXp} XP</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-black text-black border-t-2 border-dashed border-black pt-2">
            <span>Total Commission:</span>
            <span className="text-emerald-600">+{50 + Math.max(0, 50 - mistakes * 15) + speedBonusXp} XP</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex gap-4 w-full max-w-md shrink-0 z-10">
          <button
            onClick={() => setGameState("menu")}
            className="flex-1 py-3 bg-rose-500 hover:bg-rose-400 border-3 border-black text-white rounded-xl font-black text-xs shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>DISCHARGE PATIENT</span>
          </button>
          
          <button
            onClick={handleNextPatient}
            className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-300 border-3 border-black text-black rounded-xl font-black text-xs shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>NEXT PATIENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
