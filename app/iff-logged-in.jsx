'use client'

import { useSession } from '../lib/auth'

const IffLoggedIn = ({ children }) => {
  const session = useSession()
  return session ? children : null
}

export default IffLoggedIn
