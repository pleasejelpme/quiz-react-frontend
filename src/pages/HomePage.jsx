import { useEffect, useState } from 'react'
import { getQuizes } from '../api/quizRequests'

export const HomePage = () => {
  const [quizes, setQuizes] = useState([])

  useEffect(() => {
    async function fetchQuizes () {
      const quizesList = await getQuizes()
      setQuizes(quizesList)
    }
    fetchQuizes()
  }, [])

  return (
    <>
      {
        quizes.map((quiz) => (
          <div className='quiz' key={quiz}>
            {quiz.title}
          </div>
        ))
      }
    </>
  )
}
