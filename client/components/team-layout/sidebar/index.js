import cn from 'classnames'
import { useState, useEffect } from 'react'
import { route } from 'next/dist/next-server/server/router'
import { useRouter } from 'next/router'
import React from 'react'
import { IoLockClosed } from 'react-icons/io5'
import NavItem from '../../navigation/nav-item'
import styles from './sidebar.module.css'
import { publicFetch } from '../../../util/fetcher'

const Sidebar = ({ className, ...props }) => {
  const router = useRouter()
  console.log(props)
  const [team, setteam] = useState(null)
  useEffect(() => {
    const fetchteam = async () => {
      const { data } = await publicFetch.get(`/team-detail/${props.t_id}`)
      setteam(data)
    }
    fetchteam()
  }, [])
  return (
    <nav className={cn(styles.sidebar, className)} {...props}>
      <NavItem
        href="/teams"
        selected={
          router.pathname == '/teams' ||
          router.pathname.split('/')[1] == 'questions'
        }
      >
        <div>
          <img
            className={styles.avatar}
            src={
              'https://secure.gravatar.com/avatar/' +
              props.t_id +
              '?s=120&d=identicon'
            }
          />
          {console.log(team ? team[0]['name'] : 'loading')}
          <span>
            <h2 className={styles.teamname}>
              {team ? team[0]['name'] : 'loading'}
            </h2>
          </span>
          <span>
            <IoLockClosed />
            Private Team
          </span>
        </div>
      </NavItem>

      <NavItem
        href={`/teamv/${props.t_id}`}
        selected={router.pathname == `/teamv/${props.t_id}`}
      >
        <span>Team Questions</span>
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
