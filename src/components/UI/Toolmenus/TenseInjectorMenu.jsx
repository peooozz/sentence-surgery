import React from "react";
import { Syringe, X } from "lucide-react";

function getConjugates(wordText) {
  const normalized = wordText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim().toLowerCase();
  if (normalized === "goes") return [{ text: "went", tense: "Past Tense (Yesterday...)" }, { text: "goes", tense: "Present Tense (Today...)" }, { text: "will go", tense: "Future Tense (Tomorrow...)" }, { text: "gone", tense: "Past Participle (has...)" }];
  if (normalized === "runned") return [{ text: "ran", tense: "Past Tense (Yesterday...)" }, { text: "runs", tense: "Present Tense (Today...)" }, { text: "will run", tense: "Future Tense (Tomorrow...)" }, { text: "running", tense: "Present Continuous" }];
  if (normalized === "visited") return [{ text: "visited", tense: "Past Tense" }, { text: "visits", tense: "Present Tense" }, { text: "will visit", tense: "Future Tense" }, { text: "visiting", tense: "Present Continuous" }];
  if (normalized === "wrote") return [{ text: "wrote", tense: "Past Tense" }, { text: "writes", tense: "Present Tense" }, { text: "will write", tense: "Future Tense" }, { text: "written", tense: "Past Participle (has...)" }];
  if (normalized === "gone") return [{ text: "went", tense: "Past Tense" }, { text: "go", tense: "Present Tense" }, { text: "will go", tense: "Future Tense" }, { text: "gone", tense: "Past Participle" }];
  if (normalized === "seen") return [{ text: "saw", tense: "Past Tense" }, { text: "sees", tense: "Present Tense" }, { text: "will see", tense: "Future Tense" }, { text: "seen", tense: "Past Participle" }];
  if (normalized === "was") return [{ text: "was", tense: "Past Singular (I, he, she, it...)" }, { text: "were", tense: "Past Plural / Subjunctive (you, we, they...)" }, { text: "am / is", tense: "Present Singular" }, { text: "are", tense: "Present Plural" }];
  if (normalized === "comes") return [{ text: "came", tense: "Past Tense" }, { text: "comes", tense: "Present Tense" }, { text: "will come", tense: "Future Tense" }, { text: "coming", tense: "Present Continuous" }];
  if (normalized === "were") return [{ text: "was", tense: "Past Singular" }, { text: "were", tense: "Past Plural" }, { text: "are", tense: "Present Plural" }, { text: "will be", tense: "Future Tense" }];
  if (normalized === "would") return [{ text: "would of", tense: "Incorrect Spoken Form" }, { text: "would have", tense: "Correct Written Form" }, { text: "will have", tense: "Future Perfect" }];
  return [{ text: `${wordText}ed`, tense: "Past Tense" }, { text: wordText, tense: "Present Tense" }, { text: `will ${wordText}`, tense: "Future Tense" }];
}

export default function TenseInjectorMenu({ word, onSelect, onClose }) {
  const conjugates = getConjugates(word.currentText);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
      <div className="w-full max-w-md rounded-[32px] bg-white border-2 border-sky-300 p-8 shadow-xl relative animate-scale-up">
        
        <div className="flex items-center gap-4 border-b border-sky-100 pb-5 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-500 animate-pulse">
            <Syringe className="w-7 h-7 rotate-45" />
          </div>
          <div>
            <h3 className="font-black text-lg text-sky-700">Tense Serum Infusion</h3>
            <p className="text-xs text-slate-400 mt-0.5">Target Verb: <strong className="font-mono text-slate-700 text-sm">{word.currentText}</strong></p>
          </div>
        </div>

        {/* Syringe fluid gauge */}
        <div className="w-full h-10 bg-sky-50 border border-sky-200 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute top-0 bottom-0 left-0 bg-sky-300/60 animate-pulse shadow-[0_0_12px_rgba(14,165,233,0.4)] w-[85%] rounded-l-xl"></div>
          <span className="text-[11px] text-sky-700 font-black tracking-widest uppercase z-10 animate-pulse">SERUM LEVEL: 85%</span>
        </div>

        <div className="space-y-4">
          {conjugates.map((conj, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(conj.text)}
              className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-400 text-left transition-all active:scale-[0.98] cursor-pointer flex justify-between items-center group"
            >
              <div>
                <p className="text-base font-black font-mono text-slate-800 group-hover:text-sky-700 transition-colors">{conj.text}</p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">{conj.tense}</p>
              </div>
              <span className="text-xs font-black px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors uppercase tracking-wide">
                INJECT
              </span>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border border-slate-200">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
