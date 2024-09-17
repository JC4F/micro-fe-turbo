import { create } from "zustand";

export type GeneralStore = {
  count: number;
  setCount: (value: number) => void;
};

export const useGeneralStore = create<GeneralStore>((set) => ({
  count: 0,
  setCount: (value) => set((state) => ({ count: state.count + value })),
}));
