import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { publicFetch } from '../util/fetcher'
import TeamLayout from '../components/team-layout'
import SearchInput from '../components/search-input'
import QuestionWrapper from '../components/question/question-wrapper'
import QuestionStats from '../components/question/question-stats'
import QuestionSummary from '../components/question/question-summary'
import TeamPageTitle from '../components/teampage-title'
import ButtonGroup from '../components/button-group'
import { Spinner } from '../components/icons'

const HomePage = () => {
  const router = useRouter()

  const [questions, setQuestions] = useState(null)
  const [sortType, setSortType] = useState('Votes')
  const [searchTerm, setSearchTerm] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchQuestionByTag = async () => {
      const { data } = await publicFetch.get(`/questions/${router.query.tag}`)
      setQuestions(data)
    }

    if (router.query.tag) {
      fetchQuestionByTag()
    } else {
      if (searchTerm === null || searchTerm === '') {
        const fetchQuestion = async () => {
          const { data } = await publicFetch.get('teams/questions/2')
          console.log(data)
          setQuestions(data)
        }
        fetchQuestion()
      } else {
        const delayDebounceFn = setTimeout(async () => {
          setLoading(true)
          const { data } = await publicFetch.get(
            searchTerm ? `/question/${searchTerm}` : `/title`
          )
          setQuestions(data)
          setLoading(false)
        }, 500)
        return () => clearTimeout(delayDebounceFn)
      }
    }
  }, [router.query.tag, searchTerm])

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
    <TeamLayout>
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

export default HomePage