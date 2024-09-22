'use client'

import { useSession } from './SessionProvider'

const IffLoggedIn = ({ children }) => {
	const session = useSession()
	return session?.user?.role === 'authenticated' ? children : null
}

export default IffLoggedIn
