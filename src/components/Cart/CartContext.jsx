import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CartContext = createContext();

const initialState = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_TO_CART":
      const existingItem = state.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingItem) {
        return state.map((item) =>
          item.productId === existingItem.productId &&
          item.size === existingItem.size &&
          item.color === existingItem.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }

      return [...state, action.payload];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.productId !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size &&
        item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from Firestore on login
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        dispatch({ type: "SET_CART", payload: docSnap.data().items || [] });
      } else {
        console.log("No cart found for user");
      }
      setIsCartLoaded(true);
    });

    return () => {
      unsubscribe();
      setIsCartLoaded(false);
    };
  }, [user]);

  // Save cart to Firestore after it's loaded and on changes
  useEffect(() => {
    if (!user || !isCartLoaded) return;

    const cartRef = doc(db, "carts", user.uid);
    setDoc(cartRef, { items: cart });
  }, [cart, user, isCartLoaded]);

  // Cart actions
  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });

  const removeFromCart = (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

  const updateQuantity = (productId, size, color, quantity) =>
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, size, color, quantity },
    });

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
