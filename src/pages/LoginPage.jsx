/* eslint-disable no-undef */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import jwtDecode from 'jwt-decode'

import { useAuthStore } from '../store/auth'
import { loginUser } from '../api/authRequests'

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
        setLoggedUser(jwtDecode(userTokens.access).username)

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
    <motion.div
      className='container d-flex justify-content-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className='card' data-bs-theme='dark' style={{ width: '500px' }}>
        <div className='card-header'>
          <h2 className='card-title'>Login</h2>
        </div>

        <div className='card-body'>
          <form onSubmit={handleLogin}>

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

            <div className='input-group mb-3'>
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

            <button className='btn btn-outline-primary'>Login</button>
          </form>
        </div>

        <div className='card-footer'>
          <span>Dont have an account? <Link to='/register' className='text-primary'>register</Link></span>
        </div>
      </div>
    </motion.div>

  )
}
