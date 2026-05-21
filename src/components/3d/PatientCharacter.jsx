import React, { useRef } from "react";
import { useGame } from "../GameProvider";

// Detailed cartoon patient character — smooth rounded shapes, hospital gown, visible wounds
export default function PatientCharacter() {
  const { currentWords, activePatient } = useGame();
  const bodyRef = useRef();

  const hasPunctuationError = currentWords.some(w => w.errorType === "punctuation" && w.errorActive);
  const hasTenseError = currentWords.some(w => w.errorType === "tense" && w.errorActive);
  const hasAgreementError = currentWords.some(w => w.errorType === "agreement" && w.errorActive);
  const hasApostropheError = currentWords.some(w => w.errorType === "apostrophe" && w.errorActive);
  const hasWordOrderError = currentWords.some(w => w.errorType === "wordorder" && w.errorActive);
  const isHealed = activePatient && currentWords.every(w => !w.errorActive);
  const hasAnyError = hasPunctuationError || hasTenseError || hasAgreementError || hasApostropheError || hasWordOrderError;

  // Patient is stable and still on the table — no body movement

  // Realistic human skin palette — warm medium skin tone
  const SKIN        = isHealed ? "#c8a882" : "#c49a6c";   // warm olive/tan
  const SKIN_SHADOW = isHealed ? "#b08050" : "#a87848";   // deeper shadow
  const SKIN_FLUSH  = "#d4836a";                          // cheek blush
  const LIP_COLOR   = "#b5604a";                          // natural lip
  const EYE_WHITE   = "#f5f0ea";                          // slightly warm white
  const IRIS_COLOR  = "#4a3020";                          // dark brown iris
  const PUPIL_COLOR = "#1a0e06";
  const GOWN        = "#dde8f4";                          // pale hospital blue-white
  const GOWN_STRIPE = "#b8cce0";                          // soft stripe
  const HAIR        = "#2c1f14";                          // very dark brown/black
  const HAIR_LIGHT  = "#4a3020";                          // hair highlight
  const WOUND_RED   = "#dc2626";
  const WOUND_ORANGE = "#ea580c";
  const BANDAGE     = "#f5e6c8";

  return (
    <group ref={bodyRef} position={[0, 0, 0]}>

      {/* ====== HEAD ====== */}
      {/* Cranium */}
      <mesh position={[0, 1.42, 0]}>
        <sphereGeometry args={[0.3, 28, 28]} />
        <meshStandardMaterial color={SKIN} roughness={0.25} metalness={0.08} />
      </mesh>
      {/* Lower face */}
      <mesh position={[0, 1.3, 0.06]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.3} />
      </mesh>
      {/* Cheeks — natural blush */}
      <mesh position={[-0.14, 1.36, 0.12]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={SKIN_FLUSH} roughness={0.35} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.14, 1.36, 0.12]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={SKIN_FLUSH} roughness={0.35} transparent opacity={0.6} />
      </mesh>

      {/* Patient messy hair */}
      <mesh position={[0, 1.55, -0.02]}>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial color={HAIR} roughness={0.75} />
      </mesh>
      {[
        [-0.08, 1.62, 0.04, 0.08],
        [0.06, 1.63, 0.02, 0.07],
        [0, 1.64, 0.06, 0.06],
        [-0.12, 1.56, 0.06, 0.06],
        [0.1, 1.58, 0.05, 0.05],
      ].map(([x, y, z, r], i) => (
        <mesh key={`ph-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[r, 8, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.7} />
        </mesh>
      ))}

      {/* Eyes — realistic human expression */}
      {[[-0.09, 1], [0.09, -1]].map(([x, dir], i) => (
        <group key={`peye-${i}`} position={[x, 1.44, 0.22]}>
          {/* Sclera */}
          <mesh>
            <sphereGeometry args={[0.04, 14, 14]} />
            <meshStandardMaterial color={EYE_WHITE} roughness={0.12} />
          </mesh>
          {/* Iris */}
          <mesh position={[0, -0.003, 0.03]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color={isHealed ? "#3d7a3a" : IRIS_COLOR} roughness={0.25} />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, -0.003, 0.038]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshStandardMaterial color={PUPIL_COLOR} roughness={0.15} />
          </mesh>
          {/* Eye highlight */}
          <mesh position={[0.005 * dir, 0.005, 0.046]}>
            <sphereGeometry args={[0.005, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Eyebrow — dark, angular when worried */}
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

      {/* Mouth — natural lip colour */}
      <mesh position={[0, 1.3, 0.22]}>
        <capsuleGeometry args={[0.01, 0.048, 4, 10]} />
        <meshStandardMaterial color={LIP_COLOR} roughness={0.4} />
      </mesh>
      {/* Teeth when healed / smiling */}
      {isHealed && (
        <mesh position={[0, 1.305, 0.225]}>
          <capsuleGeometry args={[0.006, 0.032, 4, 8]} />
          <meshStandardMaterial color="#f5efe8" roughness={0.12} />
        </mesh>
      )}

      {/* Ears */}
      {[[-0.27], [0.27]].map(([x], i) => (
        <mesh key={`pear-${i}`} position={[x, 1.4, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={SKIN} roughness={0.5} />
        </mesh>
      ))}

      {/* ====== TORSO — hospital gown ====== */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.45, 12, 18]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, 0.68, 0.06]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} />
      </mesh>
      {/* Gown tie at neck */}
      <mesh position={[0, 1.0, 0.18]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={GOWN_STRIPE} roughness={0.4} />
      </mesh>
      {/* Gown pattern stripes */}
      {[0.82, 0.72, 0.62].map((y, i) => (
        <mesh key={`stripe-${i}`} position={[0, y, 0.22]}>
          <capsuleGeometry args={[0.005, 0.2, 3, 8]} />
          <meshStandardMaterial color={GOWN_STRIPE} roughness={0.5} />
        </mesh>
      ))}

      {/* ====== ARMS ====== */}
      {/* Left arm */}
      <mesh position={[-0.32, 0.9, 0]} rotation={[0, 0, hasWordOrderError ? 0.7 : 0.15]} castShadow>
        <capsuleGeometry args={[0.06, 0.2, 8, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.35} />
      </mesh>
      <mesh position={[-0.28, 0.9, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} />
      </mesh>
      <mesh position={[-0.42, 0.68, 0.04]} rotation={[0.2, 0, hasWordOrderError ? 0.5 : 0.1]}>
        <capsuleGeometry args={[0.048, 0.22, 8, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.35} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.48, 0.54, 0.08]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.4} />
      </mesh>
      {/* Hospital wristband */}
      <mesh position={[-0.45, 0.58, 0.06]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 10]} />
        <meshStandardMaterial color="#bae6fd" roughness={0.3} />
      </mesh>

      {/* WOUND: Punctuation (Red pulse on left shoulder) */}
      {hasPunctuationError && (
        <mesh position={[-0.34, 0.95, 0.12]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color={WOUND_RED} emissive={WOUND_RED} emissiveIntensity={2.0} transparent opacity={0.85} />
        </mesh>
      )}

      {/* Right arm */}
      <mesh position={[0.32, 0.9, 0]} rotation={[0, 0, -(hasWordOrderError ? 0.7 : 0.15)]} castShadow>
        <capsuleGeometry args={[0.06, 0.2, 8, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.35} />
      </mesh>
      <mesh position={[0.28, 0.9, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={GOWN} roughness={0.4} />
      </mesh>

      {/* Apostrophe error: split arm */}
      {!hasApostropheError ? (
        <>
          <mesh position={[0.42, 0.68, 0.04]} rotation={[0.2, 0, -0.1]}>
            <capsuleGeometry args={[0.048, 0.22, 8, 10]} />
            <meshStandardMaterial color={SKIN} roughness={0.35} />
          </mesh>
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
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2.5} transparent opacity={0.7} />
          </mesh>
          {/* Lower fragment */}
          <mesh position={[0.48, 0.54, 0.1]} rotation={[0, 0, -0.08]}>
            <capsuleGeometry args={[0.04, 0.12, 8, 10]} />
            <meshStandardMaterial color={SKIN} roughness={0.35} />
          </mesh>
          <mesh position={[0.52, 0.46, 0.12]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color={SKIN} roughness={0.4} />
          </mesh>
        </>
      )}

      {/* ====== WOUND: Tense (chest glitch) ====== */}
      {hasTenseError && (
        <group position={[0, 0.82, 0.22]}>
          <mesh>
            <capsuleGeometry args={[0.06, 0.12, 6, 10]} />
            <meshStandardMaterial color={WOUND_RED} emissive={WOUND_RED} emissiveIntensity={2.5} wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={WOUND_RED} emissive={WOUND_RED} emissiveIntensity={1.5} transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* ====== WOUND: Agreement (cracked ribs) ====== */}
      {hasAgreementError && (
        <group position={[0, 0.72, 0.23]}>
          {[0.06, -0.06].map((y, i) => (
            <mesh key={`rib-${i}`} position={[0, y, 0]}>
              <torusGeometry args={[0.16, 0.015, 8, 24]} />
              <meshStandardMaterial color={WOUND_ORANGE} emissive={WOUND_ORANGE} emissiveIntensity={2} />
            </mesh>
          ))}
        </group>
      )}

      {/* ====== LEGS ====== */}
      {[[-0.14, 1], [0.14, -1]].map(([x, dir], i) => (
        <group key={`pleg-${i}`}>
          {/* Upper leg */}
          <mesh position={[x, 0.28, 0]} rotation={[hasWordOrderError ? dir * 0.4 : 0, 0, 0]}>
            <capsuleGeometry args={[0.075, 0.22, 10, 14]} />
            <meshStandardMaterial color={GOWN} roughness={0.4} />
          </mesh>
          {/* Knee */}
          <mesh position={[x, 0.15, hasWordOrderError ? dir * 0.08 : 0]}>
            <sphereGeometry args={[0.065, 10, 10]} />
            <meshStandardMaterial color={SKIN} roughness={0.4} />
          </mesh>
          {/* Lower leg */}
          <mesh position={[x, 0, hasWordOrderError ? dir * 0.15 : 0]} rotation={[hasWordOrderError ? dir * 0.3 : 0, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.2, 10, 14]} />
            <meshStandardMaterial color={SKIN} roughness={0.35} />
          </mesh>
          {/* Foot */}
          <mesh position={[x, -0.14, (hasWordOrderError ? dir * 0.2 : 0) + 0.04]}>
            <capsuleGeometry args={[0.04, 0.06, 6, 10]} />
            <meshStandardMaterial color={SKIN_SHADOW} roughness={0.45} />
          </mesh>
        </group>
      ))}

      {/* ====== BANDAGE on forehead ====== */}
      {hasAnyError && (
        <mesh position={[0.08, 1.52, 0.22]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.02, 0.08, 4, 8]} />
          <meshStandardMaterial color={BANDAGE} roughness={0.5} />
        </mesh>
      )}

      {/* ====== IV DRIP on left wrist (when sick) ====== */}
      {hasAnyError && (
        <group position={[-0.48, 0.55, 0.1]}>
          {/* Tube */}
          <mesh position={[0, 0.2, 0]} rotation={[0.1, 0, 0.3]}>
            <capsuleGeometry args={[0.004, 0.4, 4, 6]} />
            <meshStandardMaterial color="#a3d4f7" transparent opacity={0.6} roughness={0.2} />
          </mesh>
          {/* Needle tape */}
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.015, 0.02, 3, 6]} />
            <meshStandardMaterial color={BANDAGE} roughness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}
