import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
            <th>Total completions</th>
          </tr>
        </thead>

        <tbody>
          {completedQuizes.map((completion) => (
            <tr key={completion.quiz_id}>
              <td><Link to={`../quizes/${completion.quiz_id}`}>{completion.quiz_title}</Link></td>
              <td>{completion.best_score}</td>
              <td>{completion.completions}</td>
            </tr>
          ))}
        </tbody>
      </>
    )
  }

  return (
    <motion.div
      className='container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 col-sm-12'>
          <h2>Completed Quizes</h2>
          <table className='table table-dark table-hover mt-5'>
            {renderCompletedQuizes(completedQuizes)}
          </table>
        </div>

      </div>
    </motion.div>
  )
}
