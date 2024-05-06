'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useSession, postLogin } from '../lib/auth'
import Modal from './Modal'
import { AlertBox, ErrorList } from './lib'

export function LoginChallenge() {
  const session = useSession()
  return !session ? (
    <Modal showing>
      <Login asModal />
    </Modal>
  ) : null
}

const ConfirmationMessage = ({ nickname, asModal }) => {
  const router = useRouter()
  return (
    <AlertBox type="success">
      <h1 className="mb-4 h3">Success</h1>
      <p className="my-4">
        You&apos;re logged in as user{' '}
        <em>
          <strong>{nickname}</strong>
        </em>
        .
      </p>
      {asModal ? (
        <p className="my-4">You may need to refresh the page.</p>
      ) : (
        <p className="my-4">
          <a className="link" onClick={() => router.back()}>
            Return to previous screen.
          </a>
        </p>
      )}
      <p className="my-4">
        Or click here to{' '}
        <Link href="/logout" className="link">
          logout
        </Link>
        .
      </p>
    </AlertBox>
  )
}

export default function Login({ asModal }) {
  const session = useSession()
  const [loginError, setLoginError] = useState()

  const nickname = session?.user?.email?.split(/[\b\@\.]/)[0] || 'editor'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = data => {
    setLoginError()
    postLogin(data).catch(err => setLoginError(err.message))
  }

  return (
    <div className="mx-auto max-w-lg my-6">
      {session ? (
        <ConfirmationMessage nickname={nickname} asModal={asModal} />
      ) : (
        <>
          <h1 className="h3 text-gray-700">Please log in</h1>
          <form role="form" onSubmit={handleSubmit(onSubmit)} className="form">
            <fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...register('email', { required: 'required' })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className={errors.email ? 'border-red-600' : ''}
                  tabIndex="1"
                  type="slug"
                  placeholder="email@domain"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  {...register('password', { required: 'required' })}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className={errors.password ? 'border-red-600' : ''}
                  tabIndex="2"
                  type="password"
                  placeholder="𐦖𐦊𐦉𐦚𐦂𐦖𐦓𐦐"
                />
              </div>
              <div>
                <button
                  tabIndex="3"
                  className="button solid"
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  Log in
                </button>
              </div>
            </fieldset>
            <ErrorList summary="Failed to log in" error={loginError} />
          </form>
        </>
      )}
    </div>
  )
}
