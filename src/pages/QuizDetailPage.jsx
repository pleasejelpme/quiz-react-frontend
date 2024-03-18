import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

import { deleteQuiz, getSpecificQuiz } from '../api/quizRequests'
import { useAuthStore } from '../store/auth'
import { useQuizCompletionStore } from '../store/quizes'
import { QuizQuestion } from '../components/QuizQuestion'
import { DeleteQuizModal } from '../components/DeleteQuizModal'

export const QuizDetailPage = () => {
  const [quiz, setQuiz] = useState([]) // state for the quiz fetched from the API
  const [showModal, setShowModal] = useState(false)
  const [deleteQuizModal, setDeleteQuizModal] = useState(false)

  const navigate = useNavigate()
  const setQuizId = useQuizCompletionStore(state => state.setQuizId)
  const setQuizInfo = useQuizCompletionStore(state => state.setQuizInfo)
  const setQuestions = useQuizCompletionStore(state => state.setQuestions)
  const setQuestionChoices = useQuizCompletionStore(state => state.setQuestionChoices)
  const setCorrectAnswers = useQuizCompletionStore(state => state.setCorrectAnswers)

  const questionStage = useQuizCompletionStore(state => state.questionStage)
  const incrementStage = useQuizCompletionStore(state => state.incrementQuestionStage)

  const { quizId } = useParams()

  const loggedUser = useAuthStore(state => state.loggedUser)
  const userToken = useAuthStore(state => state.accessToken)

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

  useEffect(() => {
    console.log('useEffect triggered')
    console.log(deleteQuizModal)
    if (deleteQuizModal) {
      console.log(deleteQuizModal)
      deleteQuiz(quiz.id, userToken)
      toast.success('quest deleted successfully!', { icon: '✅' })
      navigate('/')
    }
  }, [deleteQuizModal])

  // Handles the click on the "start quiz" button, redirecting to login if there is no user logged
  const startQuiz = () => {
    if (loggedUser) {
      incrementStage()
    } else {
      toast('Please login or create an account to start quizzing!', {
        icon: '🔑'
      })
      navigate('/login')
    }
  }

  return (
    <>

      <motion.div
        className='container d-flex justify-content-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {questionStage === 0 &&
          <div className='card border' style={{ width: '30rem', height: 'auto' }} data-bs-theme='dark'>
            <div className='card-header text-light'>
              <h2>{quiz.title}</h2>
            </div>

            <div className='card-body text-white'>
              <p className='card-text'>Topic: <strong className='text-primary'>{quiz.topic}</strong></p>
              <p className='card-text'>Created by: <strong className='text-primary'>{quiz.creator === loggedUser ? 'You' : `@${quiz.creator}`}</strong></p>
              <p className='card-text'>Difficulty: <strong className='text-primary'>{quiz.difficulty}</strong></p>
              <p className='card-text'>Time to complete: <strong className='text-primary'>{quiz.time_to_complete} minutes</strong></p>
              <p className='card-text'>Required score: <strong className='text-primary'>{quiz.required_score}%</strong></p>
              <p className='card-text'>Overall completions: <strong className='text-primary'>{quiz.times_completed}</strong></p>

              {loggedUser !== quiz.creator && <button className='btn btn-outline-primary me-3' onClick={startQuiz}>START QUIZ</button>}

              {(loggedUser === quiz.creator || loggedUser === 'admin') &&
                <button
                  className='btn btn-outline-danger'
                  onClick={() => setShowModal(!showModal)}
                >Delete
                </button>}
            </div>
          </div>}

        {questionStage !== 0 &&
          <QuizQuestion />}
      </motion.div>

      {showModal &&
        <DeleteQuizModal
          quizTitle={quiz.title}
          showModal={showModal}
          setShowModal={setShowModal}
          setDeleteQuizModal={setDeleteQuizModal}
        />}
    </>
  )
}
