import '../styles/globals.css'
import SessionProvider from './SessionProvider'
import Menu from '../components/Menu'

export const metadata = {
  title: 'Michael Snook web site',
  description: 'My personal space to jot things down',
  image: '/images/my-face-circle.png',
  author: 'Michael Snook',
}

export const viewport = {
  themeColor: '#0e7490',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Menu />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
