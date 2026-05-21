import React from "react";
import { FileText, Heart, AlertTriangle, Play, X, Clipboard, Activity, Droplets } from "lucide-react";

const SEVERITY_COLORS = {
  Mild: { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700", dot: "bg-emerald-500" },
  Moderate: { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-700", dot: "bg-amber-500" },
  Severe: { bg: "bg-orange-50", border: "border-orange-400", text: "text-orange-700", dot: "bg-orange-500" },
  Critical: { bg: "bg-red-50", border: "border-red-400", text: "text-red-700", dot: "bg-red-500" }
};

export default function PatientClipboard({ patient, storyline, onBeginSurgery, onClose, isMidSurgery = false }) {
  if (!patient || !storyline) return null;

  const sev = SEVERITY_COLORS[storyline.severity] || SEVERITY_COLORS.Mild;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
      {/* Clipboard Container */}
      <div className="w-full max-w-3xl animate-clipboard-slide relative">
        {/* Clipboard clip at top */}
        <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 z-20">
          <div className="w-28 h-9 bg-gradient-to-b from-slate-400 to-slate-500 rounded-t-xl border-2 border-slate-500 shadow-md flex items-center justify-center">
            <div className="w-20 h-3 bg-slate-300 rounded-full"></div>
          </div>
        </div>

        {/* Paper body */}
        <div className="paper-texture rounded-2xl border-2 border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 pt-8 relative overflow-hidden">
          {/* Subtle paper line texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, #94a3b8 31px, #94a3b8 32px)" }}>
          </div>

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                  <Clipboard className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">PATIENT ADMISSION FILE</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grammar General Hospital</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">+</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[2px] bg-gradient-to-r from-rose-300 via-sky-300 to-rose-300 rounded-full mb-4"></div>

            {/* 2-Column Clinical Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Left Column: Demographics & Bio */}
              <div className="space-y-4">
                {/* Patient Name */}
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Patient Name</p>
                  <p className="text-2xl font-black text-slate-900 leading-tight">{storyline.patientName}</p>
                </div>

                {/* Age & Blood Type */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Age</p>
                    <p className="text-base font-black text-slate-800">{storyline.age} years</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Blood Type</p>
                    <p className="text-base font-black text-rose-600 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5" />
                      {storyline.bloodType}
                    </p>
                  </div>
                </div>

                {/* Case History */}
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
                  <p className="text-[9px] font-black text-sky-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Case History
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{storyline.caseHistory}</p>
                </div>
              </div>

              {/* Right Column: Diagnosis & Procedure */}
              <div className="space-y-3.5 flex flex-col justify-between">
                <div>
                  {/* Diagnosis */}
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                    <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-0.5 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Primary Diagnosis
                    </p>
                    <p className="text-xs font-bold text-rose-700 leading-relaxed">{storyline.diagnosis}</p>
                  </div>

                  {/* Badges: Severity & Attending Ward */}
                  <div className="flex flex-wrap gap-2 my-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border bg-slate-50 border-slate-200">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Severity:</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${sev.dot} animate-pulse`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-wider ${sev.text}`}>{storyline.severity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border bg-indigo-50 border-indigo-200 text-indigo-700">
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Attending Ward:</span>
                      <span className="text-[10px] font-bold uppercase">{patient.theme || patient.difficulty}</span>
                    </div>
                  </div>

                  {/* Sentence on arrival */}
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Activity className="w-3 h-3" /> Sentence on Arrival
                    </p>
                    <p className="text-xs font-mono text-red-600 font-bold leading-relaxed">"{patient.originalText}"</p>
                  </div>
                </div>

                {/* Action Button */}
                {!isMidSurgery ? (
                  <button
                    onClick={onBeginSurgery}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all active:scale-[0.97] cursor-pointer animate-pulse hover:animate-none border border-emerald-400"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>BEGIN SURGICAL PROCEDURE</span>
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>CLOSE PATIENT FILE</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
