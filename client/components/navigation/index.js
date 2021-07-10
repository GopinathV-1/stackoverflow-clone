import React from 'react'
import { useRouter } from 'next/router'

import NavItem from './nav-item'
import { World } from '../icons'

import styles from './navigation.module.css'

const Navigation = () => {
  const router = useRouter()

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
      <NavItem href="/teams" selected={router.pathname == '/teams'}>
        <span>Teams</span>
      </NavItem>
    </nav>
  )
}

export default Navigation
