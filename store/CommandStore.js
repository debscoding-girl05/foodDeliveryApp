import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCommandStore = create(
  persist(
    (set) => ({
      commands: [],
      PlusCommand: (order) =>
        set((state) => ({
          commands: [...state.commands, order],
        })),
      updateCommandStatus: (id, status) =>
        set((state) => ({
          commands: state.commands.map((command) =>
            command.id === id ? { ...command, status } : command
          ),
        })),
      clearCommand: () => set({ commands: [] }),
      deleteCommand: (comId) =>
        set((state) => ({
          commands: state.commands.filter((command) => command.id !== comId),
        })),
    }),
    {
      name: "command-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCommandStore;
