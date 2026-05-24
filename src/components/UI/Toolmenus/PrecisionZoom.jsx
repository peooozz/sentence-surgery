import React, { useState } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

// All apostrophe words used across all 30 sentences
const APOSTROPHE_MAP = {
  "its":       ["It's", "its"],
  "isnt":      ["isn't", "is not"],
  "dont":      ["doesn't", "don't", "do not"],
  "doesnt":    ["doesn't", "does not"],
  "cant":      ["can't", "cannot"],
  "wont":      ["won't", "will not"],
  "wasnt":     ["wasn't", "was not"],
  "werent":    ["weren't", "were not"],
  "didnt":     ["didn't", "did not"],
  "couldnt":   ["couldn't", "could not"],
  "wouldnt":   ["wouldn't", "would not"],
  "shouldnt":  ["shouldn't", "should not"],
  "havent":    ["haven't", "have not"],
  "hasnt":     ["hasn't", "has not"],
  "doctors":   ["doctor's", "doctors'", "doctors"],
  "mailmans":  ["mailman's"],
  "alisons":   ["Alison's"],
  "childrens": ["children's"],
  "lets":      ["let's", "lets"],
  "thats":     ["that's"],
  "peoples":   ["people's"],
  "whos":      ["who's", "whose"],
  "theyre":    ["they're"],
  "youre":     ["you're"],
  "hes":       ["he's"],
  "shes":      ["she's"],
  "ive":       ["I've"],
  "id":        ["I'd"],
  "ill":       ["I'll"],
};

function getSuggestions(wordText) {
  const key = wordText.toLowerCase().replace(/[^a-z]/g, "");
  if (APOSTROPHE_MAP[key]) return APOSTROPHE_MAP[key];
  // Generic fallback: offer 's and ' forms
  return [`${wordText}'s`, `${wordText}'`, wordText];
}

export default function PrecisionZoom({ word, onSelect, onClose }) {
  const [input, setInput] = useState(word.currentText);
  const suggestions = getSuggestions(word.currentText);

  const handleSubmit = () => {
    if (input.trim().length === 0) return;
    onSelect(input.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto">
      <div className="w-full max-w-sm rounded-[32px] bg-white border-2 border-purple-300 p-6 shadow-2xl relative animate-scale-up">

        {/* Header */}
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

        {/* Hint */}
        {word.hint && (
          <div className="mb-4 flex gap-2 items-start bg-amber-50 p-3 rounded-xl text-xs text-amber-700 border border-amber-200 font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
            <span>{word.hint}</span>
          </div>
        )}

        {/* Quick-pick suggestions */}
        <div className="mb-5">
          <p className="text-xs text-slate-500 font-semibold mb-2">Quick-Pick Implant Options:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(s)}
                className="px-4 py-2.5 rounded-xl bg-purple-50 border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-100 text-slate-800 font-bold font-mono text-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Manual input */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 font-semibold">Or type the correction manually:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
              className="flex-1 bg-slate-50 border-2 border-slate-200 focus:border-purple-400 rounded-xl px-4 py-2 text-base font-bold font-mono outline-none text-slate-800 transition-colors"
              placeholder="type correction"
              spellCheck={false}
              autoFocus
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

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border border-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
