import Link from 'next/link'
import PostList from '../components/PostList'
import Layout from '../components/Layout'
import { useUser } from '../components/LoginForm'
import { getAPI } from '../lib/api'

export default function Home({ data }) {
  const { isLoggedIn } = useUser()
  return (
    <Layout banner>
      <main className="container py-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="h2">All Posts</h2>
          {isLoggedIn ? (
            <Link href="/posts/drafts">
              <a className="button outline">See drafts</a>
            </Link>
          ) : null}
        </div>
        <PostList posts={data} />
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getAPI(`posts/index`)

  return !data
    ? {
        notFound: true,
        revalidate: 10,
      }
    : {
        props: { data },
        revalidate: 10,
      }
}
