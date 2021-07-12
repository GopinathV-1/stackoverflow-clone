import React from 'react'
import Head from 'next/head'

import QuestionAskView from '../../components/question-ask-view'
import Header from '../../components/layout/header'
import QuestionForm from '../../components/question-ask-view/question-form'
import TeamQuestionForm from '../../components/question-ask-view/temquestion-form'
const Ask = () => {
  return (
    <div>
      <Head>
        <title>Ask a Question - Clone of Stackoverflow</title>
      </Head>

      <Header />
      <QuestionAskView>
        <TeamQuestionForm />
      </QuestionAskView>
    </div>
  )
}

export default Ask
