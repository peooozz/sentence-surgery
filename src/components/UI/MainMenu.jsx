import React, { useState } from "react";
import { useGame } from "../GameProvider";
import { Stethoscope, Shield, Compass, BookOpen, AlertCircle, Play, RotateCcw, HelpCircle } from "lucide-react";

const LEVEL_DETAILS = [
  {
    level: 1,
    title: "Level 1: Year 3/4",
    ageRange: "Ages 7-9",
    skills: "Capitalization, Contraction & Possessive Apostrophes, Ending Punctuation",
    description: "Treat basic punctures! Repair missing capitalization, ending full stops, and basic apostrophe implants.",
    icon: "🩺",
    colorClass: "border-emerald-200 hover:border-emerald-300",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
    badgeColor: "border-emerald-200 bg-emerald-50 text-emerald-800"
  },
  {
    level: 2,
    title: "Level 2: Year 4/5",
    ageRange: "Ages 8-10",
    skills: "Verb Tenses, Simple Word Order Forceps",
    description: "Time travel lab! Inject verbs with past/present/future liquids and drag scrambled words into active voice alignments.",
    icon: "⏳",
    colorClass: "border-sky-200 hover:border-sky-300",
    accentBg: "bg-sky-50",
    accentText: "text-sky-700",
    badgeColor: "border-sky-200 bg-sky-50 text-sky-800"
  },
  {
    level: 3,
    title: "Level 3: Year 5/6",
    ageRange: "Ages 9-11",
    skills: "Subject-Verb Agreement, Complex List Commas",
    description: "Clinical ward! Clamp singular or plural subjects and verbs together to resolve agreement infections.",
    icon: "🏥",
    colorClass: "border-indigo-200 hover:border-indigo-300",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-700",
    badgeColor: "border-indigo-200 bg-indigo-50 text-indigo-800"
  },
  {
    level: 4,
    title: "Level 4: Year 7/8",
    ageRange: "Ages 11-13",
    skills: "Dangling Modifiers, Relative Pronouns (who/which/that), Word Deletion",
    description: "Advanced triage! Untangle complex clauses, select correct pronouns, and surgically remove unnecessary words.",
    icon: "🧪",
    colorClass: "border-pink-200 hover:border-pink-300",
    accentBg: "bg-pink-50",
    accentText: "text-pink-700",
    badgeColor: "border-pink-200 bg-pink-50 text-pink-800"
  },
  {
    level: 5,
    title: "Level 5: Surgeon General",
    ageRange: "Challenge",
    skills: "Multiple Mixed Errors, Double Negatives, Compound Clauses",
    description: "CODE RED emergency! Take on multiple simultaneous grammar wounds per sentence patient. The ultimate test of surgical skill!",
    icon: "🚨",
    colorClass: "border-red-200 hover:border-red-300",
    accentBg: "bg-red-50",
    accentText: "text-red-700",
    badgeColor: "border-red-200 bg-red-50 text-red-800"
  }
];

export default function MainMenu() {
  const { startPatient, xp, rank, patientRecords } = useGame();
  const [flippedCardId, setFlippedCardId] = useState(null);

  const handleStart = (lvl, e) => {
    e.stopPropagation(); // Stop propagation to avoid flipping back immediately
    startPatient(lvl, 0);
  };

  const getLevelProgress = (lvl) => {
    const levelRecords = patientRecords.filter((r) => r.level === lvl);
    const uniqueSolved = new Set(levelRecords.map((r) => r.patientId));
    return uniqueSolved.size;
  };

  const handleCardClick = (levelId) => {
    if (flippedCardId === levelId) {
      setFlippedCardId(null);
    } else {
      setFlippedCardId(levelId);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col p-8 pt-28 items-center bg-gradient-to-b from-slate-50/95 to-white/90 backdrop-blur-md">
      {/* Welcome Banner */}
      <div className="max-w-5xl w-full text-center mb-10 shrink-0 relative mt-4">
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-800 flex items-center justify-center gap-4">
          <Stethoscope className="w-14 h-14 text-rose-500 animate-pulse" />
          <span className="bg-gradient-to-r from-rose-500 via-slate-800 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
            SENTENCE SURGEON
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-2xl mx-auto font-medium leading-relaxed">
          Welcome to the Grammatical Emergency Ward. Select a level card below to inspect its case file, review the required skills, and click the surgical start button when ready.
        </p>

        {/* Mini stats banner */}
        <div className="flex justify-center gap-6 mt-6 text-xs sm:text-sm font-bold text-slate-700 glass-panel p-4 rounded-3xl border border-slate-200 shadow-md w-fit mx-auto">
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-500" />
            <span>Rank: <strong className="text-rose-600 font-extrabold">{rank}</strong></span>
          </span>
          <span className="w-[1px] bg-slate-200"></span>
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-500" />
            <span>Score: <strong className="text-sky-600 font-extrabold">{xp} XP</strong></span>
          </span>
          <span className="w-[1px] bg-slate-200"></span>
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Discharged: <strong className="text-emerald-600 font-extrabold">{patientRecords.length}</strong></span>
          </span>
        </div>
      </div>

      {/* Levels list grid */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
        {LEVEL_DETAILS.map((det) => {
          const solved = getLevelProgress(det.level);
          const total = 6;
          const progressPercent = (solved / total) * 100;
          const isFlipped = flippedCardId === det.level;

          return (
            <div
              key={det.level}
              className="w-full h-[290px] perspective-1000"
            >
              {/* Card Container holding Front & Back */}
              <div 
                onClick={() => handleCardClick(det.level)}
                className={`w-full h-full relative transition-transform duration-500 transform-style-3d shadow-md hover:shadow-lg rounded-[28px] ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                
                {/* FRONT SIDE (Case Index Card) */}
                <div className={`absolute inset-0 w-full h-full backface-hidden rounded-[28px] border p-6 flex flex-col justify-between bg-white ${det.colorClass}`}>
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl select-none" role="img">{det.icon}</span>
                        <div>
                          <h3 className="font-extrabold text-lg text-slate-800">{det.title}</h3>
                          <p className={`text-[10px] font-extrabold uppercase tracking-wider mt-0.5 ${det.accentText}`}>{det.ageRange}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border shadow-sm ${det.badgeColor}`}>
                        {solved}/{total} Solved
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4 mt-2">
                      {det.description}
                    </p>
                  </div>

                  {/* Footer & Progress */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>Level Completion Progress</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-400 via-rose-400 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 border-t border-slate-100 pt-3">
                      <span>SPECIALTY INDEX</span>
                      <span className="text-sky-500 animate-pulse flex items-center gap-1">
                        🔍 Click to open Case File
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE (Clinical Admission details with focused start button) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] border-2 border-slate-300 p-6 flex flex-col justify-between bg-slate-50/95 paper-texture">
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, #94a3b8 20px, #94a3b8 21px)" }}>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📋</span>
                        <h4 className="font-extrabold text-sm text-slate-700 tracking-wide">REQUIRED CLINICAL SKILLS</h4>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCardId(null);
                        }}
                        className="text-[10px] font-black text-rose-500 hover:text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200 cursor-pointer"
                      >
                        Flip back
                      </button>
                    </div>

                    {/* Skills list block */}
                    <div className={`flex items-start gap-2.5 text-[11px] text-slate-600 mb-4 p-3 rounded-2xl border ${det.accentBg} border-slate-200/50`}>
                      <AlertCircle className="w-4 h-4 shrink-0 text-sky-500 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-700 mb-1">Target Pathology:</p>
                        <p className="font-medium leading-relaxed">{det.skills}</p>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 font-bold leading-normal italic">
                      Verify that you possess the necessary credentials. Starting surgery triggers patient intake records immediately.
                    </p>
                  </div>

                  {/* Focused Surgical Begin Button - ONLY visible on back of flashcard */}
                  <div className="relative z-10 pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={(e) => handleStart(det.level, e)}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer hover:shadow-lg border border-emerald-400"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>BEGIN SURGICAL OPERATION</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Flashcard transform styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .paper-texture {
          background-image: radial-gradient(#e2e8f0 1.2px, transparent 1.2px), radial-gradient(#e2e8f0 1.2px, #f8fafc 1.2px);
          background-size: 24px 24px;
          background-position: 0 0, 12px 12px;
        }
      `}</style>
    </div>
  );
}
