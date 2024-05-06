import Link from 'next/link'
import PostList from '../../components/PostList'
import IffLoggedIn from '../iff-logged-in'
import { fetchPostList } from '../../lib/posts'

export default async function Page() {
  const data = await fetchPostList()
  return (
    <main className="container py-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="h2">All Posts</h2>
        <IffLoggedIn>
          <Link href="/posts/drafts" className="button outlines">
            See drafts
          </Link>
        </IffLoggedIn>
      </div>
      <PostList posts={data} />
    </main>
  )
}
