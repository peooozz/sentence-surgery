import React, { useState } from "react";
import { useGame, RANKS } from "../GameProvider";
import { Settings, Award, ClipboardList, HelpCircle, Volume2, VolumeX, Eye, BookOpen, Clipboard } from "lucide-react";

export default function Dashboard({ onOpenClipboard }) {
  const {
    gameState,
    setGameState,
    xp,
    rank,
    currentSkin,
    setCurrentSkin,
    unlockedSkins,
    settings,
    changeSettings,
    startPatient,
    earnedTrophies,
    activePatient
  } = useGame();

  const [showSettings, setShowSettings] = useState(false);

  // Find next rank details
  const currentRankIdx = RANKS.findIndex(r => r.name === rank);
  const nextRank = RANKS[currentRankIdx + 1] || null;
  const currentRankMin = RANKS[currentRankIdx]?.minXp || 0;
  
  let xpPercent = 100;
  if (nextRank) {
    const range = nextRank.minXp - currentRankMin;
    const progress = xp - currentRankMin;
    xpPercent = Math.min(100, Math.max(0, (progress / range) * 100));
  }

  return (
    <>
      {/* Header HUD panel - HOSPITAL WHITE */}
      <header className="fixed top-0 left-0 right-0 z-40 p-5 flex justify-between items-center pointer-events-none">
        {/* Left Side: Logo & Rank */}
        <div className="flex items-center gap-5 pointer-events-auto">
          <button 
            onClick={() => setGameState("menu")}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel-pink border-2 border-rose-200 hover:scale-105 transition-all cursor-pointer group shadow-md"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">🏥</span>
            <span className="font-black text-base tracking-wider bg-gradient-to-r from-rose-500 via-slate-700 to-sky-500 bg-clip-text text-transparent drop-shadow-sm font-sans">
              SENTENCE SURGEON
            </span>
          </button>

          {/* XP & Rank HUD */}
          <div className="flex flex-col px-5 py-2.5 rounded-2xl glass-panel-skyblue border border-sky-200 min-w-[260px] shadow-md">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="font-extrabold text-sky-700 tracking-wide uppercase">{rank}</span>
              <span className="text-xs text-slate-600 font-extrabold">{xp} XP</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-3 bg-sky-100 rounded-full mt-1.5 overflow-hidden p-[1px] border border-sky-200">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 to-rose-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
            {nextRank && (
              <span className="text-[10px] text-slate-500 text-right mt-1 font-bold">
                {nextRank.minXp - xp} XP to {nextRank.name}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Navigation & Settings */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Patient clipboard button (during surgery) */}
          {gameState === "surgery" && activePatient && onOpenClipboard && (
            <button
              onClick={onOpenClipboard}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all text-xs font-black uppercase tracking-wider shadow-md glass-panel border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <Clipboard className="w-4 h-4 text-amber-600" />
              <span>Case File</span>
            </button>
          )}

          {/* Cabinet buttons */}
          <button
            onClick={() => setGameState("trophies")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all text-xs font-black uppercase tracking-wider shadow-md ${
              gameState === "trophies" 
                ? "bg-rose-50 border-rose-400 text-rose-700" 
                : "glass-panel border-slate-200 text-slate-600 hover:bg-rose-50 hover:border-rose-300"
            }`}
          >
            <Award className="w-4 h-4 text-rose-500" />
            <span>Trophies ({earnedTrophies.length})</span>
          </button>

          <button
            onClick={() => setGameState("records")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all text-xs font-black uppercase tracking-wider shadow-md ${
              gameState === "records" 
                ? "bg-sky-50 border-sky-400 text-sky-700" 
                : "glass-panel border-slate-200 text-slate-600 hover:bg-sky-50 hover:border-sky-300"
            }`}
          >
            <ClipboardList className="w-4 h-4 text-sky-500" />
            <span>Records</span>
          </button>

          {/* Skin selector */}
          {gameState === "menu" && (
            <div className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-2xl border border-slate-200 shadow-md">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">Theatre:</span>
              <select
                value={currentSkin}
                onChange={(e) => setCurrentSkin(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-bold text-sky-700 rounded-xl p-1.5 outline-none cursor-pointer"
              >
                {unlockedSkins.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {/* Settings gear */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 rounded-2xl glass-panel border-2 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all shadow-md"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Settings Modal Dialog Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border-2 border-slate-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative animate-scale-up">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Settings className="w-6 h-6 text-rose-500" />
              <span>Surgical Settings</span>
            </h2>

            <div className="space-y-5 text-sm font-semibold">
              {/* Voice Assist Toggle */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  {settings.voiceEnabled ? <Volume2 className="w-5 h-5 text-rose-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                  <div>
                    <p className="font-bold text-slate-800">Nurse Clara Voice</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Speaks error reports and explanations</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled}
                  onChange={(e) => changeSettings("voiceEnabled", e.target.checked)}
                  className="w-6 h-6 accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Text Sizing Scale */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-sky-500" />
                  <div>
                    <p className="font-bold text-slate-800">Sentence Text Size</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Scale the size of the 3D block letters</p>
                  </div>
                </div>
                <select
                  value={settings.textScale}
                  onChange={(e) => changeSettings("textScale", e.target.value)}
                  className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl p-2 outline-none"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">X-Large</option>
                </select>
              </div>

              {/* Colorblind Assistive Mode */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-bold text-slate-800">Colorblind Assistance</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Enhance wound shapes and pattern overlays</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.colorblindMode}
                  onChange={(e) => changeSettings("colorblindMode", e.target.checked)}
                  className="w-6 h-6 accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Optional Timer */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="font-bold text-slate-800">Surgery Timer (Level 3+)</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Enable surgery speed bonus clock</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.timerToggle}
                  onChange={(e) => changeSettings("timerToggle", e.target.checked)}
                  className="w-6 h-6 accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="mt-8 w-full py-3.5 bg-gradient-to-r from-rose-500 to-sky-500 hover:opacity-90 rounded-2xl font-black text-sm text-white shadow-lg transition-all cursor-pointer"
            >
              CLOSE SETTINGS
            </button>
          </div>
        </div>
      )}
    </>
  );
}
