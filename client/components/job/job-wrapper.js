import React from 'react'

import styles from './job-wrapper.module.css'

const JobWrapper = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default JobWrapper
