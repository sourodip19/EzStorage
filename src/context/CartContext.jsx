import { createContext, useContext, useState } from 'react';
import { getTodayDate, getMinEndDate } from '../utils/dateCalculations';

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
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getMinEndDate(getTodayDate()));
  const [paymentOption, setPaymentOption] = useState('full');

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
    setStartDate(getTodayDate());
    setEndDate(getMinEndDate(getTodayDate()));
    setPaymentOption('full');
  };

  const updateStartDate = (date) => {
    setStartDate(date);
    const minEnd = getMinEndDate(date);
    if (endDate < minEnd) {
      setEndDate(minEnd);
    }
  };

  const updateEndDate = (date) => {
    setEndDate(date);
  };

  const updatePaymentOption = (option) => {
    setPaymentOption(option);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      getItemCount,
      getTotalCount,
      clearCart,
      startDate,
      endDate,
      paymentOption,
      updateStartDate,
      updateEndDate,
      updatePaymentOption
    }}>
      {children}
    </CartContext.Provider>
  );
};
