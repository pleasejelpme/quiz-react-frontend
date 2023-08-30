import { useQuizStore } from '../store/quizes'
import Button from '@mui/material/Button'

export const GeneralInfoQuizForm = () => {
  const setQuizInfo = useQuizStore(state => state.setQuizInfo)
  const setQuizInfoSubmited = useQuizStore(state => state.setQuizInfoSubmited)

  const handleSubmitQuizInfo = (e) => {
    e.preventDefault()

    const title = e.target.title.value
    const topic = e.target.topic.value
    const timeToComplete = e.target.timeToComplete.value
    const requiredScore = e.target.requiredScore.value
    const difficulty = e.target.difficulty.value

    const newQuizInfo = { title, topic, timeToComplete, requiredScore, difficulty }
    setQuizInfo(newQuizInfo)
    setQuizInfoSubmited()
  }

  return (
    <>
      <h1>Quiz Info</h1>
      <p>Provide general info about the quiz</p>
      <form onSubmit={handleSubmitQuizInfo}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input type='text' id='title' name='title' required />
        </div>

        <div>
          <label htmlFor='topic'>Topic: </label>
          <input type='text' id='topic' name='topic' required />
        </div>

        <div>
          <label htmlFor='timeToComplete'>Time to complete in minutes: </label>
          <input type='number' id='timeToComplete' name='timeToComplete' min='1' max='60' required />
        </div>

        <div>
          <label htmlFor='requiredScore'>Required % score: </label>
          <input type='number' id='requiredScore' name='requiredScore' min='1' max='100' required />
        </div>

        <fieldset>
          <legend>Difficulty:</legend>

          <div>
            <input type='radio' id='easy' name='difficulty' value='easy' required />
            <label htmlFor='easy'>easy</label>
          </div>

          <div>
            <input type='radio' id='medium' name='difficulty' value='medium' required />
            <label htmlFor='medium'>medium</label>
          </div>

          <div>
            <input type='radio' id='hard' name='difficulty' value='hard' required />
            <label htmlFor='hard'>hard</label>
          </div>
        </fieldset>

        <Button variant='contained'>Go to questions</Button>
      </form>
    </>
  )
}
