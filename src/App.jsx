import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { QuizFormPage } from './pages/QuizFormPage'
import { QuizDetailPage } from './pages/QuizDetailPage'
import { HomePage } from './pages/HomePage'
import { QuizCompletionsPage } from './pages/QuizCompletionsPage'

import { Navigation } from './components/Navigation'
import { useAuthStore } from './store/auth'
import { refreshAuthTokens } from './api/authRequests'
import { PrivateRoutes, LoginRegisterRoutes } from './utils/PrivateRoute'

function App () {
  const refreshToken = useAuthStore(state => state.refreshToken)
  const setRefreshToken = useAuthStore(state => state.setRefreshToken)
  const setAccessToken = useAuthStore(state => state.setAccessToken)

  // refresh jwt every 5 minutes
  useEffect(() => {
    const timeInterval = 1000 * 60 * 5
    const interval = setInterval(async () => {
      if (refreshToken) {
        const newTokens = await refreshAuthTokens(refreshToken)
        setAccessToken(newTokens.access)
        setRefreshToken(newTokens.refresh)
      }
    }, timeInterval)

    return () => clearInterval(interval)
  }, [refreshToken])

  return (
    <>
      {/* REACT HOT TOAST NOTIFICATIONS */}
      <Toaster
        toastOptions={{
          style: {
            background: '#343a40',
            color: '#fff'
          },
          error: {
            style: {
              border: '1px solid #dc3545'
            }
          },
          success: {
            style: {
              border: '1px solid #198754'
            }
          }
        }}
      />

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
          <Route path='/completions' element={<QuizCompletionsPage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
