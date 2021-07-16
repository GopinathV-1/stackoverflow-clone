import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'

import { Spinner } from '../components/icons'
import TeamPageTitle from '../components/teampage-title'

import { AuthContext } from '../store/auth'
import TeamList from '../components/team-list'
import TeamItem from '../components/team-list/team-item'

import Button from '../components/button'
import AddIcon from '@material-ui/icons/Add'

import ModalContext from '../store/modal'

const Teams = () => {
  const [team, setteam] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(null)
  const router = useRouter()
  const { authState } = useContext(AuthContext)
  const { handleComponentVisible } = useContext(ModalContext)

  useEffect(() => {
    {
      const fetchteam = async () => {
        if (authState.userInfo !== undefined) {
          const { data } = await publicFetch.get(
            `/teamlist/${authState.userInfo.id}`
          )
          setteam(data)
        } else {
          setLoading(true)
        }
      }
      fetchteam()
    }
  }, [loading])

  return (
    <Layout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Teams'} - Clone of
          Stackoverflow
        </title>
      </Head>

      <TeamPageTitle title={'Your Teams'} borderBottom={false} />

      {!team && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {team && (
        <>
          <TeamList>
            {team?.map(({ name, created, id }) => (
              <TeamItem
                key={id}
                id={id}
                name={name}
                profilePhoto={
                  'https://secure.gravatar.com/avatar/' +
                  id +
                  '?s=120&d=identicon'
                }
                created={created}
              />
            ))}
          </TeamList>

          {team.length == 0 && (
            <div className="not-Found-Conatiner">
              <p className="not-found-team">"Create Your Own Team" </p>
              <Button
                onClick={() => handleComponentVisible(true, 'create team')}
                className="create-team-button"
                primary
              >
                <span className="not-found-text">Create Team</span>
              </Button>
            </div>
          )}
        </>
      )}
    </Layout>
  )
}

export default Teams
