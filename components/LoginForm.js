import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSession, postLogin } from '../lib/auth'
import ErrorList from './ErrorList'
import Modal from './Modal'

export function LoginChallenge() {
  const { session, isLoading } = useSession()
  return !session && !isLoading ? (
    <Modal showing>
      <Login asModal />
    </Modal>
  ) : null
}

const ConfirmationMessage = ({ nickname, asModal }) => {
  const router = useRouter()
  return (
    <div className="bg-green-200 border rounded border-green-600 text-green-800 p-10">
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
        <Link href="/logout">
          <a className="link">logout</a>
        </Link>
        .
      </p>
    </div>
  )
}

export default function Login({ asModal }) {
  const { session, nickname } = useSession()
  const [loginErrors, setLoginErrors] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = data => {
    setLoginErrors([])
    postLogin(data).catch(setLoginErrors)
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
                  placeholder="email"
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
                  placeholder="****"
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
            <ErrorList summary="Failed to log in" errors={loginErrors} />
          </form>
        </>
      )}
    </div>
  )
}
