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
        <Link to='/'>QUIZ APP</Link>
        <p>hello {username}</p>

        <button onClick={logoutUser}>logout</button>
        <Link to='/add-quiz'><button>Create quiz</button></Link>
        <Link to='/completions'><button>Completions</button></Link>
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
    <div>
      {username
        ? renderLoggedUser()
        : renderAnonUser()}
    </div>
  )
}
