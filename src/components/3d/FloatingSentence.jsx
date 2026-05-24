import React, { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line, RoundedBox, Edges } from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../GameProvider";

// Laser Sight Line from ceiling to a word position
function LaserSight({ targetX, color }) {
  const points = useMemo(() => [
    [targetX, 5.0, 0],
    [targetX, 0, 0]
  ], [targetX]);

  return (
    <Line
      points={points}
      color={color || "#ef4444"}
      lineWidth={2.0}
      transparent
      opacity={0.6}
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
      groupRef.current.position.y = (0.55 * scale) + elapsed * 0.35;
      const currentScale = Math.max(0.01, 1 - elapsed * 0.45) * scale;
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <group ref={groupRef} position={[x, 0.55 * scale, 0.3]}>
      <Text
        fontSize={0.16 * scale}
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
      meshRef.current.material.emissiveIntensity = 0.6 + Math.sin(t * 4) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[centerX, y, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.02 * scale, 0.02 * scale, length, 8]} />
      <meshStandardMaterial
        color="#22c55e"
        emissive="#22c55e"
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export default function FloatingSentence({ 
  onOpenScalpel, 
  onOpenInjector, 
  onOpenImplant,
  onOpenClampSelector,
  onOpenScissors,
  onOpenScanner,
  onOpenTweezers
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
        showStatus(xPos, "IMPLANTING...", "#d946ef");
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
          showStatus(xPos, "ALIGNING...", "#22c55e");
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

    // 6. Comma Scissors
    else if (activeTool === "scissors") {
      if (word.errorType === "comma") {
        showStatus(xPos, "CUTTING...", "#ec4899");
        onOpenScissors(idx, word);
      } else {
        applyToolFix(idx, "scissors", "");
      }
    }

    // 7. Spell Scanner
    else if (activeTool === "scanner") {
      if (word.errorType === "spelling") {
        showStatus(xPos, "SCANNING...", "#8b5cf6");
        onOpenScanner(idx, word);
      } else {
        applyToolFix(idx, "scanner", "");
      }
    }

    // 8. Pronoun Tweezers
    else if (activeTool === "tweezers") {
      if (word.errorType === "pronoun") {
        showStatus(xPos, "PLUCKING...", "#eab308");
        onOpenTweezers(idx, word);
      } else {
        applyToolFix(idx, "tweezers", "");
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

  // Get active laser color based on selected tool
  const getLaserColor = () => {
    switch (activeTool) {
      case "scalpel": return "#ef4444";
      case "injector": return "#0ea5e9";
      case "implant": return "#d946ef";
      case "clamp": return "#22c55e";
      case "forceps": return "#f59e0b";
      case "scissors": return "#ec4899";
      case "scanner": return "#8b5cf6";
      case "tweezers": return "#eab308";
      default: return "#ef4444";
    }
  };

  return (
    <group position={[0, 2.3, 0]}>
      {/* Laser Sight on hovered word */}
      {hoveredIdx !== null && activeTool && (
        <LaserSight targetX={startX + hoveredIdx * spacing} color={getLaserColor()} />
      )}

      {/* Suture joints between healed words */}
      {suturePairs.map((pair, idx) => (
        <SutureJoint key={`suture-${idx}`} x1={pair.x1} x2={pair.x2} y={pair.y} scale={scale} />
      ))}

      {/* Floating status text */}
      {statusEffects.map(effect => (
        <FloatingStatus key={effect.id} x={effect.x} text={effect.text} color={effect.color} scale={scale} />
      ))}

      {currentWords.map((word, idx) => {
        const xPos = startX + idx * spacing;
        const isHovered = hoveredIdx === idx;
        const isForcepsSelected = forcepsSelectedIdx === idx;
        const isClampedSelected = clampedWordIdx === idx;

        // Visual properties - Comic Block Style
        let blockColor = "#f1f5f9";       
        let emissiveColor = "#475569";    
        let glowIntensity = 0.2;

        if (isClampedSelected) {
          blockColor = "#dcfce7";
          emissiveColor = "#22c55e";
          glowIntensity = 1.8;
        } else if (isForcepsSelected) {
          blockColor = "#ffedd5";
          emissiveColor = "#f59e0b";
          glowIntensity = 1.8;
        } else if (word.isFixed) {
          blockColor = "#dcfce7";         
          emissiveColor = "#22c55e";      
          glowIntensity = 0.8;
        } else if (word.errorActive) {
          // Color-code based on error type
          if (word.errorType === "punctuation") {
            blockColor = "#ffe4e6";
            emissiveColor = "#f43f5e";
          } else if (word.errorType === "tense") {
            blockColor = "#e0f2fe";
            emissiveColor = "#0ea5e9";
          } else if (word.errorType === "agreement") {
            blockColor = "#ffedd5";
            emissiveColor = "#f97316";
          } else if (word.errorType === "apostrophe") {
            blockColor = "#fae8ff";
            emissiveColor = "#d946ef";
          } else if (word.errorType === "comma") {
            blockColor = "#fce7f3";
            emissiveColor = "#ec4899";
          } else if (word.errorType === "spelling") {
            blockColor = "#ede9fe";
            emissiveColor = "#8b5cf6";
          } else if (word.errorType === "pronoun") {
            blockColor = "#fef9c3";
            emissiveColor = "#eab308";
          } else {
            blockColor = "#fee2e2";
            emissiveColor = "#ef4444";
          }
          glowIntensity = 0.9;
        }

        return (
          <group key={word.id} position={[xPos, 0, 0]}>
            {/* Comic Outline Mesh */}
            <RoundedBox 
              position={[0, 0, 0]} 
              args={[blockWidth, blockHeight, blockDepth]}
              radius={0.06 * scale}
              smoothness={4}
              raycast={() => null}
              scale={isForcepsSelected || isClampedSelected ? [1.2, 1.2, 1.2] : (isHovered ? [1.13, 1.13, 1.13] : [1.06, 1.06, 1.06])}
            >
              <meshBasicMaterial color="#000000" side={THREE.BackSide} />
            </RoundedBox>

            {/* 3D Word Block */}
            <RoundedBox 
              position={[0, 0, 0]} 
              args={[blockWidth, blockHeight, blockDepth]}
              radius={0.06 * scale}
              smoothness={4}
              scale={isForcepsSelected || isClampedSelected ? 1.12 : (isHovered ? 1.06 : 1.0)}
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
              <meshStandardMaterial 
                color={blockColor} 
                roughness={0.15} 
                metalness={0.05} 
                emissive={emissiveColor}
                emissiveIntensity={glowIntensity}
              />
              {/* Premium clean outline overlay for active errors */}
              {word.errorActive && (
                <Edges 
                  color={
                    word.errorType === "punctuation" ? "#ef4444" : 
                    word.errorType === "tense" ? "#0ea5e9" :
                    word.errorType === "agreement" ? "#f97316" :
                    word.errorType === "apostrophe" ? "#d946ef" :
                    word.errorType === "comma" ? "#ec4899" :
                    word.errorType === "spelling" ? "#8b5cf6" :
                    word.errorType === "pronoun" ? "#eab308" : "#ef4444"
                  } 
                  thickness={3} 
                />
              )}
            </RoundedBox>

            {/* Word Text */}
            <Text
              position={[0, 0, blockDepth / 2 + 0.02]}
              fontSize={0.24 * scale}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              depthOffset={1.5}
            >
              {word.currentText}
            </Text>

            {/* Healed glow ring */}
            {word.isFixed && (
              <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.7 * scale, 0.015 * scale, 8, 32]} />
                <meshBasicMaterial color="#22c55e" transparent opacity={0.35} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
