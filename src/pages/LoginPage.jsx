/* eslint-disable no-undef */
import { useState } from 'react'
import { useAuthStore } from '../store/auth'
import { loginUser } from '../api/authRequests'
import jwtDecode from 'jwt-decode'

export const LoginPage = () => {
  const setLoggedUser = useAuthStore(state => state.setLoggedUser)
  const setAccessToken = useAuthStore(state => state.setAccessToken)
  const setRefreshToken = useAuthStore(state => state.setRefreshToken)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    async function login () {
      try {
        const userTokens = await loginUser(username, password)
        setAccessToken(userTokens.access)
        setRefreshToken(userTokens.refresh)

        const loggedUser = jwtDecode(userTokens.access).username
        setLoggedUser(loggedUser)

        setUsername('')
        setPassword('')
      } catch (err) {
        console.error(err)
      }
    }

    login()
  }
  return (
    <section className='form' onSubmit={handleLogin}>
      <form>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            name='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            name='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Login</button>
      </form>
    </section>
  )
}
