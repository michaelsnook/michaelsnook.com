'use client'

import { createContext, useState, useLayoutEffect } from 'react'
import supabase from '@/lib/supabase-client'

const SessionContext = createContext(null)

export default function Providers({ children }) {
  const [session, setSession] = useState(null)

  useLayoutEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null)
      } else if (session) {
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
