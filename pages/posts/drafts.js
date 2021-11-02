import Link from 'next/link'
import useSWR from 'swr'
import PostList from '../../components/PostList'
import Layout from '../../components/Layout'
import { LoginChallenge } from '../../components/LoginForm'
import { ErrorList } from '../../components/lib'
import { useSession } from '../../lib/auth'
import { fetchDraftPosts } from '../../lib/posts'

export default function Drafts() {
  const { session } = useSession()
  const { data, error } = useSWR(
    session ? `posts/drafts` : null,
    fetchDraftPosts
  )

  return (
    <Layout banner>
      <LoginChallenge />
      <main className="container py-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="h2">Draft posts</h2>
          {session ? (
            <Link href="/posts/new">
              <a className="button outline">New post</a>
            </Link>
          ) : null}
        </div>
        <ErrorList summary="Can't load drafts" error={error} />
        <PostList posts={data} />
      </main>
    </Layout>
  )
}
