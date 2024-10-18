import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dishes } from "../data/dishesData";

const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (dishId) => {
        set((state) => {
          if (state.favorites.includes(dishId)) {
            return { favorites: state.favorites.filter((id) => id !== dishId) };
          } else {
            return { favorites: [...state.favorites, dishId] };
          }
        });
      },
      deleteFavorite: (dishId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== dishId),
        })),
      clearFavorite: () => set({ favorites: [] }),
    }),

    {
      name: "favorite-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useFavoriteStore;