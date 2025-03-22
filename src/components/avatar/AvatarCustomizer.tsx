
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { AvatarPreview } from './AvatarPreview';

const customizationOptions = [
  { id: 'body', label: 'Cuerpo', icon: '👤', options: ['altura', 'peso'] },
  { id: 'face', label: 'Cara', icon: '😊', options: ['ojos', 'nariz', 'boca'] },
  { id: 'hair', label: 'Cabello', icon: '💇', options: ['estilo', 'color'] },
  { id: 'skin', label: 'Piel', icon: '🧬', options: ['tono'] },
];

export function AvatarCustomizer() {
  const [activeTab, setActiveTab] = useState('body');
  const [activeOutfitItems, setActiveOutfitItems] = useState<string[]>([]);
  
  // Example measurement values
  const [measurements, setMeasurements] = useState({
    height: 175,
    weight: 70,
    chest: 95,
    waist: 80,
    hips: 95,
  });

  const handleMeasurementChange = (type: keyof typeof measurements, value: number[]) => {
    setMeasurements(prev => ({
      ...prev,
      [type]: value[0]
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 rounded-xl overflow-hidden">
        <AvatarPreview 
          className="w-full aspect-square lg:aspect-[4/3] bg-gradient-to-tr from-gray-50 to-avatar-50" 
          outfitItems={activeOutfitItems}
          isRotating={true}
        />
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Personaliza tu Avatar</h3>
            <p className="text-sm text-gray-500 mt-1">
              Ajusta las medidas y características para crear tu avatar 3D
            </p>
          </div>

          <Tabs defaultValue="body" className="w-full" onValueChange={setActiveTab}>
            <div className="px-4 pt-4">
              <TabsList className="w-full grid grid-cols-4">
                {customizationOptions.map(option => (
                  <TabsTrigger 
                    key={option.id} 
                    value={option.id}
                    className="data-[state=active]:bg-avatar-100 data-[state=active]:text-avatar-900"
                  >
                    <span className="mr-2">{option.icon}</span>
                    <span className="hidden sm:inline">{option.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="p-5">
              <TabsContent value="body" className="mt-0 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Altura</label>
                    <span className="text-sm text-avatar-700 font-medium">{measurements.height} cm</span>
                  </div>
                  <Slider 
                    defaultValue={[measurements.height]} 
                    max={220} 
                    min={140} 
                    step={1}
                    onValueChange={(value) => handleMeasurementChange('height', value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Peso</label>
                    <span className="text-sm text-avatar-700 font-medium">{measurements.weight} kg</span>
                  </div>
                  <Slider 
                    defaultValue={[measurements.weight]} 
                    max={150} 
                    min={40} 
                    step={1} 
                    onValueChange={(value) => handleMeasurementChange('weight', value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Pecho</label>
                    <span className="text-sm text-avatar-700 font-medium">{measurements.chest} cm</span>
                  </div>
                  <Slider 
                    defaultValue={[measurements.chest]} 
                    max={130} 
                    min={70} 
                    step={1} 
                    onValueChange={(value) => handleMeasurementChange('chest', value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Cintura</label>
                    <span className="text-sm text-avatar-700 font-medium">{measurements.waist} cm</span>
                  </div>
                  <Slider 
                    defaultValue={[measurements.waist]} 
                    max={130} 
                    min={60} 
                    step={1}
                    onValueChange={(value) => handleMeasurementChange('waist', value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="face" className="space-y-3 mt-0">
                <p className="text-sm text-gray-500">Personaliza las características faciales de tu avatar</p>
                <div className="p-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <span className="text-3xl">😊</span>
                </div>
                <p className="text-xs text-center text-avatar-600">Más opciones próximamente</p>
              </TabsContent>
              
              <TabsContent value="hair" className="space-y-3 mt-0">
                <p className="text-sm text-gray-500">Selecciona el estilo y color de cabello</p>
                <div className="grid grid-cols-4 gap-2">
                  {['🧑', '👩‍🦱', '👨‍🦰', '👩‍🦳', '👨‍🦳', '👨‍🦲', '👱‍♀️', '👱‍♂️'].map((style, index) => (
                    <button 
                      key={index}
                      className="p-3 rounded-lg border border-gray-200 hover:border-avatar-400 hover:bg-avatar-50 transition-colors"
                    >
                      <span className="text-2xl">{style}</span>
                    </button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="skin" className="space-y-3 mt-0">
                <p className="text-sm text-gray-500">Elige el tono de piel</p>
                <div className="grid grid-cols-5 gap-2">
                  {['#FFDBAC', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'].map((color, index) => (
                    <button 
                      key={index}
                      className="w-full aspect-square rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-avatar-400 transition-all"
                      style={{ backgroundColor: color }}
                      aria-label={`Tono de piel ${index + 1}`}
                    />
                  ))}
                </div>
              </TabsContent>
            </div>
            
            <div className="p-5 pt-0">
              <Button 
                className="w-full bg-avatar-600 hover:bg-avatar-700"
                onClick={() => setActiveOutfitItems(['shirt', 'pants', 'shoes'])}
              >
                Guardar Avatar
              </Button>
              
              <div className="mt-4">
                <p className="text-xs text-gray-500 text-center">
                  Tu avatar se usará para probar las prendas en la tienda
                </p>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
