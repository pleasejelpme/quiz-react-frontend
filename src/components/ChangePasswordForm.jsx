import { useRef } from 'react'
import { toast } from 'react-hot-toast'

import { changePassword } from '../api/authRequests'
import { useAuthStore } from '../store/auth'
import { useAccountStore } from '../store/account'

export const ChangePasswordForm = () => {
  const token = useAuthStore(state => state.accessToken)
  const clearOption = useAccountStore(state => state.clearOption)
  const oldPassword = useRef('')
  const newPassword = useRef('')
  const newPassword2 = useRef('')

  const handleChangePassword = (e) => {
    e.preventDefault()
    async function changePass () {
      const response = await changePassword(
        token,
        oldPassword.current.value,
        newPassword.current.value,
        newPassword2.current.value)

      if (response.success) {
        toast.success(response.success, { icon: '🔑' })
        clearOption()
      } else {
        response.error && toast.error(response.error)
        response.password && toast.error(response.password)
        response.new_password && response.new_password.map((error) => toast.error(error))
      }
    }

    changePass()
  }

  return (
    <>
      <div className='card-header'>
        <h2 className='card-title'>Change password</h2>
      </div>
      <form onSubmit={handleChangePassword}>
        <div className='form-group'>
          <div className='card-body'>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='bi-key' />
              </span>
              <input
                required
                className='form-control'
                placeholder='Current password'
                type='password'
                name='oldPassword'
                id='oldPassword'
                ref={oldPassword}
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='bi-key-fill' />
              </span>
              <input
                required
                className='form-control'
                placeholder='New password'
                type='password'
                name='newPassword'
                id='newPassword'
                ref={newPassword}
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <i className='bi-key-fill' />
              </span>
              <input
                required
                className='form-control'
                placeholder='Confirm new password'
                type='password'
                name='newPassword2'
                id='newPassword2'
                ref={newPassword2}
              />
            </div>

          </div>
          <div className='card-footer'>
            <button className='btn btn-outline-danger me-3' type='button' onClick={() => clearOption()}>Go back</button>
            <button className='btn btn-outline-primary me-3' type='submit'>Change password</button>
          </div>
        </div>
      </form>
    </>
  )
}
