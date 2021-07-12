import axios from 'axios'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from '../components/icons'
import PageTitle from '../components/page-title'
import TeamLayout from '../components/team-layout'
import UserList from '../components/user-list'
import UserItem from '../components/user-list/user-item'
import { AuthContext } from '../store/auth'




function TeamPage() {
  const [searchTerm, setSearchTerm] = useState(null)
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  useEffect(() => {
    if (searchTerm === null) {
      const fetchUser = async () => {
        const { data } = await axios.get('http://localhost:8000/api/teams/1', )
        setUsers(data)
      }

      fetchUser()
    }
  }, [searchTerm])

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
