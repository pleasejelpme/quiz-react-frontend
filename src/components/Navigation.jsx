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
      <div className='d-flex justify-content-between'>
        <div>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to='/add-quiz' className='nav-link'>Create quiz</Link>
            </li>
            <li className='nav-item'>
              <Link to='/completions' className='nav-link'>Completions</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  function renderAnonUser () {
    return (
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link to='/login' className='nav-link'>Login</Link>
        </li>
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>Register</Link>
        </li>
      </ul>
    )
  }

  return (
    <div className='container mb-5'>
      <nav className='navbar navbar-expand-lg mt-3 bg-dark border-bottom border-body' data-bs-theme='dark'>
        <div className='container-fluid d-flex'>
          <Link to='/' className='navbar-brand mb-0 h1'>QUIZ APP</Link>
          <div className='collapse navbar-collapse'>
            {username
              ? renderLoggedUser()
              : renderAnonUser()}
          </div>
          {username &&
            <div>
              <ul className='navbar-nav'>
                <li className='navbar-item'>
                  <form className='d-flex' role='search'>
                    <input className='form-control me-2' type='search' placeholder='Search a quiz...' />
                  </form>
                </li>
                <li className='navbar-item'>
                  <button className='btn btn-outline-danger' onClick={logoutUser}>logout</button>
                </li>
              </ul>

            </div>}
        </div>
      </nav>
    </div>
  )
}
