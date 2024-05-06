import Link from 'next/link'
import Banner from '../../components/Banner'

export const metadata = {
  title: 'Michael Snook web site',
  description: 'My personal space to jot things down',
  image: '/images/my-face-circle.png',
  author: 'Michael Snook',
}

export default function Layout({ children }) {
  return (
    <>
      <Banner title={metadata.title} description={metadata.description} />
      {children}
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
    </>
  )
}
