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
import SearchInput from '../components/search-input'

const JobPage = () => {
  const router = useRouter()

  const [jobs, setJobs] = useState(null)
  const [sortType, setSortType] = useState('Votes')
  const [searchTerm, setSearchTerm] = useState(null)
  const [loading, setLoading] = useState(false)


  //  let there is no problem
  let flag = 1

  useEffect(() => {
    if (searchTerm === null || searchTerm === '') {
      const fetchJob = async () => {
        const { data } = await publicFetch.get('/jobs')
        setJobs(data)
      }
      fetchJob()
      } else {
        const delayDebounceFn = setTimeout(async () => {
          setLoading(true)
          const { data } = await publicFetch.get(
            searchTerm ? `/jobs/${searchTerm}` : `/title`
          )
          setJobs(data)
          setLoading(false)
        }, 500)
        return () => clearTimeout(delayDebounceFn)
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
    <Layout extra={false}>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Questions'} - Clone of
          Stackoverflow
        </title>
      </Head>
      <PageTitle
        title={
          router.query.tag ? `Questions tagged [${router.query.tag}]` : 'Jobs'
        }
        borderBottom={false}
      />
      <SearchInput
        placeholder="Search by job title"
        isLoading={loading}
        autoFocus
        autoComplete="off"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ButtonGroup
        borderBottom
        buttons={['Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />
      {!jobs && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {console.log(jobs)}
      {jobs?.sort(handleSorting()).map(({ id }) => (
        <QuestionWrapper key={id}>
          {(() => {
            return (
              <>
                <h1>{jobs[id-1].title}</h1>
                <h2>{id}</h2>
              </>

              // <>
              //   <QuestionStats
              //     voteCount={votes.length}
              //     answerCount={answers.length}
              //     view={views}
              //   />
              //   <QuestionSummary
              //     id={id}
              //     title={title}
              //     tags={tags}
              //     author={author}
              //     createdTime={created}
              //   >
              //     {text}
              //     {/* To set the flag there is a problem */}
              //     {(flag = 0)}
              //   </QuestionSummary>
              // </>
            )
          })()}
        </QuestionWrapper>
      ))}
      {flag ? (
        <QuestionWrapper>Looks Like No Jobs for Now!!!</QuestionWrapper>
      ) : null}
    </Layout>
  )
}

export default JobPage
