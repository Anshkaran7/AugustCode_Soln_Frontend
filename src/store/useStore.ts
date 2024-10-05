import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for the store
interface Store {
  token: string | null; // Token for authentication
  setToken: (token: string) => void;
  removeToken: () => void;
}

// Create the store using zustand's `persist` middleware
const useStore = create<Store>()(
  persist(
    (set) => ({
      token: null,

      // Set token function, also updates localStorage
      setToken: (token: string) => set(() => ({ token })),

      // Remove token function, also removes from localStorage
      removeToken: () => set(() => ({ token: null })),
    }),
    {
      name: "auth-token", // Name of the localStorage key
    }
  )
);

export default useStore;
