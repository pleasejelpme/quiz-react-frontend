import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export const Navigation = () => {
  const username = useAuthStore(state => state.loggedUser)
  const logout = useAuthStore(state => state.cleanTokens)
  const logoutUser = () => {
    logout()
  }

  return (
    <nav>
      {username && <h1>hello {username}</h1>}
      {username ? <button onClick={logoutUser}>logout</button> : <Link><button>login</button></Link>}
    </nav>
  )
}
