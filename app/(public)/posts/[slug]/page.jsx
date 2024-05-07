import Link from 'next/link'
import Image from 'next/image'
import { DateSpan } from '@/components/lib'
import { PostArticle } from '@/components/Post'
import IffLoggedIn from '@/app/iff-logged-in'
import { fetchPostList, fetchOnePost } from '@/lib/posts'
import faceImage from '@/public/images/my-face-circle.png'
import Banner from '@/components/Banner'

const PostSidebar = ({ slug, published_at }) => {
  return (
    <aside className="col-span-1 flex flex-col gap-4 md:pt-10 lg:pt-14 text-center">
      <Link href="/" className="text-cyan-700 hover:underline">
        « Back to home
      </Link>
      <div className="mx-auto">
        <Image
          src={faceImage}
          alt="A cartoon face of the author, Michael"
          className="w-36"
          width="144"
          height="144"
        />
      </div>

      <p className="mx-auto">By Em Snook</p>
      <p className="mx-auto">
        Published <DateSpan dateText={published_at} />
      </p>
      <IffLoggedIn>
        <Link href={`/posts/${slug}/edit`} className="button outlines mx-auto">
          edit post
        </Link>
      </IffLoggedIn>
    </aside>
  )
}

export default async function Page({ params: { slug } }) {
  const post = await fetchOnePost(slug)

  return (
    <>
      <Banner title={post.title} description={post.excerpt} small />
      <div className="container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-10">
        <PostSidebar {...post} />
        <PostArticle {...post} />
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const data = await fetchPostList()
  return data.map(post => {
    return { slug: post.slug }
  })
}
