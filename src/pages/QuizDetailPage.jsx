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
  // const decrementStage = useQuizCompletionStore(state => state.decrementQuestionStage)

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
    <>
      {questionStage === 0 &&
        <>
          <h2>{quiz.title}</h2>
          <small>{quiz.topic}</small>
          <p>Created by: <strong>{quiz.creator === loggedUser ? 'You' : quiz.creator}</strong></p>
          <p>Difficulty: <strong>{quiz.difficulty}</strong></p>
          <p>Time to complete: <strong>{quiz.time_to_complete} minutes</strong></p>
          <p>Required score: <strong>{quiz.required_score}%</strong></p>
          <p>Times completed successfully: <strong>{quiz.times_completed}</strong></p>
          {loggedUser !== quiz.creator && <button onClick={startQuiz}>START QUIZ</button>}
        </>}

      {questionStage !== 0 && <QuizQuestion />}
    </>
  )
}
