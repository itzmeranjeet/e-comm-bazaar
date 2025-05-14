import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CartContext = createContext();

const initialState = [];

const cartReducer = (state, action) => {
  if (action.type === "SET_CART") {
    return action.payload;
  } else if (action.type === "ADD_TO_CART") {
    const existingItem = state.find(
      (item) =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size &&
        item.color === action.payload.color
    );

    // console.log("EXISTING ITEM", existingItem);

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
  } else if (action.type === "REMOVE_FROM_CART") {
    const updatedCart = state.filter(
      (item) => item.productId !== action.payload
    );
    // console.log("REMOVE_FROM_CART", updatedCart);
    return updatedCart;
  } else if (action.type === "UPDATE_QUANTITY") {
    const updatedQuantity = state.map((item) =>
      item.productId === action.payload.productId &&
      item.size === action.payload.size &&
      item.color === action.payload.color
        ? { ...item, quantity: action.payload.quantity }
        : item
    );
    // console.log("UPDATE_QUANTITY", updatedQuantity);
    return updatedQuantity;
  } else {
    // console.log("DEFAULT STATE", state);
    return state;
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  console.log("user", user);
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  // console.log({ cart: cart, dispatch: dispatch });
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // cart load from firestore
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);
    console.log("cartRef", cartRef);

    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        dispatch({ type: "SET_CART", payload: docSnap.data().items || [] });
      } else {
        console.log("No cart found for user");
      }
      setIsCartLoaded(true);
    });

    console.log("unsubscribe", unsubscribe);

    return () => {
      unsubscribe();
      setIsCartLoaded(false);
    };
  }, [user]);

  // Save cart to firestore
  useEffect(() => {
    if (!user || !isCartLoaded) return;

    const cartRef = doc(db, "carts", user.uid);
    console.log("useEffect cartRef", cartRef);
    setDoc(cartRef, { items: cart });
  }, [cart, user, isCartLoaded]);

  // Cart actions function
  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });

  console.log({ addToCart: addToCart });

  const removeFromCart = (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

  console.log({ removeFromCart: removeFromCart });

  const updateQuantity = (productId, size, color, quantity) =>
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, size, color, quantity },
    });

  console.log({ updateQuantity: updateQuantity });

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log({ getTotal: getTotal });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
