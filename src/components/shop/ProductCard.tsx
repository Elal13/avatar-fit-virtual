
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  hasTryOn?: boolean;
  hasNFT?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCard({ product, className = "", style }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} añadido al carrito`);
  };

  const handleTryOn = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Probándote ${product.name}...`);
  };

  return (
    <Link 
      to={`/shop/product/${product.id}`}
      className={`group block overflow-hidden rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-avatar ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={style}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-avatar-200 border-t-avatar-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover w-full h-full transition-transform duration-700 ease-in-out ${isHovering ? 'scale-105' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-avatar-600 hover:bg-avatar-700">
            Nuevo
          </Badge>
        )}

        {product.hasNFT && (
          <Badge variant="outline" className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white border-avatar-500 text-avatar-700">
            NFT
          </Badge>
        )}

        <div className={`absolute bottom-0 left-0 right-0 p-3 flex gap-2 bg-white/80 backdrop-blur-sm transform transition-transform duration-300 ${isHovering ? 'translate-y-0' : 'translate-y-full'}`}>
          {product.hasTryOn && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-1 font-medium border-avatar-500 text-avatar-700 hover:bg-avatar-50"
              onClick={handleTryOn}
            >
              <Eye className="h-4 w-4" /> Probar
            </Button>
          )}
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 gap-1 font-medium bg-avatar-600 hover:bg-avatar-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" /> Añadir
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
        <div className="flex justify-between items-center">
          <p className="text-avatar-900 font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{product.category}</p>
        </div>
      </div>
    </Link>
  );
}
