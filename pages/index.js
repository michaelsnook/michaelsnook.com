import Banner from '../components/Banner'
import PostList from '../components/PostList'
import Layout from '../components/Layout'
import { getAPI } from '../lib/api'

export default function Home({ data }) {
  const meta = {
    title: `Michael Snook's site`,
    description: `A personal weblog and project pad`,
    image: `/images/my-face-circle.png`
  }

  return (
    <Layout {...meta}>
      <Banner title={meta.title} description={meta.description} />
      <main className="container py-5">
        <h2 className="h2">All Posts</h2>
        <PostList posts={data} />
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getAPI(`posts/index`)

  return !data ? {
    notFound: true,
    revalidate: 10,
  } : {
    props: { data },
    revalidate: 10,
  }
}
