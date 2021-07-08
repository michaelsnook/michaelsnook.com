import Banner from '../components/Banner'
import PostList from '../components/PostList'
import Layout from '../components/Layout'

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
        <PostList posts={data} />
      </main>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3000/api/v1/posts/index`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}
