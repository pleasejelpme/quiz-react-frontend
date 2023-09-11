import { useQuizStore } from '../store/quizes'

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

    setQuizInfo({ title, topic, timeToComplete, requiredScore, difficulty })
    setQuizInfoSubmited(true)
  }

  return (
    <>
      <h2>Quiz Info</h2>
      <p>Provide general info about the quiz</p>
      <form onSubmit={handleSubmitQuizInfo}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>Title: </label>
          <input type='text' id='title' name='title' className='form-control' required />
        </div>

        <div className='mb-3'>
          <label htmlFor='topic' className='form-label'>Topic: </label>
          <input type='text' id='topic' name='topic' className='form-control' required />
        </div>

        <div className='row mb-3 d-flex align-items-center justify-content-around'>
          <div className='col-auto'>
            <div className='col-auto'>
              <label htmlFor='timeToComplete' className='form-label'>Time to complete in minutes: </label>
            </div>
            <div className='col-auto'>
              <input type='number' id='timeToComplete' name='timeToComplete' min='1' max='60' className='form-control' required />
            </div>
          </div>

          <div className='col-auto'>
            <div className='col-auto'>
              <label htmlFor='requiredScore' className='form-label'>Required % score: </label>
            </div>
            <div className='col-auto'>
              <input type='number' id='requiredScore' name='requiredScore' min='1' max='100' className='form-control' required />
            </div>
          </div>
        </div>

        <div className='form-check'>
          <input className='form-ckeck-input' type='radio' id='easy' name='difficulty' value='easy' required />
          <label className='form-check-label' htmlFor='easy'>easy</label>
        </div>

        <div className='form-check'>
          <input className='form-ckeck-input' type='radio' id='medium' name='difficulty' value='medium' required />
          <label className='form-check-label' htmlFor='medium'>medium</label>
        </div>

        <div className='form-check'>
          <input className='form-ckeck-input' type='radio' id='hard' name='difficulty' value='hard' required />
          <label className='form-check-label' htmlFor='hard'>hard</label>
        </div>

        <button className='btn btn-outline-primary'>Go to questions</button>
      </form>
    </>
  )
}
