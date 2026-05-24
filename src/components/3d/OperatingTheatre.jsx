import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../GameProvider';
import PatientCharacter from './PatientCharacter';
import DoctorCharacter from './DoctorCharacter';
import FloatingSentence from './FloatingSentence';

// ─── FLOATING PARTICLES EFFECT ────────────────────────────────────────────────
function FloatingParticles() {
  const count = 25;
  const refs = useRef([]);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 7,
        y: Math.random() * 3.5,
        z: (Math.random() - 0.5) * 5,
        speed: 0.12 + Math.random() * 0.18,
        scale: 0.015 + Math.random() * 0.035,
        wobbleSpeed: 0.8 + Math.random() * 1.2,
        wobbleScale: 0.15 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? "#06b6d4" : "#ec4899"
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((ref, i) => {
      if (ref) {
        const p = particles[i];
        ref.position.y = (p.y + t * p.speed) % 4.0;
        ref.position.x = p.x + Math.sin(t * p.wobbleSpeed + p.phase) * p.wobbleScale;
        ref.position.z = p.z + Math.cos(t * p.wobbleSpeed + p.phase) * p.wobbleScale;
      }
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={el => refs.current[i] = el}
          scale={[p.scale, p.scale, p.scale]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

// ─── ANIMATED ECG MONITOR ─────────────────────────────────────────────────────
function EcgMonitor({ position, rotation, isHealed }) {
  const pulseRef = useRef();
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const t = clock.getElapsedTime();
      const cycle = Math.sin(t * (isHealed ? 1.8 : 5));
      pulseRef.current.scale.x = isHealed ? 0.28 + cycle * 0.04 : 0.15 + Math.abs(cycle) * 0.55;
      pulseRef.current.position.x = -0.38 + (t * 0.13) % 0.76;
    }
  });
  return (
    <group position={position} rotation={rotation}>
      {/* Comic Outline */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <boxGeometry args={[1.0, 0.72, 0.16]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      {/* Monitor body */}
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.72, 0.16]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.082]}>
        <planeGeometry args={[0.88, 0.62]} />
        <meshBasicMaterial color="#0b1329" />
      </mesh>
      <mesh ref={pulseRef} position={[0, 0, 0.086]}>
        <boxGeometry args={[0.05, 0.11, 0.004]} />
        <meshBasicMaterial color={isHealed ? "#22c55e" : "#ec4899"} />
      </mesh>
      <mesh position={[0, 0, 0.085]}>
        <boxGeometry args={[0.76, 0.004, 0.002]} />
        <meshBasicMaterial color={isHealed ? "#22c55e" : "#ec4899"} />
      </mesh>
      <Text position={[-0.36, 0.22, 0.087]} fontSize={0.048} color={isHealed ? "#22c55e" : "#ec4899"} anchorX="left">
        {isHealed ? "STABLE" : "SURGERY"}
      </Text>
      <Text position={[0.08, 0.22, 0.087]} fontSize={0.056} color="#eab308" anchorX="left">
        {isHealed ? "HR 72" : "HR 108"}
      </Text>
      <Text position={[-0.36, -0.22, 0.087]} fontSize={0.044} color="#06b6d4" anchorX="left">
        {"SpO2 98%"}
      </Text>
      <Text position={[0.08, -0.22, 0.087]} fontSize={0.044} color="#d946ef" anchorX="left">
        {"120/80"}
      </Text>
    </group>
  );
}

// ─── WALL CLOCK ───────────────────────────────────────────────────────────────
function WallClock({ position, rotation }) {
  const hrRef = useRef();
  const minRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (hrRef.current)  hrRef.current.rotation.z  = -(t / 3600) * Math.PI * 2;
    if (minRef.current) minRef.current.rotation.z = -(t / 60) * Math.PI * 2;
  });
  return (
    <group position={position} rotation={rotation}>
      {/* Outline */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.06, 1.06, 1.06]}>
        <cylinderGeometry args={[0.32, 0.32, 0.06, 32]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.32, 0.32, 0.06, 32]} />
        <meshStandardMaterial color="#f0f4f8" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.032]}>
        <circleGeometry args={[0.29, 32]} />
        <meshBasicMaterial color="#fafcff" />
      </mesh>
      <mesh position={[0, 0, 0.034]}>
        <torusGeometry args={[0.28, 0.012, 8, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(angle) * 0.22, Math.cos(angle) * 0.22, 0.036]}>
            <boxGeometry args={[0.012, 0.035, 0.002]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        );
      })}
      <group ref={hrRef} position={[0, 0, 0.038]}>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.014, 0.16, 0.004]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
      <group ref={minRef} position={[0, 0, 0.04]}>
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[0.008, 0.22, 0.004]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.042]}>
        <sphereGeometry args={[0.014, 10, 10]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
    </group>
  );
}

// ─── SURGICAL LIGHT ───────────────────────────────────────────────────────────
function SurgicalLight({ position, armOffsetX = 0.5 }) {
  return (
    <group position={position}>
      {/* Ceiling rail box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.12, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.18} />
      </mesh>
      {/* Vertical drop arm */}
      <mesh position={[armOffsetX, -0.45, 0]}>
        <boxGeometry args={[0.07, 0.8, 0.07]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.75} roughness={0.18} />
      </mesh>
      {/* Secondary arm */}
      <mesh position={[armOffsetX, -0.85, 0.18]}>
        <boxGeometry args={[0.07, 0.07, 0.4]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.75} roughness={0.18} />
      </mesh>
      {/* Light head body */}
      <group position={[armOffsetX, -1.1, 0.28]}>
        {/* Outline */}
        <mesh scale={[1.05, 1.05, 1.05]}>
          <cylinderGeometry args={[0.44, 0.40, 0.14, 32]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.44, 0.40, 0.14, 32]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.15} />
        </mesh>
        {/* Emissive face bottom */}
        <mesh position={[0, -0.07, 0]}>
          <cylinderGeometry args={[0.38, 0.36, 0.05, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={4.0}
            metalness={0.15}
            roughness={0.04}
          />
        </mesh>
        {/* Multi-lens rings inside */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.sin(a) * 0.19, -0.08, Math.cos(a) * 0.19]}>
              <cylinderGeometry args={[0.065, 0.065, 0.04, 14]} />
              <meshStandardMaterial color="#ffffff" emissive="#06b6d4" emissiveIntensity={6} roughness={0.04} />
            </mesh>
          );
        })}
        {/* Centre lens */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#06b6d4" emissiveIntensity={8} roughness={0.03} />
        </mesh>
        {/* Chrome trim ring */}
        <mesh>
          <torusGeometry args={[0.43, 0.013, 8, 40]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Actual light */}
        <pointLight position={[0, -0.3, 0]} intensity={12} color="#ffffff" distance={8} castShadow />
      </group>
    </group>
  );
}

// ─── VIBRANT OPERATING TABLE ──────────────────────────────────────────────────
function OperatingTable() {
  const BLACK = "#000000";
  const BASE_METAL = "#64748b";
  const NEON_TEAL = "#06b6d4";
  const NEON_TEAL_GLOW = "#0891b2";
  return (
    <group position={[0, -0.6, 0]}>
      {/* Centre pedestal */}
      <mesh position={[0, 0.55, 0]} scale={[1.08, 1.0, 1.08]}>
        <boxGeometry args={[0.24, 1.1, 0.24]} />
        <meshBasicMaterial color={BLACK} side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.24, 1.1, 0.24]} />
        <meshStandardMaterial color={BASE_METAL} metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Crossbar base */}
      <mesh position={[0, 0.06, 0]} scale={[1.03, 1.06, 1.05]}>
        <boxGeometry args={[0.9, 0.08, 0.42]} />
        <meshBasicMaterial color={BLACK} side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.9, 0.08, 0.42]} />
        <meshStandardMaterial color={BASE_METAL} metalness={0.75} roughness={0.2} />
      </mesh>
      {/* 4 castors */}
      {[[-0.38, -0.18], [0.38, -0.18], [-0.38, 0.18], [0.38, 0.18]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.02, z]}>
          <cylinderGeometry args={[0.044, 0.044, 0.07, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {/* 3-segment padded table top */}
      {[-0.74, 0, 0.74].map((z, i) => (
        <group key={i} position={[0, 1.1, z]}>
          <mesh scale={[1.03, 1.08, 1.03]}>
            <boxGeometry args={[0.9, 0.14, 0.72]} />
            <meshBasicMaterial color={BLACK} side={THREE.BackSide} />
          </mesh>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.14, 0.72]} />
            <meshStandardMaterial color={NEON_TEAL} roughness={0.3} metalness={0.1} emissive={NEON_TEAL_GLOW} emissiveIntensity={0.2} />
          </mesh>
        </group>
      ))}
      {/* Section dividers */}
      {[-0.37, 0.37].map((z, i) => (
        <mesh key={i} position={[0, 1.1, z]}>
          <boxGeometry args={[0.92, 0.15, 0.018]} />
          <meshBasicMaterial color={BLACK} />
        </mesh>
      ))}
      {/* Side rails */}
      {[-0.48, 0.48].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 1.16, 0]}>
            <boxGeometry args={[0.026, 0.026, 2.3]} />
            <meshBasicMaterial color={BLACK} />
          </mesh>
          {[-0.92, 0, 0.92].map((z, j) => (
            <mesh key={j} position={[x, 1.12, z]}>
              <boxGeometry args={[0.026, 0.07, 0.026]} />
              <meshBasicMaterial color={BLACK} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Head pillow */}
      <mesh position={[0, 1.18, -1.05]} scale={[1.04, 1.08, 1.04]}>
        <boxGeometry args={[0.54, 0.09, 0.34]} />
        <meshBasicMaterial color={BLACK} side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 1.18, -1.05]}>
        <boxGeometry args={[0.54, 0.09, 0.34]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─── ANESTHESIA MACHINE TOWER ─────────────────────────────────────────────────
function AnesthesiaTower({ position }) {
  return (
    <group position={position}>
      {/* Outline */}
      <mesh position={[0, 1.1, 0]} scale={[1.03, 1.015, 1.03]}>
        <boxGeometry args={[0.65, 2.2, 0.54]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      {/* Main chassis */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.65, 2.2, 0.54]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.25} />
      </mesh>
      {/* Lower module */}
      <mesh position={[0, 0.55, 0.05]}>
        <boxGeometry args={[0.6, 0.72, 0.58]} />
        <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.25} />
      </mesh>
      {/* Upper screen */}
      <mesh position={[0, 1.9, 0.28]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshBasicMaterial color="#0b1329" />
      </mesh>
      <mesh position={[0, 1.9, 0.275]}>
        <boxGeometry args={[0.44, 0.34, 0.01]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Lower screen */}
      <mesh position={[0, 1.44, 0.28]}>
        <planeGeometry args={[0.36, 0.24]} />
        <meshBasicMaterial color="#0b1329" />
      </mesh>
      {/* Knob row */}
      {[-0.16, 0, 0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.98, 0.28]}>
          <cylinderGeometry args={[0.026, 0.026, 0.02, 12]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      ))}
      {/* Blue gas cylinder */}
      <mesh position={[0.4, 0.52, 0.05]} scale={[1.08, 1.02, 1.08]}>
        <cylinderGeometry args={[0.072, 0.072, 0.75, 14]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0.4, 0.52, 0.05]}>
        <cylinderGeometry args={[0.072, 0.072, 0.75, 14]} />
        <meshStandardMaterial color="#0284c7" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0.92, 0.05]}>
        <sphereGeometry args={[0.072, 12, 12]} />
        <meshStandardMaterial color="#0284c7" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Grey cylinder */}
      <mesh position={[0.4, 0.52, -0.18]} scale={[1.08, 1.02, 1.08]}>
        <cylinderGeometry args={[0.068, 0.068, 0.72, 14]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0.4, 0.52, -0.18]}>
        <cylinderGeometry args={[0.068, 0.068, 0.72, 14]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0.9, -0.18]}>
        <sphereGeometry args={[0.068, 12, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Breathing tube */}
      <mesh position={[-0.44, 1.12, 0.16]} rotation={[0, Math.PI / 3, Math.PI / 2]}>
        <torusGeometry args={[0.29, 0.022, 8, 22, Math.PI * 0.85]} />
        <meshStandardMaterial color="#64748b" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.74, 0.09, 0.64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// ─── INSTRUMENT TROLLEY ───────────────────────────────────────────────────────
function InstrumentTrolley({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Outline */}
      <mesh position={[0, 0.58, 0]} scale={[1.04, 1.02, 1.05]}>
        <boxGeometry args={[0.58, 1.16, 0.44]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.58, 1.16, 0.44]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.3} roughness={0.35} />
      </mesh>
      {/* Drawers */}
      {[0.74, 0.57, 0.40, 0.23].map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, 0.222]}>
            <boxGeometry args={[0.52, 0.14, 0.01]} />
            <meshStandardMaterial color="#0284c7" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, y, 0.232]}>
            <boxGeometry args={[0.17, 0.022, 0.015]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      ))}
      {/* Top surface */}
      <mesh position={[0, 1.16, 0]}>
        <boxGeometry args={[0.62, 0.03, 0.5]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// ─── IV STAND ─────────────────────────────────────────────────────────────────
function IVStand({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 2.8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.04, 14]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 2.44, 0]}>
        <boxGeometry args={[0.44, 0.02, 0.055]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* IV bags */}
      <mesh position={[-0.13, 2.24, 0]} castShadow>
        <capsuleGeometry args={[0.075, 0.26, 8, 14]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.65} emissive="#0891b2" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[0.13, 2.24, 0]} castShadow>
        <capsuleGeometry args={[0.065, 0.24, 8, 14]} />
        <meshStandardMaterial color="#ec4899" transparent opacity={0.65} emissive="#db2777" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ─── MAYO INSTRUMENT TRAY ─────────────────────────────────────────────────────
function MayoTray({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.94, 0]} scale={[1.04, 1.05, 1.04]}>
        <boxGeometry args={[0.74, 0.026, 0.58]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.94, 0]} castShadow>
        <boxGeometry args={[0.74, 0.026, 0.58]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.92} roughness={0.08} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.95, 10]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 14]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// ─── STOOL ────────────────────────────────────────────────────────────────────
function Stool({ position }) {
  return (
    <group position={position}>
      {/* Seat Outline */}
      <mesh position={[0, 0.5, 0]} scale={[1.05, 1.1, 1.05]}>
        <cylinderGeometry args={[0.21, 0.19, 0.065, 18]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.21, 0.19, 0.065, 18]} />
        <meshStandardMaterial color="#334155" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.29, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.44, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.23, 0.25, 0.04, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// ─── MAIN SCENE ───────────────────────────────────────────────────────────────
function SceneContent({ 
  onOpenScalpel, 
  onOpenInjector, 
  onOpenImplant, 
  onOpenClampSelector,
  onOpenScissors,
  onOpenScanner,
  onOpenTweezers
}) {
  const { currentSkin, currentWords, activePatient } = useGame();
  const isHealed = activePatient && currentWords.every(w => !w.errorActive);

  const rl1 = useRef();
  const rl2 = useRef();

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    camera.position.set(0, 3.5, 6.5);
    camera.lookAt(0, 0.8, 0);
    if (rl1.current) rl1.current.intensity = 4.0 + Math.sin(t * 1.8) * 0.3;
    if (rl2.current) rl2.current.intensity = 4.0 + Math.cos(t * 1.8) * 0.3;
  });

  // Light Clinic Colors (Light Theme)
  const wallColor   = "#e2e8f0"; // light grey wall panel
  const floorColor  = "#f1f5f9"; // clean light-grey grid floor
  const baseColor   = "#000000"; // thick outline trims
  const ceilColor   = "#e2e8f0";
  const tableGlow   = "#06b6d4"; // neon cyan

  return (
    <>
      {/* ── FOG FOR DEPTH (LIGHT THEME FOG) ── */}
      <fog attach="fog" args={["#cbd5e1", 5.5, 14.5]} />

      {/* ── LIGHTS ── */}
      <ambientLight intensity={1.3} color="#f8fafc" />
      <directionalLight position={[3, 9, 4]} intensity={2.5} color="#ffffff" castShadow
        shadow-mapSize={[2048, 2048]} shadow-camera-left={-10} shadow-camera-right={10}
        shadow-camera-top={10} shadow-camera-bottom={-10} shadow-camera-far={25} />
      
      {/* Dramatic Comic Rim Lights (Soft glow on white walls) */}
      <directionalLight position={[-6, 4, -4]} intensity={2.5} color="#06b6d4" />
      <directionalLight position={[6, 4, -4]} intensity={2.5} color="#ec4899" />

      <pointLight ref={rl1} position={[-1.4, 3.8, 0.6]} intensity={4.0} color="#ffffff" distance={10} />
      <pointLight ref={rl2} position={[1.4, 3.8, -0.6]} intensity={4.0} color="#ffffff" distance={10} />
      <pointLight position={[0, 2.0, 0]} intensity={3.0} color={tableGlow} distance={7} />

      {/* ── FLOOR — Tile layout with light colors ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={floorColor} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Grid lines */}
      <gridHelper args={[30, 30, "#cbd5e1", "#cbd5e1"]} position={[0, -0.594, 0]} />
      {/* Safety Floor Line Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.592, 0]}>
        <ringGeometry args={[4.8, 5.0, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* ── FLOATING PARTICLES ── */}
      <FloatingParticles />

      {/* ── CEILING ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={ceilColor} roughness={0.9} />
      </mesh>

      {/* ── WALLS ── */}
      {/* Back */}
      <mesh position={[0, 3.0, -7.5]} receiveShadow>
        <boxGeometry args={[20, 13, 0.22]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Left */}
      <mesh position={[-8.5, 3.0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 13, 0.22]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Right */}
      <mesh position={[8.5, 3.0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 13, 0.22]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Wall baseboards — thick black outline border */}
      {[
        { pos: [0, -0.2, -7.4],  rot: [0,0,0],           size: [20, 0.44, 0.2] },
        { pos: [-8.4, -0.2, 0],  rot: [0, Math.PI/2, 0], size: [20, 0.44, 0.2] },
        { pos: [8.4, -0.2, 0],   rot: [0, Math.PI/2, 0], size: [20, 0.44, 0.2] },
      ].map((w, i) => (
        <mesh key={i} position={w.pos} rotation={w.rot}>
          <boxGeometry args={w.size} />
          <meshBasicMaterial color={baseColor} />
        </mesh>
      ))}

      {/* ── SURGICAL CEILING LIGHTS ── */}
      <SurgicalLight position={[-1.2, 5.5, 0.8]}  armOffsetX={0.6} />
      <SurgicalLight position={[1.2, 5.5, -0.8]} armOffsetX={-0.6} />

      {/* ── OPERATING TABLE ── */}
      <OperatingTable />

      {/* ── PATIENT ── */}
      <group position={[0, 0.54, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <PatientCharacter />
      </group>

      {/* ── DOCTOR ── */}
      <DoctorCharacter position={[-1.15, -0.58, 0.25]} rotation={[0, Math.PI / 2, 0]} />

      {/* ── FLOATING SENTENCE (Passed all 7 tool triggers) ── */}
      <FloatingSentence
        onOpenScalpel={onOpenScalpel}
        onOpenInjector={onOpenInjector}
        onOpenImplant={onOpenImplant}
        onOpenClampSelector={onOpenClampSelector}
        onOpenScissors={onOpenScissors}
        onOpenScanner={onOpenScanner}
        onOpenTweezers={onOpenTweezers}
      />

      {/* ── ANESTHESIA TOWER ── */}
      <AnesthesiaTower position={[-4.8, -0.6, -2.2]} />

      {/* ── ECG MONITOR ── */}
      <EcgMonitor position={[-5.5, 2.1, -1.5]} rotation={[0, Math.PI / 2, 0]} isHealed={isHealed} />

      {/* ── INSTRUMENT TROLLEY ── */}
      <InstrumentTrolley position={[0.6, -0.6, -4.2]} rotation={[0, 0.2, 0]} />

      {/* ── MAYO TRAY ── */}
      <MayoTray position={[-2.6, -0.6, 1.8]} rotation={[0, 0.35, 0]} />

      {/* ── IV STAND ── */}
      <IVStand position={[3.0, -0.6, 1.9]} />

      {/* ── STOOLS ── */}
      <Stool position={[0.9, -0.6, 1.7]} />
      <Stool position={[-0.5, -0.6, -1.9]} />

      {/* ── CLOCK ── */}
      <WallClock position={[-8.3, 4.2, -1.0]} rotation={[0, Math.PI / 2, 0]} />

      {/* ── X-RAY LIGHT BOX ── */}
      <group position={[8.38, 2.4, -2.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.06, 1.05, 0.78]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <planeGeometry args={[0.72, 0.96]} />
          <meshBasicMaterial color="#bae6fd" />
        </mesh>
        {[-0.28, -0.1, 0.08, 0.26].map((y, i) => (
          <mesh key={i} position={[0.05, y, 0]}>
            <torusGeometry args={[0.2, 0.008, 4, 20, Math.PI]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* ── ANATOMY POSTER (Robust without network font fetch) ── */}
      <group position={[-8.38, 2.6, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh scale={[1.03, 1.03, 1.03]}>
          <boxGeometry args={[0.06, 1.65, 2.25]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[0.06, 1.65, 2.25]} />
          <meshStandardMaterial color="#fafafa" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <planeGeometry args={[2.15, 1.56]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <Text position={[0.05, 0.56, 0]} fontSize={0.13} color="#dc2626" anchorX="center">
          SENTENCE ANATOMY
        </Text>
        <Text position={[0.05, 0.24, 0]} fontSize={0.085} color="#0284c7" anchorX="center">
          SUBJECT · VERB · OBJECT
        </Text>
        <Text position={[0.05, -0.06, 0]} fontSize={0.075} color="#000000" anchorX="center">
          Correct grammar saves lives!
        </Text>
      </group>

      {/* ── SHADOW PLANE ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.599, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color={floorColor} roughness={0.3} metalness={0.2} transparent opacity={0} />
      </mesh>
    </>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function OperatingTheatre({ 
  onOpenScalpel, 
  onOpenInjector, 
  onOpenImplant, 
  onOpenClampSelector,
  onOpenScissors,
  onOpenScanner,
  onOpenTweezers
}) {
  return (
    <div className="w-full h-full absolute inset-0 z-0" style={{ background: '#cbd5e1' }}>
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 6.5], fov: 44 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <SceneContent
          onOpenScalpel={onOpenScalpel}
          onOpenInjector={onOpenInjector}
          onOpenImplant={onOpenImplant}
          onOpenClampSelector={onOpenClampSelector}
          onOpenScissors={onOpenScissors}
          onOpenScanner={onOpenScanner}
          onOpenTweezers={onOpenTweezers}
        />
      </Canvas>
    </div>
  );
}
