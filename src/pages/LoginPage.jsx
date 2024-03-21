/* eslint-disable no-undef */
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

import { useAuthStore } from '../store/auth'
import { loginUser } from '../api/authRequests'
import { AuthenticationForm } from '../components/AuthenticationForm'

export const LoginPage = () => {
  const setLoggedUser = useAuthStore(state => state.setLoggedUser)
  const setUserEmail = useAuthStore(state => state.setUserEmail)
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
        setLoggedUser(jwtDecode(userTokens.access).username)
        setUserEmail(jwtDecode(userTokens.access).email)

        setUsername('')
        setPassword('')
        toast.success(`Welcome ${username}!`, {
          icon: '👋'
        })
      } catch {
        toast.error('Username or password incorrect')
      }
    }

    login()
  }

  return (
    <AuthenticationForm cardTitle='Login' footerText='Dont have an account?' linkTo='register'>
      <form onSubmit={handleLogin}>

        <div>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='bi-person-circle' style={{ fontSize: '1.1rem' }} />
            </span>
            <input
              className='form-control'
              placeholder='Username'
              type='text'
              id='username'
              name='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='input-group mb-1'>
            <span className='input-group-text'>
              <i className='bi-key' style={{ fontSize: '1.1rem' }} />
            </span>
            <input
              className='form-control'
              placeholder='Password'
              type='password'
              id='password'
              name='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <small><Link to='/password-recover' className='text-secondary-emphasis text-decoration-underline'>forgot your password?</Link></small>
        </div>
        <button className='btn btn-outline-primary mt-2'>Login</button>
      </form>
    </AuthenticationForm>
  )
}
