import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const AuthenticationForm = ({ children, cardTitle, footerText, linkTo }) => {
  return (
    <motion.div
      className='container d-flex justify-content-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className='card' data-bs-theme='dark' style={{ width: '500px' }}>
        <div className='card-header'>
          <h2 className='card-title'>{cardTitle}</h2>
        </div>

        <div className='card-body'>
          {children}
        </div>

        <div className='card-footer'>
          <span>{footerText} <Link to={`/${linkTo}`} className='text-primary'>{linkTo}</Link></span>
        </div>
      </div>
    </motion.div>
  )
}
