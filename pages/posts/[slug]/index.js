import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import { DateSpan } from '../../../components/lib'
import { PostArticle } from '../../../components/Post'
import IffLoggedIn from '../../../app/iff-logged-in'
import { fetchPostList, fetchOnePost } from '../../../lib/posts'
import authorPhoto from '../../../public/images/my-photo.jpg'

const PostSidebar = ({ slug, published_at }) => {
  return (
    <aside className="col-span-1 flex flex-col gap-4 md:pt-10 lg:pt-14 text-center">
      <Link href="/" className="text-cyan-700 hover:underline">
        « Back to home
      </Link>
      <div className="mx-auto">
        <Image
          src={authorPhoto}
          alt="A photo of the author, Michael, smiling"
          className="rounded-full"
          height="144"
          width="144"
        />
      </div>

      <p className="mx-auto">By Michael Snook</p>
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

export default function Post({ post }) {
  return (
    <Layout title={post.title} description={post.excerpt} image={post.image}>
      <div className="container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-10">
        <PostSidebar {...post} />
        <PostArticle {...post} />
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  let data = null
  try {
    data = await fetchOnePost(params.slug)
  } catch (e) {
    console.log(e)
  }

  return !data
    ? {
        notFound: true,
        revalidate: 10,
      }
    : {
        props: { post: data },
        revalidate: 10,
      }
}

export async function getStaticPaths() {
  const data = await fetchPostList()
  const paths = data.map(post => ({
    params: { slug: `${post.slug}` },
  }))

  return { paths, fallback: 'blocking' }
}
