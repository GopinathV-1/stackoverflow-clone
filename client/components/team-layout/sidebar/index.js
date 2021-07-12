import React from 'react'
import cn from 'classnames'

import { useRouter } from 'next/router'

import NavItem from '../../navigation/nav-item'

import styles from './sidebar.module.css'
import { IoLockClosed } from 'react-icons/io5'

const Sidebar = ({ className, ...props }) => {
  const router = useRouter()

  return (
    <nav className={cn(styles.sidebar, className)} {...props}>
      <NavItem
        href="/"
        selected={
          router.pathname == '/' || router.pathname.split('/')[1] == 'questions'
        }
      >
        <div>
          <img
            className={styles.avatar}
            src={
              'https://secure.gravatar.com/avatar/' +
              Math.floor(Math.random() * 100) +
              '?s=120&d=identicon'
            }
          />
          <span>
            <h2 className={styles.teamname}>Your Team</h2>
          </span>
          <span>
            <IoLockClosed />
            Private Team
          </span>
        </div>
      </NavItem>

      <NavItem
        href="/team-questions"
        selected={router.pathname == '/team-questions'}
      >
        <span>Team Questions</span>
      </NavItem>

      <NavItem
        href="/users"
        selected={router.pathname.split('/')[1] == 'users'}
      >
        <span>Team Tag</span>
      </NavItem>
      <NavItem href="/teamlist" selected={router.pathname == '/teamlist'}>
        <span>Team Members</span>
      </NavItem>
      <br />
      <NavItem href="/teams" selected={router.pathname == '/teams'}>
        <span>My Team</span>
      </NavItem>
    </nav>
  )
}

export default Sidebar
