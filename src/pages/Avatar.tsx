
import { PageLayout } from '@/components/layout/PageLayout';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Avatar = () => {
  const handleSaveAvatar = () => {
    toast.success("Avatar guardado correctamente", {
      description: "Tus medidas han sido actualizadas para una mejor experiencia de compra."
    });
  };

  return (
    <PageLayout>
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Personaliza tu Avatar
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Crea tu avatar 3D para probar ropa virtualmente y recibir recomendaciones personalizadas
            </p>
          </div>

          <AvatarCustomizer />

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <Button 
              className="w-full md:w-auto avatar-button" 
              onClick={handleSaveAvatar}
            >
              Guardar Avatar
            </Button>
            <Button 
              className="w-full md:w-auto avatar-button-outline"
              asChild
            >
              <Link to="/shop">Ir a la Tienda</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Beneficios de tu Avatar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-lg bg-avatar-100 flex items-center justify-center text-avatar-600 text-2xl mb-6">
                📏
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tallas Precisas</h3>
              <p className="text-gray-600">
                Recibe recomendaciones de tallas basadas en tus medidas exactas, reduciendo las devoluciones por tallas incorrectas.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-lg bg-avatar-100 flex items-center justify-center text-avatar-600 text-2xl mb-6">
                👚
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prueba Virtual</h3>
              <p className="text-gray-600">
                Visualiza cómo te queda cada prenda antes de comprarla, mejorando tu confianza al hacer compras online.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-lg bg-avatar-100 flex items-center justify-center text-avatar-600 text-2xl mb-6">
                🎨
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Combina Outfits</h3>
              <p className="text-gray-600">
                Crea y guarda conjuntos completos para ver cómo combinan diferentes prendas antes de añadirlas a tu carrito.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Integration */}
      <section className="py-16 bg-gradient-to-br from-avatar-900/90 to-avatar-700/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/10" aria-hidden="true"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex mb-5">
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                  Integración Web3
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Lleva tu ropa al metaverso
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Al conectar con tu billetera Web3, cada compra generará automáticamente un NFT que podrás utilizar en plataformas compatibles del metaverso.
              </p>
              <Button className="bg-white text-avatar-700 hover:bg-gray-100">
                Conectar Wallet
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/20 relative">
              <div className="aspect-video bg-gradient-to-tr from-avatar-600/50 to-avatar-400/50 backdrop-blur-sm flex items-center justify-center">
                <div className="w-60 h-60 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-6xl">🔮</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-avatar-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-medium">NFT de Camiseta Básica</p>
                <p className="text-white/70 text-sm">AVATAR Metaverse Collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Cuán preciso es el avatar 3D?",
                answer: "Nuestro avatar 3D está diseñado para reflejar tus medidas con alta precisión. Cuantos más detalles proporciones, más preciso será. Constantemente mejoramos nuestros algoritmos para garantizar la máxima exactitud."
              },
              {
                question: "¿Cómo funciona la prueba virtual de ropa?",
                answer: "Utilizamos tecnología avanzada de renderizado 3D para mostrar cómo se ajustaría cada prenda a tu avatar. El sistema considera tus medidas, la elasticidad de la tela y otros factores para una representación realista."
              },
              {
                question: "¿Qué datos almacenan sobre mi?",
                answer: "Almacenamos solo los datos necesarios para crear tu avatar: medidas corporales básicas y preferencias de estilo. Tus datos están seguros y puedes eliminarlos en cualquier momento desde tu perfil."
              },
              {
                question: "¿Qué beneficio tienen los NFTs de las prendas?",
                answer: "Los NFTs te permiten usar versiones digitales de tus prendas en plataformas compatibles del metaverso. También sirven como certificado de autenticidad y pueden tener valor en el mercado secundario."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Avatar;
