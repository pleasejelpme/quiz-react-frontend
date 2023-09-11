import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const formatTime = (time) => {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time - minutes * 60)

  if (minutes <= 10) minutes = '0' + minutes
  if (seconds <= 10) seconds = '0' + seconds

  return `${minutes}:${seconds}`
}

export const Countdown = ({ seconds }) => {
  const [countdown, setCountdown] = useState(seconds)
  const timer = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    timer.current = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer.current)
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timer)
      console.log('timer ended')
      navigate('/')
    }
  }, [countdown])

  return (
    <h2>Time left: {formatTime(countdown)}</h2>
  )
}
