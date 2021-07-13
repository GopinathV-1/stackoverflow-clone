import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../util/fetcher'

import TeamLayout from '../components/team-layout'
import QuestionWrapper from '../components/question/question-wrapper'
import QuestionStats from '../components/question/question-stats'
import QuestionSummary from '../components/question/question-summary'
import PageTitle from '../components/page-title'
import ButtonGroup from '../components/button-group'
import { Spinner } from '../components/icons'
import TeamPageTitle from '../components/teampage-title'
import UserList from '../components/user-list'
import UserItem from '../components/user-list/user-item'
import { AuthContext } from '../store/auth'

const Teams = () => {
  const [team, setteam] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(null)
  const router = useRouter()
  const { authState } = useContext(AuthContext)
  console.log(authState.userInfo, 'authstate')

  useEffect(() => {
    if (searchTerm === null) {
      const fetchteam = async () => {
        const { data } = await publicFetch.get(
          `/teamlist/${authState.userInfo.id}`
        )
        setteam(data)
      }

      fetchteam()
    }
  }, [])

  return (
    <TeamLayout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Questions'} - Clone of
          Stackoverflow
        </title>
      </Head>

      <TeamPageTitle title={'Your Teams'} button borderBottom={false} />

      {!team && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {console.log(team)}
      {team && (
        <>
          <UserList>
            {team?.map(({ name, created, id }) => (
              <UserItem
                key={id}
                username={name}
                profilePhoto={
                  'https://secure.gravatar.com/avatar/' +
                  id +
                  '?s=120&d=identicon'
                }
                created={created}
              />
            ))}
          </UserList>

          {team.length == 0 && (
            <p className="not-found">No team matched your search.</p>
          )}
        </>
      )}
    </TeamLayout>
  )
}

export default Teams
