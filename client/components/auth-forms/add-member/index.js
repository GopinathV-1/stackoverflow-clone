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
  let href = window.location.href.split('/')[5]
  return (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await publicFetch.put(
            `teams/add-member/${href}/${values.username}`,
            {
              headers: { Authorization: `Token ${authState.token}` }
            }
          )
          resetForm({})
          setIsComponentVisible(true)
          setLoading(false)
          window.location.href = `/team/teammembers/${href}`
        } catch (error) {
          alert('User Not Found')
          setStatus(error.response.data.message)
          setLoading(false)
        }
      }}
      validationSchema={Yup.object({
        username: Yup.string()
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
            label="username"
            type="text"
            name="username"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.name && errors.name}
            errorMessage={errors.name && errors.name}
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
