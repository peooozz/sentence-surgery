import React from "react";
import { X, Check } from "lucide-react";

// Dictionary mapping base pronouns to grammatical case variations
const PRONOUN_GROUPS = {
  "me":      ["I", "me", "my", "myself"],
  "him":     ["he", "him", "his", "himself"],
  "her":     ["she", "her", "hers", "herself"],
  "i":       ["I", "me", "my", "myself"],
  "he":      ["he", "him", "his", "himself"],
  "she":     ["she", "her", "hers", "herself"],
  "which":   ["who", "which", "that", "whom"],
  "who":     ["who", "whom", "whose", "which"],
  "whom":    ["who", "whom", "whose", "which"],
  "there":   ["their", "there", "they're", "theirs"],
  "their":   ["their", "there", "they're", "theirs"],
  "theyre":  ["they're", "their", "there", "theirs"],
  "its":     ["its", "it's", "it"],
  "us":      ["we", "us", "our", "ourselves"],
  "we":      ["we", "us", "our", "ourselves"],
  "them":    ["they", "them", "their", "themselves"],
  "they":    ["they", "them", "their", "themselves"]
};

function getPronounSuggestions(wordText) {
  const norm = wordText.toLowerCase().replace(/[^a-z']/g, "").trim();
  if (PRONOUN_GROUPS[norm]) {
    const suggestions = PRONOUN_GROUPS[norm];
    const isCapitalized = wordText[0] === wordText[0].toUpperCase() && wordText[0] !== wordText[0].toLowerCase();
    
    if (isCapitalized) {
      return suggestions.map(s => s[0].toUpperCase() + s.slice(1));
    }
    return suggestions;
  }
  // Generic fallback if not mapped
  return ["he", "him", "they", "them", "who", "whom"];
}

export default function PronounTweezersMenu({ word, onSelect, onClose }) {
  const currentText = word.currentText;
  const suggestions = getPronounSuggestions(currentText);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
      <div className="w-full max-w-sm rounded-2xl bg-amber-50 border-4 border-black p-6 shadow-[8px_8px_0px_#000000] relative animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-500 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000000] text-black">
            🪡
          </div>
          <div>
            <h3 className="font-extrabold text-black text-lg comic-header tracking-wide uppercase">Pronoun Tweezers</h3>
            <p className="text-xs text-slate-700 font-bold">
              Target Pronoun: <span className="font-mono bg-white border border-black px-1.5 py-0.5 rounded text-black text-sm">{currentText}</span>
            </p>
          </div>
        </div>

        {/* Diagnostic Hint */}
        {word.hint && (
          <div className="mb-4 bg-orange-200 border-2 border-black p-3 rounded-lg text-xs text-black font-extrabold shadow-[2px_2px_0px_#000000]">
            💡 Hint: {word.hint}
          </div>
        )}

        {/* Suggestions */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-black font-black uppercase tracking-wider mb-2">Adjust pronoun case alignment:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelect(s)}
                  className="p-3 text-center rounded-xl bg-white border-3 border-black hover:bg-yellow-100 text-black font-bold font-mono text-sm transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97] shadow-[3px_3px_0px_#000000] flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-yellow-600 shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white border-2 border-black text-black hover:bg-rose-100 transition-colors cursor-pointer shadow-[2px_2px_0px_#000000]"
        >
          <X className="w-4 h-4 font-extrabold" />
        </button>
      </div>
    </div>
  );
}
