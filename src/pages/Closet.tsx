
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { AvatarPreview } from '@/components/avatar/AvatarPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Sample closet items
const closetItems = [
  {
    id: '1',
    name: 'Camiseta Básica',
    brand: 'AVATAR Basic',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'shirt',
    hasNFT: true
  },
  {
    id: '2',
    name: 'Jeans Slim Fit',
    brand: 'AVATAR Denim',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'pants',
  },
  {
    id: '3',
    name: 'Zapatillas Deportivas',
    brand: 'AVATAR Sport',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'shoes',
    hasNFT: true
  },
  {
    id: '4',
    name: 'Sudadera con Capucha',
    brand: 'AVATAR Comfort',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'shirt',
  },
  {
    id: '5',
    name: 'Gafas de Sol Premium',
    brand: 'AVATAR Eyewear',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'glasses',
    hasNFT: true
  }
];

// Sample outfits
const savedOutfits = [
  {
    id: '1',
    name: 'Casual Diario',
    items: ['1', '2', '3'],
  },
  {
    id: '2',
    name: 'Sport',
    items: ['4', '2', '3', '5'],
  }
];

const Closet = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [activeOutfit, setActiveOutfit] = useState<string[]>([]);
  const [activeOutfitName, setActiveOutfitName] = useState('Mi Outfit');

  const handleItemClick = (item: typeof closetItems[0]) => {
    const itemCategory = item.category;
    
    // Remove any existing items of the same category
    const filteredOutfit = activeOutfit.filter(id => {
      const matchingItem = closetItems.find(i => i.id === id);
      return matchingItem?.category !== itemCategory;
    });
    
    // Add the new item
    setActiveOutfit([...filteredOutfit, item.id]);
    toast.success(`${item.name} añadido al outfit`);
  };

  const handleOutfitClick = (outfit: typeof savedOutfits[0]) => {
    setActiveOutfit(outfit.items);
    setActiveOutfitName(outfit.name);
    toast.success(`Outfit "${outfit.name}" cargado`);
  };

  const handleClearOutfit = () => {
    setActiveOutfit([]);
    setActiveOutfitName('Mi Outfit');
    toast.info('Outfit limpiado');
  };

  const handleSaveOutfit = () => {
    toast.success('Outfit guardado exitosamente');
  };

  // Convert activeOutfit IDs to the category types needed by AvatarPreview
  const activeOutfitCategories = activeOutfit.map(id => {
    const item = closetItems.find(item => item.id === id);
    return item?.category || '';
  });

  const filteredItems = selectedTab === 'all' 
    ? closetItems 
    : closetItems.filter(item => item.category === selectedTab);

  return (
    <PageLayout>
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mi Armario
            </h1>
            <p className="text-lg text-gray-600">
              Gestiona tus prendas y crea outfits completos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Mis Prendas</h3>
                </div>

                <Tabs defaultValue="all" onValueChange={setSelectedTab}>
                  <div className="px-4 pt-4">
                    <TabsList className="w-full grid grid-cols-5">
                      <TabsTrigger 
                        value="all"
                        className="data-[state=active]:bg-avatar-100 data-[state=active]:text-avatar-900"
                      >
                        Todas
                      </TabsTrigger>
                      <TabsTrigger 
                        value="shirt"
                        className="data-[state=active]:bg-avatar-100 data-[state=active]:text-avatar-900"
                      >
                        Tops
                      </TabsTrigger>
                      <TabsTrigger 
                        value="pants"
                        className="data-[state=active]:bg-avatar-100 data-[state=active]:text-avatar-900"
                      >
                        Pants
                      </TabsTrigger>
                      <TabsTrigger 
                        value="shoes"
                        className="data-[state=active]:bg-avatar-100 data-[state=active]:text-avatar-900"
                      >
                        Shoes
                      </TabsTrigger>
                      <TabsTrigger 
                        value="glasses"
                        className="data-[state=active]:bg-avatar-100 data-[state=active]:text-avatar-900"
                      >
                        Accs
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="p-4">
                    <TabsContent value="all" className="mt-0">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-1">
                        {filteredItems.map((item) => (
                          <ClosetItem 
                            key={item.id} 
                            item={item} 
                            onClick={() => handleItemClick(item)}
                            isActive={activeOutfit.includes(item.id)}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    
                    {['shirt', 'pants', 'shoes', 'glasses'].map((category) => (
                      <TabsContent key={category} value={category} className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-1">
                          {filteredItems.map((item) => (
                            <ClosetItem 
                              key={item.id} 
                              item={item} 
                              onClick={() => handleItemClick(item)}
                              isActive={activeOutfit.includes(item.id)}
                            />
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              </div>

              <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Outfits Guardados</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3 max-h-[300px] overflow-y-auto p-1">
                    {savedOutfits.map((outfit) => (
                      <button
                        key={outfit.id}
                        className={`w-full p-4 rounded-lg border ${
                          activeOutfitName === outfit.name
                            ? 'border-avatar-500 bg-avatar-50'
                            : 'border-gray-200 hover:border-avatar-300 hover:bg-gray-50'
                        } transition-colors text-left`}
                        onClick={() => handleOutfitClick(outfit)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{outfit.name}</span>
                          <span className="text-sm text-gray-500">{outfit.items.length} prendas</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total: {savedOutfits.length} outfits</span>
                    <Button
                      variant="outline"
                      className="border-avatar-500 text-avatar-600"
                      onClick={handleSaveOutfit}
                    >
                      Guardar Actual
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{activeOutfitName}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600"
                    onClick={handleClearOutfit}
                  >
                    Limpiar
                  </Button>
                </div>
                <div className="p-6">
                  <AvatarPreview 
                    className="h-[500px] w-full bg-gradient-to-tr from-gray-50 to-avatar-50" 
                    outfitItems={activeOutfitCategories}
                    isRotating={true}
                  />
                </div>
                <div className="p-5 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">
                      {activeOutfit.length} {activeOutfit.length === 1 ? 'prenda seleccionada' : 'prendas seleccionadas'}
                    </p>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="border-avatar-500 text-avatar-600"
                        asChild
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">Ver en AR</a>
                      </Button>
                      <Button
                        className="bg-avatar-600 hover:bg-avatar-700"
                        asChild
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">Ver NFTs</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

interface ClosetItemProps {
  item: typeof closetItems[0];
  onClick: () => void;
  isActive: boolean;
}

const ClosetItem = ({ item, onClick, isActive }: ClosetItemProps) => {
  return (
    <button
      className={`group relative overflow-hidden rounded-lg border ${
        isActive ? 'border-avatar-500 ring-2 ring-avatar-200' : 'border-gray-200'
      } transition-all`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        
        {item.hasNFT && (
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs font-medium text-avatar-700 px-1.5 py-0.5 rounded-sm border border-avatar-200">
            NFT
          </div>
        )}
        
        {isActive && (
          <div className="absolute inset-0 bg-avatar-500/10 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-avatar-100 border border-avatar-500 flex items-center justify-center">
              <svg className="h-4 w-4 text-avatar-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-2 text-left">
        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
        <p className="text-xs text-gray-500 truncate">{item.brand}</p>
      </div>
    </button>
  );
};

export default Closet;
