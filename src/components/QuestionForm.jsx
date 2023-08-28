import { useState } from 'react'
import { useQuizStore } from '../store/quizes'

export const QuestionForm = () => {
  const [questionsTitles, setQuestionsTitles] = useState([])

  const setQuestions = useQuizStore(state => state.setQuestions)
  const questionsToFetch = useQuizStore(state => state.questions)
  const questionsCount = useQuizStore(state => state.questionsCount)
  const incrementQuestionsCount = useQuizStore(state => state.incrementQuestionsCount)

  const handleQuestionSubmit = (e) => {
    e.preventDefault()
    const questionTitle = e.target.question.value
    const answer1 = e.target.answer1.value
    const answer2 = e.target.answer2.value
    const answer3 = e.target.answer3.value
    const answer4 = e.target.answer4.value
    const correctOption = e.target.correctAnswer.value

    const answersList = [
      { text: answer1, correct: false },
      { text: answer2, correct: false },
      { text: answer3, correct: false },
      { text: answer4, correct: false }
    ]

    answersList[correctOption].correct = true

    if (questionsTitles.some(title => title === questionTitle)) {
      console.log('TITLE IN USE')
    } else {
      setQuestionsTitles([...questionsTitles, questionTitle])

      const newQuestion = { question: questionTitle, choices: answersList }
      setQuestions([...questionsToFetch, newQuestion])
      incrementQuestionsCount()
      e.target.reset()
      console.log(questionsCount)
    }
  }

  return (
    <>
      <h1>Questions</h1>
      <p>You must add a minimum of 3 questions</p>
      <form onSubmit={handleQuestionSubmit}>
        <div>
          <label htmlFor='question'>Question {questionsCount + 1}: </label>
          <input type='text' id='question' name='question' required />
        </div>

        <fieldset>
          <legend>Answers</legend>

          <div>
            <input type='text' name='answer1' required />
            <input type='radio' name='correctAnswer' value={0} required />
          </div>

          <div>
            <input type='text' name='answer2' required />
            <input type='radio' name='correctAnswer' value={1} required />
          </div>

          <div>
            <input type='text' name='answer3' required />
            <input type='radio' name='correctAnswer' value={2} required />
          </div>

          <div>
            <input type='text' name='answer4' required />
            <input type='radio' name='correctAnswer' value={3} required />
          </div>
        </fieldset>

        <button>Add question</button>
      </form>
    </>
  )
}
