import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export const Navigation = () => {
  const username = useAuthStore(state => state.loggedUser)
  const logout = useAuthStore(state => state.cleanTokens)
  const logoutUser = () => {
    logout()
  }

  function renderLoggedUser () {
    return (
      <>
        <div>
          <Link to='/'><h1>QUIZ APP</h1></Link>
        </div>
        <button onClick={logoutUser}>logout</button>
        <Link to='/add-quiz'><button>Create quiz</button></Link>
      </>
    )
  }

  function renderAnonUser () {
    return (
      <>
        <Link to='/login'><button>Login</button></Link>
      </>
    )
  }

  return (
    <nav>
      {username && <h1>hello {username}</h1>}
      {username
        ? renderLoggedUser()
        : renderAnonUser()}
    </nav>
  )
}
