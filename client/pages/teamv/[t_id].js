import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../../util/fetcher'
import ButtonGroup from '../../components/button-group'
import QuestionStats from '../../components/question/question-stats'
import QuestionSummary from '../../components/question/team-question-summary'
import QuestionWrapper from '../../components/question/question-wrapper'

import UserCard from '../../components/user-card'
import AvatarCard from '../../components/user-card/avatar-card'
import PostList from '../../components/user-card/post-list'
import PostItem from '../../components/user-card/post-list/post-item'
import { Spinner } from '../../components/icons'
import TeamLayout from '../../components/team-layout'
import TeamPageTitle from '../../components/teampage-title'

const UserDetail = ({ id }) => {
  const [questions, setPosts] = useState(null)
  const [postType, setPostType] = useState('Questions')
  const [sortType, setSortType] = useState('Votes')
  const [searchTerm, setSearchTerm] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await publicFetch.get(`/teams/questions/${id}`)
      setPosts(data)
      console.log(data)
    }
    fetchQuestions()
  }, [])

  const handleSorting = () => {
    switch (sortType) {
      case 'Votes':
        return (a, b) => b.score - a.score
      case 'Views':
        return (a, b) => b.views - a.views
      case 'Newest':
        return (a, b) => new Date(b.created) - new Date(a.created)
      case 'Oldest':
        return (a, b) => new Date(a.created) - new Date(b.created)
      default:
        break
    }
  }

  return (
    <TeamLayout extra={false}>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Questions'} - Clone of
          Stackoverflow
        </title>
      </Head>

      <TeamPageTitle
        title={
          router.query.tag
            ? `Questions tagged [${router.query.tag}]`
            : 'Team Questions'
        }
        button
        borderBottom={false}
      />
      <ButtonGroup
        borderBottom
        buttons={['Votes', 'Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />

      {!questions && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {questions
        ?.sort(handleSorting())
        .map(
          ({
            id,
            votes,
            answers,
            views,
            title,
            text,
            tags,
            author,
            created
          }) => (
            <QuestionWrapper key={id}>
              <QuestionStats
                voteCount={votes.length}
                answerCount={answers.length}
                view={views}
              />
              <QuestionSummary
                id={id}
                title={title}
                tags={tags}
                author={author}
                createdTime={created}
              >
                {text}
              </QuestionSummary>
            </QuestionWrapper>
          )
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

export default UserDetail
