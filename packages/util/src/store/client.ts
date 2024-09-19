import { type StoreApi, type UseBoundStore, create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";

export type GeneralStore = {
  count: number;
  theme: Theme;
  setCount: (value: number) => void;
  setTheme: (theme: Theme) => void;
};

// Extend the Window interface to include the custom store key
declare global {
  interface Window {
    __useGeneralStore__: UseBoundStore<StoreApi<GeneralStore>> | undefined;
  }
}

const STORE_KEY = "__useGeneralStore__";

export const useGeneralStore = (() => {
  if (!window[STORE_KEY]) {
    // Create the store if it doesn't exist on the window object
    window[STORE_KEY] = create(
      persist(
        (set, get) => ({
          count: 0,
          theme: "system",
          setCount: (value) => set({ count: get().count + value }),
          setTheme: (theme: Theme) => set({ theme }),
        }),
        {
          name: "micro-store",
        }
      )
    );
  }

  // Return the singleton instance from the window object
  return window[STORE_KEY];
})();
