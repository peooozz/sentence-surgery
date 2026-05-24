import React from "react";
import { useGame } from "../GameProvider";
import { Award, ArrowLeft } from "lucide-react";

export default function Trophies() {
  const { earnedTrophies, TROPHY_LIST, setGameState } = useGame();

  return (
    <div className="fixed inset-0 z-30 halftone-bg flex flex-col p-6 overflow-y-auto pt-28">
      {/* Top bar */}
      <div className="max-w-5xl w-full mx-auto flex justify-between items-center mb-6 z-10">
        <button
          onClick={() => setGameState("menu")}
          className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 border-3 border-black text-xs font-black text-black shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all cursor-pointer rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinic</span>
        </button>
        
        <div className="text-right flex flex-col px-4 py-2 bg-white border-3 border-black text-black rounded-xl shadow-[3px_3px_0px_#000000] min-w-[180px] comic-text">
          <p className="text-[10px] text-slate-600 font-extrabold uppercase tracking-wide">COLLECTION PROGRESS</p>
          <p className="text-lg font-black text-sky-600 uppercase tracking-wider comic-header">
            {earnedTrophies.length} / {TROPHY_LIST.length} Mastered
          </p>
        </div>
      </div>

      {/* Main Cabinet Shelf - Big Yellow Comic Panel */}
      <div className="max-w-5xl w-full mx-auto flex-1 bg-yellow-50 border-4 border-black rounded-2xl p-8 flex flex-col shadow-[8px_8px_0px_#000000] text-black mb-6 animate-scale-up z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl comic-header text-pink-500 inline-flex items-center gap-2 select-none justify-center">
            <Award className="w-8 h-8 text-black" />
            <span>Grammar Trophy Cabinet</span>
          </h1>
          <p className="text-xs text-slate-700 mt-2 max-w-md mx-auto font-black comic-text">
            Solve grammar wounds on sentence patients to unlock golden trophies and prove your surgical mastery!
          </p>
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 flex-grow">
          {TROPHY_LIST.map((trophy) => {
            const isUnlocked = earnedTrophies.includes(trophy.id);
            return (
              <div
                key={trophy.id}
                className={`relative group p-4 rounded-xl flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isUnlocked
                    ? "bg-white border-3 border-black shadow-[4px_4px_0px_#000000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] hover:bg-yellow-100"
                    : "bg-slate-200/50 border-3 border-black border-dashed opacity-50 select-none"
                }`}
              >
                {/* Trophy Indicator Pin */}
                {isUnlocked ? (
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black shadow-[1px_1px_0px_#000000]"></div>
                ) : (
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-black"></div>
                )}

                <div className="w-16 h-16 flex items-center justify-center relative mb-2">
                  <div className="absolute inset-0 bg-yellow-200/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span 
                    className={`text-4xl select-none transition-transform duration-500 block ${
                      isUnlocked ? "group-hover:scale-125 group-hover:rotate-12 cursor-pointer" : ""
                    }`}
                  >
                    {isUnlocked ? trophy.icon : "🔒"}
                  </span>
                </div>

                <div className="mt-1 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <p className={`text-xs font-black comic-text uppercase leading-tight ${isUnlocked ? "text-black" : "text-slate-500"}`}>
                      {trophy.name}
                    </p>
                    <p className="text-[9px] text-sky-600 font-extrabold uppercase mt-0.5 tracking-wider comic-text">{trophy.concept}</p>
                  </div>
                  
                  {isUnlocked ? (
                    <p className="text-[9px] text-slate-800 font-bold mt-2.5 leading-tight border-t-2 border-dashed border-black/10 pt-2 comic-text">
                      {trophy.description}
                    </p>
                  ) : (
                    <p className="text-[9px] text-slate-500 mt-2.5 font-bold italic comic-text">Locked Concept</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
