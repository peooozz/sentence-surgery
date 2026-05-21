import React, { useState } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

export default function PrecisionZoom({ word, onSelect, onClose }) {
  const [input, setInput] = useState(word.currentText);

  const handleSubmit = () => {
    if (input.trim().length === 0) return;
    onSelect(input.trim());
  };

  const suggestions = [];
  const lowered = word.currentText.toLowerCase().replace(/[^a-z]/g, "");
  if (lowered === "dont") suggestions.push("don't", "do not");
  if (lowered === "doesnt") suggestions.push("doesn't", "does not");
  if (lowered === "cant") suggestions.push("can't", "cannot");
  if (lowered === "its" && word.errorType === "apostrophe") suggestions.push("it's", "its");
  if (lowered === "doctors") suggestions.push("doctor's", "doctors'", "doctors");
  if (lowered === "childrens") suggestions.push("children's");
  if (lowered === "isnt") suggestions.push("isn't", "is not");
  if (lowered === "lets") suggestions.push("let's", "lets");
  if (lowered === "thats") suggestions.push("that's", "thats");
  if (lowered === "peoples") suggestions.push("people's", "peoples'");
  if (suggestions.length === 0) {
    suggestions.push(`${word.currentText}'s`, `${word.currentText}'`, word.currentText);
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
      <div className="w-full max-w-sm rounded-[32px] bg-white border-2 border-purple-300 p-6 shadow-xl relative animate-scale-up">
        
        <div className="flex items-center gap-3 border-b border-purple-100 pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-2xl animate-pulse">
            💎
          </div>
          <div>
            <h3 className="font-extrabold text-purple-700">Apostrophe Implant Surgery</h3>
            <p className="text-[10px] text-slate-400">
              Target: <strong className="font-mono text-slate-700 text-sm">{word.currentText}</strong>
            </p>
          </div>
        </div>

        {/* Quick Pick Suggestions */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 font-semibold mb-2">Quick-Pick Implant Options:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(s)}
                className="px-4 py-2 rounded-xl bg-purple-50 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-100 text-slate-800 font-bold font-mono text-sm transition-all cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Freeform Input */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 font-semibold">Or type the corrected word manually:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 border-2 border-slate-200 focus:border-purple-400 rounded-xl px-4 py-2 text-base font-bold font-mono outline-none text-slate-800 transition-colors"
              placeholder="type correction"
              spellCheck={false}
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs">IMPLANT</span>
            </button>
          </div>
        </div>

        {/* Help hint */}
        <div className="mt-4 flex gap-2 items-start bg-amber-50 p-3 rounded-xl text-xs text-amber-700 border border-amber-200 font-semibold">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
          <span>{word.hint || "Place the apostrophe accurately inside the word to indicate contraction or possession."}</span>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border border-slate-200">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
