const api_url = 'http://localhost:3000/api/v1'

export async function postLogin(postData) {
  const url = `${api_url}/login`
  const headers = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  }
  console.log(JSON.stringify(postData))
  const res = await fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(postData),
  })

  if (res.ok !== true) {
    console.log(res)
    throw [ res.statusText || 'Login was unsuccessful' ]
  }

  const responseData = await res.json()
  
  if (typeof responseData.user === 'undefined') {
    console.log(responseData)
    alert('No user data was returned; something weird is happening')
    throw { error: responseData }
  }
  
  return responseData.user
}
