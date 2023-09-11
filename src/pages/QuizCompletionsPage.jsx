import { Link } from 'react-router-dom'
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

  const renderCompletedQuizes = (completedQuizes) => {
    return (
      <>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Best score</th>
          </tr>
        </thead>

        <tbody className='table-group-divider'>
          {completedQuizes.map((completion) => (
            <tr key={completion.quiz_id}>
              <td><Link to={`../quizes/${completion.quiz_id}`}>{completion.quiz_title}</Link></td>
              <td>{completion.best_score}</td>
            </tr>
          ))}
        </tbody>
      </>
    )
  }

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 col-sm-12'>
          <h2>Completed Quizes</h2>
          <table className='table table-dark mt-5'>
            {renderCompletedQuizes(completedQuizes)}
          </table>
        </div>

      </div>
    </div>
  )
}
