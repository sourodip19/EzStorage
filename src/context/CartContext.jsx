import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const newCount = (prev[productId] || 0) - 1;
      if (newCount <= 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newCount };
    });
  };

  const getItemCount = (productId) => {
    return cartItems[productId] || 0;
  };

  const getTotalCount = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      getItemCount, 
      getTotalCount,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
