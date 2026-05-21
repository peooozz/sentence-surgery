import React from "react";
import { useGame } from "../GameProvider";
import { synthAudio } from "../../hooks/synthAudio";

const TOOLS = [
  {
    id: "scalpel",
    name: "Punctuation Scalpel",
    icon: "🔪",
    gradient: "from-rose-400 to-rose-600",
    activeBorder: "border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]",
    description: "Fix starting capitalization and missing ending punctuation."
  },
  {
    id: "injector",
    name: "Tense Injector",
    icon: "💉",
    gradient: "from-sky-400 to-sky-600",
    activeBorder: "border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.4)]",
    description: "Inject tense serum to repair faulty verb forms."
  },
  {
    id: "clamp",
    name: "Agreement Clamp",
    icon: "🗜️",
    gradient: "from-emerald-400 to-emerald-600",
    activeBorder: "border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    description: "Align mismatched subjects and verbs."
  },
  {
    id: "implant",
    name: "Apostrophe Implant",
    icon: "💎",
    gradient: "from-purple-400 to-purple-600",
    activeBorder: "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    description: "Implant contraction or possession apostrophes."
  },
  {
    id: "forceps",
    name: "Word Order Forceps",
    icon: "🧲",
    gradient: "from-amber-400 to-amber-600",
    activeBorder: "border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    description: "Swap and rearrange scrambled words."
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-full px-6 pointer-events-none">
      {/* Surgical Tray - Hospital White Chrome */}
      <div className="chrome-metal p-3 rounded-[32px] pointer-events-auto flex items-center justify-between border-2 border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.1)] relative">
        {/* Tray inner glow panel */}
        <div className="absolute inset-1.5 border border-slate-100 rounded-[26px] pointer-events-none"></div>

        {/* Tools row */}
        <div className="flex justify-around items-center w-full gap-4 py-1.5 z-10 px-3">
          {TOOLS.map((tool) => {
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool.id)}
                className={`flex-1 max-w-[145px] h-24 rounded-2xl relative flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer border-2 ${
                  isSelected
                    ? `bg-white -translate-y-6 shadow-2xl ${tool.activeBorder}`
                    : "bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 hover:-translate-y-2 shadow-md"
                }`}
              >
                {/* 3D-like float effect background bubble */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 mb-2`}>
                  <span className="text-xl select-none text-white">{tool.icon}</span>
                </div>

                <span className={`text-[11px] font-black text-center select-none uppercase tracking-wider ${
                  isSelected ? "text-slate-800" : "text-slate-500 group-hover:text-slate-700"
                }`}>
                  {tool.id}
                </span>

                {/* Tool descriptions tooltip on hover */}
                <div className="absolute bottom-28 bg-white border-2 border-slate-200 p-4 rounded-2xl text-slate-700 w-60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl text-left left-1/2 -translate-x-1/2 text-xs leading-relaxed">
                  <p className="font-extrabold text-rose-600 mb-1 flex items-center gap-1.5">
                    <span>{tool.icon}</span>
                    <span>{tool.name}</span>
                  </p>
                  <p className="text-slate-500 font-semibold">{tool.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
