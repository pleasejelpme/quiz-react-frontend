import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { QuizFormPage } from './pages/QuizFormPage'
import { Navigation } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { useAuthStore } from './store/auth'
import { useEffect } from 'react'
import { refreshAuthTokens } from './api/authRequests'

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
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/add-quiz' element={<QuizFormPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
