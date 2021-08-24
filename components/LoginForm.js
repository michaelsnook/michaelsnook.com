import { useState } from 'react'
import useSWR from 'swr'
import { useForm } from 'react-hook-form'
import { postLogin, checkLogin } from '../lib/login'
import ErrorList from './ErrorList'
import Modal from './Modal'

export function useUser() {
  const { data, error } = useSWR(`logged_in`, checkLogin)
  return {
    user: data?.user,
    isLoggedIn: data?.logged_in,
    isLoading: !error && !data,
    isError: error,
  }
}

export function LoginChallenge() {
  const { isLoggedIn, isLoading } = useUser()
  return !isLoggedIn && !isLoading ? (
    <Modal showing>
      <Login asModal />
    </Modal>
  ) : null
}

const ConfirmationMessage = ({ user, asModal }) => (
  <div className="bg-green-200 border rounded border-green-600 text-green-800 p-10">
    <h1 className="my-4 h3">Success</h1>
    <p className="my-4">
      You&apos;re logged in as user <em><strong>{user?.username}</strong></em>.
    </p>
    {asModal ? (
      <p className="my-4">
        You may need to refresh the page.
      </p>
    ) : null}
  </div>
)

export default function Login({ asModal }) {
  const { user } = useUser()
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
      {user ? (
        <ConfirmationMessage user={user} asModal={asModal} />
      ) : (
        <>
          <h1 className="h3 text-gray-700">Please log in</h1>
          <form role="form" onSubmit={handleSubmit(onSubmit)} className="form">
            <fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  {...register('username', { required: 'required' })}
                  aria-invalid={errors.username ? 'true' : 'false'}
                  className={errors.username ? 'border-red-600' : ''}
                  tabIndex="1"
                  type="slug"
                  placeholder="username"
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
            <ErrorList summary="Failed to log in" errors={loginErrors || []} />
          </form>
        </>
      )}
    </div>
  )
}
