import React, { useContext } from 'react'

import { AuthContext } from '../../../store/auth'
import { FetchContext } from '../../../store/fetch'
import ModalContext from '../../../store/modal'

import Button from '../../button'
import { ArrowUp, ArrowDown } from '../../icons'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'

import {
  BsFillClockFill,
  BsFillPersonDashFill,
  BsFillPersonCheckFill,
  BsFillPlusCircleFill
} from 'react-icons/bs'

import styles from './post-vote.module.css'
import ThumbDownOutlined from '@material-ui/icons/ThumbDownOutlined'

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
      `/votes/approve/${questionId}/${answerId ? answerId : ''}`,
      appr
    )
    setQuestion(data)
  }
  const handleUnApprove = async () => {
    const appr = { approved: -1 }
    const { data } = await authAxios.put(
      `/votes/approve/${questionId}/${answerId ? answerId : ''}`,
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
      <div className={styles.score}>
        {approve === undefined ? null : isAuthenticated() ? (
          question_author.id === authState.userInfo.id ? (
            approve === 0 ? (
              <Button
                className={styles.approveButtonnocomment}
                onClick={() => handleApprove()}
              >
                <UpdateOutlinedIcon />
              </Button>
            ) : approve === 1 ? (
              <Button
                className={styles.approveButtonapprove}
                onClick={() => handleUnApprove()}
              >
                <ThumbUpAltOutlinedIcon />
              </Button>
            ) : (
              <Button
                className={styles.approveButtondisapprove}
                onClick={() => handleApprove()}
              >
                <ThumbDownOutlined />
              </Button>
            )
          ) : approve === 0 ? (
            <span className={styles.Nocomment}>
              <BsFillClockFill />
            </span>
          ) : approve === 1 ? (
            <span className={styles.Check}>
              <CheckIcon />
            </span>
          ) : (
            <span className={styles.Wrong}>
              <CloseIcon />
            </span>
          )
        ) : approve === 0 ? (
          <span className={styles.Nocomment}>
            <BsFillClockFill />
          </span>
        ) : approve === 1 ? (
          <span className={styles.Check}>
            <CheckIcon />
          </span>
        ) : (
          <span className={styles.Wrong}>
            <CloseIcon />
          </span>
        )}
      </div>
    </div>
  )
}

export default PostVote
