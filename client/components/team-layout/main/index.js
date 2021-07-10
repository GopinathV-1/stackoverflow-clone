import React from 'react'
import cn from 'classnames'

import styles from './main.module.css'

const TeamMain = ({ border = true, children }) => {
  return (
    <div className={cn(styles.main, border && styles.border)}>{children}</div>
  )
}

export default TeamMain
