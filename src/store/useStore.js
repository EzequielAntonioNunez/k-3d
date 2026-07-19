import { create } from 'zustand'

export const useStore = create((set) => ({
  activeSlide: 0,
  setActiveSlide: (index) => set({ activeSlide: index }),
}))
