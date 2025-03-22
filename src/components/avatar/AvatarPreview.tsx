
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
      {/* Base Avatar Mesh - More realistic human shape */}
      <group position={[0, 0, 0]} castShadow>
        {/* Head */}
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.45, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Torso - More human-like shape */}
        <mesh position={[0, 1.05, 0]}>
          <capsuleGeometry args={[0.22, 0.6, 16, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Hips */}
        <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.23, 0.2, 16, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Left Leg */}
        <group position={[-0.15, 0.2, 0]}>
          <mesh position={[0, 0.15, 0]}>
            <capsuleGeometry args={[0.09, 0.3, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.08, 0.4, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0, -0.7, 0.05]}>
            <boxGeometry args={[0.1, 0.1, 0.25]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
        </group>
        
        {/* Right Leg */}
        <group position={[0.15, 0.2, 0]}>
          <mesh position={[0, 0.15, 0]}>
            <capsuleGeometry args={[0.09, 0.3, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.08, 0.4, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0, -0.7, 0.05]}>
            <boxGeometry args={[0.1, 0.1, 0.25]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
        </group>
        
        {/* Left Arm */}
        <group position={[-0.3, 1.2, 0]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, -0.3]}>
            <capsuleGeometry args={[0.06, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[-0.1, -0.2, 0]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.05, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[-0.2, -0.3, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 32, 16]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
        </group>
        
        {/* Right Arm */}
        <group position={[0.3, 1.2, 0]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
            <capsuleGeometry args={[0.06, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0.1, -0.2, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.05, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0.2, -0.3, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 32, 16]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
        </group>
      </group>

      {/* Clothing Items with more realistic shapes */}
      {outfitItems.includes('shirt') && (
        <group position={[0, 1.05, 0]}>
          <mesh>
            <capsuleGeometry args={[0.23, 0.62, 16, 32]} />
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.9} />
          </mesh>
          {/* Sleeves */}
          <mesh position={[-0.3, 0.15, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.07, 0.07, 0.25, 32]} />
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.3, 0.15, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.07, 0.07, 0.25, 32]} />
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.9} />
          </mesh>
        </group>
      )}

      {outfitItems.includes('pants') && (
        <group position={[0, 0.2, 0]}>
          {/* Hip part */}
          <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.24, 0.22, 16, 32]} />
            <meshStandardMaterial color="#1e3a8a" transparent opacity={0.9} />
          </mesh>
          {/* Legs */}
          <mesh position={[-0.15, 0.15, 0]}>
            <capsuleGeometry args={[0.1, 0.3, 16, 32]} />
            <meshStandardMaterial color="#1e3a8a" transparent opacity={0.9} />
          </mesh>
          <mesh position={[-0.15, -0.3, 0]}>
            <capsuleGeometry args={[0.09, 0.4, 16, 32]} />
            <meshStandardMaterial color="#1e3a8a" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.15, 0.15, 0]}>
            <capsuleGeometry args={[0.1, 0.3, 16, 32]} />
            <meshStandardMaterial color="#1e3a8a" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.15, -0.3, 0]}>
            <capsuleGeometry args={[0.09, 0.4, 16, 32]} />
            <meshStandardMaterial color="#1e3a8a" transparent opacity={0.9} />
          </mesh>
        </group>
      )}

      {outfitItems.includes('shoes') && (
        <group position={[0, -0.7, 0]}>
          <mesh position={[-0.15, 0, 0.05]}>
            <boxGeometry args={[0.12, 0.12, 0.3]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <mesh position={[0.15, 0, 0.05]}>
            <boxGeometry args={[0.12, 0.12, 0.3]} />
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
      <PerspectiveCamera makeDefault position={[0, 0.5, 2.7]} fov={40} />
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
