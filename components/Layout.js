import Head from 'next/head'
import Banner from './Banner'

export default function Layout({
  image = `/images/my-face-circle.png`,
  description = `A personal weblog and project pad`,
  title = `Michael Snook's site`,
  banner = false,
  children,
}) {
  const siteTitle = `Michael Snook dot com${title && ` | ${title}`}`
  return (
    <>
      <Head>
        <meta name="author" content="Michael Snook" />
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
      </Head>

      {banner && <Banner title={title} description={description} />}

      {children}

      <footer className="border w-full py-10 mt-10">
        <nav className="space-x-4 space-y-10 py-4 mx-auto text-center">
          <a className="text-cyan-700 underline" href="/">home</a>
          <a className="text-cyan-700 underline" href="https://twitter.com/michaelsnook">twitter</a>
          <a className="text-cyan-700 underline" href="https://github.com/michaelsnook">github</a>
          <span>CC0 1.0</span>
          <span>&lt;/&gt; by me</span>
        </nav>
      </footer>
    </>
  )
}
