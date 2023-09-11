import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getQuizes } from '../api/quizRequests'
import { useQuizCompletionStore, useQuizSearch } from '../store/quizes'

export const HomePage = () => {
  const [quizes, setQuizes] = useState([])
  const clearQuizesState = useQuizCompletionStore(state => state.clearStates)
  const queryset = useQuizSearch(state => state.queryset)

  const getFilteredQuizes = (queryset, quizes) => {
    if (!queryset) return quizes
    const filtered = quizes.filter(quiz => quiz.title.toLowerCase().includes(queryset))
    return filtered.length > 0 ? filtered : null
  }

  const filteredQuizes = getFilteredQuizes(queryset, quizes)

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
        {filteredQuizes
          ? filteredQuizes.map((quiz) => (
            <div className='col-xxl-4 col-lg-6 col-sm-12 mb-5 d-flex justify-content-center' key={quiz.id}>
              <Link to={`quizes/${quiz.id}`}>
                <div
                  className='card quiz-cards card-hover border d-flex justify-content-center aling-items-center'
                  data-bs-theme='dark'
                  style={{ width: '400px', height: '250px', cursor: 'pointer' }}
                >
                  <h2 className='text-primary'>{quiz.title}</h2>
                </div>
              </Link>
            </div>
          ))
          : <h2>No quizes found! 😭</h2>}
      </div>
    </div>
  )
}
