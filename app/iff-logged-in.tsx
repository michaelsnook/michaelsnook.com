'use client'

import { useSession } from './session-provider'

const IffLoggedIn = ({ children }) => {
	const session = useSession()
	return session?.user?.role === 'authenticated' ? children : null
}

export default IffLoggedIn
