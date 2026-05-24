import React, { useRef } from "react";
import * as THREE from "three";
import { useGame } from "../GameProvider";

// Detailed cartoon patient character with comic outlines and realistic skin colors
export default function PatientCharacter() {
  const { currentWords, activePatient } = useGame();
  const bodyRef = useRef();

  const hasPunctuationError = currentWords.some(w => w.errorType === "punctuation" && w.errorActive);
  const hasTenseError = currentWords.some(w => w.errorType === "tense" && w.errorActive);
  const hasAgreementError = currentWords.some(w => w.errorType === "agreement" && w.errorActive);
  const hasApostropheError = currentWords.some(w => w.errorType === "apostrophe" && w.errorActive);
  const hasWordOrderError = currentWords.some(w => w.errorType === "wordorder" && w.errorActive);
  const hasCommaError = currentWords.some(w => w.errorType === "comma" && w.errorActive);
  const hasSpellingError = currentWords.some(w => w.errorType === "spelling" && w.errorActive);
  const hasPronounError = currentWords.some(w => w.errorType === "pronoun" && w.errorActive);

  const isHealed = activePatient && currentWords.every(w => !w.errorActive);
  const hasAnyError = hasPunctuationError || hasTenseError || hasAgreementError || hasApostropheError || 
                      hasWordOrderError || hasCommaError || hasSpellingError || hasPronounError;

  // Realistic human skin tones
  // Healed: warm healthy peach-tan, Sick: slightly pale/dull warm peach
  const SKIN        = isHealed ? "#eac49d" : "#deb287";   
  const SKIN_SHADOW = isHealed ? "#cfa276" : "#be9265";   
  const SKIN_FLUSH  = "#ec4899";                          // rosy cheeks
  const LIP_COLOR   = "#e11d48";                          // natural lip
  const EYE_WHITE   = "#ffffff";                          
  const IRIS_COLOR  = "#45220a";                          // dark hazel
  const PUPIL_COLOR = "#000000";
  const GOWN        = "#0ea5e9";                          // cyan hospital gown
  const GOWN_STRIPE = "#0284c7";                          
  const HAIR        = "#1e1b4b";                          // deep navy/black hair
  const HAIR_LIGHT  = "#311042";                          
  const WOUND_RED   = "#dc2626";
  const WOUND_ORANGE = "#ea580c";
  const BANDAGE     = "#fef08a";                          // yellow comic bandage

  return (
    <group ref={bodyRef} position={[0, 0, 0]}>

      {/* ====== HEAD ====== */}
      {/* Cranium Outline */}
      <mesh position={[0, 1.42, 0]} scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      {/* Cranium */}
      <mesh position={[0, 1.42, 0]}>
        <sphereGeometry args={[0.3, 28, 28]} />
        <meshStandardMaterial color={SKIN} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Lower face Outline */}
      <mesh position={[0, 1.3, 0.06]} scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      {/* Lower face */}
      <mesh position={[0, 1.3, 0.06]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.3} />
      </mesh>

      {/* Cheeks */}
      <mesh position={[-0.14, 1.36, 0.12]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={SKIN_FLUSH} roughness={0.4} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.14, 1.36, 0.12]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={SKIN_FLUSH} roughness={0.4} transparent opacity={0.5} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.55, -0.02]} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 1.55, -0.02]}>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial color={HAIR} roughness={0.75} />
      </mesh>
      {[
        [-0.08, 1.62, 0.04, 0.08],
        [0.06, 1.63, 0.02, 0.07],
        [0, 1.64, 0.06, 0.06],
      ].map(([x, y, z, r], i) => (
        <mesh key={`ph-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[r, 8, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.7} />
        </mesh>
      ))}

      {/* Eyes */}
      {[[-0.09, 1], [0.09, -1]].map(([x, dir], i) => (
        <group key={`peye-${i}`} position={[x, 1.44, 0.22]}>
          <mesh>
            <sphereGeometry args={[0.04, 14, 14]} />
            <meshStandardMaterial color={EYE_WHITE} roughness={0.12} />
          </mesh>
          <mesh position={[0, -0.003, 0.03]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color={isHealed ? "#22c55e" : IRIS_COLOR} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.003, 0.038]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshStandardMaterial color={PUPIL_COLOR} roughness={0.15} />
          </mesh>
          <mesh position={[0.005 * dir, 0.005, 0.046]}>
            <sphereGeometry args={[0.005, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.058, 0.012]} rotation={[0.1, 0, dir * (isHealed ? -0.06 : 0.22)]}>
            <capsuleGeometry args={[0.006, 0.042, 4, 8]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} />
          </mesh>
        </group>
      ))}

      {/* Nose */}
      <mesh position={[0, 1.38, 0.26]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={0.5} />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.3, 0.22]}>
        <capsuleGeometry args={[0.01, 0.048, 4, 10]} />
        <meshStandardMaterial color={LIP_COLOR} roughness={0.4} />
      </mesh>

      {/* ====== TORSO ====== */}
      {/* Torso Gown Outline */}
      <mesh position={[0, 0.72, 0]} scale={[1.08, 1.04, 1.08]}>
        <capsuleGeometry args={[0.22, 0.45, 10, 14]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.45, 12, 18]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, 0.68, 0.06]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} />
      </mesh>

      {/* ====== ARMS ====== */}
      {/* Left arm */}
      <group position={[-0.32, 0.9, 0]} rotation={[0, 0, hasWordOrderError ? 0.7 : 0.15]}>
        <mesh scale={[1.12, 1.06, 1.12]}>
          <capsuleGeometry args={[0.06, 0.2, 8, 10]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh castShadow>
          <capsuleGeometry args={[0.06, 0.2, 8, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.35} />
        </mesh>
      </group>
      <mesh position={[-0.28, 0.9, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} />
      </mesh>
      <group position={[-0.42, 0.68, 0.04]} rotation={[0.2, 0, hasWordOrderError ? 0.5 : 0.1]}>
        <mesh scale={[1.12, 1.06, 1.12]}>
          <capsuleGeometry args={[0.048, 0.22, 8, 10]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh>
          <capsuleGeometry args={[0.048, 0.22, 8, 10]} />
          <meshStandardMaterial color={SKIN} roughness={0.35} />
        </mesh>
      </group>
      <mesh position={[-0.48, 0.54, 0.08]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.4} />
      </mesh>

      {/* Right arm */}
      <group position={[0.32, 0.9, 0]} rotation={[0, 0, -(hasWordOrderError ? 0.7 : 0.15)]}>
        <mesh scale={[1.12, 1.06, 1.12]}>
          <capsuleGeometry args={[0.06, 0.2, 8, 10]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh castShadow>
          <capsuleGeometry args={[0.06, 0.2, 8, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.35} />
        </mesh>
      </group>
      <mesh position={[0.28, 0.9, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} />
      </mesh>

      {/* Apostrophe error: split arm */}
      {!hasApostropheError ? (
        <>
          <group position={[0.42, 0.68, 0.04]} rotation={[0.2, 0, -0.1]}>
            <mesh scale={[1.12, 1.06, 1.12]}>
              <capsuleGeometry args={[0.048, 0.22, 8, 10]} />
              <meshBasicMaterial color="#000000" side={THREE.BackSide} />
            </mesh>
            <mesh>
              <capsuleGeometry args={[0.048, 0.22, 8, 10]} />
              <meshStandardMaterial color={SKIN} roughness={0.35} />
            </mesh>
          </group>
          <mesh position={[0.48, 0.54, 0.08]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshStandardMaterial color={SKIN} roughness={0.4} />
          </mesh>
        </>
      ) : (
        <>
          {/* Upper fragment */}
          <mesh position={[0.36, 0.76, 0.02]} rotation={[0, 0, -0.35]}>
            <capsuleGeometry args={[0.048, 0.12, 8, 10]} />
            <meshStandardMaterial color={SKIN} roughness={0.35} />
          </mesh>
          {/* Gap spark */}
          <mesh position={[0.42, 0.66, 0.06]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={3.0} transparent opacity={0.8} />
          </mesh>
          {/* Lower fragment */}
          <mesh position={[0.48, 0.54, 0.1]} rotation={[0, 0, -0.08]}>
            <capsuleGeometry args={[0.04, 0.12, 8, 10]} />
            <meshStandardMaterial color={SKIN} roughness={0.35} />
          </mesh>
        </>
      )}

      {/* ====== LEGS ====== */}
      {[[-0.14, 1], [0.14, -1]].map(([x, dir], i) => (
        <group key={`pleg-${i}`}>
          {/* Upper leg */}
          <mesh position={[x, 0.28, 0]} rotation={[hasWordOrderError ? dir * 0.4 : 0, 0, 0]} scale={[1.12, 1.05, 1.12]}>
            <capsuleGeometry args={[0.075, 0.22, 8, 10]} />
            <meshBasicMaterial color="#000000" side={THREE.BackSide} />
          </mesh>
          <mesh position={[x, 0.28, 0]} rotation={[hasWordOrderError ? dir * 0.4 : 0, 0, 0]}>
            <capsuleGeometry args={[0.075, 0.22, 10, 14]} />
            <meshStandardMaterial color={GOWN} roughness={0.4} />
          </mesh>
          {/* Lower leg */}
          <mesh position={[x, 0, hasWordOrderError ? dir * 0.15 : 0]} rotation={[hasWordOrderError ? dir * 0.3 : 0, 0, 0]} scale={[1.12, 1.05, 1.12]}>
            <capsuleGeometry args={[0.06, 0.2, 8, 10]} />
            <meshBasicMaterial color="#000000" side={THREE.BackSide} />
          </mesh>
          <mesh position={[x, 0, hasWordOrderError ? dir * 0.15 : 0]} rotation={[hasWordOrderError ? dir * 0.3 : 0, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.2, 10, 14]} />
            <meshStandardMaterial color={SKIN} roughness={0.35} />
          </mesh>
        </group>
      ))}

      {/* ====== 3D WOUND EFFECTS ====== */}

      {/* Punctuation (Red pulse on left shoulder) */}
      {hasPunctuationError && (
        <mesh position={[-0.34, 0.95, 0.12]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color={WOUND_RED} emissive={WOUND_RED} emissiveIntensity={2.5} transparent opacity={0.9} />
        </mesh>
      )}

      {/* Tense error (chest glitch) */}
      {hasTenseError && (
        <group position={[0, 0.82, 0.22]}>
          <mesh>
            <capsuleGeometry args={[0.06, 0.12, 6, 10]} />
            <meshStandardMaterial color={WOUND_RED} emissive={WOUND_RED} emissiveIntensity={3.0} wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={WOUND_RED} emissive={WOUND_RED} emissiveIntensity={2.0} transparent opacity={0.5} />
          </mesh>
        </group>
      )}

      {/* Agreement error (cracked ribs) */}
      {hasAgreementError && (
        <group position={[0, 0.72, 0.23]}>
          {[0.06, -0.06].map((y, i) => (
            <mesh key={`rib-${i}`} position={[0, y, 0]}>
              <torusGeometry args={[0.16, 0.015, 8, 24]} />
              <meshStandardMaterial color={WOUND_ORANGE} emissive={WOUND_ORANGE} emissiveIntensity={2.5} />
            </mesh>
          ))}
        </group>
      )}

      {/* NEW: Comma splice / unnecessary comma errors (cross cut on right chest/collar) */}
      {hasCommaError && (
        <group position={[0.12, 0.88, 0.18]} rotation={[0, 0, Math.PI / 4]}>
          <mesh>
            <boxGeometry args={[0.15, 0.03, 0.03]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={3} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.15, 0.03, 0.03]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={3} />
          </mesh>
        </group>
      )}

      {/* NEW: Spelling errors (scanner target ring on forehead) */}
      {hasSpellingError && (
        <group position={[0, 1.54, 0.24]} rotation={[0.2, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.08, 0.012, 8, 24]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={3} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {/* NEW: Pronoun case errors (glowing yellow orb near throat) */}
      {hasPronounError && (
        <mesh position={[0, 1.18, 0.16]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={3} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Forehead Bandage */}
      {hasAnyError && (
        <mesh position={[0.08, 1.52, 0.22]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.02, 0.08, 4, 8]} />
          <meshStandardMaterial color={BANDAGE} roughness={0.5} />
        </mesh>
      )}
    </group>
  );
}
