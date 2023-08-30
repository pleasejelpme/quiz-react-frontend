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
    <>
      {
        quizes.map((quiz) => (
          <div className='quiz' key={quiz.id}>
            <Link to={`/quizes/${quiz.id}`}>{quiz.title}</Link>
          </div>
        ))
      }
    </>
  )
}
