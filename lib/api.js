const api_url = 'http://localhost:3000/api/v1'

export async function getAPI(path) {
  const url = `${api_url}/${path}`
  const headers = { 'Content-Type': 'application/json' }
  const res = await fetch(url, { method: 'GET', headers: headers })

  if (res.ok !== true) {
    console.log(res)
    throw [ res.statusText || 'Could not fetch the requested data' ]
  }

  const data = await res.json()
  return data
}

export async function postAPI(path, postData) {
  const url = `${api_url}/${path}`
  const headers = { 'Content-Type': 'application/json' }
  console.log('url is', url)
  const res = await fetch(url, {
    method: 'POST',
    // mode: 'no-cors',
    headers: headers,
    body: JSON.stringify(postData),
  })

  if (res.ok !== true) {
    console.log(res)
    throw res
  }

  const responseData = await res.json()
  return responseData
}
