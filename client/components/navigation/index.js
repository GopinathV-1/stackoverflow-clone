import React, { useContext } from 'react'
import { useRouter } from 'next/router'

import NavItem from './nav-item'
import { World } from '../icons'
import { AuthContext } from '../../store/auth'

import styles from './navigation.module.css'
import ModalContext from '../../store/modal'

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

      {isAuthenticated() ? (
        <NavItem href="/teams" selected={router.pathname == '/teams'}>
          <span>Your Teams</span>
        </NavItem>
      ) : (
        <span
          className="styles.spanbutton"
          onClick={() => handleComponentVisible(true, 'create team')}
        >
          Create team +
        </span>
      )}
    </nav>
  )
}

export default Navigation
