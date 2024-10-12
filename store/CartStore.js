import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dishes } from "../data/dishesData";


const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (dish, quantity) => {
        set((state) => {
          const existingDish = state.cartItems.find(
            (item) => item.id === dish.id
          );
          if (existingDish) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === dish.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...dish, quantity }], // Add dish with specified quantity
            };
          }
        });
      },
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),

      increaseQty: (id) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decreaseQty: (id) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item.quantity > 1) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              ),
            };
          }
          return state;
        });
      },
    }),

    {
      name: "cart-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export default useCartStore;