import React, { useContext } from 'react'
import { useRouter } from 'next/router'

import NavItem from './nav-item'
import { World } from '../icons'
import { AuthContext } from '../../store/auth'

import styles from './navigation.module.css'
import ModalContext from '../../store/modal'
import AddIcon from '@material-ui/icons/Add'
import { Button } from '@material-ui/core'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'

const Navigation = () => {
  const router = useRouter()
  const { isAuthenticated } = useContext(AuthContext)
  const { handleComponentVisible } = useContext(ModalContext)

  return (
    <nav className={styles.nav}>
      <NavItem
        href="/"
        selected={
          router.pathname == '/' || router.pathname.split('/')[1] == 'questions'
        }
      >
        <World />
        <span>Stack Overflow</span>
      </NavItem>

      <NavItem href="/tags" selected={router.pathname == '/tags'}>
        <span>Tags</span>
      </NavItem>

      <NavItem
        href="/users"
        selected={router.pathname.split('/')[1] == 'users'}
      >
        <span>Users</span>
      </NavItem>
      <NavItem href="/unanswered" selected={router.pathname == '/unanswered'}>
        <span>Unanswered</span>
      </NavItem>
      <br />
      <div className={styles.container}>
        <>
          <span className={styles.workicon}>
            <WorkOutlineIcon />
          </span>
          <span className={styles.worktext}>Find A Job</span>
        </>
      </div>
      <NavItem href="/unanswered" selected={router.pathname == '/unanswered'}>
        <span>Jobs</span>
      </NavItem>

      {isAuthenticated() ? (
        <>
          <div className={styles.buttoncontainer}>
            <Button
              className={styles.button}
              onClick={() => handleComponentVisible(true, 'create team')}
            >
              <span className={styles.icon}>
                <AddIcon />
              </span>
              <span className={styles.text}>Create Team</span>
            </Button>
          </div>

          <NavItem href="/teams" selected={router.pathname == '/teams'}>
            <span>Your Teams</span>
          </NavItem>
        </>
      ) : null}
    </nav>
  )
}

export default Navigation
