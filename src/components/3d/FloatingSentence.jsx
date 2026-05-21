import React, { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../GameProvider";

// Laser Sight Line from ceiling to a word position
function LaserSight({ targetX }) {
  const points = useMemo(() => [
    [targetX, 5.0, 0],
    [targetX, 0, 0]
  ], [targetX]);

  return (
    <Line
      points={points}
      color="#ef4444"
      lineWidth={1.5}
      transparent
      opacity={0.5}
    />
  );
}

// Floating Operation Status Text above a word
function FloatingStatus({ x, text, color, scale = 1.0 }) {
  const groupRef = useRef();
  const startTime = useRef(null);

  useFrame(({ clock }) => {
    if (!startTime.current) startTime.current = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - startTime.current;
    if (groupRef.current) {
      groupRef.current.position.y = (0.55 * scale) + elapsed * 0.3;
      // Fade out by scaling down
      const currentScale = Math.max(0.01, 1 - elapsed * 0.4) * scale;
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <group ref={groupRef} position={[x, 0.55 * scale, 0.3]}>
      <Text
        fontSize={0.15 * scale}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

// Suture Joint (green cylinder connecting two healed words)
function SutureJoint({ x1, x2, y, scale = 1.0 }) {
  const length = Math.abs(x2 - x1);
  const centerX = (x1 + x2) / 2;
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 3) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[centerX, y, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.02 * scale, 0.02 * scale, length, 8]} />
      <meshStandardMaterial
        color="#22c55e"
        emissive="#22c55e"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function FloatingSentence({ 
  onOpenScalpel, 
  onOpenInjector, 
  onOpenImplant,
  onOpenClampSelector
}) {
  const { 
    currentWords, 
    activeTool, 
    applyToolFix, 
    reorderWords, 
    deleteWord 
  } = useGame();

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [forcepsSelectedIdx, setForcepsSelectedIdx] = useState(null);
  const [clampedWordIdx, setClampedWordIdx] = useState(null);
  const [statusEffects, setStatusEffects] = useState([]);

  // Position spacing constants scaled dynamically based on the word count
  const scale = currentWords.length > 5 ? Math.max(0.48, 5.0 / currentWords.length) : 0.95;
  const blockWidth = 1.15 * scale;
  const blockHeight = 0.52 * scale;
  const blockDepth = 0.25 * scale;
  const spacing = 1.25 * scale;
  const startX = -((currentWords.length - 1) * spacing) / 2;

  const showStatus = (x, text, color) => {
    const id = Date.now() + Math.random();
    setStatusEffects(prev => [...prev, { id, x, text, color }]);
    setTimeout(() => {
      setStatusEffects(prev => prev.filter(s => s.id !== id));
    }, 2000);
  };

  const handleWordClick = (idx, word) => {
    const xPos = startX + idx * spacing;

    if (!activeTool) {
      applyToolFix(idx, null, null);
      return;
    }

    // 1. Punctuation Scalpel
    if (activeTool === "scalpel") {
      if (word.errorType === "punctuation") {
        showStatus(xPos, "INCISING...", "#ef4444");
        onOpenScalpel(idx, word);
      } else {
        applyToolFix(idx, "scalpel", "");
      }
    }

    // 2. Tense Injector
    else if (activeTool === "injector") {
      if (word.errorType === "tense") {
        showStatus(xPos, "INJECTING...", "#0ea5e9");
        onOpenInjector(idx, word);
      } else {
        applyToolFix(idx, "injector", "");
      }
    }

    // 3. Apostrophe Implant
    else if (activeTool === "implant") {
      if (word.errorType === "apostrophe") {
        showStatus(xPos, "IMPLANTING...", "#a855f7");
        onOpenImplant(idx, word);
      } else {
        applyToolFix(idx, "implant", "");
      }
    }

    // 4. Agreement Clamp
    else if (activeTool === "clamp") {
      if (clampedWordIdx === null) {
        setClampedWordIdx(idx);
        showStatus(xPos, "CLAMPED!", "#22c55e");
      } else {
        const firstIdx = clampedWordIdx;
        setClampedWordIdx(null);

        if (firstIdx === idx) return;

        const firstWord = currentWords[firstIdx];
        const secondWord = currentWords[idx];

        const agreementWordIdx = firstWord.errorType === "agreement" ? firstIdx : (secondWord.errorType === "agreement" ? idx : null);
        
        if (agreementWordIdx !== null) {
          showStatus(xPos, "ALIGNING...", "#10b981");
          onOpenClampSelector(agreementWordIdx, currentWords[agreementWordIdx]);
        } else {
          applyToolFix(idx, "clamp", "");
        }
      }
    }

    // 5. Word Order Forceps
    else if (activeTool === "forceps") {
      if (word.errorType === "delete") {
        showStatus(xPos, "REMOVING!", "#f59e0b");
        deleteWord(idx);
        setForcepsSelectedIdx(null);
        return;
      }

      if (forcepsSelectedIdx === null) {
        setForcepsSelectedIdx(idx);
        showStatus(xPos, "GRABBED!", "#f59e0b");
      } else {
        const fromIdx = forcepsSelectedIdx;
        setForcepsSelectedIdx(null);

        if (fromIdx !== idx) {
          showStatus(xPos, "REPOSITIONED!", "#f59e0b");
          reorderWords(fromIdx, idx);
        }
      }
    }
  };

  // Find suture pairs (consecutive fixed words)
  const suturePairs = [];
  for (let i = 0; i < currentWords.length - 1; i++) {
    if (currentWords[i].isFixed && currentWords[i + 1].isFixed) {
      suturePairs.push({
        x1: startX + i * spacing + blockWidth / 2,
        x2: startX + (i + 1) * spacing - blockWidth / 2,
        y: 0
      });
    }
  }

  return (
    <group position={[0, 2.3, 0]}>
      {/* Laser Sight on hovered word */}
      {hoveredIdx !== null && activeTool && (
        <LaserSight targetX={startX + hoveredIdx * spacing} />
      )}

      {/* Suture joints between healed words */}
      {suturePairs.map((pair, idx) => (
        <SutureJoint key={`suture-${idx}`} x1={pair.x1} x2={pair.x2} y={pair.y} scale={scale} />
      ))}

      {/* Floating operation status text effects */}
      {statusEffects.map(effect => (
        <FloatingStatus key={effect.id} x={effect.x} text={effect.text} color={effect.color} scale={scale} />
      ))}

      {currentWords.map((word, idx) => {
        const xPos = startX + idx * spacing;
        const isHovered = hoveredIdx === idx;
        const isForcepsSelected = forcepsSelectedIdx === idx;
        const isClampedSelected = clampedWordIdx === idx;

        // Visual properties — hospital white blocks
        // Clinical medical color palette for word diagnosis
        let blockColor = "#e0f2fe";       // Sterile sky-blue for healthy words
        let emissiveColor = "#0284c7";    // Sky blue glow
        let glowIntensity = 0.35;

        if (word.isFixed) {
          blockColor = "#dcfce7";         // Stable healed green
          emissiveColor = "#16a34a";      // Emerald glow
          glowIntensity = 0.7;
        } else if (word.errorActive) {
          blockColor = "#fee2e2";         // Injured warning red
          emissiveColor = "#e11d48";      // Rose glow
          glowIntensity = 0.8;
        } else if (isForcepsSelected) {
          emissiveColor = "#eab308";      // Amber forceps highlight
          glowIntensity = 1.5;
        } else if (isClampedSelected) {
          emissiveColor = "#22c55e";      // Clamp align highlight
          glowIntensity = 1.5;
        }

        return (
          <group key={word.id} position={[xPos, 0, 0]}>
            {/* 3D Word Block */}
            <mesh 
              scale={isHovered ? 1.08 : 1.0}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredIdx(idx);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredIdx(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleWordClick(idx, word);
              }}
            >
              <boxGeometry args={[blockWidth, blockHeight, blockDepth]} />
              <meshStandardMaterial 
                color={blockColor} 
                roughness={0.15} 
                metalness={0.3} 
                emissive={emissiveColor}
                emissiveIntensity={glowIntensity}
                transparent={true}
                opacity={0.95}
              />
            </mesh>

            {/* Word Text */}
            <Text
              position={[0, 0, blockDepth / 2 + 0.02]}
              fontSize={0.24 * scale}
              color={word.isFixed ? "#166534" : "#1e293b"}
              anchorX="center"
              anchorY="middle"
              depthOffset={1.5}
            >
              {word.currentText}
            </Text>

            {/* Error wireframe overlay */}
            {word.errorActive && (
              <mesh position={[0, 0, 0]} scale={1.04}>
                <boxGeometry args={[blockWidth + 0.06 * scale, blockHeight + 0.06 * scale, blockDepth + 0.02 * scale]} />
                <meshBasicMaterial 
                  color={word.errorType === "punctuation" || word.errorType === "tense" ? "#ef4444" : "#f97316"} 
                  wireframe={true} 
                  transparent={true} 
                  opacity={0.3} 
                />
              </mesh>
            )}

            {/* Healed glow ring */}
            {word.isFixed && (
              <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.7 * scale, 0.015 * scale, 8, 32]} />
                <meshBasicMaterial color="#22c55e" transparent opacity={0.25} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
