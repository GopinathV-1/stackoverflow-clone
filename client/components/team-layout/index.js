import React from 'react'
import cn from 'classnames'

import CONST from '../../constants'
import useWindowSize from '../../hooks/useWindowSize'

import Sidebar from './sidebar'
import TeamMain from './main'
import Extra from './extra'
import Header from './header'

import styles from './team-layout.module.css'

const TeamLayout = ({ extra = true, children }) => {
  const size = useWindowSize()
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <div className={cn(styles.body, !extra && styles.main)}>
          {size.width > CONST.MOBILE_SIZE && <Sidebar />}
          <TeamMain>{children}</TeamMain>
          {size.width > CONST.TABLET_SIZE && extra && <Extra />}
        </div>
      </div>
    </div>
  )
}

export default TeamLayout
