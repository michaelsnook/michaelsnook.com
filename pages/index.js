import Head from 'next/head'
import Banner from '../components/Banner'
import PostList from '../components/PostList'

export default function Home() {
  const title = `Michael Snook's site`
  const description = `A personal weblog and project pad`

  return (
    <>
      <Head>
        <title>Michael Snook's site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner
        bgImage="/images/como.jpg" title={title} description={description}
        smallImage="/images/my-face-circle.png" smallAlt="A cartoon face of the author, Michael"
      />

      <main className="container py-5">
        <PostList />
      </main>

      <footer></footer>
    </>
  )
}
