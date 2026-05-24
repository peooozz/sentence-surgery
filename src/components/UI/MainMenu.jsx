// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\components\UI\MainMenu.jsx
import React, { useState } from "react";
import { useGame } from "../GameProvider";
import { Shield, Compass, BookOpen, AlertCircle, Play } from "lucide-react";

const LEVEL_DETAILS = [
  {
    level: 1,
    title: "Level 1: Year 3/4",
    ageRange: "Ages 7-9",
    skills: "Capitalization, Contraction & Possessive Apostrophes, Ending Punctuation",
    description: "Treat basic punctures! Repair missing capitalization, ending full stops, and basic apostrophe implants.",
    icon: "🩺",
    colorClass: "hover:bg-emerald-50",
    accentText: "text-emerald-500",
    badgeColor: "bg-emerald-400 text-black"
  },
  {
    level: 2,
    title: "Level 2: Year 4/5",
    ageRange: "Ages 8-10",
    skills: "Verb Tenses, Simple Word Order Forceps",
    description: "Time travel lab! Inject verbs with past/present/future liquids and drag scrambled words into active voice alignments.",
    icon: "⏳",
    colorClass: "hover:bg-sky-50",
    accentText: "text-sky-500",
    badgeColor: "bg-sky-400 text-black"
  },
  {
    level: 3,
    title: "Level 3: Year 5/6",
    ageRange: "Ages 9-11",
    skills: "Subject-Verb Agreement, Complex List Commas",
    description: "Clinical ward! Clamp singular or plural subjects and verbs together to resolve agreement infections.",
    icon: "🏥",
    colorClass: "hover:bg-indigo-50",
    accentText: "text-indigo-500",
    badgeColor: "bg-indigo-400 text-black"
  },
  {
    level: 4,
    title: "Level 4: Year 7/8",
    ageRange: "Ages 11-13",
    skills: "Dangling Modifiers, Relative Pronouns (who/which/that), Word Deletion",
    description: "Advanced triage! Untangle complex clauses, select correct pronouns, and surgically remove unnecessary words.",
    icon: "🔬",
    colorClass: "hover:bg-pink-50",
    accentText: "text-pink-500",
    badgeColor: "bg-pink-400 text-black"
  },
  {
    level: 5,
    title: "Level 5: Surgeon General",
    ageRange: "Challenge",
    skills: "Multiple Mixed Errors, Double Negatives, Compound Clauses",
    description: "CODE RED emergency! Take on multiple simultaneous grammar wounds per sentence patient. The ultimate test of surgical skill!",
    icon: "🚨",
    colorClass: "hover:bg-red-50",
    accentText: "text-red-500",
    badgeColor: "bg-red-400 text-black"
  },
  {
    level: 6,
    title: "Level 6: Advanced",
    ageRange: "Ages 13-15",
    skills: "Comma Scissors, Advanced Spelling, Semicolons & Oxford Commas",
    description: "Advanced trauma unit! Fix comma splice wounds, add serial list commas, and sanitize spelling pathogens with Spell Scanner.",
    icon: "✂️",
    colorClass: "hover:bg-fuchsia-50",
    accentText: "text-fuchsia-500",
    badgeColor: "bg-fuchsia-400 text-black"
  },
  {
    level: 7,
    title: "Level 7: Expert",
    ageRange: "Ages 14-16",
    skills: "Pronoun Tweezers, Collective Agreement, Preposition Cases",
    description: "Realignment lab! Pluck objective pronoun cases, resolve prepositional pronoun errors, and align collective agreements.",
    icon: "🪡",
    colorClass: "hover:bg-yellow-50",
    accentText: "text-yellow-500",
    badgeColor: "bg-yellow-400 text-black"
  },
  {
    level: 8,
    title: "Level 8: Surgeon Ultimate",
    ageRange: "Timed Challenge",
    skills: "All 8 Tools, Multi-Wound Sepsis, Triple Negatives, Clause Realignment",
    description: "SURGEON GENERAL ULTIMATE! Extreme multi-error sentences. Full suite of spelling, agreement, pronoun, and comma splices. Speed bonus active.",
    icon: "👑",
    colorClass: "hover:bg-violet-50",
    accentText: "text-violet-500",
    badgeColor: "bg-violet-400 text-black"
  }
];

export default function MainMenu() {
  const { startPatient, xp, rank, patientRecords } = useGame();
  const [flippedCardId, setFlippedCardId] = useState(null);

  const handleStart = (lvl, e) => {
    e.stopPropagation();
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
    <div className="w-full h-full overflow-y-auto flex flex-col p-8 pt-28 items-center bg-slate-100 halftone-bg text-black">
      
      {/* Title Header Banner */}
      <div className="max-w-5xl w-full text-center mb-8 shrink-0 relative mt-4">
        
        {/* Comic starburst background panel for title */}
        <div className="inline-block relative px-8 py-4 bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_#000000] rounded-xl transform -rotate-1 mb-6">
          <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-black flex items-center justify-center gap-3">
            <span>💉</span>
            <span className="comic-header tracking-widest text-black">SENTENCE SURGEON</span>
            <span>✂️</span>
          </h1>
        </div>

        <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto font-black uppercase tracking-wider leading-relaxed comic-text">
          Welcome to the Grammatical Emergency Ward. Choose a chapter card below to inspect its case file, then click begin to start the procedure.
        </p>

        {/* Stats strip */}
        <div className="flex justify-center flex-wrap gap-4 mt-6 text-xs sm:text-sm font-black text-black bg-white border-4 border-black shadow-[4px_4px_0px_#000000] p-4 rounded-xl w-fit mx-auto comic-text">
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-pink-600" />
            <span>RANK: <strong className="text-pink-600 font-extrabold uppercase">{rank}</strong></span>
          </span>
          <span className="w-1 bg-black h-4 hidden sm:inline"></span>
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>SCORE: <strong className="text-sky-600 font-extrabold">{xp} XP</strong></span>
          </span>
          <span className="w-1 bg-black h-4 hidden sm:inline"></span>
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>DISCHARGED: <strong className="text-emerald-600 font-extrabold">{patientRecords.length} PATIENTS</strong></span>
          </span>
        </div>
      </div>

      {/* Chapters list grid */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {LEVEL_DETAILS.map((det) => {
          const solved = getLevelProgress(det.level);
          const total = 6;
          const progressPercent = (solved / total) * 100;
          const isFlipped = flippedCardId === det.level;

          return (
            <div
              key={det.level}
              className="w-full h-[280px] perspective-1000"
            >
              <div 
                onClick={() => handleCardClick(det.level)}
                className={`w-full h-full relative transition-transform duration-500 transform-style-3d cursor-pointer rounded-xl border-4 border-black shadow-[5px_5px_0px_#000000] ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                
                {/* FRONT SIDE */}
                <div className={`absolute inset-0 w-full h-full backface-hidden rounded-lg p-5 flex flex-col justify-between bg-white text-black transition-colors ${det.colorClass}`}>
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl select-none" role="img">{det.icon}</span>
                        <div>
                          <h3 className="font-extrabold text-base comic-text leading-tight">{det.title}</h3>
                          <p className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${det.accentText}`}>{det.ageRange}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border-2 border-black shadow-[1.5px_1.5px_0px_#000000] ${det.badgeColor}`}>
                        {solved}/{total} SOLVED
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-bold leading-relaxed mb-4 mt-2">
                      {det.description}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-black text-black uppercase tracking-wide">
                        <span>Chapter Completion</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-slate-200 rounded border-2 border-black overflow-hidden p-[1px]">
                        <div 
                          className="h-full bg-yellow-400 border-r-2 border-black rounded-sm transition-all duration-500 shadow-sm"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-black text-slate-400 border-t-2 border-slate-100 pt-2.5">
                      <span>SPECIALTY CASE INDEX</span>
                      <span className="text-sky-600 animate-pulse uppercase">
                        🔍 Click to open Case File
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg border-2 border-black p-5 flex flex-col justify-between bg-yellow-50 paper-texture text-black">
                  
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📋</span>
                        <h4 className="font-black text-xs uppercase tracking-wide">Admission Requirements</h4>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCardId(null);
                        }}
                        className="text-[9px] font-black text-black bg-white hover:bg-slate-100 px-2 py-0.5 rounded border-2 border-black cursor-pointer shadow-[1.5px_1.5px_0px_#000000]"
                      >
                        FLIP CARD
                      </button>
                    </div>

                    {/* Skills list block */}
                    <div className="flex items-start gap-2.5 text-[11px] text-black mb-3 p-3 rounded-lg border-2 border-black bg-white shadow-[2.5px_2.5px_0px_#000000]">
                      <AlertCircle className="w-4 h-4 shrink-0 text-pink-500 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-black mb-0.5">Target Pathology:</p>
                        <p className="font-bold leading-normal text-slate-800">{det.skills}</p>
                      </div>
                    </div>

                    <p className="text-[9px] text-slate-500 font-bold leading-snug italic">
                      Verify that you possess the necessary credentials. Starting surgery triggers patient intake records immediately.
                    </p>
                  </div>

                  {/* Surgical Begin Button */}
                  <div className="pt-3 border-t-2 border-black flex justify-end">
                    <button
                      onClick={(e) => handleStart(det.level, e)}
                      className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black border-3 border-black font-black text-xs rounded-xl shadow-[3px_3px_0px_#000000] flex items-center justify-center gap-1.5 transition-all active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] cursor-pointer"
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
          background-color: #fefcf0;
          background-image: 
            radial-gradient(rgba(0, 0, 0, 0.04) 10%, transparent 11%),
            url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='40' height='1'/%3E%3Crect x='0' y='0' width='1' height='40'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 8px 8px, 40px 40px;
        }
      `}</style>
    </div>
  );
}
