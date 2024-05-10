'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import supabase from '@/app/supabase-client'

const SessionContext = createContext(null)

export default function Providers({ children }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        console.log(`Auth state changed: signed out`, session)
        setSession(null)
      } else if (session) {
        console.log(`Auth state changed: ${event}`, session)
        setSession(session)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionContext)
}
