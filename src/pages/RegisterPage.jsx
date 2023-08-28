import { registerUser } from '../api/authRequests'

export const RegisterPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const password2 = e.target.password2.value

    async function register () {
      const response = await registerUser(username, password, password2)
      console.log(response)
    }
    register()
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input type='text' id='username' name='username' />

        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' name='password' />

        <label htmlFor='password2'>Confirm password: </label>
        <input type='password' id='password2' name='password2' />

        <button>Register</button>
      </form>
    </section>
  )
}
