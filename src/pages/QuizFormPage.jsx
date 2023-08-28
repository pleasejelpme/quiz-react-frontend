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
    } catch {
      console.log('something went wrong')
    } finally {
      // restart all the quiz states
      resetQuiz()
    }
  }

  return (
    <>
      {quizInfoSubmited === false ? <GeneralInfoQuizForm /> : <QuestionForm />}
      {questionsCount >= 3 && <button onClick={handleQuizCreation}>Create quiz!</button>}
    </>
  )
}
