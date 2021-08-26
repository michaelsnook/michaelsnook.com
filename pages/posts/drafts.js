import useSWR from 'swr'
import PostList from '../../components/PostList'
import Layout from '../../components/Layout'
import { LoginChallenge, useUser } from '../../components/LoginForm'
import ErrorList from '../../components/ErrorList'
import { getAPI } from '../../lib/api'

export default function Drafts() {
  const { isLoggedIn } = useUser()
  const { data, error } = useSWR(isLoggedIn ? `posts/drafts` : null, getAPI)

  return (
    <Layout banner>
      <LoginChallenge />
      <main className="container py-5">
        <h2 className="h2">Draft posts</h2>
        <ErrorList summary="Can't load drafts" error={error} />
        <PostList posts={data} />
      </main>
    </Layout>
  )
}
