import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export const PrivateRoutes = () => {
  const user = useAuthStore(state => state.loggedUser)

  return (
    <>
      {user ? <Outlet /> : <Navigate to='/login' />}
    </>
  )
}

export const LoginRegisterRoutes = () => {
  const user = useAuthStore(state => state.loggedUser)

  return (
    <>
      {user ? <Navigate to='/' /> : <Outlet />}
    </>
  )
}
