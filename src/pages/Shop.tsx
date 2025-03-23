import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard, type Product } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye } from 'lucide-react';
import { AvatarPreview } from '@/components/avatar/AvatarPreview';

// Sample products data
const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    brand: 'AVATAR Basic',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Camisetas',
    isNew: true,
    hasTryOn: true,
    hasNFT: true
  },
  {
    id: '2',
    name: 'Jeans Slim Fit',
    brand: 'AVATAR Denim',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Pantalones',
    hasTryOn: true
  },
  {
    id: '3',
    name: 'Zapatillas Deportivas',
    brand: 'AVATAR Sport',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Calzado',
    isNew: true,
    hasTryOn: true,
    hasNFT: true
  },
  {
    id: '4',
    name: 'Sudadera con Capucha',
    brand: 'AVATAR Comfort',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Sudaderas',
    hasTryOn: true
  },
  {
    id: '5',
    name: 'Gafas de Sol Premium',
    brand: 'AVATAR Eyewear',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Accesorios',
    hasTryOn: true,
    hasNFT: true
  },
  {
    id: '6',
    name: 'Camiseta Estampada',
    brand: 'AVATAR Graphics',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1503341733017-1901578f9f1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Camisetas',
    hasTryOn: true
  },
  {
    id: '7',
    name: 'Chaqueta de Invierno',
    brand: 'AVATAR Outerwear',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Chaquetas',
    isNew: true,
    hasTryOn: true,
    hasNFT: true
  },
  {
    id: '8',
    name: 'Pantalones de Chándal',
    brand: 'AVATAR Sport',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Pantalones',
    hasTryOn: true
  }
];

const categories = [
  'Todos',
  'Camisetas',
  'Pantalones',
  'Calzado',
  'Sudaderas',
  'Chaquetas',
  'Accesorios'
];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [tryOnMode, setTryOnMode] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState<string[]>([]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFilterToggle = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const filteredProducts = products.filter(product => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'Todos' || 
      product.category === selectedCategory;
    
    // Apply additional filters
    const matchesFilters = activeFilters.length === 0 || 
      (activeFilters.includes('new') ? product.isNew : true) &&
      (activeFilters.includes('tryOn') ? product.hasTryOn : true) &&
      (activeFilters.includes('nft') ? product.hasNFT : true);
    
    return matchesSearch && matchesCategory && matchesFilters;
  });

  return (
    <PageLayout>
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tienda
            </h1>
            <p className="text-lg text-gray-600">
              Explora nuestra colección y prueba las prendas en tu avatar
            </p>
          </div>

          {tryOnMode ? (
            <div className="mb-8 rounded-xl overflow-hidden border border-avatar-200 bg-gradient-to-r from-avatar-50 to-gray-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8">
                  <div className="mb-4 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Modo prueba virtual activado</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Prueba las prendas en tu avatar</h2>
                  <p className="text-gray-600 mb-6">
                    Selecciona cualquier prenda con el icono de prueba para ver cómo te queda en tiempo real.
                  </p>
                  <Button 
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                    onClick={() => setTryOnMode(false)}
                  >
                    Salir del modo prueba
                  </Button>
                </div>
                <div className="h-80 lg:h-auto">
                  <AvatarPreview 
                    className="h-full w-full" 
                    outfitItems={currentOutfit}
                    isRotating={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <Button 
                className="avatar-button gap-2"
                onClick={() => setTryOnMode(true)}
              >
                <Eye className="h-4 w-4" /> Activar prueba virtual
              </Button>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  className="pl-10 border-gray-300 focus-visible:ring-avatar-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeFilters.includes('new') ? 'default' : 'outline'}
                  className={activeFilters.includes('new') 
                    ? 'bg-avatar-600 hover:bg-avatar-700' 
                    : 'border-gray-300 text-gray-700'
                  }
                  onClick={() => handleFilterToggle('new')}
                >
                  Nuevo
                </Button>
                <Button
                  variant={activeFilters.includes('tryOn') ? 'default' : 'outline'}
                  className={activeFilters.includes('tryOn') 
                    ? 'bg-avatar-600 hover:bg-avatar-700' 
                    : 'border-gray-300 text-gray-700'
                  }
                  onClick={() => handleFilterToggle('tryOn')}
                >
                  Prueba virtual
                </Button>
                <Button
                  variant={activeFilters.includes('nft') ? 'default' : 'outline'}
                  className={activeFilters.includes('nft') 
                    ? 'bg-avatar-600 hover:bg-avatar-700' 
                    : 'border-gray-300 text-gray-700'
                  }
                  onClick={() => handleFilterToggle('nft')}
                >
                  NFT
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={`whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-avatar-600 hover:bg-avatar-700'
                        : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-600 mb-6">
                Prueba ajustando tus filtros o utilizando términos de búsqueda diferentes
              </p>
              <Button
                variant="outline"
                className="border-avatar-500 text-avatar-600"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setActiveFilters([]);
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Shop;
