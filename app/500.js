import Layout from '../components/Layout'

export default function Custom500() {
  return (
    <Layout banner>
      <main className="container py-5">
        <h1 className="h1">500</h1>
        <p className="h1-sub">Yikes – internal server error</p>
      </main>
    </Layout>
  )
}
