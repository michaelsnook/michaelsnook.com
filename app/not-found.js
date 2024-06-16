import Banner from '@/components/Banner'
import { Footer } from './(public)/layout'

const title = '404 - not found'
const description = 'We absolutely 100% cannot find the thing'

export default function NotFound() {
  return (
    <>
      <Banner title={title} description={description} medium />
      <main className="container py-8 space-y-4">
        <h1 className="h2">{title}</h1>
        <p>
          We&apos;re very sorry about this, but then again, this website is free
          so 🤷 try not to make a big deal about it.
        </p>
        <p>
          If you think you are receiving this message in error, please take a
          moment to consider that maybe the most painful errors are the ones we
          do to ourselves.
        </p>
      </main>
      <Footer />
    </>
  )
}
