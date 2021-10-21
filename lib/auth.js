import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import supabase from './supabase-client'

export async function postLogout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
    throw error
  }
  const result = enhanceSession()
  mutate('logged_in', result)
  return result
}

export async function postLogin({ email, password }) {
  // console.log('postLogin...')
  const { session, error } = await supabase.auth.signIn({
    email,
    password,
  })

  if (error) {
    console.log(error)
    throw error.message
  }

  const result = enhanceSession(session)
  // console.log('session: ', result)

  mutate('logged_in', result)
  return result
}

// input (session) and get back a one-level-up object { session, nickname }
const enhanceSession = session => {
  if (!session) return { session: null }
  if (!session?.user?.email) return { session }
  return {
    session,
    // user: session.user,
    // e.g. michael.sayshi@website.com => michael
    nickname: session?.user?.email?.split(/[\b\@\.]/)[0] || 'friend',
  }
}

export function useSession() {
  const { data } = useSWR('logged_in', () =>
    enhanceSession(supabase.auth.session())
  )
  return data ?? { session: null }
}
