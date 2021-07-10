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

const Teams = () => {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Questions'} - Clone of
          Stackoverflow
        </title>
      </Head>
      <PageTitle title={'Create Teams'} button borderBottom={false} />
    </Layout>
  )
}

export default Teams
