import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'
import QuestionWrapper from '../components/question/question-wrapper'
import QuestionStats from '../components/question/question-stats'
import QuestionSummary from '../components/question/question-summary'
import PageTitle from '../components/page-title'
import ButtonGroup from '../components/button-group'
import { Spinner } from '../components/icons'

const UnAnsweredPage = () => {
  const router = useRouter()

  const [questions, setQuestions] = useState(null)
  const [sortType, setSortType] = useState('Votes')

  //  let there is no problem
  let flag = 1

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await publicFetch.get('/question')
      setQuestions(data)
    }

    const fetchQuestionByTag = async () => {
      const { data } = await publicFetch.get(`/questions/${router.query.tag}`)
      setQuestions(data)
    }

    if (router.query.tag) {
      fetchQuestionByTag()
    } else {
      fetchQuestion()
    }
  }, [router.query.tag])

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
    <Layout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Unanswered'} - Clone of
          Stackoverflow
        </title>
      </Head>
      <PageTitle
        title={
          router.query.tag
            ? `Questions tagged [${router.query.tag}]`
            : 'Unanswered Questions'
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
            created,
            team
          }) =>
            team ? null : answers.length === 0 ? (
              <QuestionWrapper key={id}>
                {(() => {
                  return (
                    <>
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
                        {/* To set the flag there is a problem */}
                        {(flag = 0)}
                      </QuestionSummary>
                    </>
                  )
                })()}
              </QuestionWrapper>
            ) : null
        )}
      {flag ? (
        <QuestionWrapper>Looks Like No Problem for Now!!!</QuestionWrapper>
      ) : null}
    </Layout>
  )
}

export default UnAnsweredPage
