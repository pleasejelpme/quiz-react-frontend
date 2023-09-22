import { useAuthStore } from '../store/auth'

export const AccountInfo = () => {
  const user = useAuthStore(state => state.loggedUser)

  return (
    <>
      <div className='card-header'>
        <h2 className='card-title'>{user}</h2>
      </div>
      <div className='card-body'>
        <span style={{ fontSize: '30px' }}>🧠😎</span>
      </div>
    </>
  )
}
