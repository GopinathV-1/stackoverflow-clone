import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import DetailPageContainer from '../../components/detail-page-container'
import JobWrapper from '../../components/job/job-wrapper'
import PostVote from '../../components/post/post-vote'
import JobView from '../../components/job/job-view'
import CommentList from '../../components/post/comment-list'
import CommentItem from '../../components/post/comment-list/comment-item'
import AnswerContainer from '../../components/answer-container'
import AddAnswer from '../../components/add-answer'
import { Spinner } from '../../components/icons'
import { Button } from '@material-ui/core'

const JobDetail = ({ JobId }) => {
  const [job, setJob] = useState(null)
  const [answerSortType, setAnswersSortType] = useState('Votes')
  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await publicFetch.get(`/jobs/${JobId}`)
      setJob(data)
    }

    fetchJob()
  }, [])

  const isClient = typeof window === 'object'

  return (
    <Layout extra={false}>
      {job?.map(({ title }) => (
        <PageTitle title={title} />
      ))}

      {!job && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {job?.map(
        ({
          id,
          name,
          title,
          location,
          link,
          salary,
          description,
          applied_by,
          role,
          indstry
        }) => (
          <>
            <JobWrapper key={id}>
              {(() => {
                return (
                  <>
                    <JobView
                      salary={salary}
                      id={id}
                      name={name}
                      title={title}
                      location={location}
                      link={link}
                      description={description}
                      applied_by={applied_by}
                      role={role}
                      indstry={indstry}
                    ></JobView>
                  </>
                )
              })()}
            </JobWrapper>
          </>
        )
      )}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug
  const JobId = slug

  return {
    props: {
      JobId
    }
  }
}

export default JobDetail
