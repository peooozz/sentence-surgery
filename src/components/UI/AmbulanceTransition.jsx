import React, { useEffect, useState } from "react";
import { useGame } from "../GameProvider";
import { synthAudio } from "../../hooks/synthAudio";
import { storylines } from "../../data/storylines";
import PatientClipboard from "./PatientClipboard";

export default function AmbulanceTransition() {
  const { setGameState, activePatient } = useGame();
  const [phase, setPhase] = useState("arriving"); // "arriving" | "clipboard"

  const storyline = activePatient ? storylines[activePatient.id] : null;

  useEffect(() => {
    // Play siren sweeps using synthAudio frequency beeps
    const interval = setInterval(() => {
      synthAudio.playHeartBeep(true);
    }, 300);

    // Auto transition to clipboard after 2 seconds
    const timer = setTimeout(() => {
      clearInterval(interval);
      setPhase("clipboard");
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleBeginSurgery = () => {
    setGameState("surgery");
  };

  if (phase === "clipboard" && storyline) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-100 to-white flex items-center justify-center">
        <PatientClipboard
          patient={activePatient}
          storyline={storyline}
          onBeginSurgery={handleBeginSurgery}
          isMidSurgery={false}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-100 to-white flex flex-col items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center scale-90 sm:scale-100">
        
        {/* Animated Ambulance Truck container */}
        <div className="w-[300px] h-[160px] relative animate-ambulance-slide-in flex items-end">
          
          {/* Flashing light bar */}
          <div className="absolute top-2 left-[120px] flex gap-2 z-10">
            <div className="w-4 h-2 bg-rose-500 rounded-t animate-ping shadow-[0_0_12px_#f43f5e]"></div>
            <div className="w-4 h-2 bg-sky-500 rounded-t animate-pulse shadow-[0_0_12px_#0ea5e9]"></div>
          </div>

          {/* Ambulance Chassis - Hospital White */}
          <div className="w-[260px] h-[110px] bg-white rounded-2xl rounded-r-3xl border-2 border-slate-200 shadow-2xl relative flex items-center justify-between p-4 overflow-hidden">
            {/* Red Stripe */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-r from-rose-500 to-sky-500"></div>

            {/* Medical Cross Graphic */}
            <div className="w-10 h-10 bg-white border-2 border-rose-400 rounded-full flex items-center justify-center z-10 shadow-md">
              <span className="text-rose-500 font-extrabold text-lg select-none">+</span>
            </div>

            {/* Front windshield */}
            <div className="absolute right-0 top-2 w-[40px] h-[45px] bg-sky-100 border-l-2 border-b-2 border-slate-200 rounded-bl-xl rounded-tr-3xl"></div>
          </div>

          {/* Wheels */}
          <div className="absolute bottom-[-15px] left-6 w-12 h-12 bg-slate-800 border-4 border-slate-400 rounded-full flex items-center justify-center animate-spin">
            <div className="w-4 h-4 bg-slate-500 rounded-full"></div>
          </div>
          <div className="absolute bottom-[-15px] right-12 w-12 h-12 bg-slate-800 border-4 border-slate-400 rounded-full flex items-center justify-center animate-spin">
            <div className="w-4 h-4 bg-slate-500 rounded-full"></div>
          </div>
        </div>

        {/* Dispatch details text banner */}
        <div className="mt-12 text-center z-10 space-y-2">
          <div className="px-4 py-1 bg-rose-50 border border-rose-200 text-[11px] font-extrabold text-rose-600 rounded-full w-fit mx-auto animate-pulse uppercase tracking-widest">
            Dispatching Ambulance
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">
            INCOMING PATIENT
          </h2>
          <p className="text-sm font-semibold text-sky-600 font-mono">
            {activePatient?.difficulty}
          </p>
          {storyline && (
            <p className="text-lg font-black text-slate-700 mt-2">
              {storyline.patientName}, Age {storyline.age}
            </p>
          )}
        </div>
      </div>

      {/* Styled Ambulance CSS in JSX */}
      <style>{`
        @keyframes ambulance-slide {
          0% { transform: translateX(-150vw); }
          60% { transform: translateX(10px); }
          80% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .animate-ambulance-slide-in {
          animation: ambulance-slide 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
    </div>
  );
}
