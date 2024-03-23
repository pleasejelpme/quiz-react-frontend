import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useQuizCompletionStore } from '../store/quizes'

const formatTime = (time) => {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time - minutes * 60)

  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds

  return `${minutes}:${seconds}`
}

export const Countdown = ({ seconds }) => {
  const [countdown, setCountdown] = useState(seconds)
  const timer = useRef()
  const navigate = useNavigate()

  const resetQuiz = useQuizCompletionStore(state => state.resetQuiz)
  const quizId = useQuizCompletionStore(state => state.quizId)

  useEffect(() => {
    timer.current = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer.current)
  }, [])

  const timeout = () => {
    toast.error('Time ended!', { icon: '⌛' })
    resetQuiz()
    navigate(`../quizes/${quizId}`)
  }

  const timerClassName = (countdown) => {
    return countdown > 30 ? 'text-primary' : 'text-danger'
  }

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timer.current)
      timeout()
    }
  }, [countdown])

  return (
    <div className='mb-5'>
      <h2>⌛ <span className={timerClassName(countdown)}>{formatTime(countdown)}</span></h2>
    </div>
  )
}
