import { create } from 'zustand'

export const useAccountStore = create((set) => ({
  option: null,
  setOption: (newOption) => set(() => ({ option: newOption })),
  clearOption: () => set(() => ({ option: null }))
}))
