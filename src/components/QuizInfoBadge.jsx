export const QuizInfoBadge = ({ difficulty }) => {
  let color = ''

  if (difficulty === 'easy') {
    color = 'success'
  }

  if (difficulty === 'medium') {
    color = 'primary'
  }

  if (difficulty === 'hard') {
    color = 'danger'
  }

  const badgeClassname = `badge rounded-pill bg-${color}`
  return (
    <small><span className={badgeClassname}>{difficulty}</span></small>
  )
}
