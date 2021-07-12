import React, { useEffect, useState, useContext } from 'react'
import Head from 'next/head'

import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import SearchInput from '../components/search-input'
import UserList from '../components/user-list'
import UserItem from '../components/user-list/user-item'
import { Spinner } from '../components/icons'
import TeamLayout from '../components/team-layout'

import { AuthContext } from '../store/auth'
import axios from 'axios'

function TeamPage() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  useEffect(() => {
    {
      const fetchUser = async () => {
        const { data } = await publicFetch.get('/teams/1')
        setUsers(data)
      }

      fetchUser()
    }
  }, [])

  return (
    <TeamLayout extra={false}>
      <Head>
        <title>Team - Clone of Stackoverflow</title>
      </Head>

      <PageTitle title="Team Member" borderBottom={false} />

      {!users && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {users && (
        <>
          <UserList>
            {users?.map(({ username, profilePhoto, created, id }) => (
              <UserItem
                key={id}
                username={username}
                profilePhoto={profilePhoto}
                created={created}
              />
            ))}
          </UserList>

          {users.length == 0 && (
            <p className="not-found">No users matched your search.</p>
          )}
        </>
      )}
    </TeamLayout>
  )
}

export default TeamPage
