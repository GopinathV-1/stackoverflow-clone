import axios from 'axios'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from '../../../components/icons'
import PageTitle from '../../../components/page-title'
import TeamLayout from '../../../components/team-layout'
import UserList from '../../../components/user-list'
import UserItem from '../../../components/user-list/user-item'
import { AuthContext } from '../../../store/auth'
import { useRouter } from 'next/router'

function TeamPage({ id }) {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    {
      const fetchUser = async () => {
        const { data } = await axios.get(
          `http://localhost:8000/api/teams/${id}`
        )
        setUsers(data)
      }

      fetchUser()
    }
  }, [authState.token])
  console.log(users)

  return (
    <TeamLayout extra={false} t_id={id}>
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
export async function getServerSideProps(context) {
  const id = context.params.t_id
  return {
    props: {
      id
    }
  }
}

export default TeamPage
