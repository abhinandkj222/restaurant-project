import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === food.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (foodId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== foodId),
    );
  };

  const increaseQuantity = (foodId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === foodId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (foodId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === foodId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Clear cart after successful order
  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
