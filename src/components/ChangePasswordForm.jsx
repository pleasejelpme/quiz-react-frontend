import { useChangePasswordStore } from '../store/auth'

export const ChangePasswordForm = () => {
  const setOldPassword = useChangePasswordStore(state => state.setOldPassword)
  const setNewPassword = useChangePasswordStore(state => state.setNewPassword)
  const setNewPassword2 = useChangePasswordStore(state => state.setNewPassword2)

  return (
    <>
      <div className='card-header'>
        <h2 className='card-title'>Change password</h2>
      </div>

      <div className='card-body'>
        <form>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='bi-key' />
            </span>
            <input
              className='form-control'
              placeholder='Current password'
              type='password'
              name='oldPassword'
              id='oldPassword'
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='bi-key-fill' />
            </span>
            <input
              className='form-control'
              placeholder='New password'
              type='password'
              name='newPassword'
              id='newPassword'
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <i className='bi-key-fill' />
            </span>
            <input
              className='form-control'
              placeholder='Confirm new password'
              type='password'
              name='newPassword2'
              id='newPassword2'
              onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  )
}
