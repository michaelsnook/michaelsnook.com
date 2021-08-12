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
