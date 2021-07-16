import React from 'react'

import CONST from '../../constants'
import useWindowSize from '../../hooks/useWindowSize'

import Extra from '../layout/extra'
import Main from '../layout/main'

import styles from './detail-page-container.module.css'

const DetailPageContainer = ({ extra = true, children }) => {
  const size = useWindowSize()
  return (
    <div className={styles.container}>
      <Main border={false}>{children}</Main>
      {extra
        ? size.width > CONST.TABLET_SIZE && <Extra marginTop={16} />
        : null}
    </div>
  )
}

export default DetailPageContainer
