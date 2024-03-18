import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      loggedUser: '',
      userEmail: '',
      accessToken: '',
      refreshToken: '',

      setLoggedUser: (username) => set({ loggedUser: username }),
      setUserEmail: (email) => set({ userEmail: email }),
      setAccessToken: (access) => set({ accessToken: access }),
      setRefreshToken: (refresh) => set({ refreshToken: refresh }),

      cleanTokens: () => set({
        loggedUser: '',
        userEmail: '',
        accessToken: '',
        refreshToken: ''
      })
    }),
    {
      name: 'auth'
    }
  )
)

export const useChangePasswordStore = create((set) => ({
  oldPassword: '',
  newPassword: '',
  newPasswpord2: '',

  setOldPassword: (psw) => set({ oldPassword: psw }),
  setNewPassword: (psw) => set({ newPassword: psw }),
  setNewPassword2: (psw) => set({ newPassword2: psw })
}))
