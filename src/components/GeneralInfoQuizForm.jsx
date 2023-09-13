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
      <div className='card-header'>
        <h2 className='card-title mb-2'>Quiz Info</h2>
        <p>Provide general info about the quiz</p>
      </div>

      <div className='card-body'>
        <form onSubmit={handleSubmitQuizInfo}>
          <div className='input-group mb-3'>
            <label htmlFor='title' className='input-group-text' style={{ width: '70px' }}>Title: </label>
            <input type='text' id='title' name='title' className='form-control' placeholder='ex: Javascript fundamentals...' required />
          </div>

          <div className='input-group mb-3'>
            <label htmlFor='topic' className='input-group-text' style={{ width: '70px' }}>Topic: </label>
            <input type='text' id='topic' name='topic' className='form-control' placeholder='ex: Web development...' required />
          </div>

          <div className='row mb-3 d-flex align-items-center justify-content-around'>
            <div className='col-sm-5'>
              <div className='col-auto'>
                <label htmlFor='timeToComplete' className='form-label'>Time to complete in minutes: </label>
              </div>
              <div className='col-auto input-group'>
                <span className='input-group-text'>
                  <i className='bi-alarm' />
                </span>
                <input type='number' id='timeToComplete' name='timeToComplete' min='1' max='60' className='form-control' required />
              </div>
            </div>

            <div className='col-sm-5'>
              <div className='col-auto'>
                <label htmlFor='requiredScore' className='form-label'>Required % score: </label>
              </div>
              <div className='col-auto input-group'>
                <span className='input-group-text'>
                  <i className='bi-patch-check' />
                </span>
                <input type='number' id='requiredScore' name='requiredScore' min='1' max='100' className='form-control' required />
              </div>
            </div>
          </div>

          <div className='row d-flex justify-content-center mb-3'>
            <div className='col-sm-3'>
              <div className='form-check'>
                <input className='form-check-input' type='radio' id='easy' name='difficulty' value='easy' style={{ cursor: 'pointer' }} required />
                <label className='form-check-label' htmlFor='easy' style={{ cursor: 'pointer' }}>easy</label>
              </div>

              <div className='form-check'>
                <input className='form-check-input' type='radio' id='medium' name='difficulty' value='medium' style={{ cursor: 'pointer' }} required />
                <label className='form-check-label' htmlFor='medium' style={{ cursor: 'pointer' }}>medium</label>
              </div>

              <div className='form-check'>
                <input className='form-check-input' type='radio' id='hard' name='difficulty' value='hard' style={{ cursor: 'pointer' }} required />
                <label className='form-check-label' htmlFor='hard' style={{ cursor: 'pointer' }}>hard</label>
              </div>
            </div>

          </div>

          <button className='btn btn-outline-primary'>Go to questions</button>
        </form>
      </div>
    </>
  )
}
