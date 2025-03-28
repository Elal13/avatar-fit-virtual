
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';
import { Link } from 'react-router-dom';

const Avatar = () => {
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
          
          <AvatarCustomizer />
          
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
