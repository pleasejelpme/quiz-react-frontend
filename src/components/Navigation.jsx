import { Link } from 'react-router-dom'

import { useAuthStore } from '../store/auth'
import { useQuizSearch } from '../store/quizes'

export const Navigation = () => {
  const username = useAuthStore(state => state.loggedUser)
  const logout = useAuthStore(state => state.cleanTokens)
  const setQueryset = useQuizSearch(state => state.setQueryset)

  const logoutUser = () => {
    logout()
  }

  const handleSearch = (queryset) => {
    setQueryset(queryset)
  }

  function renderLoggedUser () {
    return (
      <>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#menu'
          aria-controls='menu'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='menu'>
          <ul className='navbar-nav me-auto mb-3 mb-md-0'>
            <li className='nav-item'>
              <Link to='/add-quiz' className='nav-link'>Create quiz</Link>
            </li>
            <li className='nav-item'>
              <Link to='/completions' className='nav-link'>Completions</Link>
            </li>
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                Account
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <span className='dropdown-item disabled text-primary'>{username} 🧠</span>
                </li>
                <li>
                  <Link className='dropdown-item' to='/account'>Settings</Link>
                </li>
                <li>
                  <a
                    className='dropdown-item'
                    href=''
                    onClick={logoutUser}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className='d-flex w-sm-25' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search a quiz...'
              onChange={e => handleSearch(e.target.value.toLowerCase())}
            />
          </form>
        </div>
      </>
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
      <nav className='navbar navbar-expand-md mt-3 bg-dark border-bottom border-body' data-bs-theme='dark'>
        <Link to='/' className='navbar-brand mb-0 h1'>
          <i className='bi-book me-2 pt-5' style={{ fontSize: '1.5rem' }} />
          <span>QUIZ APP</span>
        </Link>

        {username
          ? renderLoggedUser()
          : renderAnonUser()}
      </nav>
    </div>
  )
}
