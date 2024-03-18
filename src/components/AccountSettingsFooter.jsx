import { useAuthStore } from '../store/auth'
import { useAccountStore } from '../store/account'

export const AccountSettingsFooter = () => {
  const userEmail = useAuthStore(state => state.userEmail)
  const setAccountOption = useAccountStore(state => state.setOption)

  return (
    <>
      <div className='card-footer d-flex justify-content-around'>
        <button className='btn btn-outline-primary me-3' onClick={() => setAccountOption('changePassword')}>Change password</button>
        <button className='btn btn-outline-primary' onClick={() => setAccountOption('setEmail')}>
          {userEmail ? 'Change email' : 'Set new email'}
        </button>
      </div>
    </>
  )
}
