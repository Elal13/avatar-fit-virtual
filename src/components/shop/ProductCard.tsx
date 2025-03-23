
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { HTMLAttributes } from 'react';

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  hasTryOn?: boolean;
  hasNFT?: boolean;
  size?: string;
  color?: string;
  quantity?: number;
};

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export function ProductCard({ product, className, ...props }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const productWithDefaults = {
      ...product,
      size: product.size || 'M',
      color: product.color || 'Negro',
      quantity: 1
    };
    addToCart(productWithDefaults);
  };

  return (
    <div 
      className={`group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {product.isNew && (
            <Badge className="bg-avatar-600 hover:bg-avatar-700">Nuevo</Badge>
          )}
          {product.hasTryOn && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-avatar-200 text-avatar-700 hover:bg-white">
              <Eye className="mr-1 h-3 w-3" /> Prueba virtual
            </Badge>
          )}
          {product.hasNFT && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-avatar-200 text-avatar-700 hover:bg-white">
              NFT
            </Badge>
          )}
        </div>
        
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-white text-gray-800 hover:bg-gray-100"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Añadir
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-white text-gray-800 hover:bg-gray-100"
            >
              <Eye className="h-4 w-4 mr-1" /> Probar
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-avatar-900">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
