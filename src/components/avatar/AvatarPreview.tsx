
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarPreviewProps {
  className?: string;
  outfitItems?: string[];
  isRotating?: boolean;
}

// Avatar Model component
function AvatarModel({ outfitItems = [] }: { outfitItems: string[] }) {
  const group = useRef<THREE.Group>(null);
  
  // Rotate the avatar
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Base Avatar Mesh - Simple placeholder shape */}
      <mesh position={[0, 0, 0]} castShadow>
        {/* Head */}
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Torso */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.8, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Legs */}
        <mesh position={[-0.15, 0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.2, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        <mesh position={[0.15, 0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.2, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.4, 0.9, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        <mesh position={[0.4, 0.9, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
      </mesh>

      {/* Clothing Items */}
      {outfitItems.includes('shirt') && (
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.32, 0.42, 0.82, 32]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.8} />
        </mesh>
      )}

      {outfitItems.includes('pants') && (
        <group position={[0, 0.2, 0]}>
          <mesh position={[-0.15, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 1.2, 32]} />
            <meshStandardMaterial color="#1e3a8a" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0.15, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 1.2, 32]} />
            <meshStandardMaterial color="#1e3a8a" transparent opacity={0.8} />
          </mesh>
        </group>
      )}

      {outfitItems.includes('shoes') && (
        <group position={[0, -0.4, 0]}>
          <mesh position={[-0.15, 0, 0.05]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <mesh position={[0.15, 0, 0.05]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        </group>
      )}

      {outfitItems.includes('glasses') && (
        <group position={[0, 1.6, 0.15]}>
          <mesh>
            <boxGeometry args={[0.36, 0.06, 0.04]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[-0.15, 0, 0.05]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </mesh>
          <mesh position={[0.15, 0, 0.05]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </mesh>
        </group>
      )}
    </group>
  );
}

// Scene setup with lights and controls
function Scene({ outfitItems = [] }: { outfitItems: string[] }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      <PerspectiveCamera makeDefault position={[0, 0.8, 3]} fov={40} />
      <OrbitControls 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2}
        maxDistance={5}
      />
      <AvatarModel outfitItems={outfitItems} />
    </>
  );
}

export function AvatarPreview({ 
  className = "", 
  outfitItems = [], 
  isRotating = true 
}: AvatarPreviewProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the 3D avatar
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative rounded-xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 ${className}`}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-avatar-200 border-t-avatar-600 animate-spin" />
        </div>
      ) : (
        <Canvas shadows style={{ height: '100%', width: '100%' }}>
          <Scene outfitItems={outfitItems} />
        </Canvas>
      )}
      <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">
        Vista previa 3D
      </div>
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700 px-3 py-2 rounded-full shadow-sm flex items-center">
        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
        Avatar Activo
      </div>
    </div>
  );
}
