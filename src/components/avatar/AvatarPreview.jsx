
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Sky, 
  Environment,
  Sphere,
  Box,
  Cylinder
} from '@react-three/drei';
import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-stdlib';
import { toast } from 'sonner';

// Contexto para compartir datos del avatar
const AvatarContext = createContext();

// Hook personalizado para acceder al contexto del avatar
export const useAvatar = () => useContext(AvatarContext);

// Componente para cargar modelos OBJ con sus materiales
function AvatarModel({ 
  outfitItems = [],
  bodyScale = 1.0,
  hipSize = 50,
  chestSize = 50,
  clothingOffsets = {}
}) {
  const group = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [clothingMeshes, setClothingMeshes] = useState({});
  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    // Este efecto solo se ejecuta para configurar el modo de visualización
    const timer = setTimeout(() => {
      setModelLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Función para cargar modelo OBJ con sus materiales
  const OrcModel = () => {
    try {
      // Intentamos cargar el modelo OBJ y sus materiales
      const avatarMaterials = useLoader(MTLLoader, '/models/OrcIdle.mtl');
      const avatar = useLoader(OBJLoader, '/models/OrcIdle.obj', (loader) => {
        loader.setMaterials(avatarMaterials);
      });

      // Escalar y posicionar el avatar
      avatar.scale.set(0.01, 0.01, 0.01);
      
      // Cargar la gorra si está seleccionada en outfitItems
      if (outfitItems.includes('glasses')) {
        try {
          const capMaterials = useLoader(MTLLoader, '/models/Cap.mtl');
          const cap = useLoader(OBJLoader, '/models/Cap.obj', (loader) => {
            loader.setMaterials(capMaterials);
          });
          
          // Ajustar posición y escala de la gorra
          cap.position.set(0, 1.75, 0);
          cap.scale.set(0.1, 0.1, 0.1);
          
          // Añadir la gorra como hijo del avatar
          avatar.add(cap);
        } catch (error) {
          console.error("Error al cargar la gorra:", error);
          toast.error("No se pudo cargar la gorra");
        }
      }
      
      // Cargar camisa si está seleccionada
      if (outfitItems.includes('shirt')) {
        try {
          // Aquí cargaríamos una camisa OBJ si existiera
          // Por ahora es solo placerholder de código
          console.log("Se cargaría la camisa OBJ aquí");
          
          // Ejemplo de posicionamiento para una camisa
          // shirtModel.position.set(0, 0.8, 0);
        } catch (error) {
          console.error("Error al cargar la camisa:", error);
        }
      }
      
      // Aplicar escala global del cuerpo
      if (bodyScale !== 1.0) {
        avatar.scale.multiplyScalar(bodyScale);
      }
      
      // Actualizar estado
      setModelLoaded(true);
      setFallbackMode(false);
      
      // Rotar suavemente
      useFrame((state) => {
        if (avatar) {
          avatar.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
      });
      
      return <primitive object={avatar} />;
      
    } catch (error) {
      console.error("Error al cargar el modelo OBJ:", error);
      setFallbackMode(true);
      
      // Informamos al usuario sobre el error
      toast.error("No se pudo cargar el modelo 3D", {
        description: "Usando avatar alternativo",
        duration: 4000,
      });
      
      // Devolvemos null para que se maneje el fallback
      return null;
    }
  };
  
  // Modelo de fallback usando geometrías primitivas
  const FallbackModel = () => {
    const basicModel = useRef(new THREE.Group());
    
    useEffect(() => {
      if (!basicModel.current) return;
      
      // Limpiar grupo
      while (basicModel.current.children.length) {
        basicModel.current.remove(basicModel.current.children[0]);
      }
      
      // Crear modelo básico
      // Cabeza (esfera)
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x8d5524 })
      );
      head.position.y = 0.7;
      basicModel.current.add(head);
      
      // Torso (caja)
      const torso = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.6, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x8d5524 })
      );
      torso.position.y = 0.15;
      basicModel.current.add(torso);
      
      // Brazos
      const leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x8d5524 })
      );
      leftArm.position.set(0.35, 0.15, 0);
      leftArm.rotation.z = Math.PI / 2;
      basicModel.current.add(leftArm);
      
      const rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x8d5524 })
      );
      rightArm.position.set(-0.35, 0.15, 0);
      rightArm.rotation.z = Math.PI / 2;
      basicModel.current.add(rightArm);
      
      // Piernas
      const leftLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x8d5524 })
      );
      leftLeg.position.set(0.15, -0.35, 0);
      basicModel.current.add(leftLeg);
      
      const rightLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x8d5524 })
      );
      rightLeg.position.set(-0.15, -0.35, 0);
      basicModel.current.add(rightLeg);
      
      // Escalar modelo
      basicModel.current.scale.set(bodyScale, bodyScale, bodyScale);
      
      // Añadir ropa seleccionada usando geometrías primitivas
      if (outfitItems.includes('glasses')) {
        // Simulamos una gorra con una caja
        const cap = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.1, 0.4),
          new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
        );
        cap.position.set(0, 0.9, 0);
        basicModel.current.add(cap);
      }
      
      if (outfitItems.includes('shirt')) {
        // Simulamos una camisa
        const shirt = new THREE.Mesh(
          new THREE.BoxGeometry(0.55, 0.65, 0.3),
          new THREE.MeshStandardMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.9 })
        );
        shirt.position.set(0, 0.15, 0);
        basicModel.current.add(shirt);
      }
      
      if (outfitItems.includes('pants')) {
        // Simulamos un pantalón
        const pants = new THREE.Mesh(
          new THREE.BoxGeometry(0.35, 0.6, 0.25),
          new THREE.MeshStandardMaterial({ color: 0x1e3a8a, transparent: true, opacity: 0.9 })
        );
        pants.position.set(0, -0.35, 0);
        basicModel.current.add(pants);
      }
    }, [outfitItems, bodyScale]);
    
    // Rotación del modelo
    useFrame((state) => {
      if (basicModel.current) {
        basicModel.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      }
    });
    
    return <primitive object={basicModel.current} />;
  };
  
  // Dependiendo del estado, mostramos el modelo OBJ o el fallback
  return (
    <AvatarContext.Provider value={{ clothingMeshes }}>
      <group ref={group} position={[0, 0, 0]}>
        {fallbackMode ? <FallbackModel /> : <OrcModel />}
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

// Función de precarga modificada para OBJ y MTL
export const preloadAvatarModels = () => {
  console.log('Precargando modelos OBJ+MTL (desactivado por ahora para evitar errores 404)');
  // Aquí se podría implementar precarga real cuando tengamos los archivos
};
