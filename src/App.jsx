import React, { useState, useEffect, useRef } from "react";
import { useGame } from "./components/GameProvider";
import { synthAudio } from "./hooks/synthAudio";
import { storylines } from "./data/storylines";
import { speakText, stopSpeech, getRandomDialogue } from "./services/elevenLabsVoice";

// UI Components
import Dashboard from "./components/UI/Dashboard";
import MainMenu from "./components/UI/MainMenu";
import AmbulanceTransition from "./components/UI/AmbulanceTransition";
import Trophies from "./components/UI/Trophies";
import PatientRecords from "./components/UI/PatientRecords";
import ScoreCard from "./components/UI/ScoreCard";
import NurseGuide from "./components/UI/NurseGuide";
import SurgicalTray from "./components/UI/SurgicalTray";
import PatientClipboard from "./components/UI/PatientClipboard";

// Tool Dialogs
import PunctuationRadial from "./components/UI/Toolmenus/PunctuationRadial";
import TenseInjectorMenu from "./components/UI/Toolmenus/TenseInjectorMenu";
import PrecisionZoom from "./components/UI/Toolmenus/PrecisionZoom";

// 3D Canvas
import OperatingTheatre from "./components/3d/OperatingTheatre";

function AppContent() {
  const {
    gameState,
    setGameState,
    activePatient,
    currentWords,
    errorsOnPatient,
    applyToolFix,
    settings,
    changeSettings,
    startPatient,
    activeTool
  } = useGame();

  // Dialog overlays state
  const [scalpelData, setScalpelData] = useState(null);
  const [injectorData, setInjectorData] = useState(null);
  const [implantData, setImplantData] = useState(null);
  const [clampSelectorData, setClampSelectorData] = useState(null);

  // Red/green flash screen visual feedback state
  const [flashType, setFlashType] = useState(null);

  // Patient clipboard mid-surgery overlay
  const [showClipboard, setShowClipboard] = useState(false);

  // Start ambient hum on user first click (autoplay workaround)
  useEffect(() => {
    const handleFirstClick = () => {
      synthAudio.startAmbientHum();
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  // ElevenLabs voice — Nurse Clara speaks on surgery start
  const prevGameState = useRef(null);
  useEffect(() => {
    if (gameState === "surgery" && prevGameState.current !== "surgery") {
      // Brief delay so the scene loads first
      const t = setTimeout(() => {
        speakText(getRandomDialogue("greeting"));
      }, 1200);
      return () => clearTimeout(t);
    }
    if (gameState === "menu") {
      stopSpeech();
    }
    prevGameState.current = gameState;
  }, [gameState]);

  // Nurse Clara reacts when errors are fixed
  const prevFixedCount = useRef(0);
  useEffect(() => {
    if (gameState !== "surgery") return;
    const fixedCount = currentWords.filter(w => w.isFixed).length;
    if (fixedCount > prevFixedCount.current) {
      const allFixed = currentWords.every(w => !w.errorActive);
      speakText(getRandomDialogue(allFixed ? "healed" : "error_fixed"));
    }
    prevFixedCount.current = fixedCount;
  }, [currentWords, gameState]);

  // Sync ambient hum start/stop based on page state
  useEffect(() => {
    if (gameState === "surgery") {
      synthAudio.startAmbientHum();
    } else if (gameState === "menu") {
      synthAudio.stopAmbientHum();
    }
  }, [gameState]);

  // Heart rate monitor audio beep loop in surgery
  useEffect(() => {
    let beepInterval = null;
    if (gameState === "surgery") {
      const hasErrors = currentWords.some((w) => w.errorActive);
      const isFast = errorsOnPatient > 0 || hasErrors;
      const rate = isFast ? 1300 : 2500;

      beepInterval = setInterval(() => {
        synthAudio.playHeartBeep(isFast);
      }, rate);
    }

    return () => {
      if (beepInterval) clearInterval(beepInterval);
    };
  }, [gameState, errorsOnPatient, currentWords]);

  // Listen to mistakes count to trigger red flash screen
  useEffect(() => {
    if (errorsOnPatient > 0) {
      setFlashType("red");
      const timer = setTimeout(() => setFlashType(null), 400);
      return () => clearTimeout(timer);
    }
  }, [errorsOnPatient]);

  // Listen to word fixed changes to trigger green flash screen
  const fixedCount = currentWords.filter(w => w.isFixed).length;
  useEffect(() => {
    if (fixedCount > 0 && gameState === "surgery") {
      setFlashType("green");
      const timer = setTimeout(() => setFlashType(null), 400);
      return () => clearTimeout(timer);
    }
  }, [fixedCount]);

  // Handlers for tool selection resolutions
  const handleScalpelSelect = (char) => {
    if (!scalpelData) return;
    applyToolFix(scalpelData.idx, "scalpel", char);
    setScalpelData(null);
  };

  const handleInjectorSelect = (tenseWord) => {
    if (!injectorData) return;
    applyToolFix(injectorData.idx, "injector", tenseWord);
    setInjectorData(null);
  };

  const handleImplantSelect = (apostropheWord) => {
    if (!implantData) return;
    applyToolFix(implantData.idx, "implant", apostropheWord);
    setImplantData(null);
  };

  const handleClampSelect = (resolvedVerbForm) => {
    if (!clampSelectorData) return;
    applyToolFix(clampSelectorData.idx, "clamp", resolvedVerbForm);
    setClampSelectorData(null);
  };

  const getClampVerbChoices = (wordText) => {
    const norm = wordText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim().toLowerCase();
    if (norm === "were" || norm === "was") return ["was", "were"];
    if (norm === "is" || norm === "are") return ["is", "are"];
    if (norm === "have" || norm === "has") return ["has", "have"];
    if (norm === "need" || norm === "needs") return ["needs", "need"];
    return ["is", "are", "was", "were", "has", "have", "do", "does"];
  };

  // Storyline for active patient
  const activeStoryline = activePatient ? storylines[activePatient.id] : null;

  return (
    <div className={`w-full h-full relative font-sans text-slate-800 bg-slate-100 overflow-hidden select-none text-scale-${settings.textScale} active-tool-${activeTool || "none"}`}>
      
      {/* 3D Operating Room Render View */}
      {(gameState === "surgery" || gameState === "success") && (
        <OperatingTheatre 
          onOpenScalpel={(idx, word) => setScalpelData({ idx, word })}
          onOpenInjector={(idx, word) => setInjectorData({ idx, word })}
          onOpenImplant={(idx, word) => setImplantData({ idx, word })}
          onOpenClampSelector={(idx, word) => setClampSelectorData({ idx, word })}
        />
      )}

      {/* Subtle grid texture underlay for menus */}
      {gameState !== "surgery" && gameState !== "success" && (
        <div className="absolute inset-0 z-0 bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      )}

      {/* Screen Red Flash (Mistake) or Green Flash (Success incision) */}
      {flashType === "red" && (
        <div className="fixed inset-0 z-50 bg-red-500/20 pointer-events-none transition-opacity animate-pulse border-8 border-red-400"></div>
      )}
      {flashType === "green" && (
        <div className="fixed inset-0 z-50 bg-emerald-500/15 pointer-events-none transition-opacity animate-pulse border-8 border-emerald-400"></div>
      )}

      {/* HUD Overlays (Dashboard, Nurse Clara Guide) */}
      <Dashboard onOpenClipboard={() => setShowClipboard(true)} />
      <NurseGuide />

      {/* 2D State Router Panels */}
      {gameState === "menu" && <MainMenu />}
      {gameState === "ambulance" && <AmbulanceTransition />}
      {gameState === "trophies" && <Trophies />}
      {gameState === "records" && <PatientRecords />}
      {gameState === "success" && <ScoreCard />}

      {/* Surgery HUD (Tray & Tool Indicators) */}
      {gameState === "surgery" && (
        <>
          <SurgicalTray />
          
          {/* Active surgery details */}
          <div className="fixed bottom-28 left-4 z-40 glass-panel p-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-600 pointer-events-none shadow-md">
            <p className="text-rose-600 font-extrabold uppercase text-[10px] tracking-wider mb-1">Operating Room Status</p>
            <p>Difficulty: <span className="text-sky-600 font-bold">{activePatient?.difficulty}</span></p>
            <p>Errors Made: <span className="text-red-500 font-bold">{errorsOnPatient}</span></p>
            {settings.timerToggle && activePatient?.level > 2 && (
              <p>Speed Bonus Active: <span className="text-amber-600 font-bold">Yes</span></p>
            )}
          </div>
        </>
      )}

      {/* Mid-surgery Patient Clipboard overlay */}
      {showClipboard && activePatient && activeStoryline && (
        <PatientClipboard
          patient={activePatient}
          storyline={activeStoryline}
          onClose={() => setShowClipboard(false)}
          isMidSurgery={true}
        />
      )}

      {/* ================= TOOL OVERLAYS ================= */}
      {scalpelData && (
        <PunctuationRadial
          word={scalpelData.word}
          wordIndex={scalpelData.idx}
          onSelect={handleScalpelSelect}
          onClose={() => setScalpelData(null)}
        />
      )}

      {injectorData && (
        <TenseInjectorMenu
          word={injectorData.word}
          onSelect={handleInjectorSelect}
          onClose={() => setInjectorData(null)}
        />
      )}

      {implantData && (
        <PrecisionZoom
          word={implantData.word}
          onSelect={handleImplantSelect}
          onClose={() => setImplantData(null)}
        />
      )}

      {clampSelectorData && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
          <div className="w-full max-w-sm rounded-3xl bg-white border-2 border-emerald-300 p-6 shadow-xl relative animate-scale-up">
            <div className="flex items-center gap-3 border-b border-emerald-100 pb-4 mb-4">
              <span className="text-2xl">🗜️</span>
              <div>
                <h3 className="font-extrabold text-emerald-700">Subject-Verb Alignment</h3>
                <p className="text-[10px] text-slate-400">Aligning verb: <strong className="font-mono text-slate-700">{clampSelectorData.word.currentText}</strong></p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-semibold">Select the matching verb form:</p>
            <div className="grid grid-cols-2 gap-3">
              {getClampVerbChoices(clampSelectorData.word.currentText).map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClampSelect(choice)}
                  className="p-3 bg-slate-50 border-2 border-slate-200 hover:border-emerald-400 text-slate-800 rounded-xl font-bold font-mono text-center hover:bg-emerald-50 transition-all cursor-pointer"
                >
                  {choice}
                </button>
              ))}
            </div>
            <button
              onClick={() => setClampSelectorData(null)}
              className="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-700 transition-colors cursor-pointer border border-slate-200"
            >
              Cancel Alignment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="w-full h-full">
      <AppContent />
    </div>
  );
}
