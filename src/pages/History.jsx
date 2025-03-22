
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Star, BarChart2, Filter, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample purchase history
const purchaseHistory = [
  {
    id: "HIST-001",
    date: "15/05/2023",
    item: "Camiseta Básica",
    brand: "AVATAR Basic",
    price: 29.99,
    category: "Ropa",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasNFT: true
  },
  {
    id: "HIST-002",
    date: "15/05/2023",
    item: "Jeans Slim Fit",
    brand: "AVATAR Denim",
    price: 69.99,
    category: "Ropa",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasNFT: false
  },
  {
    id: "HIST-003",
    date: "03/06/2023",
    item: "Sudadera con Capucha",
    brand: "AVATAR Comfort",
    price: 59.99,
    category: "Ropa",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasNFT: true
  },
  {
    id: "HIST-004",
    date: "03/06/2023",
    item: "Zapatillas Deportivas",
    brand: "AVATAR Sport",
    price: 79.99,
    category: "Calzado",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasNFT: true
  },
  {
    id: "HIST-005",
    date: "22/06/2023",
    item: "Chaqueta de Cuero",
    brand: "AVATAR Premium",
    price: 159.99,
    category: "Ropa",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasNFT: false
  },
  {
    id: "HIST-006",
    date: "10/07/2023",
    item: "Gafas de Sol Premium",
    brand: "AVATAR Eyewear",
    price: 99.99,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasNFT: true
  }
];

const categoryTotals = [
  { category: "Ropa", total: 319.96, count: 4 },
  { category: "Calzado", total: 79.99, count: 1 },
  { category: "Accesorios", total: 99.99, count: 1 }
];

const monthlySpending = [
  { month: "Ene", total: 0 },
  { month: "Feb", total: 0 },
  { month: "Mar", total: 0 },
  { month: "Abr", total: 0 },
  { month: "May", total: 99.98 },
  { month: "Jun", total: 299.97 },
  { month: "Jul", total: 99.99 },
  { month: "Ago", total: 0 },
  { month: "Sep", total: 0 },
  { month: "Oct", total: 0 },
  { month: "Nov", total: 0 },
  { month: "Dic", total: 0 }
];

const History = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredHistory = purchaseHistory.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate totals
  const totalItems = filteredHistory.length;
  const totalSpent = filteredHistory.reduce((sum, item) => sum + item.price, 0);
  const totalNFTs = filteredHistory.filter(item => item.hasNFT).length;

  return (
    <PageLayout>
      <section className="pt-12 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Historial de Compras</h1>
            <p className="text-lg text-gray-600">Revisa todas tus compras y analiza tus hábitos de consumo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-avatar-100 flex items-center justify-center mb-3">
                    <BarChart2 className="h-6 w-6 text-avatar-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{totalSpent.toFixed(2)} €</h3>
                  <p className="text-sm text-gray-500">Total gastado</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{totalItems}</h3>
                  <p className="text-sm text-gray-500">Artículos comprados</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{totalNFTs}</h3>
                  <p className="text-sm text-gray-500">NFTs coleccionados</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Análisis de compras</CardTitle>
              <CardDescription>Visualiza tus patrones de compra</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="spending" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="spending">Gasto Mensual</TabsTrigger>
                  <TabsTrigger value="categories">Por Categorías</TabsTrigger>
                </TabsList>
                
                <TabsContent value="spending" className="h-64">
                  <div className="h-full flex items-end justify-between px-4">
                    {monthlySpending.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-10 bg-avatar-500 rounded-t-sm"
                          style={{ 
                            height: `${Math.max(month.total / 3, 4)}px`, 
                            opacity: month.total ? 1 : 0.3
                          }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="categories" className="h-64">
                  <div className="grid grid-cols-3 gap-4 h-full">
                    {categoryTotals.map((cat, index) => (
                      <div key={index} className="flex flex-col justify-between bg-gray-50 rounded-lg p-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{cat.category}</h4>
                          <p className="text-2xl font-bold text-avatar-600 mt-1">{cat.total.toFixed(2)} €</p>
                        </div>
                        <p className="text-xs text-gray-500">{cat.count} {cat.count === 1 ? 'artículo' : 'artículos'}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Historial detallado</CardTitle>
                  <CardDescription>Todas tus compras en un solo lugar</CardDescription>
                </div>
                <div className="flex items-center mt-4 md:mt-0 space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar artículos..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-avatar-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-focus:block">
                      {/* Filter dropdown would go here */}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex overflow-x-auto pb-2 space-x-2">
                  <Button 
                    variant={selectedCategory === 'all' ? "default" : "outline"} 
                    size="sm"
                    className={selectedCategory === 'all' ? "bg-avatar-600 hover:bg-avatar-700" : ""}
                    onClick={() => handleCategoryChange('all')}
                  >
                    Todos
                  </Button>
                  <Button 
                    variant={selectedCategory === 'Ropa' ? "default" : "outline"} 
                    size="sm"
                    className={selectedCategory === 'Ropa' ? "bg-avatar-600 hover:bg-avatar-700" : ""}
                    onClick={() => handleCategoryChange('Ropa')}
                  >
                    Ropa
                  </Button>
                  <Button 
                    variant={selectedCategory === 'Calzado' ? "default" : "outline"} 
                    size="sm"
                    className={selectedCategory === 'Calzado' ? "bg-avatar-600 hover:bg-avatar-700" : ""}
                    onClick={() => handleCategoryChange('Calzado')}
                  >
                    Calzado
                  </Button>
                  <Button 
                    variant={selectedCategory === 'Accesorios' ? "default" : "outline"} 
                    size="sm"
                    className={selectedCategory === 'Accesorios' ? "bg-avatar-600 hover:bg-avatar-700" : ""}
                    onClick={() => handleCategoryChange('Accesorios')}
                  >
                    Accesorios
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.item} 
                          className="w-full h-full object-cover"
                        />
                        {item.hasNFT && (
                          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs font-medium text-avatar-700 px-1.5 py-0.5 rounded-sm border border-avatar-200">
                            NFT
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{item.item}</h3>
                            <p className="text-xs text-gray-500">{item.brand}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.price.toFixed(2)} €</span>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-500">{item.date}</span>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center">
                    <p className="text-gray-500">No se encontraron artículos que coincidan con tu búsqueda.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
};

export default History;
