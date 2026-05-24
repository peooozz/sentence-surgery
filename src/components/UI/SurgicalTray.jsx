import React from "react";
import { useGame } from "../GameProvider";
import { synthAudio } from "../../hooks/synthAudio";

const TOOLS = [
  {
    id: "scalpel",
    name: "Punctuation Scalpel",
    icon: "🔪",
    colorClass: "bg-rose-500",
    activeClass: "bg-rose-100 border-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.6)]",
    description: "Fix starting capitalization and missing ending punctuation."
  },
  {
    id: "injector",
    name: "Tense Injector",
    icon: "💉",
    colorClass: "bg-sky-500",
    activeClass: "bg-sky-100 border-sky-600 shadow-[0_0_15px_rgba(14,165,233,0.6)]",
    description: "Inject tense serum to repair faulty verb conjugations."
  },
  {
    id: "clamp",
    name: "Agreement Clamp",
    icon: "🗜️",
    colorClass: "bg-emerald-500",
    activeClass: "bg-emerald-100 border-emerald-600 shadow-[0_0_15px_rgba(34,197,94,0.6)]",
    description: "Clamp down on subject-verb agreement mismatches."
  },
  {
    id: "implant",
    name: "Apostrophe Implant",
    icon: "💎",
    colorClass: "bg-fuchsia-500",
    activeClass: "bg-fuchsia-100 border-fuchsia-600 shadow-[0_0_15px_rgba(217,70,239,0.6)]",
    description: "Implant contraction or possession apostrophes."
  },
  {
    id: "forceps",
    name: "Word Order Forceps",
    icon: "🧲",
    colorClass: "bg-amber-500",
    activeClass: "bg-amber-100 border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)]",
    description: "Swap and rearrange scrambled word structures."
  },
  {
    id: "scissors",
    name: "Comma Scissors",
    icon: "✂️",
    colorClass: "bg-pink-500",
    activeClass: "bg-pink-100 border-pink-600 shadow-[0_0_15px_rgba(236,72,153,0.6)]",
    description: "Add, remove, or replace commas to fix run-on splice wounds."
  },
  {
    id: "scanner",
    name: "Spell Scanner",
    icon: "🔬",
    colorClass: "bg-violet-500",
    activeClass: "bg-violet-100 border-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.6)]",
    description: "Scan and resolve deep spelling infections with alternates."
  },
  {
    id: "tweezers",
    name: "Pronoun Tweezers",
    icon: "🪡",
    colorClass: "bg-yellow-500",
    activeClass: "bg-yellow-100 border-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.6)]",
    description: "Extract and align correct pronoun cases (he/him, they/them, there/their)."
  }
];

export default function SurgicalTray() {
  const { activeTool, setActiveTool } = useGame();

  const handleSelectTool = (toolId) => {
    if (activeTool === toolId) {
      setActiveTool(null);
    } else {
      setActiveTool(toolId);
      synthAudio.playToolPickup();
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-full px-4 pointer-events-none">
      {/* Surgical Tray - Comic Panel Style */}
      <div className="bg-white border-4 border-black p-3 rounded-2xl pointer-events-auto flex items-center justify-between shadow-[8px_8px_0px_#000000] relative">
        
        {/* Decorative Halftone Strip */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.04)_12%,transparent_13%)] bg-[size:10px_10px] pointer-events-none rounded-xl"></div>

        {/* Tools Grid */}
        <div className="grid grid-cols-8 gap-3 py-1 w-full z-10 px-1">
          {TOOLS.map((tool) => {
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool.id)}
                className={`h-22 rounded-xl relative flex flex-col items-center justify-center transition-all duration-200 group cursor-pointer border-3 border-black ${
                  isSelected
                    ? `${tool.activeClass} -translate-y-4 shadow-[4px_4px_0px_#000000]`
                    : "bg-white border-black hover:bg-slate-100 hover:-translate-y-1.5 shadow-[3px_3px_0px_#000000]"
                }`}
              >
                {/* 3D-like icon bubble */}
                <div className={`w-10 h-10 rounded-full ${tool.colorClass} border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] transition-transform duration-200 group-hover:scale-110 mb-1`}>
                  <span className="text-lg select-none text-white">{tool.icon}</span>
                </div>

                <span className="text-[10px] font-black text-center select-none uppercase tracking-wider text-black">
                  {tool.id}
                </span>

                {/* Tool descriptions tooltip as a word bubble */}
                <div className="absolute bottom-26 bg-yellow-100 border-3 border-black p-3.5 rounded-xl text-black w-56 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[5px_5px_0px_#000000] text-left left-1/2 -translate-x-1/2 text-[11px] leading-snug comic-text z-50">
                  <p className="font-extrabold text-black mb-1 flex items-center gap-1.5 text-xs">
                    <span>{tool.icon}</span>
                    <span className="underline decoration-yellow-500 decoration-3">{tool.name}</span>
                  </p>
                  <p className="font-medium text-slate-800">{tool.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
