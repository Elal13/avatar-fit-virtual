
# Sistema de Avatar con Skinning Compartido

Este sistema implementa un avatar 3D con soporte para prendas de vestir utilizando un esqueleto compartido (skinning). A continuación se detalla la implementación y cómo extender el sistema.

## Componentes principales

- **AvatarPreview.jsx**: Renderiza el avatar 3D y gestiona la carga de modelos con skinning.
- **AvatarCustomizer.jsx**: Interfaz de usuario para personalizar el avatar y las prendas.
- **AvatarModelingGuide.jsx**: Documentación para preparar modelos 3D compatibles.

## Estructura de carpetas

```
/public
  /models
    avatar-base.glb       # Modelo base del avatar con esqueleto
    /clothing
      shirt.glb           # Modelos de ropa
      pants.glb
      shoes.glb
      glasses.glb
```

## Preparación de modelos 3D

### Avatar Base
1. Debe tener un esqueleto (armature) completo con estructura humanoide.
2. El peso de vértices (vertex weights) debe estar correctamente configurado.
3. Exportar como glTF (.glb) con skinning.

### Prendas de vestir
1. Modelar alrededor del avatar base.
2. Usar el mismo esqueleto y nombres de huesos que el avatar base.
3. Configurar weight painting para cada prenda.
4. Exportar cada prenda como un archivo glTF separado.

## Sistemas implementados

### 1. Esqueleto Compartido
El sistema utiliza un único esqueleto extraído del avatar base y lo comparte con todas las prendas mediante `mesh.bind(skeleton, bindMatrix)`.

```javascript
// Cómo se extrae el esqueleto del avatar base
scene.traverse((object) => {
  if (object.type === 'SkinnedMesh' && !foundSkeleton) {
    foundSkeleton = object.skeleton;
    setSkeleton(foundSkeleton);
  }
});
```

### 2. Skinning para Prendas
Las prendas se cargan como `SkinnedMesh` y se vinculan al esqueleto del avatar:

```javascript
// Para cada prenda cargada
if (clothingMesh.isSkinnedMesh) {
  clothingMesh.bind(skeleton, clothingMesh.bindMatrix);
  group.current.add(clothingMesh);
}
```

### 3. Ajustes de Posición
Las prendas se pueden ajustar mediante offsets relativos al hueso correspondiente:

```javascript
// Ejemplo de offset para una prenda
const hipBone = skeleton.getBoneByName('Hips');
const worldPos = new THREE.Vector3();
hipBone.getWorldPosition(worldPos);
skinnedPants.position.copy(worldPos).add(new THREE.Vector3(0, offsetY, 0));
```

## Interfaz de Usuario
El componente `AvatarCustomizer` proporciona controles para:

1. **Medidas**: Ajustar proporciones corporales.
2. **Prendas**: Seleccionar qué prendas mostrar.
3. **Ajustes**: Modificar posición y escala de cada prenda.
4. **Avanzado**: Configuraciones adicionales.

## Extendiendo el sistema

### Añadir nuevas prendas
1. Crear el modelo 3D con el mismo esqueleto.
2. Añadir la prenda al objeto `modelLoader` en `AvatarPreview.jsx`.
3. Actualizar la UI en `AvatarCustomizer.jsx` para incluir la nueva prenda.

### Añadir animaciones
1. Exportar las animaciones en el archivo glTF del avatar.
2. Cargar las animaciones con `useAnimations` de react-three/drei.
3. Controlar la animación con acciones:

```javascript
const { actions } = useAnimations(animations, group);
actions.idle.play();
```

## Consideraciones de rendimiento
- El uso de skinning aumenta los requisitos de rendimiento.
- Para dispositivos de bajo rendimiento, considerar reducir la complejidad de los modelos.
- Utilizar `levels-of-detail` (LOD) para mejorar rendimiento en dispositivos móviles.
