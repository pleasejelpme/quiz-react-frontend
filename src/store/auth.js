import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      loggedUser: '',
      accessToken: '',
      refreshToken: '',

      setLoggedUser: (username) => set({ loggedUser: username }),
      setAccessToken: (access) => set({ accessToken: access }),
      setRefreshToken: (refresh) => set({ refreshToken: refresh }),

      cleanTokens: () => set({
        loggedUser: '',
        accessToken: '',
        refreshToken: ''
      })
    }),
    {
      name: 'auth'
    }
  )
)
