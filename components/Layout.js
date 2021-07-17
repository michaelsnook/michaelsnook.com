import Head from 'next/head'

export default function Layout({ image, description, title, children }) {
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

      {children}

      <footer className="border w-full py-10 mt-10">
        <div className="mx-auto text-center">
          <nav className="space-x-4 space-y-10 py-4">
            <a className="text-cyan-700 underline" href="/">home</a>
            <a className="text-cyan-700 underline" href="https://twitter.com/michaelsnook">twitter</a>
            <a className="text-cyan-700 underline" href="https://github.com/michaelsnook">github</a>
            <span>CC0 1.0</span>
            <span>&lt;/&gt; by me</span>
          </nav>
        </div>
      </footer>
    </>
  )
}
