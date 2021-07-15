import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import DetailPageContainer from '../../components/detail-page-container'
import JobWrapper from '../../components/job/job-wrapper'
import PostVote from '../../components/post/post-vote'
import JobSummary from '../../components/job/job-summary'
import CommentList from '../../components/post/comment-list'
import CommentItem from '../../components/post/comment-list/comment-item'
import AnswerContainer from '../../components/answer-container'
import AddAnswer from '../../components/add-answer'
import { Spinner } from '../../components/icons'

const JobDetail = ({ JobId }) => {
  const [job, setJob] = useState(null)
  const [answerSortType, setAnswersSortType] = useState('Votes')

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await publicFetch.get(`/jobs/${JobId}`)
      setJob(data)
      console.log(data)
    }

    fetchJob()
  }, [])

  const isClient = typeof window === 'object'

  return (
    <Layout>
      {job?.map(({ title }) => (
        <PageTitle title={title} />
      ))}

      {!job && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {job?.map(({ id, name, title, location, link, salary, description }) => (
        <JobWrapper key={id}>
          {(() => {
            return (
              <>
                <JobSummary
                  salary={salary}
                  id={id}
                  name={name}
                  title={title}
                  location={location}
                  link={link}
                >
                  {description}
                </JobSummary>
              </>
            )
          })()}
        </JobWrapper>
      ))}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  console.log(context)
  const slug = context.params.slug
  const JobId = slug

  return {
    props: {
      JobId
    }
  }
}

export default JobDetail
