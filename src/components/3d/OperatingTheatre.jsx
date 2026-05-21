import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../GameProvider';
import PatientCharacter from './PatientCharacter';
import DoctorCharacter from './DoctorCharacter';
import FloatingSentence from './FloatingSentence';

const FONT_URL = "https://fonts.gstatic.com/s/outfit/v11/Q3pwMX5j4dxp96GP12OC.woff";

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
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.72, 0.16]} />
        <meshStandardMaterial color="#dde3ec" metalness={0.55} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.082]}>
        <planeGeometry args={[0.88, 0.62]} />
        <meshBasicMaterial color="#060c18" />
      </mesh>
      <mesh ref={pulseRef} position={[0, 0, 0.086]}>
        <boxGeometry args={[0.05, 0.11, 0.004]} />
        <meshBasicMaterial color={isHealed ? "#22c55e" : "#f43f5e"} />
      </mesh>
      <mesh position={[0, 0, 0.085]}>
        <boxGeometry args={[0.76, 0.004, 0.002]} />
        <meshBasicMaterial color={isHealed ? "#22c55e" : "#f43f5e"} />
      </mesh>
      <Text position={[-0.36, 0.22, 0.087]} fontSize={0.048} color={isHealed ? "#22c55e" : "#f43f5e"} anchorX="left">
        {isHealed ? "STABLE" : "SURGERY"}
      </Text>
      <Text position={[0.08, 0.22, 0.087]} fontSize={0.056} color="#eab308" anchorX="left">
        {isHealed ? "HR 72" : "HR 108"}
      </Text>
      <Text position={[-0.36, -0.22, 0.087]} fontSize={0.044} color="#38bdf8" anchorX="left">
        {"SpO2 98%"}
      </Text>
      <Text position={[0.08, -0.22, 0.087]} fontSize={0.044} color="#a855f7" anchorX="left">
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
        <meshBasicMaterial color="#334155" />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(angle) * 0.22, Math.cos(angle) * 0.22, 0.036]}>
            <boxGeometry args={[0.012, 0.035, 0.002]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
        );
      })}
      <group ref={hrRef} position={[0, 0, 0.038]}>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.014, 0.16, 0.004]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
      </group>
      <group ref={minRef} position={[0, 0, 0.04]}>
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[0.008, 0.22, 0.004]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.042]}>
        <sphereGeometry args={[0.014, 10, 10]} />
        <meshBasicMaterial color="#e11d48" />
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
        <meshStandardMaterial color="#d8dde8" metalness={0.7} roughness={0.18} />
      </mesh>
      {/* Vertical drop arm */}
      <mesh position={[armOffsetX, -0.45, 0]}>
        <boxGeometry args={[0.07, 0.8, 0.07]} />
        <meshStandardMaterial color="#cdd3df" metalness={0.75} roughness={0.18} />
      </mesh>
      {/* Secondary arm */}
      <mesh position={[armOffsetX, -0.85, 0.18]}>
        <boxGeometry args={[0.07, 0.07, 0.4]} />
        <meshStandardMaterial color="#cdd3df" metalness={0.75} roughness={0.18} />
      </mesh>
      {/* Light head body */}
      <group position={[armOffsetX, -1.1, 0.28]}>
        <mesh>
          <cylinderGeometry args={[0.44, 0.40, 0.14, 32]} />
          <meshStandardMaterial color="#e4eaf5" metalness={0.6} roughness={0.15} />
        </mesh>
        {/* Emissive face bottom */}
        <mesh position={[0, -0.07, 0]}>
          <cylinderGeometry args={[0.38, 0.36, 0.05, 32]} />
          <meshStandardMaterial
            color="#f2f8ff"
            emissive="#ffffff"
            emissiveIntensity={3.0}
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
              <meshStandardMaterial color="#ffffff" emissive="#ddf0ff" emissiveIntensity={4} roughness={0.04} />
            </mesh>
          );
        })}
        {/* Centre lens */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#cce8ff" emissiveIntensity={5} roughness={0.03} />
        </mesh>
        {/* Chrome trim ring */}
        <mesh>
          <torusGeometry args={[0.43, 0.013, 8, 40]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.92} roughness={0.08} />
        </mesh>
        {/* Actual light */}
        <pointLight position={[0, -0.3, 0]} intensity={10} color="#fff6ee" distance={10} castShadow />
      </group>
    </group>
  );
}

// ─── BLUE OPERATING TABLE ─────────────────────────────────────────────────────
function OperatingTable() {
  const CHROME = "#b8c4d0";
  const BLUE_PAD = "#2b72ab";
  const BLUE_PAD_DARK = "#1d5580";
  return (
    <group position={[0, -0.6, 0]}>
      {/* Centre pedestal */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.24, 1.1, 0.24]} />
        <meshStandardMaterial color="#d8e0ee" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Crossbar base */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.9, 0.08, 0.42]} />
        <meshStandardMaterial color="#c0cad8" metalness={0.65} roughness={0.2} />
      </mesh>
      {/* 4 castors */}
      {[[-0.38, -0.18], [0.38, -0.18], [-0.38, 0.18], [0.38, 0.18]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.02, z]}>
          <cylinderGeometry args={[0.044, 0.044, 0.07, 12]} />
          <meshStandardMaterial color="#2d3a4a" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {/* 3-segment blue padded table top */}
      {[-0.74, 0, 0.74].map((z, i) => (
        <mesh key={i} position={[0, 1.1, z]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.14, 0.72]} />
          <meshStandardMaterial color={BLUE_PAD} roughness={0.55} metalness={0.05} emissive={BLUE_PAD_DARK} emissiveIntensity={0.06} />
        </mesh>
      ))}
      {/* Section dividers */}
      {[-0.37, 0.37].map((z, i) => (
        <mesh key={i} position={[0, 1.1, z]}>
          <boxGeometry args={[0.92, 0.15, 0.018]} />
          <meshStandardMaterial color={BLUE_PAD_DARK} metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
      {/* Chrome side rails */}
      {[-0.48, 0.48].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 1.16, 0]}>
            <boxGeometry args={[0.026, 0.026, 2.3]} />
            <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.08} />
          </mesh>
          {[-0.92, 0, 0.92].map((z, j) => (
            <mesh key={j} position={[x, 1.12, z]}>
              <boxGeometry args={[0.026, 0.07, 0.026]} />
              <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.08} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Head pillow */}
      <mesh position={[0, 1.18, -1.05]}>
        <boxGeometry args={[0.54, 0.09, 0.34]} />
        <meshStandardMaterial color="#e8edf8" roughness={0.75} />
      </mesh>
    </group>
  );
}

// ─── ANESTHESIA MACHINE TOWER ─────────────────────────────────────────────────
function AnesthesiaTower({ position }) {
  return (
    <group position={position}>
      {/* Main chassis */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.65, 2.2, 0.54]} />
        <meshStandardMaterial color="#e2eaf4" metalness={0.45} roughness={0.28} />
      </mesh>
      {/* Lower wide module */}
      <mesh position={[0, 0.55, 0.05]}>
        <boxGeometry args={[0.6, 0.72, 0.58]} />
        <meshStandardMaterial color="#d8e2f0" metalness={0.5} roughness={0.25} />
      </mesh>
      {/* Upper screen */}
      <mesh position={[0, 1.9, 0.28]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshBasicMaterial color="#060c18" />
      </mesh>
      <mesh position={[0, 1.9, 0.275]}>
        <boxGeometry args={[0.44, 0.34, 0.01]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Lower screen */}
      <mesh position={[0, 1.44, 0.28]}>
        <planeGeometry args={[0.36, 0.24]} />
        <meshBasicMaterial color="#060c18" />
      </mesh>
      {/* Knob row */}
      {[-0.16, 0, 0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.98, 0.28]}>
          <cylinderGeometry args={[0.026, 0.026, 0.02, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.15} />
        </mesh>
      ))}
      {/* Blue gas cylinder */}
      <mesh position={[0.4, 0.52, 0.05]}>
        <cylinderGeometry args={[0.072, 0.072, 0.75, 14]} />
        <meshStandardMaterial color="#1d6fa8" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0.92, 0.05]}>
        <sphereGeometry args={[0.072, 12, 12]} />
        <meshStandardMaterial color="#1d6fa8" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Grey cylinder */}
      <mesh position={[0.4, 0.52, -0.18]}>
        <cylinderGeometry args={[0.068, 0.068, 0.72, 14]} />
        <meshStandardMaterial color="#78909c" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0.9, -0.18]}>
        <sphereGeometry args={[0.068, 12, 12]} />
        <meshStandardMaterial color="#78909c" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Breathing tube arc */}
      <mesh position={[-0.44, 1.12, 0.16]} rotation={[0, Math.PI / 3, Math.PI / 2]}>
        <torusGeometry args={[0.29, 0.022, 8, 22, Math.PI * 0.85]} />
        <meshStandardMaterial color="#78909c" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Side equipment box */}
      <mesh position={[-0.58, 0.18, 0.1]}>
        <boxGeometry args={[0.5, 0.38, 0.42]} />
        <meshStandardMaterial color="#c8d4e4" metalness={0.5} roughness={0.28} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.74, 0.09, 0.64]} />
        <meshStandardMaterial color="#c0cbd8" metalness={0.55} roughness={0.25} />
      </mesh>
      {/* Wheels */}
      {[[-0.3, 0, -0.26], [0.3, 0, -0.26], [-0.3, 0, 0.26], [0.3, 0, 0.26]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, -0.1, z]}>
          <sphereGeometry args={[0.046, 10, 10]} />
          <meshStandardMaterial color="#2d3a4a" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ─── INSTRUMENT TROLLEY ───────────────────────────────────────────────────────
function InstrumentTrolley({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.58, 1.16, 0.44]} />
        <meshStandardMaterial color="#6ec8dc" metalness={0.3} roughness={0.35} />
      </mesh>
      {[0.74, 0.57, 0.40, 0.23].map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, 0.222]}>
            <boxGeometry args={[0.52, 0.14, 0.01]} />
            <meshStandardMaterial color="#4ab0c8" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, y, 0.232]}>
            <boxGeometry args={[0.17, 0.022, 0.015]} />
            <meshStandardMaterial color="#b8d4e0" metalness={0.85} roughness={0.1} />
          </mesh>
        </group>
      ))}
      {/* Top surface */}
      <mesh position={[0, 1.16, 0]}>
        <boxGeometry args={[0.62, 0.03, 0.5]} />
        <meshStandardMaterial color="#c8e4f0" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Items on top */}
      <mesh position={[-0.1, 1.2, 0.05]}>
        <boxGeometry args={[0.14, 0.04, 0.3]} />
        <meshStandardMaterial color="#22c55e" roughness={0.4} />
      </mesh>
      <mesh position={[0.14, 1.2, 0.06]} rotation={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.085, 10]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.82} />
      </mesh>
      {/* Wheels */}
      {[[-0.23, 0, -0.18], [0.23, 0, -0.18], [-0.23, 0, 0.18], [0.23, 0, 0.18]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, 0.034, z]}>
          <sphereGeometry args={[0.038, 10, 10]} />
          <meshStandardMaterial color="#2d3a4a" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ─── IV STAND ─────────────────────────────────────────────────────────────────
function IVStand({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 2.8, 8]} />
        <meshStandardMaterial color="#c8d4e0" metalness={0.88} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.04, 14]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.15} />
      </mesh>
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.17, -0.5, Math.cos(a) * 0.17]} rotation={[0, -a, 0.22]}>
            <capsuleGeometry args={[0.01, 0.28, 4, 6]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.15} />
          </mesh>
        );
      })}
      <mesh position={[0, 2.44, 0]}>
        <boxGeometry args={[0.44, 0.02, 0.055]} />
        <meshStandardMaterial color="#b8c8d8" metalness={0.88} roughness={0.1} />
      </mesh>
      {/* IV bags */}
      <mesh position={[-0.13, 2.24, 0]} castShadow>
        <capsuleGeometry args={[0.075, 0.26, 8, 14]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.52} emissive="#0284c7" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
      <mesh position={[0.13, 2.24, 0]} castShadow>
        <capsuleGeometry args={[0.065, 0.24, 8, 14]} />
        <meshStandardMaterial color="#f0abfc" transparent opacity={0.52} emissive="#c026d3" emissiveIntensity={0.45} roughness={0.1} />
      </mesh>
      <mesh position={[-0.13, 1.72, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.55, 6]} />
        <meshStandardMaterial color="#a0c8e8" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ─── MAYO INSTRUMENT TRAY ─────────────────────────────────────────────────────
function MayoTray({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.94, 0]} castShadow>
        <boxGeometry args={[0.74, 0.026, 0.58]} />
        <meshStandardMaterial color="#c8d4e0" metalness={0.92} roughness={0.08} />
      </mesh>
      {/* Rim */}
      {[[0, 0.29], [0, -0.29], [-0.37, 0], [0.37, 0]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.955, z]}>
          <boxGeometry args={i < 2 ? [0.74, 0.03, 0.02] : [0.02, 0.03, 0.58]} />
          <meshStandardMaterial color="#b0bcd0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.95, 10]} />
        <meshStandardMaterial color="#b8c4d4" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 14]} />
        <meshStandardMaterial color="#b0bcd0" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Instruments */}
      <mesh position={[-0.2, 0.96, 0.05]} rotation={[0, 0.2, 0]}>
        <capsuleGeometry args={[0.01, 0.29, 4, 8]} />
        <meshStandardMaterial color="#c8d4e0" metalness={0.95} roughness={0.04} />
      </mesh>
      <mesh position={[0, 0.96, 0.1]} rotation={[0, -0.15, 0]}>
        <capsuleGeometry args={[0.01, 0.22, 4, 8]} />
        <meshStandardMaterial color="#ec4899" transparent opacity={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0.18, 0.96, -0.06]}>
        <capsuleGeometry args={[0.018, 0.12, 6, 8]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ─── WHEELCHAIR ───────────────────────────────────────────────────────────────
function Wheelchair({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.52, 0.045, 0.48]} />
        <meshStandardMaterial color="#2d3748" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.77, -0.23]}>
        <boxGeometry args={[0.5, 0.56, 0.045]} />
        <meshStandardMaterial color="#2d3748" roughness={0.55} />
      </mesh>
      {[-0.26, 0.26].map((x, i) => (
        <group key={i}>
          {/* Armrest */}
          <mesh position={[x, 0.66, 0]}>
            <boxGeometry args={[0.042, 0.042, 0.44]} />
            <meshStandardMaterial color="#1a202c" roughness={0.5} />
          </mesh>
          {/* Large rear wheel */}
          <group position={[x, 0.3, -0.04]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.29, 0.032, 10, 32]} />
              <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.6} />
            </mesh>
            {[0, 45, 90, 135].map((deg, j) => (
              <mesh key={j} rotation={[0, 0, (deg * Math.PI) / 180]}>
                <boxGeometry args={[0.01, 0.54, 0.008]} />
                <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.3} />
              </mesh>
            ))}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.25, 0.012, 8, 32]} />
              <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.2} />
            </mesh>
          </group>
          {/* Small front wheel */}
          <mesh position={[x, 0.14, 0.3]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.1, 0.022, 8, 20]} />
            <meshStandardMaterial color="#111827" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── DOOR ─────────────────────────────────────────────────────────────────────
function RoomDoor({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.14, 3.3, 2.1]} />
        <meshStandardMaterial color="#abb4c2" metalness={0.35} roughness={0.4} />
      </mesh>
      {[-0.52, 0.52].map((z, i) => (
        <group key={i}>
          <mesh position={[0.07, 0, z]}>
            <boxGeometry args={[0.05, 3.2, 0.96]} />
            <meshStandardMaterial color="#d8e0ea" roughness={0.35} metalness={0.1} />
          </mesh>
          <mesh position={[0.1, 0.58, z]}>
            <boxGeometry args={[0.02, 0.68, 0.4]} />
            <meshStandardMaterial color="#8ab4cc" transparent opacity={0.5} roughness={0.05} metalness={0.2} />
          </mesh>
          <mesh position={[0.12, -0.1, z + (z > 0 ? -0.14 : 0.14)]}>
            <boxGeometry args={[0.022, 0.13, 0.065]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── STOOL ────────────────────────────────────────────────────────────────────
function Stool({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.21, 0.19, 0.065, 18]} />
        <meshStandardMaterial color="#111827" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.29, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.44, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.23, 0.25, 0.04, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.65} roughness={0.25} />
      </mesh>
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.2, 0.04, Math.cos(a) * 0.2]}>
            <sphereGeometry args={[0.033, 8, 8]} />
            <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── MAIN SCENE ───────────────────────────────────────────────────────────────
function SceneContent({ onOpenScalpel, onOpenInjector, onOpenImplant, onOpenClampSelector }) {
  const { currentSkin, currentWords, activePatient } = useGame();
  const isHealed = activePatient && currentWords.every(w => !w.errorActive);

  const rl1 = useRef();
  const rl2 = useRef();

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    camera.position.set(0, 3.5, 6.5);
    camera.lookAt(0, 0.8, 0);
    if (rl1.current) rl1.current.intensity = 3.5 + Math.sin(t * 1.8) * 0.2;
    if (rl2.current) rl2.current.intensity = 3.5 + Math.cos(t * 1.8) * 0.2;
  });

  // Theme palette
  let wallColor   = "#e0d8cc";
  let floorColor  = "#3a4e62";
  let baseColor   = "#263444";
  let ceilColor   = "#d4ccbf";
  let tableGlow   = "#38bdf8";
  if (currentSkin === "Space Hospital") {
    wallColor = "#12102a"; floorColor = "#0d0d1e"; baseColor = "#09090f"; ceilColor = "#12102a"; tableGlow = "#a855f7";
  } else if (currentSkin === "Underwater Hospital") {
    wallColor = "#0e3a4a"; floorColor = "#0a2a38"; baseColor = "#061820"; ceilColor = "#0c2e3c"; tableGlow = "#06b6d4";
  } else if (currentSkin === "Jungle Hospital") {
    wallColor = "#1a2e1a"; floorColor = "#0f1e0f"; baseColor = "#091409"; ceilColor = "#162016"; tableGlow = "#10b981";
  }

  return (
    <>
      {/* ── LIGHTS ── */}
      <ambientLight intensity={0.7} color="#f4ede0" />
      <directionalLight position={[3, 9, 4]} intensity={1.5} color="#fff8ee" castShadow
        shadow-mapSize={[2048, 2048]} shadow-camera-left={-12} shadow-camera-right={12}
        shadow-camera-top={12} shadow-camera-bottom={-12} shadow-camera-far={30} />
      <directionalLight position={[-4, 7, -3]} intensity={0.8} color="#e8f4ff" />
      <pointLight ref={rl1} position={[-1.4, 3.8, 0.6]} intensity={3.5} color="#fff6ee" distance={12} />
      <pointLight ref={rl2} position={[1.4, 3.8, -0.6]} intensity={3.5} color="#fff6ee" distance={12} />
      <pointLight position={[0, 2.0, 0]} intensity={2.0} color={tableGlow} distance={8} />
      <pointLight position={[-5, 2, 0]} intensity={0.8} color="#ffe8c8" distance={10} />
      <pointLight position={[5, 2, 0]} intensity={0.8} color="#ffe8c8" distance={10} />

      {/* ── FLOOR — dark blue/teal tile ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={floorColor} roughness={0.26} metalness={0.16} />
      </mesh>
      {/* Tile grid lines */}
      <gridHelper args={[30, 30, "#4e6a80", "#4e6a80"]} position={[0, -0.594, 0]} />
      {/* Safety floor line ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.592, 0]}>
        <ringGeometry args={[4.8, 5.05, 80]} />
        <meshBasicMaterial color="#b8c8d8" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* ── CEILING ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={ceilColor} roughness={0.88} />
      </mesh>
      <gridHelper args={[26, 8, "#c0b8aa", "#c0b8aa"]} position={[0, 6.48, 0]} />

      {/* ── WALLS ── */}
      {/* Back */}
      <mesh position={[0, 3.0, -7.5]} receiveShadow>
        <boxGeometry args={[20, 13, 0.22]} />
        <meshStandardMaterial color={wallColor} roughness={0.72} />
      </mesh>
      {/* Left */}
      <mesh position={[-8.5, 3.0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 13, 0.22]} />
        <meshStandardMaterial color={wallColor} roughness={0.72} />
      </mesh>
      {/* Right */}
      <mesh position={[8.5, 3.0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 13, 0.22]} />
        <meshStandardMaterial color={wallColor} roughness={0.72} />
      </mesh>
      {/* Wall baseboards — dark navy strip */}
      {[
        { pos: [0, -0.2, -7.4],  rot: [0,0,0],           size: [20, 0.44, 0.2] },
        { pos: [-8.4, -0.2, 0],  rot: [0, Math.PI/2, 0], size: [20, 0.44, 0.2] },
        { pos: [8.4, -0.2, 0],   rot: [0, Math.PI/2, 0], size: [20, 0.44, 0.2] },
      ].map((w, i) => (
        <mesh key={i} position={w.pos} rotation={w.rot}>
          <boxGeometry args={w.size} />
          <meshStandardMaterial color={baseColor} roughness={0.5} metalness={0.2} />
        </mesh>
      ))}

      {/* ── SURGICAL CEILING LIGHTS ── */}
      <SurgicalLight position={[-1.2, 5.5, 0.8]}  armOffsetX={0.6} />
      <SurgicalLight position={[1.2, 5.5, -0.8]} armOffsetX={-0.6} />

      {/* ── CEILING RAIL TRACK ── */}
      <mesh position={[0, 5.92, 0.1]}>
        <boxGeometry args={[4.0, 0.12, 0.14]} />
        <meshStandardMaterial color="#c8d0dc" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* ── OPERATING TABLE ── */}
      <OperatingTable />

      {/* ── PATIENT ── */}
      <group position={[0, 0.54, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <PatientCharacter />
      </group>

      {/* ── DOCTOR ── */}
      <DoctorCharacter position={[-1.15, -0.58, 0.25]} rotation={[0, Math.PI / 2, 0]} />

      {/* ── FLOATING SENTENCE ── */}
      <FloatingSentence
        onOpenScalpel={onOpenScalpel}
        onOpenInjector={onOpenInjector}
        onOpenImplant={onOpenImplant}
        onOpenClampSelector={onOpenClampSelector}
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

      {/* ── WHEELCHAIR ── */}
      <Wheelchair position={[5.8, -0.6, 2.8]} />

      {/* ── DOOR ── */}
      <RoomDoor position={[8.38, 1.05, 3.5]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ── CLOCK ── */}
      <WallClock position={[-8.3, 4.2, -1.0]} rotation={[0, Math.PI / 2, 0]} />

      {/* ── WALL SCREEN (art panel) ── */}
      <group position={[-0.4, 2.8, -7.38]}>
        <mesh castShadow>
          <boxGeometry args={[0.07, 1.35, 1.95]} />
          <meshStandardMaterial color="#2d3748" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0.045, 0, 0]}>
          <planeGeometry args={[1.85, 1.28]} />
          <meshBasicMaterial color="#081422" />
        </mesh>
        <mesh position={[0.06, 0.12, 0]}>
          <planeGeometry args={[1.6, 0.82]} />
          <meshBasicMaterial color="#0d3250" />
        </mesh>
      </group>

      {/* ── X-RAY LIGHT BOX (right back wall) ── */}
      <group position={[8.38, 2.4, -2.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.06, 1.05, 0.78]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <planeGeometry args={[0.72, 0.96]} />
          <meshBasicMaterial color="#c4d8e8" />
        </mesh>
        {[-0.28, -0.1, 0.08, 0.26].map((y, i) => (
          <mesh key={i} position={[0.05, y, 0]}>
            <torusGeometry args={[0.2, 0.008, 4, 20, Math.PI]} />
            <meshBasicMaterial color="#8aacc0" transparent opacity={0.58} />
          </mesh>
        ))}
      </group>

      {/* ── ANATOMY POSTER ── */}
      <group position={[-8.38, 2.6, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 1.65, 2.25]} />
          <meshStandardMaterial color="#f0f4f8" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <planeGeometry args={[2.15, 1.56]} />
          <meshBasicMaterial color="#eef4f8" />
        </mesh>
        <Text position={[0.05, 0.56, 0]} fontSize={0.13} color="#e11d48" anchorX="center">
          SENTENCE ANATOMY
        </Text>
        <Text position={[0.05, 0.24, 0]} fontSize={0.085} color="#0369a1" anchorX="center">
          SUBJECT · VERB · OBJECT
        </Text>
        <Text position={[0.05, -0.06, 0]} fontSize={0.07} color="#475569" anchorX="center">
          Correct grammar saves lives!
        </Text>
      </group>

      {/* ── SHADOW PLANE ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.599, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color={floorColor} roughness={0.26} metalness={0.16} transparent opacity={0} />
      </mesh>
    </>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function OperatingTheatre({ onOpenScalpel, onOpenInjector, onOpenImplant, onOpenClampSelector }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0" style={{ background: '#1a1e26' }}>
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 6.5], fov: 44 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
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
        />
      </Canvas>
    </div>
  );
}
