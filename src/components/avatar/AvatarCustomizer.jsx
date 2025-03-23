
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { AvatarPreview } from './AvatarPreview';

export function AvatarCustomizer() {
  const [activeTab, setActiveTab] = useState('medidas');
  const [hipSize, setHipSize] = useState([50]);

  const handleHipSizeChange = (value) => {
    setHipSize(value);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <AvatarPreview className="w-full aspect-square" hipSize={hipSize[0]} />
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
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="piel">Piel</TabsTrigger>
            <TabsTrigger value="pelo">Pelo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="medidas">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Cadera: {hipSize[0]}%
                </label>
                <Slider 
                  value={hipSize} 
                  onValueChange={handleHipSizeChange} 
                  max={100} 
                  step={1}
                  className="w-full"
                />
              </div>
              
              <Button className="w-full bg-avatar-600 hover:bg-avatar-700 mt-4">
                Guardar cambios
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="caracteristicas">
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-gray-500">Características de personalización</p>
            </div>
          </TabsContent>
          
          <TabsContent value="piel">
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-gray-500">Tono de piel</p>
            </div>
          </TabsContent>
          
          <TabsContent value="pelo">
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-gray-500">Estilo de pelo</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
