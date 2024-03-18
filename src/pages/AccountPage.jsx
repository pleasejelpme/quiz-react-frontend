import { motion } from 'framer-motion'

import { AccountInfo } from '../components/Accountinfo'
import { ChangePasswordForm } from '../components/ChangePasswordForm'
import { SetEmailForm } from '../components/SetEmailForm'
import { AccountSettingsFooter } from '../components/AccountSettingsFooter'
import { useAccountStore } from '../store/account'
import { useEffect } from 'react'

export const AccountPage = () => {
  const accountOption = useAccountStore(state => state.option)
  useEffect(() => {
    console.log(accountOption)
  }, [])

  return (
    <motion.div
      className='container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className='row'>
        <div className='col-sm-12 d-flex justify-content-center'>
          <div className='card border' data-bs-theme='dark' style={{ width: '500px' }}>
            {!accountOption &&
              <>
                <AccountInfo />
                <AccountSettingsFooter />
              </>}

            {accountOption === 'changePassword' &&
              <>
                <ChangePasswordForm />
              </>}

            {accountOption === 'setEmail' &&
              <>
                <SetEmailForm />
              </>}

          </div>
        </div>
      </div>
    </motion.div>

  )
}
