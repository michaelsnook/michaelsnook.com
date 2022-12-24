import Link from 'next/link'
import PostList from '../components/PostList'
import Layout from '../components/Layout'
import { useSession } from '../lib/auth'
import { fetchPostList } from '../lib/posts'

export default function Home({ data }) {
  const { session } = useSession()
  return (
    <Layout banner>
      <main className="container py-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="h2">All Posts</h2>
          {session ? (
            <Link href="/posts/drafts" className="button outlines">
              See drafts
            </Link>
          ) : null}
        </div>
        <PostList posts={data} />
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchPostList()

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
