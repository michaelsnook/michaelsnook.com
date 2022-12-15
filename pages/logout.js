import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { AlertBox } from '../components/lib'
import { postLogout } from '../lib/auth'

export default function Logout() {
  const [isFinished, setIsFinished] = useState()
  useEffect(() => {
    postLogout().then(() => setIsFinished(true))
  }, [])

  return (
    <Layout singleCol>
      <main className="mx-auto max-w-lg my-6">
        {!isFinished ? (
          <h1 className="h5">Logging out...</h1>
        ) : (
          <AlertBox>
            <h1 className="h3">Logged out</h1>
            <p className="my-4">
              Congratulations, you may now{' '}
              <Link href="/" className="link">
                return to the home page
              </Link>{' '}
              or{' '}
              <Link href="/login" className="link">
                log in again
              </Link>
              .
            </p>
          </AlertBox>
        )}
      </main>
    </Layout>
  )
}
