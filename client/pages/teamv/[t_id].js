import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'

import UserCard from '../../components/user-card'
import AvatarCard from '../../components/user-card/avatar-card'
import PostList from '../../components/user-card/post-list'
import PostItem from '../../components/user-card/post-list/post-item'
import { Spinner } from '../../components/icons'
import TeamLayout from '../../components/team-layout'

const UserDetail = ({ id }) => {
  const [posts, setPosts] = useState(null)
  const [postType, setPostType] = useState('Questions')

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await publicFetch.get(`/teams/questions/${id}`)
      setPosts(data)
      console.log(data)
    }
    fetchQuestions()
  }, [])

  return (
    <TeamLayout extra={false}>
      <Head>
        <title>Clone of Stackoverflow</title>
      </Head>

      <UserCard>
        <AvatarCard />
        <PostList postType={postType} setPostType={setPostType}>
          {!posts && (
            <div className="loading">
              <Spinner />
            </div>
          )}

          {posts?.map(({ id, title, score, created }) => (
            <PostItem
              key={id}
              title={title}
              vote={score}
              created={created}
              id={id}
            />
          ))}

          {posts?.length == 0 && (
            <p className="not-found-questions">
              Don&apos;t have any questions yet.
            </p>
          )}
        </PostList>
      </UserCard>
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
