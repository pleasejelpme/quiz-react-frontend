import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useQuizCompletionStore } from '../store/quizes'
import { useAuthStore } from '../store/auth'
import { addCompletedQuiz } from '../api/quizRequests'
import { Countdown } from './Countdown'

export const QuizQuestion = () => {
  const [completed, setCompleted] = useState(null)
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)

  const quizId = useQuizCompletionStore(state => state.quizId)
  const quizInfo = useQuizCompletionStore(state => state.quizInfo)
  const questionStage = useQuizCompletionStore(state => state.questionStage)
  const questionChoices = useQuizCompletionStore(state => state.questionChoices)
  const setUserAnswers = useQuizCompletionStore(state => state.setUserAnswers)
  const incrementQuestionStage = useQuizCompletionStore(state => state.incrementQuestionStage)
  const setQuestionStage = useQuizCompletionStore(state => state.setQuestionStage)
  const questions = useQuizCompletionStore(state => state.questions)
  const userAnswers = useQuizCompletionStore(state => state.userAnswers)
  const userScore = useQuizCompletionStore(state => state.userScore)
  const setUserScore = useQuizCompletionStore(state => state.setUserScore)
  const clearUserAnswers = useQuizCompletionStore(state => state.clearUserAnswers)

  const token = useAuthStore(state => state.accessToken)

  const index = questionStage - 1
  const choices = questionChoices[index]
  const questionTitle = questions[index]

  const addCompletion = async (userScore) => {
    await addCompletedQuiz(token, quizId, userScore)
  }

  const handleClickUserChoice = (choice) => () => {
    userAnswers.length < questionStage && setUserAnswers(choice)
    questionStage !== questions.length && incrementQuestionStage()
    questionStage === questions.length && setCompleted(true)
  }

  const handleTryQuizAgain = () => {
    setCompleted(null)
    setQuestionStage(0)
  }

  useEffect(() => {
    const setScores = () => {
      let numberOfCorrectAnswers = 0
      userAnswers.map(answer => answer === true && ++numberOfCorrectAnswers)
      const score = numberOfCorrectAnswers * 100 / userAnswers.length
      setUserScore(Math.round(score))
      setNumberOfCorrectAnswers(numberOfCorrectAnswers)
      addCompletion(Math.round(score))
      clearUserAnswers()
    }
    completed && setScores()
  }, [completed])

  useEffect(() => {
    if (completed) {
      userScore >= quizInfo.requiredScore
        ? toast.success('Quiz aproved!', { icon: '🎉🎊', duration: 2000 })
        : toast.error('Not aproved, luck next time!', { icon: '😭', duration: 2000 })
    }
  }, [userScore])

  return (
    <div className='container d-flex justify-content-center'>
      {completed === null &&
        <>
          <Countdown seconds={quizInfo.timeToComplete * 60} />
          <div className='card border' style={{ maxWidth: '500px', minWidth: '500px' }} data-bs-theme='dark'>
            <div className='card-header'>
              <h2>Question {questionStage}: {questionTitle}</h2>
            </div>
            <ul className='list-group list-group-flush'>
              {choices.map((choice) => (
                <li
                  className='list-group-item list-group-item-action'
                  key={choice.id}
                  onClick={handleClickUserChoice(choice.correct)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{choice.answer}</h3>
                </li>
              ))}
            </ul>

          </div>
        </>}

      {completed === true &&
        <div className='card border' style={{ maxWidth: '500px', minWidth: '500px' }} data-bs-theme='dark'>
          <div className='card-header'>
            <h2>Quiz {quizInfo.title} completed!</h2>
          </div>
          <div className='card-body'>
            <p className='card-text'>Required score: <strong className='text-primary'>{quizInfo.requiredScore}%</strong></p>
            <p className='card-text'>Your score: <strong className='text-primary'>{userScore}%</strong></p>
            <p className='card-text'>You correct <strong className='text-primary'>{numberOfCorrectAnswers}</strong> of <strong className='text-primary'>{questions.length}</strong> questions</p>
            {userScore >= quizInfo.requiredScore
              ? <h4 className='text-success'>Aproved!</h4>
              : <h4 className='text-danger'>Luck next time</h4>}

            <div className='card-footer bg-dark pt-3 d-flex justify-content-around'>
              {userScore < quizInfo.requiredScore && <button className='btn btn-outline-primary' onClick={handleTryQuizAgain}>Try again</button>}
              <Link to='/'><button className='btn btn-outline-primary'>Go back Home</button></Link>
            </div>

          </div>

        </div>}
    </div>
  )
}
