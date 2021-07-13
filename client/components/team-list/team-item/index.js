import React from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import styles from './team-item.module.css'

const TeamItem = ({ name, profilePhoto, created }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Link href="/team/[name]" as={`/team/${name}`}>
          <a>
            <img src={profilePhoto} alt={name} />
          </a>
        </Link>
      </div>
      <div className={styles.body}>
        <Link href="/team/[name]" as={`/team/${name}`}>
          <a>{name}</a>
        </Link>
        <p>
          created{' '}
          {formatDistanceToNowStrict(new Date(created), {
            addSuffix: true
          })}
        </p>
      </div>
    </div>
  )
}

export default TeamItem
