'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';

/**
 * A stylised Gen 3 band: a titanium torus with six contact nodes.
 * Lazy-loaded and mounted only where the 3D actually earns its bytes — see
 * <System /> for how it's wrapped in next/dynamic with ssr:false.
 */
function Band() {
  const group = useRef(null);
  useFrame((state, dt) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.6 - group.current.rotation.y) * Math.min(dt * 2.2, 1);
    group.current.rotation.x += (-y * 0.35 - group.current.rotation.x) * Math.min(dt * 2.2, 1);
  });

  return (
    <group ref={group}>
      {/* Titanium spine */}
      <mesh castShadow>
        <torusGeometry args={[1.5, 0.11, 32, 128, Math.PI * 1.45]} />
        <meshStandardMaterial color="#C7CBD1" metalness={0.95} roughness={0.28} />
      </mesh>

      {/* Six dry contacts, gold-coloured, evenly spaced along the arc */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = -Math.PI * 0.12 + (i / 5) * Math.PI * 1.2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.5, Math.sin(a) * 1.5, 0]}>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial color="#E9B872" emissive="#E9B872" emissiveIntensity={0.35} metalness={0.7} roughness={0.25} />
          </mesh>
        );
      })}

      {/* Glass housing */}
      <mesh position={[0, -1.42, 0]}>
        <capsuleGeometry args={[0.19, 0.5, 8, 24]} />
        <MeshTransmissionMaterial thickness={0.6} roughness={0.12} transmission={1} ior={1.4} chromaticAberration={0.05} backside />
      </mesh>
    </group>
  );
}

export default function BandObject({ className = '' }) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 5]} intensity={1.4} />
          <pointLight position={[-4, -2, 3]} intensity={18} color="#1E6A5C" />
          <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
            <Band />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
