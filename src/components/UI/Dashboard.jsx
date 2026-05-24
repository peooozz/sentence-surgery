// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\components\UI\Dashboard.jsx
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
      {/* Header HUD panel - Comic Panel Style */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center pointer-events-none select-none">
        
        {/* Left Side: Logo & Rank Progress */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={() => setGameState("menu")}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-yellow-400 border-3 border-black text-black hover:bg-yellow-300 transition-all cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] rounded-xl group"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">🏥</span>
            <span className="font-black text-sm tracking-wider comic-header uppercase">
              Sentence Surgeon
            </span>
          </button>

          {/* XP & Rank HUD */}
          <div className="flex flex-col px-4 py-2 bg-white border-3 border-black text-black rounded-xl shadow-[3px_3px_0px_#000000] min-w-[250px] comic-text">
            <div className="flex justify-between items-center text-[10px] font-black tracking-wide uppercase">
              <span className="text-pink-600">{rank}</span>
              <span>{xp} XP</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-3.5 bg-slate-200 rounded border-2 border-black mt-1 overflow-hidden p-[1px]">
              <div 
                className="h-full bg-sky-400 border-r-2 border-black rounded-sm transition-all duration-500 shadow-sm"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
            {nextRank && (
              <span className="text-[9px] text-slate-500 text-right mt-1 font-bold">
                {nextRank.minXp - xp} XP TO NEXT LEVEL
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Navigation & Settings */}
        <div className="flex items-center gap-2 pointer-events-auto">
          
          {/* Patient clipboard button */}
          {gameState === "surgery" && activePatient && onOpenClipboard && (
            <button
              onClick={onOpenClipboard}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-yellow-400 hover:bg-yellow-300 border-3 border-black text-black text-[11px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] rounded-xl cursor-pointer"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Case File</span>
            </button>
          )}

          {/* Cabinet buttons */}
          <button
            onClick={() => setGameState("trophies")}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 border-3 border-black text-[11px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] rounded-xl cursor-pointer ${
              gameState === "trophies" 
                ? "bg-rose-500 text-white" 
                : "bg-white text-black hover:bg-slate-50"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Trophies ({earnedTrophies.length})</span>
          </button>

          <button
            onClick={() => setGameState("records")}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 border-3 border-black text-[11px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] rounded-xl cursor-pointer ${
              gameState === "records" 
                ? "bg-sky-500 text-white" 
                : "bg-white text-black hover:bg-slate-50"
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Records</span>
          </button>

          {/* Skin selector */}
          {gameState === "menu" && (
            <div className="flex items-center gap-2 bg-white border-3 border-black px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_#000000] text-black">
              <span className="text-[10px] font-black uppercase tracking-wider">Theatre:</span>
              <select
                value={currentSkin}
                onChange={(e) => setCurrentSkin(e.target.value)}
                className="bg-slate-100 border border-black text-xs font-black text-black rounded px-1.5 py-0.5 outline-none cursor-pointer"
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
            className="p-2.5 bg-white border-3 border-black text-black hover:bg-slate-50 transition-all shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] rounded-xl cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-yellow-50 border-4 border-black p-8 shadow-[8px_8px_0px_#000000] relative animate-scale-up text-black">
            
            <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-2 border-b-4 border-black pb-4 comic-header uppercase tracking-wider select-none">
              <Settings className="w-6 h-6 text-pink-500" />
              <span>Surgical Settings</span>
            </h2>

            <div className="space-y-4 text-xs font-black comic-text">
              
              {/* Voice Assist Toggle */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000000]">
                <div className="flex items-center gap-3">
                  {settings.voiceEnabled ? <Volume2 className="w-5 h-5 text-pink-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                  <div>
                    <p className="font-black text-black uppercase tracking-wide">Nurse Clara Voice</p>
                    <p className="text-[10px] text-slate-700 font-bold mt-0.5">Speaks dialogue diagnostics aloud</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled}
                  onChange={(e) => changeSettings("voiceEnabled", e.target.checked)}
                  className="w-5 h-5 accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Text Sizing Scale */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000000]">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-sky-600" />
                  <div>
                    <p className="font-black text-black uppercase tracking-wide">Letter Text Size</p>
                    <p className="text-[10px] text-slate-700 font-bold mt-0.5">Scale the size of the 3D block words</p>
                  </div>
                </div>
                <select
                  value={settings.textScale}
                  onChange={(e) => changeSettings("textScale", e.target.value)}
                  className="bg-slate-100 border-2 border-black text-xs font-bold text-black rounded p-1 outline-none cursor-pointer"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">X-Large</option>
                </select>
              </div>

              {/* Colorblind Assistive Mode */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000000]">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-black text-black uppercase tracking-wide">Colorblind Assist</p>
                    <p className="text-[10px] text-slate-700 font-bold mt-0.5">Increase color contrast and tags</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.colorblindMode}
                  onChange={(e) => changeSettings("colorblindMode", e.target.checked)}
                  className="w-5 h-5 accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Optional Timer */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000000]">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-black text-black uppercase tracking-wide">Surgery Clock (Level 3+)</p>
                    <p className="text-[10px] text-slate-700 font-bold mt-0.5">Enable surgery speed bonus XP timer</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.timerToggle}
                  onChange={(e) => changeSettings("timerToggle", e.target.checked)}
                  className="w-5 h-5 accent-pink-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="mt-8 w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 border-3 border-black font-black text-sm text-black shadow-[4px_4px_0px_#000000] transition-all active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] cursor-pointer"
            >
              CLOSE SETTINGS
            </button>
          </div>
        </div>
      )}
    </>
  );
}
