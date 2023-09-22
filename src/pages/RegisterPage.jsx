import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

import { registerUser } from '../api/authRequests'
import { useAuthStore } from '../store/auth'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const setLoggedUser = useAuthStore(state => state.setLoggedUser)
  const setAccessToken = useAuthStore(state => state.setAccessToken)
  const setRefreshToken = useAuthStore(state => state.setRefreshToken)

  const handleRegister = (e) => {
    e.preventDefault()

    async function register () {
      const [statusCode, response] = await registerUser(username, password, password2)

      if (statusCode === 201) {
        setLoggedUser(response.username)
        setAccessToken(response.tokens.access)
        setRefreshToken(response.tokens.refresh)
        toast.success(`Welcome ${response.username}!`, { icon: '👋' })
      } else {
        console.log(response)
        response.username && toast.error(response.username)
        response.password && response.password.map(error => toast.error(error))
      }
    }

    register()
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
          <h2 className='card-title'>Register</h2>
        </div>
        <div className='card-body'>
          <form onSubmit={handleRegister}>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='bi-person-circle' />
              </span>
              <input
                className='form-control'
                placeholder='Username'
                type='text'
                id='username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='bi-key' />
              </span>
              <input
                className='form-control'
                placeholder='Password'
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='bi-key' />
              </span>
              <input
                className='form-control'
                placeholder='Confirm password'
                type='password'
                id='password2'
                name='password2'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            <button className='btn btn-outline-primary'>Register</button>
          </form>
        </div>

        <div className='card-footer'>
          <span>Already have an account? <Link to='/login' className='text-primary'>login</Link></span>
        </div>

      </div>
    </motion.div>
  )
}
