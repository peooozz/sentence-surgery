import React from "react";
import { X } from "lucide-react";

// Full set of punctuation + capitalisation options
const OPTIONS = [
  { char: ".",  label: "Full Stop",    color: "#e11d48" },
  { char: ",",  label: "Comma",        color: "#d97706" },
  { char: "!",  label: "Exclamation", color: "#7c3aed" },
  { char: "?",  label: "Question",    color: "#0284c7" },
  { char: ";",  label: "Semicolon",   color: "#059669" },
  { char: ":",  label: "Colon",       color: "#9333ea" },
  { char: "\"", label: "Quotes",      color: "#db2777" },
  { char: "-",  label: "Hyphen",      color: "#ca8a04" },
];

// Capitalise the first letter of a word
const CAPITAL_OPTIONS = [
  { char: "CAPITALISE", label: "Capitalise First Letter", color: "#2563eb", special: true },
  { char: "LOWERCASE",  label: "Make Lowercase",          color: "#64748b", special: true },
];

export default function PunctuationRadial({ word, wordIndex, onSelect, onClose }) {
  const text = word?.currentText || "";
  
  // Derive what capitalised/lowercase form looks like
  const capitalisedForm = text.charAt(0).toUpperCase() + text.slice(1);
  const lowercaseForm   = text.charAt(0).toLowerCase() + text.slice(1);

  const handleSelect = (char) => {
    if (char === "CAPITALISE") {
      onSelect(capitalisedForm);
    } else if (char === "LOWERCASE") {
      onSelect(lowercaseForm);
    } else {
      // Append punctuation to the word
      onSelect(char);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center pointer-events-auto">
      <div className="relative flex flex-col items-center gap-6 animate-scale-up">
        
        {/* Header label */}
        <div className="bg-white/90 backdrop-blur rounded-2xl px-5 py-2 shadow-lg border border-rose-200">
          <p className="text-xs font-black uppercase tracking-widest text-rose-500">Surgical Incision — Select Fix</p>
        </div>

        {/* Main radial area */}
        <div className="relative w-[420px] h-[420px] flex items-center justify-center">
          
          {/* Centre target bubble */}
          <div className="absolute w-32 h-32 rounded-full bg-white border-[3px] border-rose-400 flex flex-col items-center justify-center shadow-2xl text-center z-10 p-3">
            <span className="text-[9px] text-rose-500 font-black uppercase tracking-wider">Target:</span>
            <span className="text-lg font-black font-mono text-slate-800 truncate max-w-full mt-1 px-1">{text}</span>
          </div>

          {/* Punctuation options in circle */}
          {OPTIONS.map((opt, idx) => {
            const angle = (idx * 360) / OPTIONS.length - 90; // start from top
            const radius = 140;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt.char)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  borderColor: opt.color,
                  color: opt.color,
                }}
                className="absolute w-16 h-16 rounded-full bg-white border-2 flex flex-col items-center justify-center shadow-xl transition-all hover:scale-125 active:scale-95 cursor-pointer group"
                title={opt.label}
              >
                <span className="text-2xl font-black leading-none">{opt.char}</span>
                <span
                  className="absolute -bottom-6 text-[9px] font-extrabold px-2 py-0.5 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md"
                  style={{ background: opt.color }}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Capitalisation row below the circle */}
        <div className="flex gap-4">
          {CAPITAL_OPTIONS.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(opt.char)}
              style={{ borderColor: opt.color, color: opt.color }}
              className="px-5 py-3 rounded-2xl bg-white border-2 font-black text-sm shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer hover:opacity-80 flex flex-col items-center gap-1"
              title={opt.label}
            >
              <span className="text-base">{opt.char === "CAPITALISE" ? "Aa" : "aa"}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: opt.color }}>
                {opt.label}
              </span>
              <span className="text-[9px] text-slate-400 font-mono">→ {opt.char === "CAPITALISE" ? capitalisedForm : lowercaseForm}</span>
            </button>
          ))}
        </div>

        {/* Remove punctuation option */}
        <button
          onClick={() => handleSelect("")}
          className="px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer"
        >
          ✂ Remove Punctuation
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 rounded-full bg-white hover:bg-red-500 hover:text-white border-2 border-slate-200 text-slate-400 transition-colors cursor-pointer shadow-lg"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
