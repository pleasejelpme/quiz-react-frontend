import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getSpecificQuiz } from '../api/quizRequests'
import { useAuthStore } from '../store/auth'
import { useQuizCompletionStore } from '../store/quizes'
import { QuizQuestion } from '../components/QuizQuestion'

export const QuizDetailPage = () => {
  const [quiz, setQuiz] = useState([]) // state for the quiz fetched from the API
  const setQuizId = useQuizCompletionStore(state => state.setQuizId)
  const setQuizInfo = useQuizCompletionStore(state => state.setQuizInfo)
  const setQuestions = useQuizCompletionStore(state => state.setQuestions)
  const setQuestionChoices = useQuizCompletionStore(state => state.setQuestionChoices)
  const setCorrectAnswers = useQuizCompletionStore(state => state.setCorrectAnswers)

  const questionStage = useQuizCompletionStore(state => state.questionStage)
  const incrementStage = useQuizCompletionStore(state => state.incrementQuestionStage)

  const { quizId } = useParams()

  const loggedUser = useAuthStore(state => state.loggedUser)

  useEffect(() => {
    async function getQuiz (quizId) {
      const quizFetched = await getSpecificQuiz(quizId)
      const questions = quizFetched.questions

      setQuizInfo({
        id: quizFetched.id,
        title: quizFetched.title,
        creator: quizFetched.creator,
        difficulty: quizFetched.difficulty,
        requiredScore: quizFetched.required_score,
        timeToComplete: quizFetched.time_to_complete
      })
      setQuiz(quizFetched)
      setQuizId(quizFetched.id)
      setQuestions(questions.map(question => question.question))
      questions.map(question => setQuestionChoices(question.answers))
      setCorrectAnswers(questions.map(question => question.answers.findIndex(answer => answer.correct === true)))
    }

    getQuiz(quizId)
  }, [])

  const startQuiz = () => {
    incrementStage()
  }

  return (
    <div className='container d-flex justify-content-center'>
      {questionStage === 0 &&
        <div className='card border' style={{ maxWidth: '500px', minWidth: '500px' }} data-bs-theme='dark'>
          <div className='card-header text-white'>
            <h2>{quiz.title}</h2>
          </div>

          <div className='card-body text-white'>
            <p className='card-text'>Topic: <strong className='text-primary'>{quiz.topic}</strong></p>
            <p className='card-text'>Created by: <strong className='text-primary'>{quiz.creator === loggedUser ? 'You' : quiz.creator}</strong></p>
            <p className='card-text'>Difficulty: <strong className='text-primary'>{quiz.difficulty}</strong></p>
            <p className='card-text'>Time to complete: <strong className='text-primary'>{quiz.time_to_complete} minutes</strong></p>
            <p className='card-text'>Required score: <strong className='text-primary'>{quiz.required_score}%</strong></p>
            <p className='card-text'>Overall completions: <strong className='text-primary'>{quiz.times_completed}</strong></p>
            {loggedUser !== quiz.creator && <button className='btn btn-outline-primary' onClick={startQuiz}>START QUIZ</button>}
          </div>
        </div>}

      {questionStage !== 0 &&
        <QuizQuestion />}
    </div>
  )
}
