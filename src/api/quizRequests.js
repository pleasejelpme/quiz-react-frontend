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

export const createQuiz = async (token, quizInfo) => {
  console.log(quizInfo)
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
      'difficulty': quizInfo.difficulty
    })
  })

  const data = await response.json()
  return [data, response]
}

export const addQuestionToQuiz = async (token, quizId, question) => {
  console.log(question)
  const response = await fetch(`${ENDPOINT}/questions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(token)
    },
    body: JSON.stringify({
      'quiz': quizId,
      question
    })
  })
  const data = await response.json()
  return [data, response]
}

export const addAnswerToQuiz = async (token, questionId, choice, isCorrect) => {
  await fetch(`${ENDPOINT}/answers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(token)
    },
    body: JSON.stringify({
      'question': questionId,
      'answer': choice,
      'correct': isCorrect
    })
  })
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

  const data = await response.json()
  return data
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
  console.log(data)
  return data
}
