
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Initialize cart from local storage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        setCartCount(parsedCart.reduce((total, item) => total + item.quantity, 0));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Product already in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        toast.success(`${product.name} actualizado en el carrito`, {
          position: "bottom-right"
        });
        return updatedItems;
      } else {
        // Add new product to cart
        toast.success(`${product.name} añadido al carrito`, {
          position: "bottom-right"
        });
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const productToRemove = prevItems.find(item => item.id === productId);
      if (productToRemove) {
        toast.success(`${productToRemove.name} eliminado del carrito`, {
          position: "bottom-right"
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Carrito vaciado", {
      position: "bottom-right"
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount, 
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
