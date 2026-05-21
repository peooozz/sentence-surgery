import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGame } from '../GameProvider';

// Highly detailed cartoon male doctor — smooth rounded shapes, no boxes
export default function DoctorCharacter({ position = [-1.2, -0.58, 0.25], rotation = [0, Math.PI / 2, 0] }) {
  const { activeTool } = useGame();
  const groupRef = useRef();
  const toolGlowRef = useRef();

  useFrame(({ clock }) => {
    // Only animate the tool glow — doctor stands firm
    if (toolGlowRef.current) {
      const t = clock.getElapsedTime();
      toolGlowRef.current.material.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.8;
    }
  });


  const SKIN = "#e8b88a";
  const SKIN_DARK = "#d4a074";
  const HAIR = "#7a5230";
  const HAIR_LIGHT = "#9a6e48";
  const COAT = "#f5f7fa";
  const COAT_FOLD = "#dfe4ea";
  const SHIRT = "#4a8fd4";
  const TIE = "#3574b8";
  const PANTS = "#5b9bd5";
  const SHOES = "#eee9e2";
  const SOLE = "#c8c1b8";
  const GLASS = "#1a1814";
  const STETH = "#52739e";
  const CHROME = "#a0aec0";
  const WHITE_EYE = "#fcfcfc";
  const IRIS = "#5a3e28";
  const PUPIL = "#1a1008";

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[1.05, 1.05, 1.05]}>

      {/* ====== SHOES — rounded ====== */}
      {[[-0.1, 0], [0.1, 0]].map(([x], i) => (
        <group key={`shoe-${i}`} position={[x, 0.045, 0.02]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.05, 0.1, 8, 16]} />
            <meshStandardMaterial color={SHOES} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <capsuleGeometry args={[0.055, 0.1, 6, 14]} />
            <meshStandardMaterial color={SOLE} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* ====== LEGS — smooth cylinders with rounded joints ====== */}
      {[[-0.1], [0.1]].map(([x], i) => (
        <group key={`leg-${i}`}>
          {/* Upper leg */}
          <mesh position={[x, 0.52, 0]} castShadow>
            <capsuleGeometry args={[0.065, 0.28, 10, 16]} />
            <meshStandardMaterial color={PANTS} roughness={0.5} />
          </mesh>
          {/* Lower leg */}
          <mesh position={[x, 0.24, 0]} castShadow>
            <capsuleGeometry args={[0.058, 0.24, 10, 16]} />
            <meshStandardMaterial color={PANTS} roughness={0.5} />
          </mesh>
          {/* Knee joint */}
          <mesh position={[x, 0.38, 0.02]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color={PANTS} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ====== TORSO — rounded blue shirt body ====== */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.32, 12, 20]} />
        <meshStandardMaterial color={SHIRT} roughness={0.45} />
      </mesh>
      {/* Belly roundness */}
      <mesh position={[0, 0.88, 0.06]}>
        <sphereGeometry args={[0.17, 14, 14]} />
        <meshStandardMaterial color={SHIRT} roughness={0.45} />
      </mesh>

      {/* ====== WHITE LAB COAT — organic panels ====== */}
      {/* Coat back */}
      <mesh position={[0, 0.88, -0.06]} castShadow>
        <capsuleGeometry args={[0.2, 0.55, 10, 18]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Left coat front panel */}
      <mesh position={[-0.12, 0.82, 0.1]} castShadow>
        <capsuleGeometry args={[0.1, 0.56, 8, 14]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Right coat front panel */}
      <mesh position={[0.12, 0.82, 0.1]} castShadow>
        <capsuleGeometry args={[0.1, 0.56, 8, 14]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Coat shoulders — rounded pads */}
      <mesh position={[-0.22, 1.22, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      <mesh position={[0.22, 1.22, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Coat collar */}
      <mesh position={[0, 1.28, 0.04]}>
        <cylinderGeometry args={[0.16, 0.2, 0.08, 14]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Left lapel fold */}
      <mesh position={[-0.08, 1.22, 0.15]} rotation={[0.15, 0.3, 0.1]}>
        <capsuleGeometry args={[0.03, 0.1, 6, 10]} />
        <meshStandardMaterial color={COAT_FOLD} roughness={0.3} />
      </mesh>
      {/* Right lapel fold */}
      <mesh position={[0.08, 1.22, 0.15]} rotation={[0.15, -0.3, -0.1]}>
        <capsuleGeometry args={[0.03, 0.1, 6, 10]} />
        <meshStandardMaterial color={COAT_FOLD} roughness={0.3} />
      </mesh>

      {/* Coat pockets — rounded */}
      {[[-0.14, 0.72], [0.14, 0.72]].map(([x, y], i) => (
        <group key={`pocket-${i}`} position={[x, y, 0.2]}>
          <mesh>
            <capsuleGeometry args={[0.02, 0.06, 4, 10]} />
            <meshStandardMaterial color={COAT_FOLD} roughness={0.35} />
          </mesh>
          {/* Pocket flap */}
          <mesh position={[0, 0.04, 0]}>
            <capsuleGeometry args={[0.015, 0.06, 4, 8]} />
            <meshStandardMaterial color={COAT_FOLD} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {/* Breast pocket */}
      <mesh position={[-0.12, 1.08, 0.2]}>
        <capsuleGeometry args={[0.015, 0.04, 4, 8]} />
        <meshStandardMaterial color={COAT_FOLD} roughness={0.35} />
      </mesh>
      {/* Pen */}
      <mesh position={[-0.11, 1.12, 0.21]} rotation={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.004, 0.004, 0.07, 6]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.3} />
      </mesh>
      <mesh position={[-0.11, 1.155, 0.21]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Coat buttons */}
      {[0.92, 1.0, 1.08].map((y, i) => (
        <mesh key={`btn-${i}`} position={[0, y, 0.21]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color={CHROME} metalness={0.6} roughness={0.25} />
        </mesh>
      ))}

      {/* ====== TIE — rounded ====== */}
      {/* Knot */}
      <mesh position={[0, 1.24, 0.18]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={TIE} roughness={0.4} />
      </mesh>
      {/* Tie body */}
      <mesh position={[0, 1.05, 0.18]}>
        <capsuleGeometry args={[0.022, 0.3, 6, 10]} />
        <meshStandardMaterial color={TIE} roughness={0.4} />
      </mesh>
      {/* Tie tip */}
      <mesh position={[0, 0.87, 0.18]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0, 0.04, 4]} />
        <meshStandardMaterial color={TIE} roughness={0.4} />
      </mesh>

      {/* ====== NECK ====== */}
      <mesh position={[0, 1.34, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.06, 10, 14]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
      </mesh>

      {/* ====== STETHOSCOPE ====== */}
      <mesh position={[0, 1.3, 0.08]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[0.11, 0.012, 10, 24, Math.PI]} />
        <meshStandardMaterial color={STETH} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Earpieces */}
      {[[-0.1, 1.33], [0.1, 1.33]].map(([x, y], i) => (
        <mesh key={`ear-${i}`} position={[x, y, 0.04]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Hanging tubes */}
      {[[-0.07, 0.15], [0.07, -0.15]].map(([x, rz], i) => (
        <mesh key={`tube-${i}`} position={[x, 1.1, 0.19]} rotation={[0.1, 0, rz * 0.06]}>
          <capsuleGeometry args={[0.008, 0.38, 6, 8]} />
          <meshStandardMaterial color={STETH} metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
      {/* Chest piece */}
      <mesh position={[0, 0.88, 0.22]}>
        <cylinderGeometry args={[0.032, 0.026, 0.016, 14]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.88, 0.23]}>
        <circleGeometry args={[0.018, 14]} />
        <meshStandardMaterial color="#059669" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* ====== HEAD — smooth sphere with anatomical detail ====== */}
      {/* Cranium */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={SKIN} roughness={0.42} />
      </mesh>
      {/* Lower face / jaw — rounded, slightly squared */}
      <mesh position={[0, 1.44, 0.06]}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>
      {/* Chin */}
      <mesh position={[0, 1.38, 0.1]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.48} />
      </mesh>
      {/* Cheekbones */}
      <mesh position={[-0.12, 1.5, 0.1]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>
      <mesh position={[0.12, 1.5, 0.1]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>
      {/* Forehead */}
      <mesh position={[0, 1.62, 0.08]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color={SKIN} roughness={0.42} />
      </mesh>

      {/* ====== NOSE — organic ====== */}
      {/* Bridge */}
      <mesh position={[0, 1.52, 0.18]}>
        <capsuleGeometry args={[0.015, 0.06, 6, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
      </mesh>
      {/* Tip */}
      <mesh position={[0, 1.49, 0.2]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.5} />
      </mesh>
      {/* Nostrils */}
      <mesh position={[-0.012, 1.48, 0.21]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color="#b8875e" roughness={0.6} />
      </mesh>
      <mesh position={[0.012, 1.48, 0.21]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color="#b8875e" roughness={0.6} />
      </mesh>

      {/* ====== EYES — detailed ====== */}
      {[[-0.065, 1], [0.065, -1]].map(([x, dir], i) => (
        <group key={`eye-${i}`} position={[x, 1.555, 0.16]}>
          {/* Eye socket shadow */}
          <mesh position={[0, 0, -0.005]}>
            <sphereGeometry args={[0.038, 14, 14]} />
            <meshStandardMaterial color={SKIN_DARK} roughness={0.5} />
          </mesh>
          {/* White */}
          <mesh>
            <sphereGeometry args={[0.033, 16, 16]} />
            <meshStandardMaterial color={WHITE_EYE} roughness={0.12} />
          </mesh>
          {/* Iris */}
          <mesh position={[0, 0, 0.025]}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshStandardMaterial color={IRIS} roughness={0.3} />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, 0, 0.032]}>
            <sphereGeometry args={[0.01, 10, 10]} />
            <meshStandardMaterial color={PUPIL} roughness={0.2} />
          </mesh>
          {/* Highlight */}
          <mesh position={[0.006 * dir, 0.006, 0.04]}>
            <sphereGeometry args={[0.005, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Upper eyelid */}
          <mesh position={[0, 0.02, 0.01]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.035, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
            <meshStandardMaterial color={SKIN} roughness={0.45} />
          </mesh>
        </group>
      ))}

      {/* Eyebrows — curved */}
      {[[-0.065], [0.065]].map(([x], i) => (
        <mesh key={`brow-${i}`} position={[x, 1.605, 0.17]} rotation={[0.15, 0, i === 0 ? 0.1 : -0.1]}>
          <capsuleGeometry args={[0.008, 0.05, 4, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.6} />
        </mesh>
      ))}

      {/* ====== GLASSES ====== */}
      {/* Frames */}
      {[[-0.065], [0.065]].map(([x], i) => (
        <mesh key={`frame-${i}`} position={[x, 1.555, 0.19]}>
          <torusGeometry args={[0.038, 0.004, 8, 20]} />
          <meshStandardMaterial color={GLASS} roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
      {/* Bridge */}
      <mesh position={[0, 1.555, 0.21]}>
        <capsuleGeometry args={[0.003, 0.02, 4, 6]} />
        <meshStandardMaterial color={GLASS} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Temple arms */}
      {[[-1, -0.1], [1, 0.1]].map(([dir, x], i) => (
        <mesh key={`arm-${i}`} position={[x + dir * 0.09, 1.555, 0.1]} rotation={[0, dir * 0.35, 0]}>
          <capsuleGeometry args={[0.003, 0.16, 4, 6]} />
          <meshStandardMaterial color={GLASS} roughness={0.3} metalness={0.2} />
        </mesh>
      ))}

      {/* ====== MOUTH — friendly smile ====== */}
      {/* Upper lip */}
      <mesh position={[0, 1.44, 0.18]}>
        <capsuleGeometry args={[0.008, 0.05, 4, 10]} />
        <meshStandardMaterial color="#c07a62" roughness={0.5} />
      </mesh>
      {/* Lower lip */}
      <mesh position={[0, 1.43, 0.18]}>
        <capsuleGeometry args={[0.01, 0.04, 4, 10]} />
        <meshStandardMaterial color="#c9836b" roughness={0.5} />
      </mesh>
      {/* Teeth */}
      <mesh position={[0, 1.44, 0.185]}>
        <capsuleGeometry args={[0.006, 0.04, 4, 8]} />
        <meshStandardMaterial color="#fef5e7" roughness={0.15} />
      </mesh>
      {/* Smile crease lines */}
      {[[-0.06], [0.06]].map(([x], i) => (
        <mesh key={`crease-${i}`} position={[x, 1.45, 0.16]}>
          <capsuleGeometry args={[0.003, 0.03, 3, 6]} />
          <meshStandardMaterial color={SKIN_DARK} roughness={0.6} />
        </mesh>
      ))}

      {/* ====== STUBBLE ====== */}
      <mesh position={[0, 1.4, 0.12]}>
        <sphereGeometry args={[0.1, 12, 12, 0, Math.PI * 2, 0.3, Math.PI * 0.5]} />
        <meshStandardMaterial color="#c4956a" roughness={0.75} />
      </mesh>

      {/* ====== EARS ====== */}
      {[[-0.2], [0.2]].map(([x], i) => (
        <group key={`ear-g-${i}`} position={[x, 1.53, 0]}>
          <mesh>
            <sphereGeometry args={[0.032, 10, 10]} />
            <meshStandardMaterial color={SKIN} roughness={0.5} />
          </mesh>
          <mesh position={[x > 0 ? 0.01 : -0.01, 0, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={SKIN_DARK} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ====== BROWN WAVY HAIR — lush and voluminous ====== */}
      {/* Base cap */}
      <mesh position={[0, 1.65, -0.02]}>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshStandardMaterial color={HAIR} roughness={0.7} />
      </mesh>
      {/* Top volume waves */}
      {[
        [0, 1.77, 0.02, 0.12, HAIR_LIGHT],
        [-0.06, 1.78, 0.04, 0.085, HAIR],
        [0.07, 1.79, 0.03, 0.09, HAIR_LIGHT],
        [0, 1.76, 0.09, 0.09, HAIR],
        [0.04, 1.73, 0.13, 0.065, HAIR_LIGHT],
        [-0.05, 1.72, 0.12, 0.055, HAIR],
        [-0.09, 1.74, 0.06, 0.06, HAIR_LIGHT],
        [0.1, 1.74, 0.05, 0.06, HAIR],
        [0, 1.8, 0, 0.07, HAIR_LIGHT],
        [-0.04, 1.76, 0.1, 0.05, HAIR],
        [0.06, 1.77, 0.08, 0.055, HAIR_LIGHT],
      ].map(([x, y, z, r, c], i) => (
        <mesh key={`hair-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[r, 12, 12]} />
          <meshStandardMaterial color={c} roughness={0.65} />
        </mesh>
      ))}
      {/* Side hair */}
      {[[-0.17, 1.6], [0.17, 1.6]].map(([x, y], i) => (
        <mesh key={`side-${i}`} position={[x, y, 0]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color={HAIR} roughness={0.7} />
        </mesh>
      ))}
      {/* Back hair */}
      <mesh position={[0, 1.58, -0.14]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color={HAIR} roughness={0.7} />
      </mesh>

      {/* ====== ARMS ====== */}
      {/* LEFT ARM — relaxed */}
      <mesh position={[-0.3, 1.1, 0.02]} rotation={[0.12, 0, 0.12]} castShadow>
        <capsuleGeometry args={[0.05, 0.22, 8, 12]} />
        <meshStandardMaterial color={COAT} roughness={0.3} />
      </mesh>
      <mesh position={[-0.26, 1.1, 0.02]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={COAT} roughness={0.3} />
      </mesh>
      <mesh position={[-0.34, 0.82, 0.08]} rotation={[0.25, 0, 0.06]} castShadow>
        <capsuleGeometry args={[0.045, 0.22, 8, 12]} />
        <meshStandardMaterial color={COAT} roughness={0.3} />
      </mesh>
      {/* Left wrist cuff */}
      <mesh position={[-0.36, 0.68, 0.12]}>
        <cylinderGeometry args={[0.05, 0.048, 0.03, 12]} />
        <meshStandardMaterial color={COAT_FOLD} roughness={0.3} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.37, 0.62, 0.14]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>
      {/* Fingers */}
      {[[-0.39, 0.585, 0.15], [-0.37, 0.58, 0.16], [-0.35, 0.58, 0.155], [-0.36, 0.585, 0.13]].map(([x, y, z], i) => (
        <mesh key={`lf-${i}`} position={[x, y, z]}>
          <capsuleGeometry args={[0.008, 0.025, 4, 6]} />
          <meshStandardMaterial color={SKIN} roughness={0.45} />
        </mesh>
      ))}

      {/* RIGHT ARM — raised holding tool */}
      <mesh position={[0.3, 1.1, 0.04]} rotation={[0.3, 0, -0.18]} castShadow>
        <capsuleGeometry args={[0.05, 0.22, 8, 12]} />
        <meshStandardMaterial color={COAT} roughness={0.3} />
      </mesh>
      <mesh position={[0.26, 1.1, 0.04]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={COAT} roughness={0.3} />
      </mesh>
      <mesh position={[0.36, 0.84, 0.18]} rotation={[0.55, 0, -0.12]} castShadow>
        <capsuleGeometry args={[0.045, 0.22, 8, 12]} />
        <meshStandardMaterial color={COAT} roughness={0.3} />
      </mesh>
      {/* Right wrist cuff */}
      <mesh position={[0.38, 0.7, 0.28]}>
        <cylinderGeometry args={[0.05, 0.048, 0.03, 12]} />
        <meshStandardMaterial color={COAT_FOLD} roughness={0.3} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.39, 0.64, 0.32]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>
      {/* Fingers gripping */}
      {[[0.41, 0.61, 0.33], [0.39, 0.6, 0.34], [0.37, 0.6, 0.335], [0.38, 0.615, 0.305]].map(([x, y, z], i) => (
        <mesh key={`rf-${i}`} position={[x, y, z]}>
          <capsuleGeometry args={[0.008, 0.022, 4, 6]} />
          <meshStandardMaterial color={SKIN} roughness={0.45} />
        </mesh>
      ))}

      {/* ====== SYRINGE / TOOL ====== */}
      <group position={[0.39, 0.55, 0.34]} rotation={[Math.PI * 0.38, 0, 0.12]}>
        {/* Barrel */}
        <mesh>
          <capsuleGeometry args={[0.018, 0.1, 8, 12]} />
          <meshStandardMaterial color="#e8edf2" transparent opacity={0.7} roughness={0.08} metalness={0.3} />
        </mesh>
        {/* Liquid */}
        <mesh position={[0, 0.01, 0]}>
          <capsuleGeometry args={[0.012, 0.06, 6, 10]} />
          <meshStandardMaterial color="#7dd3fc" transparent opacity={0.5} roughness={0.1} />
        </mesh>
        {/* Plunger top */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.015, 10]} />
          <meshStandardMaterial color={CHROME} metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <capsuleGeometry args={[0.005, 0.06, 4, 6]} />
          <meshStandardMaterial color={CHROME} metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Needle */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.003, 0.001, 0.06, 6]} />
          <meshStandardMaterial color="#c0c8d0" metalness={0.9} roughness={0.05} />
        </mesh>
        {/* Tool glow tip */}
        {activeTool && (
          <mesh ref={toolGlowRef} position={[0, -0.11, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial
              color={activeTool === 'scalpel' ? '#ef4444' : activeTool === 'injector' ? '#38bdf8' : activeTool === 'implant' ? '#c084fc' : activeTool === 'clamp' ? '#34d399' : '#fbbf24'}
              emissive={activeTool === 'scalpel' ? '#ef4444' : activeTool === 'injector' ? '#38bdf8' : activeTool === 'implant' ? '#c084fc' : activeTool === 'clamp' ? '#34d399' : '#fbbf24'}
              emissiveIntensity={1.5}
              transparent opacity={0.9}
            />
          </mesh>
        )}
      </group>

      {/* ====== NAME BADGE ====== */}
      <mesh position={[0.13, 1.13, 0.22]}>
        <capsuleGeometry args={[0.012, 0.04, 4, 8]} />
        <meshStandardMaterial color="#fef9c3" roughness={0.4} />
      </mesh>
      <mesh position={[0.13, 1.15, 0.22]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color={CHROME} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}
