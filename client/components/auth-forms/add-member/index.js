import React, { useState, useContext } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { publicFetch } from '../../../util/fetcher'
import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'

import FormInput from '../../form-input'
import Button from '../../button'

import styles from './add-member.module.css'
import { useHistory } from 'react-router-dom'

const AddForm = () => {
  const { setIsComponentVisible } = useContext(ModalContext)
  const { authState } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  let history = useHistory()
  return (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await publicFetch.post('teams/addmember/', values, {
            headers: { Authorization: `Token ${authState.token}` }
          })
          resetForm({})
          setIsComponentVisible(true)
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
        window.location.href = '/teams'
      }}
      validationSchema={Yup.object({
        teamname: Yup.string()
          .required('Required')
          .max(16, 'Must be at most 16 characters long')
          .matches(/^[a-zA-Z0-9_-]+$/, 'Contains invalid characters')
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            label="Username"
            type="text"
            name="teamname"
            autoComplete="off"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.username && errors.username}
            errorMessage={errors.username && errors.username}
          />
          <p className={styles.status}>{status}</p>
          <Button
            primary
            full
            className={styles.submitButton}
            type="submit"
            isLoading={loading}
            disabled={isSubmitting}
          >
            Add
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default AddForm
