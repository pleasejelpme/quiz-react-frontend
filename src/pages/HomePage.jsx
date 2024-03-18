import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { getQuizes } from '../api/quizRequests'
import { useQuizCompletionStore, useQuizSearch } from '../store/quizes'
import { QuizInfoBadge } from '../components/QuizInfoBadge'

export const HomePage = () => {
  const [quizes, setQuizes] = useState([])
  const clearQuizesState = useQuizCompletionStore(state => state.clearStates)
  const queryset = useQuizSearch(state => state.queryset)

  const getFilteredQuizes = (queryset, quizes) => {
    if (!queryset) return quizes
    const filtered = quizes.filter(quiz => quiz.title.toLowerCase().includes(queryset))
    return filtered.length > 0 ? filtered : null
  }

  const quizDifficultyColor = (difficulty) => {
    if (difficulty === 'easy') return 'drop-shadow(0 0 0.2rem #07a316)'
    if (difficulty === 'medium') return 'drop-shadow(0 0 0.2rem #0d6efd)'
    if (difficulty === 'hard') return 'drop-shadow(0 0 0.2rem #c90e0e)'
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
    <motion.div
      className='container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className='row d-flex align-items-center'>
        {filteredQuizes
          ? filteredQuizes.map((quiz) => (
            <div className='col-xxl-4 col-lg-6 col-sm-12 mb-5 d-flex justify-content-center' key={quiz.id}>
              <Link to={`quizes/${quiz.id}`}>
                <div
                  className='card quiz-cards card-hover border d-flex justify-content-center aling-items-center'
                  data-bs-theme='dark'
                  style={{
                    width: '20rem',
                    height: '15rem',
                    cursor: 'pointer',
                    filter: quizDifficultyColor(quiz.difficulty)
                  }}
                >
                  <div className='card-text'>
                    <h2 className='text-light'>{quiz.title}</h2>
                    <QuizInfoBadge difficulty={quiz.difficulty} />
                    <small>
                      <span className='badge rounded-pill bg-secondary ms-1'><i className='bi bi-stopwatch me-1' />{quiz.time_to_complete} minutes</span>
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))
          : <h2>No quizes found! 😭</h2>}
      </div>
    </motion.div>
  )
}
