
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  PerspectiveCamera, 
  Sky, 
  Environment, 
  useAnimations 
} from '@react-three/drei';
import * as THREE from 'three';
import { toast } from 'sonner';

// Contexto para compartir el esqueleto y la pose del avatar
const AvatarContext = createContext();

// Hook personalizado para acceder al contexto del avatar
export const useAvatar = () => useContext(AvatarContext);

// Modelo de Avatar con skinning
function AvatarModel({ 
  outfitItems = [],
  bodyScale = 1.0,
  hipSize = 50,
  chestSize = 50,
  clothingOffsets = {}
}) {
  const group = useRef(null);
  const skeletonRef = useRef(null);
  const { scene, animations } = useGLTF('/models/avatar-base.glb');
  const { actions, mixer } = useAnimations(animations, group);
  const [skeleton, setSkeleton] = useState(null);
  const [avatarMeshes, setAvatarMeshes] = useState({});
  const [clothingMeshes, setClothingMeshes] = useState({});

  // Rotación del avatar
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Efecto para inicializar el esqueleto y meshes de avatar
  useEffect(() => {
    // Buscar SkinnedMesh y esqueleto en el modelo
    let foundSkeleton = null;
    const meshes = {};
    
    scene.traverse((object) => {
      // Guardar referencia al esqueleto del primer SkinnedMesh encontrado
      if (object.type === 'SkinnedMesh' && !foundSkeleton) {
        foundSkeleton = object.skeleton;
        skeletonRef.current = foundSkeleton;
        setSkeleton(foundSkeleton);
        console.log("Esqueleto encontrado:", foundSkeleton);
      }
      
      // Guardar referencias a las partes del cuerpo para modificarlas después
      if (object.isMesh) {
        // Asumimos que las mallas tienen nombres descriptivos como "body", "head", etc.
        meshes[object.name] = object;
      }
    });

    setAvatarMeshes(meshes);
    
    // Iniciar animación de idle si existe
    if (animations && animations.length > 0) {
      const idleAction = actions['idle'] || Object.values(actions)[0];
      if (idleAction) {
        idleAction.reset().fadeIn(0.5).play();
      }
    }

    // Clone y prepara el escene
    group.current.add(scene.clone());
    
  }, [scene, animations, actions]);

  // Aplicar escala corporal
  useEffect(() => {
    if (avatarMeshes.body) {
      // Aplicar escalado basado en los sliders de personalización
      const hipScale = 0.8 + (hipSize / 100 * 0.4); // 0.8 a 1.2 basado en hipSize
      const chestScale = 0.8 + (chestSize / 100 * 0.4); // 0.8 a 1.2 basado en chestSize
      
      const hips = skeletonRef.current?.getBoneByName('Hips');
      const chest = skeletonRef.current?.getBoneByName('Spine2');
      
      if (hips) {
        hips.scale.set(hipScale, 1, hipScale);
      }
      
      if (chest) {
        chest.scale.set(chestScale, 1, chestScale);
      }
      
      // Escala global
      group.current.scale.set(bodyScale, bodyScale, bodyScale);
    }
  }, [bodyScale, hipSize, chestSize, avatarMeshes]);

  // Cargar y gestionar prendas
  useEffect(() => {
    const newClothingMeshes = {...clothingMeshes};
    
    // Lista de prendas a mostrar u ocultar
    const availableClothing = {
      'shirt': '/models/clothing/shirt.glb',
      'pants': '/models/clothing/pants.glb',
      'shoes': '/models/clothing/shoes.glb',
      'glasses': '/models/clothing/glasses.glb'
    };
    
    // Mostrar/ocultar prendas según selección
    Object.entries(availableClothing).forEach(([item, url]) => {
      const shouldDisplay = outfitItems.includes(item);
      
      // Si la prenda está seleccionada pero aún no está cargada
      if (shouldDisplay && !newClothingMeshes[item]) {
        // Cargar la prenda (implementación simplificada)
        console.log(`Cargando prenda: ${item}`);
        
        // En un caso real, cargaríamos el modelo con useGLTF o useLoader
        // y luego lo vincularíamos al esqueleto del avatar
        loadClothingItem(item, url).then(mesh => {
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
    
  }, [outfitItems, clothingOffsets, skeleton]);
  
  // Función para cargar una prenda de vestir
  const loadClothingItem = async (itemName, url) => {
    if (!skeletonRef.current) {
      console.error("No hay esqueleto disponible para vincular la prenda");
      return null;
    }
    
    try {
      // En una implementación real, usaríamos useLoader o useGLTF para cargar el modelo
      // Aquí simulamos el proceso con un placeholder
      
      // Simulación - en producción esto sería reemplazado por la carga real del modelo
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
      
      console.log(`Prenda ${itemName} cargada y vinculada al esqueleto`);
      return mesh;
      
    } catch (error) {
      console.error(`Error al cargar la prenda ${itemName}:`, error);
      toast.error(`Error al cargar ${itemName}`);
      return null;
    }
  };

  // Proporcionar contexto para componentes hijos
  return (
    <AvatarContext.Provider value={{ skeleton: skeletonRef.current, avatarMeshes, clothingMeshes }}>
      <group ref={group} position={[0, -1, 0]}>
        {/* El modelo y las prendas se añaden dinámicamente al grupo */}
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

// Precarga y gestión de modelos 3D
const modelLoader = {
  avatarBase: '/models/avatar-base.glb',
  shirt: '/models/clothing/shirt.glb',
  pants: '/models/clothing/pants.glb',
  shoes: '/models/clothing/shoes.glb',
  glasses: '/models/clothing/glasses.glb'
};

// Nota: Esta función ayuda a pre-cargar modelos
export const preloadAvatarModels = () => {
  Object.values(modelLoader).forEach(url => {
    useGLTF.preload(url);
  });
};
