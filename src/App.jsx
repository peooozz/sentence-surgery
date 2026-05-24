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
import CommaScissorsMenu from "./components/UI/Toolmenus/CommaScissorsMenu";
import SpellScannerMenu from "./components/UI/Toolmenus/SpellScannerMenu";
import PronounTweezersMenu from "./components/UI/Toolmenus/PronounTweezersMenu";

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
  const [scissorsData, setScissorsData] = useState(null);
  const [scannerData, setScannerData] = useState(null);
  const [tweezersData, setTweezersData] = useState(null);

  // Visual feedback flashing screens
  const [flashType, setFlashType] = useState(null);

  // Patient clipboard overlay
  const [showClipboard, setShowClipboard] = useState(false);

  // Ambient sound initialization
  useEffect(() => {
    const handleFirstClick = () => {
      synthAudio.startAmbientHum();
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  // Voice greeting upon entering surgery
  const prevGameState = useRef(null);
  useEffect(() => {
    if (gameState === "surgery" && prevGameState.current !== "surgery") {
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

  // Voice reaction when errors are resolved
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

  // Voice reaction on active tool changes
  const prevActiveTool = useRef(null);
  useEffect(() => {
    if (activeTool && activeTool !== prevActiveTool.current && gameState === "surgery") {
      speakText(getRandomDialogue("tool_change"));
    }
    prevActiveTool.current = activeTool;
  }, [activeTool, gameState]);

  // Ambient hum control
  useEffect(() => {
    if (gameState === "surgery") {
      synthAudio.startAmbientHum();
    } else if (gameState === "menu") {
      synthAudio.stopAmbientHum();
    }
  }, [gameState]);

  // Heart rate monitor beep loop
  useEffect(() => {
    let beepInterval = null;
    if (gameState === "surgery") {
      const hasErrors = currentWords.some((w) => w.errorActive);
      const isFast = errorsOnPatient > 0 || hasErrors;
      const rate = isFast ? 1200 : 2200;

      beepInterval = setInterval(() => {
        synthAudio.playHeartBeep(isFast);
      }, rate);
    }
    return () => {
      if (beepInterval) clearInterval(beepInterval);
    };
  }, [gameState, errorsOnPatient, currentWords]);

  // Flash red on mistakes
  useEffect(() => {
    if (errorsOnPatient > 0) {
      setFlashType("red");
      const timer = setTimeout(() => setFlashType(null), 400);
      return () => clearTimeout(timer);
    }
  }, [errorsOnPatient]);

  // Flash green on successful incision
  const fixedCount = currentWords.filter(w => w.isFixed).length;
  useEffect(() => {
    if (fixedCount > 0 && gameState === "surgery") {
      setFlashType("green");
      const timer = setTimeout(() => setFlashType(null), 400);
      return () => clearTimeout(timer);
    }
  }, [fixedCount]);

  // Incision selectors handlers
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

  const handleScissorsSelect = (commaWord) => {
    if (!scissorsData) return;
    applyToolFix(scissorsData.idx, "scissors", commaWord);
    setScissorsData(null);
  };

  const handleScannerSelect = (spellingWord) => {
    if (!scannerData) return;
    applyToolFix(scannerData.idx, "scanner", spellingWord);
    setScannerData(null);
  };

  const handleTweezersSelect = (pronounWord) => {
    if (!tweezersData) return;
    applyToolFix(tweezersData.idx, "tweezers", pronounWord);
    setTweezersData(null);
  };

  const getClampVerbChoices = (wordText) => {
    const norm = wordText.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, "").trim().toLowerCase();
    // was/were
    if (norm === "was")     return ["was", "were"];
    if (norm === "were")    return ["was", "were"];
    // is/are
    if (norm === "is")      return ["is", "are"];
    if (norm === "are")     return ["is", "are"];
    // has/have
    if (norm === "has")     return ["has", "have"];
    if (norm === "have")    return ["has", "have"];
    // need/needs
    if (norm === "need")    return ["needs", "need"];
    if (norm === "needs")   return ["needs", "need"];
    // do/does/don't/doesn't
    if (norm === "do")      return ["does", "do"];
    if (norm === "does")    return ["does", "do"];
    if (norm === "dont")    return ["doesn't", "don't"];
    if (norm === "doesnt")  return ["doesn't", "don't"];
    // double-negatives
    if (norm === "never")   return ["ever", "never"];
    if (norm === "ever")    return ["ever", "never"];
    if (norm === "nothing") return ["anything", "something", "nothing"];
    if (norm === "no")      return ["a", "any", "no"];
    // owner/owners
    if (norm === "owners")  return ["owner", "owners"];
    if (norm === "owner")   return ["owner", "owners"];
    // go forms
    if (norm === "goes")    return ["go", "goes", "went"];
    // pronoun collective cases
    if (norm === "their")   return ["its", "their", "his or her", "our"];
    
    return ["is", "are", "was", "were", "has", "have", "do", "does"];
  };

  const activeStoryline = activePatient ? storylines[activePatient.id] : null;

  return (
    <div className={`w-full h-full relative font-sans text-slate-800 bg-slate-100 overflow-hidden select-none text-scale-${settings.textScale} active-tool-${activeTool || "none"}`}>
      
      {/* 3D Operating Theatre */}
      {(gameState === "surgery" || gameState === "success") && (
        <OperatingTheatre 
          onOpenScalpel={(idx, word) => setScalpelData({ idx, word })}
          onOpenInjector={(idx, word) => setInjectorData({ idx, word })}
          onOpenImplant={(idx, word) => setImplantData({ idx, word })}
          onOpenClampSelector={(idx, word) => setClampSelectorData({ idx, word })}
          onOpenScissors={(idx, word) => setScissorsData({ idx, word })}
          onOpenScanner={(idx, word) => setScannerData({ idx, word })}
          onOpenTweezers={(idx, word) => setTweezersData({ idx, word })}
        />
      )}

      {/* Grid underlay for menus */}
      {gameState !== "surgery" && gameState !== "success" && (
        <div className="absolute inset-0 z-0 bg-slate-900 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-100 halftone-bg"></div>
      )}

      {/* Visual flash overlays */}
      {flashType === "red" && (
        <div className="fixed inset-0 z-50 bg-red-600/25 pointer-events-none transition-opacity animate-pulse border-8 border-red-500"></div>
      )}
      {flashType === "green" && (
        <div className="fixed inset-0 z-50 bg-emerald-500/20 pointer-events-none transition-opacity animate-pulse border-8 border-emerald-400"></div>
      )}

      {/* HUD components */}
      <Dashboard onOpenClipboard={() => setShowClipboard(true)} />
      <NurseGuide />

      {/* Screen routers */}
      {gameState === "menu" && <MainMenu />}
      {gameState === "ambulance" && <AmbulanceTransition />}
      {gameState === "trophies" && <Trophies />}
      {gameState === "records" && <PatientRecords />}
      {gameState === "success" && <ScoreCard />}

      {/* Surgery HUD */}
      {gameState === "surgery" && (
        <>
          <SurgicalTray />
          
          <div className="fixed bottom-26 right-4 z-40 bg-white border-3 border-black p-3.5 rounded-xl text-xs font-black text-black pointer-events-none shadow-[4px_4px_0px_#000000] comic-text">
            <p className="text-pink-600 font-extrabold uppercase text-[10px] tracking-wider mb-1.5 comic-header">Operating Theatre Status</p>
            <p className="mb-0.5">DIFFICULTY: <span className="text-sky-600 font-bold">{activePatient?.difficulty}</span></p>
            <p>ERRORS MADE: <span className="text-red-500 font-bold">{errorsOnPatient}</span></p>
          </div>
        </>
      )}

      {/* Mid-surgery Clipboard overlay */}
      {showClipboard && activePatient && activeStoryline && (
        <PatientClipboard
          patient={activePatient}
          storyline={activeStoryline}
          onClose={() => setShowClipboard(false)}
          isMidSurgery={true}
        />
      )}

      {/* ================= TOOL MENUS OVERLAYS ================= */}
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

      {scissorsData && (
        <CommaScissorsMenu
          word={scissorsData.word}
          onSelect={handleScissorsSelect}
          onClose={() => setScissorsData(null)}
        />
      )}

      {scannerData && (
        <SpellScannerMenu
          word={scannerData.word}
          onSelect={handleScannerSelect}
          onClose={() => setScannerData(null)}
        />
      )}

      {tweezersData && (
        <PronounTweezersMenu
          word={tweezersData.word}
          onSelect={handleTweezersSelect}
          onClose={() => setTweezersData(null)}
        />
      )}

      {clampSelectorData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
          <div className="w-full max-w-sm rounded-2xl bg-emerald-50 border-4 border-black p-6 shadow-[8px_8px_0px_#000000] relative animate-scale-up">
            <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-4">
              <span className="text-2xl p-2 bg-emerald-500 rounded-lg border-2 border-black">🗜️</span>
              <div>
                <h3 className="font-extrabold text-black text-lg comic-header uppercase tracking-wide">Agreement Clamp</h3>
                <p className="text-xs font-bold text-slate-700">Aligning verb: <strong className="font-mono bg-white px-1.5 py-0.5 border border-black rounded text-black">{clampSelectorData.word.currentText}</strong></p>
              </div>
            </div>
            <p className="text-xs text-black font-black uppercase tracking-wider mb-2">Select the matching alignment:</p>
            <div className="grid grid-cols-2 gap-2">
              {getClampVerbChoices(clampSelectorData.word.currentText).map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClampSelect(choice)}
                  className="p-3 bg-white border-3 border-black hover:bg-emerald-100 text-black rounded-xl font-bold font-mono text-center hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer shadow-[3px_3px_0px_#000000]"
                >
                  {choice}
                </button>
              ))}
            </div>
            <button
              onClick={() => setClampSelectorData(null)}
              className="mt-6 w-full py-2 bg-white border-2 border-black rounded-xl font-black text-xs text-black hover:bg-slate-100 transition-all cursor-pointer shadow-[2px_2px_0px_#000000]"
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
