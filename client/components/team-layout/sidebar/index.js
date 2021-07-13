import cn from 'classnames'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { IoLockClosed } from 'react-icons/io5'
import NavItem from '../../navigation/nav-item'
import styles from './sidebar.module.css'
import { AuthContext } from '../../../store/auth'

const Sidebar = ({ className, ...props }) => {
  const router = useRouter()
  const id = parseInt(window.location.pathname.split("/")[2])
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  useEffect(() => {
    {
      const fetchTeam = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/teamdetail/${id}`)
        setTeam(data)
      }

      fetchTeam()
    }
  }, [authState.token])
  console.log(team)
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
            src={'https://secure.gravatar.com/avatar/1?s=120&d=identicon'}
          />
          <span>
            <h2 className={styles.teamname}>{team.name}</h2>
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
