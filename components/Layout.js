import Head from 'next/head'

export default function Layout({ image, description, title, children }) {
  const siteTitle = `Michael Snook's site${title && ` | ${title}`}`
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
      <div>{children}</div>
      <footer></footer>
    </>
  )
}
