import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

import { useQuizStore } from '../store/quizes'
import { useAuthStore } from '../store/auth'
import { GeneralInfoQuizForm } from '../components/GeneralInfoQuizForm'
import { QuestionForm } from '../components/QuestionForm'
import { createQuiz, addQuestionToQuiz, addAnswerToQuiz } from '../api/quizRequests'

export const QuizFormPage = () => {
  const quizInfoSubmited = useQuizStore(state => state.quizInfoSubmited)
  const questionsCount = useQuizStore(state => state.questionsCount)
  const quizInfo = useQuizStore(state => state.quizInfo)
  const questions = useQuizStore(state => state.questions)
  const resetQuiz = useQuizStore(state => state.resetQuiz)

  const token = useAuthStore(state => state.accessToken)

  const navigate = useNavigate()

  const handleQuizCreation = async () => {
    // fetch all the data to the API
    try {
      const [quizCreated, response] = await createQuiz(token, quizInfo)
      if (response.status === 201) {
        for (const question of questions) {
          const questionTitle = question.question
          const choices = question.choices
          const [questionCreated, response] = await addQuestionToQuiz(token, quizCreated.id, questionTitle)
          if (response.status === 201) {
            for (const choice of choices) {
              const choiceText = choice.text
              const isCorrect = choice.correct
              await addAnswerToQuiz(token, questionCreated.id, choiceText, isCorrect)
            }
          }
        }
      }
      // restart all the quiz states
      resetQuiz()
      toast.success('Quiz created successfully!')
      navigate('/')
    } catch {
      console.log('something went wrong')
    } finally {
      // restart all the quiz states
      resetQuiz()
    }
  }

  return (
    <motion.div
      className='container'
      style={{ maxWidth: '600px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className='card border' data-bs-theme='dark'>
        {quizInfoSubmited === false ? <GeneralInfoQuizForm /> : <QuestionForm />}
        {questionsCount >= 3 &&
          <div className='card-footer mt-3 pt-4'>
            <button className='btn btn-outline-success mb-3' onClick={handleQuizCreation}>Create quiz!</button>
          </div>}
      </div>
    </motion.div>
  )
}
