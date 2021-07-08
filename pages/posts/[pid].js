import Link from 'next/link'
import Layout from '../../components/Layout'
import PrintMarkdown from '../../components/PrintMarkdown'
import { getAPI } from '../../lib/api'

const PostSidebar = ({id, created_at}) => (
  <div className="col-span-1 flex flex-col gap-4 md:pt-10 lg:pt-14 text-center">
    <img className="w-36 mx-auto rounded-full" src="/images/my-photo.jpg"
      alt="A cartoon face of the author, Michael" />
    <p className="mx-auto">By Michael Snook</p>
    <p className="mx-auto">Published {created_at}</p>
    <Link
      href={`/posts/${id}/edit`}
    >
      <a className="text-blue-600 border rounded-md
        hover:border-blue-600 hover:underline
        py-3 px-6 mx-auto inline-block">
        edit post
      </a>
    </Link>
  </div>
)

const PostArticle = ({ title, image, content}) => (
  <article className="md:col-span-3 lg:col-span-4 flex flex-col gap-4 max-w-prose">
    <h1 className="h1">{title}</h1>
    <img src={image} alt="" />
    <div className="prose lg:prose-lg prose-cyan">
      <PrintMarkdown markdown={content} />
    </div>
  </article>
)

export default function Post(props) {
  const post = props.data

  return post.error ? (<p>Error loading post.</p>)
    : post === {} ? (<p>Post will load when it feels like loading.</p>)
    : (
      <Layout
        title={post.title}
        description={post.excerpt}
        image={post.image}
      >
        <div className="container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-10">
          <PostSidebar {...post} />
          <PostArticle {...post} />
        </div>
      </Layout>
    )
}

export async function getStaticProps({ params }) {
  const data = await getAPI(`posts/show/${params.pid}`)

  return !data ? {
    notFound: true,
  } : {
    props: { data },
  }
}

export async function getStaticPaths() {
  const data = await getAPI(`posts/index`)
  const paths = data.map(post => ({
    params: { pid: `${post.id}` }
  }))

  return { paths, fallback: false }
}
