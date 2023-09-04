import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuizCompletionStore } from '../store/quizes'
import { useAuthStore } from '../store/auth'
import { addCompletedQuiz } from '../api/quizRequests'

export const QuizQuestion = () => {
  const [completed, setCompleted] = useState(null)
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)

  const quizId = useQuizCompletionStore(state => state.quizId)
  const quizInfo = useQuizCompletionStore(state => state.quizInfo)
  const questionStage = useQuizCompletionStore(state => state.questionStage)
  const questionChoices = useQuizCompletionStore(state => state.questionChoices)
  const setUserAnswers = useQuizCompletionStore(state => state.setUserAnswers)
  const incrementQuestionStage = useQuizCompletionStore(state => state.incrementQuestionStage)
  const questions = useQuizCompletionStore(state => state.questions)
  const userAnswers = useQuizCompletionStore(state => state.userAnswers)
  const userScore = useQuizCompletionStore(state => state.userScore)
  const setUserScore = useQuizCompletionStore(state => state.setUserScore)

  const token = useAuthStore(state => state.accessToken)

  const index = questionStage - 1
  const choices = questionChoices[index]
  const questionTitle = questions[index]

  const addCompletion = async (userScore) => {
    console.log('completion fetch')
    console.log(token)
    const response = await addCompletedQuiz(token, quizId, userScore)
    console.log(response)
  }

  const handleClickUserChoice = (choice) => () => {
    userAnswers.length < questionStage && setUserAnswers(choice)
    questionStage !== questions.length && incrementQuestionStage()
    questionStage === questions.length && setCompleted(true)
  }

  useEffect(() => {
    if (completed) {
      let numberOfCorrectAnswers = 0
      userAnswers.map(answer => answer === true && ++numberOfCorrectAnswers)
      const score = numberOfCorrectAnswers * 100 / userAnswers.length
      setUserScore(Math.round(score))
      setNumberOfCorrectAnswers(numberOfCorrectAnswers)
      addCompletion(Math.round(score))
    }
  }, [completed])

  return (
    <>
      {completed === null &&
        <>
          <h1>Question {questionStage}: {questionTitle}</h1>
          {choices.map((choice) => (
            <h3 key={choice.id} onClick={handleClickUserChoice(choice.correct)}>{choice.answer}</h3>
          ))}
        </>}

      {completed === true &&
        <>
          <h1>Quiz {quizInfo.title} completed!</h1>
          <p>Required score: {quizInfo.requiredScore}%</p>
          <p>Your score: {userScore}%</p>
          <p>You correct {numberOfCorrectAnswers} of {questions.length} questions</p>
          {userScore >= quizInfo.requiredScore
            ? <h2>Aproved!</h2>
            : <h2>Luck next time</h2>}
          <Link to='/'><button>Go back to quizes</button></Link>
        </>}
    </>
  )
}
