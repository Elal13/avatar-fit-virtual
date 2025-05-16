
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';
import { AvatarModelingGuide } from '@/components/avatar/AvatarModelingGuide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Avatar = () => {
  const [activeTab, setActiveTab] = useState('customizer');
  
  // Añadir un handler para mostrar un mensaje informativo
  const handleModelingGuideClick = () => {
    toast.info("Guía de modelado: Se utilizan geometrías básicas temporalmente.");
  };
  
  return (
    <PageLayout>
      <section className="pt-12 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mi Avatar Digital
            </h1>
            <p className="text-lg text-gray-600">
              Personaliza tu avatar 3D para probar prendas virtualmente
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="customizer">Personalización</TabsTrigger>
              <TabsTrigger value="guide" onClick={handleModelingGuideClick}>Guía de Modelado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customizer" className="mt-6">
              <AvatarCustomizer />
            </TabsContent>
            
            <TabsContent value="guide" className="mt-6">
              <AvatarModelingGuide />
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              Después de crear tu avatar, podrás probarte ropa virtualmente en nuestra tienda
            </p>
            <Link to="/shop">
              <Button className="bg-avatar-600 hover:bg-avatar-700">
                Ir a la Tienda
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Avatar;
