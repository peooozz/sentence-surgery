import React from "react";
import { useGame } from "../GameProvider";
import { BookOpen, ArrowLeft, RotateCcw, AlertTriangle, Clock, ShieldCheck } from "lucide-react";

export default function PatientRecords() {
  const { patientRecords, setGameState, startPatient } = useGame();

  const handleRetry = (record) => {
    startPatient(record.level, record.patientId - 1);
  };

  return (
    <div className="fixed inset-0 z-30 bg-gradient-to-b from-slate-50/95 to-white/95 backdrop-blur-md flex flex-col p-6 overflow-y-auto pt-28">
      {/* Top Bar */}
      <div className="max-w-4xl w-full mx-auto flex justify-between items-center mb-6">
        <button
          onClick={() => setGameState("menu")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl glass-panel-pink border border-rose-200 text-xs font-bold text-rose-600 hover:scale-105 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinic</span>
        </button>
        
        <div>
          <p className="text-xs text-slate-400 font-semibold">TREATED CASES</p>
          <p className="text-lg font-extrabold text-sky-600">
            {patientRecords.length} Discharged Patients
          </p>
        </div>
      </div>

      {/* Main Records Cabinet */}
      <div className="max-w-4xl w-full mx-auto flex-1 bg-white border-2 border-slate-200 rounded-3xl p-6 glass-panel flex flex-col shadow-lg overflow-hidden">
        <div className="text-center mb-6 shrink-0">
          <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-rose-500 to-sky-500 bg-clip-text inline-flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-sky-500" />
            <span>Patient Record Archives</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse through history files of sentences you have successfully cured, or retry operations to improve stats.
          </p>
        </div>

        {/* List of records */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {patientRecords.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-6">
              <BookOpen className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm font-semibold">No medical charts archived yet.</p>
              <p className="text-xs opacity-80 mt-1">Perform surgeries on sentence patients to populate the archives!</p>
            </div>
          ) : (
            patientRecords.map((record) => (
              <div 
                key={record.id} 
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-sky-300 transition-colors"
              >
                {/* Sentence and grammar summary */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-sky-50 border border-sky-200 text-[10px] font-bold text-sky-700 rounded">
                      {record.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{record.date}</span>
                  </div>
                  
                  <div className="space-y-1 pt-1.5">
                    <p className="text-xs text-red-500 line-through decoration-red-300 font-mono">
                      {record.original}
                    </p>
                    <p className="text-sm text-emerald-600 font-semibold font-mono flex items-center gap-1.5">
                      <span className="text-[11px] px-1 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-700 font-sans font-bold">CURED</span>
                      {record.corrected}
                    </p>
                  </div>
                </div>

                {/* Operations Stats */}
                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between border-t border-slate-100 pt-3 sm:pt-0 sm:border-none">
                  <div className="flex gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1" title="Errors Made">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>{record.errorsMade} {record.errorsMade === 1 ? "Error" : "Errors"}</span>
                    </span>
                    <span className="flex items-center gap-1" title="Time taken">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      <span>{record.timeTaken}s</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600" title="XP Gained">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>+{record.xpEarned} XP</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleRetry(record)}
                    className="p-2 rounded-xl bg-white hover:bg-sky-50 hover:text-sky-600 border border-slate-200 hover:border-sky-300 text-slate-400 transition-all cursor-pointer"
                    title="Retry this Patient Surgery"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
