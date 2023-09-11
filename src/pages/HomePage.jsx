import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getQuizes } from '../api/quizRequests'
import { useQuizCompletionStore } from '../store/quizes'

export const HomePage = () => {
  const [quizes, setQuizes] = useState([])
  const clearQuizesState = useQuizCompletionStore(state => state.clearStates)

  useEffect(() => {
    async function fetchQuizes () {
      const quizesList = await getQuizes()
      setQuizes(quizesList)
      clearQuizesState()
    }
    fetchQuizes()
  }, [])

  return (
    <div className='container'>
      <div className='row d-flex align-items-center'>
        {
          quizes.map((quiz) => (
            <div className='col-xxl-4 col-lg-6 col-sm-12' key={quiz.id}>
              <Link to={`quizes/${quiz.id}`}>
                <div
                  className='card card-hover border mb-5 d-flex justify-content-center aling-items-center'
                  data-bs-theme='dark'
                  style={{ width: '400px', height: '250px', cursor: 'pointer' }}
                >
                  <h2 className='text-primary'>{quiz.title}</h2>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}
