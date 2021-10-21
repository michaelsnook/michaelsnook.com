import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import supabase from './supabase-client'

export async function postLogout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
    throw error
  }

  return {}
}

export async function postLogin({ email, password }) {
  // console.log('postLogin...')
  const { session, error } = await supabase.auth.signIn({
    email,
    password,
  })
  // console.log('session: ', session)

  if (error) {
    console.log(error)
    throw error.message
  }
  return enhanceSession(session)
}

const enhanceSession = session => {
  if (!session || !session?.user) return { session: null }
  console.log(session)
  return {
    session,
    // e.g. michael.sayshi@website.com => michael
    nickname: session?.user?.email?.split(/[\b\@\.]/)[0] || 'friend',
  }
}

export function useSession() {
  const [session, setSession] = useState(
    enhanceSession(supabase.auth.session())
  )

  useEffect(() => {
    function handleSessionChange(_, newSession) {
      setSession(enhanceSession(newSession))
    }

    const { data: subscription } =
      supabase.auth.onAuthStateChange(handleSessionChange)
    return () => subscription.unsubscribe()
  }, [setSession])

  return session
}
