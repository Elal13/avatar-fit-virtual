
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Sky, 
  Environment,
  useGLTF
} from '@react-three/drei';
import * as THREE from 'three';
import { toast } from 'sonner';

// Contexto para compartir datos del avatar
const AvatarContext = createContext();

// Hook personalizado para acceder al contexto del avatar
export const useAvatar = () => useContext(AvatarContext);

// Precargar el modelo glTF
useGLTF.preload('/models/OrcIdle.glb');

// Modelo de Avatar usando glTF
function AvatarModel({ 
  outfitItems = [],
  bodyScale = 1.0,
  hipSize = 50,
  chestSize = 50,
  clothingOffsets = {}
}) {
  const group = useRef(null);
  const [clothingMeshes, setClothingMeshes] = useState({});
  
  // Cargar el modelo glTF
  const { scene, animations } = useGLTF('/models/OrcIdle.glb');
  
  // Clonar la escena para no modificar la original cargada
  const modelScene = useRef();
  
  // Efecto para configurar el modelo
  useEffect(() => {
    if (scene) {
      // Clonar la escena
      const clonedScene = scene.clone(true);
      
      // Aplicar escala al modelo (ajustar según necesidades)
      clonedScene.scale.set(0.01, 0.01, 0.01);
      
      // Centrar el modelo
      clonedScene.position.set(0, -1, 0);
      
      // Añadir al grupo
      if (group.current) {
        // Limpiar cualquier modelo previo
        while (group.current.children.length) {
          group.current.remove(group.current.children[0]);
        }
        
        // Añadir el nuevo modelo
        group.current.add(clonedScene);
        modelScene.current = clonedScene;
        
        console.log('Modelo ORC cargado correctamente');
      }
    }
  }, [scene]);
  
  // Rotación del avatar
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Efecto para aplicar escala corporal
  useEffect(() => {
    if (modelScene.current) {
      // Aplicar escala global
      modelScene.current.scale.set(
        0.01 * bodyScale,
        0.01 * bodyScale,
        0.01 * bodyScale
      );
      
      // Nota: Para cambios más específicos como tamaño de cadera o pecho,
      // se necesitaría acceder a los huesos específicos del esqueleto (skeleton)
    }
  }, [bodyScale, hipSize, chestSize]);
  
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
        // En lugar de cargar GLB, creamos geometrías simples temporalmente
        // Este sería el punto donde cargaríamos modelos glTF de prendas
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
  
  // Función para crear una prenda usando geometrías básicas
  const loadClothingItem = async (itemName) => {
    try {
      if (!modelScene.current) return null;
      
      // Crear geometrías según el tipo de prenda
      const dummyGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.3);
      const material = new THREE.MeshStandardMaterial({ 
        color: itemName === 'shirt' ? '#3b82f6' : 
               itemName === 'pants' ? '#1e3a8a' : 
               itemName === 'shoes' ? '#111827' : '#000000',
        transparent: true,
        opacity: 0.9
      });
      
      // Crear un objeto que simule una malla
      const mesh = new THREE.Mesh(dummyGeometry, material);
      mesh.name = itemName;
      
      // Posicionar según el tipo de prenda y en relación al modelo
      switch (itemName) {
        case 'shirt':
          mesh.position.set(0, 0.4, 0);
          mesh.scale.set(1.1, 1.1, 1.1);
          break;
        case 'pants':
          mesh.position.set(0, -0.5, 0);
          mesh.scale.set(1, 1.2, 1);
          break;
        case 'shoes':
          mesh.position.set(0, -1.3, 0.2);
          mesh.scale.set(0.8, 0.3, 1.3);
          break;
        case 'glasses':
          mesh.position.set(0, 0.8, 0.5);
          mesh.scale.set(0.8, 0.2, 0.3);
          break;
      }
      
      // Añadir al grupo
      modelScene.current.add(mesh);
      
      console.log(`Prenda ${itemName} creada y añadida al avatar`);
      return mesh;
      
    } catch (error) {
      console.error(`Error al crear la prenda ${itemName}:`, error);
      toast.error(`Error al cargar ${itemName}`);
      return null;
    }
  };

  // Devolvemos el grupo que contiene el avatar cargado
  return (
    <AvatarContext.Provider value={{ clothingMeshes }}>
      <group ref={group} position={[0, 0, 0]} />
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

// Precarga de modelos
export const preloadAvatarModels = () => {
  useGLTF.preload('/models/OrcIdle.glb');
};

