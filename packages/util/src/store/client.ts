import { type StoreApi, type UseBoundStore, create } from "zustand";

export type GeneralStore = {
  count: number;
  setCount: (value: number) => void;
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
    window[STORE_KEY] = create<GeneralStore>((set) => ({
      count: 0,
      setCount: (value) => set((state) => ({ count: state.count + value })),
    }));
  }

  // Return the singleton instance from the window object
  return window[STORE_KEY];
})();
