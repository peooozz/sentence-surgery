import React from "react";
import { useGame } from "../GameProvider";
import { Award, ArrowLeft } from "lucide-react";

export default function Trophies() {
  const { earnedTrophies, TROPHY_LIST, setGameState } = useGame();

  return (
    <div className="fixed inset-0 z-30 bg-gradient-to-b from-slate-50/95 to-white/95 backdrop-blur-md flex flex-col p-6 overflow-y-auto pt-28">
      {/* Top bar */}
      <div className="max-w-5xl w-full mx-auto flex justify-between items-center mb-6">
        <button
          onClick={() => setGameState("menu")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl glass-panel-pink border border-rose-200 text-xs font-bold text-rose-600 hover:scale-105 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinic</span>
        </button>
        
        <div className="text-right">
          <p className="text-xs text-slate-400 font-semibold">COLLECTION PROGRESS</p>
          <p className="text-lg font-extrabold text-sky-600">
            {earnedTrophies.length} / {TROPHY_LIST.length} Mastered
          </p>
        </div>
      </div>

      {/* Main Cabinet Shelf */}
      <div className="max-w-5xl w-full mx-auto flex-1 bg-white border-2 border-slate-200 rounded-3xl p-6 glass-panel flex flex-col shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-rose-500 to-sky-500 bg-clip-text inline-flex items-center gap-2">
            <Award className="w-8 h-8 text-rose-500" />
            <span>Grammar Trophy Cabinet</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Solve grammar wounds on sentence patients to unlock golden trophies and prove your surgical mastery!
          </p>
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 flex-1">
          {TROPHY_LIST.map((trophy) => {
            const isUnlocked = earnedTrophies.includes(trophy.id);
            return (
              <div
                key={trophy.id}
                className={`relative group rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isUnlocked
                    ? "bg-white border-2 border-rose-200 shadow-md hover:border-rose-400 hover:shadow-lg"
                    : "bg-slate-50 border-2 border-slate-100 opacity-50 filter grayscale"
                }`}
              >
                <div className="w-16 h-16 flex items-center justify-center relative mb-2">
                  <div className="absolute inset-0 bg-rose-100 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span 
                    className={`text-4xl select-none transition-transform duration-700 block ${
                      isUnlocked ? "group-hover:scale-125 group-hover:[transform:rotateY(360deg)] cursor-pointer" : ""
                    }`}
                  >
                    {isUnlocked ? trophy.icon : "🔒"}
                  </span>
                </div>

                <div className="mt-1 flex-1 flex flex-col justify-center">
                  <p className={`text-xs font-extrabold ${isUnlocked ? "text-slate-800" : "text-slate-400"}`}>
                    {trophy.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{trophy.concept}</p>
                  {isUnlocked ? (
                    <p className="text-[9px] text-slate-500 mt-2 leading-tight">{trophy.description}</p>
                  ) : (
                    <p className="text-[9px] text-slate-300 mt-2 italic">Locked Concept</p>
                  )}
                </div>

                {isUnlocked && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
