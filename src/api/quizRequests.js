/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
import { ENDPOINT } from './endpoint'

export const getQuizes = async () => {
  const response = await fetch(`${ENDPOINT}/quizes/`)
  const data = await response.json()
  return data
}

export const getSpecificQuiz = async (id) => {
  const response = await fetch(`${ENDPOINT}/quizes/${id}`)
  const data = await response.json()
  return data
}

export const deleteQuiz = async (id, token) => {
  const response = await fetch(`${ENDPOINT}/quizes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(token)
    }
  })
  const data = await response.json()
  return data
}

export const createQuiz = async (token, quizInfo, questions) => {
  const response = await fetch(`${ENDPOINT}/quizes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(token)
    },
    body: JSON.stringify({
      'title': quizInfo.title,
      'topic': quizInfo.topic,
      'time_to_complete': quizInfo.timeToComplete,
      'required_score': quizInfo.requiredScore,
      'difficulty': quizInfo.difficulty,
      'questions': questions
    })
  })

  return response
}

export const addCompletedQuiz = async (token, quizId, score) => {
  const response = await fetch(`${ENDPOINT}/completed-quizes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(token)
    },
    body: JSON.stringify({
      'quiz': quizId,
      'score': score
    })
  })

  return response
}

export const getCompletedQuizes = async (token) => {
  const response = await fetch(`${ENDPOINT}/completed-quizes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(token)
    }
  })
  const data = await response.json()
  return data
}
