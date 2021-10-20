import useSWR, { mutate } from 'swr'
import supabase from './supabase-client'

export async function postLogout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
    throw error
  }

  mutate('logged_in', {})
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
  mutate('logged_in', session)
  return session
}

export function useSession() {
  const { data: session, error } = useSWR(`logged_in`, () =>
    supabase.auth.session()
  )
  if (error) {
    console.log(error)
    return { error: error.message }
  }
  return {
    session,
    // e.g. michael.sayshi@website.com => michael
    nickname: session?.user?.email?.split(/[\b\@\.]/)[0] || 'friend',
  }
}
