import React from "react";
import { X, Check } from "lucide-react";

export default function CommaScissorsMenu({ word, onSelect, onClose }) {
  const currentText = word.currentText;
  
  // Clean word (no trailing punctuation)
  const baseWord = currentText.replace(/[.,;]/g, "");

  // Generate scissor options based on the current word's state
  const options = [];

  if (currentText.endsWith(",")) {
    options.push({
      label: "Remove Comma ✂️",
      value: baseWord,
      desc: `Strip trailing comma from "${currentText}"`
    });
    options.push({
      label: "Replace with Semicolon ( ; ) 🪡",
      value: `${baseWord};`,
      desc: "Fix comma splices by connecting independent clauses"
    });
    options.push({
      label: "Replace with Period ( . ) 🛑",
      value: `${baseWord}.`,
      desc: "Separate into two distinct sentences"
    });
  } else if (currentText.endsWith(";") || currentText.endsWith(".")) {
    options.push({
      label: "Change to Comma ( , ) ✂️",
      value: `${baseWord},`,
      desc: "Connect clauses with a coordinating conjunction"
    });
    options.push({
      label: "Remove Punctuation 🧽",
      value: baseWord,
      desc: "Remove trailing punctuation completely"
    });
  } else {
    // Word has no comma/semicolon/period
    options.push({
      label: "Add Comma ( , ) ✂️",
      value: `${baseWord},`,
      desc: `Append a comma to "${currentText}"`
    });
    options.push({
      label: "Add Semicolon ( ; ) ⚡",
      value: `${baseWord};`,
      desc: "Add a semicolon to split independent clauses"
    });
    options.push({
      label: "Add Period ( . ) 🛑",
      value: `${baseWord}.`,
      desc: "Complete the sentence with a full stop"
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
      <div className="w-full max-w-sm rounded-2xl bg-yellow-50 border-4 border-black p-6 shadow-[8px_8px_0px_#000000] relative animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-pink-500 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000000]">
            ✂️
          </div>
          <div>
            <h3 className="font-extrabold text-black text-lg uppercase comic-header tracking-wide">Comma Scissors</h3>
            <p className="text-xs text-slate-700 font-bold">
              Target: <span className="font-mono bg-white border border-black px-1.5 py-0.5 rounded text-black text-sm">{currentText}</span>
            </p>
          </div>
        </div>

        {/* Sentence Hint */}
        {word.hint && (
          <div className="mb-4 bg-orange-200 border-2 border-black p-3 rounded-lg text-xs text-black font-extrabold shadow-[2px_2px_0px_#000000]">
            💡 Hint: {word.hint}
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          <p className="text-xs text-black font-black uppercase tracking-wider mb-1">Select incision pattern:</p>
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(opt.value)}
              className="w-full text-left p-3 rounded-xl bg-white border-3 border-black hover:bg-pink-100 text-black transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-[3px_3px_0px_#000000] flex flex-col justify-start"
            >
              <span className="font-black text-sm text-pink-600 flex items-center gap-2">
                <Check className="w-4 h-4 text-black shrink-0" />
                {opt.label}
              </span>
              <span className="text-[10px] text-slate-700 font-bold font-mono mt-0.5 pl-6">
                Result: "{opt.value}" — {opt.desc}
              </span>
            </button>
          ))}
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
