// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\components\GameProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { sentences } from "../data/sentences";
import { synthAudio } from "../hooks/synthAudio";

const GameContext = createContext();

const RANKS = [
  { name: "Medical Student", minXp: 0, skin: "Standard Hospital" },
  { name: "Junior Doctor", minXp: 200, skin: "Space Hospital" },
  { name: "Senior Doctor", minXp: 500, skin: "Underwater Hospital" },
  { name: "Consultant", minXp: 900, skin: "Jungle Hospital" },
  { name: "Surgeon General", minXp: 1400, skin: "Robot Hospital" },
  { name: "Advanced Surgeon", minXp: 2000, skin: "Standard Hospital" },
  { name: "Expert Clinician", minXp: 2700, skin: "Space Hospital" },
  { name: "Surgeon General Supreme", minXp: 3500, skin: "Robot Hospital" }
];

const TROPHY_LIST = [
  { id: "first_incision", name: "First Incision", description: "Successfully discharged your first sentence patient!", icon: "🏆", concept: "General" },
  { id: "capitalization", name: "Capitalization Expert", description: "Healed a capital letter wound at the start of a sentence.", icon: "🔠", concept: "Capitalization" },
  { id: "terminator", name: "Sentence Terminator", description: "Stitched up a missing full stop, question mark, or exclamation mark.", icon: "🛑", concept: "Ending Punctuation" },
  { id: "contraction", name: "Contraction Specialist", description: "Implanted an apostrophe in contractions like 'isn't' or 'it's'.", icon: "🩹", concept: "Contraction Apostrophes" },
  { id: "possession", name: "Possession Specialist", description: "Implanted an apostrophe to show ownership (e.g. doctor's office).", icon: "🔑", concept: "Possessive Apostrophes" },
  { id: "subject_verb", name: "Subject-Verb Coordinator", description: "Aligned mismatched subjects and verbs using the Clamp.", icon: "🗜️", concept: "Subject-Verb Agreement" },
  { id: "tense_surgeon", name: "Tense Surgeon", description: "Injected a verb to change its tense correctly.", icon: "💉", concept: "Verb Tense" },
  { id: "participle", name: "Participle Practitioner", description: "Corrected irregular past participles (e.g. has written).", icon: "📜", concept: "Participle Form" },
  { id: "word_order", name: "Word Order Director", description: "Reorganized scrambled limbs (words) using the Forceps.", icon: "⛓️", concept: "Word Order" },
  { id: "double_negative", name: "Double Negative Cure", description: "Cured a double negative error (e.g. 'not never').", icon: "🧪", concept: "Double Negative" },
  { id: "modifier", name: "Modifier Realignment", description: "Untangled a dangling modifier in a complex sentence.", icon: "🩻", concept: "Dangling Modifiers" },
  { id: "preposition", name: "Prepositional Precision", description: "Repaired pronoun case after a preposition (between you and me).", icon: "⚖️", concept: "Prepositions" },
  { id: "relative", name: "Relative Clause Mender", description: "Corrected a who/which/that relative pronoun wound.", icon: "🧬", concept: "Relative Pronouns" },
  { id: "comma_scissors", name: "Comma Clipper", description: "Successfully resolved list commas or run-on splices.", icon: "✂️", concept: "Commas" },
  { id: "spell_scanner", name: "Orthography Specialist", description: "Diagnosed and cured spelling pathogens.", icon: "🔬", concept: "Spelling" },
  { id: "pronoun_tweezers", name: "Case Aligner", description: "Repaired pronoun case errors (e.g. him vs he).", icon: "🪡", concept: "Pronouns" },
  { id: "speed_demon", name: "Speed Demon", description: "Discharged a patient in less than 20 seconds!", icon: "⚡", concept: "Speed" },
  { id: "flawless", name: "Flawless Procedure", description: "Discharged a patient with zero errors made.", icon: "🌟", concept: "Accuracy" }
];

export function GameProvider({ children }) {
  // Game States
  const [gameState, setGameState] = useState("menu"); // 'menu', 'ambulance', 'surgery', 'success', 'trophies', 'records'
  const [currentLevel, setCurrentLevel] = useState(1);
  const [patientIndex, setPatientIndex] = useState(0);
  const [activePatient, setActivePatient] = useState(null);
  
  // Running sentence state (manipulable by tools)
  const [currentWords, setCurrentWords] = useState([]);
  
  // Progression
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Medical Student");
  const [unlockedSkins, setUnlockedSkins] = useState(["Standard Hospital"]);
  const [currentSkin, setCurrentSkin] = useState("Standard Hospital");
  const [earnedTrophies, setEarnedTrophies] = useState([]);
  const [patientRecords, setPatientRecords] = useState([]);

  // Active surgery stats
  const [activeTool, setActiveTool] = useState(null);
  const [errorsOnPatient, setErrorsOnPatient] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showExplanation, setShowExplanation] = useState(null); // { isSuccess: bool, text: string }
  const [speedBonusXp, setSpeedBonusXp] = useState(0);

  // Settings
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    textScale: "medium",
    colorblindMode: false,
    timerToggle: true
  });

  // Level Timer
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Load progress from LocalStorage
  useEffect(() => {
    const savedXp = localStorage.getItem("ss_xp");
    const savedTrophies = localStorage.getItem("ss_trophies");
    const savedRecords = localStorage.getItem("ss_records");
    const savedSettings = localStorage.getItem("ss_settings");

    if (savedXp) {
      const parsedXp = parseInt(savedXp, 10);
      setXp(parsedXp);
      updateRankAndSkins(parsedXp);
    }
    if (savedTrophies) setEarnedTrophies(JSON.parse(savedTrophies));
    if (savedRecords) setPatientRecords(JSON.parse(savedRecords));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Sync state helpers
  const updateRankAndSkins = (newXp) => {
    let currentRank = "Medical Student";
    let skins = ["Standard Hospital"];
    
    RANKS.forEach((r) => {
      if (newXp >= r.minXp) {
        currentRank = r.name;
        if (!skins.includes(r.skin)) {
          skins.push(r.skin);
        }
      }
    });

    setRank(currentRank);
    setUnlockedSkins(skins);
  };

  const addXp = (amount) => {
    setXp((prev) => {
      const nextXp = prev + amount;
      localStorage.setItem("ss_xp", nextXp);
      updateRankAndSkins(nextXp);
      return nextXp;
    });
  };

  const unlockTrophy = (trophyId) => {
    setEarnedTrophies((prev) => {
      if (prev.includes(trophyId)) return prev;
      const next = [...prev, trophyId];
      localStorage.setItem("ss_trophies", JSON.stringify(next));
      return next;
    });
  };

  // Start Patient Operation
  const startPatient = (levelNum, index = 0) => {
    const levelPatients = sentences.filter((s) => s.level === levelNum);
    const actualIndex = index % levelPatients.length;
    const patient = levelPatients[actualIndex];

    setActivePatient(patient);
    setCurrentLevel(levelNum);
    setPatientIndex(actualIndex);
    
    // Setup initial word blocks
    const wordBlocks = patient.words.map((w, idx) => ({
      ...w,
      id: `w-${idx}`,
      currentText: w.text,
      isFixed: w.errorType === null,
      errorActive: w.errorType !== null
    }));

    setCurrentWords(wordBlocks);
    setErrorsOnPatient(0);
    setMovesCount(0);
    setTimer(0);
    setTimerActive(settings.timerToggle && levelNum > 2); // default timer off for levels 1-2
    setGameState("ambulance");
    setActiveTool(null);
    setShowExplanation(null);
    setSpeedBonusXp(0);
  };

  // Perform Surgery Operation
  // e.g. apply tool action on wordIndex
  const applyToolFix = (wordIndex, toolName, value = null) => {
    if (!activePatient) return;
    
    if (!toolName) {
      synthAudio.playFailure();
      setShowExplanation({
        isSuccess: false,
        text: "Please select a surgical tool from the tray below before performing an incision!"
      });
      return;
    }

    setMovesCount(m => m + 1);
    const updatedWords = [...currentWords];
    const targetWord = updatedWords[wordIndex];

    let success = false;
    let explanationText = "";

    const norm = (s) => s.trim().toLowerCase();
    const stripPunct = (s) => s.replace(/[.,!?;:'"—\-]+$/, "").trim().toLowerCase();

    // ── SCALPEL: Punctuation and Capitalisation ─────────────────────────
    if (toolName === "scalpel" && targetWord.errorType === "punctuation") {
      explanationText = targetWord.explanation;

      // Check if correct string needs capitalisation
      const correctCapitalized = targetWord.correct.charAt(0) === targetWord.correct.charAt(0).toUpperCase() && 
                                 /[a-zA-Z]/.test(targetWord.correct.charAt(0));
      
      const currentCapitalized = targetWord.currentText.charAt(0) === targetWord.currentText.charAt(0).toUpperCase() && 
                                 /[a-zA-Z]/.test(targetWord.currentText.charAt(0));

      const needsCapitalization = correctCapitalized && !currentCapitalized;

      // Option: capitalize selected
      const isCapitalizeAction = value === (targetWord.currentText.charAt(0).toUpperCase() + targetWord.currentText.slice(1));
      const isLowercaseAction = value === (targetWord.currentText.charAt(0).toLowerCase() + targetWord.currentText.slice(1));

      if (needsCapitalization) {
        if (isCapitalizeAction) {
          const updatedText = value; 
          
          // Check if it also needs punctuation at the end
          const correctEndPunct = targetWord.correct.replace(/^[a-zA-Z']+/, "");
          const currentEndPunct = updatedText.replace(/^[a-zA-Z']+/, "");
          
          if (correctEndPunct === currentEndPunct || norm(updatedText) === norm(targetWord.correct)) {
            success = true;
            targetWord.currentText = targetWord.correct;
          } else {
            // Capitalized successfully but lacks trailing punctuation
            targetWord.currentText = updatedText;
            setCurrentWords(updatedWords);
            synthAudio.playSuccess();
            setShowExplanation({
              isSuccess: true,
              text: "Capitalization fixed! Now add the ending punctuation."
            });
            return;
          }
        } else if (isLowercaseAction) {
          success = false;
        } else if (value.length === 1 && [".", ",", "!", "?", ";", ":", "\""].includes(value)) {
          // Added punctuation first
          const updatedText = targetWord.currentText.replace(/[.,!?;:'"—\-]+$/, "") + value;
          targetWord.currentText = updatedText;
          setCurrentWords(updatedWords);
          synthAudio.playSuccess();
          setShowExplanation({
            isSuccess: true,
            text: "Punctuation added! Now make sure the word is capitalized."
          });
          return;
        }
      } else {
        // No capitalization needed, only trailing punctuation
        if (value === "") {
          const stripped = targetWord.currentText.replace(/[.,!?;:'"—\-]+$/, "");
          if (norm(stripped) === norm(targetWord.correct)) {
            success = true;
            targetWord.currentText = targetWord.correct;
          }
        } else if (value.length === 1 && [".", ",", "!", "?", ";", ":", "\""].includes(value)) {
          const appended = targetWord.currentText.replace(/[.,!?;:'"—\-]+$/, "") + value;
          if (norm(appended) === norm(targetWord.correct)) {
            success = true;
            targetWord.currentText = targetWord.correct;
          }
        } else if (norm(value) === norm(targetWord.correct)) {
          success = true;
          targetWord.currentText = targetWord.correct;
        }
      }
    }

    // ── TENSE INJECTOR ─────────────────────────────────────────────────
    else if (toolName === "injector" && targetWord.errorType === "tense") {
      if (norm(value) === norm(targetWord.correct)) {
        success = true;
        targetWord.currentText = targetWord.correct;
      }
      explanationText = targetWord.explanation;
    }

    // ── AGREEMENT CLAMP ────────────────────────────────────────────────
    else if (toolName === "clamp" && targetWord.errorType === "agreement") {
      if (norm(value) === norm(targetWord.correct)) {
        success = true;
        targetWord.currentText = targetWord.correct;
      }
      explanationText = targetWord.explanation;
    }

    // ── APOSTROPHE IMPLANT ────────────────────────────────────────────
    else if (toolName === "implant" && targetWord.errorType === "apostrophe") {
      if (norm(value) === norm(targetWord.correct)) {
        success = true;
        targetWord.currentText = targetWord.correct;
      }
      explanationText = targetWord.explanation;
    }

    // ── COMMA SCISSORS ────────────────────────────────────────────────
    else if (toolName === "scissors" && targetWord.errorType === "comma") {
      if (norm(value) === norm(targetWord.correct)) {
        success = true;
        targetWord.currentText = targetWord.correct;
      }
      explanationText = targetWord.explanation;
    }

    // ── SPELL SCANNER ──────────────────────────────────────────────────
    else if (toolName === "scanner" && targetWord.errorType === "spelling") {
      if (norm(value) === norm(targetWord.correct)) {
        success = true;
        targetWord.currentText = targetWord.correct;
      }
      explanationText = targetWord.explanation;
    }

    // ── PRONOUN TWEEZERS ───────────────────────────────────────────────
    else if (toolName === "tweezers" && targetWord.errorType === "pronoun") {
      if (norm(value) === norm(targetWord.correct)) {
        success = true;
        targetWord.currentText = targetWord.correct;
      }
      explanationText = targetWord.explanation;
    }

    if (success) {
      targetWord.isFixed = true;
      targetWord.errorActive = false;
      setCurrentWords(updatedWords);
      synthAudio.playLaserSizzle();
      setTimeout(() => {
        synthAudio.playSuccess();
      }, 300);

      // Show floating perfect badge
      setShowExplanation({
        isSuccess: true,
        text: `Perfect incision! ${explanationText}`
      });

      // Award trophies for specific concepts
      awardGrammarTrophies(targetWord.errorType);

      // Check if all fixed
      const allFixed = updatedWords.every((w) => !w.errorActive);
      if (allFixed) {
        handleAllFixedSuccess();
      }
    } else {
      // Failed incision
      synthAudio.playFailure();
      setErrorsOnPatient((prev) => prev + 1);
      setShowExplanation({
        isSuccess: false,
        text: getErrorExplanation(targetWord, toolName)
      });
      // Tool bounce-back (handled in UI animations)
    }
  };

  // Word Order Reordering (For Word Order Forceps)
  const reorderWords = (fromIdx, toIdx) => {
    if (activePatient.correctOrder) {
      const reordered = [...currentWords];
      const [removed] = reordered.splice(fromIdx, 1);
      reordered.splice(toIdx, 0, removed);
      setCurrentWords(reordered);
      setMovesCount(m => m + 1);

      // Check if order matches correctOrder indices
      // Each word object originally had an index. We must check if the text matches the correct index mapping
      // The patient's correctOrder lists the sequence of indices that form the correct sentence
      // E.g. [3, 4, 2, 0, 1, 5, 6, 7] -> "The dog was running fast down the street."
      const currentSentenceText = reordered.map(w => w.currentText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim().toLowerCase()).join(" ");
      
      // Let's build the correct sentence text
      const levelPatients = sentences.filter((s) => s.level === currentLevel);
      const patient = levelPatients[patientIndex];
      const targetCorrectSentence = patient.words.map(w => w.correct.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim().toLowerCase()).filter(Boolean).join(" ");

      if (currentSentenceText === targetCorrectSentence) {
        // Correct order achieved!
        // Mark all word order words as fixed
        const updated = reordered.map(w => {
          if (w.errorType === "wordorder" || w.errorType === "delete") {
            return { ...w, isFixed: true, errorActive: false };
          }
          return w;
        });
        
        setCurrentWords(updated);
        synthAudio.playLaserSizzle();
        setTimeout(() => {
          synthAudio.playSuccess();
        }, 300);
        
        setShowExplanation({
          isSuccess: true,
          text: "Perfect incision! Word order aligned successfully."
        });
        
        unlockTrophy("word_order");

        const allFixed = updated.every((w) => !w.errorActive);
        if (allFixed) {
          handleAllFixedSuccess();
        }
      }
    }
  };

  // Word deletion (for extra words in wordorder Forceps)
  const deleteWord = (wordIndex) => {
    const targetWord = currentWords[wordIndex];
    if (targetWord.errorType === "delete") {
      const updated = currentWords.filter((_, idx) => idx !== wordIndex);
      setCurrentWords(updated);
      synthAudio.playLaserSizzle();
      setTimeout(() => {
        synthAudio.playSuccess();
      }, 300);

      setShowExplanation({
        isSuccess: true,
        text: "Incision complete! Unnecessary word removed."
      });

      const allFixed = updated.every((w) => !w.errorActive);
      if (allFixed) {
        handleAllFixedSuccess();
      }
    } else {
      synthAudio.playFailure();
      setErrorsOnPatient((prev) => prev + 1);
      setShowExplanation({
        isSuccess: false,
        text: "Oops! We can't amputate that word. It is vital to the sentence patient!"
      });
    }
  };

  const getErrorExplanation = (word, toolName) => {
    if (toolName === "scalpel" && word.errorType !== "punctuation") {
      return "Incorrect tool! A scalpel is only used for stitching capital letters or punctuation wounds.";
    }
    if (toolName === "injector" && word.errorType !== "tense") {
      return "Incorrect tool! Use the Injector to treat faulty verb tenses.";
    }
    if (toolName === "clamp" && word.errorType !== "agreement") {
      return "Incorrect tool! Use the Clamp to repair subject-verb agreement mismatches.";
    }
    if (toolName === "implant" && word.errorType !== "apostrophe") {
      return "Incorrect tool! The Apostrophe Implant is for words missing apostrophes.";
    }
    if (toolName === "scissors" && word.errorType !== "comma") {
      return "Incorrect tool! Comma Scissors should only be used to snip or replace comma wounds.";
    }
    if (toolName === "scanner" && word.errorType !== "spelling") {
      return "Incorrect tool! Use the Spell Scanner to clean up spelling infections.";
    }
    if (toolName === "tweezers" && word.errorType !== "pronoun") {
      return "Incorrect tool! Use the Pronoun Tweezers to pluck incorrect pronouns.";
    }

    // Dynamic detailed hint for incorrect answers
    return word.hint || "Oops! That injection was rejected. Try reading the sentence again.";
  };

  const awardGrammarTrophies = (errorType) => {
    if (errorType === "punctuation") {
      unlockTrophy("capitalization");
      unlockTrophy("terminator");
    } else if (errorType === "apostrophe") {
      unlockTrophy("contraction");
      unlockTrophy("possession");
    } else if (errorType === "agreement") {
      unlockTrophy("subject_verb");
    } else if (errorType === "tense") {
      unlockTrophy("tense_surgeon");
      unlockTrophy("participle");
    } else if (errorType === "comma") {
      unlockTrophy("comma_scissors");
    } else if (errorType === "spelling") {
      unlockTrophy("spell_scanner");
    } else if (errorType === "pronoun") {
      unlockTrophy("pronoun_tweezers");
    }
  };

  const handleAllFixedSuccess = () => {
    setTimerActive(false);
    
    // Calculate Score & XP
    // Base XP: 50 XP
    // Accuracy bonus: max 50 XP (reduces by 15 per error)
    // Speed bonus: max 30 XP (if under 30 seconds, reduces linearly)
    const base = 50;
    const accuracyBonus = Math.max(0, 50 - errorsOnPatient * 15);
    const speedBonus = settings.timerToggle && timer < 40 ? Math.max(0, Math.round((40 - timer) * 0.75)) : 0;
    
    setSpeedBonusXp(speedBonus);
    const totalEarned = base + accuracyBonus + speedBonus;
    addXp(totalEarned);

    // Trophies
    unlockTrophy("first_incision");
    if (errorsOnPatient === 0) {
      unlockTrophy("flawless");
    }
    if (timer < 20 && settings.timerToggle) {
      unlockTrophy("speed_demon");
    }

    // Save record
    const finalSentence = currentWords.map((w) => w.currentText).join(" ");
    const newRecord = {
      id: Date.now(),
      patientId: activePatient.id,
      level: currentLevel,
      difficulty: activePatient.difficulty,
      original: activePatient.originalText,
      corrected: finalSentence,
      timeTaken: timer,
      errorsMade: errorsOnPatient,
      xpEarned: totalEarned,
      date: new Date().toLocaleDateString()
    };

    setPatientRecords((prev) => {
      const next = [newRecord, ...prev];
      localStorage.setItem("ss_records", JSON.stringify(next));
      return next;
    });

    synthAudio.playVictoryJingle();
    setGameState("success");
  };

  const changeSettings = (key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("ss_settings", JSON.stringify(next));
      return next;
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        currentLevel,
        setCurrentLevel,
        patientIndex,
        setPatientIndex,
        activePatient,
        currentWords,
        reorderWords,
        deleteWord,
        xp,
        rank,
        unlockedSkins,
        currentSkin,
        setCurrentSkin,
        earnedTrophies,
        patientRecords,
        activeTool,
        setActiveTool,
        errorsOnPatient,
        movesCount,
        timeTaken: timer,
        speedBonusXp,
        showExplanation,
        setShowExplanation,
        settings,
        changeSettings,
        startPatient,
        applyToolFix,
        TROPHY_LIST,
        RANKS
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
export { TROPHY_LIST, RANKS };
