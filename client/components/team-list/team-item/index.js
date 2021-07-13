import React from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import styles from './team-item.module.css'

const TeamItem = ({ id, name, profilePhoto, created }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Link href="/teamv/[id]" as={`/teamv/${id}`}>
          <a>
            <img src={profilePhoto} alt={name} />
          </a>
        </Link>
      </div>
      <div className={styles.body}>
        <Link href="/teamv/[id]" as={`/teamv/${id}`}>
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
