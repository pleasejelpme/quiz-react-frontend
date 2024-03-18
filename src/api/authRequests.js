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
  return [response.status, data]
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

export const changePassword = async (token, oldPassword, newPassword, newPassword2) => {
  const response = await fetch(`${ENDPOINT}/change-password/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(token)
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
      new_password2: newPassword2
    })
  })

  const data = await response.json()
  console.log('status: ', data)
  return data
}

export const setEmail = async (token, password, email, requestMethod) => {
  const response = await fetch(`${ENDPOINT}/set-email/`, {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(token)
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await response.json()
  return data
}
