import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../GameProvider';

// Detailed cartoon doctor character with comic cel-shading outlines
export default function DoctorCharacter({ position = [-1.2, -0.58, 0.25], rotation = [0, Math.PI / 2, 0] }) {
  const { activeTool } = useGame();
  const groupRef = useRef();
  const toolGlowRef = useRef();

  useFrame(({ clock }) => {
    if (toolGlowRef.current) {
      const t = clock.getElapsedTime();
      toolGlowRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 5) * 0.9;
    }
  });

  const SKIN = "#f5c39a"; // Saturated realistic skin tone
  const SKIN_DARK = "#e2a67c";
  const HAIR = "#4b3525"; // Rich brown
  const HAIR_LIGHT = "#6b4f3a";
  const COAT = "#ffffff"; // Vivid white
  const COAT_FOLD = "#e2e8f0";
  const SHIRT = "#0284c7"; // Saturated primary blue
  const TIE = "#dc2626"; // Vibrant red
  const PANTS = "#1e293b"; // Dark slate
  const SHOES = "#f8fafc";
  const SOLE = "#000000";
  const GLASS = "#000000";
  const STETH = "#334155";
  const CHROME = "#94a3b8";
  const WHITE_EYE = "#ffffff";
  const IRIS = "#3b2314";
  const PUPIL = "#000000";

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[1.05, 1.05, 1.05]}>

      {/* ====== SHOES ====== */}
      {[[-0.1, 0], [0.1, 0]].map(([x], i) => (
        <group key={`shoe-${i}`} position={[x, 0.045, 0.02]}>
          {/* Outline */}
          <mesh scale={[1.12, 1.12, 1.12]}>
            <capsuleGeometry args={[0.05, 0.1, 8, 12]} />
            <meshBasicMaterial color="#000000" side={THREE.BackSide} />
          </mesh>
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

      {/* ====== LEGS ====== */}
      {[[-0.1], [0.1]].map(([x], i) => (
        <group key={`leg-${i}`}>
          {/* Upper leg */}
          <mesh position={[x, 0.52, 0]} scale={[1.12, 1.08, 1.12]}>
            <capsuleGeometry args={[0.065, 0.28, 8, 12]} />
            <meshBasicMaterial color="#000000" side={THREE.BackSide} />
          </mesh>
          <mesh position={[x, 0.52, 0]} castShadow>
            <capsuleGeometry args={[0.065, 0.28, 10, 16]} />
            <meshStandardMaterial color={PANTS} roughness={0.5} />
          </mesh>
          {/* Lower leg */}
          <mesh position={[x, 0.24, 0]} scale={[1.12, 1.08, 1.12]}>
            <capsuleGeometry args={[0.058, 0.24, 8, 12]} />
            <meshBasicMaterial color="#000000" side={THREE.BackSide} />
          </mesh>
          <mesh position={[x, 0.24, 0]} castShadow>
            <capsuleGeometry args={[0.058, 0.24, 10, 16]} />
            <meshStandardMaterial color={PANTS} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ====== TORSO / SHIRT ====== */}
      {/* Torso Outline */}
      <mesh position={[0, 0.95, 0]} scale={[1.08, 1.05, 1.08]}>
        <capsuleGeometry args={[0.18, 0.32, 10, 14]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.32, 12, 20]} />
        <meshStandardMaterial color={SHIRT} roughness={0.45} />
      </mesh>
      {/* Belly roundness */}
      <mesh position={[0, 0.88, 0.06]}>
        <sphereGeometry args={[0.17, 14, 14]} />
        <meshStandardMaterial color={SHIRT} roughness={0.45} />
      </mesh>

      {/* ====== WHITE LAB COAT ====== */}
      {/* Coat back */}
      <mesh position={[0, 0.88, -0.06]} scale={[1.06, 1.04, 1.08]}>
        <capsuleGeometry args={[0.2, 0.55, 8, 12]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.88, -0.06]} castShadow>
        <capsuleGeometry args={[0.2, 0.55, 10, 18]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Left coat front panel */}
      <mesh position={[-0.12, 0.82, 0.1]} scale={[1.08, 1.04, 1.08]}>
        <capsuleGeometry args={[0.1, 0.56, 8, 12]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[-0.12, 0.82, 0.1]} castShadow>
        <capsuleGeometry args={[0.1, 0.56, 8, 14]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Right coat front panel */}
      <mesh position={[0.12, 0.82, 0.1]} scale={[1.08, 1.04, 1.08]}>
        <capsuleGeometry args={[0.1, 0.56, 8, 12]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0.12, 0.82, 0.1]} castShadow>
        <capsuleGeometry args={[0.1, 0.56, 8, 14]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 1.28, 0.04]} scale={[1.06, 1.06, 1.06]}>
        <cylinderGeometry args={[0.16, 0.2, 0.08, 12]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 1.28, 0.04]}>
        <cylinderGeometry args={[0.16, 0.2, 0.08, 14]} />
        <meshStandardMaterial color={COAT} roughness={0.25} />
      </mesh>

      {/* ====== TIE ====== */}
      <mesh position={[0, 1.24, 0.18]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={TIE} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.05, 0.18]}>
        <capsuleGeometry args={[0.022, 0.3, 6, 10]} />
        <meshStandardMaterial color={TIE} roughness={0.4} />
      </mesh>

      {/* ====== NECK ====== */}
      <mesh position={[0, 1.34, 0]} scale={[1.1, 1.1, 1.1]}>
        <capsuleGeometry args={[0.06, 0.06, 8, 10]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 1.34, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.06, 10, 14]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
      </mesh>

      {/* ====== HEAD ====== */}
      {/* Cranium Outline */}
      <mesh position={[0, 1.55, 0]} scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={SKIN} roughness={0.42} />
      </mesh>
      {/* Lower face */}
      <mesh position={[0, 1.44, 0.06]} scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 1.44, 0.06]}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.38, 0.1]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.48} />
      </mesh>

      {/* Eyes */}
      {[[-0.065, 1], [0.065, -1]].map(([x, dir], i) => (
        <group key={`eye-${i}`} position={[x, 1.555, 0.16]}>
          <mesh>
            <sphereGeometry args={[0.033, 16, 16]} />
            <meshStandardMaterial color={WHITE_EYE} roughness={0.12} />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshStandardMaterial color={IRIS} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.032]}>
            <sphereGeometry args={[0.01, 10, 10]} />
            <meshStandardMaterial color={PUPIL} roughness={0.2} />
          </mesh>
          <mesh position={[0.006 * dir, 0.006, 0.04]}>
            <sphereGeometry args={[0.005, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Nose */}
      <mesh position={[0, 1.49, 0.2]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.5} />
      </mesh>

      {/* Glasses */}
      {[[-0.065], [0.065]].map(([x], i) => (
        <mesh key={`frame-${i}`} position={[x, 1.555, 0.19]}>
          <torusGeometry args={[0.038, 0.004, 8, 20]} />
          <meshStandardMaterial color={GLASS} roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 1.555, 0.21]}>
        <capsuleGeometry args={[0.003, 0.02, 4, 6]} />
        <meshStandardMaterial color={GLASS} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Mouth smile */}
      <mesh position={[0, 1.43, 0.18]}>
        <capsuleGeometry args={[0.01, 0.04, 4, 10]} />
        <meshStandardMaterial color="#dc2626" roughness={0.5} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.65, -0.02]}>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshStandardMaterial color={HAIR} roughness={0.7} />
      </mesh>
      {[
        [0, 1.77, 0.02, 0.12, HAIR_LIGHT],
        [-0.06, 1.78, 0.04, 0.085, HAIR],
        [0.07, 1.79, 0.03, 0.09, HAIR_LIGHT],
        [0, 1.76, 0.09, 0.09, HAIR],
        [0.04, 1.73, 0.13, 0.065, HAIR_LIGHT],
        [-0.05, 1.72, 0.12, 0.055, HAIR],
        [-0.09, 1.74, 0.06, 0.06, HAIR_LIGHT],
        [0.1, 1.74, 0.05, 0.06, HAIR],
      ].map(([x, y, z, r, c], i) => (
        <mesh key={`hair-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[r, 12, 12]} />
          <meshStandardMaterial color={c} roughness={0.65} />
        </mesh>
      ))}

      {/* ====== ARMS ====== */}
      {/* LEFT ARM */}
      <group position={[-0.3, 1.1, 0.02]} rotation={[0.12, 0, 0.12]}>
        {/* Outline */}
        <mesh scale={[1.12, 1.06, 1.12]}>
          <capsuleGeometry args={[0.05, 0.22, 8, 10]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh castShadow>
          <capsuleGeometry args={[0.05, 0.22, 8, 12]} />
          <meshStandardMaterial color={COAT} roughness={0.3} />
        </mesh>
      </group>
      <group position={[-0.34, 0.82, 0.08]} rotation={[0.25, 0, 0.06]}>
        {/* Outline */}
        <mesh scale={[1.12, 1.06, 1.12]}>
          <capsuleGeometry args={[0.045, 0.22, 8, 10]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh castShadow>
          <capsuleGeometry args={[0.045, 0.22, 8, 12]} />
          <meshStandardMaterial color={COAT} roughness={0.3} />
        </mesh>
      </group>
      <mesh position={[-0.37, 0.62, 0.14]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>

      {/* RIGHT ARM holding tool */}
      <group position={[0.3, 1.1, 0.04]} rotation={[0.3, 0, -0.18]}>
        {/* Outline */}
        <mesh scale={[1.12, 1.06, 1.12]}>
          <capsuleGeometry args={[0.05, 0.22, 8, 10]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh castShadow>
          <capsuleGeometry args={[0.05, 0.22, 8, 12]} />
          <meshStandardMaterial color={COAT} roughness={0.3} />
        </mesh>
      </group>
      <group position={[0.36, 0.84, 0.18]} rotation={[0.55, 0, -0.12]}>
        {/* Outline */}
        <mesh scale={[1.12, 1.06, 1.12]}>
          <capsuleGeometry args={[0.045, 0.22, 8, 10]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh castShadow>
          <capsuleGeometry args={[0.045, 0.22, 8, 12]} />
          <meshStandardMaterial color={COAT} roughness={0.3} />
        </mesh>
      </group>
      <mesh position={[0.39, 0.64, 0.32]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>

      {/* ====== SYRINGE / TOOL ====== */}
      <group position={[0.39, 0.55, 0.34]} rotation={[Math.PI * 0.38, 0, 0.12]}>
        {/* Outline */}
        <mesh scale={[1.12, 1.08, 1.12]}>
          <capsuleGeometry args={[0.018, 0.1, 8, 12]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh>
          <capsuleGeometry args={[0.018, 0.1, 8, 12]} />
          <meshStandardMaterial color="#e8edf2" transparent opacity={0.7} roughness={0.08} metalness={0.3} />
        </mesh>
        {/* Liquid */}
        <mesh position={[0, 0.01, 0]}>
          <capsuleGeometry args={[0.012, 0.06, 6, 10]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} roughness={0.1} />
        </mesh>
        {/* Needle */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.003, 0.001, 0.06, 6]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.05} />
        </mesh>
        {/* Tool glow tip */}
        {activeTool && (
          <mesh ref={toolGlowRef} position={[0, -0.11, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial
              color={
                activeTool === 'scalpel' ? '#ef4444' : 
                activeTool === 'injector' ? '#06b6d4' : 
                activeTool === 'implant' ? '#d946ef' : 
                activeTool === 'clamp' ? '#22c55e' : 
                activeTool === 'scissors' ? '#ec4899' :
                activeTool === 'scanner' ? '#a855f7' :
                activeTool === 'tweezers' ? '#eab308' : '#fbbf24'
              }
              emissive={
                activeTool === 'scalpel' ? '#ef4444' : 
                activeTool === 'injector' ? '#06b6d4' : 
                activeTool === 'implant' ? '#d946ef' : 
                activeTool === 'clamp' ? '#22c55e' : 
                activeTool === 'scissors' ? '#ec4899' :
                activeTool === 'scanner' ? '#a855f7' :
                activeTool === 'tweezers' ? '#eab308' : '#fbbf24'
              }
              emissiveIntensity={2.0}
              transparent opacity={0.9}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}
