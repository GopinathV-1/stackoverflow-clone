import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import DetailPageContainer from '../../components/detail-page-container'
import PostWrapper from '../../components/post/post-wrapper'
import PostVote from '../../components/post/post-vote'
import PostSummary from '../../components/post/post-summary'
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
    <Layout extra={false}>
      {/* <Head>
        <title>{job.title}</title>
        <link rel="canonical" href={isClient && window.location.href}></link>
      </Head>

      <PageTitle title={job.title} button /> */}

      {!job && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      <h1>{job.title}</h1>
      {job && (
        <>
          <h1>{job.title}</h1>
        </>
      )}
      {/* <DetailPageContainer>

        {job && (
          <>
            <PostWrapper borderBottom={false}>
              <PostVote
                score={Job.score}
                votes={Job.votes}
                Job_author={Job.author}
                JobId={JobId}
                setJob={setJob}
              />
              <PostSummary
                tags={Job.tags}
                author={Job.author}
                created={Job.created}
                JobId={JobId}
              >
                {Job.text}
              </PostSummary>
              <CommentList JobId={JobId} setJob={setJob}>
                {Job.comments.map(({ id, author, created, body }) => (
                  <CommentItem
                    key={id}
                    commentId={id}
                    JobId={JobId}
                    author={author.username}
                    isOwner={author.username === Job.author.username}
                    created={created}
                    setJob={setJob}
                  >
                    {body}
                  </CommentItem>
                ))}
              </CommentList>
            </PostWrapper>

            {Job.answers
              ? Job.answers.length > 0 && (
                  <AnswerContainer
                    answersCount={Job.answers.length}
                    answerSortType={answerSortType}
                    setAnswerSortType={setAnswersSortType}
                  >
                    {Job.answers.sort(handleSorting()).map((answer) => (
                      <PostWrapper key={answer.id}>
                        <PostVote
                          score={answer.score}
                          votes={answer.votes}
                          Job_author={Job.author}
                          approve={answer.approved}
                          answerId={answer.id}
                          JobId={JobId}
                          setJob={setJob}
                        />
                        <PostSummary
                          author={answer.author}
                          created={answer.created}
                          JobId={JobId}
                          answerId={answer.id}
                          setJob={setJob}
                        >
                          {answer.text}
                        </PostSummary>
                        <CommentList
                          JobId={JobId}
                          answerId={answer.id}
                          setJob={setJob}
                        >
                          {answer.comments.map(
                            ({ id, author, created, body }) => (
                              <CommentItem
                                key={id}
                                commentId={id}
                                JobId={JobId}
                                answerId={answer.id}
                                author={author.username}
                                isOwner={
                                  author.username === Job.author.username
                                }
                                created={created}
                                setJob={setJob}
                              >
                                {body}
                              </CommentItem>
                            )
                          )}
                        </CommentList>
                      </PostWrapper>
                    ))}
                  </AnswerContainer>
                )
              : null}

            <AddAnswer
              tags={Job.tags}
              id={JobId}
              setJob={setJob}
            />
          </>
        )}
      </DetailPageContainer> */}
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
