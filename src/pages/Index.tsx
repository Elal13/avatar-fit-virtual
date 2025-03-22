
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AvatarPreview } from '@/components/avatar/AvatarPreview';
import { ProductCard } from '@/components/shop/ProductCard';

// Sample products data
const featuredProducts = [
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
  }
];

const features = [
  {
    title: 'Prueba Virtual',
    description: 'Prueba prendas virtualmente con tu avatar 3D personalizado, eliminando incertidumbres al comprar online.',
    icon: '👕',
  },
  {
    title: 'Integración Web3',
    description: 'Convierta sus compras en NFTs utilizables en el metaverso, integrando el mundo físico y virtual.',
    icon: '🔗',
  },
  {
    title: 'Medidas Precisas',
    description: 'Obtén recomendaciones de tallas basadas en tus medidas reales para evitar devoluciones.',
    icon: '📏',
  },
  {
    title: 'Armario Digital',
    description: 'Gestiona tu colección de ropa y crea outfits completos antes de comprar.',
    icon: '👔',
  }
];

const testimonials = [
  {
    quote: "La función de prueba virtual me ha ahorrado muchas devoluciones. ¡Ahora sé exactamente cómo me quedará la ropa antes de comprarla!",
    author: "Laura M.",
    role: "Cliente"
  },
  {
    quote: "Como pequeña boutique, AVATAR nos ha ayudado a llegar a clientes que nunca hubieran encontrado nuestra tienda físicamente.",
    author: "Carlos R.",
    role: "Vendedor"
  },
  {
    quote: "Los NFTs que generan por cada compra son increíbles. Uso la misma ropa en el mundo real y en el metaverso.",
    author: "Alex D.",
    role: "Cliente Web3"
  }
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-avatar-50">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 md:pt-32 md:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col animate-slide-up">
              <div className="inline-flex mb-5">
                <span className="bg-avatar-100 text-avatar-800 text-sm font-medium px-3 py-1 rounded-full">
                  El futuro de la moda está aquí
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Somos <span className="text-avatar-600">AVATAR</span>, tu probador virtual de ropa
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Prueba la ropa virtualmente con tu avatar 3D personalizado. Elimina las dudas y compra con confianza, en cualquier momento y lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="avatar-button text-lg py-6 shadow-md"
                  asChild
                >
                  <Link to="/avatar">Crear Mi Avatar</Link>
                </Button>
                <Button 
                  className="avatar-button-outline text-lg py-6"
                  asChild
                >
                  <Link to="/shop">Explorar Tienda</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-avatar-300 border-2 border-white flex items-center justify-center text-white font-medium">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Más de <span className="font-semibold text-gray-900">10,000</span> usuarios satisfechos</p>
              </div>
            </div>
            <div className="lg:h-[600px] animate-fade-in">
              <AvatarPreview 
                className="h-full w-full" 
                outfitItems={['shirt', 'pants', 'shoes', 'glasses']}
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Una nueva forma de comprar ropa
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AVATAR revoluciona tu experiencia de compra con tecnología 3D e integración web3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card p-6 flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-avatar-100 flex items-center justify-center text-3xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Productos destacados
              </h2>
              <p className="text-lg text-gray-600">
                Descubre las últimas tendencias con nuestra selección cuidadosamente curada
              </p>
            </div>
            <Link 
              to="/shop" 
              className="hidden md:block text-avatar-600 font-medium hover:text-avatar-700 transition-colors"
            >
              Ver todo →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline" className="border-avatar-500 text-avatar-600">
              <Link to="/shop">Ver todos los productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tres sencillos pasos para revolucionar tu experiencia de compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-avatar-100 flex items-center justify-center text-avatar-600 text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crea tu avatar</h3>
              <p className="text-gray-600">
                Genera un avatar 3D personalizado basado en tus medidas y características físicas reales.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-20 h-20 rounded-full bg-avatar-100 flex items-center justify-center text-avatar-600 text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prueba virtualmente</h3>
              <p className="text-gray-600">
                Visualiza cómo te quedará cada prenda en tu avatar antes de comprarla.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 rounded-full bg-avatar-100 flex items-center justify-center text-avatar-600 text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compra con confianza</h3>
              <p className="text-gray-600">
                Adquiere las prendas que te gustan y recibe un NFT por cada compra si estás conectado con Web3.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild className="avatar-button">
              <Link to="/avatar">Comenzar ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-avatar-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre por qué nuestros usuarios confían en AVATAR para sus compras de moda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className="w-5 h-5 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-800 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-avatar-600 to-avatar-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Revoluciona tu forma de comprar ropa
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Únete a AVATAR hoy y descubre una nueva experiencia de compra con tu avatar personalizado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-avatar-700 hover:bg-gray-100 text-lg py-6 px-8"
              asChild
            >
              <Link to="/avatar">Crear Mi Avatar</Link>
            </Button>
            <Button 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-lg py-6 px-8"
              asChild
            >
              <Link to="/shop">Explorar Tienda</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 mb-10">Confían en nosotros</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((brand) => (
              <div key={brand} className="flex items-center justify-center">
                <div className="h-8 w-32 rounded-md bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
