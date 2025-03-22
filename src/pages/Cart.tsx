
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

// Sample cart items
const initialCartItems = [
  {
    id: '1',
    name: 'Camiseta Básica',
    brand: 'AVATAR Basic',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Camisetas',
    size: 'M',
    color: 'Blanco',
    quantity: 1,
    hasNFT: true
  },
  {
    id: '3',
    name: 'Zapatillas Deportivas',
    brand: 'AVATAR Sport',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Calzado',
    size: '42',
    color: 'Negro',
    quantity: 1,
    hasNFT: true
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Producto eliminado del carrito');
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'avatar10') {
      setIsPromoApplied(true);
      toast.success('Código de promoción aplicado: 10% de descuento');
    } else {
      toast.error('Código de promoción inválido');
    }
  };

  const handleCheckout = () => {
    toast.success('Procesando pago...', {
      description: 'Serás redirigido a la página de pago.'
    });
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate discount
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  
  // Calculate shipping
  const shipping = subtotal > 100 ? 0 : 9.99;
  
  // Calculate total
  const total = subtotal - discount + shipping;

  return (
    <PageLayout>
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Carrito de Compras
            </h1>
            <p className="text-lg text-gray-600">
              Revisa tus productos y completa tu compra
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Productos ({cartItems.length})</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-full sm:w-24 aspect-square rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                              <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                  Talla: {item.size}
                                </span>
                                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                  Color: {item.color}
                                </span>
                                {item.hasNFT && (
                                  <span className="text-xs px-2 py-1 bg-avatar-100 text-avatar-700 rounded-full">
                                    Incluye NFT
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-500">${item.price.toFixed(2)} por unidad</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button 
                                className="p-2 text-gray-500 hover:text-avatar-600 transition-colors"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 font-medium">{item.quantity}</span>
                              <button 
                                className="p-2 text-gray-500 hover:text-avatar-600 transition-colors"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button 
                              className="text-gray-500 hover:text-red-500 transition-colors"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <Link 
                        to="/shop" 
                        className="text-avatar-600 font-medium hover:text-avatar-700 transition-colors flex items-center gap-1"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" /> Continuar comprando
                      </Link>
                      <div className="text-right">
                        <p className="text-gray-700">Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span></p>
                        <p className="text-xs text-gray-500">No incluye envío ni impuestos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Resumen del Pedido</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {isPromoApplied && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>Descuento (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Envío</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span className="text-gray-900">Total</span>
                        <span className="text-avatar-900">${total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Incluye NFTs para los productos elegibles</p>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex mb-3">
                        <input
                          type="text"
                          placeholder="Código de promoción"
                          className="flex-grow rounded-l-lg border-gray-300 focus:border-avatar-500 focus:ring-avatar-500"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={isPromoApplied}
                        />
                        <button
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-r-lg font-medium border border-gray-300"
                          onClick={handleApplyPromo}
                          disabled={isPromoApplied || !promoCode}
                        >
                          Aplicar
                        </button>
                      </div>
                      
                      {isPromoApplied && (
                        <div className="text-sm text-green-600 mb-4">
                          ¡Código AVATAR10 aplicado con éxito!
                        </div>
                      )}
                      
                      <Button
                        className="w-full bg-avatar-600 hover:bg-avatar-700 font-medium py-6"
                        onClick={handleCheckout}
                      >
                        Proceder al Pago
                      </Button>
                      
                      <div className="flex items-center justify-center mt-4 gap-2">
                        <span className="text-xs text-gray-500">Pago seguro con</span>
                        <div className="flex space-x-2">
                          {['Visa', 'MC', 'PayPal', 'Web3'].map((method) => (
                            <div key={method} className="h-6 w-10 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-600">
                              {method}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-600 mb-6">
                Añade algunos productos para continuar con tu compra
              </p>
              <Button asChild className="avatar-button">
                <Link to="/shop">Explorar Tienda</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Cart;
