import '../styles/globals.css'
import SessionProvider from './session-provider'
import Menu from '../components/menu'
import { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(`https://michaelsnook.com`),
	title: 'em snook web site',
	description: 'My personal space to jot things down',
	openGraph: { images: '/images/my-face-288.png' },
	authors: { name: 'Em Snook' },
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
