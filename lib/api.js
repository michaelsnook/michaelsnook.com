const api_url = process.env.NEXT_PUBLIC_API_URL

export async function getAPI(path) {
  const url = `${api_url}/${path}`
  const headers = { 'Content-Type': 'application/json' }
  const res = await fetch(url, {
    method: 'GET',
    headers: headers,
    credentials: 'include',
  })

  if (res.ok !== true) {
    console.log(res)
    throw JSON.stringify(res.statusText)
  }

  const data = await res.json()
  return data
}

export async function fetchPost(pid) {
  const postData = await getAPI(`posts/show/${pid}`)
  return 'content' in postData
    ? {
        ...postData,
        content: postData.content.replace('&gt;', '>').replace('&lt;', '<'),
      }
    : postData
}

export async function postAPI(path, postData) {
  const url = `${api_url}/${path}`
  const headers = { 'Content-Type': 'application/json' }
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(postData),
  })

  if (res.ok !== true) {
    console.log(res)
    throw ['Could not fetch the requested data', JSON.stringify(res.statusText)]
  }

  const responseData = await res.json()
  return responseData
}
