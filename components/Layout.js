import Link from 'next/link'
import Head from 'next/head'
import Banner from './Banner'
import Menu from './Menu'

export default function Layout({
  image = `/images/my-face-288.png`,
  description = `A personal weblog and project pad`,
  title = `Michael Snook's site`,
  banner = false,
  noFooter = false,
  singleCol = false,
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
        <meta name="theme-color" content="#0e7490" />
      </Head>

      <Menu />

      {banner && <Banner title={title} description={description} />}
      <div
        className={`${
          !banner ? 'min-h-[80vh] flex flex-col place-content-center' : ''
        } ${singleCol ? 'max-w-prose mx-auto px-2' : ''}`}
      >
        {children}
      </div>

      {noFooter ? (
        <br />
      ) : (
        <footer className="border-t w-full py-10 mt-10">
          <nav className="space-x-4 space-y-10 py-4 mx-auto text-center">
            <Link href="/" className="text-cyan-700 underline">
              home
            </Link>
            <a
              className="text-cyan-700 underline"
              href="https://twitter.com/michaelsnook"
            >
              twitter
            </a>
            <a
              className="text-cyan-700 underline"
              href="https://github.com/michaelsnook"
            >
              github
            </a>
            <span>CC0 1.0</span>
            <span>&lt;/&gt; by me</span>
          </nav>
        </footer>
      )}
    </>
  )
}
