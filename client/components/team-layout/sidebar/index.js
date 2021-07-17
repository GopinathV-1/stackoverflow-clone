import cn from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoLockClosed } from 'react-icons/io5'
import { publicFetch } from '../../../util/fetcher'
import NavItem from '../../navigation/nav-item'
import styles from './sidebar.module.css'


const Sidebar = ({ className, ...props }) => {
  const [team, setTeam] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchteam = async () => {
      const { data } = await publicFetch.get(`/team-detail/${props.t_id}`)
      setTeam(data)
    }
    fetchteam()
  }, [])
  return (
    <nav className={cn(styles.sidebar, className)} {...props}>
      <NavItem
        href={`/teamv/${props.t_id}`}
        selected={router.pathname == `/teamv/${props.t_id}}`}
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

      <NavItem
        href={`/team/teammembers/${props.t_id}`}
        selected={router.pathname == `/team/teammembers/${props.t_id}`}
      >
        <span>Team Members</span>
      </NavItem>
      <br />
      <NavItem href="/" selected={router.pathname == '/home'}>
        <span>
          Home
        </span>
      </NavItem>
    </nav>
  )
}

export default Sidebar
