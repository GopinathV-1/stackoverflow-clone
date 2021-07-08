import React, { useContext } from 'react'

import { AuthContext } from '../../../store/auth'
import { FetchContext } from '../../../store/fetch'
import ModalContext from '../../../store/modal'

import Button from '../../button'
import { ArrowUp, ArrowDown } from '../../icons'

import { VscCheck, VscError } from 'react-icons/vsc'
import {
  BsFillClockFill,
  BsFillPersonDashFill,
  BsFillPersonCheckFill,
  BsFillPlusCircleFill
} from 'react-icons/bs'

import styles from './post-vote.module.css'

const PostVote = ({
  score,
  votes,
  approve,
  question_author,
  questionId,
  answerId,
  setQuestion
}) => {
  const { authState, isAuthenticated } = useContext(AuthContext)
  const { authAxios } = useContext(FetchContext)
  const { handleComponentVisible } = useContext(ModalContext)

  const isUpVoted = () => {
    return votes.find((v) => v.user === authState.userInfo?.id)?.vote === 1
  }

  const isDownVoted = () => {
    return votes.find((v) => v.user === authState.userInfo?.id)?.vote === -1
  }

  const upVote = async () => {
    const { data } = await authAxios.get(
      `/votes/upvote/${questionId}/${answerId ? answerId : ''}`
    )
    setQuestion(data)
  }

  const downVote = async () => {
    const { data } = await authAxios.get(
      `/votes/downvote/${questionId}/${answerId ? answerId : ''}`
    )
    setQuestion(data)
  }

  const unVote = async () => {
    const { data } = await authAxios.get(
      `/votes/unvote/${questionId}/${answerId ? answerId : ''}`
    )
    setQuestion(data)
  }

  const handleApprove = async () => {
    const appr = { approved: 1 }
    const { data } = await authAxios.put(
      `/votes/approve/${answerId ? answerId : ''}`,
      appr
    )
    setQuestion(data)
  }

  return (
    <div className={styles.voteCell}>
      <Button
        className={styles.voteButton}
        onClick={() =>
          isAuthenticated()
            ? isUpVoted()
              ? unVote()
              : upVote()
            : handleComponentVisible(true, 'signup')
        }
      >
        <ArrowUp className={isUpVoted() ? styles.voted : ''} />
      </Button>
      <div className={styles.score}>{score}</div>
      <div className={styles.score}>
        {approve === undefined ? null : isAuthenticated() ? (
          question_author.id === authState.userInfo.id ? (
            approve === 0 ? (
              <button className={styles.approveButtonnocomment}>
                <BsFillPlusCircleFill />
              </button>
            ) : approve === 1 ? (
              <button className={styles.approveButtonapprove}>
                <BsFillPersonCheckFill />
              </button>
            ) : (
              <button className={styles.approveButtondisapprove}>
                <BsFillPersonDashFill />
              </button>
            )
          ) : approve === 0 ? (
            <span className={styles.Nocomment}>
              <BsFillClockFill />
            </span>
          ) : approve === 1 ? (
            <span className={styles.Check}>
              <VscCheck />
            </span>
          ) : (
            <span className={styles.Wrong}>
              <VscError />
            </span>
          )
        ) : approve === 0 ? (
          <span className={styles.Nocomment}>
            <BsFillClockFill />
          </span>
        ) : approve === 1 ? (
          <span className={styles.Check}>
            <VscCheck />
          </span>
        ) : (
          <span className={styles.Wrong}>
            <VscError />
          </span>
        )}
      </div>
      <Button
        className={styles.voteButton}
        onClick={() =>
          isAuthenticated()
            ? isDownVoted()
              ? unVote()
              : downVote()
            : handleComponentVisible(true, 'signup')
        }
      >
        <ArrowDown className={isDownVoted() ? styles.voted : ''} />
      </Button>
    </div>
  )
}

export default PostVote
