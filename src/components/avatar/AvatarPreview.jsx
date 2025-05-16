
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Sky, 
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';
import { toast } from 'sonner';

// Contexto para compartir el esqueleto y la pose del avatar
const AvatarContext = createContext();

// Hook personalizado para acceder al contexto del avatar
export const useAvatar = () => useContext(AvatarContext);

// Modelo de Avatar con geometrías básicas en lugar de GLB
function AvatarModel({ 
  outfitItems = [],
  bodyScale = 1.0,
  hipSize = 50,
  chestSize = 50,
  clothingOffsets = {}
}) {
  const group = useRef(null);
  const [clothingMeshes, setClothingMeshes] = useState({});

  // Rotación del avatar
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Efecto para cargar y gestionar prendas
  useEffect(() => {
    const newClothingMeshes = {...clothingMeshes};
    
    // Lista de prendas a mostrar u ocultar
    const availableClothing = {
      'shirt': 'shirt',
      'pants': 'pants',
      'shoes': 'shoes',
      'glasses': 'glasses'
    };
    
    // Mostrar/ocultar prendas según selección
    Object.entries(availableClothing).forEach(([item]) => {
      const shouldDisplay = outfitItems.includes(item);
      
      // Si la prenda está seleccionada pero aún no está cargada
      if (shouldDisplay && !newClothingMeshes[item]) {
        // En lugar de cargar GLB, creamos geometrías simple
        console.log(`Creando prenda: ${item}`);
        loadClothingItem(item).then(mesh => {
          if (mesh) {
            newClothingMeshes[item] = mesh;
            setClothingMeshes({...newClothingMeshes});
          }
        });
      }
      
      // Mostrar/ocultar prendas ya cargadas
      if (newClothingMeshes[item]) {
        newClothingMeshes[item].visible = shouldDisplay;
        
        // Aplicar offsets configurados para esta prenda
        if (shouldDisplay && clothingOffsets[item]) {
          const { offsetY = 0, offsetX = 0, offsetZ = 0, scale = 1 } = clothingOffsets[item];
          
          newClothingMeshes[item].position.y = offsetY;
          newClothingMeshes[item].position.x = offsetX;
          newClothingMeshes[item].position.z = offsetZ;
          newClothingMeshes[item].scale.set(scale, scale, scale);
        }
      }
    });
    
  }, [outfitItems, clothingOffsets]);
  
  // Aplicar escala corporal
  useEffect(() => {
    if (group.current) {
      // Escala global
      group.current.scale.set(bodyScale, bodyScale, bodyScale);
      
      // Simulación de cambios en tamaño de cadera y pecho
      const hipScale = 0.8 + (hipSize / 100 * 0.4); // 0.8 a 1.2 basado en hipSize
      const chestScale = 0.8 + (chestSize / 100 * 0.4); // 0.8 a 1.2 basado en chestSize
      
      // Aplicar escalas a partes del cuerpo si existen
      group.current.children.forEach(child => {
        if (child.name === "hips" && hipSize !== 50) {
          child.scale.set(hipScale, 1, hipScale);
        }
        if (child.name === "chest" && chestSize !== 50) {
          child.scale.set(chestScale, 1, chestScale);
        }
      });
    }
  }, [bodyScale, hipSize, chestSize]);
  
  // Función para crear una prenda usando geometrías básicas
  const loadClothingItem = async (itemName) => {
    try {
      // Crear geometrías según el tipo de prenda
      const dummyGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.3);
      const material = new THREE.MeshStandardMaterial({ 
        color: itemName === 'shirt' ? '#3b82f6' : 
               itemName === 'pants' ? '#1e3a8a' : 
               itemName === 'shoes' ? '#111827' : '#000000',
        transparent: true,
        opacity: 0.9
      });
      
      // Crear un objeto que simule una malla skinned
      const mesh = new THREE.Mesh(dummyGeometry, material);
      mesh.name = itemName;
      
      // Posicionar según el tipo de prenda
      switch (itemName) {
        case 'shirt':
          mesh.position.set(0, 1.05, 0);
          break;
        case 'pants':
          mesh.position.set(0, 0.2, 0);
          break;
        case 'shoes':
          mesh.position.set(0, -0.7, 0);
          break;
        case 'glasses':
          mesh.position.set(0, 1.6, 0.15);
          break;
      }
      
      // Añadir al grupo
      group.current.add(mesh);
      
      console.log(`Prenda ${itemName} creada y añadida al avatar`);
      return mesh;
      
    } catch (error) {
      console.error(`Error al crear la prenda ${itemName}:`, error);
      toast.error(`Error al cargar ${itemName}`);
      return null;
    }
  };

  // Avatar básico con geometrías simples
  return (
    <AvatarContext.Provider value={{ clothingMeshes }}>
      <group ref={group} position={[0, -1, 0]}>
        {/* Cabeza */}
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Torso */}
        <mesh position={[0, 1.05, 0]} name="chest">
          <capsuleGeometry args={[0.22, 0.6, 16, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Cadera */}
        <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} name="hips">
          <capsuleGeometry args={[0.18, 0.2, 16, 32]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Pierna Izquierda */}
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
        
        {/* Pierna Derecha */}
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
        
        {/* Brazo Izquierdo */}
        <group position={[-0.3, 1.2, 0]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, -0.3]}>
            <capsuleGeometry args={[0.06, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[-0.1, -0.2, 0]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.05, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[-0.2, -0.3, 0]}>
            <sphereGeometry args={[0.05, 32, 16]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
        </group>
        
        {/* Brazo Derecho */}
        <group position={[0.3, 1.2, 0]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
            <capsuleGeometry args={[0.06, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0.1, -0.2, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.05, 0.25, 16, 32]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
          <mesh position={[0.2, -0.3, 0]}>
            <sphereGeometry args={[0.05, 32, 16]} />
            <meshStandardMaterial color="#FFDBAC" />
          </mesh>
        </group>
      </group>
    </AvatarContext.Provider>
  );
}

// Escena con luces y controles
function Scene({ outfitItems = [], bodyScale, hipSize, chestSize, clothingOffsets }) {
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
      <PerspectiveCamera makeDefault position={[0, 0.5, 2.5]} fov={40} />
      <OrbitControls 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2}
        maxDistance={4.5}
      />
      <Sky sunPosition={[100, 20, 100]} />
      <AvatarModel 
        outfitItems={outfitItems}
        bodyScale={bodyScale}
        hipSize={hipSize}
        chestSize={chestSize}
        clothingOffsets={clothingOffsets}
      />
    </>
  );
}

// Componente principal que muestra el avatar
export function AvatarPreview({ 
  className = "", 
  outfitItems = [], 
  isRotating = true,
  bodyScale = 1.0,
  hipSize = 50,
  chestSize = 50,
  clothingOffsets = {}
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga del avatar 3D
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
          <Scene 
            outfitItems={outfitItems} 
            bodyScale={bodyScale}
            hipSize={hipSize}
            chestSize={chestSize}
            clothingOffsets={clothingOffsets}
          />
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

// Ya no intentamos precargar modelos externos
export const preloadAvatarModels = () => {
  console.log("No se requiere precarga de modelos");
};
