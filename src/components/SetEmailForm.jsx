import { useAuthStore } from '../store/auth'
import { useAccountStore } from '../store/account'
import { setEmail } from '../api/authRequests'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'

export const SetEmailForm = () => {
  const password = useRef('')
  const newEmail = useRef('')
  const token = useAuthStore(state => state.accessToken)
  const userEmail = useAuthStore(state => state.userEmail)
  const setUserEmail = useAuthStore(state => state.setUserEmail)
  const clearOption = useAccountStore(state => state.clearOption)

  useEffect(() => {
    console.log(userEmail)
  }, [])

  const handleSetEmail = (e) => {
    e.preventDefault()
    if (userEmail === newEmail.current.value) {
      toast.error('this is your current email, try a new one')
      return
    }

    async function setEmailRequest (method) {
      const response = await setEmail(token, password.current.value, newEmail.current.value, method)
      console.log(response)
      if (response.success) {
        toast.success('Email updated successfully!', { icon: '✅' })
        setUserEmail(response.email)
        clearOption()
      } else {
        toast.error(response.error)
      }
    }

    userEmail ? setEmailRequest('PATCH') : setEmailRequest('PUT')
  }

  return (
    <>
      <div className='card-header'>
        <h3 className='card-title'>{userEmail || 'No email set'}</h3>
        <small className='text-muted'>In case that you forget your password, you can recover it with this email</small>
      </div>
      <form onSubmit={handleSetEmail}>
        <div className='card-body'>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='bi-key' />
            </span>
            <input
              className='form-control'
              placeholder='Password'
              type='password'
              name='password'
              id='password'
              ref={password}
            />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='bi-envelope-at' />
            </span>
            <input
              className='form-control'
              placeholder={userEmail ? 'New email' : 'email@example.com'}
              type='email'
              name='email'
              id='email'
              ref={newEmail}
            />
          </div>
        </div>

        <div className='card-footer'>
          <button className='btn btn-outline-danger me-3' type='button' onClick={() => clearOption()}>Go back</button>
          <button className='btn btn-outline-primary me-3' type='submit'>{userEmail ? 'Change email' : 'Set email'}</button>
        </div>
      </form>
    </>
  )
}
