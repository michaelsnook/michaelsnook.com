import useSWR from 'swr'
import PostList from '../../components/PostList'
import Layout from '../../components/Layout'
import { LoginChallenge } from '../../components/LoginForm'
import ErrorList from '../../components/ErrorList'
import { getAPI } from '../../lib/api'

export default function Drafts() {
  const { data, error } = useSWR(`posts/drafts`, getAPI)

  return (
    <Layout banner>
      <LoginChallenge />
      <main className="container py-5">
        <h2 className="h2">Draft posts</h2>
        {error && <ErrorList summary="Can't load drafts" errors={[error]} />}
        <PostList posts={data} />
      </main>
    </Layout>
  )
}
