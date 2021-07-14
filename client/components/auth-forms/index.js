import React, { useState } from 'react'
import Head from 'next/head'

import { Logo } from '../icons'
import LoginForm from './login-form'
import SignUpForm from './signup-form'

import styles from './auth-forms.module.css'
import CreateForm from './team-form'
import AddForm from './add-member'
const AuthForms = ({ screen = 'signup' }) => {
  const [form, setForm] = useState(screen)

  return (
    <div className={styles.authModal}>
      <Head>
        <title>{form == 'add member' ? 'Member' : form == 'create team' ? 'Team': form == 'login'? 'Log In' : 'Sign Up'} - Clone of Stackoverflow</title>
      </Head>

      <Logo className={styles.logo} />
      {form === 'add member' ? <AddForm/> :form === 'create team' ? <CreateForm/> : form === 'login' ? <LoginForm /> : <SignUpForm />}

      {form === 'login' ? (
        <p className={styles.authSwichMessage}>
          Don’t have an account?{' '}
          <a onClick={() => setForm('signup')}>Sign up</a>
        </p>
      ) : form === 'signup'?(
        <p className={styles.authSwichMessage}>
          Already have an account?{' '}
          <a onClick={() => setForm('login')}>Log in</a>
        </p>
      ): null}
    </div>
  )
}

export default AuthForms
