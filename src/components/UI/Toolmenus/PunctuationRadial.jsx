import React, { useState } from "react";
import { X } from "lucide-react";

const PUNCTUATION_OPTIONS = [
  { char: ".",  label: "Full Stop",    color: "#e11d48" },
  { char: ",",  label: "Comma",        color: "#d97706" },
  { char: "!",  label: "Exclamation", color: "#7c3aed" },
  { char: "?",  label: "Question",    color: "#0284c7" },
  { char: ";",  label: "Semicolon",   color: "#059669" },
  { char: ":",  label: "Colon",       color: "#9333ea" },
  { char: "\"", label: "Quotes",      color: "#db2777" },
  { char: "-",  label: "Hyphen",      color: "#ca8a04" },
];

export default function PunctuationRadial({ word, wordIndex, onSelect, onClose }) {
  const [customInput, setCustomInput] = useState("");
  const [tab, setTab] = useState("punct"); // "punct" | "word"
  const text = word?.currentText || "";

  // Derive capitalised / lowercased forms
  const capitalisedForm = text.charAt(0).toUpperCase() + text.slice(1);
  const lowercaseForm   = text.charAt(0).toLowerCase() + text.slice(1);

  const handlePunctSelect = (char) => {
    if (char === "CAPITALISE") onSelect(capitalisedForm);
    else if (char === "LOWERCASE") onSelect(lowercaseForm);
    else onSelect(char);
  };

  const handleWordReplace = () => {
    if (customInput.trim()) onSelect(customInput.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center pointer-events-auto">
      <div className="relative flex flex-col items-center gap-4 animate-scale-up">

        {/* Title */}
        <div className="bg-white/95 backdrop-blur rounded-2xl px-6 py-2.5 shadow-lg border border-rose-200">
          <p className="text-xs font-black uppercase tracking-widest text-rose-500">Surgical Scalpel — Select Fix</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/90 rounded-xl p-1 shadow border border-slate-200">
          <button
            onClick={() => setTab("punct")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${tab === "punct" ? "bg-rose-500 text-white shadow" : "text-slate-500 hover:text-rose-500"}`}
          >
            📍 Punctuation
          </button>
          <button
            onClick={() => setTab("cap")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${tab === "cap" ? "bg-blue-500 text-white shadow" : "text-slate-500 hover:text-blue-500"}`}
          >
            🔠 Capitalise
          </button>
          <button
            onClick={() => setTab("word")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${tab === "word" ? "bg-emerald-500 text-white shadow" : "text-slate-500 hover:text-emerald-500"}`}
          >
            ✏️ Replace Word
          </button>
        </div>

        {/* ─── PUNCTUATION TAB ─── */}
        {tab === "punct" && (
          <div className="relative w-[400px] h-[400px] flex items-center justify-center">
            {/* Centre word */}
            <div className="absolute w-28 h-28 rounded-full bg-white border-[3px] border-rose-400 flex flex-col items-center justify-center shadow-2xl text-center z-10 p-2">
              <span className="text-[9px] text-rose-500 font-black uppercase tracking-wider">Target:</span>
              <span className="text-base font-black font-mono text-slate-800 truncate max-w-full mt-0.5 px-1">{text}</span>
            </div>

            {PUNCTUATION_OPTIONS.map((opt, idx) => {
              const angle = (idx * 360) / PUNCTUATION_OPTIONS.length - 90;
              const radius = 138;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              return (
                <button
                  key={idx}
                  onClick={() => handlePunctSelect(opt.char)}
                  style={{ transform: `translate(${x}px, ${y}px)`, borderColor: opt.color, color: opt.color }}
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
        )}

        {/* ─── CAPITALISE TAB ─── */}
        {tab === "cap" && (
          <div className="w-[360px] bg-white rounded-3xl p-6 shadow-xl border border-blue-200 flex flex-col gap-4">
            <p className="text-xs text-slate-500 font-bold text-center">Select how to change the capitalisation:</p>
            <button
              onClick={() => handlePunctSelect("CAPITALISE")}
              className="w-full p-4 rounded-2xl bg-blue-50 hover:bg-blue-500 hover:text-white border-2 border-blue-200 hover:border-blue-500 font-black text-blue-700 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="text-left">
                <p className="text-lg font-black">Aa  →  Capitalise</p>
                <p className="text-xs font-mono opacity-60 mt-0.5">Result: <em>{capitalisedForm}</em></p>
              </div>
              <span className="text-3xl">🔠</span>
            </button>
            <button
              onClick={() => handlePunctSelect("LOWERCASE")}
              className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-500 hover:text-white border-2 border-slate-200 hover:border-slate-500 font-black text-slate-700 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="text-left">
                <p className="text-lg font-black">aa  →  Lowercase</p>
                <p className="text-xs font-mono opacity-60 mt-0.5">Result: <em>{lowercaseForm}</em></p>
              </div>
              <span className="text-3xl">🔡</span>
            </button>
            <button
              onClick={() => onSelect("")}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-500 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer"
            >
              ✂ Remove trailing punctuation
            </button>
          </div>
        )}

        {/* ─── WORD REPLACE TAB ─── */}
        {tab === "word" && (
          <div className="w-[360px] bg-white rounded-3xl p-6 shadow-xl border border-emerald-200 flex flex-col gap-4">
            <p className="text-xs text-slate-500 font-bold">Replace <span className="font-mono text-slate-700">{text}</span> with:</p>

            {/* Common word replacements */}
            {[
              { from: ["what"], to: ["that", "which"] },
              { from: ["which"], to: ["who", "that"] },
              { from: ["who"], to: ["which", "that"] },
              { from: ["there"], to: ["their", "they're"] },
              { from: ["their"], to: ["there", "they're"] },
              { from: ["i"], to: ["I", "me"] },
              { from: ["me,"], to: ["me,"] },
            ].filter(r => r.from.some(f => text.toLowerCase().includes(f)))
             .flatMap(r => r.to)
             .filter((v, i, a) => a.indexOf(v) === i)
             .map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(suggestion)}
                className="w-full p-3 rounded-xl bg-emerald-50 hover:bg-emerald-500 hover:text-white border-2 border-emerald-200 hover:border-emerald-500 font-black font-mono text-emerald-700 text-left text-base transition-all cursor-pointer"
              >
                {suggestion}
              </button>
            ))}

            {/* Free-form input */}
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleWordReplace(); }}
                placeholder="Type replacement word..."
                className="flex-1 bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 rounded-xl px-3 py-2 text-sm font-bold font-mono text-slate-800 outline-none"
                autoFocus={tab === "word"}
              />
              <button
                onClick={handleWordReplace}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors cursor-pointer text-sm"
              >
                Replace
              </button>
            </div>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white hover:bg-red-500 hover:text-white border-2 border-slate-200 text-slate-400 transition-colors cursor-pointer shadow-lg"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
