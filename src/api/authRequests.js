import { ENDPOINT } from './endpoint'

export const registerUser = async (username, password, password2) => {
  const response = await fetch(`${ENDPOINT}/token/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      password2
    })
  })
  const data = await response.json()

  return response.status === 201 ? data : response
}

export const loginUser = async (username, password) => {
  const response = await fetch(`${ENDPOINT}/token/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  const data = await response.json()
  return data
}

export const refreshAuthTokens = async (refresh) => {
  const response = await fetch(`${ENDPOINT}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refresh
    })
  })

  const data = await response.json()
  return data
}
