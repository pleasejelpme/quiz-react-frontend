import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { AccountInfo } from '../components/Accountinfo'
import { ChangePasswordForm } from '../components/ChangePasswordForm'
import { useChangePasswordStore, useAuthStore } from '../store/auth'
import { changePassword } from '../api/authRequests'

export const AccountPage = () => {
  const [form, setForm] = useState(false)

  const token = useAuthStore(state => state.accessToken)
  const oldPassword = useChangePasswordStore(state => state.oldPassword)
  const newPassword = useChangePasswordStore(state => state.newPassword)
  const newPassword2 = useChangePasswordStore(state => state.newPassword2)

  const handleChangePassword = async () => {
    const response = await changePassword(token, oldPassword, newPassword, newPassword2)
    if (response.status === 204) {
      toast.success(response.message, { icon: '🔑' })
      setForm(false)
    } else {
      response.error && toast.error(response.error)
      response.password && toast.error(response.password)
      response.new_password && response.new_password.map((error) => toast.error(error))
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 d-flex justify-content-center'>
          <div className='card border' data-bs-theme='dark' style={{ width: '500px' }}>
            {form === false &&
              <>
                <AccountInfo />
                <div className='card-footer'>
                  <button className='btn btn-outline-primary' onClick={() => setForm(true)}>Change password</button>
                </div>
              </>}

            {form &&
              <>
                <ChangePasswordForm />
                <div className='card-footer d-flex justify-content-around'>
                  <button className='btn btn-outline-danger' onClick={() => setForm(false)}>Go back</button>
                  <button className='btn btn-outline-primary' onClick={handleChangePassword}>Change Password</button>
                </div>
              </>}
          </div>
        </div>
      </div>
    </div>

  )
}
