import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { getCompletedQuizes } from '../api/quizRequests'

export const QuizCompletionsPage = () => {
  const token = useAuthStore(state => state.accessToken)
  const [completedQuizes, setCompletedQuizes] = useState([])

  useEffect(() => {
    const fetchCompletedQuizes = async () => {
      const quizes = await getCompletedQuizes(token)
      setCompletedQuizes(quizes)
    }

    fetchCompletedQuizes()
  }, [])

  return (
    <>
      <h2>Completed Quizes</h2>
      {completedQuizes.map((completion) => (
        <button key={completion.id}>{completion.id} | {completion.score}</button>
      ))}
    </>
  )
}
