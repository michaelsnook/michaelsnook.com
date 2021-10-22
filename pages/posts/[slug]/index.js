import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import PrintMarkdown from '../../../components/PrintMarkdown'
import DateSpan from '../../../components/DateSpan'
import { useSession } from '../../../lib/auth'
import { fetchPostList, fetchOnePost } from '../../../lib/api'
import authorPhoto from '../../../public/images/my-photo.jpg'

const PostSidebar = ({ slug, published_at }) => {
  const { session } = useSession()
  return (
    <aside className="col-span-1 flex flex-col gap-4 md:pt-10 lg:pt-14 text-center">
      <Link href="/">
        <a className="text-cyan-700 hover:underline">« Back to home</a>
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
      {session ? (
        <Link href={`/posts/${slug}/edit`}>
          <a className="button outline mx-auto">edit post</a>
        </Link>
      ) : null}
    </aside>
  )
}

const PostLoading = () => (
  <>
    <div className="flex flex-wrap gap-4 py-4">
      <span className="inline-block h-8 sm:h-10 md:h-12 lg:h-14 w-full bg-gray-200 rounded-md" />
      <span className="inline-block h-8 sm:h-10 md:h-12 lg:h-14 w-1/3 bg-gray-200 rounded-md" />
    </div>
    <div className="h-24 sm:h-32 md:h-40 lg:h-48 w-full bg-gray-200 rounded-md" />
    <div className="h-60 sm:h-68 md:h-80 lg:h-96 w-full bg-gray-200 rounded-md" />
    <div className="invisible">
      This invisible filler content is here only so that the browser will allow
      it to wrap comfortably, thereby setting a width for the flex container
      above.
    </div>
  </>
)

export const PostArticle = ({ title, image, content, isLoading }) => (
  <article className="md:col-span-3 lg:col-span-4 flex flex-col gap-4 md:max-w-prose md:mx-auto">
    {isLoading ? (
      <PostLoading />
    ) : (
      <>
        <h1 className="h1">{title}</h1>
        {image && <Image src={image} alt="" layout="fill" />}
        <div className="prose lg:prose-lg prose-cyan">
          <PrintMarkdown markdown={content} />
        </div>
      </>
    )}
  </article>
)

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
