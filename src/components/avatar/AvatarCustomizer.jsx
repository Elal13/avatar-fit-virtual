
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from "@/components/ui/label";
import { AvatarPreview, preloadAvatarModels } from './AvatarPreview';
import { toast } from 'sonner';

export function AvatarCustomizer() {
  const [activeTab, setActiveTab] = useState('medidas');
  
  // Parámetros corporales
  const [bodyScale, setBodyScale] = useState([100]);
  const [hipSize, setHipSize] = useState([50]);
  const [chestSize, setChestSize] = useState([50]);
  
  // Prendas activas
  const [activeOutfitItems, setActiveOutfitItems] = useState(['shirt', 'pants']);
  
  // Offsets de prendas - objeto con ajustes para cada prenda
  const [clothingOffsets, setClothingOffsets] = useState({
    shirt: { offsetY: 0, offsetX: 0, offsetZ: 0, scale: 1 },
    pants: { offsetY: 0, offsetX: 0, offsetZ: 0, scale: 1 },
    shoes: { offsetY: 0, offsetX: 0, offsetZ: 0, scale: 1 },
    glasses: { offsetY: 0, offsetX: 0, offsetZ: 0, scale: 1 }
  });

  // Pre-cargar modelos cuando el componente se monta
  useEffect(() => {
    preloadAvatarModels();
  }, []);

  // Manejadores para los cambios de parámetros
  const handleBodyScaleChange = (value) => {
    setBodyScale(value);
  };

  const handleHipSizeChange = (value) => {
    setHipSize(value);
  };
  
  const handleChestSizeChange = (value) => {
    setChestSize(value);
  };
  
  const handleOffsetChange = (item, property, value) => {
    setClothingOffsets(prev => ({
      ...prev,
      [item]: {
        ...prev[item],
        [property]: value[0] / 100 // Convertir de 0-100 a 0-1 para escalas pequeñas
      }
    }));
  };
  
  const toggleClothingItem = (item) => {
    setActiveOutfitItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };
  
  const saveChanges = () => {
    toast.success("Cambios guardados");
    // Aquí se implementaría la lógica para guardar los cambios en el backend
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <AvatarPreview 
          className="w-full aspect-square" 
          outfitItems={activeOutfitItems}
          bodyScale={bodyScale[0] / 100}
          hipSize={hipSize[0]}
          chestSize={chestSize[0]}
          clothingOffsets={clothingOffsets}
        />
      </div>
      
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Personalización de Avatar</h3>
          <p className="text-sm text-gray-500">
            Personaliza tu avatar para probar prendas virtualmente
          </p>
        </div>
        
        <Tabs defaultValue="medidas" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="medidas">Medidas</TabsTrigger>
            <TabsTrigger value="prendas">Prendas</TabsTrigger>
            <TabsTrigger value="ajustes">Ajustes</TabsTrigger>
            <TabsTrigger value="avanzado">Avanzado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="medidas">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>
                  Escala corporal: {bodyScale[0]}%
                </Label>
                <Slider 
                  value={bodyScale} 
                  onValueChange={handleBodyScaleChange} 
                  min={80}
                  max={120} 
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                <Label>
                  Cadera: {hipSize[0]}%
                </Label>
                <Slider 
                  value={hipSize} 
                  onValueChange={handleHipSizeChange} 
                  max={100} 
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                <Label>
                  Pecho: {chestSize[0]}%
                </Label>
                <Slider 
                  value={chestSize} 
                  onValueChange={handleChestSizeChange} 
                  max={100} 
                  step={1}
                  className="w-full"
                />
              </div>
              
              <Button 
                className="w-full bg-avatar-600 hover:bg-avatar-700 mt-8"
                onClick={saveChanges}
              >
                Guardar cambios
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="prendas">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Selecciona las prendas</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className={`p-4 rounded-lg border ${
                    activeOutfitItems.includes('shirt') 
                    ? 'border-avatar-500 bg-avatar-50 text-avatar-700' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleClothingItem('shirt')}
                >
                  <div className="text-center">
                    <div className="mb-1">👕</div>
                    <div className="text-sm">Camiseta</div>
                  </div>
                </button>
                
                <button 
                  className={`p-4 rounded-lg border ${
                    activeOutfitItems.includes('pants') 
                    ? 'border-avatar-500 bg-avatar-50 text-avatar-700' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleClothingItem('pants')}
                >
                  <div className="text-center">
                    <div className="mb-1">👖</div>
                    <div className="text-sm">Pantalón</div>
                  </div>
                </button>
                
                <button 
                  className={`p-4 rounded-lg border ${
                    activeOutfitItems.includes('shoes') 
                    ? 'border-avatar-500 bg-avatar-50 text-avatar-700' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleClothingItem('shoes')}
                >
                  <div className="text-center">
                    <div className="mb-1">👟</div>
                    <div className="text-sm">Zapatos</div>
                  </div>
                </button>
                
                <button 
                  className={`p-4 rounded-lg border ${
                    activeOutfitItems.includes('glasses') 
                    ? 'border-avatar-500 bg-avatar-50 text-avatar-700' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleClothingItem('glasses')}
                >
                  <div className="text-center">
                    <div className="mb-1">👓</div>
                    <div className="text-sm">Gafas</div>
                  </div>
                </button>
              </div>
              
              <Button 
                className="w-full bg-avatar-600 hover:bg-avatar-700 mt-4"
                onClick={saveChanges}
              >
                Guardar cambios
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="ajustes">
            <div className="space-y-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Ajustes de posición de prendas</h4>
              
              {activeOutfitItems.length > 0 ? (
                activeOutfitItems.map(item => (
                  <div key={item} className="p-4 border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-gray-800 mb-4">
                      {item === 'shirt' && 'Camiseta'}
                      {item === 'pants' && 'Pantalón'}
                      {item === 'shoes' && 'Zapatos'}
                      {item === 'glasses' && 'Gafas'}
                    </h5>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>
                          Desplazamiento vertical: {Math.round(clothingOffsets[item].offsetY * 100)}
                        </Label>
                        <Slider 
                          value={[clothingOffsets[item].offsetY * 100]} 
                          onValueChange={(val) => handleOffsetChange(item, 'offsetY', val)}
                          min={-50}
                          max={50} 
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <Label>
                          Escala: {Math.round(clothingOffsets[item].scale * 100)}%
                        </Label>
                        <Slider 
                          value={[clothingOffsets[item].scale * 100]} 
                          onValueChange={(val) => handleOffsetChange(item, 'scale', val)}
                          min={50}
                          max={150} 
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Selecciona al menos una prenda en la pestaña "Prendas"
                </div>
              )}
              
              <Button 
                className="w-full bg-avatar-600 hover:bg-avatar-700 mt-4"
                onClick={saveChanges}
              >
                Guardar cambios
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="avanzado">
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <h4 className="text-lg font-medium text-gray-700">Ajustes avanzados</h4>
              <p className="text-gray-500 max-w-sm">
                Los ajustes avanzados permiten configurar los pesos de vinculación del esqueleto para cada prenda.
              </p>
              <p className="text-sm text-avatar-600 font-medium">
                Tu avatar usa skinning para una mayor precisión en el ajuste de prendas.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
