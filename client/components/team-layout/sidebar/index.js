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
          <img src={'https://secure.gravatar.com/avatar/?s=120&d=identicon'} />
          <span>
            <h2>Your Team</h2>
          </span>
          <span>
            <IoLockClosed />
            Private Team
          </span>
        </div>
      </NavItem>

      <NavItem href="/tags" selected={router.pathname == '/tags'}>
        <span>Tags</span>
      </NavItem>

      <NavItem
        href="/users"
        selected={router.pathname.split('/')[1] == 'users'}
      >
        <span>For You</span>
      </NavItem>
      <NavItem href="/unanswered" selected={router.pathname == '/unanswered'}>
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
