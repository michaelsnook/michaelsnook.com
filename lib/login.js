import useSWR from 'swr'
const api_url = process.env.NEXT_PUBLIC_API_URL

export async function postLogin(postData) {
  const url = `${api_url}/login`
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  }
  const res = await fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(postData),
  })

  if (res.ok !== true) {
    console.log(res)
    throw ['Login was unsuccessful', JSON.stringify(res.statusText)]
  }

  const responseData = await res.json()

  if (typeof responseData.user === 'undefined') {
    console.log(responseData)
    alert('No user data was returned; something weird is happening')
    throw ['No user data returned', JSON.stringify(responseData)]
  }

  return responseData.user
}

async function checkLogin() {
  const url = `${api_url}/logged_in`
  const res = await fetch(url, {
    method: 'get',
    credentials: 'include',
  })

  if (res.status === 401) return { logged_in: false }

  if (res.ok !== true) {
    console.log(res)
    throw 'Error retrieving login status'
  }

  return res.json()
  //e.g. { user: {}, logged_in: bool}
}

export function useUser() {
  const { data, error } = useSWR(`logged_in`, checkLogin)
  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
  }
}
