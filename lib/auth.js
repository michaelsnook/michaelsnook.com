import useSWR, { mutate } from 'swr'
import supabase from './supabase-client'

export async function postLogin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.log(error)
    throw error.message
  }
  console.log('new login', data?.session, error)
  mutate('logged_in', data?.session)
}

const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data?.session
}

export function useSession() {
  const { data } = useSWR('logged_in', getSession)
  return data
}
