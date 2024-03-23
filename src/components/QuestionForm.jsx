import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { useQuizStore } from '../store/quizes'

export const QuestionForm = () => {
  const [questionsTitles, setQuestionsTitles] = useState([])

  const setQuestions = useQuizStore(state => state.setQuestions)
  const questionsToFetch = useQuizStore(state => state.questions)
  const questionsCount = useQuizStore(state => state.questionsCount)
  const incrementQuestionsCount = useQuizStore(state => state.incrementQuestionsCount)

  const checkChoicesAreDifferent = (choices) => {
    return new Set(choices).size < choices.length
  }

  const handleQuestionSubmit = (e) => {
    e.preventDefault()
    const questionTitle = e.target.question.value
    const answer1 = e.target.answer1.value
    const answer2 = e.target.answer2.value
    const answer3 = e.target.answer3.value
    const answer4 = e.target.answer4.value
    const correctOption = e.target.correctAnswer.value

    if (checkChoicesAreDifferent([answer1, answer2, answer3, answer4]) === true) {
      toast.error('There are some choices that are the same!')
      return
    }

    if (questionsTitles.some(title => title === questionTitle)) {
      toast.error('You already added this question! Try a new one')
      return
    }

    const answersList = [
      { answer: answer1, correct: false },
      { answer: answer2, correct: false },
      { answer: answer3, correct: false },
      { answer: answer4, correct: false }
    ]

    answersList[correctOption].correct = true

    setQuestionsTitles([...questionsTitles, questionTitle])

    const newQuestion = { question: questionTitle, answers: answersList }
    setQuestions([...questionsToFetch, newQuestion])
    incrementQuestionsCount()
    e.target.reset()
    toast.success('Question added!', { icon: '📚' })
  }

  return (
    <>
      <div className='card-header mb-3'>
        <h1 className='card-title'>Questions</h1>
        <p>You must add a minimum of 3 questions</p>
      </div>

      <div className='card-body'>
        <form onSubmit={handleQuestionSubmit}>
          <div className='mb-3'>
            <label className='form-label' htmlFor='question'><h4>Question {questionsCount + 1}:</h4></label>
            <input className='form-control' type='text' id='question' name='question' required />
          </div>

          <fieldset>
            <legend>Choices</legend>

            <div className='row mb-3'>
              <div className='col-10'>
                <input className='form-control' type='text' name='answer1' required />
              </div>
              <div className='col d-flex align-items-center justify-content-center form-check'>
                <input className='form-check-input' type='radio' name='correctAnswer' value={0} required />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-10'>
                <input className='form-control' type='text' name='answer2' required />
              </div>
              <div className='col d-flex align-items-center justify-content-center form-check'>
                <input className='form-check-input' type='radio' name='correctAnswer' value={1} required />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-10'>
                <input className='form-control' type='text' name='answer3' required />
              </div>
              <div className='col d-flex align-items-center justify-content-center form-check'>
                <input className='form-check-input' type='radio' name='correctAnswer' value={2} required />
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-10'>
                <input className='form-control' type='text' name='answer4' required />
              </div>
              <div className='col d-flex align-items-center justify-content-center form-check'>
                <input className='form-check-input' type='radio' name='correctAnswer' value={3} required />
              </div>
            </div>
          </fieldset>

          <button className='btn btn-outline-primary mt-3'>Add question</button>
        </form>
      </div>

    </>
  )
}
