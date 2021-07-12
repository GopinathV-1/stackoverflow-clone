import React, { useState, useContext } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { publicFetch } from '../../../util/fetcher'
import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'

import FormInput from '../../form-input'
import Button from '../../button'

import styles from './team-form.module.css'

const CreateForm = () => {
  const { setAuthState } = useContext(AuthContext)
  const { setIsComponentVisible } = useContext(ModalContext)

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ teamname: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await publicFetch.post('teams/createteam/', values)
          resetForm({})
          setIsComponentVisible(true)
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
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
            label="Teamname"
            type="text"
            name="teamname"
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
            Create
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default CreateForm