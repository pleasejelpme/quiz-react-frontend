import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { QuizFormPage } from './pages/QuizFormPage'
import { QuizDetailPage } from './pages/QuizDetailPage'
import { HomePage } from './pages/HomePage'

import { Navigation } from './components/Navigation'
import { useAuthStore } from './store/auth'
import { refreshAuthTokens } from './api/authRequests'
import { PrivateRoutes, LoginRegisterRoutes } from './utils/PrivateRoute'

function App () {
  const refreshToken = useAuthStore(state => state.refreshToken)
  const setRefreshToken = useAuthStore(state => state.setRefreshToken)
  const setAccessToken = useAuthStore(state => state.setAccessToken)

  // refresh jwt every minute
  useEffect(() => {
    const timeInterval = 1000 * 60 * 5
    const interval = setInterval(async () => {
      if (refreshToken) {
        const newTokens = await refreshAuthTokens(refreshToken)
        console.log(newTokens)
        setAccessToken(newTokens.access)
        setRefreshToken(newTokens.refresh)
      }
    }, timeInterval)

    return () => clearInterval(interval)
  }, [refreshToken])

  return (
    <>
      <Navigation />
      <Routes>
        {/* PROTECT LOGIN/REGISTER FROM USERS THAT ARE ALREADY LOGGED IN */}
        <Route element={<LoginRegisterRoutes />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<PrivateRoutes />}>
          <Route path='/quizes/:quizId' element={<QuizDetailPage />} />
          <Route path='/add-quiz' element={<QuizFormPage />} />
          <Route path='/' element={<HomePage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
