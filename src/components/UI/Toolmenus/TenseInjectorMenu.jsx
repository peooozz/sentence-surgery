import React from "react";
import { Syringe, X } from "lucide-react";

// Full conjugation table — covers every verb used across all 30 sentences
function getConjugates(wordText) {
  const norm = wordText.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, "").trim().toLowerCase();

  const table = {
    // Irregular verbs
    "goes":    [{ text: "went",       tense: "Simple Past (Yesterday…)" },
                { text: "go",         tense: "Base / Present (I, you, we, they…)" },
                { text: "goes",       tense: "Present 3rd-person (he/she/it…)" },
                { text: "will go",    tense: "Future (Tomorrow…)" },
                { text: "gone",       tense: "Past Participle (has gone)" }],

    "go":      [{ text: "went",       tense: "Simple Past" },
                { text: "go",         tense: "Base / Present" },
                { text: "will go",    tense: "Future" },
                { text: "gone",       tense: "Past Participle" }],

    "went":    [{ text: "went",       tense: "Simple Past" },
                { text: "go",         tense: "Base Form" },
                { text: "will go",    tense: "Future" },
                { text: "gone",       tense: "Past Participle (has/would have)" }],

    "gone":    [{ text: "go",         tense: "Base / Present" },
                { text: "went",       tense: "Simple Past" },
                { text: "will go",    tense: "Future" },
                { text: "gone",       tense: "Past Participle (has/would have gone)" }],

    "run":     [{ text: "ran",        tense: "Simple Past" },
                { text: "run",        tense: "Base / Present" },
                { text: "will run",   tense: "Future" },
                { text: "running",    tense: "Present Continuous" }],

    "runned":  [{ text: "ran",        tense: "Simple Past (correct irregular)" },
                { text: "run",        tense: "Base Form" },
                { text: "will run",   tense: "Future" },
                { text: "running",    tense: "Present Continuous" }],

    "ran":     [{ text: "ran",        tense: "Simple Past" },
                { text: "run",        tense: "Base Form" },
                { text: "will run",   tense: "Future" }],

    "see":     [{ text: "saw",        tense: "Simple Past" },
                { text: "see",        tense: "Base / Present" },
                { text: "will see",   tense: "Future" },
                { text: "seen",       tense: "Past Participle (has seen)" }],

    "seen":    [{ text: "saw",        tense: "Simple Past ✓" },
                { text: "see",        tense: "Base / Present" },
                { text: "will see",   tense: "Future" },
                { text: "seen",       tense: "Past Participle (has seen)" }],

    "saw":     [{ text: "saw",        tense: "Simple Past" },
                { text: "see",        tense: "Base / Present" },
                { text: "will see",   tense: "Future" },
                { text: "seen",       tense: "Past Participle" }],

    "write":   [{ text: "wrote",      tense: "Simple Past" },
                { text: "write",      tense: "Base / Present" },
                { text: "will write", tense: "Future" },
                { text: "written",    tense: "Past Participle (has written) ✓" }],

    "wrote":   [{ text: "written",    tense: "Past Participle (has written) ✓" },
                { text: "wrote",      tense: "Simple Past" },
                { text: "write",      tense: "Base / Present" },
                { text: "will write", tense: "Future" }],

    "written": [{ text: "written",    tense: "Past Participle ✓" },
                { text: "wrote",      tense: "Simple Past" },
                { text: "write",      tense: "Base / Present" }],

    // be verbs
    "was":     [{ text: "were",       tense: "Past Plural / Subjunctive (they/you/if I…) ✓" },
                { text: "was",        tense: "Past Singular (I/he/she/it…)" },
                { text: "is",         tense: "Present Singular" },
                { text: "are",        tense: "Present Plural" },
                { text: "will be",    tense: "Future" }],

    "were":    [{ text: "was",        tense: "Past Singular (he/she/it…) ✓" },
                { text: "were",       tense: "Past Plural / Subjunctive" },
                { text: "are",        tense: "Present Plural" },
                { text: "will be",    tense: "Future" }],

    // Visit
    "visited": [{ text: "will visit", tense: "Future ✓ (Tomorrow…)" },
                { text: "visited",    tense: "Simple Past" },
                { text: "visit",      tense: "Base / Present" },
                { text: "visits",     tense: "Present 3rd-person" }],

    "visit":   [{ text: "will visit", tense: "Future" },
                { text: "visited",    tense: "Simple Past" },
                { text: "visit",      tense: "Base / Present" }],

    // Come
    "comes":   [{ text: "came",       tense: "Simple Past ✓" },
                { text: "come",       tense: "Base / Present" },
                { text: "comes",      tense: "Present 3rd-person" },
                { text: "will come",  tense: "Future" }],

    "come":    [{ text: "came",       tense: "Simple Past" },
                { text: "come",       tense: "Base / Present" },
                { text: "will come",  tense: "Future" }],

    "came":    [{ text: "came",       tense: "Simple Past ✓" },
                { text: "come",       tense: "Base / Present" },
                { text: "will come",  tense: "Future" }],

    // have / has
    "of":      [{ text: "have",       tense: "Correct auxiliary ✓ (would have)" },
                { text: "has",        tense: "3rd-person singular auxiliary" },
                { text: "had",        tense: "Past auxiliary" }],

    "has":     [{ text: "have",       tense: "1st/2nd/plural form ✓ (I have)" },
                { text: "has",        tense: "3rd-person singular (he/she/it has)" },
                { text: "had",        tense: "Past form" }],

    "have":    [{ text: "have",       tense: "Present (I/you/we/they)" },
                { text: "has",        tense: "Present 3rd-person (he/she/it)" },
                { text: "had",        tense: "Past" }],
  };

  if (table[norm]) return table[norm];

  // Generic fallback
  return [
    { text: `${wordText}ed`, tense: "Simple Past (regular)" },
    { text: wordText,        tense: "Present / Base Form" },
    { text: `will ${wordText}`, tense: "Future" },
    { text: `${wordText}ing`,   tense: "Present Continuous" }
  ];
}

export default function TenseInjectorMenu({ word, onSelect, onClose }) {
  const conjugates = getConjugates(word.currentText);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto">
      <div className="w-full max-w-md rounded-[32px] bg-white border-2 border-sky-300 p-8 shadow-2xl relative animate-scale-up">

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-sky-100 pb-5 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-500 animate-pulse">
            <Syringe className="w-7 h-7 rotate-45" />
          </div>
          <div>
            <h3 className="font-black text-lg text-sky-700">Tense Serum Infusion</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target verb: <strong className="font-mono text-slate-700 text-sm">{word.currentText}</strong>
            </p>
          </div>
        </div>

        {/* Hint */}
        {word.hint && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 font-semibold">
            💡 {word.hint}
          </div>
        )}

        {/* Serum gauge */}
        <div className="w-full h-9 bg-sky-50 border border-sky-200 rounded-xl mb-5 relative overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute top-0 bottom-0 left-0 bg-sky-300/60 w-[85%] rounded-l-xl" />
          <span className="text-[11px] text-sky-700 font-black tracking-widest uppercase z-10">SERUM LEVEL: 85%</span>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {conjugates.map((conj, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(conj.text)}
              className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-400 text-left transition-all active:scale-[0.98] cursor-pointer flex justify-between items-center group"
            >
              <div>
                <p className="text-base font-black font-mono text-slate-800 group-hover:text-sky-700 transition-colors">
                  {conj.text}
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">{conj.tense}</p>
              </div>
              <span className="text-xs font-black px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors uppercase tracking-wide">
                INJECT
              </span>
            </button>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border border-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
