import React, { useContext } from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import slug from 'slug'
import { AuthContext } from '../../../store/auth'
import Tag from '../../tag'

import styles from './job-view.module.css'
import Button from '../../button'
import Axios from 'axios'

const JobView = ({
  id,
  name,
  title,
  location,
  salary,
  link,
  description,
  children,
  applied_by
}) => {
  const { isAuthenticated, authState } = useContext(AuthContext)

  const applyJob = () => {
    const { data } = Axios.put(
      `http://127.0.0.1:8000/api/jobs/applied-by/${id}/${authState.userInfo.id}`
    )
    window.location.href = `/jobs/${id}`
  }
  console.log('applied by', applied_by)
  return (
    <div className={styles.container}>
      <Link href="/jobs/[slug]" as={`/jobs/${id}`}>
        <a className={styles.link}>{title}</a>
      </Link>
      <div className={styles.excerpt}>{children}</div>
      <div className={styles.container}>
        <h1 className={styles.location}>Location:{location}</h1>
        {salary ? <p>{salary}/ Year</p> : null}
      </div>
      <div className={styles.footer}>
        <div className={styles.tagContainer}>
          <Button href={link} primary target="_blank">
            {name}
          </Button>
          {isAuthenticated() ? (
            applied_by.includes(authState.userInfo.id) ? (
              <Button className={styles.btnapply} secondary>
                Already Applied
              </Button>
            ) : (
              <Button
                onClick={applyJob}
                primary
                target="_blank"
                className={styles.btnapply}
              >
                Apply
              </Button>
            )
          ) : null}
        </div>
      </div>
      <div className={styles.container}>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default JobView
