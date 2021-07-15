import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'
import QuestionWrapper from '../components/question/question-wrapper'

import PageTitle from '../components/page-title'
import ButtonGroup from '../components/button-group'
import { Spinner } from '../components/icons'
import JobWrapper from '../components/job/job-wrapper'
import JobSummary from '../components/job/job-summary'

const JobPage = () => {
  const router = useRouter()

  const [jobs, setJobs] = useState(null)
  const [sortType, setSortType] = useState('Votes')

  //  let there is no problem
  let flag = 1

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await publicFetch.get('/jobs')
      setJobs(data)
    }

    fetchJob()
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
      {jobs
        ?.sort(handleSorting())
        .map(({ id, name, title, location, link, description }) => (
          <JobWrapper key={id}>
            {(() => {
              return (
                <>
                  <JobSummary
                    id={id}
                    name={name}
                    title={title}
                    location={location}
                    link={link}
                  >
                    {description}
                    {/* To set the flag there is a problem */}
                    {(flag = 0)}
                  </JobSummary>
                </>
              )
            })()}
          </JobWrapper>
        ))}
      {flag ? (
        <QuestionWrapper>Looks Like No Jobs for Now!!!</QuestionWrapper>
      ) : null}
    </Layout>
  )
}

export default JobPage
