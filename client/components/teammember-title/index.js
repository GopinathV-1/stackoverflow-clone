import React, { useContext } from 'react'
import cn from 'classnames'

import { AuthContext } from '../../store/auth'

import Button from '../button'
import ModalContext from '../../store/modal'

import styles from './teammember-title.module.css'

const PageTitle = ({ title, button, borderBottom = true, children }) => {
  const { isAuthenticated } = useContext(AuthContext)
  const { handleComponentVisible } = useContext(ModalContext)

  return (
    <div className={cn(styles.container, borderBottom && styles.borderBottom)}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <div className={styles.buttonContainer}>
          {button && (
            <Button
              className={styles.button}
              onClick={() => handleComponentVisible(true, 'add member')}
              primary
            >
              <span className={styles.icon}></span>
              <span className={styles.text}>Add member</span>
            </Button>
          )}
        </div>
      </div>
      {children && <p className={styles.summary}>{children}</p>}
    </div>
  )
}

export default PageTitle
