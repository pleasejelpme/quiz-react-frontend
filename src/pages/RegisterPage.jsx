import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { registerUser } from '../api/authRequests'
import { useAuthStore } from '../store/auth'
import { AuthenticationForm } from '../components/AuthenticationForm'

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
        response.username && toast.error(response.username)
        response.password && response.password.map(error => toast.error(error))
      }
    }

    register()
  }

  return (
    <AuthenticationForm cardTitle='Register' footerText='Already have an account?' linkTo='login'>
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
    </AuthenticationForm>
  )
}
