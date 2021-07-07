import Banner from '../components/Banner'
import PostList from '../components/PostList'
import Layout from '../components/Layout'

export default function Home() {
  const meta = {
    title: `Michael Snook's site`,
    description: `A personal weblog and project pad`,
    image: `/images/my-face-circle.png`
  }

  return (
    <Layout {...meta}>
      <Banner title={meta.title} description={meta.description} />
      <main className="container py-5">
        <PostList />
      </main>
    </Layout>
  )
}
