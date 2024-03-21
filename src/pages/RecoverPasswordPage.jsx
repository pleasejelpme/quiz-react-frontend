import { AuthenticationForm } from '../components/AuthenticationForm'
import { recoverPasswordToken, resetPasswordWithToken } from '../api/authRequests'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const RecoverPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [confirmedEmail, setConfirmedEmail] = useState('')
  const email = useRef('')
  const password = useRef('')
  const password2 = useRef('')
  const token = useRef('')
  const navigate = useNavigate()

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault()

    if (password.current.value !== password2.current.value) {
      toast.error('Password are not the same')
      return
    }

    async function newPasswordWithToken () {
      const resetingPassword = toast.loading('Sending...')
      const response = await resetPasswordWithToken(password.current.value, token.current.value)
      if (response.status === 'OK') {
        toast.success('Password updated!', { id: resetingPassword, icon: '✅' })
        navigate('/login')
      } else {
        response.detail && toast.error('Invalid token', { id: resetingPassword })
        response.password && response.password.map(error => toast.error(error, { id: resetingPassword }))
      }
    }
    newPasswordWithToken()
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()

    async function requestToken () {
      const sendingEmail = toast.loading('Sending...')
      const response = await recoverPasswordToken(email.current.value)
      if (response.status === 'OK') {
        toast.success('email sent!', { id: sendingEmail, icon: '✅' })
        setConfirmedEmail(email.current.value)
        setEmailSent(true)
      } else {
        toast.error(response.email, { id: sendingEmail })
      }
    }
    requestToken()
  }

  return (
    <AuthenticationForm cardTitle='Recover password' footerText='go back to' linkTo='login'>
      {emailSent === true &&
        <>
          <form onSubmit={handleNewPasswordSubmit}>
            Set a new password with the code you received by email
            <div className='input-group mb-3 mt-3'>
              <span className='input-group-text'>
                <i className='bi-key' style={{ fontSize: '1.1rem' }} />
              </span>
              <div className='form-floating'>
                <input
                  className='form-control'
                  placeholder='Password'
                  type='password'
                  id='password'
                  ref={password}
                  required
                />
                <label htmlFor='password'>New password</label>
              </div>
            </div>
            <div className='input-group mb-4'>
              <span className='input-group-text'>
                <i className='bi-key' style={{ fontSize: '1.1rem' }} />
              </span>
              <div className='form-floating'>
                <input
                  className='form-control'
                  placeholder='confirm your new password'
                  type='password'
                  id='password2'
                  ref={password2}
                  required
                />
                <label htmlFor='password2'>Confirm your new password</label>
              </div>
            </div>
            <p>Enter the code sent to <span className='text-decoration-underline'>{confirmedEmail}</span></p>
            <div className='row d-flex justify-content-center mt-2 mb-2'>
              <div className='col-sm-5'>
                <div className='input-group'>
                  <input
                    className='form-control'
                    ref={token}
                    style={{ textAlign: 'center' }}
                  />
                </div>
              </div>
            </div>

            <button className='btn btn-outline-primary mt-2'>Submit</button>
          </form>
        </>}

      {emailSent === false &&
        <form onSubmit={handleEmailSubmit}>
          <div>
            Enter the email linked to your account
            <div className='input-group mb-3 mt-3'>
              <span className='input-group-text'>
                <i className='bi-envelope-at' style={{ fontSize: '1.1rem' }} />
              </span>
              <input
                className='form-control'
                placeholder='example@email.com'
                type='email'
                name='Email'
                ref={email}
                required
              />
            </div>
          </div>
          <button className='btn btn-outline-primary mt-2'>Recover password</button>
        </form>}
    </AuthenticationForm>
  )
}
