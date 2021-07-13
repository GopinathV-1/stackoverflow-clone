import React from 'react'

import styles from './team-list.module.css'

const TeamList = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default TeamList