import React from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import slug from 'slug'

import Tag from '../../tag'

import styles from './job-summary.module.css'
import Button from '../../button'

const JobSummary = ({
  id,
  name,
  title,
  location,
  salary,
  link,
  technologies,
  children
}) => {
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
          <div className={styles.tagContainer}>
            {technologies.map((tag) => (
              <div className={styles.tag} key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSummary
