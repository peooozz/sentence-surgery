import React, { useState, useEffect } from "react";
import { X, Search, CheckCircle } from "lucide-react";

// Dictionary mapping misspelled words to correct suggestions
const SPELLING_DICTIONARY = {
  "recieve":       ["receive", "recieve", "received", "recieving"],
  "wenesday":      ["Wednesday", "Wenesday", "Wendesday", "Wednesdays"],
  "definately":    ["definitely", "definately", "definitly", "definite"],
  "tommorrow":     ["tomorrow", "tommorrow", "tomorow", "to-morrow"],
  "libary":        ["library", "libary", "librery", "libraries"],
  "committie":     ["committee", "committie", "commitee", "comittee"],
  "comittee":      ["committee", "comittee", "commitee", "committie"],
  "responsability": ["responsibility", "responsability", "responsibilities", "responserbility"],
  "enviroment":    ["environment", "enviroment", "environments", "enviromant"],
  "enviromental":  ["environmental", "enviromental", "environmentally", "environmental"],
  "beautifuly":    ["beautifully", "beautifuly", "beautyfully", "beautiful"],
  "rehersal":      ["rehearsal", "rehersal", "rehearsel", "rehearsels"],
  "principle":     ["principal", "principle", "principles", "principals"],
  "occurance":     ["occurrence", "occurance", "occurence", "occurrences"],
  "alot":          ["a lot", "alot", "allot", "a-lot"],
  "beleive":       ["believe", "beleive", "belive", "believes"],
  "grammer":       ["grammar", "grammer", "gramer", "grammars"],
  "speach":        ["speech", "speach", "speeches", "spech"],
  "wierd":         ["weird", "wierd", "werd", "weirdly"],
  "threw":         ["through", "threw", "thru", "throw"],
  "forrest":       ["forest", "forrest", "forests", "forrests"],
  "acording":      ["according", "acording", "accordially", "accord"],
  "proffessor":    ["professor", "proffessor", "profeser", "professors"],
  "succesfully":   ["successfully", "succesfully", "successfuly", "success"],
  "prooves":       ["proves", "prooves", "prove", "proven"],
  "hypothesus":    ["hypothesis", "hypothesus", "hypothesises", "hypotheses"],
  "adress":        ["address", "adress", "addresses", "addressed"],
  "immediatly":    ["immediately", "immediatly", "immedately", "immediate"],
  "ceramony":      ["ceremony", "ceramony", "ceremonies", "ceremonials"]
};

function getSpellingSuggestions(wordText) {
  const norm = wordText.toLowerCase().replace(/[^a-z]/g, "").trim();
  if (SPELLING_DICTIONARY[norm]) {
    // Retain matching capitalization if the original word was capitalized
    const suggestions = SPELLING_DICTIONARY[norm];
    const isCapitalized = wordText[0] === wordText[0].toUpperCase() && wordText[0] !== wordText[0].toLowerCase();
    
    if (isCapitalized) {
      return suggestions.map(s => s[0].toUpperCase() + s.slice(1));
    }
    return suggestions;
  }
  // Generic suggestions if not found
  return [wordText, `${wordText}e`, `${wordText}s`].filter(Boolean);
}

export default function SpellScannerMenu({ word, onSelect, onClose }) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const suggestions = getSpellingSuggestions(word.currentText);

  // Scan simulation
  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 12;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
      <div className="w-full max-w-sm rounded-2xl bg-violet-50 border-4 border-black p-6 shadow-[8px_8px_0px_#000000] relative animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet-600 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000000] text-white">
            🔬
          </div>
          <div>
            <h3 className="font-extrabold text-black text-lg comic-header tracking-wide uppercase">Spell Scanner</h3>
            <p className="text-xs text-slate-700 font-bold">
              Target Infected Area: <span className="font-mono bg-red-100 text-red-600 border border-black px-1.5 py-0.5 rounded text-sm underline decoration-wavy decoration-red-600">{word.currentText}</span>
            </p>
          </div>
        </div>

        {/* Scanning State */}
        {scanning ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full h-10 bg-slate-200 border-3 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_#000000]">
              {/* Scan beam */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-violet-500 transition-all duration-75 flex items-center justify-end pr-2 font-black text-white text-xs select-none"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
              <div className="absolute inset-0 scan-gradient pointer-events-none"></div>
            </div>
            <p className="font-black text-black text-sm uppercase tracking-widest animate-pulse flex items-center gap-2">
              <Search className="w-4 h-4 text-violet-600 animate-spin" />
              Scanning for spelling pathogens...
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-scale-up">
            {/* Sentence Hint */}
            {word.hint && (
              <div className="bg-orange-200 border-2 border-black p-3 rounded-lg text-xs text-black font-extrabold shadow-[2px_2px_0px_#000000]">
                💡 Diagnostics: {word.hint}
              </div>
            )}

            <div>
              <p className="text-xs text-black font-black uppercase tracking-wider mb-2">Select correct replacement:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelect(s)}
                    className="p-3 text-center rounded-xl bg-white border-3 border-black hover:bg-violet-100 text-black font-bold font-mono text-sm transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97] shadow-[3px_3px_0px_#000000] flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4 text-violet-600 shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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
